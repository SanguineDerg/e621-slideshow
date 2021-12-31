(this["webpackJsonpe621-slideshow"]=this["webpackJsonpe621-slideshow"]||[]).push([[0],{10:function(e,t,n){e.exports={displayContainer:"Display_displayContainer__1y-B5",image:"Display_image__1JJz2",text:"Display_text__1LbkM"}},15:function(e,t,n){e.exports={view:"View_view__2vr6n",hidden:"View_hidden__2bpX_",visible:"View_visible__v_6PK"}},18:function(e,t,n){e.exports={aboutContainer:"About_aboutContainer__2-Izw",aboutBody:"About_aboutBody__KCsHs"}},19:function(e,t,n){e.exports={searchContainer:"Search_searchContainer__3moQ_",searchForm:"Search_searchForm__1H5ES"}},31:function(e,t,n){e.exports={cache:"Cache_cache__Nm8x0"}},32:function(e,t,n){e.exports={settingsContainer:"Settings_settingsContainer__mrRal"}},33:function(e,t,n){e.exports={manageSetButton:"ManageSetButton_manageSetButton__2Mv6b"}},34:function(e,t,n){e.exports={slideshowContainer:"Slideshow_slideshowContainer__3_r4l"}},39:function(e,t,n){},40:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(13),r=n.n(i),c=(n(39),n(40),n(8)),o=function(){return Object(c.b)()},u=c.c,l=n(2),d=Object(l.c)({name:"view",initialState:{screen:"search"},reducers:{switchScreen:function(e,t){e.screen=t.payload}}}),f=d.actions.switchScreen,p=function(e){return e.view.screen},h=d.reducer,j=n(18),_=n.n(j),b=n(0);function g(){var e=o();return Object(b.jsxs)("div",{className:_.a.aboutContainer,children:[Object(b.jsx)("h1",{children:"About"}),Object(b.jsxs)("div",{className:_.a.aboutBody,children:[Object(b.jsxs)("p",{children:["This is a slideshow web app for ",Object(b.jsx)("a",{href:"https://e621.net/",children:"e621.net"})," designed with mobile compatability in mind."]}),Object(b.jsx)("p",{children:Object(b.jsx)("a",{href:"https://github.com/SanguineDerg/e621-slideshow",children:"Source Code"})}),Object(b.jsx)("button",{type:"button",onClick:function(){e(f("search"))},children:"Close"})]})]})}function v(e,t){var n=localStorage.getItem(e);if(null===n)return t;try{return JSON.parse(n)}catch(s){return t}}function m(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(n){return!1}}var x={username:"",api_key:"",image_display_size:"sample",video_display_size:"720p",video_display_type:"mp4"},O=function(){return v("settings.username",x.username)},w=function(){return v("settings.api_key",x.api_key)},y=function(){return v("settings.image_display_size",x.image_display_size)},S=function(e){return m("settings.username",e)},k=function(e){return m("settings.api_key",e)},C=Object(l.c)({name:"settings",initialState:x,reducers:{clear:function(e){S(x.username),k(x.api_key)},setLogin:function(e,t){e.username=t.payload.username,e.api_key=t.payload.apiKey,S(t.payload.username),k(t.payload.apiKey)},setImageDisplaySize:function(e,t){e.image_display_size=t.payload,m("settings.image_display_size",t.payload)},setVideoDisplaySize:function(e,t){e.video_display_size=t.payload,m("settings.video_display_size",t.payload)},setVideoDisplayType:function(e,t){e.video_display_type=t.payload,m("settings.video_display_type",t.payload)}}}),N=C.actions,I=(N.clear,N.setLogin),z=N.setImageDisplaySize,D=(N.setVideoDisplaySize,N.setVideoDisplayType,function(e){return e.settings.username}),L=function(e){return e.settings.image_display_size},M=C.reducer,B=n(6),F=n(29),P=n.n(F),A=n(30),E=n.n(A),V=P.a.create({baseURL:"https://e621.net/"});V.interceptors.request.use((function(e){e.params=Object(B.a)(Object(B.a)({},e.params),{},{_client:"SanguineDerg's Slideshow/1.0 (by SanguineDerg on e621)"});var t=O(),n=w();return""!==t&&""!==n&&(e.auth={username:t,password:n}),e}));var T=E()(V,{maxRPS:1}),R={getPosts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return T.get("posts.json",{params:e})}},J=function(e){switch(e.file.ext){case"jpg":case"png":case"gif":return"image";case"webm":return"video";case"swf":return"flash"}},K=function(e){var t=y(),n=e.file.md5;switch(t){case"full":return"https://static1.e621.net/data/".concat(n.substring(0,2),"/").concat(n.substring(2,4),"/").concat(n,".").concat(e.file.ext);case"sample":return e.sample.has?"https://static1.e621.net/data/sample/".concat(n.substring(0,2),"/").concat(n.substring(2,4),"/").concat(n,".").concat(e.file.ext):"https://static1.e621.net/data/".concat(n.substring(0,2),"/").concat(n.substring(2,4),"/").concat(n,".").concat(e.file.ext)}},W=function(e){switch(J(e)){case"image":return function(e){if(null===e.file.url)return K(e);switch(y()){case"full":return e.file.url;case"sample":return e.sample.url}}(e);case"video":case"flash":return""}},U=R,q=n(4),G=n.n(q),H=n(9),Q=n(14),X={getManagedSets:function(){return T.get("post_sets/for_select.json")},getSetById:function(e){return T.get("post_sets/".concat(e,".json"))},addPostToSet:function(e,t){var n=new FormData;return n.append("post_ids[]",e.toString()),T.post("post_sets/".concat(t,"/add_posts.json"),n)},removePostFromSet:function(e,t){var n=new FormData;return n.append("post_ids[]",e.toString()),T.post("post_sets/".concat(t,"/remove_posts.json"),n)}},Y=Object(l.b)("sets/fetchManagedSets",Object(H.a)(G.a.mark((function e(){var t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X.getManagedSets();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),Z=Object(l.b)("sets/fetchWorkingSet",function(){var e=Object(H.a)(G.a.mark((function e(t,n){var s,a;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(s=re(n.getState()))){e.next=3;break}return e.abrupt("return",null);case 3:return e.next=5,X.getSetById(s);case 5:return a=e.sent,e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),$=Object(l.b)("sets/addCurrentPostToSet",function(){var e=Object(H.a)(G.a.mark((function e(t,n){var s,a;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(s=re(n.getState()))){e.next=3;break}return e.abrupt("return",null);case 3:return e.next=5,X.addPostToSet(t,s);case 5:return a=e.sent,e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),ee=Object(l.b)("sets/removeCurrentPostFromSet",function(){var e=Object(H.a)(G.a.mark((function e(t,n){var s,a;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(s=re(n.getState()))){e.next=3;break}return e.abrupt("return",null);case 3:return e.next=5,X.removePostFromSet(t,s);case 5:return a=e.sent,e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),te=Object(l.c)({name:"sets",initialState:{managed_sets:null,working_set_id:null,working_set:null,update_set_status:"idle"},reducers:{setWorkingSetId:function(e,t){e.working_set_id=t.payload,e.working_set=null},resetUpdateSetStatus:function(e){e.update_set_status="idle"}},extraReducers:function(e){e.addCase(Y.fulfilled,(function(e,t){e.managed_sets=t.payload})).addCase(Y.rejected,(function(e,t){e.managed_sets=null,e.working_set_id=null,e.working_set=null})).addCase(Z.fulfilled,(function(e,t){e.working_set=t.payload})).addCase(Z.rejected,(function(e,t){e.working_set=null})).addCase($.pending,(function(e,t){e.update_set_status="working"})).addCase($.fulfilled,(function(e,t){e.working_set=t.payload,null===t.payload?e.update_set_status="failed":e.update_set_status="added"})).addCase($.rejected,(function(e,t){e.update_set_status="failed"})).addCase(ee.pending,(function(e,t){e.update_set_status="working"})).addCase(ee.fulfilled,(function(e,t){e.working_set=t.payload,null===t.payload?e.update_set_status="failed":e.update_set_status="removed"})).addCase(ee.rejected,(function(e,t){e.update_set_status="failed"}))}}),ne=te.actions,se=ne.setWorkingSetId,ae=ne.resetUpdateSetStatus,ie=function(e){return e.sets.managed_sets},re=function(e){return e.sets.working_set_id},ce=function(e){return e.sets.working_set},oe=function(e){return e.sets.update_set_status},ue=te.reducer,le=Object(l.b)("posts/fetchPosts",function(){var e=Object(H.a)(G.a.mark((function e(t,n){var s;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.getPosts({tags:_e(n.getState()),page:be(n.getState())});case 2:return s=e.sent,e.abrupt("return",s.data.posts);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),de=Object(l.c)({name:"posts",initialState:{posts:{},fetch_order:[],fetch_tags:"",fetch_page:1,fetch_status:"idle",fetch_id:"",slideshow_index:0},reducers:{clear:function(e){e.fetch_order=[],e.fetch_tags="",e.fetch_page=1,e.fetch_status="idle",e.fetch_id="",e.slideshow_index=0},startSearch:function(e,t){e.fetch_order=[],e.fetch_tags=t.payload,e.fetch_page=1,e.fetch_status="idle",e.fetch_id="",e.slideshow_index=0},previousSlide:function(e){0!==e.slideshow_index&&(e.slideshow_index-=1)},nextSlide:function(e){e.slideshow_index<e.fetch_order.length-1&&(e.slideshow_index+=1)}},extraReducers:function(e){e.addCase(le.pending,(function(e,t){e.fetch_status="loading",e.fetch_id=t.meta.requestId})).addCase(le.fulfilled,(function(e,t){if(t.meta.requestId===e.fetch_id){var n=t.payload;0===n.length?(e.fetch_status="finished",e.fetch_page=0,e.fetch_id=""):(e.fetch_status="idle",e.fetch_page=e.fetch_page&&e.fetch_page+1,e.fetch_id="",n.forEach((function(t){e.posts[t.id]=t,e.fetch_order.push(t.id)})))}}))}}),fe=de.actions,pe=(fe.clear,fe.startSearch),he=fe.previousSlide,je=fe.nextSlide,_e=function(e){return e.posts.fetch_tags},be=function(e){return e.posts.fetch_page},ge=function(e){return e.posts.fetch_order},ve=function(e){return e.posts.posts},me=function(e){return e.posts.slideshow_index},xe=Object(Q.a)([me,ge],(function(e,t){return Array.from({length:6},(function(t,n){return n+e-2})).filter((function(e){return e>=0&&e<t.length}))})),Oe=Object(Q.a)([ve,ge,me],(function(e,t,n){return 0===t.length?null:e[t[n]]})),we=Object(Q.a)([Oe],(function(e){return null!==e?e.id:null})),ye=Object(Q.a)([we,ce],(function(e,t){return null!==e&&null!==t&&t.post_ids.includes(e)})),Se=Object(Q.a)([ve,ge,xe],(function(e,t,n){return 0===t.length?[]:n.map((function(n){return e[t[n]]}))})),ke=function(){return function(e,t){"idle"===t().posts.fetch_status&&e(le())}},Ce=de.reducer,Ne=n(31),Ie=n.n(Ne);function ze(){var e=u(Se);return Object(b.jsx)("div",{className:Ie.a.cache,children:e.map((function(e){return"image"===J(e)&&Object(b.jsx)("img",{src:W(e),alt:""},e.id)}))})}var De=n(5),Le=n(19),Me=n.n(Le);function Be(){var e=Object(s.useState)(""),t=Object(De.a)(e,2),n=t[0],a=t[1],i=o();return Object(b.jsxs)("div",{className:Me.a.searchContainer,children:[Object(b.jsx)("h1",{children:"Search"}),Object(b.jsxs)("form",{onSubmit:function(e){i(function(e){return function(t,n){t(pe(e)),t(le()),t(ae())}}(n)),i(f("slideshow")),e.preventDefault()},className:Me.a.searchForm,children:[Object(b.jsx)("input",{value:n,onChange:function(e){return a(e.target.value)},type:"text",placeholder:"rating:s ..."}),Object(b.jsx)("button",{type:"submit",children:"Search"}),Object(b.jsx)("button",{type:"button",onClick:function(){i(f("slideshow"))},children:"Close"}),Object(b.jsx)("button",{type:"button",onClick:function(){i(f("settings"))},children:"Settings"}),Object(b.jsx)("button",{type:"button",onClick:function(){i(f("about"))},children:"About"})]})]})}var Fe=n(32),Pe=n.n(Fe);function Ae(){var e=Object(s.useState)(""),t=Object(De.a)(e,2),n=t[0],a=t[1],i=Object(s.useState)(""),r=Object(De.a)(i,2),c=r[0],l=r[1],d=u(D),p=u(L),h=u(ie),j=u(re),_=o(),g=function(){_(Z()),_(f("search"))};return Object(b.jsxs)("div",{className:Pe.a.settingsContainer,children:[Object(b.jsx)("h1",{children:"Settings"}),Object(b.jsx)("button",{onClick:g,children:"Close"}),Object(b.jsxs)("fieldset",{children:[Object(b.jsx)("legend",{children:"Login"}),Object(b.jsx)("span",{children:""!==d?"Logged in as ".concat(d):"Not logged in"}),Object(b.jsx)("input",{value:n,onChange:function(e){return a(e.target.value)},type:"text"}),Object(b.jsx)("input",{value:c,onChange:function(e){return l(e.target.value)},type:"password"}),Object(b.jsx)("button",{type:"button",onClick:function(){_(I({username:n,apiKey:c})),a(""),l("")},children:"Save Login"})]}),Object(b.jsxs)("fieldset",{children:[Object(b.jsx)("legend",{children:"Display"}),Object(b.jsx)("label",{children:"Image size"}),Object(b.jsxs)("select",{value:p,onChange:function(e){return _(z(e.target.value))},children:[Object(b.jsx)("option",{value:"full",children:"Full Image"}),Object(b.jsx)("option",{value:"sample",children:"Sample Image"})]})]}),Object(b.jsxs)("fieldset",{children:[Object(b.jsx)("legend",{children:"Set Management"}),Object(b.jsx)("button",{onClick:function(){return _(Y())},children:"Get sets"}),null!==h&&Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("select",{value:null!==j?j:void 0,onChange:function(e){return _(se(""!==e.target.value?parseInt(e.target.value):null))},children:[Object(b.jsx)("option",{children:"Select a set"}),Object(b.jsx)("optgroup",{label:"Owned",children:h.Owned.map((function(e,t){var n=Object(De.a)(e,2),s=n[0],a=n[1];return Object(b.jsx)("option",{value:a,children:s},t)}))}),Object(b.jsx)("optgroup",{label:"Maintained",children:h.Maintained.map((function(e,t){var n=Object(De.a)(e,2),s=n[0],a=n[1];return Object(b.jsx)("option",{value:a,children:s},t)}))})]})})]}),Object(b.jsx)("button",{onClick:g,children:"Close"})]})}var Ee=n(10),Ve=n.n(Ee);function Te(){var e=Object(c.c)(Oe),t=null!==e?J(e):null;return Object(b.jsxs)("div",{className:Ve.a.displayContainer,children:["image"===t&&Object(b.jsx)("img",{className:Ve.a.image,src:null!==e?W(e):void 0,alt:""}),"video"===t&&Object(b.jsx)("div",{className:Ve.a.text,children:Object(b.jsx)("span",{children:"Video"})}),"flash"===t&&Object(b.jsx)("div",{className:Ve.a.text,children:Object(b.jsx)("span",{children:"Flash"})})]})}var Re=n(7),Je=n.n(Re),Ke=n(33),We=n.n(Ke);function Ue(){var e=u(oe),t=u(we),n=u(ye),a=u(ce),i=Object(s.useState)("\ud83d\uddd1\ufe0f"),r=Object(De.a)(i,2),c=r[0],l=r[1],d=Object(s.useState)(null),f=Object(De.a)(d,2),p=f[0],h=f[1],j=o();Object(s.useEffect)((function(){var t=function(){null!==p&&(clearTimeout(p),h(null))};switch(e){case"idle":case"added":case"removed":t(),l(n?"\u2796":"\u2795");break;case"working":t(),l("\ud83d\udd04");break;case"failed":t(),l("\u274c"),h(setTimeout((function(){l(n?"\u2796":"\u2795")}),2e3))}}),[e,n]);var _=Object(s.useCallback)((function(){null===t||"working"===e||n||j($(t))}),[j,t,e,n]),g=Object(s.useCallback)((function(){null!==t&&"working"!==e&&n&&j(ee(t))}),[j,t,e,n]),v=Object(s.useCallback)((function(e){if(!e.repeat)switch(e.key){case"ArrowUp":return void _();case"ArrowDown":return void g();default:return}}),[_,g]);if(Object(s.useEffect)((function(){return window.addEventListener("keydown",v,!0),function(){return window.removeEventListener("keydown",v,!0)}}),[v]),null===t||null===a)return null;return Object(b.jsx)("button",{className:We.a.manageSetButton,onClick:function(){"working"!==e&&j(n?ee(t):$(t))},children:c})}function qe(){var e=o(),t=u(Oe),n=Object(s.useCallback)((function(){e((function(e,t){e(je()),e(ae()),me(t())>=ge(t()).length-5&&e(ke())}))}),[e]),a=Object(s.useCallback)((function(){e((function(e,t){e(he()),e(ae()),me(t())>=ge(t()).length-5&&e(ke())}))}),[e]),i=Object(s.useCallback)((function(e){if(!e.repeat)switch(e.key){case"ArrowLeft":return void a();case"ArrowRight":return void n();default:return}}),[n,a]);return Object(s.useEffect)((function(){return window.addEventListener("keydown",i,!0),function(){return window.removeEventListener("keydown",i,!0)}}),[i]),Object(b.jsxs)("div",{className:Je.a.interfaceContainer,children:[Object(b.jsxs)("div",{className:Je.a.mainControls,children:[Object(b.jsx)("div",{className:Je.a.nextSlide,onClick:n,children:"Next"}),Object(b.jsx)("div",{className:Je.a.previousSlide,onClick:a,children:"Previous"}),Object(b.jsx)("div",{className:Je.a.exitSlideshow,onClick:function(){return e(f("search"))},children:"Close"}),Object(b.jsx)("a",Object(B.a)(Object(B.a)({className:Je.a.viewSource,target:"_blank",rel:"noopener noreferrer"},null===t?{onClick:function(){}}:{href:"https://e621.net/posts/".concat(t.id)}),{},{children:"Link"}))]}),Object(b.jsx)("div",{className:Je.a.extraControls,children:Object(b.jsx)(Ue,{})})]})}var Ge=n(34),He=n.n(Ge);function Qe(){return Object(b.jsxs)("div",{className:He.a.slideshowContainer,children:[Object(b.jsx)(Te,{}),Object(b.jsx)(qe,{})]})}var Xe=n(15),Ye=n.n(Xe);function Ze(e){var t=e.visible,n=void 0===t||t,s=e.disabled,a=void 0!==s&&s,i=e.children;return Object(b.jsx)("div",{className:Ye.a.view+" "+(n?Ye.a.visible:Ye.a.hidden),children:!a&&i})}var $e=function(){var e=u(p);return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(ze,{}),Object(b.jsx)(Ze,{disabled:"slideshow"!==e,children:Object(b.jsx)(Qe,{})}),Object(b.jsx)(Ze,{visible:"search"===e,children:Object(b.jsx)(Be,{})}),Object(b.jsx)(Ze,{visible:"settings"===e,children:Object(b.jsx)(Ae,{})}),Object(b.jsx)(Ze,{visible:"about"===e,children:Object(b.jsx)(g,{})})]})},et=Object(l.a)({reducer:{posts:Ce,view:h,settings:M,sets:ue},preloadedState:{settings:{username:O(),api_key:w(),image_display_size:y(),video_display_size:v("settings.video_display_size",x.video_display_size),video_display_type:v("settings.video_display_type",x.video_display_type)}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));et.dispatch(Y()),r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(c.a,{store:et,children:Object(b.jsx)($e,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports={interfaceContainer:"Interface_interfaceContainer__32rjR",mainControls:"Interface_mainControls__1f-3y",extraControls:"Interface_extraControls__3sxVc",fadeout:"Interface_fadeout__3FYND",nextSlide:"Interface_nextSlide__1oMMA",previousSlide:"Interface_previousSlide__1G1Z_",exitSlideshow:"Interface_exitSlideshow__1-rsM",viewSource:"Interface_viewSource__1ikEu"}}},[[67,1,2]]]);
//# sourceMappingURL=main.1caeae2e.chunk.js.map