import Hy_myqq_ShareAd from "../HyShareAd";
import Utilit from "../../Utilit";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class HySingleAdView extends Laya.Script 
{
    public Adv_key : string = Hy_myqq_ShareAd.LoopAdAdv_key;
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
        this.refreshADVDis();
        Laya.timer.loop(3000,this,this.refreshADVDis);

        this._ownerSprite.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshADVDis()
    {
        var self = this;
        Hy_myqq_ShareAd.get_myqq_ADVs(this.Adv_key,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                (self.owner as Laya.Sprite).visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                var picUrl = data.logo_url;
                if(typeof(picUrl) != 'string')
                {
                    picUrl = data.logo_url[0]
                }
                console.log(picUrl);
                self._displaySp.loadImage(picUrl,Laya.Handler.create(self,function()
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                    self._displaySp.scale(this._originSize,this._originSize);
                }));
                var str = String(data.title);
                var num = str.length;
                var fontSize = Math.floor((5 / num) * this._fontSize);
                self._disText.fontSize = fontSize;
                self._disText.text = str;
                self._data = data;
            }
            else
            {
                (this.owner as Laya.Sprite).visible = false;
            }
        })
    }

    onUpdate()
    {
        this.displayAni();
    }

    protected displayAni()
    {
        if(!this._aniForward)
        {
            var scale = this._displaySp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this._displaySp.scale(scale,scale);
            if(this._displaySp.scaleX <= 0.95 * this._originSize)
            {
                this._aniForward = true;
            }
        }
        else
        {
            var scale = this._displaySp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._originSize);
            this._displaySp.scale(scale,scale);
            if(this._displaySp.scaleX >= this._originSize)
            {
                this._aniForward = false;
            }
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