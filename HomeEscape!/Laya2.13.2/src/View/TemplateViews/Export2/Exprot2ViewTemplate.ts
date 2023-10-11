import ryw_TemplateViewBase from "../TemplateViewBase";
import ryw_KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_Utilit from "../../../Utilit";
import ryw_ShareAd from "../../../ShareAd/ShareAd";
import ryw_ViewMgr, { ryw_ViewDef } from "../../../Mgr/ViewMgr";
import ryw_ViewBase from "../../ViewBase";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../../Mgr/WXADMgr";
import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_WXAPI from "../../../WXAPI";

export default class ryw_Exprot2ViewTemplate extends ryw_TemplateViewBase 
{
    protected ryw__continueBtn : Laya.Sprite = null;
    protected ryw__krqVLoopAd : ryw_KRQ_VLoopAd = null;
    protected ryw__KRQ_VLoopAd : Laya.Clip = null;

    protected _isCanClose : boolean = false;
    protected _banner : ryw_WXBannderAd = null;

    protected  _waitBanner:  boolean  =  false;

    onAwake()
    {
        super.onAwake();
        this.ryw__krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
        this.ryw__krqVLoopAd.ryw_useLocalRandom = true;
        this.ryw__krqVLoopAd.ryw_useRandom = false;
        this.ryw__krqVLoopAd.ryw_useMovePause = false;
        this.ryw__krqVLoopAd.ryw_sortDatas = this.ryw_sortDatas;
        this.ryw__continueBtn = this.ryw_View.getChildByName("ContinueBtn") as Laya.Sprite;
        this.ryw__continueBtn.visible = false;
        let self = this;
        if(ryw_WudianMgr.ryw_WudianFlag && 1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBanner)
        {
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000,self,()=>
            {
                self.ryw__continueBtn.visible = true;
                self._waitBanner = true;
            })
        }
        else
        {
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000,self,()=>
            {
                self.ryw__continueBtn.visible = true;
                self._isCanClose = true;
                self._waitBanner = false;
            })
        }

        this.ryw__KRQ_VLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__KRQ_VLoopAd.top =  this.ryw__KRQ_VLoopAd.top + 75;
        }
    }

    onStart()
    {
        this.ryw__krqVLoopAd.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
        super.onStart();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__continueBtn.on(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__continueBtn.off(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    protected ShowBanner()
    {
        let self = this;
        ryw_WXADMgr.ryw_getBanner((banner : ryw_WXBannderAd)=>
        {
            if(null != self._banner)
            {
                self._banner.ryw_hide();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                self._banner.ryw_show();
            }
            else
            {
                this._isCanClose = true;
            }
            if(this.isShowHistoryBtn)
            {
                self.ryw_HistoryBtn.visible = true;
            }
        });
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner.ryw_hide();
        }
        this._banner = null;
    }

    protected ryw_onContinueBtn()
    {
        let self = this;
        if (this._waitBanner){
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBannerShowTime * 1000,self,()=>
            {
                self.ShowBanner();
                Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBannerHideTime * 1000,self,()=>
                {
                    self._isCanClose = true;
                    if(null != self._banner)
                    {
                        self._banner.ryw_hide();
                    }
                    self._banner = null;
                })

            })
            this._waitBanner = false
            return ;
        }

        if(!this._isCanClose)
            return;
        let excute = ()=>
        {

            let openGameView = ()=>{
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v:ryw_ViewBase)=>{
                    (v.owner as Laya.View).zOrder = 1;
                    self.ryw_closeView();
                });
            }

            ryw_WXAPI.tryShowWXCrazyClick("下次努力",openGameView,()=>{
                self.ryw_closeView();
            },()=>{
                openGameView();
            })

            // self.ryw_closeView();//关闭此界面
            //todo:你关闭此界面之后你的逻辑
        }
        ryw_ViewMgr.ryw_instance.tryShowPopAd((v : ryw_ViewBase)=> //尝试打开 ViewDef.Export3View 界面
        {
            if(null != v)//成功打开 ViewDef.Export3View 界面
            {
                v.ryw_onCloseEvent = ()=> //当 ViewDef.Export3View 界面关闭 后执行你的逻辑
                {
                    excute();
                }
            }
            else
            {
                excute();  //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        })
    }

    protected ryw_sortDatas(datas: any): any 
    {
        if (null == datas || 0 == datas.length)
            return [];
        let dataDic: { [appid: string]: any[] } = {};
        let keys = new Array<string>();
        for (let i = 0; i < datas.length; ++i) {
            let data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        for (let i = 0; i < keys.length; ++i)  {
            let key = keys[i];
            let randomIndex = Math.floor(Math.random() * keys.length);
            let temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (let i = 0; i < keys.length; ++i)  {
            let key = keys[i];
            let dataArray = dataDic[key];
            for (let j = 0; j < dataArray.length; ++j)  {
                let data = dataArray[j];
                let randomIndex = Math.floor(Math.random() * dataArray.length);
                let temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        let res = new Array<any>();
        let ignores = [];
        while(keys.length > 0)
        {
            let isComplate = true;
            for(let i=0;i < keys.length;++i)
            {
                let key = keys[i];
                let isOk = true;
                for(let j=0;j < ignores.length;++j)
                {
                    let ignore = ignores[j];
                    if(ignore == key)
                    {
                        isOk = false;
                        break;
                    }
                }
                if(isOk)
                {
                    isComplate = false;
                    let data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if(ignores.length > 3)
                    {
                        ignores.shift();
                    }
                    if(dataDic[key].length <= 0)
                    {
                        keys.splice(i,1);
                        --i;
                        continue;
                    }
                }
                else
                {
                    continue;
                }
            }
            if(isComplate)
            {
                for (let j = 0; j < keys.length; ++j)  
                {
                    let key = keys[j];
                    let isOk = true;
                    let dataArray = dataDic[key];
                    ignores.splice(0);
                    for(let h=0;h < dataArray.length;++h)
                    {
                        let data = dataArray[h];
                        for (let i = 0; i < res.length; ++i) 
                        {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                            for(let k=0;k < ignores.length;++k)
                            {
                                let ignore = ignores[k];
                                if(null != ignore && ignore == key)
                                {
                                    isOk = false;
                                    break;
                                }
                            }
                            if(isOk)
                            {
                                if (null != data) {
                                    let f = res.slice(0, i + 1);
                                    let b = res.slice(i + 1, res.length);
                                    res = f;
                                    res.push(data);
                                    for (let a = 0; a < b.length; ++a) {
                                        res.push(b[a]);
                                    }
                                }
                            }
                        }
                    }
 
                }
                break;
            }
            for (let i = 0; i < keys.length; ++i)  {
                let key = keys[i];
                let randomIndex = Math.floor(Math.random() * keys.length);
                let temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
        }
        return res;
    }
}
