!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("AppBridge",[],e):"object"==typeof exports?exports.AppBridge=e():t.AppBridge=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function o(t){var e="function"==typeof Map?new Map:void 0;return(o=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return u(t,arguments,a(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),c(r,t)})(t)}function u(t,e,n){return(u=i()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&c(o,n.prototype),o}).apply(null,arguments)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}t.r(e),t.d(e,{DispatchKey:()=>_,FetchKey:()=>j,default:()=>B});var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(u,t);var e,n,o=(e=u,n=i(),function(){var t,o=a(e);if(n){var u=a(this).constructor;t=Reflect.construct(o,arguments,u)}else t=o.apply(this,arguments);return r(this,t)});function u(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),o.call(this,"The origin of this call is not allowed")}return u}(o(Error));function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){return!e||"object"!==s(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){var e="function"==typeof Map?new Map:void 0;return(l=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return y(t,arguments,v(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),b(r,t)})(t)}function y(t,e,n){return(y=h()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&b(o,n.prototype),o}).apply(null,arguments)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(o,t);var e,n,r=(e=o,n=h(),function(){var t,r=v(e);if(n){var o=v(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return p(this,t)});function o(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,'Timeout for call with key "'.concat(t,'" expired. Call was aborted.'))}return o}(l(Error));function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e){return!e||"object"!==g(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){var e="function"==typeof Map?new Map:void 0;return(w=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return O(t,arguments,T(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),S(r,t)})(t)}function O(t,e,n){return(O=k()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&S(o,n.prototype),o}).apply(null,arguments)}function k(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(o,t);var e,n,r=(e=o,n=k(),function(){var t,r=T(e);if(n){var o=T(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return m(this,t)});function o(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,"Call with key ".concat(t," failed."))}return o}(w(Error));function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var j,_,x=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tokenLength=6,this.originUrl=e}var e,n;return e=t,(n=[{key:"getMessageToken",value:function(){return Math.random().toString(20).substr(2,this.tokenLength)}},{key:"postMessage",value:function(t){window.top.postMessage(t,this.originUrl)}},{key:"subscribeResponse",value:function(t,e){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;return new Promise((function(o,u){window.addEventListener("message",(function(r){var i=r.data;i.token===e&&i.key===t&&(r.origin!==n.originUrl&&u(new f),i.success?o({success:i.success,data:i.data}):u(new R(t)))}),{once:!0}),setTimeout((function(){u(new d(t))}),r)}))}}])&&P(e.prototype,n),t}();function E(t,e,n,r,o,u,i){try{var c=t[u](i),a=c.value}catch(t){return void n(t)}c.done?e(a):Promise.resolve(a).then(r,o)}function A(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var u=t.apply(e,n);function i(t){E(u,r,o,i,c,"next",t)}function c(t){E(u,r,o,i,c,"throw",t)}i(void 0)}))}}function M(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}!function(t){t.GetAppState="getAppState",t.GetThirdPartyOauth2Token="getThirdPartyOAuth2Token",t.PutAppState="putAppState",t.PostExternalAsset="postExternalAsset"}(j||(j={})),function(t){t.DispatchCloseApp="closeApp"}(_||(_={}));var B=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.messenger=new x(e)}var e,n,r,o,u,i,c;return e=t,(n=[{key:"closeApp",value:function(){this.dispatch(_.DispatchCloseApp)}},{key:"getAppState",value:(c=A(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch(j.GetAppState));case 1:case"end":return t.stop()}}),t,this)}))),function(){return c.apply(this,arguments)})},{key:"getThirdPartyOAuth2Token",value:(i=A(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.messenger.getMessageToken(),this.messenger.postMessage({key:j.GetThirdPartyOauth2Token,token:n}),e.abrupt("return",this.messenger.subscribeResponse(j.GetThirdPartyOauth2Token,n,t.OAUTH2_TIMEOUT));case 3:case"end":return e.stop()}}),e,this)}))),function(){return i.apply(this,arguments)})},{key:"putAppState",value:(u=A(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch(j.PutAppState,e));case 1:case"end":return t.stop()}}),t,this)}))),function(t){return u.apply(this,arguments)})},{key:"postExternalAsset",value:(o=A(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.fetch(j.PostExternalAsset,e));case 1:case"end":return t.stop()}}),t,this)}))),function(t){return o.apply(this,arguments)})},{key:"dispatch",value:function(t){var e=this.messenger.getMessageToken();this.messenger.postMessage({key:t,token:e})}},{key:"fetch",value:(r=A(regeneratorRuntime.mark((function t(e,n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.messenger.getMessageToken(),this.messenger.postMessage({key:e,token:r,data:n}),t.abrupt("return",this.messenger.subscribeResponse(e,r));case 3:case"end":return t.stop()}}),t,this)}))),function(t,e){return r.apply(this,arguments)})}])&&M(e.prototype,n),t}();return B.OAUTH2_TIMEOUT=3e5,e})()}));
//# sourceMappingURL=AppBridge.js.map