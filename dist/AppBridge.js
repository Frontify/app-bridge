!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("AppBridge",[],t):"object"==typeof exports?exports.AppBridge=t():e.AppBridge=t()}(self,(function(){return(()=>{"use strict";var e={306:e=>{e.exports={i8:"1.0.31"}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var u=t[r]={exports:{}};return e[r](u,u.exports,n),u.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t):n}function o(e){var t="function"==typeof Map?new Map:void 0;return(o=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return u(e,arguments,c(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,e)})(e)}function u(e,t,n){return(u=i()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&a(o,n.prototype),o}).apply(null,arguments)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(r),n.d(r,{default:()=>A,version:()=>S});var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(u,e);var n,r,o=(n=u,r=i(),function(){var e,o=c(n);if(r){var u=c(this).constructor;e=Reflect.construct(o,arguments,u)}else e=o.apply(this,arguments);return t(this,e)});function u(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),o.call(this,'Timeout for call with key "'.concat(e,'" expired. Call was aborted.'))}return u}(o(Error));function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){var t="function"==typeof Map?new Map:void 0;return(l=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return y(e,arguments,v(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),d(r,e)})(e)}function y(e,t,n){return(y=h()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&d(o,n.prototype),o}).apply(null,arguments)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(o,e);var t,n,r=(t=o,n=h(),function(){var e,r=v(t);if(n){var o=v(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)});function o(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,"Call with key ".concat(e," failed."))}return o}(l(Error));function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var g,w,O=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tokenLength=6}var t,n;return t=e,(n=[{key:"getMessageToken",value:function(){return Math.random().toString(20).substr(2,this.tokenLength)}},{key:"postMessage",value:function(e){window.top.postMessage(e,"*")}},{key:"subscribeResponse",value:function(e,t,n){return new Promise((function(r,o){window.addEventListener("message",(function n(u){var i=u.data;i.token===t&&i.key===e&&(i.success&&i.data?r({success:i.success,data:i.data}):o(new b(e)),window.removeEventListener("message",n))})),setTimeout((function(){o(new s(e))}),n)}))}}])&&m(t.prototype,n),e}();function T(e,t,n,r,o,u,i){try{var a=e[u](i),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,o)}function k(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var u=e.apply(t,n);function i(e){T(u,r,o,i,a,"next",e)}function a(e){T(u,r,o,i,a,"throw",e)}i(void 0)}))}}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}!function(e){e.GetAppState="getAppState",e.GetThirdPartyOauth2Token="getThirdPartyOAuth2Token",e.GetRefreshedThirdpartyOauth2Token="getRefreshedThirdpartyOauth2Token",e.PutAppState="putAppState",e.DeleteAppState="deleteAppState",e.PostExternalAsset="postExternalAsset"}(g||(g={})),function(e){e.DispatchCloseApp="closeApp"}(w||(w={}));var S=n(306).i8,A=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.messenger=new O}var t,n,r,o,u,i,a,c,s;return t=e,(n=[{key:"closeApp",value:function(){this.dispatch(w.DispatchCloseApp)}},{key:"getAppState",value:(s=k(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch({key:g.GetAppState}));case 1:case"end":return e.stop()}}),e,this)}))),function(){return s.apply(this,arguments)})},{key:"getThirdPartyOAuth2Token",value:(c=k(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch({key:g.GetThirdPartyOauth2Token,timeout:e.OAUTH2_TIMEOUT}));case 1:case"end":return t.stop()}}),t,this)}))),function(){return c.apply(this,arguments)})},{key:"getRefreshedThirdpartyOauth2Token",value:(a=k(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch({key:g.GetRefreshedThirdpartyOauth2Token,data:t}));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return a.apply(this,arguments)})},{key:"putAppState",value:(i=k(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch({key:g.PutAppState,data:t}));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return i.apply(this,arguments)})},{key:"deleteAppState",value:(u=k(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch({key:g.DeleteAppState}));case 1:case"end":return e.stop()}}),e,this)}))),function(){return u.apply(this,arguments)})},{key:"postExternalAsset",value:(o=k(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.previewUrl?e.FILE_UPLOAD_TIMEOUT:e.DEFAULT_TIMEOUT,t.abrupt("return",this.fetch({key:g.PostExternalAsset,timeout:r,data:n}));case 2:case"end":return t.stop()}}),t,this)}))),function(e){return o.apply(this,arguments)})},{key:"dispatch",value:function(e){var t=this.messenger.getMessageToken();this.messenger.postMessage({key:e,token:t})}},{key:"fetch",value:(r=k(regeneratorRuntime.mark((function t(n){var r,o,u,i,a,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.key,o=n.timeout,u=void 0===o?e.DEFAULT_TIMEOUT:o,i=n.data,a=void 0===i?void 0:i,c=this.messenger.getMessageToken(),this.messenger.postMessage({key:r,token:c,data:a}),t.abrupt("return",this.messenger.subscribeResponse(r,c,u));case 4:case"end":return t.stop()}}),t,this)}))),function(e){return r.apply(this,arguments)})}])&&R(t.prototype,n),e}();A.DEFAULT_TIMEOUT=3e3,A.FILE_UPLOAD_TIMEOUT=1e4,A.OAUTH2_TIMEOUT=3e5})(),r})()}));
//# sourceMappingURL=AppBridge.js.map