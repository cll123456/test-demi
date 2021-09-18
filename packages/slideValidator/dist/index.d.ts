import * as _vue_composition_api from '@vue/composition-api';
import * as vue from 'vue';
import { PropType } from 'vue-demi';
import * as CSS from 'csstype';

interface CSSProperties extends CSS.Properties<string | number> {
}
declare type StyleValue = CSSProperties | Array<StyleValue>;
declare const _default: vue.ComponentOptions<vue.default, _vue_composition_api.ShallowUnwrapRef<_vue_composition_api.Data> & _vue_composition_api.Data, {}, {}, {
    backgroundColor: {
        type: StringConstructor;
        validator: (val: string) => boolean;
        default: string;
    };
    successBgColor: {
        type: StringConstructor;
        validator: (val: string) => boolean;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    innerText: {
        type: StringConstructor;
        default: string;
    };
    sliderSuccessInnerText: {
        type: StringConstructor;
        default: string;
    };
    innerTextStyle: {
        type: PropType<StyleValue>;
        default: () => {};
    };
    sliderStyle: {
        type: PropType<StyleValue>;
        default: () => {};
    };
    sliderSuccessStyle: {
        type: PropType<StyleValue>;
        default: () => {};
    };
}, {
    backgroundColor: string;
    successBgColor: string;
    width: string;
    height: string;
    innerText: string;
    sliderSuccessInnerText: string;
    innerTextStyle: StyleValue;
    sliderStyle: StyleValue;
    sliderSuccessStyle: StyleValue;
} & {}> & vue.VueConstructor<vue.default> & (new (...args: any[]) => _vue_composition_api.ComponentRenderProxy<{
    backgroundColor: string;
    successBgColor: string;
    width: string;
    height: string;
    innerText: string;
    sliderSuccessInnerText: string;
    innerTextStyle: StyleValue;
    sliderStyle: StyleValue;
    sliderSuccessStyle: StyleValue;
} & {}, _vue_composition_api.ShallowUnwrapRef<_vue_composition_api.Data>, _vue_composition_api.Data, {}, {}, {
    backgroundColor: string;
    successBgColor: string;
    width: string;
    height: string;
    innerText: string;
    sliderSuccessInnerText: string;
    innerTextStyle: StyleValue;
    sliderStyle: StyleValue;
    sliderSuccessStyle: StyleValue;
} & {}, {
    backgroundColor: string;
    successBgColor: string;
    width: string;
    height: string;
    innerText: string;
    sliderSuccessInnerText: string;
    innerTextStyle: StyleValue;
    sliderStyle: StyleValue;
    sliderSuccessStyle: StyleValue;
}, true>);

export { _default as default };
