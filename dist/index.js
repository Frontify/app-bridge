!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(self,(function(){return function(){"use strict";var t={d:function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};return function(t,e,n){function r(t,e,n,r){window.top.postMessage({topic:t,token:e,data:n},(null==r?void 0:r.origin)||"*")}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){var e="function"==typeof Map?new Map:void 0;return(u=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return c(t,arguments,f(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),s(r,t)})(t)}function c(t,e,n){return(c=a()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&s(o,n.prototype),o}).apply(null,arguments)}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.r(e),n.d(e,{Topic:function(){return w},createIframeAppBridge:function(){return J},createNativeAppBridge:function(){return N},version:function(){return M}});var p=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(o,t);var e,n,r=(e=o,n=a(),function(){var t,r=f(e);if(n){var o=f(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return i(this,t)});function o(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,"Call with topic ".concat(t," failed."))}return o}(u(Error));function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){var e="function"==typeof Map?new Map:void 0;return(d=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return b(t,arguments,v(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),g(r,t)})(t)}function b(t,e,n){return(b=h()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&g(o,n.prototype),o}).apply(null,arguments)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function g(t,e){return(g=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var w,O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&g(t,e)}(o,t);var e,n,r=(e=o,n=h(),function(){var t,r=v(e);if(n){var o=v(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return y(this,t)});function o(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,'Timeout for call with topic "'.concat(t,'" expired. Call was aborted.'))}return o}(d(Error));function m(t,e,n){return new Promise((function(r,o){window.addEventListener("message",(function n(i){var u=i.data;u.token===e&&u.topic===t&&u.success?r(u.data||!0):o(new p(t)),window.removeEventListener("message",n)})),setTimeout((function(){o(new O(t))}),(null==n?void 0:n.timeout)||3e3)}))}function P(t,e,n,r,o,i,u){try{var c=t[i](u),a=c.value}catch(t){return void n(t)}c.done?e(a):Promise.resolve(a).then(r,o)}function S(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function u(t){P(i,r,o,u,c,"next",t)}function c(t){P(i,r,o,u,c,"throw",t)}u(void 0)}))}}!function(t){t.CloseApp="closeApp",t.DeleteAppState="deleteAppState",t.GetAppState="getAppState",t.GetAssetById="getAssetById",t.GetProjectId="getProjectId",t.GetRefreshedThirdpartyOauth2Token="getRefreshedThirdpartyOauth2Token",t.GetThirdPartyOauth2Tokens="getThirdPartyOauth2Tokens",t.OpenAssetChooser="openAssetChooser",t.PostExternalAssets="postExternalAssets",t.PutAppState="putAppState"}(w||(w={}));var j,A=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;return Math.random().toString(20).substr(2,t)}(),k={appState:{getAppState:function(){return r(w.GetAppState,A),m(w.GetAppState,A)},putAppState:function(t){return S(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(w.PutAppState,A,t),e.abrupt("return",m(w.PutAppState,A));case 2:case"end":return e.stop()}}),e)})))()},deleteAppState:function(){return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r(w.DeleteAppState,A),t.abrupt("return",m(w.DeleteAppState,A));case 2:case"end":return t.stop()}}),t)})))()}},assets:{getAssetById:function(t){return r(w.GetAssetById,A,{assetId:t}),m(w.GetAssetById,A)},postExternalAssets:function(t){return S(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.filter((function(t){return t.previewUrl})),o=n.length?3e4:3e3,r(w.PostExternalAssets,A,t),e.abrupt("return",m(w.PostExternalAssets,A,{timeout:o}));case 4:case"end":return e.stop()}}),e)})))()}},auth:{getThirdPartyOauth2Tokens:function(){return r(w.GetThirdPartyOauth2Tokens,A),m(w.GetThirdPartyOauth2Tokens,A,{timeout:3e5})},getRefreshedThirdpartyOauth2Tokens:function(t){return r(w.GetRefreshedThirdpartyOauth2Token,A,{refreshToken:t}),m(w.GetRefreshedThirdpartyOauth2Token,A)}},utilities:{closeApp:function(){r(w.CloseApp,A)},openAssetChooser:function(){r(w.OpenAssetChooser,A)}}};function x(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function T(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?x(Object(n),!0).forEach((function(e){E(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function E(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(t){t.OpenModal="onOpenModal"}(j||(j={}));var R=function(t){return Object.keys(t).reduce((function(e,n){return T(T({},e),t[n])}),{})};function B(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?B(Object(n),!0).forEach((function(e){I(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function I(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function C(t,e,n,r,o,i,u){try{var c=t[i](u),a=c.value}catch(t){return void n(t)}c.done?e(a):Promise.resolve(a).then(r,o)}function D(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function u(t){C(i,r,o,u,c,"next",t)}function c(t){C(i,r,o,u,c,"throw",t)}u(void 0)}))}}var G={assets:{getAssetById:function(t){return Promise.resolve({assetId:t})},postExternalAssets:function(t){return D(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",[{asset:t}]);case 1:case"end":return e.stop()}}),e)})))()}},block:{getBlockId:function(t){var e=t.closest("div[data-block]"),n=parseInt((null==e?void 0:e.getAttribute("data-block"))||"0");if(e||n>0)return n;throw new Error("Block's parent div not found.")},getBlockSettings:function(t){var e=this.getBlockId(t),n=window.styleguideSettings[e];if(!n)throw new Error("Could not find settings for block ".concat(e));return JSON.parse(n)},updateBlockSettings:function(t,e){var n=function(t){var e=document.getElementsByClassName("page")[0];if(!e)throw new Error("Could not find the DOM node via class name");return R(e)}().id;if(!n)throw new Error("Page ID not found");var r=R(t).id,o=this.getBlockId(t),i=R(document.body).translationLanguage;return JSON.stringify(this.getBlockSettings(t))===JSON.stringify(e)?(console.log("You have the same settings, skipping call..."),Promise.resolve(!0)):new Promise(function(){var t=D(regeneratorRuntime.mark((function t(u){var c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.fetch("/api/document/block/".concat(n,"/").concat(r,"/").concat(o),{method:"POST",headers:{"x-csrf-token":document.getElementsByName("x-csrf-token")[0].content,"Content-Type":"application/json"},body:JSON.stringify(_({settings:e},i?{language:i}:{}))});case 2:return c=t.sent,t.next=5,c.json();case 5:if(!t.sent.success){t.next=11;break}return window.styleguideSettings[o]=JSON.stringify(e),t.abrupt("return",u(!0));case 11:throw new Error("Could not update the block settings");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},context:{getEditorState:function(){return document.body.classList.contains("editor-enabled")},getProjectId:function(){return window.application.config.context.project.id}},utilities:{closeApp:function(){},openAssetChooser:function(){var t=window.application.sandbox.config.tpl.render("c-assetchooser",{});window.application.connectors.events.notify(null,j.OpenModal,{modifier:"flex",$content:t})}}},M="1.0.42",N=function(){return G},J=function(){return k}}(0,e,t),e}()}));
//# sourceMappingURL=index.js.map