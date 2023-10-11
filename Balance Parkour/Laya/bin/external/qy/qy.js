var tjconf = { app_key: "wxd09759fff80aaecd", getLocation: false ,adv_key: "",company: "renyou"};
/* 使用说明：
 * 配置对象 tjconf 的 app_key 属性的值 改成自己的appid
 * 将 qy.js 放小游戏根目录; 在 game.js  最上面引入：require('qy.js');
 * 测试部署：自定义编译条件，进入场景选择1037，设置appid:wx3df1cf2a43a6b16d,其他随便设置
 * 查看network请求 Request URL:https://api.game.hnquyou.com/api/Report/report.html
 * 查看请求参数wsr是否为：{query: {}, scene: 1037, referrerInfo: {extraData: {}, appId: "wx3df1cf2a43a6b16d"}} 如果是object就是出错了
 * 再查看响应值格式是否为：{"rtime":20,"uid":"7355555"}，然后让运营查看后台是否有统计数据
 */
"use strict";var _Mathfloor=Math.floor,_typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(z){return typeof z}:function(z){return z&&"function"==typeof Symbol&&z.constructor===Symbol&&z!==Symbol.prototype?"symbol":typeof z},hexcase=0,b64pad="",chrsz=8;function hex_md5(z){return binl2hex(core_md5(str2binl(z),z.length*chrsz))}function b64_md5(z){return binl2b64(core_md5(str2binl(z),z.length*chrsz))}function str_md5(z){return binl2str(core_md5(str2binl(z),z.length*chrsz))}function hex_hmac_md5(z,A){return binl2hex(core_hmac_md5(z,A))}function b64_hmac_md5(z,A){return binl2b64(core_hmac_md5(z,A))}function str_hmac_md5(z,A){return binl2str(core_hmac_md5(z,A))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc")}function core_md5(z,A){z[A>>5]|=128<<A%32,z[(A+64>>>9<<4)+14]=A;for(var B=1732584193,C=-271733879,E=-1732584194,F=271733878,G=0;G<z.length;G+=16){var H=B,J=C,K=E,L=F;B=md5_ff(B,C,E,F,z[G+0],7,-680876936),F=md5_ff(F,B,C,E,z[G+1],12,-389564586),E=md5_ff(E,F,B,C,z[G+2],17,606105819),C=md5_ff(C,E,F,B,z[G+3],22,-1044525330),B=md5_ff(B,C,E,F,z[G+4],7,-176418897),F=md5_ff(F,B,C,E,z[G+5],12,1200080426),E=md5_ff(E,F,B,C,z[G+6],17,-1473231341),C=md5_ff(C,E,F,B,z[G+7],22,-45705983),B=md5_ff(B,C,E,F,z[G+8],7,1770035416),F=md5_ff(F,B,C,E,z[G+9],12,-1958414417),E=md5_ff(E,F,B,C,z[G+10],17,-42063),C=md5_ff(C,E,F,B,z[G+11],22,-1990404162),B=md5_ff(B,C,E,F,z[G+12],7,1804603682),F=md5_ff(F,B,C,E,z[G+13],12,-40341101),E=md5_ff(E,F,B,C,z[G+14],17,-1502002290),C=md5_ff(C,E,F,B,z[G+15],22,1236535329),B=md5_gg(B,C,E,F,z[G+1],5,-165796510),F=md5_gg(F,B,C,E,z[G+6],9,-1069501632),E=md5_gg(E,F,B,C,z[G+11],14,643717713),C=md5_gg(C,E,F,B,z[G+0],20,-373897302),B=md5_gg(B,C,E,F,z[G+5],5,-701558691),F=md5_gg(F,B,C,E,z[G+10],9,38016083),E=md5_gg(E,F,B,C,z[G+15],14,-660478335),C=md5_gg(C,E,F,B,z[G+4],20,-405537848),B=md5_gg(B,C,E,F,z[G+9],5,568446438),F=md5_gg(F,B,C,E,z[G+14],9,-1019803690),E=md5_gg(E,F,B,C,z[G+3],14,-187363961),C=md5_gg(C,E,F,B,z[G+8],20,1163531501),B=md5_gg(B,C,E,F,z[G+13],5,-1444681467),F=md5_gg(F,B,C,E,z[G+2],9,-51403784),E=md5_gg(E,F,B,C,z[G+7],14,1735328473),C=md5_gg(C,E,F,B,z[G+12],20,-1926607734),B=md5_hh(B,C,E,F,z[G+5],4,-378558),F=md5_hh(F,B,C,E,z[G+8],11,-2022574463),E=md5_hh(E,F,B,C,z[G+11],16,1839030562),C=md5_hh(C,E,F,B,z[G+14],23,-35309556),B=md5_hh(B,C,E,F,z[G+1],4,-1530992060),F=md5_hh(F,B,C,E,z[G+4],11,1272893353),E=md5_hh(E,F,B,C,z[G+7],16,-155497632),C=md5_hh(C,E,F,B,z[G+10],23,-1094730640),B=md5_hh(B,C,E,F,z[G+13],4,681279174),F=md5_hh(F,B,C,E,z[G+0],11,-358537222),E=md5_hh(E,F,B,C,z[G+3],16,-722521979),C=md5_hh(C,E,F,B,z[G+6],23,76029189),B=md5_hh(B,C,E,F,z[G+9],4,-640364487),F=md5_hh(F,B,C,E,z[G+12],11,-421815835),E=md5_hh(E,F,B,C,z[G+15],16,530742520),C=md5_hh(C,E,F,B,z[G+2],23,-995338651),B=md5_ii(B,C,E,F,z[G+0],6,-198630844),F=md5_ii(F,B,C,E,z[G+7],10,1126891415),E=md5_ii(E,F,B,C,z[G+14],15,-1416354905),C=md5_ii(C,E,F,B,z[G+5],21,-57434055),B=md5_ii(B,C,E,F,z[G+12],6,1700485571),F=md5_ii(F,B,C,E,z[G+3],10,-1894986606),E=md5_ii(E,F,B,C,z[G+10],15,-1051523),C=md5_ii(C,E,F,B,z[G+1],21,-2054922799),B=md5_ii(B,C,E,F,z[G+8],6,1873313359),F=md5_ii(F,B,C,E,z[G+15],10,-30611744),E=md5_ii(E,F,B,C,z[G+6],15,-1560198380),C=md5_ii(C,E,F,B,z[G+13],21,1309151649),B=md5_ii(B,C,E,F,z[G+4],6,-145523070),F=md5_ii(F,B,C,E,z[G+11],10,-1120210379),E=md5_ii(E,F,B,C,z[G+2],15,718787259),C=md5_ii(C,E,F,B,z[G+9],21,-343485551),B=safe_add(B,H),C=safe_add(C,J),E=safe_add(E,K),F=safe_add(F,L)}return[B,C,E,F]}function md5_cmn(z,A,B,C,E,F){return safe_add(bit_rol(safe_add(safe_add(A,z),safe_add(C,F)),E),B)}function md5_ff(z,A,B,C,E,F,G){return md5_cmn(A&B|~A&C,z,A,E,F,G)}function md5_gg(z,A,B,C,E,F,G){return md5_cmn(A&C|B&~C,z,A,E,F,G)}function md5_hh(z,A,B,C,E,F,G){return md5_cmn(A^B^C,z,A,E,F,G)}function md5_ii(z,A,B,C,E,F,G){return md5_cmn(B^(A|~C),z,A,E,F,G)}function core_hmac_md5(z,A){var B=str2binl(z);16<B.length&&(B=core_md5(B,z.length*chrsz));for(var C=Array(16),E=Array(16),F=0;16>F;F++)C[F]=909522486^B[F],E[F]=1549556828^B[F];var G=core_md5(C.concat(str2binl(A)),512+A.length*chrsz);return core_md5(E.concat(G),640)}function safe_add(z,A){var B=(65535&z)+(65535&A);return(z>>16)+(A>>16)+(B>>16)<<16|65535&B}function bit_rol(z,A){return z<<A|z>>>32-A}function str2binl(z){for(var A=[],C=0;C<z.length*chrsz;C+=chrsz)A[C>>5]|=(z.charCodeAt(C/chrsz)&(1<<chrsz)-1)<<C%32;return A}function binl2str(z){for(var A="",C=0;C<32*z.length;C+=chrsz)A+=String.fromCharCode(z[C>>5]>>>C%32&(1<<chrsz)-1);return A}function binl2hex(z){for(var A="0123456789abcdef",B="",C=0;C<4*z.length;C++)B+=A.charAt(15&z[C>>2]>>8*(C%4)+4)+A.charAt(15&z[C>>2]>>8*(C%4));return B}function binl2b64(z){for(var E,B="",C=0;C<4*z.length;C+=3){E=(255&z[C>>2]>>8*(C%4))<<16|(255&z[C+1>>2]>>8*((C+1)%4))<<8|255&z[C+2>>2]>>8*((C+2)%4);for(var F=0;4>F;F++)B+=8*C+6*F>32*z.length?b64pad:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63&E>>6*(3-F))}return B}!window.wx||function(){function A(){return new Promise(function(oa){""==ia&&wx.login({success:function success(qa){ia=qa.code,console.log(ia+"---------"),oa("")}})})}function B(){return new Promise(function(oa){wx.getNetworkType({success:function(ra){oa(ra)},fail:function(){oa("")}})})}function C(){return new Promise(function(oa){"1044"==$.scene?wx.getShareInfo({shareTicket:$.shareTicket,success:function(ra){oa(ra)},fail:function(){oa("")}}):oa("")})}function E(){return new Promise(function(oa){Q.getLocation?wx.getLocation({success:function(ra){oa(ra)},fail:function(){oa("")}}):wx.getSetting({success:function(ra){ra.authSetting["scope.userLocation"]?(wx.getLocation({success:function(ta){oa(ta)},fail:function(){oa("")}}),oa("")):oa("")},fail:function(){oa("")}})})}function F(){function oa(){return _Mathfloor(65536*(1+Math.random())).toString(16).substring(1)}return oa()+oa()+oa()+oa()+oa()+oa()+oa()+oa()}function G(oa,pa,qa){function ra(){return new Promise(function(sa){var ua=wx.getStorageSync("tjxx");if(void 0!==ua.openid)for(qa in ua)oa[qa]=ua[qa];if(""==oa.cd)sa("");else{Z++;wx.request({url:"https://api.game.hnquyou.com/api/Report/report.html",data:oa,header:{se:W||"",op:X||"",img:fa||"",au:tjconf.company},method:"POST",success:function(xa){wx.setStorageSync("tjxx",xa.data),clearTimeout(ha),ga=!0,void 0!==xa.data.rtime&&0<parseInt(xa.data.rtime)?ha=setTimeout(function(){G(oa,sa,2)},1e3*parseInt(xa.data.rtime)):void 0!==ua.rtime&&0<parseInt(ua.rtime)&&(ha=setTimeout(function(){G(oa,sa,2)},1e3*parseInt(ua.rtime)))},fail:function(){ga=!0,void 0!==ua.rtime&&0<parseInt(ua.rtime)&&(clearTimeout(ha),ha=setTimeout(function(){G(oa,sa,2)},1e3*parseInt(ua.rtime)))}})}})}oa.rq_c=Z,oa.cd=ia,oa.ifo=R,oa.ak=Q.app_key,oa.uu=U,oa.v=L,oa.st=Date.now(),oa.ev=pa,oa.wsr=$,oa.ufo=H(oa.ufo),oa.ec=Y,void 0===qa?wx.Queue.push(ra):ra()}function H(oa){if(void 0===oa||""===oa)return"";var pa={};for(var qa in oa)"rawData"!=qa&&"errMsg"!=qa&&(pa[qa]=oa[qa]);return pa}function J(oa){var pa={};for(var qa in oa)pa[qa]=oa[qa];return pa}function K(oa){for(var pa="",qa=0;qa<oa.length;qa++)oa[qa].length>pa.length&&(pa=oa[qa]);return pa}wx.Queue=new function(){this.concurrency=200,this.queue=[],this.tasks=[],this.activeCount=0;var oa=this;this.push=function(pa){this.tasks.push(new Promise(function(qa){var sa=function(){oa.activeCount++,pa().then(function(ua){qa(ua)}).then(function(){oa.next()})};oa.activeCount<oa.concurrency?sa():oa.queue.push(sa)})),console.log("3")},this.all=function(){return console.log("4"),Promise.all(this.tasks)},this.next=function(){console.log("5"),oa.activeCount--,0<oa.queue.length&&oa.queue.shift()()}},wx.Queue.all();var L="1.0.0",Q=tjconf;""===Q.app_key&&console.error("\u8BF7\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u586B\u5199\u60A8\u7684app_key"),Q.app_key=Q.app_key.replace(/\s/g,"");var ha,R="",U=function(){var oa="";try{oa=wx.getStorageSync("h_stat_uuid"),wx.setStorageSync("h_ifo",!0)}catch(pa){oa="uuid_getstoragesync"}if(oa)R=!1;else{oa=F(),R=!0;try{wx.setStorageSync("h_stat_uuid",oa)}catch(pa){wx.setStorageSync("h_stat_uuid","uuid_getstoragesync")}}return oa}(),V={},W="",X="",Y=0,Z="",$=wx.getLaunchOptionsSync(),aa=Date.now(),ba=""+Date.now()+_Mathfloor(1e7*Math.random()),ca=""+Date.now()+_Mathfloor(1e7*Math.random()),da=0,ea="",fa="",ga=!1,ia="",ja=!0,ka=["h_SendEvent","h_OnShareAppMessage","h_ShareAppMessage","h_SendSession","h_SendOpenid","h_GetAdv","h_ClickAd","h_ToMinProgram","h_GetAdvList"];(function(){return Promise.all([A(),B(),E()])})().then(function(oa){""===oa[2]?(V.lat="",V.lng="",V.spd=""):(V.lat=oa[2].latitude||"",V.lng=oa[2].longitude||"",V.spd=oa[2].speed||""),V.nt=""===oa[1]?"":oa[1].networkType||"";var pa=J(V);""!==oa[0]&&(pa.ufo=oa[0],ea=oa[0]),G(pa,"init")}),wx.onShow(function(oa){Z=0,$=oa,da=Date.now(),ja||(ba=""+Date.now()+_Mathfloor(1e7*Math.random()),R=!1,wx.setStorageSync("h_ifo",!1)),ja=!1;var pa=J(V),qa=J(V);pa.sm=da-aa,oa.query.h_share_src&&oa.shareTicket&&"1044"===oa.scene?(qa.tp="h_share_click",C().then(function(ra){qa.ct=ra,G(qa,"event")})):oa.query.h_share_src&&(qa.tp="h_share_click",qa.ct="1",G(qa,"event")),G(pa,"show")}),wx.onHide(function(){var oa=J(V);oa.dr=Date.now()-da,""===ea?wx.getSetting({success:function(qa){qa.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(sa){oa.ufo=sa,ea=sa,fa=K(sa.userInfo.avatarUrl.split("/")),G(oa,"hide")}}):G(oa,"hide")}}):G(oa,"hide")}),wx.onError(function(oa){var pa=J(V);pa.tp="h_error_message",pa.ct=oa,Y++,G(pa,"event")});for(var la={h_SendEvent:function(pa,qa){var ra=J(V);""!==pa&&"string"==typeof pa&&255>=pa.length?(ra.tp=pa,"string"==typeof qa&&255>=qa.length?(ra.ct=qa+"",G(ra,"event")):"object"==("undefined"==typeof qa?"undefined":_typeof(qa))?(255<=JSON.stringify(qa).length&&console.error("\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u53C2\u6570\u4E0D\u80FD\u8D85\u8FC7255\u4E2A\u5B57\u7B26"),ra.ct=JSON.stringify(qa),G(ra,"event")):void 0===qa||""===qa?G(ra,"event"):console.error("\u4E8B\u4EF6\u53C2\u6570\u5FC5\u987B\u4E3AString,Object\u7C7B\u578B,\u4E14\u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7255\u4E2A\u5B57\u7B26")):console.error("\u4E8B\u4EF6\u540D\u79F0\u5FC5\u987B\u4E3AString\u7C7B\u578B\u4E14\u4E0D\u80FD\u8D85\u8FC7255\u4E2A\u5B57\u7B26")},h_OnShareAppMessage:function(pa){wx.updateShareMenu({withShareTicket:!0,complete:function(){wx.onShareAppMessage(function(){var ra=pa(),sa="",ta="";sa=void 0===ra.success?"":ra.success,ta=void 0===ra.fail?"":ra.fail;var ua="";ua=void 0===$.query.h_share_src?void 0===ra.query?"h_share_src="+U:ra.query+"&h_share_src="+U:void 0===ra.query?($.query.h_share_src.indexOf(U),"h_share_src="+$.query.h_share_src+","+U):($.query.h_share_src.indexOf(U),ra.query+"&h_share_src="+$.query.h_share_src+","+U);var va=J(V);return ra.query=ua,va.ct=ra,va.tp="h_share_chain",G(va,"event"),ra.success=function(wa){va.tp="h_share_status",G(va,"event"),""!==sa&&sa(wa)},ra.fail=function(wa){va.tp="h_share_fail",G(va,"event"),""!==ta&&ta(wa)},ra})}})},h_ShareAppMessage:function(pa){var qa=pa,ra="",sa="";ra=void 0===qa.success?"":qa.success,sa=void 0===qa.fail?"":qa.fail;var ta="";ta=void 0===$.query.h_share_src?void 0===qa.query?"h_share_src="+U:qa.query+"&h_share_src="+U:void 0===qa.query?($.query.h_share_src.indexOf(U),"h_share_src="+$.query.h_share_src+","+U):($.query.h_share_src.indexOf(U),qa.query+"&h_share_src="+$.query.h_share_src+","+U),qa.query=ta;var ua=J(V);ua.ct=qa,ua.tp="h_share_chain",G(ua,"event"),qa.success=function(va){ua.tp="h_share_status",G(ua,"event"),""!==ra&&ra(va)},qa.fail=function(va){ua.tp="h_share_fail",G(ua,"event"),""!==sa&&sa(va)},wx.updateShareMenu({withShareTicket:!0,complete:function(){wx.shareAppMessage(qa)}})},h_SendSession:function(pa){if(""===pa||!pa)return void console.error("\u8BF7\u4F20\u5165\u4ECE\u540E\u53F0\u83B7\u53D6\u7684session_key");var qa=J(V);qa.tp="session",qa.ct="session",W=pa,""===ea?wx.getSetting({success:function(sa){sa.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(ua){qa.ufo=ua,G(qa,"event")}}):G(qa,"event")}}):(qa.ufo=ea,""!=ea&&(qa.gid=""),G(qa,"event"))},h_SendOpenid:function(pa){if(""===pa||!pa)return void console.error("openID\u4E0D\u80FD\u4E3A\u7A7A");X=pa;var qa=J(V);qa.tp="openid",qa.ct="openid",G(qa,"event")},h_GetAdv:function(pa){var qa=tjconf;""===qa.adv_key&&console.error("\u8BF7\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u586B\u5199\u60A8\u7684adv_key"),qa.adv_key=qa.adv_key.replace(/\s/g,""),timelog=Date.now();var ra="object"===("undefined"==typeof pa?"undefined":_typeof2(pa))?pa:{};wx.request({url:"https://api.game.hnquyou.com/api/Sw/getAdvByIndex.html",data:{key:qa.adv_key,timelog:timelog,sign:hex_md5("key:"+qa.adv_key+"timelog:"+timelog)},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",au:tjconf.company},success:function success(sa){"function"==typeof ra.success&&ra.success(sa.data)},fail:function fail(sa){"function"==typeof ra.fail&&ra.fail(sa.data)},complete:function complete(sa){"function"==typeof ra.complete&&ra.complete(sa.data)}})},h_ClickAd:function(pa,qa){if(pa){var ra=wx.getStorageSync("tjxx"),sa=Date.now(),ta=0;ra&&"object"===("undefined"==typeof ra?"undefined":_typeof2(ra))&&200===ra.Status&&(ta=ra.Result.uid?ra.Result.uid:ta),wx.request({url:"https://api.game.hnquyou.com/api/Sw/clickad.html",data:{adv_id:pa,timelog:sa,type:qa,uid:ta,sign:hex_md5("adv_id:"+pa+"timelog:"+sa+"type:"+qa+"uid:"+ta)},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",au:tjconf.company},success:function success(){},fail:function fail(){},complete:function complete(){}})}},h_ToMinProgram:function(pa){var qa=pa,ra="",sa="";ra=void 0===qa.success?"":qa.success,sa=void 0===qa.fail?"":qa.fail,qa.success=function(ta){"object"===("undefined"==typeof wx?"undefined":_typeof2(wx))&&"function"==typeof wx.h_ClickAd&&"object"===("undefined"==typeof qa?"undefined":_typeof2(qa))&&qa.adv_id&&wx.h_ClickAd(qa.adv_id,1),"function"==typeof ra&&ra(ta)},qa.fail=function(ta){"function"==typeof sa&&sa(ta)},wx&&wx.navigateToMiniProgram&&("function"==typeof wx.h_ClickAd&&"object"===("undefined"==typeof qa?"undefined":_typeof2(qa))&&qa.adv_id&&wx.h_ClickAd(qa.adv_id,0),wx.navigateToMiniProgram(qa))},h_GetAdvList:function(pa){var qa=Date.now(),ra="object"===("undefined"==typeof pa?"undefined":_typeof2(pa))?pa:{},sa=ra.adv_key?ra.adv_key:"";wx.request({url:"https://api.game.hnquyou.com/api/Sw/getAllAdvByIndex.html",data:{key:sa,timelog:qa,sign:hex_md5("key:"+sa+"timelog:"+qa)},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",au:tjconf.company},success:function success(ta){"function"==typeof ra.success&&ra.success(ta.data)},fail:function fail(ta){"function"==typeof ra.fail&&ra.fail(ta.data)},complete:function complete(ta){"function"==typeof ra.complete&&ra.complete(ta.data)}})}},ma=0;ma<ka.length;ma++)!function(oa,pa){Object.defineProperty(wx,oa,{value:pa,writable:!1,enumerable:!0,configurable:!0})}(ka[ma],la[ka[ma]]);try{var na=wx.getSystemInfoSync();V.br=na.brand||"",V.md=na.model,V.pr=na.pixelRatio,V.sw=na.screenWidth,V.sh=na.screenHeight,V.ww=na.windowWidth,V.wh=na.windowHeight,V.lang=na.language,V.wv=na.version,V.sv=na.system,V.wvv=na.platform,V.fs=na.fontSizeSetting,V.wsdk=na.SDKVersion,V.bh=na.benchmarkLevel||"",V.bt=na.battery||"",V.wf=na.wifiSignal||"",V.lng="",V.lat="",V.nt="",V.spd="",V.ufo=""}catch(oa){}}();