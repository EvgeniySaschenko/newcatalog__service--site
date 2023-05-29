import{d as y,u as _,e as x,k as $,l as T,m as N,a as S,r as w,c as u,h as r,b as c,t as b,g as q,o as m,j as v}from"./entry.b0782bab.js";import{u as A}from"./index.6916de0d.js";import{A as R}from"./app-ratings-list.3f2bcc3f.js";import B from"./app-preloader.2598caed.js";import E from"./app-title.ff53d84e.js";import"./app-label-rating.19a37322.js";async function d(){let{$api:e}=_(),{query:t}=$();return await e.getPageRatingsAll({page:Number(t.page)||1})}const k=y({async asyncData(){let e,t,{$t:i,$langDefault:p}=_(),s=([e,t]=x(()=>d()),e=await e,t(),e);if(s!=null&&s.isError)return s.showError();let{query:n}=$(),o=T(),a=Number(n.page)>1?`(${i("Page")} ${n.page})`:"",g=`#${N().items.map(L=>L.name[p()]).join(" #")}`;o.setBreadcrumbs([]);let{pageTitlePrefix:f,pageTitleSufix:h}=S().items;return A({title:`${f} ${i("#Title main page")} ${a} ${h}`.trim(),description:`${g} ${a}`.trim()}),{ratingsList:s,isLoading:!1,title:`${i("#Title main page")}`.trim(),pageText:a,descr:g}},data(){return{ratingsList:[],isLoading:!0,title:"",pageText:"",descr:""}},watch:{$route:{async handler(e,t){if(e.path!==t.path){this.isLoading=!0;return}e.query.page!==t.query.page&&(this.pageText=Number(e.query.page)>1?`(${this.$t("Page")} ${e.query.page})`:"",await this.setRatingsList())}}},methods:{async setRatingsList(){this.isLoading=!0;try{let e=await d();if(e!=null&&e.isError)return e.showError();this.ratingsList=e}catch(e){console.error(e),this.ratingsList=[]}finally{this.isLoading=!1}}},components:{AppRatingsList:R}}),D={class:"page page--section"},P={class:"page__ratings-list"},C={key:0,class:"page__descr"};function V(e,t,i,p,s,n){const o=B,a=E,l=w("app-ratings-list");return m(),u("div",D,[r(o,{isLoading:e.isLoading,position:"fixed"},null,8,["isLoading"]),r(a,{text:`${e.$t("#Title main page")} ${e.pageText}`},null,8,["text"]),c("div",P,[r(l,{ratingsList:e.ratingsList},null,8,["ratingsList"])]),e.descr?(m(),u("div",C,[r(a,{text:e.$t("Description"),level:3,textAlign:"left"},null,8,["text"]),c("div",null,b(`${e.descr} ${e.pageText}`),1)])):q("",!0)])}const I=v(k,[["render",V]]);export{I as default};