(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[13],{347:function(e,t,a){"use strict";var n=a(1),r=a.n(n);a(348);t.a=function(e){var t=e.show;return!0===(void 0!==t&&t)&&r.a.createElement("div",{id:"cover-spin"})}},348:function(e,t,a){},352:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return s}));var n=a(12),r=a(22),c=a.n(r),i=function(e){return function(t){return t({type:n.B}),c.a.post("/services",e).then((function(e){t({type:n.C,payload:e.data})})).catch((function(e){t({type:n.A,payload:e.response.data})}))}},o=function(e,t){return function(a){return a({type:n.B}),c.a.put("/services/".concat(t),e).then((function(e){a({type:n.R,payload:e.data})})).catch((function(e){a({type:n.A,payload:e.response.data})}))}},s=function(){return function(e){return e({type:n.y}),c.a.get("/services").then((function(t){e({type:n.z,payload:t.data})})).catch((function(t){e({type:n.x,payload:t.response.data})}))}}},488:function(e,t,a){"use strict";a.r(t);var n=a(63),r=a.n(n),c=a(83),i=a(52),o=a(1),s=a.n(o),l=a(335),u=a(200),d=a(196),m=a(105),f=a(45),p=a(137),v=a(27),E=a(352),b=a(68),h=a(347),y=a(349),O=a(341),j=a(333),w=a(106),S=a(351),g=function(e){var t=e.rowSelect,a=Object(v.useDispatch)(),n=Object(v.useSelector)((function(e){return e.service.services})),r=n.items,c=n.loading;Object(o.useEffect)((function(){a(Object(E.a)())}),[a]);return c?s.a.createElement(w.a,null):s.a.createElement(y.BootstrapTable,{data:r,striped:!0,hover:!0,version:"4",pagination:!0,options:{noDataText:"N\xe3o h\xe1 itens a exibir"}},s.a.createElement(y.TableHeaderColumn,{isKey:!0,dataField:"_id",hidden:!0},"Id"),s.a.createElement(y.TableHeaderColumn,{dataField:"description",filter:{type:"TextFilter",delay:1e3},dataSort:!0,width:"500px"},"Descri\xe7\xe3o"),s.a.createElement(y.TableHeaderColumn,{dataField:"observations"},"Observa\xe7\xf5es"),s.a.createElement(y.TableHeaderColumn,{width:"90",dataFormat:function(e,a){return s.a.createElement("div",{className:"form-iline"},s.a.createElement(O.a,{placement:"bottom",overlay:s.a.createElement(j.a,{id:"edit"},"Editar")},s.a.createElement(d.a,{onClick:function(){return t(a)},variant:"link"},s.a.createElement(S.a,{size:24}),"\xa0")))}},"A\xe7\xf5es"))};t.default=function(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),a=t[0],n=t[1],y=Object(v.useDispatch)(),O=Object(v.useSelector)((function(e){return e.service.service})),j=O.error,w=O.success,S=O.loading,C=Object(o.useRef)(null);Object(o.useEffect)((function(){return function(){y({type:"CLEAR_SERVICE_STATE"})}}),[]),Object(o.useEffect)((function(){if(!0===w&&(b.toastr.success("Servi\xe7o salvo com sucesso!"),n(!1),C.current.setErrors({}),C.current.reset()),void 0!==j&&Object.keys(j).length>0){var e={};e[j.path]=j.message,C.current.setErrors(e),b.toastr.error("Ocorreu um erro ao salvar o servi\xe7o")}}),[w,j]);var x=function(){var e=Object(c.a)(r.a.mark((function e(t){var n,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=f.b().shape({description:f.d().required("Descri\xe7\xe3o obrigatoria")}),e.next=4,n.validate(t,{abortEarly:!1});case 4:y(a?Object(E.c)(t,t._id):Object(E.b)(t)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),e.t0 instanceof f.a&&(c={},e.t0.inner.forEach((function(e){c[e.path]=e.message,C.current.setErrors(c)})));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{show:S}),s.a.createElement(l.a,{clas:"justify-content-center"},s.a.createElement(u.a,{md:12,className:"text-center"},s.a.createElement("p",{className:"title"},"Cadastro Servi\xe7os"))),s.a.createElement(m.a,{ref:C,onSubmit:x},s.a.createElement(l.a,null,s.a.createElement(u.a,{md:6},s.a.createElement(p.e,{name:"_id",hidden:!0}),s.a.createElement(p.e,{name:"description",label:"Descri\xe7\xe3o",style:{width:"60%"}}),s.a.createElement(p.i,{name:"observations",label:"Observa\xe7\xf5es",rows:"5",cols:"33"}))),s.a.createElement(l.a,null,s.a.createElement(u.a,{md:6,className:"text-right"},s.a.createElement(d.a,{type:"submit",variant:"primary"},a?"Atualizar":"Salvar"),s.a.createElement(d.a,{variant:"danger",onClick:function(){return window.location.reload()}},"Cancela")))),s.a.createElement(l.a,{className:"my-4"},s.a.createElement(u.a,{md:12},s.a.createElement(g,{rowSelect:function(e){n(!0),C.current.setData({_id:e._id,description:e.description,observations:e.observations})}}))))}}}]);
//# sourceMappingURL=13.ac1b1ffe.chunk.js.map