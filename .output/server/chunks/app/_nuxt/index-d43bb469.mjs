import { executeAsync } from 'unctx';
import { b as _export_sfc, d as defineNuxtComponent, u as useNuxtApp, e as useRoute, f as useBreadcrumbsStore, a as useSettingsStore, g as useSeoMeta, h as useSectionsStore, _ as __nuxt_component_0$2 } from '../server.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import RatingItems from './rating-items-e1713809.mjs';
import LabelsSections from './labels-sections-eedc1865.mjs';
import LinksSources from './links-sources-386cd2e8.mjs';
import __nuxt_component_0 from './app-preloader-ec8aa324.mjs';
import __nuxt_component_1 from './app-title-fad1a54b.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
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
import './app-label-rating-d234306b.mjs';

const _sfc_main = /* @__PURE__ */ defineNuxtComponent({
  async asyncData() {
    let __temp, __restore;
    let { $langDefault, $api } = useNuxtApp();
    let { params } = useRoute();
    let response = ([__temp, __restore] = executeAsync(() => $api.getPageRating({
      ratingId: Number(params.ratingId)
    })), __temp = await __temp, __restore(), __temp);
    if (response == null ? void 0 : response.isError) {
      response.showError();
    }
    let { labels, rating, ratingItems } = response;
    let store = useBreadcrumbsStore();
    store.setBreadcrumbs([
      {
        name: rating.name[$langDefault()] || "",
        url: `/${$langDefault()}/rating/${rating.ratingId}`
      }
    ]);
    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;
    useSeoMeta({
      title: `${pageTitlePrefix} ${rating.name[$langDefault()]} ${pageTitleSufix}`.trim(),
      description: rating.descr[$langDefault()]
    });
    return {
      labels,
      rating,
      ratingItems,
      isLoading: false
    };
  },
  data() {
    return {
      // labels
      labels: [],
      // rating
      rating: {},
      // rating items
      ratingItems: [],
      // Loading data
      isLoading: true,
      // Sections map
      sectionsMap: useSectionsStore().itemsMap
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path !== from.path) {
          this.isLoading = true;
        }
      }
    }
  },
  components: {
    RatingItems,
    LinksSources,
    LabelsSections
  },
  methods: {
    // Scroll to links sources
    scrollToLinksSources() {
      if (!this.$refs["links-sources"])
        return;
      this.$refs["links-sources"].scrollIntoView({
        behavior: "smooth"
      });
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_preloader = __nuxt_component_0;
  const _component_app_title = __nuxt_component_1;
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_rating_items = resolveComponent("rating-items");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page page--rating" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_app_preloader, {
    isLoading: _ctx.isLoading,
    position: "fixed"
  }, null, _parent));
  _push(ssrRenderComponent(_component_app_title, {
    text: _ctx.rating.name[_ctx.$langDefault()]
  }, null, _parent));
  _push(`<div class="page__top"><div class="page__top-col-1">`);
  if (_ctx.rating.linksToSources.length) {
    _push(`<div class="button-sources" data-gtm-element="rating-button-links-to-sources"><span class="button-sources-text-1">${ssrInterpolate(_ctx.$t("Links to sources"))}</span><span class="button-sources-text-2">${ssrInterpolate(_ctx.$t("Sources"))}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="page__top-col-2"><div class="labels-sections"><!--[-->`);
  ssrRenderList(_ctx.rating.sectionsIds, (sectionId) => {
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
  _push(`<!--]--></div></div></div><div class="page__rating-items">`);
  _push(ssrRenderComponent(_component_rating_items, {
    labels: _ctx.labels,
    items: _ctx.ratingItems,
    rating: _ctx.rating
  }, null, _parent));
  _push(`</div>`);
  if (_ctx.rating.descr[_ctx.$langDefault()]) {
    _push(`<div class="page__descr">`);
    _push(ssrRenderComponent(_component_app_title, {
      text: _ctx.$t("Description"),
      level: 3,
      textAlign: "left"
    }, null, _parent));
    _push(`<div>${ssrInterpolate(_ctx.rating.descr[_ctx.$langDefault()])}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.rating.linksToSources.length) {
    _push(`<div class="page__links-sources">`);
    _push(ssrRenderComponent(_component_app_title, {
      text: _ctx.$t("Links to sources"),
      level: 3,
      textAlign: "left"
    }, null, _parent));
    _push(`<div class="links-sources"><!--[-->`);
    ssrRenderList(_ctx.rating.linksToSources, (item, index2) => {
      _push(`<div class="links-sources__item"><span class="links-sources__number">${ssrInterpolate(`#${index2 + 1}`)}.</span><a class="links-sources__link"${ssrRenderAttr("href", item)} target="_blank" data-gtm-element="links-to-sources-item">${ssrInterpolate(item)}</a></div>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rating/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { index as default };
//# sourceMappingURL=index-d43bb469.mjs.map
