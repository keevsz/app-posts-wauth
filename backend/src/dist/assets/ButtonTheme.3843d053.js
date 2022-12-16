import{s as n,b as d,g as h,r as c,j as g,F as p,a as i,t as a,h as s}from"./index.150851d7.js";const l=n.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 1.5s ease;
  transition: 0.3s;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`,u=n.img`
  filter: invert(0.5);
  height: auto;
  ${e=>e.animation&&"animation: fadeIn 1.5s ease; @keyframes fadeIn {0%{opacity:0%;}100% {opacity: 100%;}}"}
`,f=n.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 10;
  position: fixed;
  background-color: #eeeeee;
  right: 0.5rem;
  top: 0.5rem;
  ${e=>e.animation&&`
  animation: expandAnimation 0.6s ${e.theme.name=="dark"?"reverse":""}; 
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
       height: 100%;      
       border-radius: 0%;    
       }  
    }`}
`,k="/assets/darkmode_icon.8c52ce43.png",x="/assets/lightmode_icon.67fce4fd.png",b=()=>{const e=d(),r=h(m=>m.theme),[t,o]=c.exports.useState(!1);return g(p,{children:[i(l,{onClick:()=>{t||(r.name==a.DarkTheme.name?e(s(a.LightTheme)):e(s(a.DarkTheme)),o(!0),setTimeout(()=>{o(!1)},650))},children:i(u,{width:"45rem",height:"1rem",alt:"darkmode_icon",src:r.name!=="dark"?k:x,animation:t})}),i(f,{animation:t})]})};export{b as B};
