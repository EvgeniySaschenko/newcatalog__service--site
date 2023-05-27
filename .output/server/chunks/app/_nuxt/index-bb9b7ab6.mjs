import { executeAsync } from 'unctx';
import { b as _export_sfc, d as defineNuxtComponent, u as useNuxtApp, e as useRoute, f as useBreadcrumbsStore, h as useSectionsStore, a as useSettingsStore, g as useSeoMeta } from '../server.mjs';
import { useSSRContext, resolveComponent, mergeProps } from 'vue';
import { A as AppRatingsList } from './app-ratings-list-f99255e7.mjs';
import __nuxt_component_0 from './app-preloader-954716fa.mjs';
import __nuxt_component_1 from './app-title-a456aaab.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'destr';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'vue3-lazyload';
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
import './app-label-rating-cfbe1985.mjs';

async function getRatingsList() {
  let { $api } = useNuxtApp();
  let { query } = useRoute();
  let ratingsList = await $api.getPageRatingsAll({
    page: Number(query.page) || 1
  });
  return ratingsList;
}
const _sfc_main = /* @__PURE__ */ defineNuxtComponent({
  async asyncData() {
    let __temp, __restore;
    let { $t, $langDefault } = useNuxtApp();
    let ratingsList = ([__temp, __restore] = executeAsync(() => getRatingsList()), __temp = await __temp, __restore(), __temp);
    if (ratingsList == null ? void 0 : ratingsList.isError) {
      return ratingsList.showError();
    }
    let { query } = useRoute();
    let store = useBreadcrumbsStore();
    let pageText = Number(query.page) > 1 ? `(${$t("Page")} ${query.page})` : "";
    let sections = useSectionsStore().items;
    let descr = `#${sections.map((el) => el.name[$langDefault()]).join(" #")}`;
    store.setBreadcrumbs([]);
    let { pageTitlePrefix, pageTitleSufix } = useSettingsStore().items;
    useSeoMeta({
      title: `${pageTitlePrefix} ${$t("#Title main page")} ${pageText} ${pageTitleSufix}`.trim(),
      description: `${descr} ${pageText}`.trim()
    });
    return {
      ratingsList,
      isLoading: false,
      title: `${$t("#Title main page")}`.trim(),
      pageText,
      descr
    };
  },
  data() {
    return {
      // Ratings list
      ratingsList: [],
      // Loading data
      isLoading: true,
      title: "",
      pageText: "",
      descr: ""
    };
  },
  watch: {
    $route: {
      async handler(to, from) {
        if (to.path !== from.path) {
          this.isLoading = true;
          return;
        }
        if (to.query.page === from.query.page)
          return;
        this.pageText = Number(to.query.page) > 1 ? `(${this.$t("Page")} ${to.query.page})` : "";
        await this.setRatingsList();
      }
    }
  },
  methods: {
    async setRatingsList() {
      this.isLoading = true;
      try {
        let ratingsList = await getRatingsList();
        if (ratingsList == null ? void 0 : ratingsList.isError) {
          return ratingsList.showError();
        }
        this.ratingsList = ratingsList;
      } catch (error) {
        console.error(error);
        this.ratingsList = [];
      } finally {
        this.isLoading = false;
      }
    }
  },
  components: {
    AppRatingsList
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_preloader = __nuxt_component_0;
  const _component_app_title = __nuxt_component_1;
  const _component_app_ratings_list = resolveComponent("app-ratings-list");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page page--section" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_app_preloader, {
    isLoading: _ctx.isLoading,
    position: "fixed"
  }, null, _parent));
  _push(ssrRenderComponent(_component_app_title, {
    text: `${_ctx.$t("#Title main page")} ${_ctx.pageText}`
  }, null, _parent));
  _push(`<div class="page__ratings-list">`);
  _push(ssrRenderComponent(_component_app_ratings_list, { ratingsList: _ctx.ratingsList }, null, _parent));
  _push(`</div>`);
  if (_ctx.descr) {
    _push(`<div class="page__descr">`);
    _push(ssrRenderComponent(_component_app_title, {
      text: _ctx.$t("Description"),
      level: 3,
      textAlign: "left"
    }, null, _parent));
    _push(`<div>${ssrInterpolate(`${_ctx.descr} ${_ctx.pageText}`)}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ratings-all/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { index as default };
//# sourceMappingURL=index-bb9b7ab6.mjs.map
