import { useSSRContext, defineComponent } from 'vue';
import { ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
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
    // Text title
    text: {
      type: String,
      default: ""
    },
    // level
    level: {
      type: Number,
      default: 1
    },
    // align
    textAlign: {
      type: String,
      default: "center"
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  if (_ctx.level == 1) {
    _push(`<h1 class="app-title-1" style="${ssrRenderStyle(`text-align: ${_ctx.textAlign}`)}" data-v-8a111d53>${ssrInterpolate(_ctx.text)}</h1>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.level == 3) {
    _push(`<h3 class="app-title-3" style="${ssrRenderStyle(`text-align: ${_ctx.textAlign}`)}" data-v-8a111d53>${ssrInterpolate(_ctx.text)}</h3>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-title/app-title.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender], ["__scopeId", "data-v-8a111d53"]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=app-title-fad1a54b.mjs.map
