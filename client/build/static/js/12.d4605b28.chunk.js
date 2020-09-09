(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[12],{343:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"a",(function(){return o}));var n=t(12),r=t(27),l=t(21),c=t.n(l),s=function(e){return function(a){return a({type:n.l}),c.a.put("/consults/".concat(e._id),e).then((function(e){a({type:n.m,payload:e.data}),r.toastr.success("Consulta atualizada com sucesso"),a(o())})).catch((function(e){a({type:n.k,payload:e.response.data}),r.toastr.error(e.response.data.message)}))}},o=function(e){return function(a){return a({type:n.i}),c.a.get("/consults",{params:e}).then((function(e){a({type:n.j,payload:e.data})})).catch((function(e){a({type:n.h,payload:e.response.data}),r.toastr.error(e.response.data.message)}))}}},344:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return o})),t.d(a,"a",(function(){return u}));var n=t(12),r=t(27),l=t(21),c=t.n(l),s=function(e){return function(a){return a({type:n.r}),c.a.post("/procedures",e).then((function(e){a({type:n.s,payload:e.data}),r.toastr.success("Procedimento salvo com sucesso"),a(u())})).catch((function(e){a({type:n.q,payload:e.response.data}),r.toastr.error(e.response.data.message)}))}},o=function(e,a){return function(t){return t({type:n.r}),c.a.put("/procedures/".concat(a),e).then((function(e){t({type:n.s,payload:e.data}),r.toastr.success("Procedimento atualizado com sucesso"),t(u())})).catch((function(e){t({type:n.q,payload:e.response.data}),r.toastr.error(e.response.data.message)}))}},u=function(){return function(e){return e({type:n.o}),c.a.get("/procedures").then((function(a){e({type:n.p,payload:a.data})})).catch((function(a){e({type:n.n,payload:a.response.data})}))}}},356:function(e,a,t){"use strict";var n=t(41),r=t(1),l=t.n(r),c=t(345),s=t(419),o=t(339),u=t(331),i=t(193),m=t(343),d=t(138),p=t.n(d),E=t(351),b=t(43),f=t(24),v=t(157),h=t.n(v),y=t(25),g=t(42),O=t.n(g),j=t(68),C=t(27),D=t(346),Y=t.n(D),H=t(335),x=t(333),T=t(197),M=t(158),w=t(84),F=t(85),_=t(29),k=t(344),N=t(21),S=t.n(N),z=t(289);t(204);h.a.extend(Y.a);var I=function(e){var a=e.initial,t=Object(r.useState)(!1),c=Object(n.a)(t,2),s=c[0],d=c[1],p=Object(f.useSelector)((function(e){return e.client})).clients,E=Object(f.useSelector)((function(e){return e.procedure})).procedures,v=Object(f.useDispatch)(),y=Object(r.useRef)(null);Object(r.useEffect)((function(){v(Object(M.a)()),v(Object(k.a)())}),[v]);var g=function(){var e=Object(j.a)(O.a.mark((function e(a){var t,n,r,l,c,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=_.b().shape({date:_.d().required("Informe a data da consulta"),client:_.d().ensure().required("Informe o cliente"),procedures:_.d().ensure().required("Informe os procedimentos"),type_consult:_.d().ensure().required("Informe o tipo de consulta")}),e.next=4,t.validate(a,{abortEarly:!1});case 4:return n={_id:a._id,date:h()(a.date).format("YYYY-MM-DDTHH:mm:ss.sssZ"),client:a.client.value,procedures:a.procedures.map((function(e){return e.value})),type_consult:a.type_consult,observations:a.observations,status:a.status},e.prev=5,e.next=8,S.a.put("/consults/".concat(n._id),n);case 8:r=e.sent,console.log(r),200===r.status&&(v(Object(m.a)()),C.toastr.success("Consulta atualizada com sucesso"),y.current.setErrors({}),y.current.reset(),d(!1)),e.next=19;break;case 13:e.prev=13,e.t0=e.catch(5),l=e.t0.response.data,(c={})[l.path]=l.message,y.current.setErrors(c);case 19:e.next=24;break;case 21:e.prev=21,e.t1=e.catch(0),e.t1 instanceof _.a&&(s={},e.t1.inner.forEach((function(e){s[e.path]=e.message,y.current.setErrors(s)})));case 24:case"end":return e.stop()}}),e,null,[[0,21],[5,13]])})));return function(a){return e.apply(this,arguments)}}();return l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a,{placement:"bottom",overlay:l.a.createElement(u.a,{id:"edit"}," Editar consulta")},l.a.createElement("button",{className:"btn btn-link",onClick:function(){return d(!0)}},l.a.createElement(b.b,{size:20}))),l.a.createElement(H.a,{size:"lg",show:s,onHide:function(){return d(!1)}},l.a.createElement(H.a.Header,{closeButton:!0},l.a.createElement(H.a.Title,null,"Editar consulta")),l.a.createElement(H.a.Body,null,l.a.createElement(w.a,{ref:y,initialData:{_id:a._id,date:Object(z.default)(a.date),client:{value:a.client._id,label:a.client.name},procedures:a.procedures.map((function(e){return{value:e._id,label:e.name}})),type_consult:a.type_consult,status:a.status,observations:a.observations},onSubmit:g},l.a.createElement(F.e,{type:"hidden",name:"_id"}),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:6},l.a.createElement(F.b,{placeholderText:"Data/hora",name:"date"}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:6},l.a.createElement(F.h,{label:"Cliente",name:"client",options:p.options,onInputChange:function(e){return function(e){e.length>=3&&v(Object(M.a)({name:e})),0===e.length&&v(Object(M.a)())}(e)}}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:6},l.a.createElement(F.h,{label:"Procedimentos",isMulti:!0,name:"procedures",options:E.options}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:3},l.a.createElement(F.h,{label:"Tipo consulta",name:"type_consult",options:[{label:"Agendada",value:0},{label:"Retorno",value:1},{label:"Urg\xeancia",value:2}]}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:3},l.a.createElement(F.h,{label:"Status",name:"status",options:[{value:2,label:"Cancelada"},{value:3,label:"Remarcada"}]}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:12},l.a.createElement(F.i,{rows:10,col:15,label:"Observa\xe7\xf5es",name:"observations"}))),l.a.createElement(x.a,null,l.a.createElement(T.a,{md:12,className:"text-right"},l.a.createElement(i.a,{type:"submit",variant:"primary"},"Salvar"),l.a.createElement(i.a,{variant:"danger",onClick:function(){return d(!1)}},"Cancelar")))))))},R=t(162),q=t(105);Object(d.registerLocale)("pt-br",R.a);a.a=function(e){e.client_id;var a=Object(f.useDispatch)(),t=Object(f.useSelector)((function(e){return e.consult.consults})),d=t.items,v=t.loading,g=Object(r.useState)(void 0),O=Object(n.a)(g,2),j=O[0],D=O[1],Y=Object(r.useState)(void 0),H=Object(n.a)(Y,2),x=H[0],T=H[1],M=Object(r.useState)(""),w=Object(n.a)(M,2),F=w[0],_=w[1],k=Object(r.useRef)(null),N=l.a.createElement("div",{className:"form-inline"},l.a.createElement(p.a,{placeholderText:"Data Inicial",selected:j,onChange:function(e){return D(e)},fixedHeight:!0,className:"only-hour",name:"dateI",isClearable:!0,dateFormat:"dd/MM/yyyy",locale:"pt-br"}),l.a.createElement(p.a,{placeholderText:"Data Final",selected:x,onChange:function(e){return T(e)},fixedHeight:!0,className:"only-hour",name:"dateF",isClearable:!0,dateFormat:"dd/MM/yyyy",locale:"pt-br"}),l.a.createElement(i.a,{type:"button",onClick:function(e){e.preventDefault();var t=j&&h()(j).format("YYYY-MM-DDTHH:mm:ss.sssZ"),n=x&&h()(x).format("YYYY-MM-DDTHH:mm:ss.sssZ");a(Object(m.a)({start:t,end:n}))}},l.a.createElement(E.a,{size:20})));return v?l.a.createElement(q.a,null):l.a.createElement(l.a.Fragment,null,l.a.createElement(c.BootstrapTable,{data:d,striped:!0,hover:!0,version:"4",ref:k,pagination:!0,options:{noDataText:"N\xe3o h\xe1 itens a exibir"}},l.a.createElement(c.TableHeaderColumn,{isKey:!0,dataField:"id",hidden:!0},"Id"),l.a.createElement(c.TableHeaderColumn,{dataField:"date",width:"300",dataFormat:function(e,a){return l.a.createElement("p",{className:"font-weight-bold"},h()(e).format("DD/MM/YYYY HH:mm").toString())}},"Data",l.a.createElement("br",null),N),l.a.createElement(c.TableHeaderColumn,{dataField:"client",dataFormat:function(e,a){return l.a.createElement(l.a.Fragment,null,l.a.createElement("a",{href:e.avatar_url,rel:"noopener noreferrer",className:"mr-1",target:"_blank"},l.a.createElement("img",{src:e.avatar_url,alt:"Perfil",style:{width:"40px",height:"40px",borderRadius:50}})),l.a.createElement(y.Link,{to:"/inicio/clientes/detalhes/".concat(e._id)},e.name))}},"Cliente",l.a.createElement("br",null),l.a.createElement("input",{type:"text",placeholder:"Digite o nome",onChange:function(e){return _(e.target.value)},onInput:function(e){var t=e.target.value,n=j&&h()(j).format("YYYY-MM-DDTHH:mm:ss.sssZ"),r=x&&h()(x).format("YYYY-MM-DDTHH:mm:ss.sssZ");t.length>=3&&a(Object(m.a)({start:n,end:r,client:F})),0===t.length&&a(Object(m.a)())},value:F})),l.a.createElement(c.TableHeaderColumn,{width:"120",dataField:"client",dataFormat:function(e,a){return l.a.createElement("label",null,e.contact)}},"Telefone"),l.a.createElement(c.TableHeaderColumn,{dataField:"procedures",dataFormat:function(e,a){return l.a.createElement("div",null,l.a.createElement("ul",{className:"list-unstyled"},e.map((function(e,a){return l.a.createElement("li",{key:a},l.a.createElement(s.a,{variant:"success"},l.a.createElement("span",{className:"font-weight-bold"},e.name)))}))))}},"Procedimentos"),l.a.createElement(c.TableHeaderColumn,{dataField:"observations"},"Observa\xe7\xf5es"),l.a.createElement(c.TableHeaderColumn,{dataField:"type_consult",width:"120",dataFormat:function(e,a){return l.a.createElement("div",null,"0"===e.value?l.a.createElement(s.a,{variant:"primary"},"Agendada"):"1"===e.value?l.a.createElement(s.a,{variant:"success"},"Retorno"):l.a.createElement(s.a,{variant:"danger"},"Urg\xeancia"))}},"Tipo consulta"),l.a.createElement(c.TableHeaderColumn,{dataField:"status",dataFormat:function(e,a){return l.a.createElement("div",null,"0"===e.value?l.a.createElement(s.a,{variant:"warning"},"Marcada"):"1"===e.value?l.a.createElement(s.a,{variant:"success"},"Realizada"):"2"===e.value?l.a.createElement(s.a,{variant:"danger"},"Cancelada"):l.a.createElement(s.a,{variant:"primary"},"Remarcada"))},width:"100",dataSort:!0},"Status"),l.a.createElement(c.TableHeaderColumn,{width:"160",dataFormat:function(e,t){return l.a.createElement("div",{className:"list-inline"},l.a.createElement(o.a,{placement:"bottom",overlay:l.a.createElement(u.a,{id:"edit"},"Cancelar Consulta")},l.a.createElement("button",{className:"btn btn-link",onClick:function(e){return function(e,t){(e.preventDefault(),"1"!==t.status.value)?"2"!==t.status.value?!0===window.confirm("Tem certeza que deseja cancelar a consulta?")&&(t.status={value:2,label:"Cancelada"},a(Object(m.b)(t))):C.toastr.error("Consulta j\xe1 se encontra cancelada!"):C.toastr.error("Consulta realizada n\xe3o pode ser cancelada!")}(e,t)}},l.a.createElement(E.b,{size:20,color:"red"}))),"2"!==t.status.value&&l.a.createElement(o.a,{placement:"bottom",overlay:l.a.createElement(u.a,{id:"edit"}," Realizar consulta")},l.a.createElement(y.Link,{to:"/inicio/consulta/".concat(t.id)},l.a.createElement(b.a,{size:20,color:"#62B3B1"}))),l.a.createElement(I,{initial:t}),"2"!==t.status.value&&"1"===t.status.value&&l.a.createElement(o.a,{placement:"bottom",overlay:l.a.createElement(u.a,{id:"edit"},"Imprimir Ficha")},l.a.createElement(y.Link,{to:"/ficha/".concat(t.id)},l.a.createElement(b.f,{size:20}))))}},"A\xe7\xf5es")))}},480:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(332),c=t(333),s=t(197),o=t(193),u=t(356),i=t(42),m=t.n(i),d=t(68),p=t(41),E=t(24),b=t(346),f=t.n(b),v=t(157),h=t.n(v),y=t(27),g=t(335),O=t(158),j=t(84),C=t(85),D=t(29),Y=t(343),H=t(344),x=t(376),T=t(15),M=function(e){var a=e.data;return r.a.createElement(T.g.Option,e,r.a.createElement("img",{src:a.avatar,alt:"Perfil",style:{width:"40px",height:"40px",borderRadius:50}}),r.a.createElement("label",{className:"ml-1"},a.label))},w=t(21),F=t.n(w);h.a.extend(f.a);var _=function(){var e=Object(n.useState)(!1),a=Object(p.a)(e,2),t=a[0],l=a[1],u=Object(E.useSelector)((function(e){return e.client})).clients,i=Object(E.useSelector)((function(e){return e.procedure})).procedures,b=Object(E.useDispatch)(),f=Object(n.useRef)(null);Object(n.useEffect)((function(){b(Object(O.a)()),b(Object(H.a)())}),[b]);var v=function(){var e=Object(d.a)(m.a.mark((function e(a,t){var n,r,c,s,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.reset,e.prev=1,n=D.b().shape({date:D.d().required("Informe a data da consulta"),client:D.d().ensure().required("Informe o cliente"),procedures:D.d().ensure().required("Informe os procedimentos"),type_consult:D.d().ensure().required("Informe o tipo de consulta")}),e.next=5,n.validate(a,{abortEarly:!1});case 5:return r={date:h()(a.date).format("YYYY-MM-DDTHH:mm:ss.sssZ"),client:a.client.value,procedures:a.procedures.map((function(e){return e.value})),type_consult:a.type_consult,observations:a.observations,status:{value:"0",label:"Marcada"}},e.prev=6,e.next=9,F.a.post("/consults",r);case 9:201===e.sent.status&&(b(Object(Y.a)({start:h()(Date.now()).format("YYYY-MM-DDTHH:mm:ss.sssZ")})),f.current.setErrors({}),f.current.reset(),l(!1),y.toastr.success("Consulta marcada com sucesso")),e.next=20;break;case 13:e.prev=13,e.t0=e.catch(6),c={},s=e.t0.response.data,c[s.path]=s.message,f.current.setErrors(c),y.toastr.error("J\xe1 existe uma consulta marcada para este horario");case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(1),e.t1 instanceof D.a&&(o={},e.t1.inner.forEach((function(e){o[e.path]=e.message,f.current.setErrors(o)})));case 25:case"end":return e.stop()}}),e,null,[[1,22],[6,13]])})));return function(a,t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{className:"btn btn-primary text-white my-4",onClick:function(){return l(!0)}},r.a.createElement(x.b,null)," Consulta"),r.a.createElement(g.a,{size:"lg",show:t,onHide:function(){return l(!1)}},r.a.createElement(g.a.Header,{closeButton:!0},r.a.createElement(g.a.Title,null,"Criar consulta")),r.a.createElement(g.a.Body,null,r.a.createElement(j.a,{ref:f,onSubmit:v},r.a.createElement(c.a,null,r.a.createElement(s.a,{md:6},r.a.createElement(C.b,{placeholderText:"Data/hora",name:"date",dateFormat:"dd/MM/yyyy HH:mm",minDate:new Date,showTimeSelect:!0}))),r.a.createElement(c.a,null,r.a.createElement(s.a,{md:6},r.a.createElement(C.h,{label:"Cliente",name:"client",options:u.options,onInputChange:function(e){return function(e){e.length>=3&&b(Object(O.a)({name:e})),0===e.length&&b(Object(O.a)())}(e)},components:{Option:M}}))),r.a.createElement(c.a,null,r.a.createElement(s.a,{md:6},r.a.createElement(C.h,{label:"Procedimentos",isMulti:!0,name:"procedures",options:i.options}))),r.a.createElement(c.a,null,r.a.createElement(s.a,{md:3},r.a.createElement(C.h,{label:"Tipo consulta",name:"type_consult",options:[{label:"Agendada",value:0},{label:"Retorno",value:1},{label:"Urg\xeancia",value:2}]}))),r.a.createElement(c.a,null,r.a.createElement(s.a,{md:12},r.a.createElement(C.i,{rows:10,col:15,label:"Observa\xe7\xf5es",name:"observations"}))),r.a.createElement(c.a,null,r.a.createElement(s.a,{md:12,className:"text-right"},r.a.createElement(o.a,{type:"submit",variant:"primary"},"Salvar"),r.a.createElement(o.a,{variant:"danger",onClick:function(){return l(!1)}},"Cancelar")))))))},k=t(420),N=t(25);a.default=function(){var e=Object(E.useDispatch)();return Object(n.useEffect)((function(){e(Object(Y.a)({start:h()(Date.now()).format("YYYY-MM-DDTHH:mm:ss.sssZ")}))})),r.a.createElement(l.a,{fluid:!0},r.a.createElement(c.a,null,r.a.createElement(s.a,{className:"text-center my-4"},r.a.createElement("h4",{className:"title"},"Minhas Consultas"))),r.a.createElement(c.a,null,r.a.createElement(s.a,{className:"text-right"},r.a.createElement(o.a,{as:N.Link,variant:"info",className:"mr-2",to:"/inicio/clientes"},r.a.createElement(k.a,{size:20}),"Cliente"),r.a.createElement(_,null))),r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(u.a,null))))}}}]);
//# sourceMappingURL=12.d4605b28.chunk.js.map