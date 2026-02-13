import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DYrVU9rO.js";import{m as i}from"./proxy.B_ePyGTi.js";import{c}from"./createLucideIcon.DYItjaKc.js";import{B as b}from"./book-open.3d5ud9-V.js";import{M as x}from"./mail.i0ByhruB.js";import{u as m,b as p,a as f}from"./use-spring.wIaRa8Xl.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],y=c("code",g);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],v=c("house",w);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],j=c("user",k),M=({item:t,isActive:a})=>{const s=m(1/0),o=l.useRef(null),d=p(s,n=>{const r=o.current?.getBoundingClientRect();return r?n-(r.x+r.width/2):0}),u=p(d,[-150,0,150],[48,80,48]),h=f(u,{mass:.1,stiffness:150,damping:12});return e.jsxs(i.a,{ref:o,href:t.path,onMouseMove:n=>s.set(n.pageX),onMouseLeave:()=>s.set(1/0),style:{width:h},className:`relative flex items-center justify-center aspect-square rounded-full transition-all duration-300 group
        ${a?`shadow-2xl shadow-blue-500/20 ${t.color}`:"bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"}
      `,"aria-label":t.label,children:[e.jsx(t.icon,{size:22,className:a?"text-white":"text-current"}),e.jsx("span",{className:"absolute -top-12 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-lg text-slate-900 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap",children:t.label}),a&&e.jsx(i.div,{layoutId:"active-nav-dot",className:"absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full",transition:{type:"spring",stiffness:300,damping:30}})]})},C=()=>{const[t,a]=l.useState("/");l.useEffect(()=>{a(window.location.pathname)},[]);const s=[{path:"/",icon:v,color:"bg-slate-900 text-white",label:"Home"},{path:"/about",icon:j,color:"bg-blue-600 text-white",label:"About"},{path:"/projects",icon:y,color:"bg-indigo-600 text-white",label:"Work"},{path:"/blog",icon:b,color:"bg-violet-600 text-white",label:"Logs"},{path:"/contact",icon:x,color:"bg-pink-600 text-white",label:"Connect"}];return e.jsx("div",{className:"fixed bottom-8 left-1/2 -translate-x-1/2 z-50",children:e.jsx(i.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},className:"flex items-center gap-4 px-6 py-4 rounded-full bg-white/80 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",children:s.map(o=>e.jsx(M,{item:o,isActive:t===o.path},o.path))})})};export{C as default};
