(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36188a4d"],{"0ba6":function(t,e,n){"use strict";var s=n("d5eb"),a=n.n(s);a.a},"16a8":function(t,e,n){},"2ca0":function(t,e,n){"use strict";var s=n("23e7"),a=n("06cf").f,i=n("50c4"),r=n("5a34"),c=n("1d80"),o=n("ab13"),u=n("c430"),l="".startsWith,h=Math.min,v=o("startsWith"),f=!u&&!v&&!!function(){var t=a(String.prototype,"startsWith");return t&&!t.writable}();s({target:"String",proto:!0,forced:!f&&!v},{startsWith:function(t){var e=String(c(this));r(t);var n=i(h(arguments.length>1?arguments[1]:void 0,e.length)),s=String(t);return l?l.call(e,s,n):e.slice(n,n+s.length)===s}})},"44e7":function(t,e,n){var s=n("861d"),a=n("c6b6"),i=n("b622"),r=i("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==a(t))}},"5a34":function(t,e,n){var s=n("44e7");t.exports=function(t){if(s(t))throw TypeError("The method doesn't accept regular expressions");return t}},"9e0c":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._g(t._b({staticClass:"ghostButton"},"div",t.$attrs,!1),t.$listeners),[t._t("default",[n("Icon",{staticClass:"el-icon-back"})])],2)},a=[],i={},r=i,c=(n("0ba6"),n("2877")),o=Object(c["a"])(r,s,a,!1,null,"16d5e932",null);e["a"]=o.exports},a01b:function(t,e,n){"use strict";var s=n("16a8"),a=n.n(s);a.a},ab13:function(t,e,n){var s=n("b622"),a=s("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[a]=!1,"/./"[t](e)}catch(s){}}return!1}},c91a:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root vFlex"},[n("div",{staticClass:"hFlex",staticStyle:{flex:"1",overflow:"hidden"}},[n("div",{staticClass:"leftMenu vFlex"},[n("GhostButton",{on:{click:function(e){return t.$router.push("/")}}}),n("Menu",{staticClass:"menu",attrs:{"default-active":t.activeMenu,width:"180"},on:{select:t.handleMenuSelect}},[n("MenuItem",{attrs:{index:"short-key"}},[n("Icon",{staticClass:"el-icon-mouse"}),t._v(" 快捷键 ")],1)],1)],1),n("div",{staticClass:"content vFlex"},[n("div",{staticClass:"row title"},[t._v(t._s(t.pageTitle))]),n("div",{staticClass:"row"},[n("router-view",{ref:"routerView"})],1)])]),n("div",{staticClass:"footer hFlex"},[n("div",{staticStyle:{flex:"1"}}),n("Button",{attrs:{type:"primary",size:"small"},on:{click:t.saveSetting}},[t._v("保存")])],1)])},a=[],i=(n("ac1f"),n("5319"),n("2ca0"),n("9e0c")),r={name:"SettingLayout",components:{GhostButton:i["a"]},data:function(){return{}},computed:{activeMenu:function(){var t=this.$route.path,e="";return t.startsWith("/setting/")&&(e=t.replace("/setting/","")),e},pageTitle:function(){var t=this.$route.path,e="";return t.startsWith("/setting/")&&(e=t.replace("/setting/","")),{"short-key":"快捷键设置",test:"Test"}[e]||""}},methods:{handleMenuSelect:function(t){this.activeMenu!==t&&this.$router.push("/setting/".concat(t))},saveSetting:function(){var t=this,e=this.activeMenu,n=this.$store.state.setting;"short-key"===e&&this.$store.dispatch({type:"setting/setConfig",triggerKeys:n.triggerKeys}).then((function(){t.$message.success("已保存")}))}}},c=r,o=(n("a01b"),n("2877")),u=Object(o["a"])(c,s,a,!1,null,"b5eb0d78",null);e["default"]=u.exports},d5eb:function(t,e,n){}}]);
//# sourceMappingURL=chunk-36188a4d.f9215020.js.map