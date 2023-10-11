import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import Utilit_wcjtn_ from "../../Utilit";
import WX_wcjtn_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";

export default class Single_wcjtn_Ad_wcjtn_View extends Laya.Script 
{
    public Ad_wcjtn_Pos_wcjtn_ID : number = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;
    protected _owner_wcjtn_Sprite :Laya.Sprite;
    protected _display_wcjtn_Sp : Laya.Sprite;
    protected _dis_wcjtn_Text : Laya.Text;
    protected _ani_wcjtn_Forward : boolean = false;
    protected _data_wcjtn_ : any = null;
    protected _font_wcjtn_Size = 25;
    protected _origin_wcjtn_Size = 1;
    protected _origin_wcjtn_W : number = 150;
    protected _origin_wcjtn_H : number = 150;

    onAwake()
    {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
        this._display_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origin_wcjtn_W = this._display_wcjtn_Sp.width;
        this._origin_wcjtn_H = this._display_wcjtn_Sp.height;
        this._dis_wcjtn_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_wcjtn_Text.text = "";
        this._font_wcjtn_Size = this._dis_wcjtn_Text.fontSize;
        this._origin_wcjtn_Size =  this._display_wcjtn_Sp.scaleX;
    }
    
    onEnable(): void 
    {
        this.refresh_wcjtn_AD_wcjtn_VDis();
        Laya.timer.loop(3000,this,this.refresh_wcjtn_AD_wcjtn_VDis);

        this._owner_wcjtn_Sprite.on(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_wcjtn_Sprite.off(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    protected refresh_wcjtn_AD_wcjtn_VDis()
    {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._display_wcjtn_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._display_wcjtn_Sp.destroyed)
                        {
                            self._display_wcjtn_Sp.width = self._origin_wcjtn_W;
                            self._display_wcjtn_Sp.height = self._origin_wcjtn_H;
                            self._display_wcjtn_Sp.scale(self._origin_wcjtn_Size,self._origin_wcjtn_Size);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this._font_wcjtn_Size);
                    self._dis_wcjtn_Text.fontSize = fontSize;
                    self._dis_wcjtn_Text.text = str;
                    self._data_wcjtn_ = data;
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
        this.display_wcjtn_Ani();
    }

    protected display_wcjtn_Ani()
    {
        if(!this._ani_wcjtn_Forward)
        {
            var scale = this._display_wcjtn_Sp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this._display_wcjtn_Sp.scale(scale,scale);
            if(this._display_wcjtn_Sp.scaleX <= 0.95 * this._origin_wcjtn_Size)
            {
                this._ani_wcjtn_Forward = true;
            }
        }
        else
        {
            var scale = this._display_wcjtn_Sp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._origin_wcjtn_Size);
            this._display_wcjtn_Sp.scale(scale,scale);
            if(this._display_wcjtn_Sp.scaleX >= this._origin_wcjtn_Size)
            {
                this._ani_wcjtn_Forward = false;
            }
        }
    }

    protected on_wcjtn_Sp_wcjtn_Click()
    {
        var data = this._data_wcjtn_;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WX_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQ_wcjtn_Mini_wcjtn_GameAPI.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}