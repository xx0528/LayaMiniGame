import ViewBase from "../ViewBase";
import Util_JJKLBB_it from "../../Utilit";
import LoopA_JJKLBB_dView from "../../ShareAd/View/LoopAdView";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "../../ALD";
import Shar_JJKLBB_eAd from "../../ShareAd/ShareAd";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import CachedW_JJKLBB_XBannerAd from "../../CachedWXBannerAd";

export default class MoreGameView extends ViewBase
{
    protected _topZone : Laya.Clip;
    protected _closeBtn : Laya.Sprite;
    protected _closeBtn2 : Laya.Sprite;

    protected _loopAd : LoopA_JJKLBB_dView;
    onAwake()
    {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if(Util_JJKLBB_it.isIp_JJKLBB_honeX())
        {
            this._topZone.top = 70;
        }
        this._closeBtn = this._topZone.getChildByName("CloseBtn") as Laya.Sprite;
        this._closeBtn2 = this._topZone.getChildByName("CloseBtn2") as Laya.Sprite;
    }
    onShow(){
        CachedW_JJKLBB_XBannerAd.hide();
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_SwitchBanner,[false]);
        Shar_JJKLBB_eAd.Rando_JJKLBB_mJump(AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch);
        if(this._data && this._data.closeFunction){
            this.onCloseEvent = this._data.closeFunction;
        }
        if(this._data && this._data.ContinueGame){
            A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterGameOverMoreGame);
            this._closeBtn.visible = false;
            let time = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnDelayTime*1000;
            Laya.timer.once(time,this,()=>{
                this._closeBtn2.visible = true;
            });
        }
        else{
            this._closeBtn2.visible = false;
            this._closeBtn.visible = true;
            // this.onCloseEvent = () => {
            //     if(View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.MainView) == null){
            //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView);
            //     }
            // }
        }
    }

    onClose(){
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_SwitchBanner,[true]);
        super.onClose();
    }

    addEvent()
    {
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);
        this._closeBtn2.on(Laya.Event.CLICK,this,this.closeView);        
    }

    removeEvent()
    {
        this._closeBtn.off(Laya.Event.CLICK,this,this.closeView);
        this._closeBtn2.off(Laya.Event.CLICK,this,this.closeView);        
    }
}