import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import Utilit from "../../../Utilit";
import ShareAd from "../../../ShareAd/ShareAd";
import ViewMgr from "../../../Mgr/ViewMgr";
import ViewBase from "../../ViewBase";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../../Mgr/WXADMgr";
import Share_ppxhc_Ad from "../../../ShareAd/ShareAd";
import WudianMgr from "../../../Mgr/WudianMgr";

export default class Exprot2View_ppxhc_Template extends TemplateViewBase 
{
    protected _continue_ppxhc_Btn : Laya.Sprite = null;
    protected _krqVLoop_ppxhc_Ad : KRQ_VLoopAd = null;
    protected _KRQ_VLoopAd : Laya.Clip = null;

    protected _isCanClose : boolean = false;
    protected _banner : WXBannder_ppxhc_Ad = null;

    onAwake()
    {
        super.onAwake();
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._krqVLoop_ppxhc_Ad.useLocalRandom = true;
        this._krqVLoop_ppxhc_Ad.useRandom = false;
        this._krqVLoop_ppxhc_Ad.useMovePause = false;
        this._krqVLoop_ppxhc_Ad.sortDatas = this.sortDatas;
        this._continue_ppxhc_Btn = this.View.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_ppxhc_Btn.visible = false;
        let self = this;
        if(WudianMgr.Wudian_ppxhc_Flag && 1 == AppSwitchConfig.getInstance().getAppSwitchData().continueBanner)
        {
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBtnDelayTime * 1000,self,()=>
            {
                self._continue_ppxhc_Btn.visible = true;
                Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBannerShowTime * 1000,self,()=>
                {
                    self.ShowBanner();
                    Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBannerHideTime * 1000,self,()=>
                    {
                        self._isCanClose = true;
                        if(null != self._banner)
                        {
                            self._banner.hide();
                        }
                        self._banner = null;
                    })
    
                })
            })
        }
        else
        {
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBtnDelayTime * 1000,self,()=>
            {
                self._continue_ppxhc_Btn.visible = true;
                self._isCanClose = true;
            })
        }

        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit.isIphoneX_())
        {
            this._KRQ_VLoopAd.top =  this._KRQ_VLoopAd.top + 75;
        }
    }

    onStart()
    {
        this._krqVLoop_ppxhc_Ad.AdPos_ppxhc_ID = Share_ppxhc_Ad.MoreGameLocationID;
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
        this._continue_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    remove_ppxhc_Event()
    {
        super.remove_ppxhc_Event();
        this._continue_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected ShowBanner()
    {
        let self = this;
        WXADMgr.getBanner((banner : WXBannder_ppxhc_Ad)=>
        {
            if(null != self._banner)
            {
                self._banner.hide();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                self._banner.show();
            }
            else
            {
                this._isCanClose = true;
            }
            if(this.isShowHistoryBtn)
            {
                self.History_ppxhc_Btn.visible = true;
            }
        });
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner.hide();
        }
        this._banner = null;
    }

    protected onContinueBtn()
    {
        if(!this._isCanClose)
            return;
        let self = this;
        let excute = ()=>
        {
            self.closeView();//关闭此界面
            //todo:你关闭此界面之后你的逻辑
        }
        ViewMgr.instance.tryShowPopAd((v : ViewBase)=> //尝试打开 ViewDef.Export3View 界面
        {
            if(null != v)//成功打开 ViewDef.Export3View 界面
            {
                v.onCloseEvent = ()=> //当 ViewDef.Export3View 界面关闭 后执行你的逻辑
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

    protected sortDatas(datas: any): any 
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
