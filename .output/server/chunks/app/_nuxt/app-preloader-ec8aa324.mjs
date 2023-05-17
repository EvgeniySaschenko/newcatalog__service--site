import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { b as _export_sfc } from '../server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'cookie-es';
import 'ohash';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    // Curent page
    isLoading: {
      type: Boolean,
      default: false
    },
    // Css position
    position: {
      type: String,
      default: "absolute"
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  watch: {
    // Сreate new state on change in external source
    isLoading: {
      immediate: true,
      handler() {
        if (this.isLoading) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (_ctx.isShow) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: "app-preloader",
      style: `position: ${_ctx.position};`
    }, _attrs))}></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-preloader/app-preloader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=app-preloader-ec8aa324.mjs.map
