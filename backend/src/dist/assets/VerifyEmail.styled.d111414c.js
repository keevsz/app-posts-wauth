import{s as r}from"./index.150851d7.js";const i=r.div`
  text-align: center;
  height: auto;
  background-color: ${e=>e.theme.bg3};
  padding: 5rem;
  border-radius: 0.5rem;
  z-index: 20;
  transition: all 0.6s;
  transition-delay: 0.15s;
  border: 1px solid;
  border-color: ${e=>e.theme.border_color};
  animation: fadeIn ${e=>e.theme.name=="dark"?"1s":"0.4s"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 800px) {
    display: block;
    padding: 0rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0;
  }
  @media screen and (max-width: 400px) {
    display: block;
    padding: 0rem;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0;
  }
`,a=r.img`
  margin: auto;
  width: 20%;
`,d=r.button`
  margin: auto;
  border: 0.1rem solid white;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.4rem;
  cursor: pointer;
  ${e=>e.disabled?"cursor:not-allowed; ":":hover {background-color: #278048;}"}

  color: white;
  background-color: ${e=>e.disabled?"#278048":"#00CC4B"};
`;export{i as B,a as I,d as a};
