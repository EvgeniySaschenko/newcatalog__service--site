import{d as x,u as f,k as h,e as N,m as S,l as T,a as b,r as q,c as m,h as p,b as d,t as v,g as w,o as $,j as A}from"./entry.b0782bab.js";import{u as B}from"./index.6916de0d.js";import{A as R}from"./app-ratings-list.3f2bcc3f.js";import k from"./app-preloader.2598caed.js";import C from"./app-title.ff53d84e.js";import"./app-label-rating.19a37322.js";async function _(){let{$api:e}=f(),{params:t,query:s}=h();return await e.getPageSection({sectionId:Number(t.sectionId),page:Number(s.page)||1})}const D=x({async asyncData(){let e,t,{$t:s,$langDefault:i}=f(),{params:c,query:l}=h(),a=([e,t]=N(()=>_()),e=await e,t(),e);a!=null&&a.isError&&a.showError();let n=S().itemsMap[+c.sectionId],r="",u="",o="";Number(l.page)>1&&(o=`(${s("Page")} ${l.page})`),n&&(r=`${n.name[i()]}`.trim(),u=`${n.descr[i()]}`.trim()),T().setBreadcrumbs([{name:r,url:`/${i()}/section/${c.sectionId}`}]);let{pageTitlePrefix:L,pageTitleSufix:y}=b().items;return B({title:`${L} 
      ${s("Section")}: 
      ${r} ${o} ${y}`.trim(),description:`${u} ${o}`.trim()}),{ratingsList:a,sectionName:r,isLoading:!1,descr:u,pageText:o}},data(){return{ratingsList:[],sectionName:"",isLoading:!0,descr:"",pageText:""}},watch:{$route:{async handler(e,t){if(e.path!==t.path){this.isLoading=!0;return}if(e.query.page===t.query.page)return;await this.setRatingsList();let s="";Number(e.query.page)>1&&(s=`(${this.$t("Page")} ${e.query.page})`),this.pageText=s}}},methods:{async setRatingsList(){this.isLoading=!0;try{this.ratingsList=await _()}catch(e){console.error(e),this.ratingsList=[]}finally{this.isLoading=!1}}},components:{AppRatingsList:R}}),I={class:"page page--section"},P={class:"page__ratings-list"},E={key:0,class:"page__descr"};function V(e,t,s,i,c,l){const a=k,g=C,n=q("app-ratings-list");return $(),m("div",I,[p(a,{isLoading:e.isLoading,position:"fixed"},null,8,["isLoading"]),p(g,{text:`${e.$t("Section")}: ${e.sectionName} ${e.pageText}`},null,8,["text"]),d("div",P,[p(n,{ratingsList:e.ratingsList},null,8,["ratingsList"])]),e.descr?($(),m("div",E,[p(g,{text:e.$t("Description"),level:3,textAlign:"left"},null,8,["text"]),d("div",null,v(`${e.descr} ${e.pageText}`),1)])):w("",!0)])}const J=A(D,[["render",V]]);export{J as default};