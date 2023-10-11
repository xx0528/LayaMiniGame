import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import WX_wcjtn_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";

export default class Insert_wcjtn_Ad_wcjtn_View extends Laya.Script 
{
    public Ad_wcjtn_Pos_wcjtn_ID : number = _wcjtn_ShareAd_wcjtn_.Insert_wcjtn_AdLocationID;
    protected _dis_wcjtn_play_wcjtn_Sp : Laya.Sprite;
    protected _wcjtn__data_wcjtn_ : any = null;

    onAwake()
    {
        this._dis_wcjtn_play_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._dis_wcjtn_play_wcjtn_Sp)
        {
            this._dis_wcjtn_play_wcjtn_Sp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.refresh_wcjtn_Banner_wcjtn_Dis();
        this._dis_wcjtn_play_wcjtn_Sp.on(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    onDisable(): void 
    {
        this._dis_wcjtn_play_wcjtn_Sp.off(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    protected refresh_wcjtn_Banner_wcjtn_Dis()
    {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._dis_wcjtn_play_wcjtn_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._dis_wcjtn_play_wcjtn_Sp.destroyed)
                    {
                        self._dis_wcjtn_play_wcjtn_Sp.width = 550;
                        self._dis_wcjtn_play_wcjtn_Sp.height = 670;
                        self._dis_wcjtn_play_wcjtn_Sp.scale(1,1);
                    }
                }));
                self._wcjtn__data_wcjtn_ = data;
            }
        },false)
    }

    protected on_wcjtn_Sp_wcjtn_Click()
    {
        var data = this._wcjtn__data_wcjtn_;
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