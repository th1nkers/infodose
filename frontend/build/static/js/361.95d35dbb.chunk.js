"use strict";(self.webpackChunkinfodose=self.webpackChunkinfodose||[]).push([[361],{810:function(e,n,t){t.d(n,{Z:function(){return o}});var a=t(885),i=t(413),r=t(791),s=t(291),u=t(184),l=function(e,n){switch(n.type){case"CHANGE":return(0,i.Z)((0,i.Z)({},e),{},{value:n.val,isValid:(0,s.Gu)(n.val,n.validators)});case"TOUCH":return(0,i.Z)((0,i.Z)({},e),{},{isTouched:!0});default:return e}},o=function(e){var n=(0,r.useReducer)(l,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),t=(0,a.Z)(n,2),i=t[0],s=t[1],o=e.id,c=e.onInput,d=i.value,p=i.isValid;(0,r.useEffect)((function(){c(o,d,p)}),[o,d,p,c]);var f=function(n){s({type:"CHANGE",val:n.target.value,validators:e.validators})},v=function(){s({type:"TOUCH"})},h="input"===e.element?(0,u.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:f,onBlur:v,value:i.value}):(0,u.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:f,onBlur:v,value:i.value});return(0,u.jsxs)("div",{className:"form-control ".concat(!i.isValid&&i.isTouched&&"form-control--invalid"),children:[(0,u.jsx)("label",{htmlFor:e.id,children:e.label}),h,!i.isValid&&i.isTouched&&(0,u.jsx)("p",{children:e.errorText})]})}},373:function(e,n,t){t.d(n,{Z:function(){return i}});t(791);var a=t(184),i=function(e){return(0,a.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},94:function(e,n,t){t.d(n,{c:function(){return l}});var a=t(885),i=t(167),r=t(413),s=t(791),u=function(e,n){switch(n.type){case"INPUT_CHANGE":var t=!0;for(var a in e.inputs)e.inputs[a]&&(t=a===n.inputId?t&&n.isValid:t&&e.inputs[a].isValid);return(0,r.Z)((0,r.Z)({},e),{},{inputs:(0,r.Z)((0,r.Z)({},e.inputs),{},(0,i.Z)({},n.inputId,{value:n.value,isValid:n.isValid})),isValid:t});case"SET_DATA":return{inputs:n.inputs,isValid:n.formIsValid};default:return e}},l=function(e,n){var t=(0,s.useReducer)(u,{inputs:e,isValid:n}),i=(0,a.Z)(t,2),r=i[0],l=i[1];return[r,(0,s.useCallback)((function(e,n,t){l({type:"INPUT_CHANGE",value:n,isValid:t,inputId:e})}),[]),(0,s.useCallback)((function(e,n){l({type:"SET_DATA",inputs:e,formIsValid:n})}),[])]}},291:function(e,n,t){t.d(n,{Ox:function(){return c},CP:function(){return o},hg:function(){return l},Gu:function(){return d}});var a=t(192);var i="REQUIRE",r="MINLENGTH",s="MAXLENGTH",u="EMAIL",l=function(){return{type:i}},o=function(e){return{type:r,val:e}},c=function(){return{type:u}},d=function(e,n){var t,l=!0,o=function(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,a.Z)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return u=e.done,e},e:function(e){l=!0,s=e},f:function(){try{u||null==t.return||t.return()}finally{if(l)throw s}}}}(n);try{for(o.s();!(t=o.n()).done;){var c=t.value;c.type===i&&(l=l&&e.trim().length>0),c.type===r&&(l=l&&e.trim().length>=c.val),c.type===s&&(l=l&&e.trim().length<=c.val),"MIN"===c.type&&(l=l&&+e>=c.val),"MAX"===c.type&&(l=l&&+e<=c.val),c.type===u&&(l=l&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){o.e(d)}finally{o.f()}return l}},836:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var a=t(165),i=t(861),r=t(413),s=t(885),u=t(791),l=t(373),o=t(810),c=t(999),d=t(291),p=t(94),f=t(108),v=t(895),h=t(434),m=t(508),x=t(184),y=function(e){var n=(0,u.useState)(),t=(0,s.Z)(n,2),a=t[0],i=t[1],r=(0,u.useState)(),l=(0,s.Z)(r,2),o=l[0],d=l[1],p=(0,u.useState)(!1),f=(0,s.Z)(p,2),v=f[0],h=f[1],m=(0,u.useRef)();(0,u.useEffect)((function(){if(a){var e=new FileReader;e.onload=function(){d(e.result)},e.readAsDataURL(a)}}),[a]);return(0,x.jsxs)("div",{className:"form-control center",children:[(0,x.jsx)("input",{id:e.id,ref:m,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(n){var t,a=v;n.target.files&&1===n.target.files.length?(t=n.target.files[0],i(t),h(!0),a=!0):(h(!1),a=!1),e.onInput(e.id,t,a)}}),(0,x.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,x.jsxs)("div",{className:"image-upload__preview",children:[o&&(0,x.jsx)("img",{src:o,alt:"Preview"}),!o&&(0,x.jsx)("p",{children:"Please pick an image."})]}),(0,x.jsx)(c.Z,{type:"button",onClick:function(){m.current.click()},children:"PICK IMAGE"})]}),!v&&(0,x.jsx)("p",{children:e.errorText})]})},g=function(){var e=(0,u.useContext)(f.V),n=(0,u.useState)(!0),t=(0,s.Z)(n,2),g=t[0],Z=t[1],j=(0,m.x)(),w=j.loading,b=j.error,V=j.sendRequest,I=j.clearError,T=(0,p.c)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),C=(0,s.Z)(T,3),N=C[0],S=C[1],k=C[2],E=function(){var n=(0,i.Z)((0,a.Z)().mark((function n(t){var i,r,s;return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),!g){n.next=13;break}return n.prev=2,n.next=5,V("".concat("http://localhost:5000/api","/users/login"),"POST",JSON.stringify({email:N.inputs.email.value,password:N.inputs.password.value}),{"Content-Type":"application/json"});case 5:i=n.sent,e.login(i.userId,i.token),n.next=11;break;case 9:n.prev=9,n.t0=n.catch(2);case 11:n.next=27;break;case 13:return n.prev=13,(r=new FormData).append("email",N.inputs.email.value),r.append("password",N.inputs.password.value),r.append("name",N.inputs.name.value),r.append("image",N.inputs.image.value),n.next=21,V("".concat("http://localhost:5000/api","/users/signup"),"POST",r);case 21:s=n.sent,e.login(s.userId,s.token),n.next=27;break;case 25:n.prev=25,n.t1=n.catch(13);case 27:case"end":return n.stop()}}),n,null,[[2,9],[13,25]])})));return function(e){return n.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{error:b,onClear:I}),(0,x.jsxs)(l.Z,{className:"authentication",children:[w&&(0,x.jsx)(v.Z,{asOverlay:!0}),(0,x.jsx)("h2",{children:"Login Required"}),(0,x.jsx)("hr",{}),(0,x.jsxs)("form",{onSubmit:E,children:[!g&&(0,x.jsx)(o.Z,{element:"input",id:"name",type:"text",label:"Your Name",validators:[(0,d.hg)()],errorText:"Please enter a name.",onInput:S}),!g&&(0,x.jsx)(y,{id:"image",onInput:S}),(0,x.jsx)(o.Z,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[(0,d.Ox)()],errorText:"Please enter a valid email address.",onInput:S}),(0,x.jsx)(o.Z,{element:"input",id:"password",type:"password",label:"Password",validators:[(0,d.CP)(6)],errorText:"Please enter a valid password, at least 5 characters.",onInput:S}),(0,x.jsx)(c.Z,{type:"submit",disabled:!N.isValid,children:g?"Login":"Signup"})]}),(0,x.jsxs)(c.Z,{inverse:!0,onClick:function(){g?k((0,r.Z)((0,r.Z)({},N.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1):k((0,r.Z)((0,r.Z)({},N.inputs),{},{name:void 0,image:void 0}),N.inputs.email.isValid&&N.inputs.password.isValid),Z((function(e){return!e}))},children:["Switch to ",g?"Signup":"Login","!"]})]})]})}}}]);
//# sourceMappingURL=361.95d35dbb.chunk.js.map