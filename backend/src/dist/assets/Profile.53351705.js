import m from"./Loading.6a0b0666.js";import{a as h}from"./users.services.d5f9b55f.js";import{s as p,r as n,g as x,m as g,a as e,j as i}from"./index.150851d7.js";import{R as a,c as f,d as u,T as o,S as w,C as b}from"./Grid.styled.7d95e690.js";import{P,a as S}from"./Private.57d9ba7a.js";import"./Loading.styled.0dd12156.js";import"./AuthForm.styled.2afa6655.js";import"./index.esm.a740ed21.js";const y=p.div`
  z-index: 20;
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  background-color: ${r=>r.theme.bg3};
  border-radius: 5px;
  width: 650px;
  height: 170px;
  position: absolute;
  @media screen and (max-width: 800px) {
    width: 90%;
    padding-left: 0px;
  }
`,v=p.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  padding-top: 120px;
  width: 650px;
  padding-left: 100px;
  margin: auto;
  @media screen and (max-width: 800px) {
    padding-top: 100px;
    width: 90%;
    padding-left: 0px;
  }
`,B=()=>{const[r,d]=n.exports.useState({}),c=x(s=>s.user),t=g(),l=async()=>{const s=await h(t.id);d(s.data)};return n.exports.useEffect(()=>{if(t.id){l();return}d(c)},[t.id]),e(P,{children:r.id?i(v,{children:[i(y,{children:[i(a,{style:{padding:"1.5rem"},children:[e(f,{style:{width:"120px",height:"120px"},src:r.pic}),i(u,{gap:"1rem",style:{padding:"2.2rem"},children:[e(a,{children:e(o,{fontSize:"1rem",children:r.email})}),e(a,{children:e(o,{fontSize:"1rem",children:r.name})})]})]}),e("br",{}),e("br",{}),i(o,{fontSize:"1rem",children:["Publicaciones ",e("hr",{})]})]}),e(w,{h:"17rem",w:""}),e(S,{})]}):e(b,{children:e(m,{})})})};export{B as default};
