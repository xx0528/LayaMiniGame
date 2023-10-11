import Share_myqq_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class Insert_myqq_AdView extends Laya.Script 
{
    public AdPosID : number = Share_myqq_Ad.InsertAdLocationID;
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
        this.refresh_myqq_BannerDis();
        this._displaySp.on(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    protected refresh_myqq_BannerDis()
    {
        var self = this;
        Share_myqq_Ad.get_myqq_ADVs(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._displaySp.destroyed)
                    {
                        self._displaySp.width = 550;
                        self._displaySp.height = 670;
                        self._displaySp.scale(1,1);
                    }
                }));
                self._data = data;
            }
        },false)
    }

    protected on_myqq_SpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
            {
                console.log("跳转成功")
                Share_myqq_Ad.reportUserClick(data.appid);
                ALD.aldSendReportAdClickSuccess(data);
            },(res)=>
            {
                console.log("跳转失败")
                Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                if(res.errMsg == "navigateToMiniProgram:fail cancel")
                {
                    console.log("用户取消跳转");
                    ALD.aldSendReportAdClickFail(data);
                }
            },(res)=>
            {
                console.log("跳转完成")
            });
        }
    }
}