(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"1zct":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,l,n=v(a("QbLZ")),r=v(a("Kl5d")),i=v(a("Yz+Y")),s=v(a("iCc5")),c=v(a("V7oC")),u=v(a("FYw3")),d=v(a("mRg0"));a("TttT");var f=v(a("q1tI")),m=a("MuoO"),p=(v(a("17x9")),v(a("Rnav")));v(a("Fzi1")),v(a("i6OX"));a("oYYv");var h=v(a("GBY4"));v(a("1dND"));function v(e){return e&&e.__esModule?e:{default:e}}var g=(o=function(e){function t(e){(0,s.default)(this,t);var a=(0,u.default)(this,(t.__proto__||(0,i.default)(t)).call(this,e));l.call(a);var o=(0,h.default)(e.location.search,!0).query.oid,n=localStorage.getItem("shopInfo")?JSON.parse(localStorage.getItem("shopInfo")):{};return a.state={orderDetail:{},oid:o,shopInfo:n,hotPro:[]},a}return(0,d.default)(t,e),(0,c.default)(t,[{key:"componentWillMount",value:function(){this.getHotCategory(),this.init()}},{key:"componentWillReceiveProps",value:function(e){var t=this.props,a=e.orderDetail.getOrderDetail,o=e.pay.getHotCategory;if(a!==t.orderDetail.getOrderDetail){var l=a.code,n=a.data,i=a.message;"1000"===l?this.setState({orderDetail:n}):r.default.info(i)}if(o!==t.pay.getHotCategory){var s=o.code,c=o.data;o.message;"1000"===s&&this.setState({hotPro:c.list})}}},{key:"render",value:function(){var e=this,t=this.state,a=t.orderDetail,o=t.hotPro,l=t.oid,r=t.shopInfo;return f.default.createElement("div",{className:"order-status"},f.default.createElement(p.default,(0,n.default)({},this.props,{title:"支付成功",jump:function(){e.props.history.push("/")},myLoading:!!this.props.loading.models.pay})),f.default.createElement("div",{className:"top"},11===a.orderStatus?f.default.createElement("div",null,f.default.createElement("div",{className:"succ-icon pay-icon"}),f.default.createElement("div",{className:"txt"},"待支付")):f.default.createElement("div",null,f.default.createElement("div",{className:"succ-icon"}),f.default.createElement("div",{className:"txt"},"支付成功")),r.codeKey.toLowerCase()!==(configs.tencentSH?configs.tencentSH.toLowerCase():"")&&f.default.createElement("button",{type:"primary",className:"primary-btn",onClick:function(){e.toUrl("/")}},"返回首页"),f.default.createElement("button",{type:"ghost",className:"ghost-btn",onClick:function(){e.toUrl("/orderDetail?oid="+l)}},"查看订单")),f.default.createElement("div",{className:"more-bg"},f.default.createElement("div",{className:"more-txt"},"为你精选更多权益"),f.default.createElement("div",{className:"more-pro"},o&&o[0]&&o.map(function(t){return f.default.createElement("div",{className:"item",onClick:function(){e.toUrl("/detail?gid="+t.childCategoryId)}},f.default.createElement("img",{src:t.iconPath}),f.default.createElement("span",{className:"name"},t.childCategoryName),f.default.createElement("span",{className:"price"},t.price,f.default.createElement("small",null,"元起")))}))))}}]),t}(f.default.Component),l=function(){var e=this;this.init=function(){var t=e.state.oid;e.props.dispatch({type:"orderDetail/getOrderDetail",payload:{OrderNo:t}})},this.getHotCategory=function(){var t=e.state,a=(t.oid,t.shopInfo);e.props.dispatch({type:"pay/getHotCategory",payload:{merchantId:a.merInfoId}})},this.toUrl=function(t){e.props.history.push(t)}},o);t.default=(0,m.connect)(function(e){return(0,n.default)({},e)})(g)},CN8t:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=d(a("Yz+Y")),l=d(a("iCc5")),n=d(a("V7oC")),r=d(a("FYw3")),i=d(a("mRg0")),s=d(a("q1tI"));d(a("17x9"));a("PrFZ");var c=a("i6OX"),u=d(c);function d(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){(0,l.default)(this,t);var a=(0,r.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));a.choose=function(e){a.setState({pathname:e},function(){a.props.history.push(e)})};var n=localStorage.getItem("shopInfo")?JSON.parse(localStorage.getItem("shopInfo")):{};return a.state={pathname:e.location.pathname,shopInfo:n},a}return(0,i.default)(t,e),(0,n.default)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.pathname,o=t.shopInfo;return s.default.createElement("div",null,3!==o.merInfoTemplates.visitType?s.default.createElement("div",{className:"footer-bg clearfix"},s.default.createElement("div",{className:"/"===a?"item active":"item",onClick:function(){e.choose("/")}},s.default.createElement(u.default,{glyph:c.home}),"首页"),s.default.createElement("div",{className:"/my"===a?"item active":"item",onClick:function(){e.choose("/my")}},s.default.createElement(u.default,{glyph:c.user}),"我的")):"")}}]),t}(s.default.Component);t.default=f},Fzi1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,l=a("CN8t"),n=(o=l)&&o.__esModule?o:{default:o};t.default=n.default},PrFZ:function(e,t,a){},jHcH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,l=a("1zct"),n=(o=l)&&o.__esModule?o:{default:o};t.default=n.default},oYYv:function(e,t,a){}}]);