(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{346:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return u}));var n=a(12),r=a(22),c=a.n(r),o=function(e){return function(t){return t({type:n.v}),c.a.post("/procedures",e).then((function(e){t({type:n.w,payload:e.data})})).catch((function(e){t({type:n.u,payload:e.response.data})}))}},i=function(e,t){return function(a){return a({type:n.v}),c.a.put("/procedures/".concat(t),e).then((function(e){console.log(e.data),a({type:n.Q,payload:e.data})})).catch((function(e){a({type:n.u,payload:e.response.data})}))}},u=function(){return function(e){return e({type:n.s}),c.a.get("/procedures").then((function(t){e({type:n.t,payload:t.data})})).catch((function(t){e({type:n.r,payload:t.response.data})}))}}},347:function(e,t,a){"use strict";var n=a(1),r=a.n(n);a(348);t.a=function(e){var t=e.show;return!0===(void 0!==t&&t)&&r.a.createElement("div",{id:"cover-spin"})}},348:function(e,t,a){},351:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return u}));var n=a(12),r=a(22),c=a.n(r),o=function(e){return function(t){return t({type:n.B}),c.a.post("/services",e).then((function(e){t({type:n.C,payload:e.data})})).catch((function(e){t({type:n.A,payload:e.response.data})}))}},i=function(e,t){return function(a){return a({type:n.B}),c.a.put("/services/".concat(t),e).then((function(e){a({type:n.R,payload:e.data})})).catch((function(e){a({type:n.A,payload:e.response.data})}))}},u=function(){return function(e){return e({type:n.y}),c.a.get("/services").then((function(t){e({type:n.z,payload:t.data})})).catch((function(t){e({type:n.x,payload:t.response.data})}))}}},427:function(e,t,a){},488:function(e,t,a){"use strict";a.r(t);var n=a(62),r=a.n(n),c=a(83),o=a(52),i=a(1),u=a.n(i),l=a(335),s=a(201),d=a(197),m=a(105),p=a(45),f=a(136),E=a(349),v=a(341),y=a(333),b=a(27),h=a(346),O=a(106),j=a(161),w=(a(427),function(e){var t=e.rowSelect,a=Object(b.useSelector)((function(e){return e.procedure.procedures})),n=a.items,r=a.loading,c=Object(b.useDispatch)();Object(i.useEffect)((function(){c(Object(h.a)())}),[c]);return r?u.a.createElement(O.a,null):u.a.createElement(E.BootstrapTable,{data:n,striped:!0,hover:!0,version:"4",pagination:!0,options:{noDataText:"N\xe3o h\xe1 itens a exibir"}},u.a.createElement(E.TableHeaderColumn,{isKey:!0,dataField:"_id",hidden:!0},"Id"),u.a.createElement(E.TableHeaderColumn,{dataField:"service",filter:{type:"TextFilter",delay:1e3},dataSort:!0,dataFormat:function(e,t){return e.description},width:"180px"},"Servi\xe7o"),u.a.createElement(E.TableHeaderColumn,{dataField:"name",filter:{type:"TextFilter",delay:1e3},dataSort:!0,width:"600"},"Procedimento"),u.a.createElement(E.TableHeaderColumn,{dataField:"price",width:"100"},"Valor"),u.a.createElement(E.TableHeaderColumn,{dataField:"description"},"Descri\xe7\xe3o"),u.a.createElement(E.TableHeaderColumn,{width:"90",dataFormat:function(e,a){return u.a.createElement("div",{className:"form-iline"},u.a.createElement(v.a,{placement:"bottom",overlay:u.a.createElement(y.a,{id:"edit"},"Editar")},u.a.createElement(d.a,{onClick:function(){return t(a)},variant:"link"},u.a.createElement(j.b,{size:24}),"\xa0")))}},"A\xe7\xf5es"))}),g=a(351),C=a(347),S=a(68);t.default=function(){var e=Object(i.useState)(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],E=Object(b.useSelector)((function(e){return e.procedure.procedure})),v=E.success,y=E.error,O=E.loading,j=Object(b.useSelector)((function(e){return e.service.services})),T=Object(b.useDispatch)(),x=Object(i.useRef)(null);Object(i.useEffect)((function(){return T(Object(g.a)()),function(){T({type:"CLEAR_PROCEDURE_STATE"})}}),[T]);Object(i.useEffect)((function(){if(!0===v&&(S.toastr.success("Procedimento salvo com sucesso!"),n(!1),x.current.setErrors({}),x.current.reset()),void 0!==y&&Object.keys(y).length>0){var e={};e[y.path]=y.message,x.current.setErrors(e),S.toastr.error("Ocorreu um erro ao salvar o procedimento")}}),[v,y]);var k=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,c,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=p.b().shape({service:p.d().ensure().required("Campo obrigatorio"),name:p.d().required("Preencha o procedimento")}),e.next=4,n.validate(t,{abortEarly:!1});case 4:c={service:t.service.value,name:t.name,price:t.price,description:t.description},T(a?Object(h.c)(c,t._id):Object(h.b)(c)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),e.t0 instanceof p.a&&(o={},e.t0.inner.forEach((function(t){console.log(e.t0),o[t.path]=t.message,x.current.setErrors(o)})));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(C.a,{show:O}),u.a.createElement(l.a,null,u.a.createElement(s.a,{m4:4},u.a.createElement("p",{className:"title text-center"},"Cadastro Procedimentos"))),u.a.createElement(m.a,{ref:x,onSubmit:k},u.a.createElement(l.a,null,u.a.createElement(s.a,{md:6},u.a.createElement(f.e,{name:"_id",hidden:!0}))),u.a.createElement(l.a,{className:"mt-4"},u.a.createElement(s.a,{md:3},u.a.createElement(f.h,{name:"service",label:"Servi\xe7o",options:j.options}))),u.a.createElement(l.a,null,u.a.createElement(s.a,{md:4},u.a.createElement(f.e,{name:"name",label:"Procedimento"}))),u.a.createElement(l.a,null,u.a.createElement(s.a,{md:1},u.a.createElement(f.f,{name:"price",mask:"9999",maskPlaceholder:null,label:"Pre\xe7o R$"}))),u.a.createElement(l.a,null,u.a.createElement(s.a,{md:6},u.a.createElement(f.i,{name:"description",label:"Descri\xe7\xe3o",rows:"8"}))),u.a.createElement(l.a,null,u.a.createElement(s.a,{md:6,className:"text-right"},u.a.createElement(d.a,{type:"submit",variant:"primary"},a?"Atualizar":"Salvar"),u.a.createElement(d.a,{variant:"danger",onClick:function(){return window.location.reload()}},"Cancela")))),u.a.createElement(l.a,{className:"my-4"},u.a.createElement(s.a,{md:12},u.a.createElement(w,{rowSelect:function(e){n(!0),x.current.setData({_id:e._id,service:{value:e.service._id,label:e.service.description},name:e.name,price:e.price,description:e.description})}}))))}}}]);
//# sourceMappingURL=8.eaed47a3.chunk.js.map