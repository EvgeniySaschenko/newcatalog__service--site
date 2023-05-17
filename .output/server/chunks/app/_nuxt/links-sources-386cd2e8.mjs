import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
    // links
    linksToSources: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "links-sources" }, _attrs))} data-v-c8e08805><!--[-->`);
  ssrRenderList(_ctx.linksToSources, (item, index) => {
    _push(`<div class="links-sources__item" data-v-c8e08805><span class="links-sources__number" data-v-c8e08805>${ssrInterpolate(`#${index + 1}`)}.</span><a class="links-sources__link"${ssrRenderAttr("href", item)} target="_blank" data-v-c8e08805>${ssrInterpolate(item)}</a></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rating/links-sources.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LinksSources = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender], ["__scopeId", "data-v-c8e08805"]]);

export { LinksSources as default };
//# sourceMappingURL=links-sources-386cd2e8.mjs.map
