import { useSSRContext, defineComponent, resolveDirective, mergeProps } from 'vue';
import { b as _export_sfc, G as GtmElementsEnum } from '../server.mjs';
import __nuxt_component_1 from './app-label-rating-d234306b.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
    // labels
    labels: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // rating items
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      labelsMap: {}
    };
  },
  created() {
    for (let label of this.labels) {
      this.labelsMap[label.labelId] = label;
    }
  },
  methods: {
    // Add info to Google Tag Manager
    gtmPush(index) {
      let rating = this.items[index];
      this.$gtmPush({
        event: "click",
        ratingItemId: rating.ratingItemId,
        ratingId: rating.ratingId,
        siteId: rating.siteId,
        elementType: GtmElementsEnum["rating-items-item"],
        timestamp: Date.now(),
        userAgent: window.navigator.userAgent,
        isTouchDevice: this.$screen.isTouchDevice,
        screen: { height: window.screen.height, width: window.screen.width }
      });
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_label_rating = __nuxt_component_1;
  const _directive_lazy = resolveDirective("lazy");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "rating-items" }, _attrs))} data-v-3d4c5fab><div class="rating-items__list" data-v-3d4c5fab><!--[-->`);
  ssrRenderList(_ctx.items, (item, index) => {
    _push(`<a class="rating-items__item"${ssrRenderAttr("href", item.url)} target="_blank" data-gtm-element="rating-items-item" data-v-3d4c5fab><div class="rating-items__img-box" style="${ssrRenderStyle(`background-color: ${item.color}`)}" data-v-3d4c5fab><img${ssrRenderAttrs(mergeProps({
      class: "rating-items__img",
      alt: item.hostname,
      src: _ctx.$configApp.imageStub
    }, ssrGetDirectiveProps(_ctx, _directive_lazy, item.logoImg)))} data-v-3d4c5fab></div><div class="rating-items__info" data-v-3d4c5fab><div class="rating-items__name-box" data-v-3d4c5fab><div class="rating-items__name" data-v-3d4c5fab>${ssrInterpolate(item.name[_ctx.$langDefault()])}</div></div><div class="rating-items__hostname" data-v-3d4c5fab>${ssrInterpolate(item.hostname)}</div>`);
    if (_ctx.labels.length) {
      _push(`<div class="rating-items__labels" data-v-3d4c5fab><!--[-->`);
      ssrRenderList(item.labelsIds, (labelId) => {
        _push(ssrRenderComponent(_component_app_label_rating, {
          color: _ctx.labelsMap[labelId].color,
          text: _ctx.labelsMap[labelId].name[_ctx.$langDefault()]
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></a>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rating/rating-items.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RatingItems = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender], ["__scopeId", "data-v-3d4c5fab"]]);

export { RatingItems as default };
//# sourceMappingURL=rating-items-e1713809.mjs.map
