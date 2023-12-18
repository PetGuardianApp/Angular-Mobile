/*! svg.filter.js - v2.0.2 - 2016-02-24
        * https://github.com/wout/svg.filter.js
        * Copyright (c) 2016 Wout Fierens; Licensed MIT */
function(){SVG.Filter=SVG.invent({create:"filter",inherit:SVG.Parent,extend:{source:"SourceGraphic",sourceAlpha:"SourceAlpha",background:"BackgroundImage",backgroundAlpha:"BackgroundAlpha",fill:"FillPaint",stroke:"StrokePaint",autoSetIn:!0,put:function(g,m){return this.add(g,m),!g.attr("in")&&this.autoSetIn&&g.attr("in",this.source),g.attr("result")||g.attr("result",g),g},blend:function(g,m,v){return this.put(new SVG.BlendEffect(g,m,v))},colorMatrix:function(g,m){return this.put(new SVG.ColorMatrixEffect(g,m))},convolveMatrix:function(g){return this.put(new SVG.ConvolveMatrixEffect(g))},componentTransfer:function(g){return this.put(new SVG.ComponentTransferEffect(g))},composite:function(g,m,v){return this.put(new SVG.CompositeEffect(g,m,v))},flood:function(g,m){return this.put(new SVG.FloodEffect(g,m))},offset:function(g,m){return this.put(new SVG.OffsetEffect(g,m))},image:function(g){return this.put(new SVG.ImageEffect(g))},merge:function(){var g=[void 0];for(var m in arguments)g.push(arguments[m]);return this.put(new(SVG.MergeEffect.bind.apply(SVG.MergeEffect,g)))},gaussianBlur:function(g,m){return this.put(new SVG.GaussianBlurEffect(g,m))},morphology:function(g,m){return this.put(new SVG.MorphologyEffect(g,m))},diffuseLighting:function(g,m,v){return this.put(new SVG.DiffuseLightingEffect(g,m,v))},displacementMap:function(g,m,v,w,E){return this.put(new SVG.DisplacementMapEffect(g,m,v,w,E))},specularLighting:function(g,m,v,w){return this.put(new SVG.SpecularLightingEffect(g,m,v,w))},tile:function(){return this.put(new SVG.TileEffect)},turbulence:function(g,m,v,w,E){return this.put(new SVG.TurbulenceEffect(g,m,v,w,E))},toString:function(){return"url(#"+this.attr("id")+")"}}}),SVG.extend(SVG.Defs,{filter:function(g){var m=this.put(new SVG.Filter);return"function"==typeof g&&g.call(m,m),m}}),SVG.extend(SVG.Container,{filter:function(g){return this.defs().filter(g)}}),SVG.extend(SVG.Element,SVG.G,SVG.Nested,{filter:function(g){return this.filterer=g instanceof SVG.Element?g:this.doc().filter(g),this.doc()&&this.filterer.doc()!==this.doc()&&this.doc().defs().add(this.filterer),this.attr("filter",this.filterer),this.filterer},unfilter:function(g){return this.filterer&&!0===g&&this.filterer.remove(),delete this.filterer,this.attr("filter",null)}}),SVG.Effect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(g){return null==g?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",g)},result:function(g){return null==g?this.attr("result"):this.attr("result",g)},toString:function(){return this.result()}}}),SVG.ParentEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Parent,extend:{in:function(g){return null==g?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",g)},result:function(g){return null==g?this.attr("result"):this.attr("result",g)},toString:function(){return this.result()}}});var L={blend:function(g,m){return this.parent()&&this.parent().blend(this,g,m)},colorMatrix:function(g,m){return this.parent()&&this.parent().colorMatrix(g,m).in(this)},convolveMatrix:function(g){return this.parent()&&this.parent().convolveMatrix(g).in(this)},componentTransfer:function(g){return this.parent()&&this.parent().componentTransfer(g).in(this)},composite:function(g,m){return this.parent()&&this.parent().composite(this,g,m)},flood:function(g,m){return this.parent()&&this.parent().flood(g,m)},offset:function(g,m){return this.parent()&&this.parent().offset(g,m).in(this)},image:function(g){return this.parent()&&this.parent().image(g)},merge:function(){return this.parent()&&this.parent().merge.apply(this.parent(),[this].concat(arguments))},gaussianBlur:function(g,m){return this.parent()&&this.parent().gaussianBlur(g,m).in(this)},morphology:function(g,m){return this.parent()&&this.parent().morphology(g,m).in(this)},diffuseLighting:function(g,m,v){return this.parent()&&this.parent().diffuseLighting(g,m,v).in(this)},displacementMap:function(g,m,v,w){return this.parent()&&this.parent().displacementMap(this,g,m,v,w)},specularLighting:function(g,m,v,w){return this.parent()&&this.parent().specularLighting(g,m,v,w).in(this)},tile:function(){return this.parent()&&this.parent().tile().in(this)},turbulence:function(g,m,v,w,E){return this.parent()&&this.parent().turbulence(g,m,v,w,E).in(this)}};SVG.extend(SVG.Effect,L),SVG.extend(SVG.ParentEffect,L),SVG.ChildEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(g){this.attr("in",g)}}});var a={blend:function(g,m,v){this.attr({in:g,in2:m,mode:v||"normal"})},colorMatrix:function(g,m){"matrix"==g&&(m=h(m)),this.attr({type:g,values:void 0===m?null:m})},convolveMatrix:function(g){g=h(g),this.attr({order:Math.sqrt(g.split(" ").length),kernelMatrix:g})},composite:function(g,m,v){this.attr({in:g,in2:m,operator:v})},flood:function(g,m){this.attr("flood-color",g),null!=m&&this.attr("flood-opacity",m)},offset:function(g,m){this.attr({dx:g,dy:m})},image:function(g){this.attr("href",g,SVG.xlink)},displacementMap:function(g,m,v,w,E){this.attr({in:g,in2:m,scale:v,xChannelSelector:w,yChannelSelector:E})},gaussianBlur:function(g,m){this.attr("stdDeviation",null!=g||null!=m?function(v){if(!Array.isArray(v))return v;for(var w=0,E=v.length,D=[];w<E;w++)D.push(v[w]);return D.join(" ")}(Array.prototype.slice.call(arguments)):"0 0")},morphology:function(g,m){this.attr({operator:g,radius:m})},tile:function(){},turbulence:function(g,m,v,w,E){this.attr({numOctaves:m,seed:v,stitchTiles:w,baseFrequency:g,type:E})}},l={merge:function(){var g;if(arguments[0]instanceof SVG.Set){var m=this;arguments[0].each(function(w){this instanceof SVG.MergeNode?m.put(this):(this instanceof SVG.Effect||this instanceof SVG.ParentEffect)&&m.put(new SVG.MergeNode(this))})}else{g=Array.isArray(arguments[0])?arguments[0]:arguments;for(var v=0;v<g.length;v++)g[v]instanceof SVG.MergeNode?this.put(g[v]):this.put(new SVG.MergeNode(g[v]))}},componentTransfer:function(g){if(this.rgb=new SVG.Set,["r","g","b","a"].forEach(function(v){this[v]=new(SVG["Func"+v.toUpperCase()])("identity"),this.rgb.add(this[v]),this.node.appendChild(this[v].node)}.bind(this)),g)for(var m in g.rgb&&(["r","g","b"].forEach(function(v){this[v].attr(g.rgb)}.bind(this)),delete g.rgb),g)this[m].attr(g[m])},diffuseLighting:function(g,m,v){this.attr({surfaceScale:g,diffuseConstant:m,kernelUnitLength:v})},specularLighting:function(g,m,v,w){this.attr({surfaceScale:g,diffuseConstant:m,specularExponent:v,kernelUnitLength:w})}},u={distantLight:function(g,m){this.attr({azimuth:g,elevation:m})},pointLight:function(g,m,v){this.attr({x:g,y:m,z:v})},spotLight:function(g,m,v,w,E,D){this.attr({x:g,y:m,z:v,pointsAtX:w,pointsAtY:E,pointsAtZ:D})},mergeNode:function(g){this.attr("in",g)}};function h(g){return Array.isArray(g)&&(g=new SVG.Array(g)),g.toString().replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")}function p(){var g=function(){};for(var m in"function"==typeof arguments[arguments.length-1]&&(g=arguments[arguments.length-1],Array.prototype.splice.call(arguments,arguments.length-1,1)),arguments)for(var v in arguments[m])g(arguments[m][v],v,arguments[m])}["r","g","b","a"].forEach(function(g){u["Func"+g.toUpperCase()]=function(m){switch(this.attr("type",m),m){case"table":this.attr("tableValues",arguments[1]);break;case"linear":this.attr("slope",arguments[1]),this.attr("intercept",arguments[2]);break;case"gamma":this.attr("amplitude",arguments[1]),this.attr("exponent",arguments[2]),this.attr("offset",arguments[2])}}}),p(a,function(g,m){var v=m.charAt(0).toUpperCase()+m.slice(1);SVG[v+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+v)),g.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.Effect,extend:{}})}),p(l,function(g,m){var v=m.charAt(0).toUpperCase()+m.slice(1);SVG[v+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+v)),g.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.ParentEffect,extend:{}})}),p(u,function(g,m){var v=m.charAt(0).toUpperCase()+m.slice(1);SVG[v]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+v)),g.apply(this,arguments)},inherit:SVG.ChildEffect,extend:{}})}),SVG.extend(SVG.MergeEffect,{in:function(g){return g instanceof SVG.MergeNode?this.add(g,0):this.add(new SVG.MergeNode(g),0),this}}),SVG.extend(SVG.CompositeEffect,SVG.BlendEffect,SVG.DisplacementMapEffect,{in2:function(g){return null==g?this.parent()&&this.parent().select('[result="'+this.attr("in2")+'"]').get(0)||this.attr("in2"):this.attr("in2",g)}}),SVG.filter={sepiatone:[.343,.669,.119,0,0,.249,.626,.13,0,0,.172,.334,.111,0,0,0,0,0,1,0]}}.call(void 0),function(){function L(p,g,m,v,w,E,D){for(var A=p.slice(g,m||D),R=v.slice(w,E||D),P=0,F={pos:[0,0],start:[0,0]},z={pos:[0,0],start:[0,0]};A[P]=a.call(F,A[P]),R[P]=a.call(z,R[P]),A[P][0]!=R[P][0]||"M"==A[P][0]||"A"==A[P][0]&&(A[P][4]!=R[P][4]||A[P][5]!=R[P][5])?(Array.prototype.splice.apply(A,[P,1].concat(u.call(F,A[P]))),Array.prototype.splice.apply(R,[P,1].concat(u.call(z,R[P])))):(A[P]=l.call(F,A[P]),R[P]=l.call(z,R[P])),++P!=A.length||P!=R.length;)P==A.length&&A.push(["C",F.pos[0],F.pos[1],F.pos[0],F.pos[1],F.pos[0],F.pos[1]]),P==R.length&&R.push(["C",z.pos[0],z.pos[1],z.pos[0],z.pos[1],z.pos[0],z.pos[1]]);return{start:A,dest:R}}function a(p){switch(p[0]){case"z":case"Z":p[0]="L",p[1]=this.start[0],p[2]=this.start[1];break;case"H":p[0]="L",p[2]=this.pos[1];break;case"V":p[0]="L",p[2]=p[1],p[1]=this.pos[0];break;case"T":p[0]="Q",p[3]=p[1],p[4]=p[2],p[1]=this.reflection[1],p[2]=this.reflection[0];break;case"S":p[0]="C",p[6]=p[4],p[5]=p[3],p[4]=p[2],p[3]=p[1],p[2]=this.reflection[1],p[1]=this.reflection[0]}return p}function l(p){var g=p.length;return this.pos=[p[g-2],p[g-1]],-1!="SCQT".indexOf(p[0])&&(this.reflection=[2*this.pos[0]-p[g-4],2*this.pos[1]-p[g-3]]),p}function u(p){var g=[p];switch(p[0]){case"M":return this.pos=this.start=[p[1],p[2]],g;case"L":p[5]=p[3]=p[1],p[6]=p[4]=p[2],p[1]=this.pos[0],p[2]=this.pos[1];break;case"Q":p[6]=p[4],p[5]=p[3],p[4]=1*p[4]/3+2*p[2]/3,p[3]=1*p[3]/3+2*p[1]/3,p[2]=1*this.pos[1]/3+2*p[2]/3,p[1]=1*this.pos[0]/3+2*p[1]/3;break;case"A":p=(g=function(m,v){var w,E,D,A,R,P,F,z,Y,Q,b,I,O,j,J,Z,_e,me,Pe,le,qe,Ae,Ct,rn,kn,Xn,wi=Math.abs(v[1]),ri=Math.abs(v[2]),Hi=v[3]%360,ws=v[4],ol=v[5],vn=v[6],Va=v[7],Wr=new SVG.Point(m),hi=new SVG.Point(vn,Va),Mc=[];if(0===wi||0===ri||Wr.x===hi.x&&Wr.y===hi.y)return[["C",Wr.x,Wr.y,hi.x,hi.y,hi.x,hi.y]];for((E=(w=new SVG.Point((Wr.x-hi.x)/2,(Wr.y-hi.y)/2).transform((new SVG.Matrix).rotate(Hi))).x*w.x/(wi*wi)+w.y*w.y/(ri*ri))>1&&(wi*=E=Math.sqrt(E),ri*=E),D=(new SVG.Matrix).rotate(Hi).scale(1/wi,1/ri).rotate(-Hi),Wr=Wr.transform(D),P=(A=[(hi=hi.transform(D)).x-Wr.x,hi.y-Wr.y])[0]*A[0]+A[1]*A[1],R=Math.sqrt(P),A[0]/=R,A[1]/=R,F=P<4?Math.sqrt(1-P/4):0,ws===ol&&(F*=-1),z=new SVG.Point((hi.x+Wr.x)/2+F*-A[1],(hi.y+Wr.y)/2+F*A[0]),Y=new SVG.Point(Wr.x-z.x,Wr.y-z.y),Q=new SVG.Point(hi.x-z.x,hi.y-z.y),b=Math.acos(Y.x/Math.sqrt(Y.x*Y.x+Y.y*Y.y)),Y.y<0&&(b*=-1),I=Math.acos(Q.x/Math.sqrt(Q.x*Q.x+Q.y*Q.y)),Q.y<0&&(I*=-1),ol&&b>I&&(I+=2*Math.PI),!ol&&b<I&&(I-=2*Math.PI),Z=[],_e=b,O=(I-b)/(j=Math.ceil(2*Math.abs(b-I)/Math.PI)),J=4*Math.tan(O/4)/3,qe=0;qe<=j;qe++)Pe=Math.cos(_e),me=Math.sin(_e),le=new SVG.Point(z.x+Pe,z.y+me),Z[qe]=[new SVG.Point(le.x+J*me,le.y-J*Pe),le,new SVG.Point(le.x-J*me,le.y+J*Pe)],_e+=O;for(Z[0][0]=Z[0][1].clone(),Z[Z.length-1][2]=Z[Z.length-1][1].clone(),D=(new SVG.Matrix).rotate(Hi).scale(wi,ri).rotate(-Hi),qe=0,Ae=Z.length;qe<Ae;qe++)Z[qe][0]=Z[qe][0].transform(D),Z[qe][1]=Z[qe][1].transform(D),Z[qe][2]=Z[qe][2].transform(D);for(qe=1,Ae=Z.length;qe<Ae;qe++)Ct=(le=Z[qe-1][2]).x,rn=le.y,kn=(le=Z[qe][0]).x,Xn=le.y,vn=(le=Z[qe][1]).x,Mc.push(["C",Ct,rn,kn,Xn,vn,Va=le.y]);return Mc}(this.pos,p))[0]}return p[0]="C",this.pos=[p[5],p[6]],this.reflection=[2*p[5]-p[3],2*p[6]-p[4]],g}function h(p,g){if(!1===g)return!1;for(var m=g,v=p.length;m<v;++m)if("M"==p[m][0])return m;return!1}SVG.extend(SVG.PathArray,{morph:function(p){for(var g=this.value,m=this.parse(p),v=0,w=0,E=!1,D=!1;!1!==v||!1!==w;){var A;E=h(g,!1!==v&&v+1),D=h(m,!1!==w&&w+1),!1===v&&(v=0==(A=new SVG.PathArray(R.start).bbox()).height||0==A.width?g.push(g[0])-1:g.push(["M",A.x+A.width/2,A.y+A.height/2])-1),!1===w&&(w=0==(A=new SVG.PathArray(R.dest).bbox()).height||0==A.width?m.push(m[0])-1:m.push(["M",A.x+A.width/2,A.y+A.height/2])-1);var R=L(g,v,E,m,w,D);g=g.slice(0,v).concat(R.start,!1===E?[]:g.slice(E)),m=m.slice(0,w).concat(R.dest,!1===D?[]:m.slice(D)),v=!1!==E&&v+R.start.length,w=!1!==D&&w+R.dest.length}return this.value=g,this.destination=new SVG.PathArray,this.destination.value=m,this}})}(),
/*! svg.draggable.js - v2.2.2 - 2019-01-08
        * https://github.com/svgdotjs/svg.draggable.js
        * Copyright (c) 2019 Wout Fierens; Licensed MIT */