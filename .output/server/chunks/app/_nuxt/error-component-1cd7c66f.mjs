import { executeAsync } from 'unctx';
import { b as _export_sfc, d as defineNuxtComponent, u as useNuxtApp, a as useSettingsStore, _ as __nuxt_component_0$2 } from '../server.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineNuxtComponent({
  async asyncData() {
    let __temp, __restore;
    let { $api } = useNuxtApp();
    let response = ([__temp, __restore] = executeAsync(() => $api.getInit()), __temp = await __temp, __restore(), __temp);
    if (response == null ? void 0 : response.isError) {
      response.showError();
    }
    useSettingsStore().setSettings(response.settings);
    return {};
  },
  created() {
    let { $setTranslations, $setLangs, $setLangDefault } = useNuxtApp();
    let settings = useSettingsStore().items;
    if (settings && Object.keys(settings).length) {
      this.logoImage = settings.imageAppLogo;
      $setTranslations(settings.translations);
      $setLangs(settings.langs);
      $setLangDefault(settings.langDefault);
    }
  },
  data() {
    return {
      logoImage: ""
    };
  },
  props: {
    error: {
      type: Object
    }
  },
  methods: {
    refreshPage() {
      location.reload();
    }
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-error" }, _attrs))}><div class="page-error__box">`);
  if (_ctx.logoImage) {
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "page-error__logo",
      to: `/${_ctx.$langDefault()}`,
      "data-analyzed-element": "page-error-logo"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img class="page-error__logo-img"${ssrRenderAttr("src", _ctx.logoImage)} alt="Logo"${_scopeId}>`);
        } else {
          return [
            createVNode("img", {
              class: "page-error__logo-img",
              src: _ctx.logoImage,
              alt: "Logo"
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="page-error__code">${ssrInterpolate(_ctx.error.statusCode)}</div>`);
  if (_ctx.error.statusCode == 503) {
    _push(`<div class="page-error__text"><div class="page-error__text-1">${ssrInterpolate(_ctx.$t("The server is being updated"))}</div><div class="page-error__text-2">${ssrInterpolate(_ctx.$t("Try refreshing the page a little later"))}</div><button class="page-error__btn">${ssrInterpolate(_ctx.$t("Refresh page"))}</button></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.error.statusCode == 500) {
    _push(`<div class="page-error__text"><div class="page-error__text-1">${ssrInterpolate(_ctx.$t("Server error"))}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.error.statusCode == 404) {
    _push(`<div class="page-error__text"><div class="page-error__text-1">${ssrInterpolate(_ctx.$t("Page not found"))}</div>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "page-error__btn",
      to: `/${_ctx.$langDefault()}`,
      "data-analyzed-element": "page-error-button-home"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(_ctx.$t("Go to Main Page"))}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.$t("Go to Main Page")), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.error.statusCode == 204) {
    _push(`<div class="page-error__text"><div class="page-error__text-1">${ssrInterpolate(_ctx.$t("Page content not found"))}</div>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "page-error__btn",
      to: `/${_ctx.$langDefault()}`,
      "data-analyzed-element": "page-error-button-home"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(_ctx.$t("Go to Main Page"))}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.$t("Go to Main Page")), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { error as default };
//# sourceMappingURL=error-component-1cd7c66f.mjs.map
