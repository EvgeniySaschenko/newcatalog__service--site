import { useSSRContext, defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { b as _export_sfc, h as useSectionsStore, _ as __nuxt_component_0$2 } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import __nuxt_component_1 from './app-label-rating-cfbe1985.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    // Curent page
    page: {
      type: Number,
      default: 1
    },
    // Count pages
    pagesCount: {
      type: Number,
      default: 1
    }
  },
  emits: ["update"],
  data() {
    return {
      // List pages
      pages: [],
      // Page curent
      pageCurent: 1
    };
  },
  watch: {
    $route: {
      // Situation, for example, when the user moved from the page (1, 2, 3...) to the main page (/)
      handler(to, from) {
        if (!to.query.page) {
          this.pageCurent = 1;
        }
      }
    }
  },
  created() {
    this.createPagesList();
    this.pageCurent = this.page;
  },
  methods: {
    // Create pages list
    createPagesList() {
      for (let i = 1; this.pagesCount >= i; i++) {
        this.pages.push(i);
      }
    },
    // Add number page to url
    async setUrlParam(page) {
      if (page == this.pageCurent)
        return;
      this.pageCurent = page;
      await this.$router.push({ query: { page: [page] } });
      this.$emit("update", { page });
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
});
function ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-pagination" }, _attrs))} data-v-73853023><div class="app-pagination__list" data-v-73853023><!--[-->`);
  ssrRenderList(_ctx.pages, (item) => {
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: ["app-pagination__item", { active: item === _ctx.pageCurent }],
      to: `/${_ctx.$langDefault()}/?page=${item}`,
      "data-analyzed-element": "pagination-item",
      onClick: ($event) => _ctx.setUrlParam(item)
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item)}`);
        } else {
          return [
            createTextVNode(toDisplayString(item), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-pagination/app-pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppPagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", ssrRender$1], ["__scopeId", "data-v-73853023"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  components: {
    AppPagination
  },
  props: {
    ratingsList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      // Sections map
      sectionsMap: useSectionsStore().itemsMap
    };
  },
  methods: {
    // Reciord number relative all list
    calcNumberRecord(index) {
      let { maxRecordsPerPage, page } = this.ratingsList;
      return (page - 1) * maxRecordsPerPage + (index + 1);
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_app_label_rating = __nuxt_component_1;
  const _component_app_pagination = resolveComponent("app-pagination");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-ratings-list" }, _attrs))} data-v-1956768b><div class="app-ratings-list__items" data-v-1956768b><!--[-->`);
  ssrRenderList(_ctx.ratingsList.items, (item, index) => {
    _push(`<div class="app-ratings-list__item" data-v-1956768b>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "app-ratings-list__title",
      to: `/${_ctx.$langDefault()}/rating/${item.rating.ratingId}`,
      "data-analyzed-element": "ratings-list-title"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item.rating.name[_ctx.$langDefault()])}`);
        } else {
          return [
            createTextVNode(toDisplayString(item.rating.name[_ctx.$langDefault()]), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`<div class="app-ratings-list__descr" data-v-1956768b>${ssrInterpolate(item.rating.descr[_ctx.$langDefault()])}</div>`);
    if (item.labels.length) {
      _push(`<div class="app-ratings-list__labels" data-v-1956768b><!--[-->`);
      ssrRenderList(item.labels, (label) => {
        _push(ssrRenderComponent(_component_app_label_rating, {
          color: label.color,
          text: label.name[_ctx.$langDefault()]
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="app-ratings-list__bottom" data-v-1956768b><div data-v-1956768b><span class="app-ratings-list__number" data-v-1956768b>${ssrInterpolate(`#${_ctx.calcNumberRecord(index)}`)}</span></div><div class="app-ratings-list__sections" data-v-1956768b><!--[-->`);
    ssrRenderList(item.rating.sectionsIds, (sectionId) => {
      _push(`<label class="app-ratings-list__sections-item" data-v-1956768b>${ssrInterpolate(`#${_ctx.sectionsMap[sectionId].name[_ctx.$langDefault()]}`)}</label>`);
    });
    _push(`<!--]--></div></div></div>`);
  });
  _push(`<!--]--></div>`);
  if (_ctx.ratingsList.pagesCount > 1) {
    _push(ssrRenderComponent(_component_app_pagination, {
      pagesCount: _ctx.ratingsList.pagesCount,
      page: _ctx.ratingsList.page
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-ratings-list/app-ratings-list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppRatingsList = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender], ["__scopeId", "data-v-1956768b"]]);

export { AppRatingsList as A };
//# sourceMappingURL=app-ratings-list-f99255e7.mjs.map
