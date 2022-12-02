import{s as c,r as m,_ as C,a as F,u as A,j as e,b as r,l as j,c as L,d as R}from"./index.1d9ee3fc.js";import{R as h,d as i,I as n}from"./ButtonTheme.d6549f3e.js";import{L as S,T as k,a as t,B as g,r as T,u as B}from"./AuthPage.91b7cdc0.js";import{u as E,a as U,g as q,f as z}from"./facebook_icon.a6338a4e.js";const P=c.label`
  margin: 0.1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: block;
  @media screen and (max-height: 470px) {
    display: none;
  }
`,D=c.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor:pointer;
  transition: all 0.3s;
  :hover{
    opacity:50%;
  }
`,N=c.input`
  display: none;
`,Z="/assets/pic_change.eac4a79a.png",O=m.exports.lazy(()=>C(()=>import("./Loading.d163ac00.js"),["assets/Loading.d163ac00.js","assets/AuthPage.91b7cdc0.js","assets/index.1d9ee3fc.js","assets/ButtonTheme.d6549f3e.js"])),K=({handleForm:u})=>{const{loading:f,callEndpoint:l}=E(),[d,y]=m.exports.useState(Z),b=F(),_=A(),{register:o,handleSubmit:I,formState:{errors:V}}=U(),x=async({email:a,password:s,name:v})=>{const p=await l(T({email:a,password:s,name:v,pic:d}));j(p),_(L(R(p))),b("/")},w=async a=>{const s=await l(B(a));y(s.data.url)};return f?e(O,{}):r(S,{autoComplete:"off",onSubmit:I(x),children:[e(k,{color:"#278048",children:"Registrarse"}),r(h,{children:[e(i,{href:"http://localhost:5000/api/user/login/google",children:e(n,{type:"icon1",width:"15rem",height:"1rem",alt:"google_icon",src:q})}),e(i,{href:"#",children:e(n,{type:"icon1",width:"15rem",height:"1rem",alt:"facebook_icon",src:z})}),e(i,{href:"#",children:e(n,{type:"icon1",width:"15rem",height:"1rem",alt:"twitter_icon",src:""})})]}),r(P,{htmlFor:"input",children:[e(N,{id:"input",type:"file",accept:".jpg,.jpeg,.png",onChange:a=>w(a.target.files[0])}),e(D,{src:d})]}),e(t,{placeholder:"Nombres",...o("name",{required:"Ingrese nombres"})}),e(t,{placeholder:"Correo electr\xF3nico",...o("email",{required:"Ingrese email",pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"Email invalido"}})}),e(t,{type:"password",placeholder:"Contrase\xF1a",...o("password",{required:"Ingrese contrase\xF1a"})}),e(t,{placeholder:"Confirmar contrase\xF1a"}),r(h,{children:[e(g,{display:"null",color:"#00CC4B",type:"submit",children:"Registrarse"}),e(g,{display:"none",onClick:u,color:"#4a4a4abd",type:"button",children:"Ingresar"})]})]})};export{K as default};
//# sourceMappingURL=Register.6496e9f3.js.map
