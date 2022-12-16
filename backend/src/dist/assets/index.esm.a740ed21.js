import{R as W}from"./index.150851d7.js";var ie=e=>e.type==="checkbox",X=e=>e instanceof Date,O=e=>e==null;const We=e=>typeof e=="object";var S=e=>!O(e)&&!Array.isArray(e)&&We(e)&&!X(e),nr=e=>S(e)&&e.target?ie(e.target)?e.target.checked:e.target.value:e,lr=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,ar=(e,s)=>e.has(lr(s)),ne=e=>Array.isArray(e)?e.filter(Boolean):[],k=e=>e===void 0,d=(e,s,r)=>{if(!s||!S(e))return r;const a=ne(s.split(/[,[\].]+?/)).reduce((l,u)=>O(l)?l:l[u],e);return k(a)||a===e?k(e[s])?r:e[s]:a};const Ue={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},P={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},H={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};W.createContext(null);var or=(e,s,r,a=!0)=>{const l={defaultValues:s._defaultValues};for(const u in e)Object.defineProperty(l,u,{get:()=>{const h=u;return s._proxyFormState[h]!==P.all&&(s._proxyFormState[h]=!a||P.all),r&&(r[h]=!0),e[h]}});return l},R=e=>S(e)&&!Object.keys(e).length,ur=(e,s,r)=>{const{name:a,...l}=e;return R(l)||Object.keys(l).length>=Object.keys(s).length||Object.keys(l).find(u=>s[u]===(!r||P.all))},we=e=>Array.isArray(e)?e:[e];function cr(e){const s=W.useRef(e);s.current=e,W.useEffect(()=>{const r=!e.disabled&&s.current.subject.subscribe({next:s.current.callback});return()=>{r&&r.unsubscribe()}},[e.disabled])}var p=e=>typeof e=="string",fr=(e,s,r,a)=>p(e)?(a&&s.watch.add(e),d(r,e)):Array.isArray(e)?e.map(l=>(a&&s.watch.add(l),d(r,l))):(a&&(s.watchAll=!0),r),dr=e=>{const s=e.constructor&&e.constructor.prototype;return S(s)&&s.hasOwnProperty("isPrototypeOf")},Ve=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function z(e){let s;const r=Array.isArray(e);if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Ve&&(e instanceof Blob||e instanceof FileList))&&(r||S(e)))if(s=r?[]:{},!Array.isArray(e)&&!dr(e))s=e;else for(const a in e)s[a]=z(e[a]);else return e;return s}var yr=(e,s,r,a,l)=>s?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[a]:l||!0}}:{},Ee=e=>/^\w*$/.test(e),$e=e=>ne(e.replace(/["|']|\]/g,"").split(/\.|\[/));function F(e,s,r){let a=-1;const l=Ee(s)?[s]:$e(s),u=l.length,h=u-1;for(;++a<u;){const g=l[a];let x=r;if(a!==h){const T=e[g];x=S(T)||Array.isArray(T)?T:isNaN(+l[a+1])?{}:[]}e[g]=x,e=e[g]}return e}const ke=(e,s,r)=>{for(const a of r||Object.keys(e)){const l=d(e,a);if(l){const{_f:u,...h}=l;if(u&&s(u.name)){if(u.ref.focus){u.ref.focus();break}else if(u.refs&&u.refs[0].focus){u.refs[0].focus();break}}else S(h)&&ke(h,s)}}};var Me=(e,s,r)=>!r&&(s.watchAll||s.watch.has(e)||[...s.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length)))),hr=(e,s,r)=>{const a=ne(d(e,r));return F(a,"root",s[r]),F(e,r,a),e},Z=e=>typeof e=="boolean",Ce=e=>e.type==="file",fe=e=>typeof e=="function",ce=e=>p(e)||W.isValidElement(e),Oe=e=>e.type==="radio",de=e=>e instanceof RegExp;const Ne={value:!1,isValid:!1},Be={value:!0,isValid:!0};var Ke=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!k(e[0].attributes.value)?k(e[0].value)||e[0].value===""?Be:{value:e[0].value,isValid:!0}:Be:Ne}return Ne};const Pe={isValid:!1,value:null};var je=e=>Array.isArray(e)?e.reduce((s,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:s,Pe):Pe;function pe(e,s,r="validate"){if(ce(e)||Array.isArray(e)&&e.every(ce)||Z(e)&&!e)return{type:r,message:ce(e)?e:"",ref:s}}var Q=e=>S(e)&&!de(e)?e:{value:e,message:""},Ie=async(e,s,r,a,l)=>{const{ref:u,refs:h,required:g,maxLength:x,minLength:T,min:M,max:_,pattern:b,validate:$,name:N,valueAsNumber:le,mount:ge,disabled:K}=e._f;if(!ge||K)return{};const I=h?h[0]:u,q=v=>{a&&I.reportValidity&&(I.setCustomValidity(Z(v)?"":v||""),I.reportValidity())},m={},ee=Oe(u),ae=ie(u),j=ee||ae,G=(le||Ce(u))&&!u.value||s===""||Array.isArray(s)&&!s.length,L=yr.bind(null,N,r,m),oe=(v,A,D,E=H.maxLength,B=H.minLength)=>{const U=v?A:D;m[N]={type:v?E:B,message:U,ref:u,...L(v?E:B,U)}};if(l?!Array.isArray(s)||!s.length:g&&(!j&&(G||O(s))||Z(s)&&!s||ae&&!Ke(h).isValid||ee&&!je(h).isValid)){const{value:v,message:A}=ce(g)?{value:!!g,message:g}:Q(g);if(v&&(m[N]={type:H.required,message:A,ref:I,...L(H.required,A)},!r))return q(A),m}if(!G&&(!O(M)||!O(_))){let v,A;const D=Q(_),E=Q(M);if(!O(s)&&!isNaN(s)){const B=u.valueAsNumber||s&&+s;O(D.value)||(v=B>D.value),O(E.value)||(A=B<E.value)}else{const B=u.valueAsDate||new Date(s),U=ue=>new Date(new Date().toDateString()+" "+ue),re=u.type=="time",J=u.type=="week";p(D.value)&&s&&(v=re?U(s)>U(D.value):J?s>D.value:B>new Date(D.value)),p(E.value)&&s&&(A=re?U(s)<U(E.value):J?s<E.value:B<new Date(E.value))}if((v||A)&&(oe(!!v,D.message,E.message,H.max,H.min),!r))return q(m[N].message),m}if((x||T)&&!G&&(p(s)||l&&Array.isArray(s))){const v=Q(x),A=Q(T),D=!O(v.value)&&s.length>v.value,E=!O(A.value)&&s.length<A.value;if((D||E)&&(oe(D,v.message,A.message),!r))return q(m[N].message),m}if(b&&!G&&p(s)){const{value:v,message:A}=Q(b);if(de(v)&&!s.match(v)&&(m[N]={type:H.pattern,message:A,ref:u,...L(H.pattern,A)},!r))return q(A),m}if($){if(fe($)){const v=await $(s),A=pe(v,I);if(A&&(m[N]={...A,...L(H.validate,A.message)},!r))return q(A.message),m}else if(S($)){let v={};for(const A in $){if(!R(v)&&!r)break;const D=pe(await $[A](s),I,A);D&&(v={...D,...L(A,D.message)},q(D.message),r&&(m[N]=v))}if(!R(v)&&(m[N]={ref:I,...v},!r))return m}}return q(!0),m},qe=e=>({isOnSubmit:!e||e===P.onSubmit,isOnBlur:e===P.onBlur,isOnChange:e===P.onChange,isOnAll:e===P.all,isOnTouch:e===P.onTouched});function gr(e,s){const r=s.slice(0,-1).length;let a=0;for(;a<r;)e=k(e)?a++:e[s[a++]];return e}function vr(e){for(const s in e)if(!k(e[s]))return!1;return!0}function C(e,s){const r=Ee(s)?[s]:$e(s),a=r.length==1?e:gr(e,r),l=r[r.length-1];let u;a&&delete a[l];for(let h=0;h<r.slice(0,-1).length;h++){let g=-1,x;const T=r.slice(0,-(h+1)),M=T.length-1;for(h>0&&(u=e);++g<T.length;){const _=T[g];x=x?x[_]:e[_],M===g&&(S(x)&&R(x)||Array.isArray(x)&&vr(x))&&(u?delete u[_]:delete e[_]),u=x}}return e}function Fe(){let e=[];return{get observers(){return e},next:l=>{for(const u of e)u.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(u=>u!==l)}}),unsubscribe:()=>{e=[]}}}var ye=e=>O(e)||!We(e);function Y(e,s){if(ye(e)||ye(s))return e===s;if(X(e)&&X(s))return e.getTime()===s.getTime();const r=Object.keys(e),a=Object.keys(s);if(r.length!==a.length)return!1;for(const l of r){const u=e[l];if(!a.includes(l))return!1;if(l!=="ref"){const h=s[l];if(X(u)&&X(h)||S(u)&&S(h)||Array.isArray(u)&&Array.isArray(h)?!Y(u,h):u!==h)return!1}}return!0}var Se=e=>{const s=e?e.ownerDocument:0,r=s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement;return e instanceof r},ze=e=>e.type==="select-multiple",br=e=>Oe(e)||ie(e),xe=e=>Se(e)&&e.isConnected,Ge=e=>{for(const s in e)if(fe(e[s]))return!0;return!1};function he(e,s={}){const r=Array.isArray(e);if(S(e)||r)for(const a in e)Array.isArray(e[a])||S(e[a])&&!Ge(e[a])?(s[a]=Array.isArray(e[a])?[]:{},he(e[a],s[a])):O(e[a])||(s[a]=!0);return s}function Je(e,s,r){const a=Array.isArray(e);if(S(e)||a)for(const l in e)Array.isArray(e[l])||S(e[l])&&!Ge(e[l])?k(s)||ye(r[l])?r[l]=Array.isArray(e[l])?he(e[l],[]):{...he(e[l])}:Je(e[l],O(s)?{}:s[l],r[l]):Y(e[l],s[l])?delete r[l]:r[l]=!0;return r}var me=(e,s)=>Je(e,s,he(s)),Qe=(e,{valueAsNumber:s,valueAsDate:r,setValueAs:a})=>k(e)?e:s?e===""?NaN:e&&+e:r&&p(e)?new Date(e):a?a(e):e;function De(e){const s=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):s.disabled))return Ce(s)?s.files:Oe(s)?je(e.refs).value:ze(s)?[...s.selectedOptions].map(({value:r})=>r):ie(s)?Ke(e.refs).value:Qe(k(s.value)?e.ref.value:s.value,e)}var Ar=(e,s,r,a)=>{const l={};for(const u of e){const h=d(s,u);h&&F(l,u,h._f)}return{criteriaMode:r,names:[...e],fields:l,shouldUseNativeValidation:a}},se=e=>k(e)?e:de(e)?e.source:S(e)?de(e.value)?e.value.source:e.value:e,_r=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function He(e,s,r){const a=d(e,r);if(a||Ee(r))return{error:a,name:r};const l=r.split(".");for(;l.length;){const u=l.join("."),h=d(s,u),g=d(e,u);if(h&&!Array.isArray(h)&&r!==u)return{name:r};if(g&&g.type)return{name:u,error:g};l.pop()}return{name:r}}var wr=(e,s,r,a,l)=>l.isOnAll?!1:!r&&l.isOnTouch?!(s||e):(r?a.isOnBlur:l.isOnBlur)?!e:(r?a.isOnChange:l.isOnChange)?e:!0,Fr=(e,s)=>!ne(d(e,s)).length&&C(e,s);const xr={mode:P.onSubmit,reValidateMode:P.onChange,shouldFocusError:!0};function mr(e={}){let s={...xr,...e},r={submitCount:0,isDirty:!1,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},a={},l=z(s.defaultValues)||{},u=s.shouldUnregister?{}:z(l),h={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},x,T=0,M={};const _={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},b={watch:Fe(),array:Fe(),state:Fe()},$=qe(s.mode),N=qe(s.reValidateMode),le=s.criteriaMode===P.all,ge=t=>i=>{clearTimeout(T),T=window.setTimeout(t,i)},K=async()=>{if(_.isValid){const t=s.resolver?R((await j()).errors):(await L(a,!0)).valid;t!==r.isValid&&(r.isValid=t,b.state.next({isValid:t}))}},I=(t,i=[],n,c,f=!0,o=!0)=>{if(c&&n){if(h.action=!0,o&&Array.isArray(d(a,t))){const y=n(d(a,t),c.argA,c.argB);f&&F(a,t,y)}if(o&&Array.isArray(d(r.errors,t))){const y=n(d(r.errors,t),c.argA,c.argB);f&&F(r.errors,t,y),Fr(r.errors,t)}if(_.touchedFields&&o&&Array.isArray(d(r.touchedFields,t))){const y=n(d(r.touchedFields,t),c.argA,c.argB);f&&F(r.touchedFields,t,y)}_.dirtyFields&&(r.dirtyFields=me(l,u)),b.state.next({name:t,isDirty:v(t,i),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else F(u,t,i)},q=(t,i)=>{F(r.errors,t,i),b.state.next({errors:r.errors})},m=(t,i,n,c)=>{const f=d(a,t);if(f){const o=d(u,t,k(n)?d(l,t):n);k(o)||c&&c.defaultChecked||i?F(u,t,i?o:De(f._f)):E(t,o),h.mount&&K()}},ee=(t,i,n,c,f)=>{let o=!1,y=!1;const w={name:t};if(_.isDirty&&(y=r.isDirty,r.isDirty=w.isDirty=v(),o=y!==w.isDirty),_.dirtyFields&&(!n||c)){y=d(r.dirtyFields,t);const V=Y(d(l,t),i);V?C(r.dirtyFields,t):F(r.dirtyFields,t,!0),w.dirtyFields=r.dirtyFields,o=o||y!==!V}if(n){const V=d(r.touchedFields,t);V||(F(r.touchedFields,t,n),w.touchedFields=r.touchedFields,o=o||_.touchedFields&&V!==n)}return o&&f&&b.state.next(w),o?w:{}},ae=(t,i,n,c)=>{const f=d(r.errors,t),o=_.isValid&&Z(i)&&r.isValid!==i;if(e.delayError&&n?(x=ge(()=>q(t,n)),x(e.delayError)):(clearTimeout(T),x=null,n?F(r.errors,t,n):C(r.errors,t)),(n?!Y(f,n):f)||!R(c)||o){const y={...c,...o&&Z(i)?{isValid:i}:{},errors:r.errors,name:t};r={...r,...y},b.state.next(y)}M[t]--,_.isValidating&&!Object.values(M).some(y=>y)&&(b.state.next({isValidating:!1}),M={})},j=async t=>await s.resolver(u,s.context,Ar(t||g.mount,a,s.criteriaMode,s.shouldUseNativeValidation)),G=async t=>{const{errors:i}=await j();if(t)for(const n of t){const c=d(i,n);c?F(r.errors,n,c):C(r.errors,n)}else r.errors=i;return i},L=async(t,i,n={valid:!0})=>{for(const c in t){const f=t[c];if(f){const{_f:o,...y}=f;if(o){const w=g.array.has(o.name),V=await Ie(f,d(u,o.name),le,s.shouldUseNativeValidation,w);if(V[o.name]&&(o.name===n.name&&(n.error=V[n.name]),n.valid=!1,i))break;!i&&(d(V,o.name)?w?hr(r.errors,V,o.name):F(r.errors,o.name,V[o.name]):C(r.errors,o.name))}y&&await L(y,i,n)}}return n},oe=()=>{for(const t of g.unMount){const i=d(a,t);i&&(i._f.refs?i._f.refs.every(n=>!xe(n)):!xe(i._f.ref))&&ve(t)}g.unMount=new Set},v=(t,i)=>(t&&i&&F(u,t,i),!Y(ue(),l)),A=(t,i,n)=>fr(t,g,{...h.mount?u:k(i)?l:p(t)?{[t]:i}:i},n),D=t=>ne(d(h.mount?u:l,t,e.shouldUnregister?d(l,t,[]):[])),E=(t,i,n={})=>{const c=d(a,t);let f=i;if(c){const o=c._f;o&&(!o.disabled&&F(u,t,Qe(i,o)),f=Ve&&Se(o.ref)&&O(i)?"":i,ze(o.ref)?[...o.ref.options].forEach(y=>y.selected=f.includes(y.value)):o.refs?ie(o.ref)?o.refs.length>1?o.refs.forEach(y=>(!y.defaultChecked||!y.disabled)&&(y.checked=Array.isArray(f)?!!f.find(w=>w===y.value):f===y.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(y=>y.checked=y.value===f):Ce(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||b.watch.next({name:t})))}(n.shouldDirty||n.shouldTouch)&&ee(t,f,n.shouldTouch,n.shouldDirty,!0),n.shouldValidate&&J(t)},B=(t,i,n)=>{for(const c in i){const f=i[c],o=`${t}.${c}`,y=d(a,o);(g.array.has(t)||!ye(f)||y&&!y._f)&&!X(f)?B(o,f,n):E(o,f,n)}},U=(t,i,n={})=>{const c=d(a,t),f=g.array.has(t),o=z(i);F(u,t,o),f?(b.array.next({name:t,values:u}),(_.isDirty||_.dirtyFields)&&n.shouldDirty&&(r.dirtyFields=me(l,u),b.state.next({name:t,dirtyFields:r.dirtyFields,isDirty:v(t,o)}))):c&&!c._f&&!O(o)?B(t,o,n):E(t,o,n),Me(t,g)&&b.state.next({}),b.watch.next({name:t})},re=async t=>{const i=t.target;let n=i.name;const c=d(a,n);if(c){let f,o;const y=i.type?De(c._f):nr(t),w=t.type===Ue.BLUR||t.type===Ue.FOCUS_OUT,V=!_r(c._f)&&!s.resolver&&!d(r.errors,n)&&!c._f.deps||wr(w,d(r.touchedFields,n),r.isSubmitted,N,$),Ae=Me(n,g,w);F(u,n,y),w?(c._f.onBlur&&c._f.onBlur(t),x&&x(0)):c._f.onChange&&c._f.onChange(t);const _e=ee(n,y,w,!1),sr=!R(_e)||Ae;if(!w&&b.watch.next({name:n,type:t.type}),V)return _.isValid&&K(),sr&&b.state.next({name:n,...Ae?{}:_e});if(!w&&Ae&&b.state.next({}),M[n]=M[n]?M[n]+1:1,b.state.next({isValidating:!0}),s.resolver){const{errors:te}=await j([n]),ir=He(r.errors,a,n),Le=He(te,a,ir.name||n);f=Le.error,n=Le.name,o=R(te)}else{if(_.isValid){const te=await L(a,!0,{name:n,valid:!0});f=te.error||{},o=te.valid}(!f||R(f))&&(f=(await Ie(c,d(u,n),le,s.shouldUseNativeValidation))[n])}c._f.deps&&J(c._f.deps),ae(n,o,f,_e)}},J=async(t,i={})=>{let n,c;const f=we(t);if(b.state.next({isValidating:!0}),s.resolver){const o=await G(k(t)?t:f);n=R(o),c=t?!f.some(y=>d(o,y)):n}else t?(c=(await Promise.all(f.map(async o=>{const y=d(a,o);return(await L(y&&y._f?{[o]:y}:y)).valid}))).every(Boolean),!(!c&&!r.isValid)&&K()):c=n=(await L(a)).valid;return b.state.next({...!p(t)||_.isValid&&n!==r.isValid?{}:{name:t},...s.resolver||!t?{isValid:n}:{},errors:r.errors,isValidating:!1}),i.shouldFocus&&!c&&ke(a,o=>o&&d(r.errors,o),t?f:g.mount),c},ue=t=>{const i={...l,...h.mount?u:{}};return k(t)?i:p(t)?d(i,t):t.map(n=>d(i,n))},Te=(t,i)=>({invalid:!!d((i||r).errors,t),isDirty:!!d((i||r).dirtyFields,t),isTouched:!!d((i||r).touchedFields,t),error:d((i||r).errors,t)}),Xe=t=>{t?we(t).forEach(i=>C(r.errors,i)):r.errors={},b.state.next({errors:r.errors})},Ye=(t,i,n)=>{const c=(d(a,t,{_f:{}})._f||{}).ref;F(r.errors,t,{...i,ref:c}),b.state.next({name:t,errors:r.errors,isValid:!1}),n&&n.shouldFocus&&c&&c.focus&&c.focus()},Ze=(t,i)=>fe(t)?b.watch.subscribe({next:n=>t(A(void 0,i),n)}):A(t,i,!0),ve=(t,i={})=>{for(const n of t?we(t):g.mount)g.mount.delete(n),g.array.delete(n),d(a,n)&&(i.keepValue||(C(a,n),C(u,n)),!i.keepError&&C(r.errors,n),!i.keepDirty&&C(r.dirtyFields,n),!i.keepTouched&&C(r.touchedFields,n),!s.shouldUnregister&&!i.keepDefaultValue&&C(l,n));b.watch.next({}),b.state.next({...r,...i.keepDirty?{isDirty:v()}:{}}),!i.keepIsValid&&K()},be=(t,i={})=>{let n=d(a,t);const c=Z(i.disabled);return F(a,t,{...n||{},_f:{...n&&n._f?n._f:{ref:{name:t}},name:t,mount:!0,...i}}),g.mount.add(t),n?c&&F(u,t,i.disabled?void 0:d(u,t,De(n._f))):m(t,!0,i.value),{...c?{disabled:i.disabled}:{},...s.shouldUseNativeValidation?{required:!!i.required,min:se(i.min),max:se(i.max),minLength:se(i.minLength),maxLength:se(i.maxLength),pattern:se(i.pattern)}:{},name:t,onChange:re,onBlur:re,ref:f=>{if(f){be(t,i),n=d(a,t);const o=k(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,y=br(o),w=n._f.refs||[];if(y?w.find(V=>V===o):o===n._f.ref)return;F(a,t,{_f:{...n._f,...y?{refs:[...w.filter(xe),o,...Array.isArray(d(l,t))?[{}]:[]],ref:{type:o.type,name:t}}:{ref:o}}}),m(t,!1,void 0,o)}else n=d(a,t,{}),n._f&&(n._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(ar(g.array,t)&&h.action)&&g.unMount.add(t)}}},Re=()=>s.shouldFocusError&&ke(a,t=>t&&d(r.errors,t),g.mount),er=(t,i)=>async n=>{n&&(n.preventDefault&&n.preventDefault(),n.persist&&n.persist());let c=!0,f=z(u);b.state.next({isSubmitting:!0});try{if(s.resolver){const{errors:o,values:y}=await j();r.errors=o,f=y}else await L(a);R(r.errors)?(b.state.next({errors:{},isSubmitting:!0}),await t(f,n)):(i&&await i({...r.errors},n),Re())}catch(o){throw c=!1,o}finally{r.isSubmitted=!0,b.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:R(r.errors)&&c,submitCount:r.submitCount+1,errors:r.errors})}},rr=(t,i={})=>{d(a,t)&&(k(i.defaultValue)?U(t,d(l,t)):(U(t,i.defaultValue),F(l,t,i.defaultValue)),i.keepTouched||C(r.touchedFields,t),i.keepDirty||(C(r.dirtyFields,t),r.isDirty=i.defaultValue?v(t,d(l,t)):v()),i.keepError||(C(r.errors,t),_.isValid&&K()),b.state.next({...r}))},tr=(t,i={})=>{const n=t||l,c=z(n),f=t&&!R(t)?c:l;if(i.keepDefaultValues||(l=n),!i.keepValues){if(i.keepDirtyValues)for(const o of g.mount)d(r.dirtyFields,o)?F(f,o,d(u,o)):U(o,d(f,o));else{if(Ve&&k(t))for(const o of g.mount){const y=d(a,o);if(y&&y._f){const w=Array.isArray(y._f.refs)?y._f.refs[0]:y._f.ref;if(Se(w)){const V=w.closest("form");if(V){V.reset();break}}}}a={}}u=e.shouldUnregister?i.keepDefaultValues?z(l):{}:c,b.array.next({values:f}),b.watch.next({values:f})}g={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},h.mount=!_.isValid||!!i.keepIsValid,h.watch=!!e.shouldUnregister,b.state.next({submitCount:i.keepSubmitCount?r.submitCount:0,isDirty:i.keepDirty||i.keepDirtyValues?r.isDirty:!!(i.keepDefaultValues&&!Y(t,l)),isSubmitted:i.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:i.keepDirty||i.keepDirtyValues?r.dirtyFields:i.keepDefaultValues&&t?me(l,t):{},touchedFields:i.keepTouched?r.touchedFields:{},errors:i.keepErrors?r.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})};return{control:{register:be,unregister:ve,getFieldState:Te,_executeSchema:j,_focusError:Re,_getWatch:A,_getDirty:v,_updateValid:K,_removeUnmounted:oe,_updateFieldArray:I,_getFieldArray:D,_subjects:b,_proxyFormState:_,get _fields(){return a},get _formValues(){return u},get _stateFlags(){return h},set _stateFlags(t){h=t},get _defaultValues(){return l},get _names(){return g},set _names(t){g=t},get _formState(){return r},set _formState(t){r=t},get _options(){return s},set _options(t){s={...s,...t}}},trigger:J,register:be,handleSubmit:er,watch:Ze,setValue:U,getValues:ue,reset:(t,i)=>tr(fe(t)?t(u):t,i),resetField:rr,clearErrors:Xe,unregister:ve,setError:Ye,setFocus:(t,i={})=>{const n=d(a,t),c=n&&n._f;if(c){const f=c.refs?c.refs[0]:c.ref;f.focus&&(f.focus(),i.shouldSelect&&f.select())}},getFieldState:Te}}function Sr(e={}){const s=W.useRef(),[r,a]=W.useState({isDirty:!1,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:e.defaultValues});s.current||(s.current={...mr(e),formState:r});const l=s.current.control;return l._options=e,cr({subject:l._subjects.state,callback:W.useCallback(u=>{ur(u,l._proxyFormState,!0)&&(l._formState={...l._formState,...u},a({...l._formState}))},[l])}),W.useEffect(()=>{l._stateFlags.mount||(l._proxyFormState.isValid&&l._updateValid(),l._stateFlags.mount=!0),l._stateFlags.watch&&(l._stateFlags.watch=!1,l._subjects.state.next({})),l._removeUnmounted()}),W.useEffect(()=>{r.submitCount&&l._focusError()},[l,r.submitCount]),s.current.formState=or(r,l),s.current}export{Sr as u};
