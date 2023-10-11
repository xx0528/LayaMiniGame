import Hy_myqq_ShareAd from "../HyShareAd";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class HyInsertAdView extends Laya.Script 
{
    public Adv_key : string = Hy_myqq_ShareAd.InsertAdLAdv_key;
    protected _displaySp : Laya.Sprite;
    protected _data : any = null;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._displaySp)
        {
            this._displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.refreshBannerDis();
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshBannerDis()
    {
        var self = this;
        Hy_myqq_ShareAd.get_myqq_ADVs(this.Adv_key,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];
                var picUrl = data.logo_url;
                if(typeof(picUrl) != 'string')
                {
                    picUrl = data.logo_url[0]
                }
                console.log(picUrl);
                self._displaySp.loadImage(picUrl,Laya.Handler.create(self,function()
                {
                    self._displaySp.width = 550;
                    self._displaySp.height = 670;
                    self._displaySp.scale(1,1);
                }));
                self._data = data;
            }
        },false)
    }

    protected onSpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("Hy跳转游戏： " + data.title);
            Hy_myqq_ShareAd.navigateToMiniProgram(data.adv_id,data.appid,data.path,(res)=>
            {
                console.log("Hy跳转成功")
                ALD.aldSendReportAdClickSuccess(data);
            },(res)=>
            {
                console.log("Hy跳转失败")
                Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                if(res.errMsg == "navigateToMiniProgram:fail cancel")
                {
                    console.log("用户取消跳转");
                    ALD.aldSendReportAdClickFail(data);
                }
            },(res)=>
            {
                console.log("Hy跳转完成")
            });
        }
    }
}