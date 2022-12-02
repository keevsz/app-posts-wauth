import{s as t,e as h,u as l,r as p,b as g,F as u,j as i,t as o,f as a}from"./index.1d9ee3fc.js";const A=t.a`
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid #00cc4b;
  :hover {
    background-color: #00cc4b;
    transition: all 0.3s;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`,s=t.img`
  display: block;
  max-width: 100%;
  height: auto;
  transition: all 0.6s;
  transition-delay: 0.15s;
  ${e=>e.theme.name=="dark"&&e.type=="icon1"?"filter: invert(0.8);":""}
`,$=t.span`
  transition: color 0.6s;
  transition-delay: 0.15s;
  color: ${e=>e.theme.name=="dark"?"#eee":"black"};
  font-size: ${e=>e.fontSize};
`;t.div`
  font-size: 2.5rem;
  color: ${e=>e.color};
`;const b=t.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  z-index: 29;
  position: absolute;
  background-color: #FAFAFA;
  right: 1rem;
  top: 1rem;
  animation: expandAnimation 0.6s none;
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
  }
`,x=t.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  z-index: 29;
  position: absolute;
  background-color: #FAFAFA;
  right: 1rem;
  top: 1rem;
  animation: expandAnimation 0.6s reverse;
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
  }
`,z=t.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,T=t.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 330px) {
    flex-direction: column;
  }
`,F=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.gap};
`,I=t.div`
    transition: all 0.6s;
    transition-delay: 0.15s;
    z-index: 30;
    position: absolute;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid ${e=>e.theme.border_color};
    background-color:${e=>e.theme.bg2};
`,_=t.div`
    transition: all 0.6s;
    transition-delay: 0.15s;
    position: absolute;
    z-index: 30;
    width: 100px;
    height: 100%;
    background-color:${e=>e.theme.bg2};
    img{
      width:2.5rem;
      margin:auto;
    }
    ::after{
      content: '';
      top:80px;
      left:100px;
      position: absolute;
      height:calc(100% - 80px);
      border-right: 1px solid ${e=>e.theme.border_color};;
      box-sizing: border-box;
      transition: all 1s;
    }
`,j=t.div`
  margin:0;
  padding:0;
  width: ${e=>e.w};
  height: ${e=>e.h};
`,B=t.div`
  position:absolute;
  z-index:32;
  color:white;
  margin:8rem 8rem;
`,f=t.div`
  height: 3rem;
  width: 3rem;
  position: absolute;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn ${e=>e.theme.name=="dark"?"1.6s":"0.5s"};
  @keyframes fadeIn {
    0% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
    }
  }
`,y=t.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  position: absolute;
  background-color: #eee;
  right: 1rem;
  top: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 1s ease;
  @keyframes fadeIn {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`,k="/assets/darkmode_icon.8c52ce43.png",v="/assets/lightmode_icon.67fce4fd.png",C=()=>{const e=h(c=>c.theme),r=l(),[d,m]=p.exports.useState(!1),n=()=>{e.name==o.DarkTheme.name?r(a(o.LightTheme)):r(a(o.DarkTheme)),m(!0)};return g(u,{children:[e.name!=="dark"?i(f,{onClick:n,children:i(s,{type:"icon2",width:"30rem",height:"1rem",loading:"eager",alt:"darkmode_icon",src:k})}):i(y,{onClick:n,children:i(s,{type:"icon2",width:"30rem",height:"1rem",loading:"eager",alt:"lightmode_icon",src:v})}),d&&(e.name!=="dark"?i(b,{}):i(x,{}))]})};export{C as B,z as C,s as I,I as N,T as R,j as S,$ as T,_ as a,F as b,B as c,A as d};
//# sourceMappingURL=ButtonTheme.d6549f3e.js.map
