!function(){function t(){var e="";try{e=wx.getStorageSync("aldstat_op")}catch(t){e=wx.getStorageSync("aldstat_op")}if(""===e){if(""===i)return"";try{v=e=wx.getStorageSync(i),e&&wx.setStorageSync("aldstat_op",e)}catch(t){v=e=wx.getStorageSync(i),e&&wx.setStorageSync("aldstat_op",e)}}return e}function u(e){var t={};return"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e,n){t["[object "+e+"]"]=e.toLowerCase()}),null==e?e:"object"==typeof e||"function"==typeof e?t[function(e){return Object.prototype.toString.call(e)}.call(e)]||"object":typeof e}function d(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+e()+e()+e()+e()+e()+e()}function f(e,i){function r(){return new Promise(function(t,n){wx.request({url:"https://"+a+".aldwx.com/d.html",data:e,header:{se:m||"",op:v||"",img:N||""},method:"GET",fail:function(){t("")},success:function(e){t(200==e.statusCode?"":"status error")}})})}s.useOpen&&t(),y++,e.as=I,e.at=x,e.rq_c=y,e.ifo=c,e.ak=s.app_key,e.uu=l,e.v=n,e.st=Date.now(),e.ev=i,e.te=o,e.wsr=S,""!==function(e){if(void 0===e||""===e)return"";var t={};for(var n in e)"rawData"!=n&&"errMsg"!=n&&(t[n]=e[n]);return t}(e.ufo)&&(e.ufo=e.ufo),e.ec=w,s.useOpen?""===v?C.push(r):(wx.Queue.push(r),C.concat()):wx.Queue.push(r)}function g(e){var t={};for(var n in e)t[n]=e[n];return t}function h(e){for(var t="",n=0;n<e.length;n++)e[n].length>t.length&&(t=e[n]);return t}var n="3.2.0",a="glog",s=require("./ald-game-conf");""===s.app_key&&console.error("请在配置文件中填写您的app_key"),s.useOpen&&console.warn("提示：开启了useOpen配置后，如果不上传用户opendId则不会上报数据。"),s.app_key=s.app_key.replace(/\s/g,"");var i=s.openKey,o="wg";wx.request({url:"https://"+a+".aldwx.com/config/app.json",method:"GET",success:function(e){200===e.statusCode&&(e.data.version>n&&console.warn("您的SDK不是最新版本，请尽快升级！"),e.data.warn&&console.warn(e.data.warn),e.data.error&&console.error(e.data.error))}});var c="",l=function(){var e="";try{e=wx.getStorageSync("aldstat_uuid"),wx.setStorageSync("ald_ifo",!0)}catch(t){e="uuid_getstoragesync"}if(e)c=!1;else{e=d(),c=!0;try{wx.setStorageSync("aldstat_uuid",e)}catch(e){wx.setStorageSync("aldstat_uuid","uuid_getstoragesync")}}return e}(),p={},m="",v=t(),w=0,y="",S=wx.getLaunchOptionsSync(),_=Date.now(),x=""+Date.now()+Math.floor(1e7*Math.random()),I=""+Date.now()+Math.floor(1e7*Math.random()),q=0,b="",N="",O=!0,j=!1,k=["aldSendEvent","aldOnShareAppMessage","aldShareAppMessage","aldSendSession","aldSendOpenid","aldLevelEvent"],M=["payStart","paySuccess","payFail","die","revive","tools","award"],D=["complete","fail"],L=wx.getStorageSync("ald_level_time")||0,P=wx.getStorageSync("ald_level_session")||"";void 0===wx.Queue&&(wx.Queue=new function(){this.concurrency=4,this.queue=[],this.tasks=[],this.activeCount=0;var e=this;this.push=function(t){this.tasks.push(new Promise(function(n,a){var s=function(){e.activeCount++,t().then(function(e){n(e)}).then(function(){e.next()})};e.activeCount<e.concurrency?s():e.queue.push(s)}))},this.all=function(){return Promise.all(this.tasks)},this.next=function(){e.activeCount--,e.queue.length>0&&e.queue.shift()()}},wx.Queue.all());var C=new function(){this.request=[],this.push=function(e){this.request.length>=18?(this.request.shift(),this.request.push(e)):this.request.push(e)},this.concat=function(){this.request.map(function(e){wx.Queue.push(e)}),this.request=[]}};Promise.all([new Promise(function(e,t){wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(t){N=h(t.userInfo.avatarUrl.split("/")),e(t)},fail:function(){e("")}}):e("")},fail:function(){e("")}})}),new Promise(function(e,t){wx.getNetworkType({success:function(t){e(t)},fail:function(){e("")}})}),new Promise(function(e,t){s.getLocation?wx.getLocation({success:function(t){e(t)},fail:function(){e("")}}):wx.getSetting({success:function(t){t.authSetting["scope.userLocation"]?(wx.getLocation({success:function(t){e(t)},fail:function(){e("")}}),e("")):e("")},fail:function(){e("")}})})]).then(function(e){""!==e[2]?(p.lat=e[2].latitude||"",p.lng=e[2].longitude||"",p.spd=e[2].speed||""):(p.lat="",p.lng="",p.spd=""),""!==e[1]?p.nt=e[1].networkType||"":p.nt="";var t=g(p);""!==e[0]&&(t.ufo=e[0],b=e[0]),f(t,"init")}),wx.onShow(function(e){if(S=e,q=Date.now(),!O&&!j){x=""+Date.now()+Math.floor(1e7*Math.random()),c=!1;try{wx.setStorageSync("ald_ifo",!1)}catch(e){}}O=!1,j=!1;var t=g(p),n=g(p);t.sm=q-_,e.query.ald_share_src&&e.shareTicket&&"1044"===e.scene?(n.tp="ald_share_click",new Promise(function(e,t){"1044"==S.scene?wx.getShareInfo({shareTicket:S.shareTicket,success:function(t){e(t)},fail:function(){e("")}}):e("")}).then(function(e){n.ct=e,f(n,"event")})):e.query.ald_share_src&&(n.tp="ald_share_click",n.ct="1",f(n,"event")),f(t,"show")}),wx.onHide(function(){wx.setStorageSync("ald_level_session","");var e=g(p);e.dr=Date.now()-q,""===b?wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(t){e.ufo=t,b=t,N=h(t.userInfo.avatarUrl.split("/")),f(e,"hide")}}):f(e,"hide")}}):f(e,"hide")}),wx.onError(function(e){var t=g(p);t.tp="ald_error_message",t.ct=e,w++,f(t,"event")});var E={aldSendEvent:function(e,t){var n=g(p);if(""!==e&&"string"==typeof e&&e.length<=255)if(n.tp=e,"string"==typeof t&&t.length<=255)n.ct=String(t),f(n,"event");else if("object"==typeof t){if(JSON.stringify(t).length>=255)return void console.error("自定义事件参数不能超过255个字符");if(function(e){for(var t in e)if("object"==typeof e[t]&&null!==e[t])return!0;return!1}(t))return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");for(var a in t)"number"==typeof t[a]&&(t[a]=t[a]+"s##");n.ct=JSON.stringify(t),f(n,"event")}else void 0===t||""===t?f(n,"event"):console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符");else console.error("事件名称必须为String类型且不能超过255个字符")},aldOnShareAppMessage:function(e){wx.onShareAppMessage(function(){j=!0;var t=e(),n="";n=void 0!==S.query.ald_share_src?void 0!==t.query?(S.query.ald_share_src.indexOf(l),t.query+"&ald_share_src="+S.query.ald_share_src+","+l):(S.query.ald_share_src.indexOf(l),"ald_share_src="+S.query.ald_share_src+","+l):void 0!==t.query?t.query+"&ald_share_src="+l:"ald_share_src="+l,"undefined"!=u(t.ald_desc)&&(n+="&ald_desc="+t.ald_desc),t.query=n;var a=g(p);return a.ct=t,a.ct.sho=1,a.tp="ald_share_chain",f(a,"event"),t})},aldShareAppMessage:function(e){j=!0;var t=e,n="";n=void 0!==S.query.ald_share_src?void 0!==t.query?(S.query.ald_share_src.indexOf(l),t.query+"&ald_share_src="+S.query.ald_share_src+","+l):(S.query.ald_share_src.indexOf(l),"ald_share_src="+S.query.ald_share_src+","+l):void 0!==t.query?t.query+"&ald_share_src="+l:"ald_share_src="+l;var a=g(p);"undefined"!=u(t.ald_desc)&&(n+="&ald_desc="+t.ald_desc),t.query=n,a.ct=t,a.tp="ald_share_chain",f(a,"event"),wx.shareAppMessage(t)},aldSendSession:function(e){if(""!==e&&e){var t=g(p);t.tp="session",t.ct="session",m=e,""===b?wx.getSetting({success:function(e){e.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(e){t.ufo=e,f(t,"event")}}):f(t,"event")}}):(t.ufo=b,""!==b&&(t.gid=""),f(t,"event"))}else console.error("请传入从后台获取的session_key")},aldSendOpenid:function(e){if(""!==e&&e){v=e,wx.setStorageSync("aldstat_op","openid");var t=g(p);t.tp="openid",t.ct="openid",f(t,"event")}else console.error("openID不能为空")}};wx.aldStage=new function(){function e(e){return!/^\d+(.\d+)*$/.test(e.stageId)||e.stageId.length>32||isNaN(Number(e.stageId))?(console.warn("关卡stageId必须符合传参规则,请参考文档。"),!1):!("string"!==u(e.stageName)||e.stageName.length>32)||(console.warn("关卡名称为必传字段,且长度小于32个字符,请参考文档"),!1)}var t="",n="",a=0;this.onStart=function(s){if(e(s)){var r={};a=Date.now(),r.sid=s.stageId,r.snm=s.stageName,("string"===u(s.userId)&&s.userId)<32?r.uid=s.userId:r.uid="",r.state="start",n=d(),t=r,this.request()}},this.onRunning=function(n){if(e(n)){var a={params:{}};if(("string"===u(n.userId)&&n.userId)<32?a.uid=n.userId:a.uid="","string"!==u(n.event)&&-1===M.join(",").indexOf(n.event+","))return void console.warn("关卡running状态中仅支持"+M.join(",")+"事件类型，且为必传字段，详情请参考文档。");if(a.event=n.event,"object"!==u(n.params))return void console.warn("关卡running状态中params为必传字段，且该字段需为Object类型，详情请参考文档。");if("string"!==u(n.params.itemName)||n.params.itemName.length>32)return void console.warn("道具/商品名称为必传字段，且长度小于32个字符，详情请参考文档");a.params.itnm=n.params.itemName,"string"===u(n.params.itemId)&&n.params.itemId.length<32&&(a.params.itid=n.params.itemId),"number"===u(n.params.itemCount)&&toString(n.params.itemCount).length<32?a.params.itco=n.params.itemCount:a.params.itco=1,-1!==n.event.indexOf("pay")&&("number"===u(n.params.itemMoney)&&toString(n.params.itemMoney).length<32?a.params.money=n.params.itemMoney:a.params.money=0),"string"===u(n.params.desc)&&n.params.desc.length<64&&(a.params.desc=n.params.desc),a.state="running",a.sid=n.stageId,a.snm=n.stageName,t=a,this.request()}},this.onEnd=function(n){if(e(n)){var s={state:"end"};if(("string"===u(n.userId)&&n.userId)<32?s.uid=n.userId:s.uid="",!u(n.event)&&-1!==D.join(",").indexOf(n.event+","))return void D.join(",");s.sid=n.stageId,s.snm=n.stageName,s.event=n.event,s.sdr=0!==a?Date.now()-a:"",s.params={},"object"===u(n.params)&&"string"===u(n.params.desc)&&n.params.desc.length<64&&(s.params.desc=n.params.desc),t=s,this.request()}},this.request=function(){var e=g(p);t.ss=n,e.ct=t,f(e,"screen")}},wx.aldLevel=new function(){function e(e){return!/^\d+(.\d+)*$/.test(e.levelId)||e.levelId.length>32||isNaN(Number(e.levelId))?(console.warn("levelId必须符合传参规则,请参考文档。"),!1):!("string"!==u(e.levelName)||e.levelName.length>32)||(console.warn("levelName为必传字段,且长度小于32个字符,请参考文档"),!1)}var t="",n="",a=0;this.onInitLevel=function(a){if(e(a)){var s={};""==P?(n=d(),wx.setStorageSync("ald_level_session",n)):n=P,s.lid=a.levelId,s.lnm=a.levelName,("string"===u(a.userId)&&a.userId)<32?s.uid=a.userId:s.uid="",s.un=a.userName,s.state="init",t=s,this.request()}},this.onSetLevel=function(s){if(e(s)){var r={};n=d(),wx.setStorageSync("ald_level_session",n),r.lid=s.levelId,r.lnm=s.levelName,("string"===u(s.userId)&&s.userId)<32?r.uid=s.userId:r.uid="",r.un=s.userName,r.state="set",r.tmr=0!==L?Date.now()-L:"",a=Date.now(),wx.setStorageSync("ald_level_time",a),t=r,this.request()}},this.onPaySuccess=function(n){if(e(n)){var a={params:{}};if("object"!==u(n.params))return void console.warn("关卡paySuccess状态中params为必传字段，且该字段需为Object类型，详情请参考文档。");"number"===u(n.params.amount)&&toString(n.params.amount).length<32?a.params.am=n.params.amount:a.params.am=0,"string"===u(n.params.desc)&&n.params.desc.length<64&&(a.params.desc=n.params.desc),a.lid=n.levelId,a.lnm=n.levelName,("string"===u(n.userId)&&n.userId)<32?a.uid=n.userId:a.uid="",a.un=n.userName,a.state="paySuccess",t=a,this.request()}},this.onPayFail=function(n){if(e(n)){var a={params:{}};if("object"!==u(n.params))return void console.warn("关卡payFile状态中params为必传字段，且该字段需为Object类型，详情请参考文档。");"number"===u(n.params.amount)&&toString(n.params.amount).length<32?a.params.am=n.params.amount:a.params.am=0,"string"===u(n.params.desc)&&n.params.desc.length<64&&(a.params.desc=n.params.desc),a.lid=n.levelId,a.lnm=n.levelName,("string"===u(n.userId)&&n.userId)<32?a.uid=n.userId:a.uid="",a.un=n.userName,a.state="payFail",t=a,this.request()}},this.request=function(){var e=g(p);t.ls=n,e.ct=t,f(e,"level")}};for(var A=0;A<k.length;A++)!function(e,t){Object.defineProperty(wx,e,{value:t,writable:!1,enumerable:!0,configurable:!0})}(k[A],E[k[A]]);try{var T=wx.getSystemInfoSync();p.br=T.brand||"",p.md=T.model,p.pr=T.pixelRatio,p.sw=T.screenWidth,p.sh=T.screenHeight,p.ww=T.windowWidth,p.wh=T.windowHeight,p.lang=T.language,p.wv=T.version,p.sv=T.system,p.wvv=T.platform,p.fs=T.fontSizeSetting,p.wsdk=T.SDKVersion,p.bh=T.benchmarkLevel||"",p.bt=T.battery||"",p.wf=T.wifiSignal||"",p.lng="",p.lat="",p.nt="",p.spd="",p.ufo=""}catch(e){}}();