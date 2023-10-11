import W_XYXZS_XAPI from "../../WXAPI";
import Shar_XYXZS_eAd from "../../ShareAd/ShareAd";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class KRQ__XYXZS_ComBase extends Laya.Script 
{
    public AdP_XYXZS_osID : number = -10086;

    public get Sp_XYXZS_rite()
    {
        return this.owner as Laya.Sprite;
    }

    protected _da_XYXZS_tas : Array<any> = [];

    public get Da_XYXZS_ta()
    {
        return this._d_XYXZS_ata;
    }
    protected _d_XYXZS_ata : any = null;

    public re_XYXZS_fres(onComplate? : Function)
    {
        let self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(null != datas)
            {
                self._da_XYXZS_tas = datas;
                self._d_XYXZS_ata = self._da_XYXZS_tas[Math.floor(Math.random() * datas.length)];
                if(null != onComplate)
                {
                    onComplate();
                }
            }
        },false)
    }

    protected navigateT_XYXZS_oMiniProgram(d? : any)
    {
        var data = null == d ? this._d_XYXZS_ata : d;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    
    public show()
    {
        this.Sp_XYXZS_rite.visible = true;
    }

    public hide()
    {
        this.Sp_XYXZS_rite.visible = false;
    }

    protected autoScr_XYXZS_ollText(text : Laya.Text)
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