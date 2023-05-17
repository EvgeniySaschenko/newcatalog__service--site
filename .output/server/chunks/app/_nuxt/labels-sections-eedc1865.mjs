import { useSSRContext, defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { b as _export_sfc, _ as __nuxt_component_0$2 } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    // Sections ids
    sectionsIds: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // Sections map
    sectionsMap: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "labels-sections" }, _attrs))} data-v-1d0c8299><!--[-->`);
  ssrRenderList(_ctx.sectionsIds, (sectionId) => {
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "labels-sections__item",
      "data-gtm-element": "labels-sections-item",
      to: `/${_ctx.$langDefault()}/section/${sectionId}`
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(`#${_ctx.sectionsMap[sectionId].name[_ctx.$langDefault()]}`)}`);
        } else {
          return [
            createTextVNode(toDisplayString(`#${_ctx.sectionsMap[sectionId].name[_ctx.$langDefault()]}`), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rating/labels-sections.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LabelsSections = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender], ["__scopeId", "data-v-1d0c8299"]]);

export { LabelsSections as default };
//# sourceMappingURL=labels-sections-eedc1865.mjs.map
