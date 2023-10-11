import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import Utilit_wcjtn_ from "../../Utilit";
import WX_wcjtn_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";

export default class Single_wcjtn_Ani_wcjtn_ADView extends Laya.Script 
{
    public Ad_wcjtn_Pos_wcjtn_ID : number = _wcjtn_ShareAd_wcjtn_.AniAd_wcjtn_LocationID;
    protected _owner_wcjtn_Sprite :Laya.Sprite;
    protected _animation_wcjtn_ : Laya.Animation;
    protected _data_wcjtn_ : any = null;

    onAwake()
    {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
        this._animation_wcjtn_ = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refresh_wcjtn_ADVD_wcjtn_is();
        this._owner_wcjtn_Sprite.on(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_wcjtn_Sprite.off(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    protected refresh_wcjtn_ADVD_wcjtn_is()
    {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._owner_wcjtn_Sprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._animation_wcjtn_.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._animation_wcjtn_.play(0,true);
                }));
                self._data_wcjtn_ = data;
            }
            else
            {
                self._owner_wcjtn_Sprite.visible = false;
            }
        },false)
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