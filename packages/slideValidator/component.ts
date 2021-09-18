/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, PropType, h, ref, onMounted, Ref, install } from 'vue-demi';
import * as CSS from 'csstype'
import { useLengthUnit, useValidateIsColor } from './utils/index'

interface CSSProperties extends CSS.Properties<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
}

type StyleValue = CSSProperties | Array<StyleValue>

install();

export default defineComponent({
  name: 'SlideValidator',
  props: {
    /**
     * 背景颜色
     */
    backgroundColor: {
      type: String,
      validator: (val: string) => useValidateIsColor(val),
      default: '#abcdef'
    },
    /**
     * 成功的背景颜色
     */
    successBgColor: {
      type: String,
      validator: (val: string) => useValidateIsColor(val),
      default: '#abcdef'
    },
    /**
     * 宽度
     */
    width: {
      type: String || Number,
      default: '100%'
    },
    /**
     * 高度
     */
    height: {
      type: String || Number,
      default: '50px'
    },
    /**
     * 滑块内部描述文字
     */
    innerText: {
      type: String,
      default: '向右拖动滑块验证'
    },
    /**
     * 验证成功的文本
     */
    sliderSuccessInnerText: {
      type: String,
      default: '验证成功！'
    },
    /**
     * 滑块内部文字样式
     */
    innerTextStyle: {
      type: Object as PropType<StyleValue>,
      default: () => ({})
    },
    /**
     * 滑块样式
     */
    sliderStyle: {
      type: Object as PropType<StyleValue>,
      default: () => ({})
    },
    /**
     * 滑块成功的样式
     */
    sliderSuccessStyle: {
      type: Object as PropType<StyleValue>,
      default: () => ({})
    },
  },
  expose: ['slideValidatorStatus'],
  setup(props: { width: { toString: () => string; }; height: { toString: () => string; }; sliderStyle: StyleValue; sliderSuccessInnerText: any; sliderSuccessStyle: any; }) {

    /**
     * 容器宽度
     */
    const containerWidth = useLengthUnit(props.width.toString());
    /**
     * 容器高度
     */
    const containerHeight = useLengthUnit(props.height.toString());
    /**
     * 合并滑块的样式
     */
    const mergeSliderStyle: StyleValue = { width: containerHeight.value, height: containerHeight.value, ...props.sliderStyle };

    /**
    * 滑块dom
    */
    const sliderRef: Ref<HTMLDivElement | null> = ref(null);
    /**
     * 容器dom
     */
    const sliderContainerRef: Ref<HTMLDivElement | null> = ref(null);
    /**
     * 滑块内部dom
     */
    const sliderInnerTextRef: Ref<HTMLDivElement | null> = ref(null);
    /**
     * 成功遮罩dom
     */
    const sliderSuccessBgRef: Ref<HTMLDivElement | null> = ref(null);
    /**
     * 当前鼠标点击状态
     */
    const mouseClickState = ref(false);
    /**
     * 是否成功
     */
    const confirmSuccess = ref(false);
    /**
     * 滑块距离左侧的距离
     */
    const sliderStartXPosition = ref(0);
    /**
     * 移动距离
     */
    const sliderDistance = ref(0);

    onMounted(() => {
      sliderContainerRef.value = document.getElementsByClassName('vue-login_slide-container')[0] as HTMLDivElement;
      sliderRef.value = document.getElementsByClassName('vue-login_slider-container')[0] as HTMLDivElement;
      sliderRef.value.addEventListener('mousedown', sliderMouseDown);
      sliderRef.value.addEventListener('mouseup', mouseUpFn);
      sliderInnerTextRef.value = document.getElementsByClassName('vue-login_inner-container')[0] as HTMLDivElement;
      sliderSuccessBgRef.value = document.getElementsByClassName('vue-login_slider-success-bg')[0] as HTMLDivElement;
    })

    /**
       * 鼠标点击下来
       */
    const sliderMouseDown = (e: MouseEvent) => {
      if (!confirmSuccess.value) {
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        mouseClickState.value = true;
        sliderStartXPosition.value = e.clientX;
        // 绑定事件
        document.addEventListener('mousemove', mouseMoveFn);
      }
    }

    /**
     * 
     * 鼠标抬起
     */
    const mouseUpFn = (e: MouseEvent) => {
      if (!confirmSuccess.value) {
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        mouseClickState.value = false;
        sliderStartXPosition.value = 0;
        sliderRef.value!.style.left = 0 + 'px';
        sliderSuccessBgRef.value!.style.width = 0 + 'px';
        // 解除事件
        document.removeEventListener('mousemove', mouseMoveFn);
      }
    }

    /**
     * 成功函数
     * 
     */
    const successFunction = () => {
      confirmSuccess.value = true;
      sliderInnerTextRef.value!.innerText = props.sliderSuccessInnerText;
      const resWidth = parseInt(sliderContainerRef.value!.style.width) - parseInt(sliderRef.value!.style.width) + 'px';

      sliderRef.value!.style.left = resWidth;
      sliderSuccessBgRef.value!.style.width = resWidth;
      // 赋值成功的样式
      if (props.sliderSuccessStyle) {
        for (const p in props.sliderSuccessStyle) {
          if (Object.prototype.hasOwnProperty.call(props.sliderSuccessStyle, p)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sliderRef.value!.style[p as any] = (props.sliderSuccessStyle as any)[p]
          }
        }
      }
      // 解除事件
      document.removeEventListener('mousemove', mouseMoveFn);
    }
    /**
     * 鼠标移动事件
     */
    const mouseMoveFn = (e: MouseEvent) => {
      if (mouseClickState.value) {
        sliderDistance.value = e.clientX - sliderStartXPosition.value;
        const maxSliderWidth = parseInt(sliderContainerRef.value!.style.width) - parseInt(sliderRef.value!.style.width)
        if (sliderDistance.value > 0 && sliderDistance.value <= maxSliderWidth) {
          sliderRef.value!.style.left = sliderDistance.value + 'px';
          sliderSuccessBgRef.value!.style.width = sliderDistance.value + 'px';
        } else if (sliderDistance.value > maxSliderWidth) {
          successFunction();
        }
      }
    }
    return {
      slideValidatorStatus: confirmSuccess,
      containerWidth,
      containerHeight,
      mergeSliderStyle
    }
  },
  render() {
    return h('div', { class: 'vue-login_slide-container', style: { width: this.containerWidth, height: this.containerHeight, backgroundColor: this.backgroundColor } }, [
      h('div', { class: 'vue-login_slider-success-bg', style: { backgroundColor: this.successBgColor } }),
      h('div', { class: 'vue-login_slider-container', style: (this.mergeSliderStyle as CSSProperties) }),
      h('div', { class: 'vue-login_inner-container', style: this.innerTextStyle as CSSProperties }, this.innerText as string),
    ])
  }

})






