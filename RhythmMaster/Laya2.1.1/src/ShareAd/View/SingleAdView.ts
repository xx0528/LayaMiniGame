import Share_myqq_Ad from "../ShareAd";
import Utilit from "../../Utilit";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class Single_myqq_AdView extends Laya.Script 
{
    public AdPosID : number = Share_myqq_Ad.LoopAdLocationID;
    protected _ownerSprite :Laya.Sprite;
    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _aniForward : boolean = false;
    protected _data : any = null;
    protected _fontSize = 25;
    protected _originSize = 1;
    protected _originW : number = 150;
    protected _originH : number = 150;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
        this._originSize =  this._displaySp.scaleX;
    }
    
    onEnable(): void 
    {
        this.refresh_myqq_ADVDis();
        Laya.timer.loop(3000,this,this.refresh_myqq_ADVDis);

        this._ownerSprite.on(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    protected refresh_myqq_ADVDis()
    {
        var self = this;
        Share_myqq_Ad.get_myqq_ADVs(this.AdPosID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._displaySp.destroyed)
                        {
                            self._displaySp.width = self._originW;
                            self._displaySp.height = self._originH;
                            self._displaySp.scale(self._originSize,self._originSize);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    // var fontSize = Math.floor((5 / num) * this._fontSize);
                    // self._disText.fontSize = fontSize;
                    self._disText.text = str;
                    self._data = data;
                }
                else
                {
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onUpdate()
    {
        this.display_myqq_Ani();
    }

    protected display_myqq_Ani()
    {
        let box = this.owner as Laya.UIComponent;
        if(!this._aniForward)
        {
            var scale = box.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            box.scale(scale,scale);
            if(box.scaleX <= 0.95 * this._originSize)
            {
                this._aniForward = true;
            }
        }
        else
        {
            var scale = box.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._originSize);
            box.scale(scale,scale);
            if(box.scaleX >= this._originSize)
            {
                this._aniForward = false;
            }
        }
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