import{u as f,b,a as e,j as s,E as S,L as F,q as I,x as T,d as v,e as y,k as A}from"./index.09fec51b.js";import"./ButtonTheme.22128c4f.js";import C from"./Loading.d4b2689f.js";import{u as R,T as w,R as E}from"./Grid.styled.19ecda45.js";import{I as L,s as P}from"./AuthPage.2fe58404.js";import{u as j}from"./index.esm.a92814c6.js";import{F as B,T as k,b as t,c as o,d as i,a as n}from"./AuthForm.styled.3ee66b68.js";import"./Loading.styled.7848717a.js";const W=()=>{const{loading:l,callEndpoint:c}=R(),d=f(),m=b(),{register:r,handleSubmit:p,formState:{errors:a}}=j(),u=async({email:g,password:h})=>{const x=await c(T({email:g,password:h}));m(v(y(x))),d(A.APP,{replace:!0})};return l?e(C,{}):s(B,{autoComplete:"off",onSubmit:p(u),children:[e(k,{children:"Ingresar"}),e(L,{}),s(t,{children:[e(o,{placeholder:"Correo electr\xF3nico",...r("email",{required:"Ingrese email",pattern:{value:S,message:"Email invalido"}})}),a.email&&e(i,{text:a.email.message,children:"\u26A0"})]}),s(t,{children:[e(o,{type:"password",placeholder:"Contrase\xF1a",...r("password",{required:"Ingrese contrase\xF1a"})}),a.password&&e(i,{text:a.password.message,children:"\u26A0"})]}),e(F,{to:I.CHANGE_PASSWORD,style:{textDecoration:"none",marginTop:"30px"},children:e(w,{fontSize:"15px",children:"\xBFOlvidaste tu contrase\xF1a?"})}),s(E,{children:[e(n,{display:"",color:"#00CC4B",type:"submit",children:"Ingresar"}),e(n,{display:"none",onClick:()=>{P.setSubject(!1)},color:"#4a4a4abd",type:"button",children:"Registrarse"})]})]})};export{W as default};
