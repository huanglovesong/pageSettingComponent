(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/BPf":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("phG8"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},"/VLn":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=f(a("3UyF")),n=f(a("YEIV")),r=f(a("Yz+Y")),o=f(a("iCc5")),s=f(a("V7oC")),i=f(a("FYw3")),u=f(a("mRg0"));a("RhWh");var d=a("q1tI"),c=f(d);function f(e){return e&&e.__esModule?e:{default:e}}a("DRTB");var m=function(e){function t(){var e,a,l,n;(0,o.default)(this,t);for(var s=arguments.length,u=Array(s),d=0;d<s;d++)u[d]=arguments[d];return a=l=(0,i.default)(this,(e=t.__proto__||(0,r.default)(t)).call.apply(e,[this].concat(u))),l.toPage=function(){var e=l.props.allInfo;l.props.history.push(e.sidebarDetail.linkUrl)},n=a,(0,i.default)(l,n)}return(0,u.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e=this.props.allInfo;return c.default.createElement(l.default,{visible:!0,transparent:!0,maskClosable:!1,onClose:this.props.hideModal,className:"active-modal"},c.default.createElement("div",{className:"active-modal-content"},c.default.createElement("img",{className:"active-modal-content-img",src:e.popupDetail.imagePath}),c.default.createElement("div",{className:"active-modal-close-top",onClick:this.props.hideModal}),c.default.createElement("div",(0,n.default)({className:"active-modal-close-bottom",onClick:this.props.hideModal},"onClick",this.toPage))))}}]),t}(d.Component);t.default=m},"3Lj+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("3vaZ"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},"3vaZ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,r=p(a("QbLZ")),o=p(a("Yz+Y")),s=p(a("iCc5")),i=p(a("V7oC")),u=p(a("FYw3")),d=p(a("mRg0")),c=a("q1tI"),f=p(c),m=p(a("17x9"));function p(e){return e&&e.__esModule?e:{default:e}}a("7Adc");var h=(n=l=function(e){function t(){var e,a,l,n;(0,s.default)(this,t);for(var i=arguments.length,d=Array(i),c=0;c<i;c++)d[c]=arguments[c];return a=l=(0,u.default)(this,(e=t.__proto__||(0,o.default)(t)).call.apply(e,[this].concat(d))),l.toBanner=function(e){1===e.bannerType?window.location.href=e.linkurl:2===e.bannerType&&1===e.ifSkip&&l.props.history.push("/detail?gid="+e.childCategoryId+"&pid="+e.productId)},l.getCom=function(){var e=l.props.item,t=e.moduleDataList.length;if(t){var a=[],n=e.modelStyle.bannerStyleModel.template,o=e.modelStyle.bannerStyleModel.imageClearance/2,s=e.modelStyle.bannerStyleModel.pageMargin,i={margin:o/50+"rem",display:"inline-block"},u={marginLeft:"-"+o/50+"rem",marginRight:"-"+o/50+"rem",paddingLeft:s/50+"rem",paddingRight:s/50+"rem"};if("one"===n||"two"===n||"three"===n)a=e.moduleDataList.map(function(e){return f.default.createElement("div",{className:"banner-advertising-box-img "+n+"-module float-left",onClick:function(){l.toBanner(e)}},f.default.createElement("a",{style:(0,r.default)({},i)},f.default.createElement("img",{src:e.bannerUrl.replace("http://fulu-mall.oss-cn-hangzhou.aliyuncs.com","http://tu.mall.fulu.com")})))});else if("onetwo"===n)for(var d=t%3==0?t/3:parseInt(t/3)+1,c={margin:o/50+"rem "+o/50+"rem 0px "+o/50+"rem",display:"inline-block"},m=function(t){a.push(f.default.createElement("div",{className:"one-two"},f.default.createElement("div",{className:"row"},f.default.createElement("div",{className:"top-item",onClick:function(){l.toBanner(e)}},f.default.createElement("a",{style:(0,r.default)({},i)},f.default.createElement("img",{className:"common-img-css",src:e.moduleDataList[3*t].bannerUrl}))),f.default.createElement("div",{className:"top-item"},f.default.createElement("div",{className:"row"},e.moduleDataList[3*t+1]&&f.default.createElement("div",{className:"item",onClick:function(){l.toBanner(e.moduleDataList[3*t+1])}},f.default.createElement("a",{style:(0,r.default)({},c)},f.default.createElement("img",{className:"common-img-css",src:e.moduleDataList[3*t+1].bannerUrl}))),e.moduleDataList[3*t+2]&&f.default.createElement("div",{className:"item",onClick:function(){l.toBanner(e.moduleDataList[3*t+2])}},f.default.createElement("a",{style:(0,r.default)({},i)},f.default.createElement("img",{className:"common-img-css",src:e.moduleDataList[3*t+2].bannerUrl}))))))))},p=0;p<d;p++)m(p);return f.default.createElement("div",{className:"banner-advertising-box clearfix",style:(0,r.default)({},u)},a)}return f.default.createElement("div",{className:"banner-advertising-box clearfix"},f.default.createElement("div",{className:"banner-advertising-box-img float-left"},f.default.createElement("img",{src:"https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png"})))},n=a,(0,u.default)(l,n)}return(0,d.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){return this.getCom()}}]),t}(c.Component),l.propTypes={prop:m.default},n);t.default=h},"4u3W":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("FAYz"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},"7Adc":function(e,t,a){},CN8t:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=c(a("Yz+Y")),n=c(a("iCc5")),r=c(a("V7oC")),o=c(a("FYw3")),s=c(a("mRg0")),i=c(a("q1tI"));c(a("17x9"));a("PrFZ");var u=a("i6OX"),d=c(u);function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){(0,n.default)(this,t);var a=(0,o.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));a.choose=function(e){a.setState({pathname:e},function(){a.props.history.push(e)})};var r=localStorage.getItem("shopInfo")?JSON.parse(localStorage.getItem("shopInfo")):{};return a.state={pathname:e.location.pathname,shopInfo:r},a}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.pathname,l=t.shopInfo;return i.default.createElement("div",null,3!==l.merInfoTemplates.visitType?i.default.createElement("div",{className:"footer-bg clearfix"},i.default.createElement("div",{className:"/"===a?"item active":"item",onClick:function(){e.choose("/")}},i.default.createElement(d.default,{glyph:u.home}),"首页"),i.default.createElement("div",{className:"/my"===a?"item active":"item",onClick:function(){e.choose("/my")}},i.default.createElement(d.default,{glyph:u.user}),"我的")):"")}}]),t}(i.default.Component);t.default=f},DRTB:function(e,t,a){},FAYz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,r,o=g(a("BETb")),s=g(a("QbLZ")),i=g(a("Yz+Y")),u=g(a("iCc5")),d=g(a("V7oC")),c=g(a("FYw3")),f=g(a("mRg0"));a("JaZr");var m=a("q1tI"),p=g(m),h=g(a("17x9"));a("G9CZ");var v=g(a("1dND"));function g(e){return e&&e.__esModule?e:{default:e}}var y=(n=l=function(e){function t(e){(0,u.default)(this,t);var a=(0,c.default)(this,(t.__proto__||(0,i.default)(t)).call(this,e));return r.call(a),a.state={activeTab:0,goodList:[],tabs:[]},a}return(0,f.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return this.getCom()}}]),t}(m.Component),l.propTypes={prop:h.default},r=function(){var e=this;this.toDetail=function(t,a){e.props.history.push("/detail?gid="+t+(a?"&pid="+a:""))},this.changeTabs=function(t){e.setState({activeTab:t})},this.renderContent=function(t){var a=e.props.item,l=a.modelStyle.classStyleModel.productMargin/2,n=(a.modelStyle.classStyleModel.pageMargin,t.dataDetailCacheModels.length%2==0?t.dataDetailCacheModels.length:parseInt(t.dataDetailCacheModels.length/2),{margin:l+"px",display:"inline-block"});return p.default.createElement("div",{style:{display:"flex"}},p.default.createElement("div",{className:"class-content"},t.dataDetailCacheModels.map(function(t){return p.default.createElement("div",{className:"item",onClick:function(){e.toDetail(t.childCategoryId,t.productId)}},p.default.createElement("span",{style:(0,s.default)({},n)},p.default.createElement("div",{class:"img-bg"},t.cornerMark&&p.default.createElement("div",{class:"right-tips"},t.cornerMark),p.default.createElement("img",{src:t.iconPath})),p.default.createElement("div",{class:"name"},t.childCategoryName),p.default.createElement("div",{className:"price"},p.default.createElement("small",null,"￥"),t.price,p.default.createElement("s",{className:"del-price"},"￥",t.faceValue))))})))},this.getTabs=function(){var t=[];return e.props.item.moduleDataList.map(function(e,a){t.push({title:v.default.stringCutOut(e.textData,4),key:a,dataDetailCacheModels:e.dataDetailCacheModels})}),t},this.getCom=function(){var t=e.props.item;if(t.moduleDataList.length){var a=t.modelStyle.classStyleModel.productMargin/2,l=t.modelStyle.classStyleModel.pageMargin,n={marginLeft:"-"+a+"px",marginRight:"-"+a+"px",paddingLeft:l+"px",paddingRight:l+"px"};return p.default.createElement("div",{class:"classification-box clearfix",style:(0,s.default)({},n)},p.default.createElement(o.default,{tabs:e.getTabs(),renderTabBar:function(e){return p.default.createElement(o.default.DefaultTabBar,(0,s.default)({},e,{page:4}))}},e.renderContent))}return""}},n);t.default=y},FWdp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("wXkX"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},Fzi1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("CN8t"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},G9CZ:function(e,t,a){},GbxA:function(e,t,a){},KntE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("xzeO"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},P4jY:function(e,t,a){},PrFZ:function(e,t,a){},Q4S1:function(e,t,a){},RnhZ:function(e,t,a){var l={"./af":"K/tc","./af.js":"K/tc","./ar":"jnO4","./ar-dz":"o1bE","./ar-dz.js":"o1bE","./ar-kw":"Qj4J","./ar-kw.js":"Qj4J","./ar-ly":"HP3h","./ar-ly.js":"HP3h","./ar-ma":"CoRJ","./ar-ma.js":"CoRJ","./ar-sa":"gjCT","./ar-sa.js":"gjCT","./ar-tn":"bYM6","./ar-tn.js":"bYM6","./ar.js":"jnO4","./az":"SFxW","./az.js":"SFxW","./be":"H8ED","./be.js":"H8ED","./bg":"hKrs","./bg.js":"hKrs","./bm":"p/rL","./bm.js":"p/rL","./bn":"kEOa","./bn.js":"kEOa","./bo":"0mo+","./bo.js":"0mo+","./br":"aIdf","./br.js":"aIdf","./bs":"JVSJ","./bs.js":"JVSJ","./ca":"1xZ4","./ca.js":"1xZ4","./cs":"PA2r","./cs.js":"PA2r","./cv":"A+xa","./cv.js":"A+xa","./cy":"l5ep","./cy.js":"l5ep","./da":"DxQv","./da.js":"DxQv","./de":"tGlX","./de-at":"s+uk","./de-at.js":"s+uk","./de-ch":"u3GI","./de-ch.js":"u3GI","./de.js":"tGlX","./dv":"WYrj","./dv.js":"WYrj","./el":"jUeY","./el.js":"jUeY","./en-au":"Dmvi","./en-au.js":"Dmvi","./en-ca":"OIYi","./en-ca.js":"OIYi","./en-gb":"Oaa7","./en-gb.js":"Oaa7","./en-ie":"4dOw","./en-ie.js":"4dOw","./en-il":"czMo","./en-il.js":"czMo","./en-nz":"b1Dy","./en-nz.js":"b1Dy","./eo":"Zduo","./eo.js":"Zduo","./es":"iYuL","./es-do":"CjzT","./es-do.js":"CjzT","./es-us":"Vclq","./es-us.js":"Vclq","./es.js":"iYuL","./et":"7BjC","./et.js":"7BjC","./eu":"D/JM","./eu.js":"D/JM","./fa":"jfSC","./fa.js":"jfSC","./fi":"gekB","./fi.js":"gekB","./fo":"ByF4","./fo.js":"ByF4","./fr":"nyYc","./fr-ca":"2fjn","./fr-ca.js":"2fjn","./fr-ch":"Dkky","./fr-ch.js":"Dkky","./fr.js":"nyYc","./fy":"cRix","./fy.js":"cRix","./gd":"9rRi","./gd.js":"9rRi","./gl":"iEDd","./gl.js":"iEDd","./gom-latn":"DKr+","./gom-latn.js":"DKr+","./gu":"4MV3","./gu.js":"4MV3","./he":"x6pH","./he.js":"x6pH","./hi":"3E1r","./hi.js":"3E1r","./hr":"S6ln","./hr.js":"S6ln","./hu":"WxRl","./hu.js":"WxRl","./hy-am":"1rYy","./hy-am.js":"1rYy","./id":"UDhR","./id.js":"UDhR","./is":"BVg3","./is.js":"BVg3","./it":"bpih","./it.js":"bpih","./ja":"B55N","./ja.js":"B55N","./jv":"tUCv","./jv.js":"tUCv","./ka":"IBtZ","./ka.js":"IBtZ","./kk":"bXm7","./kk.js":"bXm7","./km":"6B0Y","./km.js":"6B0Y","./kn":"PpIw","./kn.js":"PpIw","./ko":"Ivi+","./ko.js":"Ivi+","./ky":"lgnt","./ky.js":"lgnt","./lb":"RAwQ","./lb.js":"RAwQ","./lo":"sp3z","./lo.js":"sp3z","./lt":"JvlW","./lt.js":"JvlW","./lv":"uXwI","./lv.js":"uXwI","./me":"KTz0","./me.js":"KTz0","./mi":"aIsn","./mi.js":"aIsn","./mk":"aQkU","./mk.js":"aQkU","./ml":"AvvY","./ml.js":"AvvY","./mn":"lYtQ","./mn.js":"lYtQ","./mr":"Ob0Z","./mr.js":"Ob0Z","./ms":"6+QB","./ms-my":"ZAMP","./ms-my.js":"ZAMP","./ms.js":"6+QB","./mt":"G0Uy","./mt.js":"G0Uy","./my":"honF","./my.js":"honF","./nb":"bOMt","./nb.js":"bOMt","./ne":"OjkT","./ne.js":"OjkT","./nl":"+s0g","./nl-be":"2ykv","./nl-be.js":"2ykv","./nl.js":"+s0g","./nn":"uEye","./nn.js":"uEye","./pa-in":"8/+R","./pa-in.js":"8/+R","./pl":"jVdC","./pl.js":"jVdC","./pt":"8mBD","./pt-br":"0tRk","./pt-br.js":"0tRk","./pt.js":"8mBD","./ro":"lyxo","./ro.js":"lyxo","./ru":"lXzo","./ru.js":"lXzo","./sd":"Z4QM","./sd.js":"Z4QM","./se":"//9w","./se.js":"//9w","./si":"7aV9","./si.js":"7aV9","./sk":"e+ae","./sk.js":"e+ae","./sl":"gVVK","./sl.js":"gVVK","./sq":"yPMs","./sq.js":"yPMs","./sr":"zx6S","./sr-cyrl":"E+lV","./sr-cyrl.js":"E+lV","./sr.js":"zx6S","./ss":"Ur1D","./ss.js":"Ur1D","./sv":"X709","./sv.js":"X709","./sw":"dNwA","./sw.js":"dNwA","./ta":"PeUW","./ta.js":"PeUW","./te":"XLvN","./te.js":"XLvN","./tet":"V2x9","./tet.js":"V2x9","./tg":"Oxv6","./tg.js":"Oxv6","./th":"EOgW","./th.js":"EOgW","./tl-ph":"Dzi0","./tl-ph.js":"Dzi0","./tlh":"z3Vd","./tlh.js":"z3Vd","./tr":"DoHr","./tr.js":"DoHr","./tzl":"z1FC","./tzl.js":"z1FC","./tzm":"wQk9","./tzm-latn":"tT3J","./tzm-latn.js":"tT3J","./tzm.js":"wQk9","./ug-cn":"YRex","./ug-cn.js":"YRex","./uk":"raLr","./uk.js":"raLr","./ur":"UpQW","./ur.js":"UpQW","./uz":"Loxo","./uz-latn":"AQ68","./uz-latn.js":"AQ68","./uz.js":"Loxo","./vi":"KSF8","./vi.js":"KSF8","./x-pseudo":"/X5v","./x-pseudo.js":"/X5v","./yo":"fzPg","./yo.js":"fzPg","./zh-cn":"XDpg","./zh-cn.js":"XDpg","./zh-hk":"SatO","./zh-hk.js":"SatO","./zh-tw":"kOpN","./zh-tw.js":"kOpN"};function n(e){var t=r(e);return a(t)}function r(e){var t=l[e];if(!(t+1)){var a=new Error('Cannot find module "'+e+'".');throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(l)},n.resolve=r,e.exports=n,n.id="RnhZ"},TH2d:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("ztar"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},Vorz:function(e,t,a){},"W+9J":function(e,t,a){},"W+xa":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("hrGr"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},WHxd:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=f(a("QbLZ")),n=f(a("iCc5")),r=f(a("V7oC")),o=f(a("FYw3")),s=f(a("mRg0")),i=f(a("TSYQ")),u=f(a("q1tI")),d=f(a("LOOE")),c=f(a("kHHo"));function f(e){return e&&e.__esModule?e:{default:e}}var m=function(e,t){var a={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(a[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(l=Object.getOwnPropertySymbols(e);n<l.length;n++)t.indexOf(l[n])<0&&(a[l[n]]=e[l[n]])}return a},p=function(e){function t(e){(0,n.default)(this,t);var a=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.onClick=function(){var e=a.props,t=e.mode,l=e.onClick;l&&l(),"closable"===t&&a.setState({show:!1})},a.state={show:!0},a}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this.props,t=e.mode,a=e.icon,n=e.onClick,r=e.children,o=e.className,s=e.prefixCls,f=e.action,p=e.marqueeProps,h=m(e,["mode","icon","onClick","children","className","prefixCls","action","marqueeProps"]),v={},g=null;"closable"===t?g=u.default.createElement("div",{className:s+"-operation",onClick:this.onClick,role:"button","aria-label":"close"},f||u.default.createElement(d.default,{type:"cross",size:"md"})):("link"===t&&(g=u.default.createElement("div",{className:s+"-operation",role:"button","aria-label":"go to detail"},f||u.default.createElement(d.default,{type:"right",size:"md"}))),v.onClick=n);var y=(0,i.default)(s,o);return this.state.show?u.default.createElement("div",(0,l.default)({className:y},h,v,{role:"alert"}),a&&u.default.createElement("div",{className:s+"-icon","aria-hidden":"true"},a),u.default.createElement("div",{className:s+"-content"},u.default.createElement(c.default,(0,l.default)({prefixCls:s,text:r},p))),g):null}}]),t}(u.default.Component);t.default=p,p.defaultProps={prefixCls:"am-notice-bar",mode:"",icon:u.default.createElement(d.default,{type:"voice",size:"xxs"}),onClick:function(){}},e.exports=t.default},fGl3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("w8pL"),r=(l=n)&&l.__esModule?l:{default:l};t.default=r.default},hrGr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,r=g(a("QbLZ")),o=g(a("93ya")),s=g(a("Yz+Y")),i=g(a("iCc5")),u=g(a("V7oC")),d=g(a("FYw3")),c=g(a("mRg0"));a("wbnQ");var f=a("q1tI"),m=g(f),p=a("i6OX"),h=g(p),v=g(a("17x9"));function g(e){return e&&e.__esModule?e:{default:e}}var y=(n=l=function(e){function t(){var e,a,l,n;(0,i.default)(this,t);for(var u=arguments.length,c=Array(u),f=0;f<u;f++)c[f]=arguments[f];return a=l=(0,d.default)(this,(e=t.__proto__||(0,s.default)(t)).call.apply(e,[this].concat(c))),l.toBanner=function(e){1===e.bannerType?window.open(e.linkurl,"_blank"):2===e.bannerType&&1===e.ifSkip&&l.props.history.push("/detail?gid="+e.childCategoryId+"&pid="+e.productId)},l.getCom=function(){var e=l.props.item;if(e.moduleDataList.length){var t=e.modelStyle.bannerRollStyleModel.pageMargin,a=void 0===t?0:t,n={boxShadow:"Projection"===e.modelStyle.bannerRollStyleModel.imageStyle?"rgba(47,54,70,0.1) 0px 0px .2rem":"",padding:"0px "+a/50+"rem"};return m.default.createElement("div",{className:"banner-shuffling-box",style:(0,r.default)({},n)},m.default.createElement(o.default,{autoplay:!0,infinite:!0},e.moduleDataList.map(function(t){return m.default.createElement("li",{style:{width:"100%",height:"2.7rem"}},m.default.createElement("a",{key:t.productId,onClick:function(){l.toBanner(t)},style:{display:"inline-block",width:"100%",height:"2.7rem"}},m.default.createElement("img",{src:t.bannerUrl,alt:"",className:"banner-img",style:{width:"100%",verticalAlign:"top",borderRadius:"fillet"===e.modelStyle.bannerRollStyleModel.imageChamfer?".16rem":"0px"}})))})),m.default.createElement("div",{className:"advantage"},m.default.createElement("span",null,m.default.createElement(h.default,{glyph:p.zpbz}),"正品保证"),m.default.createElement("span",null,m.default.createElement(h.default,{glyph:p.zxzk}),"专享折扣"),m.default.createElement("span",null,m.default.createElement(h.default,{glyph:p.jstk}),"急速到账"),m.default.createElement("span",null,m.default.createElement(h.default,{glyph:p.shwy}),"售后无忧")))}return m.default.createElement("div",{className:"banner-shuffling-box"},m.default.createElement(o.default,{autoplay:!0},m.default.createElement("div",null,m.default.createElement("img",{className:"banner-img",src:"https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png"}))))},n=a,(0,d.default)(l,n)}return(0,c.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){return this.getCom()}}]),t}(f.Component),l.propTypes={prop:v.default},n);t.default=y},kHHo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=d(a("QbLZ")),n=d(a("iCc5")),r=d(a("V7oC")),o=d(a("FYw3")),s=d(a("mRg0")),i=d(a("q1tI")),u=d(a("i8i4"));function d(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){(0,n.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={animatedWidth:0,overflowWidth:0},e}return(0,s.default)(t,e),(0,r.default)(t,[{key:"componentDidMount",value:function(){this._measureText(),this._startAnimation()}},{key:"componentDidUpdate",value:function(){this._measureText(),this._marqueeTimer||this._startAnimation()}},{key:"componentWillUnmount",value:function(){clearTimeout(this._marqueeTimer)}},{key:"render",value:function(){var e=this,t=this.props,a=t.prefixCls,n=t.className,r=t.text,o=(0,l.default)({position:"relative",right:this.state.animatedWidth,whiteSpace:"nowrap",display:"inline-block"},this.props.style);return i.default.createElement("div",{className:a+"-marquee-wrap "+n,style:{overflow:"hidden"},role:"marquee"},i.default.createElement("div",{ref:function(t){return e.textRef=t},className:a+"-marquee",style:o},r))}},{key:"_startAnimation",value:function(){var e=this;this._marqueeTimer&&clearTimeout(this._marqueeTimer);var t=1/this.props.fps*1e3,a=0===this.state.animatedWidth?this.props.leading:t;0!==this.state.overflowWidth&&(this._marqueeTimer=setTimeout(function a(){var l=e.state.overflowWidth,n=e.state.animatedWidth+1,r=n>l;if(r){if(!e.props.loop)return;n=0}r&&e.props.trailing?e._marqueeTimer=setTimeout(function(){e.setState({animatedWidth:n}),e._marqueeTimer=setTimeout(a,t)},e.props.trailing):(e.setState({animatedWidth:n}),e._marqueeTimer=setTimeout(a,t))},a))}},{key:"_measureText",value:function(){var e=u.default.findDOMNode(this),t=this.textRef;if(e&&t){var a=e.offsetWidth,l=t.offsetWidth-a;l!==this.state.overflowWidth&&this.setState({overflowWidth:l})}}}]),t}(i.default.Component);t.default=c,c.defaultProps={text:"",loop:!1,leading:500,trailing:800,fps:40,className:""},e.exports=t.default},opUn:function(e,t,a){"use strict";a("v0ko"),a("jIel"),a("Vorz")},phG8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=f(a("QbLZ")),n=f(a("Yz+Y")),r=f(a("iCc5")),o=f(a("V7oC")),s=f(a("FYw3")),i=f(a("mRg0")),u=f(a("q1tI")),d=a("i6OX"),c=f(d);function f(e){return e&&e.__esModule?e:{default:e}}a("W+9J");var m=function(e){function t(){var e,a,o,i;(0,r.default)(this,t);for(var f=arguments.length,m=Array(f),p=0;p<f;p++)m[p]=arguments[p];return a=o=(0,s.default)(this,(e=t.__proto__||(0,n.default)(t)).call.apply(e,[this].concat(m))),o.toList=function(e){o.props.history.push("/list?mid="+e)},o.toDetail=function(e,t){o.props.history.push("/detail?gid="+e+(t?"&pid="+t:""))},o.getCom=function(){var e=o.props.item;if(e.moduleDataList.length){var t=e.modelStyle.flashSaleStyleModel,a=(t.isCountDown,t.titleStyle),n=t.nameColor,r=t.priceColor,s=(t.isSmallImage,{color:n}),i={color:r},f=localStorage.getItem("shopInfo")?JSON.parse(localStorage.getItem("shopInfo")):{};return u.default.createElement("div",{className:"flash-sale-box clearfix"},u.default.createElement("div",{className:"goods-bg"},u.default.createElement("div",{className:"pro-list"},u.default.createElement("div",{className:"title"},u.default.createElement("span",{className:"flash-sale-name",style:{color:a}},f.codeKey===configs.xiaomi?"小米10周年庆":"限时抢购")),u.default.createElement("span",{class:"go-more"},u.default.createElement("span",{onClick:function(){o.toList("active")}},e.moduleDataList[0].textData),u.default.createElement(c.default,{glyph:d.arrowRight}))),u.default.createElement("div",{className:"page-section"},e.moduleDataList[0]&&u.default.createElement("div",{className:"list list1",style:{width:130*e.moduleDataList[0].dataDetailCacheModels.length/50+"rem"}},e.moduleDataList[0].dataDetailCacheModels.map(function(e){return u.default.createElement("div",{className:"scroll-div-item_H item",onClick:function(){o.toDetail(e.childCategoryId,e.productId)}},u.default.createElement("img",{className:"pro-img",src:e.produuctIconPath}),u.default.createElement("div",{className:"info"},u.default.createElement("div",{className:"g-info"},u.default.createElement("div",{className:"name",style:(0,l.default)({},s)},e.productName),u.default.createElement("div",{className:"price",style:(0,l.default)({},i)},u.default.createElement("small",null,"￥"),e.price,u.default.createElement("s",{className:"del-price"},"￥",e.faceValue)))))})))))}return""},i=a,(0,s.default)(o,i)}return(0,i.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){return this.getCom()}}]),t}(u.default.Component);t.default=m},w8pL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=c(a("WHxd")),n=c(a("QbLZ")),r=c(a("Yz+Y")),o=c(a("iCc5")),s=c(a("V7oC")),i=c(a("FYw3")),u=c(a("mRg0"));a("opUn");var d=c(a("q1tI"));function c(e){return e&&e.__esModule?e:{default:e}}a("GbxA");var f=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,u.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.item.modelStyle.noticeStyleModel.background;document.getElementsByClassName("am-notice-bar")[0].style.background=e}},{key:"render",value:function(){var e=this.props.item,t=e.modelStyle.noticeStyleModel.pageMargin,a=e.modelStyle.noticeStyleModel.background,r=e.modelStyle.noticeStyleModel.textColor,o={paddingLeft:t/50+"rem",paddingRight:t/50+"rem"};return d.default.createElement("div",{className:"notice-box",style:(0,n.default)({},o)},d.default.createElement(l.default,{marqueeProps:{loop:!0,style:{color:r,background:a}}},e.moduleDataList[0].textData))}}]),t}(d.default.Component);t.default=f},wXkX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=C(a("QbLZ")),n=C(a("Kl5d")),r=C(a("gDS+")),o=C(a("Yz+Y")),s=C(a("iCc5")),i=C(a("V7oC")),u=C(a("FYw3")),d=C(a("mRg0"));a("TttT");var c=C(a("q1tI")),f=a("MuoO"),m=C(a("Rnav")),p=C(a("Fzi1")),h=C(a("W+xa")),v=C(a("3Lj+")),g=C(a("4u3W")),y=C(a("/BPf")),j=C(a("TH2d")),b=C(a("fGl3")),_=C(a("KntE")),E=C(a("/VLn")),k=C(a("wd/R"));function C(e){return e&&e.__esModule?e:{default:e}}a("Q4S1");var M=function(e){function t(e){(0,s.default)(this,t);var a=(0,u.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));a.isShowHomeModal=function(){var e=(0,k.default)().format("YYYY-MM-DD"),t=localStorage.getItem("showHomoModalStr");if(t){var l=JSON.parse(t);if(e===l.nowDate)if(l.hasShow)a.setState({showHomeModal:!1});else{a.setState({showHomeModal:!0});var n={nowDate:e,hasShow:!0};localStorage.setItem("showHomoModalStr",(0,r.default)(n))}else{a.setState({showHomeModal:!0});var o={nowDate:e,hasShow:!0};localStorage.setItem("showHomoModalStr",(0,r.default)(o))}}else{a.setState({showHomeModal:!0});var s={nowDate:e,hasShow:!0};localStorage.setItem("showHomoModalStr",(0,r.default)(s))}},a.getCom=function(){var e=[];return a.state.allInfo.pageModuleList.map(function(t){"bannerRoll"===t.moduleType?e.push(c.default.createElement(h.default,{item:t,history:a.props.history})):"banner"===t.moduleType?e.push(c.default.createElement(v.default,{item:t,history:a.props.history})):"class"===t.moduleType?e.push(c.default.createElement(g.default,{item:t,history:a.props.history})):"flashSale"===t.moduleType?e.push(c.default.createElement(y.default,{item:t,history:a.props.history})):"imageText"===t.moduleType?e.push(c.default.createElement(j.default,{item:t,history:a.props.history})):"notice"===t.moduleType&&e.push(c.default.createElement(b.default,{item:t,history:a.props.history}))}),e},a.hideModal=function(){var e=a.state.allInfo;e.isPopup=!1,a.setState({allInfo:e})};localStorage.getItem("shopInfo")&&JSON.parse(localStorage.getItem("shopInfo"));return a.state={allInfo:{pageModuleList:[]},showHomeModal:!1},a}return(0,d.default)(t,e),(0,i.default)(t,[{key:"componentWillMount",value:function(){this.isShowHomeModal(),this.props.dispatch({type:"pageSetting/getPage",payload:{pageType:1}})}},{key:"componentWillReceiveProps",value:function(e){var t=this.props,a=e.pageSetting.getPageResult;if(a!==t.pageSetting.getPageResult){var l=a.code,r=a.data,o=a.message;if("0"===l)return this.setState({allInfo:r});n.default.info(o)}}},{key:"render",value:function(){var e=this.state,t=e.allInfo,a=e.showHomeModal;return c.default.createElement("div",{className:"mian-bg "},c.default.createElement(m.default,(0,l.default)({},this.props,{myLoading:!!this.props.loading.models.pageSetting})),c.default.createElement("div",{className:"page-setting-content",style:{background:t.backgroud}},this.getCom()),t.isPopup&&a&&c.default.createElement(E.default,{history:this.props.history,allInfo:t,hideModal:this.hideModal}),t.isSidebar&&c.default.createElement(_.default,{history:this.props.history,allInfo:t}),c.default.createElement(p.default,this.props))}}]),t}(c.default.Component);t.default=(0,f.connect)(function(e){return(0,l.default)({},e)})(M)},xzeO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=d(a("Yz+Y")),n=d(a("iCc5")),r=d(a("V7oC")),o=d(a("FYw3")),s=d(a("mRg0")),i=a("q1tI"),u=d(i);function d(e){return e&&e.__esModule?e:{default:e}}a("DRTB");var c=function(e){function t(e){(0,n.default)(this,t);var a=(0,o.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));return a.toPage=function(){var e=a.props.allInfo;a.props.history.push(e.sidebarDetail.linkUrl)},a.state={showActiveModal:!1},a}return(0,s.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this.props.allInfo;return u.default.createElement(i.Fragment,null,u.default.createElement("div",{className:"active-modal-com",onClick:this.toPage},u.default.createElement("img",{className:"active-modal-com-img",src:e.sidebarDetail.imagePath})))}}]),t}(u.default.Component);t.default=c},ztar:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,r=m(a("Yz+Y")),o=m(a("iCc5")),s=m(a("V7oC")),i=m(a("FYw3")),u=m(a("mRg0")),d=a("q1tI"),c=m(d),f=m(a("17x9"));function m(e){return e&&e.__esModule?e:{default:e}}a("P4jY");var p=(n=l=function(e){function t(){var e,a,l,n;(0,o.default)(this,t);for(var s=arguments.length,u=Array(s),d=0;d<s;d++)u[d]=arguments[d];return a=l=(0,i.default)(this,(e=t.__proto__||(0,r.default)(t)).call.apply(e,[this].concat(u))),l.toBanner=function(e){1===e.bannerType?window.open(e.linkurl,"_blank"):2===e.bannerType&&1===e.ifSkip&&l.props.history.push("/detail?gid="+e.childCategoryId+"&pid="+e.productId)},l.getCom=function(){var e=l.props.item,t=e.moduleDataList.length;if(t){var a=e.modelStyle.imageTextStyleModel,n=a.background,r=a.textColor,o=a.rowNum,s=a.isSlide,i=365/o;return c.default.createElement("div",{className:"image-text-box clearfix",style:{background:n,overflowX:s?"scroll":"inherit"}},c.default.createElement("div",{className:"image-text-box-content clearfix",style:{width:s?(i*t+10)/50+"rem":"7.3rem"}},e.moduleDataList.map(function(e){return c.default.createElement("div",{class:"item",style:{width:i/50+"rem"},onClick:function(){return l.toBanner(e)}},c.default.createElement("img",{src:e.bannerUrl}),c.default.createElement("div",{class:"name font-clamp",style:{color:r}},e.textData))})))}return c.default.createElement("div",{className:"banner-advertising-box clearfix",style:{background:e.modelStyle.imageTextStyleModel.background}},c.default.createElement("div",{className:"banner-advertising-box-img float-left"},c.default.createElement("img",{src:"https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png"})))},n=a,(0,i.default)(l,n)}return(0,u.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){return this.getCom()}}]),t}(d.Component),l.propTypes={prop:f.default},n);t.default=p}}]);