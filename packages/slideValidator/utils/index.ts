import { computed, ComputedRef } from 'vue-demi'

/**
 * 判断传入参数是否是一个标准的长度单位， 'px', 'vw', 'px', 'vh', '%' 结尾
 * @param lengthStr 传入的长度
 * @param extraUnit  额外需要添加的单位
 * @returns 返回一个正常的度量单位
 */

export function useLengthUnit(lengthStr: string, extraUnit = 'px'):ComputedRef<string> {
  return computed(() => {
    // 判断数字或者小数，默认加上px
    if (/^[1-9][0-9]*([.][0-9]{1,})?$/.test(lengthStr.toString())) {
      return lengthStr + extraUnit;
    } else {
      // 判断是否以常用的css单位结尾
      const cssArr: string[] = ['px', 'vw', 'px', 'vh', '%'];
      return cssArr.some(ca => lengthStr.toString().endsWith(ca)) ? lengthStr : parseInt(lengthStr.toString()) + extraUnit
    }
  })
}


/**
 * 验证是否是颜色
 * @param val 
 * @returns 
 */
export function useValidateIsColor(val: string):boolean {
  return /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(val);
}

/**
 * 获取随机数
 * @returns 
 */
export function useGetUuid():string {
  return Date.now() + '-' + Math.random().toString(16).slice(2, 7) + '-' + Math.random().toString(16).slice(2, 7)
}