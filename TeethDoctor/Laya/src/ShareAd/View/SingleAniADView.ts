import Shar_XYXZS_eAd from "../ShareAd";
import Uti_XYXZS_lit from "../../Utilit";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class Sing_XYXZS_leAniADView extends Laya.Script 
{
    public Ad_XYXZS_PosID : number = Shar_XYXZS_eAd.AniAd_XYXZS_LocationID;
    protected _own_XYXZS_erSprite :Laya.Sprite;
    protected _an_XYXZS_imation : Laya.Animation;
    protected _d_XYXZS_ata : any = null;

    onAwake()
    {
        this._own_XYXZS_erSprite = this.owner as Laya.Sprite;
        this._an_XYXZS_imation = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refr_XYXZS_eshADVDis();
        this._own_XYXZS_erSprite.on(Laya.Event.CLICK,this,this.onSp_XYXZS_Click);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._own_XYXZS_erSprite.off(Laya.Event.CLICK,this,this.onSp_XYXZS_Click);
    }

    protected refr_XYXZS_eshADVDis()
    {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.Ad_XYXZS_PosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._own_XYXZS_erSprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._an_XYXZS_imation.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._an_XYXZS_imation.play(0,true);
                }));
                self._d_XYXZS_ata = data;
            }
            else
            {
                self._own_XYXZS_erSprite.visible = false;
            }
        },false)
    }

    protected onSp_XYXZS_Click()
    {
        var data = this._d_XYXZS_ata;
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
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
}