import WXAPI from "../../WXAPI";
import Hy_myqq_ShareAd from "../HyShareAd";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class HyLoopAdBox extends Laya.Script 
{
    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _data : any = null;
    protected _originW : number = 150;
    protected _originH : number = 150;
    protected _fontSize = 25;
    

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    }
    
    onEnable(): void 
    {
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    public setData(data)
    {
        if(data)
        {
            var self = this;
            var picUrl = data.logo_url;
            if(typeof(picUrl) != 'string')
            {
                picUrl = data.logo_url[0]
            }
            console.log(picUrl);
            this._displaySp.loadImage(picUrl,Laya.Handler.create(this,function()
            {
                self._displaySp.width = self._originW;
                self._displaySp.height = self._originH;
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this._fontSize);
            this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
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