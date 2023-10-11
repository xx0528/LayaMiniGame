import WX_wcjtn_API from "../../WXAPI";
import _wcjtn_ShareAd_wcjtn_ from "../../ShareAd/ShareAd";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";
import App_wcjtn_Config from "../../AppConfig";
import TT_wcjtn_API from "../../TTAPI";
import VIVO_wcjtn_API from "../../VIVOAPI";

export default class KRQ__wcjtn_Com_wcjtn_Base extends Laya.Script 
{
    public Ad_wcjtn_Pos_wcjtn_ID : number = -10086;

    public get _wcjtn_Sprite_wcjtn_()
    {
        return this.owner as Laya.Sprite;
    }

    protected _datas : Array<any> = [];

    public get _wcjtn_Data_wcjtn_()
    {
        return this._data;
    }
    protected _data : any = null;

    public ref_wcjtn_resh(onComplate? : Function)
    {
        let self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if(null != onComplate)
                {
                    onComplate();
                }
            }
        },false)
    }

    protected navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(d? : any)
    {
        var data = null == d ? this._data : d;
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
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
            else if(Laya.Browser.onVVMiniGame)
            {
                VIVO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.url,(res)=>
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
            else if (App_wcjtn_Config.onTTMiniGame) {
                TT_wcjtn_API.showMoreGamesModal(() => {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                }, () => {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                });
            }
        }
    }

    
    public _wcjtn_show_wcjtn_()
    {
        this._wcjtn_Sprite_wcjtn_.visible = true;
    }

    public _wcjtn_hide_wcjtn_()
    {
        this._wcjtn_Sprite_wcjtn_.visible = false;
    }

    protected auto_wcjtn_Scroll_wcjtn_Text(text : Laya.Text)
    {
        if(text.overflow != Laya.Text.SCROLL)
            return;
        let forward : boolean = true;
        let deltaDis : number = 0;
        Laya.timer.frameLoop(1,text,()=>
        {
            let d = Laya.timer.delta / 1000 * 10;
            deltaDis += d;
            if(deltaDis >= text.textWidth / 2)
            {
                forward = !forward;
                deltaDis = 0;
            }
            if(forward)
            {
                text.scrollX += d;
            }
            else
            {
                text.scrollX -= d;
            }
        })
    }
}