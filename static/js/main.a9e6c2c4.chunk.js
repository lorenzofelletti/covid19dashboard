(this.webpackJsonpcovid19dashboard=this.webpackJsonpcovid19dashboard||[]).push([[0],{205:function(e,t,n){},207:function(e,t,n){},388:function(e,t,n){},390:function(e,t,n){},391:function(e,t,n){},394:function(e,t,n){"use strict";n.r(t);var a=n(7),c=n(1),s=n.n(c),i=n(24),r=n.n(i),o=(n(205),n(206),n(207),n(168)),j=n(11),d=n(397),b=n(170),l=n(29),h=n(401),u=n(398),O=n(167),x=n(28),m=(n(388),"https://disease.sh"),f="Italy",v={cases:"#FF0000",deaths:"#252525",recovered:"#62FF00"};var p=function(e){var t=Object(c.useState)(null),n=Object(l.a)(t,2),s=n[0],i=n[1],r=Object(c.useState)(!1),o=Object(l.a)(r,2),j=o[0],d=o[1],p=Object(c.useState)({}),g=Object(l.a)(p,2),y=g[0],F=g[1],C=Object(c.useState)(f),S=Object(l.a)(C,2),k=S[0],w=S[1],I=Object(c.useState)(void 0),L=Object(l.a)(I,2),B=L[0],D=L[1];function A(e){fetch("".concat(m,"/v3/covid-19/historical/").concat(e,"?lastdays=30"),{headers:{accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){if(e.timeline&&e.timeline.cases&&e.timeline.deaths&&e.timeline.recovered){for(var t=[],n=0,a=Object.entries(e.timeline);n<a.length;n++){for(var c=Object(l.a)(a[n],2),s=c[0],r=c[1],o={name:s,data:[]},j=0,d=Object.entries(r);j<d.length;j++){var b=Object(l.a)(d[j],2),h=b[0],u=b[1];o.data.push({date:h,number:u})}t.push(o)}D(t)}else i("Bad format response.")}),(function(e){i(e)}))}return Object(c.useEffect)((function(){j||fetch("".concat(m,"/v3/covid-19/historical?lastdays=1"),{headers:{accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t={countries:[]};e.forEach((function(e){t.countries.push(e.country)})),t.countries=Object(b.a)(new Set(t.countries)),d(!0),i(s),F(t),w(t[0]),A(t[0])}),(function(e){d(!0),i(e)}))}),[]),j&&B?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(u.a,{className:"mt-3",children:Object(a.jsxs)(u.a.Group,{as:u.a.Row,controlId:"country",children:[Object(a.jsx)(u.a.Label,{column:!0,sm:4,children:"Selected Country"}),Object(a.jsx)(O.a,{sm:6,children:Object(a.jsx)(u.a.Control,{as:"select",custom:!0,value:k,defaultValue:f,onChange:function(e){e.target.value&&(w(e.target.value),A(e.target.value))},children:y&&y.countries&&y.countries.map((function(e,t){return Object(a.jsx)("option",{value:e,children:e})}))})})]})}),Object(a.jsx)(x.d,{width:"100%",height:500,children:Object(a.jsxs)(x.c,{children:[Object(a.jsx)(x.e,{}),Object(a.jsx)(x.f,{dataKey:"date",allowDuplicatedCategory:!1}),Object(a.jsx)(x.g,{type:"number",dataKey:"number"}),Object(a.jsx)(x.a,{}),B&&B.map((function(e){return Object(a.jsx)(x.b,{type:"monotone",dataKey:"number",data:e.data,name:e.name,stroke:v[e.name]},e.name)}))]})})]}):(k&&A(k),Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)(h.a,{variant:"light",children:[Object(a.jsx)(h.a.Heading,{children:"I'm loading the data"}),Object(a.jsx)("p",{children:"Please be patient..."})]})}))},g=(n(390),function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h1",{children:"About"}),Object(a.jsx)("h2",{children:"Covid 19 Dashboard"}),Object(a.jsx)("p",{children:"See the current Covid 19 situation."}),Object(a.jsx)("h3",{children:"Whoami"}),Object(a.jsx)("p",{children:"My name is Lorenzo Felletti and I'm a computer engineering student ad the University of Bologna."})]})}),y=n(400),F=n(399);n(391);var C=function(e){return Object(a.jsxs)(y.a,{id:"navigation-bar",collapseOnSelect:!0,sticky:"top",expand:"lg",bg:"light",variant:"light",children:[Object(a.jsx)(y.a.Brand,{href:"".concat(e.basename),children:"Covid19Dashboard"}),Object(a.jsx)(y.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(a.jsx)(y.a.Collapse,{id:"responsive-navbar-nav",children:Object(a.jsxs)(F.a,{className:"mr-auto",children:[Object(a.jsx)(F.a.Link,{href:"".concat(e.basename),children:"Dashboard"}),Object(a.jsx)(F.a.Link,{href:"".concat(e.basename,"/#/about"),children:"About"})]})})]})},S="/covid19dashboard";var k=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)(o.a,{basename:S,children:[Object(a.jsx)(C,{basename:S}),Object(a.jsx)(d.a,{children:Object(a.jsxs)(j.c,{children:[Object(a.jsx)(j.a,{exact:!0,path:"/",children:Object(a.jsx)(p,{})}),Object(a.jsx)(j.a,{epath:"/about",children:Object(a.jsx)(g,{})})]})})]})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,402)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)}))};r.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(k,{})}),document.getElementById("root")),w()}},[[394,1,2]]]);
//# sourceMappingURL=main.a9e6c2c4.chunk.js.map