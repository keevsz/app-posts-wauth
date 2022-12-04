import{d as a,e as p,r as c,s as t,f as g,a as f,F as x,j as s,t as r,h as m}from"./index.8bb4bc3e.js";function h(e=a){const o=e===a?p:()=>c.exports.useContext(e);return function(){const{store:n}=o();return n}}const b=h();function k(e=a){const o=e===a?b:h(e);return function(){return o().dispatch}}const y=k(),I=t.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,_=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.gap};
`,j=t.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  z-index: 30;
  position: absolute;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${e=>e.theme.border_color};
  background-color: ${e=>e.theme.bg2};
`,B=t.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  position: absolute;
  z-index: 30;
  width: 100px;
  height: 100%;
  background-color: ${e=>e.theme.bg2};
  img {
    width: 2.5rem;
    margin: auto;
  }
  ::after {
    content: '';
    top: 80px;
    left: 100px;
    position: absolute;
    height: calc(100% - 80px);
    border-right: 1px solid ${e=>e.theme.border_color};
    box-sizing: border-box;
    transition: all 1s;
  }
`,D=t.div`
  margin: 0;
  padding: 0;
  width: ${e=>e.w};
  height: ${e=>e.h};
`,A=t.div`
  position: absolute;
  z-index: 32;
  color: white;
  margin: 8rem 8rem;
`,v=t.div`
  height: 3rem;
  width: 3rem;
  position: absolute;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 1.5s ease;
  transition: 0.3s;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`,$=t.img`
  height: auto;
  ${e=>e.animation&&"animation: fadeIn 1.5s ease; @keyframes fadeIn {0%{opacity:0%;}100% {opacity: 100%;}}"}
`,w=t.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  z-index: 29;
  position: absolute;
  background-color: #fafafa;
  right: 1rem;
  top: 1rem;
  ${e=>e.animation&&`
  animation: expandAnimation 0.6s ${e.theme.name=="dark"?"reverse":""}; 
  transform-style: expandAnimation;  
  @keyframes expandAnimation {
    25% {      
      border-top-right-radius: 0%;      
      right: 0rem;      
      top: 0rem;    
      }    
    100% {      
      right: 0rem;      
      top: 0rem;     
       width: 208vh;      
       height: 100vh;      
       border-radius: 0%;    
       }  
    }`}
`,T="/assets/darkmode_icon.8c52ce43.png",C="/assets/lightmode_icon.67fce4fd.png",H=()=>{const e=y(),o=g(u=>u.theme),[i,n]=c.exports.useState(!1),[l,d]=c.exports.useState(!0);return f(x,{children:[s(v,{onClick:()=>{!l||(o.name==r.DarkTheme.name?e(m(r.LightTheme)):e(m(r.DarkTheme)),n(!0),d(!1),setTimeout(()=>{n(!1),d(!0)},650))},children:s($,{width:"30rem",height:"1rem",alt:"darkmode_icon",src:o.name!=="dark"?T:C,animation:i})}),s(w,{animation:i})]})},R=t.a`
  border-radius: 25%;
  width: 2rem;
  height: 2rem;
  :hover {
    background-color: #00cc4b;
    transition: all 0.3s;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`,N=t.img`
  height: auto;
  transition: all 0.6s;
  transition-delay: 0.15s;
  ${e=>e.theme.name=="dark"&&e.type=="icon1"?"filter: invert(0.8);":""}
`,F=t.span`
  transition: color 0.6s;
  transition-delay: 0.15s;
  color: ${e=>e.theme.name=="dark"?"#eee":"black"};
  font-size: ${e=>e.fontSize};
`;t.div`
  font-size: 2.5rem;
  color: ${e=>e.color};
`;export{H as B,I as C,R as I,j as N,D as S,F as T,N as a,B as b,_ as c,A as d,y as u};
//# sourceMappingURL=Usual.194722c9.js.map
