(function(e){function t(t){for(var a,r,u=t[0],i=t[1],f=t[2],d=0,s=[];d<u.length;d++)r=u[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&s.push(o[r][0]),o[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);p&&p(t);while(s.length)s.shift()();return c.push.apply(c,f||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var u=n[r];0!==o[u]&&(a=!1)}a&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b68f8":"80405c70","chunk-2d0d6ad5":"159e42ae","chunk-36188a4d":"f9215020","chunk-4d66ad92":"87fb07d0","chunk-5ee74842":"89bb702f","chunk-84bce43a":"c40a1df0","chunk-f3ae8e0e":"3e206363"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-36188a4d":1,"chunk-4d66ad92":1,"chunk-5ee74842":1,"chunk-84bce43a":1,"chunk-f3ae8e0e":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-2d0b68f8":"31d6cfe0","chunk-2d0d6ad5":"31d6cfe0","chunk-36188a4d":"07970982","chunk-4d66ad92":"fcef386b","chunk-5ee74842":"464af154","chunk-84bce43a":"133dee21","chunk-f3ae8e0e":"2c9ebda5"}[e]+".css",o=i.p+a,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var f=c[u],d=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(d===a||d===o))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){f=s[u],d=f.getAttribute("data-href");if(d===a||d===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete r[e],p.parentNode.removeChild(p),n(c)},p.href=o;var l=document.getElementsByTagName("head")[0];l.appendChild(p)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=c);var f,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var s=new Error;f=function(t){d.onerror=d.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,n[1](s)}o[e]=void 0}};var p=setTimeout((function(){f({type:"timeout",target:d})}),12e4);d.onerror=d.onload=f,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/__cbdui/",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],d=f.push.bind(f);f.push=t,f=f.slice();for(var s=0;s<f.length;s++)t(f[s]);var p=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1c1e":function(e,t,n){"use strict";n("0fb7"),n("450d");var a=n("f529"),r=n.n(a),o=n("b7a4");n.d(t,"a",(function(){return o["a"]})),n.d(t,"b",(function(){return o["c"]})),o["b"].request.use(Object(o["d"])("/__cbdui/api")),o["b"].response.use(Object(o["e"])()),o["b"].response.use(Object(o["f"])({code:0})),o["b"].response.use((function(e){var t=e.result;t.errCode&&r.a.error(t.errMsg)}))},2395:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("0fb7"),n("450d");var a=n("f529"),r=n.n(a),o=(n("46a1"),n("e5f2")),c=n.n(o),u=(n("9e1f"),n("6ed5")),i=n.n(u),f=(n("be4f"),n("896a")),d=n.n(f),s=(n("0fb4"),n("9944")),p=n.n(s),l=(n("560b"),n("dcdc")),m=n.n(l),h=(n("915d"),n("e04d")),b=n.n(h),y=(n("0c67"),n("299c")),g=n.n(y),v=(n("8bd8"),n("4cb2")),w=n.n(v),k=(n("4ca3"),n("443e")),O=n.n(k),j=(n("aaa5"),n("a578")),_=n.n(j),K=(n("5e32"),n("6721")),M=n.n(K),C=(n("1951"),n("eedf")),E=n.n(C),T=(n("10cb"),n("f3ad")),$=n.n(T),x=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},S=[],I=(n("ac1f"),n("5319"),{created:function(){var e=this;if(window._this=this,this.$store.dispatch({type:"setting/getConfig"}),window.IframeMsgHelper){var t=this.$store.state.config;window.addEventListener("keyup",(function(e){var n=t.triggerKeys,a=t.platform;e.altKey===!!n[a].altKey&&e.ctrlKey===!!n[a].ctrlKey&&e.metaKey===!!n[a].metaKey&&e.shiftKey===!!n[a].shiftKey&&e.key===n[a].key&&window.iframeMessager.emit("hideFrame")})),window.iframeMessager=new window.IframeMsgHelper(window.top,"__cbdui").on("home",(function(){e.$router.replace("/")})),window.iframeMessager.emit("load")}var n=window.sessionStorage.getItem("__cbdui_route_path");n&&this.$router.replace(n)},watch:{"$route.path":function(e){window.sessionStorage.setItem("__cbdui_route_path",e)}}}),A=I,L=(n("7c55"),n("2877")),N=Object(L["a"])(A,P,S,!1,null,null,null),B=N.exports,q=(n("d3b7"),n("8c4f")),D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-view")},F=[],H={},J=Object(L["a"])(H,D,F,!1,null,null,null),U=J.exports;x["default"].use(q["a"]);var z=[{path:"/",component:U,children:[{path:"about",component:function(){return n.e("chunk-5ee74842").then(n.bind(null,"f820"))}},{path:"home",component:function(){return n.e("chunk-f3ae8e0e").then(n.bind(null,"bb51"))}},{path:"",component:function(){return n.e("chunk-2d0b68f8").then(n.bind(null,"1e4b"))}},{path:"new-template",component:function(){return n.e("chunk-4d66ad92").then(n.bind(null,"197c"))}},{path:"setting",component:function(){return n.e("chunk-36188a4d").then(n.bind(null,"c91a"))},children:[{path:"",component:function(){return n.e("chunk-2d0d6ad5").then(n.bind(null,"7424"))}},{path:"short-key",component:function(){return n.e("chunk-84bce43a").then(n.bind(null,"1ce5"))}}]}]}],G=new q["a"]({mode:"history",base:"/__cbdui/",routes:z}),Q=G,R=n("2f62"),V=(n("4160"),n("d81d"),n("4fad"),n("159b"),n("5530")),W=n("3835"),X=n("15fd"),Y=n("5cc5"),Z={namespaced:!0,state:{activeMenu:"page",templates:[]},mutations:{update:function(e,t){t.type;var n=Object(X["a"])(t,["type"]);Object.entries(n).forEach((function(t){var n=Object(W["a"])(t,2),a=n[0],r=n[1];e[a]=r}))}},actions:{getTemplates:function(e){var t=e.commit;Object(Y["c"])().then((function(e){e.success&&t({type:"update",templates:e.data.map((function(e){return Object(V["a"])({},e,{random:Math.random()})}))})}))}},modules:{}},ee=n("1c1e"),te=function(){return Object(ee["a"])("/getConfig")},ne=function(e){return Object(ee["b"])("/setConfig",e)},ae={namespaced:!0,state:{triggerKeys:{win:{ctrlKey:!0,shiftKey:!1,altKey:!0,key:"x"},mac:{ctrlKey:!0,shiftKey:!1,altKey:!1,metaKey:!0,key:"x"}}},mutations:{update:function(e,t){t.type;var n=Object(X["a"])(t,["type"]);Object.entries(n).forEach((function(t){var n=Object(W["a"])(t,2),a=n[0],r=n[1];e[a]=r}))}},actions:{getConfig:function(e){te().then((function(t){t.success&&(e.commit(Object(V["a"])({type:"update"},t.data)),e.commit(Object(V["a"])({type:"config/update"},t.data),{root:!0}),window.iframeMessager&&window.iframeMessager.emit("config",t.data))}))},setConfig:function(e){var t=e.dispatch,n=e.commit,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=(a.type,Object(X["a"])(a,["type"]));n(Object(V["a"])({type:"update"},r)),ne(Object(V["a"])({},r)).then((function(e){e.success&&t("getConfig")}))}},modules:{}},re={namespaced:!0,state:{version:"-",templatePage:"",templateModel:"",templateComponent:""},mutations:{update:function(e,t){t.type;var n=Object(X["a"])(t,["type"]);Object.entries(n).forEach((function(t){var n=Object(W["a"])(t,2),a=n[0],r=n[1];e[a]=r}))}},actions:{},modules:{}};x["default"].use(R["a"]);var oe=new R["a"].Store({modules:{newTemplate:Z,setting:ae,config:re}}),ce=oe;n("f8ce");x["default"].component("Input",$.a),x["default"].component("Button",E.a),x["default"].component("Tree",M.a),x["default"].component("Icon",_.a),x["default"].component("Menu",O.a),x["default"].component("MenuItem",w.a),x["default"].component("Tooltip",g.a),x["default"].component("Alert",b.a),x["default"].component("Checkbox",m.a),x["default"].component("Drawer",p.a),x["default"].prototype.$loading=d.a.service,x["default"].prototype.$msgbox=i.a,x["default"].prototype.$alert=i.a.alert,x["default"].prototype.$confirm=i.a.confirm,x["default"].prototype.$prompt=i.a.prompt,x["default"].prototype.$notify=c.a,x["default"].prototype.$message=r.a,x["default"].config.productionTip=!1,new x["default"]({router:Q,store:ce,render:function(e){return e(B)}}).$mount("#app")},"5cc5":function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"f",(function(){return o})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return f}));n("b0c0");var a=n("1c1e"),r=function(){return Object(a["a"])("/getTemplates")},o=function(){return Object(a["a"])("/syncTemplates")},c=function(e){return Object(a["b"])("/mkdir",{path:e})},u=function(e){var t=e.name,n=e.template,r=e.path;return Object(a["a"])("/previewTemplateFiles",{name:t,template:n,path:r})},i=function(e){var t=e.name,n=e.template,r=e.path;return Object(a["b"])("/create",{name:t,template:n,path:r})},f=function(e){var t=e.name,n=e.template,r=e.path;return Object(a["a"])("/checkPath",{name:t,template:n,path:r})}},"7c55":function(e,t,n){"use strict";var a=n("2395"),r=n.n(a);r.a}});
//# sourceMappingURL=app.6fa4240a.js.map