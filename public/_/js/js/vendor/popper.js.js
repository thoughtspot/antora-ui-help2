var e="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator;const t=function(){var o=["Edge","Trident","Firefox"];for(let t=0;t<o.length;t+=1)if(e&&0<=navigator.userAgent.indexOf(o[t]))return 1;return 0}();function o(e){let t=!1;return()=>{t||(t=!0,window.Promise.resolve().then(()=>{t=!1,e()}))}}function n(e){let o=!1;return()=>{o||(o=!0,setTimeout(()=>{o=!1,e()},t))}}const i=e&&window.Promise;var r=i?o:n;function p(e){return e&&"[object Function]"==={}.toString.call(e)}function d(e,t){return 1!==e.nodeType?[]:(e=e.ownerDocument.defaultView.getComputedStyle(e,null),t?e[t]:e)}function s(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function f(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var{overflow:t,overflowX:o,overflowY:n}=d(e);return/(auto|scroll|overlay)/.test(t+n+o)?e:f(s(e))}function a(e){return e&&e.referenceNode?e.referenceNode:e}const l=e&&!(!window.MSInputMethodContext||!document.documentMode),m=e&&/MSIE 10/.test(navigator.userAgent);function h(e){return 11===e?l:10!==e&&l||m}function c(e){if(!e)return document.documentElement;var t=h(10)?document.body:null;let o=e.offsetParent||null;for(;o===t&&e.nextElementSibling;)o=(e=e.nextElementSibling).offsetParent;var n=o&&o.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TH","TD","TABLE"].indexOf(o.nodeName)&&"static"===d(o,"position")?c(o):o:(e?e.ownerDocument:document).documentElement}function u(e){var t=e["nodeName"];return"BODY"!==t&&("HTML"===t||c(e.firstElementChild)===e)}function g(e){return null===e.parentNode?e:g(e.parentNode)}function b(e,t){var o,n,r;return e&&e.nodeType&&t&&t.nodeType?(r=(o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)?e:t,o=o?t:e,n=((n=document.createRange()).setStart(r,0),n.setEnd(o,0),n)["commonAncestorContainer"],e!==n&&t!==n||r.contains(o)?u(n)?n:c(n):(r=g(e)).host?b(r.host,t):b(e,g(t).host)):document.documentElement}function w(e,t="top"){const o="top"===t?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"!==n&&"HTML"!==n)return e[o];{const t=e.ownerDocument.documentElement,n=e.ownerDocument.scrollingElement||t;return n[o]}}function y(e,t,o=!1){var n=w(t,"top"),t=w(t,"left"),o=o?-1:1;return e.top+=n*o,e.bottom+=n*o,e.left+=t*o,e.right+=t*o,e}function E(e,t){var t="x"===t?"Left":"Top",o="Left"==t?"Right":"Bottom";return parseFloat(e[`border${t}Width`])+parseFloat(e[`border${o}Width`])}function x(e,t,o,n){return Math.max(t["offset"+e],t["scroll"+e],o["client"+e],o["offset"+e],o["scroll"+e],h(10)?parseInt(o["offset"+e])+parseInt(n["margin"+("Height"===e?"Top":"Left")])+parseInt(n["margin"+("Height"===e?"Bottom":"Right")]):0)}function v(e){var t=e.body,e=e.documentElement,o=h(10)&&getComputedStyle(e);return{height:x("Height",t,e,o),width:x("Width",t,e,o)}}var O=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e};function L(e){return O({},e,{right:e.left+e.width,bottom:e.top+e.height})}function S(e){let t={};try{if(h(10)){t=e.getBoundingClientRect();const o=w(e,"top"),n=w(e,"left");t.top+=o,t.left+=n,t.bottom+=o,t.right+=n}else t=e.getBoundingClientRect()}catch(t){}const o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},n="HTML"===e.nodeName?v(e.ownerDocument):{},r=n.width||e.clientWidth||o.width,i=n.height||e.clientHeight||o.height;var s=e.offsetWidth-r,a=e.offsetHeight-i;if(s||a){const t=d(e);s-=E(t,"x"),a-=E(t,"y"),o.width-=s,o.height-=a}return L(o)}function T(e,t,o=!1){var n=Math.max,r=h(10),i="HTML"===t.nodeName,s=S(e),a=S(t),e=f(e),p=d(t),l=parseFloat(p.borderTopWidth),c=parseFloat(p.borderLeftWidth);o&&i&&(a.top=n(a.top,0),a.left=n(a.left,0));let u=L({top:s.top-a.top-l,left:s.left-a.left-c,width:s.width,height:s.height});if(u.marginTop=0,u.marginLeft=0,!r&&i){const e=parseFloat(p.marginTop),t=parseFloat(p.marginLeft);u.top-=l-e,u.bottom-=l-e,u.left-=c-t,u.right-=c-t,u.marginTop=e,u.marginLeft=t}return u=(r&&!o?t.contains(e):t===e&&"BODY"!==e.nodeName)?y(u,t):u}function D(e,t=!1){var o=Math.max,n=e.ownerDocument.documentElement,e=T(e,n),r=o(n.clientWidth,window.innerWidth||0),o=o(n.clientHeight,window.innerHeight||0),i=t?0:w(n),t=t?0:w(n,"left");return L({top:i-e.top+e.marginTop,left:t-e.left+e.marginLeft,width:r,height:o})}function C(e){var t=e.nodeName;return"BODY"!==t&&"HTML"!==t&&("fixed"===d(e,"position")||!!(t=s(e))&&C(t))}function N(e){if(!e||!e.parentElement||h())return document.documentElement;let t=e.parentElement;for(;t&&"none"===d(t,"transform");)t=t.parentElement;return t||document.documentElement}function P(t,o,n,r,i=!1){let p={top:0,left:0};var l=i?N(t):b(t,a(o));if("viewport"===r)p=D(l,i);else{let e;"scrollParent"===r?"BODY"===(e=f(s(o))).nodeName&&(e=t.ownerDocument.documentElement):e="window"===r?t.ownerDocument.documentElement:r;const d=T(e,l,i);if("HTML"!==e.nodeName||C(l))p=d;else{const{height:o,width:n}=v(t.ownerDocument);p.top+=d.top-d.marginTop,p.bottom=o+d.top,p.left+=d.left-d.marginLeft,p.right=n+d.left}}const d="number"==typeof(n=n||0);return p.left+=d?n:n.left||0,p.top+=d?n:n.top||0,p.right-=d?n:n.right||0,p.bottom-=d?n:n.bottom||0,p}function B({width:e,height:t}){return e*t}function H(e,t,o,n,r,i=0){if(-1===e.indexOf("auto"))return e;const s=P(o,n,i,r),a={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},f=Object.keys(a).map(e=>O({key:e},a[e],{area:B(a[e])})).sort((e,t)=>t.area-e.area),p=f.filter(({width:e,height:t})=>e>=o.clientWidth&&t>=o.clientHeight),l=(0<p.length?p:f)[0].key,d=e.split("-")[1];return l+(d?"-"+d:"")}function W(e,t,o,n=null){return T(o,n?N(t):b(t,a(o)),n)}function k(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),o=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),t=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+t,height:e.offsetHeight+o}}function A(e){const t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,e=>t[e])}function M(e,t,o){o=o.split("-")[0];var e=k(e),n={width:e.width,height:e.height},r=-1!==["right","left"].indexOf(o),i=r?"top":"left",s=r?"left":"top",a=r?"height":"width",r=r?"width":"height";return n[i]=t[i]+t[a]/2-e[a]/2,n[s]=o===s?t[s]-e[r]:t[A(s)],n}function F(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function I(e,t,o){var n;return Array.prototype.findIndex?e.findIndex(e=>e[t]===o):(n=F(e,e=>e[t]===o),e.indexOf(n))}function R(e,o,t){return(void 0===t?e:e.slice(0,I(e,"name",t))).forEach(e=>{e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;e.enabled&&p(t)&&(o.offsets.popper=L(o.offsets.popper),o.offsets.reference=L(o.offsets.reference),o=t(o,e))}),o}function U(){if(!this.state.isDestroyed){let e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=W(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=H(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=M(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=R(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function Y(e,o){return e.some(({name:e,enabled:t})=>t&&e===o)}function V(t){var o=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1);for(let e=0;e<o.length;e++){var r=o[e],r=r?""+r+n:t;if(void 0!==document.body.style[r])return r}return null}function j(){return this.state.isDestroyed=!0,Y(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[V("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function K(e){e=e.ownerDocument;return e?e.defaultView:window}function q(e,t,o,n){var r="BODY"===e.nodeName,e=r?e.ownerDocument.defaultView:e;e.addEventListener(t,o,{passive:!0}),r||q(f(e.parentNode),t,o,n),n.push(e)}function z(e,t,o,n){o.updateBound=n,K(e).addEventListener("resize",o.updateBound,{passive:!0});n=f(e);return q(n,"scroll",o.updateBound,o.scrollParents),o.scrollElement=n,o.eventsEnabled=!0,o}function G(){this.state.eventsEnabled||(this.state=z(this.reference,this.options,this.state,this.scheduleUpdate))}function _(e,t){return K(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(e=>{e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function X(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=_(this.reference,this.state))}function J(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function Q(o,n){Object.keys(n).forEach(e=>{let t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&J(n[e])&&(t="px"),o.style[e]=n[e]+t})}function Z(t,o){Object.keys(o).forEach(function(e){!1===o[e]?t.removeAttribute(e):t.setAttribute(e,o[e])})}function $(e){return Q(e.instance.popper,e.styles),Z(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&Q(e.arrowElement,e.arrowStyles),e}function ee(e,t,o,n,r){r=W(r,t,e,o.positionFixed),r=H(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute("x-placement",r),Q(t,{position:o.positionFixed?"fixed":"absolute"}),o}function te(e,t){var{popper:o,reference:n}=e.offsets,{round:r,floor:i}=Math,s=e=>e,n=r(n.width),a=r(o.width),f=-1!==["left","right"].indexOf(e.placement),e=-1!==e.placement.indexOf("-"),f=t?f||e||n%2==a%2?r:i:s,i=t?r:s;return{left:f(1==n%2&&1==a%2&&!e&&t?o.left-1:o.left),top:i(o.top),bottom:i(o.bottom),right:f(o.right)}}const oe=e&&/Firefox/i.test(navigator.userAgent);function ne(e,t){var{x:o,y:n}=t,r=e.offsets["popper"],i=F(e.instance.modifiers,e=>"applyStyle"===e.name).gpuAcceleration,t=(void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"),void 0===i?t.gpuAcceleration:i),i=c(e.instance.popper),s=S(i),r={position:r.position},a=te(e,window.devicePixelRatio<2||!oe),o="bottom"===o?"top":"bottom",n="right"===n?"left":"right",f=V("transform"),p="bottom"==o?"HTML"===i.nodeName?-i.clientHeight+a.bottom:-s.height+a.bottom:a.top,i="right"==n?"HTML"===i.nodeName?-i.clientWidth+a.right:-s.width+a.right:a.left;if(t&&f)r[f]=`translate3d(${i}px, ${p}px, 0)`,r[o]=0,r[n]=0,r.willChange="transform";else{const e="bottom"==o?-1:1,t="right"==n?-1:1;r[o]=p*e,r[n]=i*t,r.willChange=o+", "+n}s={"x-placement":e.placement};return e.attributes=O({},s,e.attributes),e.styles=O({},r,e.styles),e.arrowStyles=O({},e.offsets.arrow,e.arrowStyles),e}function ie(e,t,o){const n=F(e,({name:e})=>e===t),r=!!n&&e.some(e=>e.name===o&&e.enabled&&e.order<n.order);if(!r){const e=`\`${t}\``,n=`\`${o}\``;console.warn(n+` modifier is required by ${e} modifier in order to work, be sure to include it before ${e}!`)}return r}function re(t,o){if(ie(t.instance.modifiers,"arrow","keepTogether")){let e=o.element;if("string"==typeof e){if(!(e=t.instance.popper.querySelector(e)))return t}else if(!t.instance.popper.contains(e))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],{popper:n,reference:r}=t.offsets,o=-1!==["left","right"].indexOf(o),i=o?"height":"width",s=o?"Top":"Left",a=s.toLowerCase(),f=o?"left":"top",o=o?"bottom":"right",p=k(e)[i],o=(r[o]-p<n[a]&&(t.offsets.popper[a]-=n[a]-(r[o]-p)),r[a]+p>n[o]&&(t.offsets.popper[a]+=r[a]+p-n[o]),t.offsets.popper=L(t.offsets.popper),r[a]+r[i]/2-p/2),r=d(t.instance.popper),l=parseFloat(r["margin"+s]),r=parseFloat(r[`border${s}Width`]),s=o-t.offsets.popper[a]-l-r,s=Math.max(Math.min(n[i]-p,s),0);t.arrowElement=e,t.offsets.arrow={[a]:Math.round(s),[f]:""}}return t}function pe(e){return"end"===e?"start":"start"===e?"end":e}var de=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"];const se=de.slice(3);function fe(e,t=!1){e=se.indexOf(e),e=se.slice(e+1).concat(se.slice(0,e));return t?e.reverse():e}const ae={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function le(h,u){if(!(Y(h.instance.modifiers,"inner")||h.flipped&&h.placement===h.originalPlacement)){const m=P(h.instance.popper,h.instance.reference,u.padding,u.boundariesElement,h.positionFixed);let p=h.placement.split("-")[0],l=A(p),d=h.placement.split("-")[1]||"",c=[];switch(u.behavior){case ae.FLIP:c=[p,l];break;case ae.CLOCKWISE:c=fe(p);break;case ae.COUNTERCLOCKWISE:c=fe(p,!0);break;default:c=u.behavior}c.forEach((e,t)=>{if(p!==e||c.length===t+1)return h;p=h.placement.split("-")[0],l=A(p);var e=h.offsets.popper,o=h.offsets.reference,n=Math.floor,o="left"===p&&n(e.right)>n(o.left)||"right"===p&&n(e.left)<n(o.right)||"top"===p&&n(e.bottom)>n(o.top)||"bottom"===p&&n(e.top)<n(o.bottom),r=n(e.left)<n(m.left),i=n(e.right)>n(m.right),s=n(e.top)<n(m.top),e=n(e.bottom)>n(m.bottom),n="left"===p&&r||"right"===p&&i||"top"===p&&s||"bottom"===p&&e,a=-1!==["top","bottom"].indexOf(p),f=!!u.flipVariations&&(a&&"start"===d&&r||a&&"end"===d&&i||!a&&"start"===d&&s||!a&&"end"===d&&e),i=!!u.flipVariationsByContent&&(a&&"start"===d&&i||a&&"end"===d&&r||!a&&"start"===d&&e||!a&&"end"===d&&s),r=f||i;(o||n||r)&&(h.flipped=!0,(o||n)&&(p=c[t+1]),r&&(d=pe(d)),h.placement=p+(d?"-"+d:""),h.offsets.popper=O({},h.offsets.popper,M(h.instance.popper,h.offsets.reference,h.placement)),h=R(h.instance.modifiers,h,"flip"))})}return h}function me(e){var{popper:t,reference:o}=e.offsets,n=e.placement.split("-")[0],r=Math.floor,n=-1!==["top","bottom"].indexOf(n),i=n?"right":"bottom",s=n?"left":"top",n=n?"width":"height";return t[i]<r(o[s])&&(e.offsets.popper[s]=r(o[s])-t[n]),t[s]>r(o[i])&&(e.offsets.popper[s]=r(o[i])),e}function he(e,t,o,n){var r=Math.max,i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+i[1],i=i[2];if(!s)return e;if(0!==i.indexOf("%"))return"vh"===i||"vw"===i?("vh"===i?r(document.documentElement.clientHeight,window.innerHeight||0):r(document.documentElement.clientWidth,window.innerWidth||0))/100*s:s;{let e;const r=L(e="%p"===i?o:n);return r[t]/100*s}}function ce(e,r,i,t){const s=[0,0],a=-1!==["right","left"].indexOf(t),o=e.split(/(\+|\-)/).map(e=>e.trim()),n=o.indexOf(F(o,e=>-1!==e.search(/,|\s/)));o[n]&&-1===o[n].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");t=/\s*,\s*|\s+/;let f=-1===n?[o]:[o.slice(0,n).concat([o[n].split(t)[0]]),[o[n].split(t)[1]].concat(o.slice(n+1))];return(f=f.map((e,t)=>{const o=(1===t?!a:a)?"height":"width";let n=!1;return e.reduce((e,t)=>""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,n=!0,e):n?(e[e.length-1]+=t,n=!1,e):e.concat(t),[]).map(e=>he(e,o,r,i))})).forEach((o,n)=>{o.forEach((e,t)=>{J(e)&&(s[n]+=e*("-"===o[t-1]?-1:1))})}),s}function ue(e,{offset:t}){var{placement:o,offsets:{popper:n,reference:r}}=e,o=o.split("-")[0],t=J(+t)?[+t,0]:ce(t,n,r,o);return"left"===o?(n.top+=t[0],n.left-=t[1]):"right"===o?(n.top+=t[0],n.left+=t[1]):"top"===o?(n.left+=t[0],n.top-=t[1]):"bottom"===o&&(n.left+=t[0],n.top+=t[1]),e.popper=n,e}function ge(e,n){let t=n.boundariesElement||c(e.instance.popper);e.instance.reference===t&&(t=c(t));var o=V("transform"),r=e.instance.popper.style,{top:i,left:s,[o]:a}=r;r.top="",r.left="",r[o]="";const f=P(e.instance.popper,e.instance.reference,n.padding,t,e.positionFixed);r.top=i,r.left=s,r[o]=a,n.boundaries=f;i=n.priority;let p=e.offsets.popper;const l={primary(e){let t=p[e];return{[e]:t=p[e]<f[e]&&!n.escapeWithReference?Math.max(p[e],f[e]):t}},secondary(e){var t="right"===e?"left":"top";let o=p[t];return{[t]:o=p[e]>f[e]&&!n.escapeWithReference?Math.min(p[t],f[e]-("right"===e?p.width:p.height)):o}}};return i.forEach(e=>{var t=-1===["left","top"].indexOf(e)?"secondary":"primary";p=O({},p,l[t](e))}),e.offsets.popper=p,e}function be(e){const t=e.placement,o=t.split("-")[0],n=t.split("-")[1];if(n){const{reference:t,popper:r}=e.offsets,i=-1!==["bottom","top"].indexOf(o),s=i?"left":"top",a=i?"width":"height",f={start:{[s]:t[s]},end:{[s]:t[s]+t[a]-r[a]}};e.offsets.popper=O({},r,f[n])}return e}function we(e){if(ie(e.instance.modifiers,"hide","preventOverflow")){var t=e.offsets.reference,o=F(e.instance.modifiers,e=>"preventOverflow"===e.name).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}}return e}function ye(e){var t=e.placement,o=t.split("-")[0],{popper:n,reference:r}=e.offsets,i=-1!==["left","right"].indexOf(o),s=-1===["top","left"].indexOf(o);return n[i?"left":"top"]=r[o]-(s?n[i?"width":"height"]:0),e.placement=A(t),e.offsets.popper=L(n),e}var Ee={shift:{order:100,enabled:!0,fn:be},offset:{order:200,enabled:!0,fn:ue,offset:0},preventOverflow:{order:300,enabled:!0,fn:ge,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:me},arrow:{order:500,enabled:!0,fn:re,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:le,behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:ye},hide:{order:800,enabled:!0,fn:we},computeStyle:{order:850,enabled:!0,fn:ne,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:$,onLoad:ee,gpuAcceleration:void 0}},xe={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers:Ee};class ve{constructor(e,t,o={}){this.scheduleUpdate=()=>requestAnimationFrame(this.update),this.update=r(this.update.bind(this)),this.options=O({},ve.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(O({},ve.Defaults.modifiers,o.modifiers)).forEach(e=>{this.options.modifiers[e]=O({},ve.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(e=>O({name:e},this.options.modifiers[e])).sort((e,t)=>e.order-t.order),this.modifiers.forEach(e=>{e.enabled&&p(e.onLoad)&&e.onLoad(this.reference,this.popper,this.options,e,this.state)}),this.update();e=this.options.eventsEnabled;e&&this.enableEventListeners(),this.state.eventsEnabled=e}update(){return U.call(this)}destroy(){return j.call(this)}enableEventListeners(){return G.call(this)}disableEventListeners(){return X.call(this)}}ve.Utils=("undefined"==typeof window?global:window).PopperUtils,ve.placements=de,ve.Defaults=xe;export default ve;
//# sourceMappingURL=popper.js.js.map