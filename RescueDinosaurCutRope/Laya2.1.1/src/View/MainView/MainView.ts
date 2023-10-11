import ViewBase from "../ViewBase";
import Us_JJKLBB_er from "../../User/User";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import WXAPI from "../../WXAPI";
import Util_JJKLBB_it from "../../Utilit";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import { FreeRewardType } from "../FreeReward/FreeRewardView";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "../../ALD";
import Wudi_JJKLBB_anMgr from "../../Mgr/WudianMgr";

export default class MainView extends ViewBase {
    protected _topZone: Laya.Clip;
    protected _crystalText: Laya.Text;
    protected _energyText: Laya.Text;

    protected _startGameBtn: Laya.Sprite;
    protected _moreGameBtn: Laya.Sprite;

    protected _centerZone: Laya.Clip;

    protected _autoZone: Laya.Sprite;
    protected _freeCryStalBtn: Laya.Sprite;
    protected _freeEnergyBtn: Laya.Sprite;
    protected _skinBtn: Laya.Sprite;
    protected _shareBtn: Laya.Sprite;

    protected _adUIMask: Laya.UIComponent;
    onAwake()  {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if (Util_JJKLBB_it.isIp_JJKLBB_honeX())  {
            // this._topZone.top = 70;
            // (this.owner.getChildByName("SideAd_View") as Laya.UIComponent).top += 70;
            // (this.owner.getChildByName("ShakeLoopAd") as Laya.UIComponent).top += 70;
            // (this.owner.getChildByName("AniAd") as Laya.UIComponent).top += 70;
        }
        this._crystalText = this._topZone.getChildByName("FreeCrystalBtn").getChildByName("Text") as Laya.Text;
        this._energyText = this._topZone.getChildByName("FreeEnergyBtn").getChildByName("Text") as Laya.Text;

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Clip;

        this._autoZone = this.owner.getChildByName("BottomZone").getChildByName("AutoZone") as Laya.Sprite;
        this._startGameBtn = this._autoZone.getChildByName("StartGameBtn") as Laya.Sprite;
        // this._moreGameBtn = this._autoZone.getChildByName("MoreGameBtn") as Laya.Sprite;

        this._freeCryStalBtn = this._topZone.getChildByName("FreeCrystalBtn") as Laya.Sprite;
        this._freeEnergyBtn = this._topZone.getChildByName("FreeEnergyBtn") as Laya.Sprite;
        this._skinBtn = this._topZone.getChildByName("SkinBtn") as Laya.Sprite;
        // this._shareBtn = this._autoZone.getChildByName("ShareBtn") as Laya.Sprite;
    }

    addEvent()  {
        this._startGameBtn.on(Laya.Event.CLICK, this, this.onStartGameBtn);
        // this._moreGameBtn.on(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._freeCryStalBtn.on(Laya.Event.CLICK, this, this.onFreeCrystalBtn);
        this._freeEnergyBtn.on(Laya.Event.CLICK, this, this.onFreeEnergyBtn);
        this._skinBtn.on(Laya.Event.CLICK, this, this.onSkinBtn);
        // this._shareBtn.on(Laya.Event.CLICK, this, this.onShareBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        // Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel,this,this.onMoreGameBtn);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_MainAdUiMask, this, this.changeAdMask);

    }

    removeEvent()  {
        this._startGameBtn.off(Laya.Event.CLICK, this, this.onStartGameBtn);
        // this._moreGameBtn.off(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._freeCryStalBtn.off(Laya.Event.CLICK, this, this.onFreeCrystalBtn);
        this._freeEnergyBtn.off(Laya.Event.CLICK, this, this.onFreeEnergyBtn);
        this._skinBtn.off(Laya.Event.CLICK, this, this.onSkinBtn);
        // this._shareBtn.off(Laya.Event.CLICK, this, this.onShareBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        // Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel,this,this.onMoreGameBtn);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_MainAdUiMask, this, this.changeAdMask);

    }

    public openView(data?: any): void {
        super.openView(data);
        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
    }

    protected onCrystalChange(para)  {
        var curr: number = para.curr;
        var last: number = para.last;
        this._crystalText.text = String(curr);
    }

    protected onEnergyChange(para)  {
        var curr: number = para.curr;
        var last: number = para.last;
        this._energyText.text = String(curr);
    }


    protected onFreeEnergyBtn()  {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
            {
                rewardType: FreeRewardType.Energy
            })
    }

    protected onFreeCrystalBtn()  {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
            {
                rewardType: FreeRewardType.Crystal
            })
    }

    protected onSkinBtn()  {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.ActorSkinView);
    }

    protected onShareBtn()  {
        WXAPI.share((ok) =>  {

        }, "恐龙宝宝被人绑架了，快来救救它吧！", "subRes/image/fenxiang.png");
    }

    protected onMoreGameBtn()  {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView);
    }

    protected onStartGameBtn()  {
        this.closeView();
        if (Wudi_JJKLBB_anMgr.WudianFlag) {
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameOverSkin);
        }
        else {
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.LevelStateView);
        }
    }

    onShow() {
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_PlayBgm);
    }

    changeAdMask(visible: boolean) {
        this._adUIMask.visible = visible;
    }

}