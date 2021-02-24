(this.webpackJsonpcovid19dashboard=this.webpackJsonpcovid19dashboard||[]).push([[0],{128:function(e,t,a){},226:function(e,t,a){},228:function(e,t,a){},230:function(e,t,a){},364:function(e,t,a){},367:function(e,t,a){},368:function(e,t,a){},370:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a(0),r=a.n(c),o=a(35),s=a.n(o),i=(a(226),a(15)),d=(a(227),a(228),a(211)),j=a(20),l=a(379),u=a(103),b=a(191);function h(){var e=Object(b.a)(["\n  body {\n    background: ",";\n    color: ",";\n  }\n  "]);return h=function(){return e},e}var O=Object(u.b)(h(),(function(e){return e.theme.body}),(function(e){return e.theme.text})),m={body:"#FFF",text:"#101010",toggleBorder:"#FFF",backround:"#363537"},f={body:"#121212",text:"#FAFAFA",toggleBorder:"#6B8096",backround:"#363537"},v=a(385),x=a(377),g=(a(128),a(383)),p=a(372),y=a(123),k=a(110),F=a(111),w=a(87),C=a(124),S=a(206),N=(a(230),{cases:"#FF0000",deaths:"#FFAD05",recovered:"#62FF00"});var I=function(e){var t=e.data;return Object(n.jsx)("div",{className:"chart-container",children:Object(n.jsx)(g.a,{width:"100%",height:500,children:Object(n.jsxs)(p.a,{margin:{left:25,right:4},children:[Object(n.jsx)(y.a,{formatter:function(e){return new Intl.NumberFormat("it").format(e)}}),Object(n.jsx)(k.a,{dataKey:"date",allowDuplicatedCategory:!1}),Object(n.jsx)(F.a,{type:"number",dataKey:"number",tickFormatter:function(e){return new Intl.NumberFormat("it").format(e)}}),Object(n.jsx)(w.a,{}),Object(n.jsx)(C.a,{dataKey:"date",stroke:"dark"===e.theme?f.text:"",fill:"dark"===e.theme?f.backround:"#fff"}),t.map((function(e){return Object(n.jsx)(S.a,{type:"monotone",dataKey:"number",data:e.data,name:e.name,dot:!1,stroke:N[e.name]},e.name)}))]})})})},K=a(384),B=function(){return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)(K.a,{variant:"light",children:[Object(n.jsx)(K.a.Heading,{children:"I'm loading the data"}),Object(n.jsx)("p",{children:"Please be patient..."})]})})},E=B;function A(e){var t=e.opts,a=Object(c.useState)(e.country),r=Object(i.a)(a,2),o=r[0],s=r[1],d=Object(c.useState)(!1),j=Object(i.a)(d,2),l=j[0],u=j[1],b=Object(c.useState)(void 0),h=Object(i.a)(b,2),O=h[0],m=h[1];return Object(c.useEffect)((function(){e.country!==o&&(s(e.country),u(!1)),l||function(e){e&&fetch("".concat("https://disease.sh","/v3/covid-19/historical/").concat(e,"?lastdays=").concat("all"),{headers:{accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){if(e.timeline&&e.timeline.cases&&e.timeline.deaths&&e.timeline.recovered){for(var t=[],a=0,n=Object.entries(e.timeline);a<n.length;a++){for(var c=Object(i.a)(n[a],2),r=c[0],o=c[1],s={name:r,data:[]},d=0,j=Object.entries(o);d<j.length;d++){var l=Object(i.a)(j[d],2),b=l[0],h=l[1];s.data.push({date:b,number:h})}t.push(s)}u(!0),m(t)}else console.error("Bad format response.")}),(function(e){console.error(e)}))}(e.country)}),[l,o,e.country]),l&&O?Object(n.jsx)("div",{className:"mt-3",children:Object(n.jsx)(I,{data:O.filter((function(e,a){return function(e,a){var n;switch(a){case 0:n=t.cases;break;case 1:n=t.deaths;break;case 2:n=t.recovered}if(n)return e}(e,a)}))})}):Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(B,{})})}var D=r.a.memo(A),L=a(21),T=a(376),P=a(214);a(364);var z=function(e){var t=e.countryData,a=e.toPrint;return Object(n.jsx)("div",{className:"chart-container",children:Object(n.jsx)(g.a,{width:"100%",height:500,children:Object(n.jsxs)(T.a,{margin:{left:25,right:4},data:t,children:[Object(n.jsx)(y.a,{formatter:function(e){return new Intl.NumberFormat("it").format(e)}}),Object(n.jsx)(k.a,{dataKey:"date"}),Object(n.jsx)(F.a,{type:"number",tickFormatter:function(e){return new Intl.NumberFormat("it").format(e)}}),Object(n.jsx)(w.a,{}),Object(n.jsx)(C.a,{dataKey:"date",stroke:"dark"===e.theme?f.text:"",fill:"dark"===e.theme?f.backround:"#fff"}),a.map((function(e){return Object(n.jsx)(P.a,{dataKey:e,name:e,fill:N[e]},e)}))]})})})};function G(e){var t=e.opts,a=Object(c.useState)(e.country),r=Object(i.a)(a,2),o=r[0],s=r[1],d=Object(c.useState)(!1),j=Object(i.a)(d,2),l=j[0],u=j[1],b=Object(c.useState)(void 0),h=Object(i.a)(b,2),O=h[0],m=h[1];return Object(c.useEffect)((function(){e.country!==o&&(s(e.country),u(!1)),l||function(e){e&&fetch("".concat("https://disease.sh","/v3/covid-19/historical/").concat(e,"?lastdays=").concat("all"),{headers:{accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){if(e.timeline&&e.timeline.cases&&e.timeline.deaths&&e.timeline.recovered){for(var t=[],a=0,n=Object.entries(e.timeline);a<n.length;a++){for(var c=Object(i.a)(n[a],2),r=c[0],o=c[1],s={name:r,data:[]},d=0,j=Object.entries(o);d<j.length;d++){var l=Object(i.a)(j[d],2),b=l[0],h=l[1];s.data.push({date:b,number:h})}t.push(s)}t.forEach((function(e){var t,a=0,n=0,c=Object(L.a)(e.data);try{for(c.s();!(t=c.n()).done;){var r=t.value;n=r.number,r.number=r.number-a>0?r.number-a:0,a=n}}catch(o){c.e(o)}finally{c.f()}}));for(var O=t[0].data,f=t[1].data,v=t[2].data,x=[],g=0;g<O.length&&v.length&&f.length;g++){var p={date:O[g].date};p.cases=O[g].number,p.recovered=v[g].number,p.deaths=f[g].number,x.push(p)}t=x,u(!0),m(t)}else console.error("Bad format response.")}),(function(e){console.error(e)}))}(e.country)}),[l,o,e.country]),l&&O?Object(n.jsx)("div",{className:"mt-3",children:Object(n.jsx)(z,{theme:e.theme,countryData:O,toPrint:function(e){var t=[];for(var a in e)e[a]&&t.push(a);return t}(t)})}):Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(B,{})})}var J=r.a.memo(G),M=a(380),R=a(210),H=a(58),U=function(e){var t=Object(c.useState)(e.opts),a=Object(i.a)(t,2),r=a[0],o=a[1],s=function(t){e.changeOpts(t),o(t)};return Object(n.jsx)(M.a,{inline:!0,children:Object(n.jsx)(M.a.Group,{controlId:"chartsOptions",children:Object(n.jsxs)(M.a.Row,{children:[Object(n.jsx)(M.a.Check,{custom:!0,type:"switch",label:"cases",id:"casesOpt",className:"mr-2",defaultChecked:r.cases,value:r.cases,onChange:function(){return s(Object(H.a)(Object(H.a)({},r),{},{cases:!r.cases}))}}),Object(n.jsx)(M.a.Check,{custom:!0,type:"switch",label:"deaths",id:"deathsOpt",className:"mr-2",defaultChecked:r.deaths,value:r.deaths,onChange:function(){return s(Object(H.a)(Object(H.a)({},r),{},{deaths:!r.deaths}))}}),Object(n.jsx)(M.a.Check,{custom:!0,type:"switch",label:"recovered",id:"recoveredOpt",defaultChecked:r.recovered,value:r.recovered,onChange:function(){return s(Object(H.a)(Object(H.a)({},r),{},{recovered:!r.recovered}))}})]})})})},V="Italy";var q=function(e){var t,a=Object(c.useState)(!1),r=Object(i.a)(a,2),o=r[0],s=r[1],d=Object(c.useState)([]),j=Object(i.a)(d,2),l=j[0],u=j[1],b=Object(c.useState)(V),h=Object(i.a)(b,2),O=h[0],g=h[1],p=Object(c.useState)({cases:!0,deaths:!0,recovered:!1}),y=Object(i.a)(p,2),k=y[0],F=y[1],w="mt-3 ",C="";return"dark"===e.theme&&(w+="dark-tabs",C+="dark-tab "),Object(c.useEffect)((function(){var e;o||(e="cases",s(!0),fetch("".concat("https://disease.sh","/v3/covid-19/countries").concat(e&&"?sort="+e),{headers:{accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t={countries:[]};e.forEach((function(e){t.countries.push(e.country)})),u(t)}),(function(e){console.error(e)})))}),[o]),l&&O?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("style",{type:"text/css",children:"\n            .dark-tabs {\n              background-color: ".concat(f.backround,";\n              color: ").concat(f.text,";\n              border-radius: .25rem;\n              border-color: gray;\n            }\n  \n            .dark-tab {\n              border-radius: .25rem;\n            }\n            .dark-tab, .nav-link.active {\n              color: ").concat(f.text,";\n              \n            }\n  \n            a {\n              color: ").concat("dark"===e.theme?f.text:m.text,"\n            }\n            a:hover {\n              color: ").concat("dark"===e.theme?f.text:m.text,"\n            }\n  \n            .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {\n              border-radius: 0.25rem;\n            }\n            ")}),Object(n.jsxs)("div",{className:"flex-container",children:[Object(n.jsx)(M.a,{className:"mt-3",children:Object(n.jsxs)(M.a.Group,{as:M.a.Row,controlId:"country",children:[Object(n.jsx)(M.a.Label,{column:!0,sm:4,children:"Selected Country"}),Object(n.jsx)(R.a,{sm:6,children:Object(n.jsx)(M.a.Control,{as:"select",custom:!0,value:O,defaultValue:V,onChange:function(e){g(e.target.value)},style:"light"===e.theme?{}:{backgroundColor:f.backround,color:f.text,borderColor:"gray"},children:null===l||void 0===l||null===(t=l.countries)||void 0===t?void 0:t.map((function(e){return Object(n.jsx)("option",{value:e,children:e},e)}))})})]})}),Object(n.jsx)(U,{opts:k,changeOpts:F})]}),Object(n.jsxs)(v.a,{defaultActiveKey:"cumulative",id:"dash-tabs",className:w,children:[Object(n.jsx)(x.a,{eventKey:"cumulative",title:"Cumulative",className:C,mountOnEnter:!0,children:Object(n.jsx)(D,{theme:e.theme,country:O,opts:k})}),Object(n.jsx)(x.a,{eventKey:"daily",title:"Daily",className:C,mountOnEnter:!0,children:Object(n.jsx)(J,{theme:e.theme,country:O,opts:k})})]})]}):Object(n.jsx)(E,{})},Q=(a(367),function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{children:"About"}),Object(n.jsx)("h2",{children:"Covid-19 Dashboard"}),Object(n.jsx)("p",{children:"See the current Covid-19 situation."}),Object(n.jsx)("h3",{children:"whoami"}),Object(n.jsxs)("p",{children:["My name is ",Object(n.jsx)("a",{href:"https://lorenzofelletti.github.io",children:"Lorenzo Felletti"})," and I'm a computer engineering student ad the University of Bologna."]}),Object(n.jsxs)("p",{children:["Source code ",Object(n.jsx)("a",{href:"https://github.com/lorenzofelletti/covid19dashboard",children:"here"}),"."]})]})}),W=a(382),X=a(213),Y=a(378),Z=(a(368),function(e){var t=e.basename,a=e.theme,c=e.toggleTheme;return Object(n.jsxs)(W.a,{id:"navigation-bar",collapseOnSelect:!0,expand:"lg",bg:a,variant:a,children:[Object(n.jsx)(W.a.Brand,{href:"".concat(t),children:Object(n.jsx)("img",{src:"".concat(t,"/logo.gif"),width:"120",height:"40",className:"d-inline-block align-top",alt:"covid19dashboard"})}),Object(n.jsx)(W.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(n.jsxs)(W.a.Collapse,{id:"responsive-navbar-nav",children:[Object(n.jsxs)(X.a,{className:"mr-auto",children:[Object(n.jsx)(X.a.Link,{href:"".concat(t),children:"Dashboard"}),Object(n.jsx)(X.a.Link,{href:"".concat(t,"/#/about"),children:"About"})]}),Object(n.jsx)(M.a,{inline:!0,children:Object(n.jsx)(Y.a,{variant:"light"===a?"dark":"light",onClick:c,children:"Switch Theme"})})]})]})}),$="/covid19dashboard";var _=function(){var e=function(){var e=Object(c.useState)("light"),t=Object(i.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(!1),o=Object(i.a)(r,2),s=o[0],d=o[1],j=function(e){window.localStorage.setItem("theme",e),n(e)};return Object(c.useEffect)((function(){var e=window.localStorage.getItem("theme");e?n(e):j("light"),d(!0)}),[]),[a,function(){j("light"===a?"dark":"light")},s]}(),t=Object(i.a)(e,3),a=t[0],r=t[1];return t[2]?Object(n.jsx)(u.a,{theme:"light"===a?m:f,children:Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(O,{}),Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)(d.a,{basename:$,children:[Object(n.jsx)(Z,{basename:$,theme:a,toggleTheme:r}),Object(n.jsx)(l.a,{children:Object(n.jsxs)(j.c,{children:[Object(n.jsx)(j.a,{exact:!0,path:"/",children:Object(n.jsx)(q,{theme:a})}),Object(n.jsx)(j.a,{path:"/about",children:Object(n.jsx)(Q,{theme:a})})]})})]})})]})}):Object(n.jsx)("div",{})},ee=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,386)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),r(e),o(e)}))};s.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(_,{})}),document.getElementById("root")),ee()}},[[370,1,2]]]);
//# sourceMappingURL=main.9334f465.chunk.js.map