!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("AppBridge",[],t):"object"==typeof exports?exports.AppBridge=t():e.AppBridge=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};return((e,t,n)=>{function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){var t="function"==typeof Map?new Map:void 0;return(u=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return i(e,arguments,s(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,e)})(e)}function i(e,t,n){return(i=c()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&a(o,n.prototype),o}).apply(null,arguments)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(t),n.d(t,{DispatchKey:()=>O,FetchKey:()=>w,default:()=>j,version:()=>R});var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(u,e);var t,n,r=(t=u,n=c(),function(){var e,r=s(t);if(n){var u=s(this).constructor;e=Reflect.construct(r,arguments,u)}else e=r.apply(this,arguments);return o(this,e)});function u(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),r.call(this,'Timeout for call with key "'.concat(e,'" expired. Call was aborted.'))}return u}(u(Error));function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){var t="function"==typeof Map?new Map:void 0;return(y=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return h(e,arguments,d(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),v(r,e)})(e)}function h(e,t,n){return(h=b()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&v(o,n.prototype),o}).apply(null,arguments)}function b(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(o,e);var t,n,r=(t=o,n=b(),function(){var e,r=d(t);if(n){var o=d(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return l(this,e)});function o(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,"Call with key ".concat(e," failed."))}return o}(y(Error));function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w,O,k=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tokenLength=6}var t,n;return t=e,(n=[{key:"getMessageToken",value:function(){return Math.random().toString(20).substr(2,this.tokenLength)}},{key:"postMessage",value:function(e){window.top.postMessage(e,"*")}},{key:"subscribeResponse",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;return new Promise((function(r,o){window.addEventListener("message",(function n(u){var i=u.data;i.token===t&&i.key===e&&(i.success?r({success:i.success,data:i.data}):o(new g(e)),window.removeEventListener("message",n))})),setTimeout((function(){o(new f(e))}),n)}))}}])&&m(t.prototype,n),e}();function T(e,t,n,r,o,u,i){try{var c=e[u](i),a=c.value}catch(e){return void n(e)}c.done?t(a):Promise.resolve(a).then(r,o)}function S(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var u=e.apply(t,n);function i(e){T(u,r,o,i,c,"next",e)}function c(e){T(u,r,o,i,c,"throw",e)}i(void 0)}))}}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}!function(e){e.GetAppState="getAppState",e.GetThirdPartyOauth2Token="getThirdPartyOAuth2Token",e.PutAppState="putAppState",e.PostExternalAsset="postExternalAsset"}(w||(w={})),function(e){e.DispatchCloseApp="closeApp"}(O||(O={}));var R="1.0.14",j=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.messenger=new k}var t,n,r,o,u,i,c;return t=e,(n=[{key:"closeApp",value:function(){this.dispatch(O.DispatchCloseApp)}},{key:"getAppState",value:(c=S(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch(w.GetAppState));case 1:case"end":return e.stop()}}),e,this)}))),function(){return c.apply(this,arguments)})},{key:"getThirdPartyOAuth2Token",value:(i=S(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.messenger.getMessageToken(),this.messenger.postMessage({key:w.GetThirdPartyOauth2Token,token:n}),t.abrupt("return",this.messenger.subscribeResponse(w.GetThirdPartyOauth2Token,n,e.OAUTH2_TIMEOUT));case 3:case"end":return t.stop()}}),t,this)}))),function(){return i.apply(this,arguments)})},{key:"putAppState",value:(u=S(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch(w.PutAppState,t));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return u.apply(this,arguments)})},{key:"postExternalAsset",value:(o=S(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.fetch(w.PostExternalAsset,t));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return o.apply(this,arguments)})},{key:"dispatch",value:function(e){var t=this.messenger.getMessageToken();this.messenger.postMessage({key:e,token:t})}},{key:"fetch",value:(r=S(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.messenger.getMessageToken(),this.messenger.postMessage({key:t,token:r,data:n}),e.abrupt("return",this.messenger.subscribeResponse(t,r));case 3:case"end":return e.stop()}}),e,this)}))),function(e,t){return r.apply(this,arguments)})}])&&P(t.prototype,n),e}();j.OAUTH2_TIMEOUT=3e5})(0,t,e),t})()}));
//# sourceMappingURL=AppBridge.js.map