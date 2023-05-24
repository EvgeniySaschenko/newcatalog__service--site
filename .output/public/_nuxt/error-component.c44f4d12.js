import{d as h,u as d,e as m,a as p,o as s,c as n,b as r,f,w as i,g as l,t as o,h as c,i as u,_ as $,j as v}from"./entry.39c8ed01.js";const y=h({async asyncData(){let e,a,{$api:_}=d(),t=([e,a]=m(()=>_.getInit()),e=await e,a(),e);return t!=null&&t.isError&&t.showError(),p().setSettings(t.settings),{}},created(){let{$setTranslations:e,$setLangs:a,$setLangDefault:_}=d(),t=p().items;t&&Object.keys(t).length&&(this.logoImage=t.imageAppLogo,e(t.translations),a(t.langs),_(t.langDefault))},data(){return{logoImage:""}},props:{error:{type:Object}},methods:{refreshPage(){location.reload()}}}),b={class:"page-error"},k={class:"page-error__box"},C=["src"],D={class:"page-error__code"},N={key:1,class:"page-error__text"},P={class:"page-error__text-1"},I={class:"page-error__text-2"},S={key:2,class:"page-error__text"},w={class:"page-error__text-1"},B={key:3,class:"page-error__text"},L={class:"page-error__text-1"},T={key:4,class:"page-error__text"},V={class:"page-error__text-1"};function j(e,a,_,t,z,A){const g=$;return s(),n("div",b,[r("div",k,[e.logoImage?(s(),f(g,{key:0,class:"page-error__logo",to:`/${e.$langDefault()}`,"data-analyzed-element":"page-error-logo"},{default:i(()=>[r("img",{class:"page-error__logo-img",src:e.logoImage,alt:"Logo"},null,8,C)]),_:1},8,["to"])):l("",!0),r("div",D,o(e.error.statusCode),1),e.error.statusCode==503?(s(),n("div",N,[r("div",P,o(e.$t("The server is being updated")),1),r("div",I,o(e.$t("Try refreshing the page a little later")),1),r("button",{class:"page-error__btn",onClick:a[0]||(a[0]=E=>e.refreshPage())},o(e.$t("Refresh page")),1)])):l("",!0),e.error.statusCode==500?(s(),n("div",S,[r("div",w,o(e.$t("Server error")),1)])):l("",!0),e.error.statusCode==404?(s(),n("div",B,[r("div",L,o(e.$t("Page not found")),1),c(g,{class:"page-error__btn",to:`/${e.$langDefault()}`,"data-analyzed-element":"page-error-button-home"},{default:i(()=>[u(o(e.$t("Go to Main Page")),1)]),_:1},8,["to"])])):l("",!0),e.error.statusCode==204?(s(),n("div",T,[r("div",V,o(e.$t("Page content not found")),1),c(g,{class:"page-error__btn",to:`/${e.$langDefault()}`,"data-analyzed-element":"page-error-button-home"},{default:i(()=>[u(o(e.$t("Go to Main Page")),1)]),_:1},8,["to"])])):l("",!0)])])}const G=v(y,[["render",j]]);export{G as default};
