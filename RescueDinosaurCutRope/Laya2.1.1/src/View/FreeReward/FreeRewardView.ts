import ViewBase from "../ViewBase";
import WXAPI from "../../WXAPI";
import Us_JJKLBB_er from "../../User/User";
import GameComm_JJKLBB_onConfig from "../../Config/GameCommonConfig";
import Util_JJKLBB_it from "../../Utilit";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import CachedW_JJKLBB_XBannerAd from "../../CachedWXBannerAd";
import NativeCallback from "../../NativeCallback";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";

export enum FreeRewardType
{
    None = "0",
    Crystal = "1",
    Energy = "2",
}

export default class FreeRewardView extends ViewBase
{
    protected _topZone : Laya.Clip;
    protected _crystalText : Laya.Text;
    protected _energyText : Laya.Text;

    protected _centerZone : Laya.Clip;
    protected _rewardBtn : Laya.Sprite;
    protected _rewardText : Laya.Text;
    protected _closeBtn : Laya.Sprite;

    protected _rewardTags : any = {};

    protected _curRewardType : FreeRewardType = FreeRewardType.None;

    protected _bannerClosed:boolean = false;
    onAwake()
    {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if(Util_JJKLBB_it.isIp_JJKLBB_honeX())
        {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text") as Laya.Text; 
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text") as Laya.Text;

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Clip;
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn") as Laya.Sprite;
        this._rewardText = this._centerZone.getChildByName("RewardText") as Laya.Text;
        this._closeBtn = this._centerZone.getChildByName("CloseBtn") as Laya.Sprite;

        this._rewardTags[FreeRewardType.Crystal] = this._centerZone.getChildByName("CrystalTag") as Laya.Sprite;
        this._rewardTags[FreeRewardType.Energy] = this._centerZone.getChildByName("EnergyTag") as Laya.Sprite;

        this.showTag(FreeRewardType.None);
        CachedW_JJKLBB_XBannerAd.hide();
        if(View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.MainView)!=null){
            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_SwitchBanner,[false]);
            this._bannerClosed=true;
        }
        if(View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.GameOverView)!=null){
            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_SwitchBanner,[false]);
            this._bannerClosed=true;            
        }
    }

    addEvent()
    {
        this._rewardBtn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    removeEvent()
    {
        this._rewardBtn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._closeBtn.off(Laya.Event.CLICK,this,this.closeView);
        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this._curRewardType = null == data.rewardType ? FreeRewardType.None : data.rewardType as FreeRewardType;
        switch (this._curRewardType)  {
            case FreeRewardType.Crystal:
                this._rewardText.text = "x" + GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                this._rewardText.text = "x" + GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }
        this.showTag(this._curRewardType);

        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
    }

    protected onCrystalChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._crystalText.text = String(curr);
    }

    protected onEnergyChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._energyText.text = String(curr);
    }

    protected onRewardVidewoFail() {
        console.log("观看视频失败 没用奖励");
        this._rewardBtn.visible = true;
    }

    protected onRewardVidewoSuccess() {
        var rewardNum = 0;
        switch (this._curRewardType)  {
            case FreeRewardType.Crystal:
                rewardNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                rewardNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }

        switch (this._curRewardType)  {
            case FreeRewardType.Crystal:
                Us_JJKLBB_er.addCrys_JJKLBB_tal(rewardNum);
                break;
            case FreeRewardType.Energy:
                Us_JJKLBB_er.addEne_JJKLBB_rgy(rewardNum);
                break;
        }
        this._rewardBtn.visible = true;
    }

    protected onRewardBtn()
    {
        var rewardType = this._curRewardType;
        var rewardNum = 0;
        switch (this._curRewardType)  {
            case FreeRewardType.Crystal:
                rewardNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                rewardNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }
        var self = this;
        this._rewardBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            switch (rewardType)  {
                case FreeRewardType.Crystal:
                    Us_JJKLBB_er.addCrys_JJKLBB_tal(rewardNum);
                    break;
                case FreeRewardType.Energy:
                    Us_JJKLBB_er.addEne_JJKLBB_rgy(rewardNum);
                    break;
            }
        }
        // WXAPI.showRewardedVideoAd((ok)=>
        // {   
        //     if(ok)
        //     {
        //         switch (rewardType)  {
        //             case FreeRewardType.Crystal:
        //                 Us_JJKLBB_er.addCrys_JJKLBB_tal(rewardNum);
        //                 break;
        //             case FreeRewardType.Energy:
        //                 Us_JJKLBB_er.addEne_JJKLBB_rgy(rewardNum);
        //                 break;
        //         }
        //     }
        //     else
        //     {

        //     }
        //     self._rewardBtn.visible = true;
        // },()=>
        // {
        //     self._rewardBtn.visible = true;
        // })
    }

    protected showTag(type : FreeRewardType)
    {
        for(var key in this._rewardTags)
        {
            var tag = this._rewardTags[key] as Laya.Sprite;
            tag.visible = (type == key);
        }
    }
    onClose(){
        super.onClose();
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_SwitchBanner,[true]);
    }
}