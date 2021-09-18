# 初衷

写这个包的主要目的是为了使用`vue-demi`来写`vue2`和`vue3`的公用组件。简单说一下自己的开发感受吧。不没有想象中的那么顺利（可能是自己没有理解到位）； 使用`vue-demi` 里面目前来说只能`vue2`和`vue3`选择一种来进行测试，如果你想在同一个项目中对`vue2`和`vue3`来切换测试，我没有做到，会有些问题。比如： 我曾在项目中建立了一个`examplev2`和`examplev3`来进行项目测试，`vue3`正常启动，`vue2`就会启动不了。我使用的是yarn workspace来进行搭建的。所以全局只能有一个`vue`,`vue2`我就重命名了，重命名后的结果就是`vue-template-complier` 里面不能识别我的`vue2`. 所以自己就只能单独搭建项目来进行测试

> 希望有大佬可以做到在同一个项目中能够切换vue2和vue3的测试。目前我看到的线上的包，我fork下来看，人家的vue2也是有问题的。


# 使用方式

## vue3 
`npm i vue-login-slide-validator`

`yarn add vue-login-slide-validator`

### 案例
```html
<template>
  <div>
    <button @click="getStatus">获取状态</button>
    <button @click="reset">重置</button>
  </div>
  <div>
    <slide-validator :key="keys" width="300px" :slider-success-style="{backgroundColor: 'lightgreen'}" :success-bg-color="'#ccc'" ref="sliderRef"></slide-validator>
  </div>
</template>

<script setup>
import slideValidator from "vue-login-slide-validator"
import "vue-login-slide-validator/index.css"
import { ref } from 'vue'

const sliderRef = ref(null);
const keys = ref(0);

const getStatus = () => {
  console.log(sliderRef)
  alert(sliderRef.value.slideValidatorStatus)
}

const reset = () => {
  keys.value = Date.now();
}
</script>
<style>
div{
  line-height: 50px;
}
</style>
```

### 效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/b844f580f258406687dc739104510b6a.gif#pic_center)


## vue2
`npm i vue-login-slide-validator  @vue/composition-api`
或者
`yarn add vue-login-slide-validator  @vue/composition-api`

### 案例
```html
<template>
  <div>

    <div>
    <button @click="getStatus">获取状态</button>
    <button @click="reset">重置</button>
  </div>
  <div>
    <slide-validator :key="keys" width="300px" :slider-success-style="{backgroundColor: 'lightgreen'}" :success-bg-color="'#ccc'" ref="sliderRef"></slide-validator>
  </div>
  </div>
</template>

<script>
import SlideValidator from "vue-login-slide-validator"
import "vue-login-slide-validator/index.css"
import { ref } from "@vue/composition-api";

export default {
  name: 'App',
  components: {
    SlideValidator
  },
  setup() {
    const sliderRef = ref(null);
    const keys = ref(0);

    const getStatus = () => {
      console.log(sliderRef)
      alert(sliderRef.value.slideValidatorStatus)
    }

    const reset = () => {
      keys.value = Date.now();
    }
    return {
      getStatus,
      reset,
      keys,
      sliderRef
    }
  }
}
</script>

```

#   api


|中文意思| 属性名称 | 默认值  | 类型|
|--|--|--|--|
|一开始背景颜色| backgroundColor | #abcdef  | string |
|成功的背景颜色| successBgColor| 无  | string |
|宽度| width| 300px  | string |
|高度| height| 50px| string |
|初始内部文字| innerText|  向右拖动滑块验证 | string |
|成功后的滑块文字| sliderSuccessInnerText| 验证成功  | string |
|槽内样式| innerTextStyle| 无  | StyleValue|
|滑块一开始的样式| sliderStyle| 无| StyleValue|
|滑块成功的样式| sliderSuccessStyle| 无  | StyleValue |
|获取滑块状态| slideValidatorStatus| false  | boolean|


>  源代码请查看 [https://github.com/cll123456/test-demi.git](https://github.com/cll123456/test-demi.git)