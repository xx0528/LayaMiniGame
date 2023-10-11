import W_XYXZS_XAPI from "../../WXAPI";
import Shar_XYXZS_eAd from "../ShareAd";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class Loop_XYXZS_AdBox extends Laya.Script 
{
    protected _disp_XYXZS_laySp : Laya.Sprite;
    protected _dis_XYXZS_Text : Laya.Text;
    protected _d_XYXZS_ata : any = null;
    protected _or_XYXZS_iginW : number = 150;
    protected _or_XYXZS_iginH : number = 150;
    protected _fon_XYXZS_tSize = 25;
    

    onAwake()
    {
        this._disp_XYXZS_laySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._or_XYXZS_iginW = this._disp_XYXZS_laySp.width;
        this._or_XYXZS_iginH = this._disp_XYXZS_laySp.height;
        this._dis_XYXZS_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_XYXZS_Text.text = "";
        this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
    }
    
    onEnable(): void 
    {
        this._disp_XYXZS_laySp.on(Laya.Event.CLICK,this,this.onSp_XYXZS_Click);
    }

    onDisable(): void 
    {
        this._disp_XYXZS_laySp.off(Laya.Event.CLICK,this,this.onSp_XYXZS_Click);
    }

    public setData(data)
    {
        if(data)
        {
            var self = this;
            this._disp_XYXZS_laySp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self._disp_XYXZS_laySp.destroyed)
                {
                    self._disp_XYXZS_laySp.width = self._or_XYXZS_iginW;
                    self._disp_XYXZS_laySp.height = self._or_XYXZS_iginH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this._fon_XYXZS_tSize);
            this._dis_XYXZS_Text.fontSize = fontSize;
            this._dis_XYXZS_Text.text = str;
            this._d_XYXZS_ata = data;
        }
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