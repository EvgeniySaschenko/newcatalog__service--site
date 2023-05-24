import { getCurrentInstance, version, ref, watchEffect, hasInjectionContext, inject, defineAsyncComponent, useSSRContext, unref, toRefs, reactive, defineComponent, computed, h, resolveComponent, createApp, watch, toRef, onServerPrefetch, markRaw, effectScope, isRef, isReactive, toRaw, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, provide, onErrorCaptured, resolveDynamicComponent, getCurrentScope, onScopeDispose, nextTick, shallowRef, isReadonly, isShallow, createElementBlock, Suspense, Transition } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { createError as createError$1, appendResponseHeader, sanitizeStatusCode } from 'h3';
import { renderSSRHead } from '@unhead/ssr';
import { unpackMeta, composableNames, getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1, RouterView } from 'vue-router';
import { hasProtocol, parseURL, parseQuery, withTrailingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import VueLazyLoad from 'vue3-lazyload';
import { parse, serialize } from 'cookie-es';
import { isEqual } from 'ohash';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options2) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.5.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options2
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options2.ssrContext.runtimeConfig.public,
      app: options2.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options2.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin2);
    if ((_a = plugin2.meta) == null ? void 0 : _a.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin2 of _plugins2) {
    if (typeof plugin2 !== "function") {
      continue;
    }
    let _plugin = plugin2;
    if (plugin2.length > 1) {
      _plugin = (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin2, meta) {
  var _a;
  if (typeof plugin2 === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin2 }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin2.hooks) {
      nuxtApp.hooks.addHooks(plugin2.hooks);
    }
    if (plugin2.setup) {
      return plugin2.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin2.name || ((_a = plugin2.setup) == null ? void 0 : _a.name),
    parallel: plugin2.parallel,
    order: (meta == null ? void 0 : meta.order) || plugin2.order || orderMap[plugin2.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      {
        throw new Error("[nuxt] instance unavailable");
      }
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const isVue2 = false;
/*!
  * pinia v2.0.36
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options2, pinia, hot) {
  const { state, actions, getters } = options2;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options2, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options2 = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options2);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options2;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options3 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options3.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options3.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options3)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options2.hydrate) {
    options2.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options2;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options2 = isSetupStore ? setupOptions : setup;
  } else {
    options2 = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || currentInstance && inject(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options2, pinia);
      } else {
        createOptionsStore(id, options2, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createServerHead(options2 = {}) {
  const head = createServerHead$1({
    ...options2,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options2 == null ? void 0 : options2.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
function VueReactiveUseHeadPlugin() {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
}
function clientUseHead(input, options2 = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options2);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options2 = {}) {
  const head = injectHead();
  return head.push(input, options2);
}
function useHead(input, options2 = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options2.mode === "server" && isBrowser || options2.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options2) : serverUseHead(input, options2);
  }
}
function useSeoMeta(input, options2) {
  const headInput = ref({});
  watchEffect(() => {
    const resolvedMeta = resolveUnrefHeadInput(input);
    const { title, titleTemplate, ...meta } = resolvedMeta;
    headInput.value = {
      title,
      titleTemplate,
      meta: unpackMeta(meta)
    };
  });
  return useHead(headInput, options2);
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options2) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options2 == null ? void 0 : options2.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options2 == null ? void 0 : options2.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      async function redirect() {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options2 == null ? void 0 : options2.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return inMiddleware ? (
          /* abort route navigation */
          false
        ) : void 0;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect() : void 0);
        return to;
      }
      return redirect();
    }
  }
  if (isExternal) {
    if (options2 == null ? void 0 : options2.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options2 == null ? void 0 : options2.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const getDefault = () => null;
function useAsyncData(...args) {
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options2 = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options2.server = options2.server ?? true;
  options2.default = options2.default ?? getDefault;
  options2.lazy = options2.lazy ?? false;
  options2.immediate = options2.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? ((_a = options2.default) == null ? void 0 : _a.call(options2)) ?? null),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options2.transform) {
        result = options2.transform(_result);
      }
      if (options2.pick) {
        result = pick(result, options2.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(((_a2 = options2.default) == null ? void 0 : _a2.call(options2)) ?? null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options2.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options2.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const NuxtComponentIndicator = "__nuxt_component";
async function runLegacyAsyncData(res, fn) {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const vm = getCurrentInstance();
  const { fetchKey } = vm.proxy.$options;
  const key = typeof fetchKey === "function" ? fetchKey(() => "") : fetchKey || route.fullPath;
  const { data, error } = await useAsyncData(`options:asyncdata:${key}`, () => nuxtApp.runWithContext(() => fn(nuxtApp)));
  if (error.value) {
    throw createError(error.value);
  }
  if (data.value && typeof data.value === "object") {
    Object.assign(await res, toRefs(reactive(data.value)));
  }
}
const defineNuxtComponent = function defineNuxtComponent2(options2) {
  const { setup } = options2;
  if (!setup && !options2.asyncData && !options2.head) {
    return {
      [NuxtComponentIndicator]: true,
      ...options2
    };
  }
  return {
    [NuxtComponentIndicator]: true,
    ...options2,
    setup(props, ctx) {
      const nuxtApp = useNuxtApp();
      const res = setup ? Promise.resolve(nuxtApp.runWithContext(() => setup(props, ctx))).then((r) => r || {}) : {};
      const promises = [];
      if (options2.asyncData) {
        promises.push(runLegacyAsyncData(res, options2.asyncData));
      }
      if (options2.head) {
        const nuxtApp2 = useNuxtApp();
        useHead(typeof options2.head === "function" ? () => options2.head(nuxtApp2) : options2.head);
      }
      return Promise.resolve(res).then(() => Promise.all(promises)).then(() => res).finally(() => {
        promises.length = 0;
      });
    }
  };
};
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.node.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendResponseHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options2) {
  const componentName = options2.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options2.trailingSlash !== "append" && options2.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options2.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options2.activeClass,
            exactActiveClass: props.exactActiveClass || options2.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options2.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options2.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyAppPreloader = defineAsyncComponent(() => import('./_nuxt/app-preloader-954716fa.mjs').then((r) => r.default));
const LazyAppLabelRating = defineAsyncComponent(() => import('./_nuxt/app-label-rating-cfbe1985.mjs').then((r) => r.default));
const LazyAppTitle = defineAsyncComponent(() => import('./_nuxt/app-title-a456aaab.mjs').then((r) => r.default));
const lazyGlobalComponents = [
  ["AppPreloader", LazyAppPreloader],
  ["AppLabelRating", LazyAppLabelRating],
  ["AppTitle", LazyAppTitle]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const _routes = [
  {
    name: "rating",
    path: "/rating",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-a3018519.mjs').then((m) => m.default || m)
  },
  {
    name: "rating-labels-sections",
    path: "/rating/labels-sections",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/labels-sections-cf7e2130.mjs').then((m) => m.default || m)
  },
  {
    name: "rating-links-sources",
    path: "/rating/links-sources",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/links-sources-23e44b8f.mjs').then((m) => m.default || m)
  },
  {
    name: "rating-rating-items",
    path: "/rating/rating-items",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/rating-items-7521bcbc.mjs').then((m) => m.default || m)
  },
  {
    name: "ratings-all",
    path: "/ratings-all",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-fc9ba44a.mjs').then((m) => m.default || m)
  },
  {
    name: "section",
    path: "/section",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-b7e48b8a.mjs').then((m) => m.default || m)
  }
];
const $router = {
  routes: (routes) => [
    {
      name: "home",
      path: "/",
      component: () => import('./_nuxt/index-fc9ba44a.mjs')
    },
    {
      name: "ratings-all",
      path: "/:lang",
      component: () => import('./_nuxt/index-fc9ba44a.mjs')
    },
    {
      name: "rating",
      path: "/:lang/rating/:ratingId",
      component: () => import('./_nuxt/index-a3018519.mjs')
    },
    {
      name: "section",
      path: "/:lang/section/:sectionId",
      component: () => import('./_nuxt/index-b7e48b8a.mjs')
    }
  ]
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...$router
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const component of to.matched) {
        const componentMiddleware = component.meta.middleware;
        if (!componentMiddleware) {
          continue;
        }
        if (Array.isArray(componentMiddleware)) {
          for (const entry2 of componentMiddleware) {
            middlewareEntries.add(entry2);
          }
        } else {
          middlewareEntries.add(componentMiddleware);
        }
      }
      for (const entry2 of middlewareEntries) {
        const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
        if (!middleware) {
          throw new Error(`Unknown route middleware: '${entry2}'.`);
        }
        const result = await nuxtApp.runWithContext(() => middleware(to, from));
        {
          if (result === false || result instanceof Error) {
            const error2 = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            await nuxtApp.runWithContext(() => showError(error2));
            return false;
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
}, 1);
class PluginApi {
  constructor(plugins2) {
    __publicField(this, "_plugins", {});
    this._plugins = plugins2;
  }
  // Get page rating
  async getPageRating({
    ratingId
  }) {
    let result = await this._plugins.$request(`/api/data?data=page-rating&ratingId=${ratingId}`, {
      method: "GET"
    });
    return result;
  }
  // Get page ratings list section
  async getPageSection({
    sectionId,
    page
  }) {
    let result = await this._plugins.$request(
      `/api/data?data=page-section&sectionId=${sectionId}&page=${page}`,
      {
        method: "GET"
      }
    );
    return result;
  }
  // Get page ratings list all
  async getPageRatingsAll({
    page
  }) {
    let result = await this._plugins.$request(`/api/data?data=page-ratings-all&page=${page}`, {
      method: "GET"
    });
    return result;
  }
  // Get sections
  async getInit() {
    let result = await this._plugins.$request(`/api/data?data=init`, {
      method: "GET"
    });
    return result;
  }
}
const api_GFfDXud5Cr = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  let context = nuxtApp;
  return {
    provide: {
      api: new PluginApi(context)
    }
  };
});
class PluginConfigApp {
  constructor() {
    __publicField(this, "cookies", {
      // Current language
      lang: "lang",
      // Current cache id - to refresh the page if the cache has changed
      cacheId: "cacheId"
    });
    // image stub
    __publicField(this, "imageStub", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  }
}
const config_Lw1zr0Vi5r = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      configApp: new PluginConfigApp()
    }
  };
});
const useSettingsStore = defineStore("settings", {
  state: () => ({
    items: {}
  }),
  actions: {
    // Set settings
    setSettings(items) {
      this.items = items;
    }
  }
});
let options = {
  observerOptions: {
    rootMargin: "100px 0px 100px 0px"
  }
};
const lazy_load_Ii6vFyPvsK = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  let { imageAppDefault } = useSettingsStore().items;
  nuxtApp.vueApp.use(VueLazyLoad, Object.assign(options, { error: imageAppDefault }));
});
const redirect_TPR3QTtWHS = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
});
class PluginRequest {
  defaultParams() {
    return {
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
  async request(url, params) {
    if (params && params.method !== "GET") {
      params = Object.assign(this.defaultParams(), params);
    }
    let response = await $fetch(url, params);
    let statusCode = response == null ? void 0 : response.statusCode;
    switch (statusCode) {
      case 204:
      case 404:
      case 500:
      case 503:
        return {
          isError: true,
          showError: () => {
            throw showError({ statusCode, fatal: true });
          }
        };
      case 205:
        location.reload();
        break;
    }
    return response;
  }
}
const request_8cwBTcUfTa = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  let pluginRequest = new PluginRequest();
  return {
    provide: {
      // Function for requests to server. It is needed to set general rules for all requests
      request: pluginRequest.request
    }
  };
});
class PluginTranslations {
  constructor(plugins2) {
    __publicField(this, "translations", {});
    // ['en', 'uk']
    __publicField(this, "_langs", []);
    // 'en'
    __publicField(this, "_langDefault", "");
    __publicField(this, "_plugins", {});
    this._plugins = plugins2;
  }
  // Function for  translate
  t(key) {
    if (!this.translations)
      return key;
    if (!this.translations[this._langDefault])
      return key;
    return this.translations[this._langDefault][key] || key;
  }
  // Set lang default
  setLangDefault(langDefault) {
    var _a;
    let cookitName = this._plugins.$configApp.cookies.lang;
    let cookieLangDefault = useCookie(cookitName).value;
    this._langDefault = cookieLangDefault;
    let { params, path } = useRoute();
    if ((params == null ? void 0 : params.lang) && params.lang !== this._langDefault) {
      this._langDefault = params.lang;
    }
    let error = useError();
    if (((_a = error == null ? void 0 : error.value) == null ? void 0 : _a.statusCode) == 404) {
      let lang = path.split("/")[1];
      this._langDefault = lang;
    }
    if (!this._langs.includes(this._langDefault)) {
      this._langDefault = langDefault;
    }
  }
  // Set langs
  setLangs(langs) {
    this._langs = langs;
  }
  // Set translations
  setTranslations(translations) {
    this.translations = translations;
  }
  // Get langDefault
  getLangDefault() {
    return this._langDefault;
  }
  // Get langs
  getLangs() {
    return this._langs;
  }
}
const translations_DWHk0W6D9U = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  let context = nuxtApp;
  let pluginTranslations = new PluginTranslations(context);
  let { getLangs, getLangDefault, t, setLangDefault, setLangs, setTranslations } = pluginTranslations;
  return {
    // As an exception, the "plugin" prefix was not added
    provide: {
      // All langs
      langs: getLangs.bind(pluginTranslations),
      // Lang default (Current language)
      langDefault: getLangDefault.bind(pluginTranslations),
      // Function for  translate
      t: t.bind(pluginTranslations),
      // setLangDefault
      setLangDefault: setLangDefault.bind(pluginTranslations),
      // setLangs
      setLangs: setLangs.bind(pluginTranslations),
      // setTranslations
      setTranslations: setTranslations.bind(pluginTranslations)
    }
  };
});
const _plugins = [
  plugin$1,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  plugin,
  api_GFfDXud5Cr,
  config_Lw1zr0Vi5r,
  lazy_load_Ii6vFyPvsK,
  redirect_TPR3QTtWHS,
  request_8cwBTcUfTa,
  translations_DWHk0W6D9U
];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    document.addEventListener("click", this.listenerClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.listenerClickOutside);
  },
  methods: {
    // Swich lang
    swichLang(item) {
      let { fullPath, params } = this.$route;
      let partsUrl = fullPath.split("/");
      if (this.$langDefault() === item)
        return;
      if (params.lang) {
        partsUrl[1] = item;
      }
      useCookie(this.$configApp.cookies.lang, {
        maxAge: 3600 * 24 * 365
      }).value = item;
      window.location.href = partsUrl.join("/");
    },
    // Show / hidden list
    toggleList() {
      this.isShow = !this.isShow;
    },
    // Hidden list - if click outside
    listenerClickOutside(event) {
      if (!this.isShow)
        return;
      if (!event.target.closest("[data-app-language-swich]")) {
        this.isShow = false;
      }
    }
  }
});
function ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (_ctx.$langs().length > 1) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: "app-language-swich",
      "data-app-language-swich": ""
    }, _attrs))} data-v-b193b5f9><div class="app-language-swich__current" data-v-b193b5f9>${ssrInterpolate(_ctx.$langDefault())}</div><div class="app-language-swich__box" data-v-b193b5f9><ul class="app-language-swich__list" style="${ssrRenderStyle(_ctx.isShow ? null : { display: "none" })}" data-v-b193b5f9><!--[-->`);
    ssrRenderList(_ctx.$langs(), (item) => {
      _push(`<li data-gtm-element="header-language-swich-item" class="${ssrRenderClass([{ active: _ctx.$langDefault() == item }, "app-language-swich__item"])}" data-v-b193b5f9>${ssrInterpolate(item)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-language-swich/app-language-swich.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const AppLanguageSwich = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", ssrRender$6], ["__scopeId", "data-v-b193b5f9"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    // sections
    sections: {
      type: Array,
      default: () => []
    },
    // Is show menu main
    modelValue: {
      type: Boolean,
      default: false
    },
    // Logo image second
    imageAppLogo: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"],
  watch: {
    // Body scroll toggle
    modelValue(current, prev) {
      let bodyElement = document.querySelector("body");
      if (!bodyElement)
        return;
      if (current) {
        bodyElement.classList.add("body-scroll-lock");
      } else {
        bodyElement.classList.remove("body-scroll-lock");
      }
    }
  },
  methods: {
    // Close menu
    closeMenu() {
      this.$emit("update:modelValue", false);
    }
  }
});
function ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  if (_ctx.modelValue) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-menu-main" }, _attrs))} data-v-99d61a35><div class="app-menu-main__wrapper" data-v-99d61a35><div class="app-menu-main__btn-close" data-gtm-element="menu-main-button-close" data-v-99d61a35></div>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "app-menu-main__logo",
      to: `/${_ctx.$langDefault()}`,
      onClick: ($event) => _ctx.closeMenu(),
      "data-gtm-element": "menu-main-logo"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img class="app-menu-main__logo-img"${ssrRenderAttr("src", _ctx.imageAppLogo)} data-v-99d61a35${_scopeId}>`);
        } else {
          return [
            createVNode("img", {
              class: "app-menu-main__logo-img",
              src: _ctx.imageAppLogo
            }, null, 8, ["src"])
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<ul class="app-menu-main__list" data-v-99d61a35><!--[-->`);
    ssrRenderList(_ctx.sections, (item, index) => {
      _push(`<li class="app-menu-main__item" data-v-99d61a35>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["app-menu-main__link", { active: _ctx.$route.path == `/${_ctx.$langDefault()}/section/${item.sectionId}` }],
        to: `/${_ctx.$langDefault()}/section/${item.sectionId}`,
        "data-gtm-element": "menu-main-item",
        onClick: ($event) => _ctx.closeMenu()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.name[_ctx.$langDefault()])}`);
          } else {
            return [
              createTextVNode(toDisplayString(item.name[_ctx.$langDefault()]), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-menu-main/app-menu-main.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const AppMenuMain = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", ssrRender$5], ["__scopeId", "data-v-99d61a35"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  components: {
    AppLanguageSwich,
    AppMenuMain
  },
  props: {
    imageAppLogo: {
      type: String,
      required: true
    },
    headerHtml: {
      type: String,
      default: ""
    },
    // sections
    sections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowMenuMain: false
    };
  },
  methods: {
    toggleMenuMain() {
      this.isShowMenuMain = !this.isShowMenuMain;
    }
  }
});
function ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_app_language_swich = resolveComponent("app-language-swich");
  const _component_app_menu_main = resolveComponent("app-menu-main");
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "app-header" }, _attrs))} data-v-4f4e6684><div class="app-header__row container" data-v-4f4e6684><div class="app-header__col app-header__col--logo" data-v-4f4e6684>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "app-header__logo",
    to: `/${_ctx.$langDefault()}`,
    "data-gtm-element": "header-logo"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="app-header__logo-img"${ssrRenderAttr("src", _ctx.imageAppLogo)} alt="Logo" data-v-4f4e6684${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "app-header__logo-img",
            src: _ctx.imageAppLogo,
            alt: "Logo"
          }, null, 8, ["src"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="app-header__col app-header__col--custom-code" data-v-4f4e6684>`);
  if (_ctx.headerHtml) {
    _push(`<div class="app-header__custom-code" data-v-4f4e6684>${_ctx.headerHtml}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="app-header__col app-header__col--control" data-v-4f4e6684><div class="app-header__langs" data-v-4f4e6684>`);
  _push(ssrRenderComponent(_component_app_language_swich, null, null, _parent));
  _push(`</div><div class="app-header__btn-menu" data-gtm-element="header-button-menu-main" data-v-4f4e6684><div class="app-header__btn-menu-item" data-v-4f4e6684></div><div class="app-header__btn-menu-item" data-v-4f4e6684></div><div class="app-header__btn-menu-item" data-v-4f4e6684></div></div></div></div>`);
  _push(ssrRenderComponent(_component_app_menu_main, {
    modelValue: _ctx.isShowMenuMain,
    "onUpdate:modelValue": ($event) => _ctx.isShowMenuMain = $event,
    sections: _ctx.sections,
    imageAppLogo: _ctx.imageAppLogo
  }, null, _parent));
  _push(`</header>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-header/app-header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", ssrRender$4], ["__scopeId", "data-v-4f4e6684"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    footerHtml: {
      type: String,
      default: ""
    }
  }
});
function ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "app-footer" }, _attrs))} data-v-716d91a8><div class="container" data-v-716d91a8>`);
  if (_ctx.footerHtml) {
    _push(`<div class="app-footer__row" data-v-716d91a8><div class="app-footer__custom-code" data-v-716d91a8>${_ctx.footerHtml}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="app-footer__row" data-v-716d91a8><div class="app-footer__langs" data-v-716d91a8><!--[-->`);
  ssrRenderList(_ctx.$langs(), (item) => {
    _push(`<a class="app-footer__langs-item"${ssrRenderAttr("href", `/${item}`)} data-gtm-element="footer-langs-item" data-v-716d91a8>${ssrInterpolate(item)}</a>`);
  });
  _push(`<!--]--></div></div></div></footer>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-footer/app-footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", ssrRender$3], ["__scopeId", "data-v-716d91a8"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    // sections
    sections: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.scrollLeftItem(+route.params.sectionId);
      }
    }
  },
  mounted() {
    let route = useRoute();
    this.scrollLeftItem(+route.params.sectionId);
  },
  methods: {
    scrollLeftItem(sectionId) {
      let sliderMenu = this.$refs["app-menu-slider"];
      let menuLeft = sliderMenu.getBoundingClientRect().left;
      let itemLeft = 0;
      if (sectionId) {
        itemLeft = sliderMenu.querySelector(`[data-app-menu-slider='${sectionId}']`).getBoundingClientRect().left;
      }
      let scrolLeft = sectionId ? itemLeft - menuLeft + sliderMenu.scrollLeft : 0;
      sliderMenu.scrollTo({
        left: scrolLeft,
        behavior: "smooth"
      });
    }
  }
});
function ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<ul${ssrRenderAttrs(mergeProps({
    class: "app-menu-slider",
    ref: "app-menu-slider"
  }, _attrs))} data-v-1b7a407c><!--[-->`);
  ssrRenderList(_ctx.sections, (item, index) => {
    _push(`<li class="app-menu-slider__item"${ssrRenderAttr("data-app-menu-slider", item.sectionId)} data-v-1b7a407c>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: ["app-menu-slider__link", { active: _ctx.$route.path == `/${_ctx.$langDefault()}/section/${item.sectionId}` }],
      "data-gtm-element": "menu-slider-item",
      to: `/${_ctx.$langDefault()}/section/${item.sectionId}`
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item.name[_ctx.$langDefault()])}`);
        } else {
          return [
            createTextVNode(toDisplayString(item.name[_ctx.$langDefault()]), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</li>`);
  });
  _push(`<!--]--></ul>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-menu-slider/app-menu-slider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AppMenuSlider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", ssrRender$2], ["__scopeId", "data-v-1b7a407c"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      items: []
    };
  },
  watch: {
    breadcrumbs: {
      deep: true,
      immediate: true,
      handler() {
        this.items = [
          {
            name: this.$t("Home"),
            url: `/${this.$langDefault()}`
          },
          ...this.breadcrumbs
        ];
      }
    }
  }
});
const __nuxt_component_0$1 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-breadcrumbs" }, _attrs))} data-v-b9710851>`);
  _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app-breadcrumbs/app-breadcrumbs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppBreadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", ssrRender$1], ["__scopeId", "data-v-b9710851"]]);
const useSectionsStore = defineStore("sections", {
  state: () => ({
    items: [],
    itemsMap: {}
  }),
  actions: {
    // Set sections
    setSections(items) {
      this.items = items;
      for (let section of items) {
        let sectionId = section.sectionId;
        this.itemsMap[sectionId] = section;
      }
    }
  }
});
const useBreadcrumbsStore = defineStore("breadcrumbs", {
  state: () => ({
    items: []
  }),
  actions: {
    // Breadcrumbs
    setBreadcrumbs(items) {
      this.items = items;
    }
  }
});
var SettingsEnum = /* @__PURE__ */ ((SettingsEnum2) => {
  SettingsEnum2["langDefault"] = "langDefault";
  SettingsEnum2["langs"] = "langs";
  SettingsEnum2["translations"] = "translations";
  SettingsEnum2["imageAppFavicon"] = "imageAppFavicon";
  SettingsEnum2["imageAppPreloader"] = "imageAppPreloader";
  SettingsEnum2["imageAppLogo"] = "imageAppLogo";
  SettingsEnum2["imageAppDefault"] = "imageAppDefault";
  SettingsEnum2["colorBodyBackground"] = "colorBodyBackground";
  SettingsEnum2["colorPrimary"] = "colorPrimary";
  SettingsEnum2["colorPrimaryInverted"] = "colorPrimaryInverted";
  SettingsEnum2["colorTextRegular"] = "colorTextRegular";
  SettingsEnum2["colorSelectionBackground"] = "colorSelectionBackground";
  SettingsEnum2["colorSelectionText"] = "colorSelectionText";
  SettingsEnum2["headScript"] = "headScript";
  SettingsEnum2["headStyles"] = "headStyles";
  SettingsEnum2["headerInfoHtml"] = "headerInfoHtml";
  SettingsEnum2["headerHtml"] = "headerHtml";
  SettingsEnum2["contentTopHtml"] = "contentTopHtml";
  SettingsEnum2["contentBottomHtml"] = "contentBottomHtml";
  SettingsEnum2["footerHtml"] = "footerHtml";
  SettingsEnum2["pageTitlePrefix"] = "pageTitlePrefix";
  SettingsEnum2["pageTitleSufix"] = "pageTitleSufix";
  SettingsEnum2["googleTagManagerCode"] = "googleTagManagerCode";
  return SettingsEnum2;
})(SettingsEnum || {});
const _sfc_main$1 = /* @__PURE__ */ defineNuxtComponent({
  async asyncData() {
    let __temp, __restore;
    let { $api } = useNuxtApp();
    let response = ([__temp, __restore] = executeAsync(() => $api.getInit()), __temp = await __temp, __restore(), __temp);
    if (response == null ? void 0 : response.isError) {
      response.showError();
    }
    let { sections, settings } = response;
    useSectionsStore().setSections(sections);
    useSettingsStore().setSettings(settings);
    return {};
  },
  head() {
    let settings = useSettingsStore().items;
    let headStyles = `
      :root {
        --app-color-body-background: ${settings[SettingsEnum.colorBodyBackground]};
        --app-color-primary: ${settings[SettingsEnum.colorPrimary]};
        --app-color-primary-inverted: ${settings[SettingsEnum.colorPrimaryInverted]};
        --app-color-text-regular: ${settings[SettingsEnum.colorTextRegular]};
        --app-color-selection-background: ${settings[SettingsEnum.colorSelectionBackground]};
        --app-color-selection-text: ${settings[SettingsEnum.colorSelectionText]};
        --app-image-preloader: url(${settings[SettingsEnum.imageAppPreloader]});
      }
      ${settings[SettingsEnum.headStyles]}`;
    return {
      style: [headStyles],
      script: [settings[SettingsEnum.headScript]]
    };
  },
  data() {
    return {
      sections: useSectionsStore().items,
      settings: useSettingsStore().items,
      SettingsEnum
    };
  },
  computed: {
    breadcrumbs() {
      return useBreadcrumbsStore().items;
    }
  },
  created() {
    let { $setTranslations, $setLangs, $setLangDefault } = useNuxtApp();
    let { translations, langs, langDefault } = useSettingsStore().items;
    $setTranslations(translations);
    $setLangs(langs);
    $setLangDefault(langDefault);
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenuSlider,
    AppBreadcrumbs
  }
});
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const layouts = {};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_header = resolveComponent("app-header");
  const _component_app_breadcrumbs = resolveComponent("app-breadcrumbs");
  const _component_app_menu_slider = resolveComponent("app-menu-slider");
  const _component_nuxt_layout = __nuxt_component_0;
  const _component_nuxt_page = __nuxt_component_1;
  const _component_app_footer = resolveComponent("app-footer");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))}>`);
  if (_ctx.settings[_ctx.SettingsEnum.headerInfoHtml]) {
    _push(`<div class="wrapper__info-band">${_ctx.settings[_ctx.SettingsEnum.headerInfoHtml]}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_app_header, {
    imageAppLogo: _ctx.settings[_ctx.SettingsEnum.imageAppLogo],
    headerHtml: _ctx.settings[_ctx.SettingsEnum.headerHtml],
    sections: _ctx.sections
  }, null, _parent));
  _push(`<div class="app-content container">`);
  _push(ssrRenderComponent(_component_app_breadcrumbs, { breadcrumbs: _ctx.breadcrumbs }, null, _parent));
  if (_ctx.settings[_ctx.SettingsEnum.contentTopHtml]) {
    _push(`<div class="app-content__custom-code-top">${_ctx.settings[_ctx.SettingsEnum.contentTopHtml]}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_app_menu_slider, { sections: _ctx.sections }, null, _parent));
  _push(`<div class="app-content__layout">`);
  _push(ssrRenderComponent(_component_nuxt_layout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_nuxt_page, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_nuxt_page)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  if (_ctx.settings[_ctx.SettingsEnum.contentBottomHtml]) {
    _push(`<div class="app-content__custom-code-bottom">${_ctx.settings[_ctx.SettingsEnum.contentBottomHtml]}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  _push(ssrRenderComponent(_component_app_footer, {
    footerHtml: _ctx.settings[_ctx.SettingsEnum.footerHtml]
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-6f89b241.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-e3e3f562.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0$2 as _, useSettingsStore as a, _export_sfc as b, createError as c, defineNuxtComponent as d, entry$1 as default, useRoute as e, useBreadcrumbsStore as f, useSeoMeta as g, useSectionsStore as h, useNuxtApp as u };
//# sourceMappingURL=server.mjs.map
