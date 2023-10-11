import ViewBase from "../ViewBase";
import Util_JJKLBB_it from "../../Utilit";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import WXAPI from "../../WXAPI";
import Us_JJKLBB_er from "../../User/User";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import Game_JJKLBB_Mgr from "../../Mgr/GameMgr";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import Wudi_JJKLBB_anMgr from "../../Mgr/WudianMgr";
import NativeCallback from "../../NativeCallback";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";

export default class GameRewardView extends ViewBase
{
    protected _topZone : Laya.Clip;
    protected _crystalText : Laya.Text;
    protected _energyText : Laya.Text;
    
    protected _centerZone : Laya.Sprite;
    protected _rewardBtn : Laya.Sprite;
    protected _moreRewardBtn : Laya.Sprite;
    protected _rewardText : Laya.Text;

    onAwake()
    {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if(Util_JJKLBB_it.isIp_JJKLBB_honeX())
        {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text") as Laya.Text;
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text") as Laya.Text;

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn") as Laya.Sprite;
        this._moreRewardBtn = this._centerZone.getChildByName("MoreRewardBtn") as Laya.Sprite;
        this._rewardText =  this._centerZone.getChildByName("RewardText") as Laya.Text;
    }

    onStart(){
        if(Wudi_JJKLBB_anMgr.GetIp_JJKLBB_Block_JJKLBB_ed()){
            let time = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().commonBtnDelayTime;
            if(time > 0){
                if(time<100){
                    time*=1000;
                }
                this._rewardBtn.visible = false;
                Laya.timer.once(time,this,()=>{
                    this._rewardBtn.visible = true;
                });
            }
        }
    }

    addEvent()
    {
        this._rewardBtn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._moreRewardBtn.on(Laya.Event.CLICK,this,this.onMoreRewardBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    removeEvent()
    {
        this._rewardBtn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._moreRewardBtn.off(Laya.Event.CLICK,this,this.onMoreRewardBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this._rewardText.text = "X" +  data.rewardNum;
        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
        WXAPI.showInterstitialAd(()=>{},()=>{});
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

    protected onRewardBtn()
    {
        Us_JJKLBB_er.addCrys_JJKLBB_tal(this._data.rewardNum)
        this.closeView();
    }

    protected onRewardVidewoFail() {
        console.log("观看视频失败 没用奖励");
        this._rewardBtn.visible = true;
    }

    protected onRewardVidewoSuccess() {
        Us_JJKLBB_er.addCrys_JJKLBB_tal(this._data.rewardNum * 3)
        this._rewardBtn.visible = true;
        this.closeView();
    }


    protected onMoreRewardBtn()
    {
        var self = this;
        this._moreRewardBtn.visible = false;
        this._rewardBtn.visible = false;

        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum)
            self.closeView();
        }

        // WXAPI.showRewardedVideoAd((ok)=>
        // {
        //     if(ok)
        //     {
        //         Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum * 3)
        //     }
        //     else
        //     {
        //         Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum)
        //     }
        //     self.closeView();
        // },()=>
        // {
        //     Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum)
        //     self.closeView();
        // });
    }

    onClose()
    {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameOverView,
            {
                isWin : true,
                levelNum:this._data.levelNum
            });
        super.onClose();
    }
}