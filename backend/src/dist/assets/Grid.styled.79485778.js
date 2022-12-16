import{r,s as t}from"./index.141e8e9c.js";const h=()=>{const[e,i]=r.exports.useState(!1);let o;const s=async n=>{n.controller&&(o=n.controller),i(!0);let a={};try{a=await n.call}catch(l){throw i(!1),l}return i(!1),a},d=()=>{i(!1),o&&o.abort()};return r.exports.useEffect(()=>()=>{d()},[]),{loading:e,callEndpoint:s}},p=t.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,m=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.gap};
`,x=t.div`
  width: 100px;
  transition: all 0.6s;
  transition-delay: 0.15s;
  z-index: 30;
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${e=>e.theme.border_color};
  background-color: ${e=>e.theme.bg3};
  @media screen and (max-width: 800px) {
    display: none;
  }
`,g=t.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  position: fixed;
  z-index: 30;
  width: 100px;
  height: 100%;
  background-color: ${e=>e.theme.bg3};
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
  @media screen and (max-width: 800px) {
    display: none;
  }
`,b=t.div`
  margin: 0;
  padding: 0;
  width: ${e=>e.w};
  height: ${e=>e.h};
`;t.div`
  position: absolute;
  z-index: 32;
  color: white;
  margin: 8rem 8rem;
`;const f=t.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  position: fixed;
  z-index: 30;
  width: 100%;
  height: 75px;
  display: none;
  @media screen and (max-width: 800px) {
    background-color: ${e=>e.theme.bg3};
    display: block;
  }
  background-color: ${e=>e.theme.bg2};
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 20px;
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
`,u=t.a`
  border-radius: 20%;
  width: 2rem;
  height: 2rem;
  :hover {
    border: 2px solid #00cc4b;
    box-sizing: border-box;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`,y=t.img`
  height: auto;
  transition: all 0.6s;
  transition-delay: 0.15s;
  filter: invert(0.5);
  /* ${e=>e.theme.name=="dark"&&e.type=="icon1"?"filter: invert(0.8);":""} */
`,v=t.span`
  transition: color 0.6s;
  transition-delay: 0.15s;
  color: ${e=>e.theme.name=="dark"?"#eee":"#aaa"};
  font-size: ${e=>e.fontSize};
  z-index: 30;
`;t.div`
  font-size: 2.5rem;
  color: ${e=>e.color};
`;const w=t.label`
  margin: 0.1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  @media screen and (max-height: 470px) {
    display: none;
  }
`,$=t.img`
  z-index: 20;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    opacity: 50%;
  }
  @media screen and (max-width: 380px) {
    display: none;
  }
`,z=t.input`
  display: none;
`,k=t.div`
  display: flex;
  gap: 20px;

`;export{w as A,p as C,u as I,x as N,k as R,b as S,v as T,y as a,z as b,$ as c,m as d,g as e,f,h as u};
