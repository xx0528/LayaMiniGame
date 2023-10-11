import ViewBase from "../../View/ViewBase";
import GameConst from "../GameConst";
import User_ppxhc from "../../User/User";
import Utilit_ from "../../Utilit";
import WXAPI_ from "../../WXAPI";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import NativeCallback from "../../NativeCallback";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";

export default class GameSkin extends ViewBase {
    private clip: Laya.Clip;
    private closeBtn: Laya.Image;
    private useBtn: Laya.Image;
    private inUseBtn: Laya.Image;
    private skinsList: Laya.List = null;
    private carImage: Laya.Image = null;

    onAwake(): void {
        let clip = this.owner.getChildByName("Clip") as Laya.Clip;
        this.clip = clip;
        this.closeBtn = clip.getChildByName("CloseBtn") as Laya.Image;
        this.useBtn = clip.getChildByName("UseBtn") as Laya.Image;
        this.inUseBtn = clip.getChildByName("InUseBtn") as Laya.Image;
        this.skinsList = clip.getChildByName("List") as Laya.List;
        this.carImage = this.owner.getChildByName("Image") as Laya.Image;

        this.closeBtn.on(Laya.Event.CLICK, this, this.OnClickClose);
        this.useBtn.on(Laya.Event.CLICK, this, this.OnClickUse);
        this.inUseBtn.on(Laya.Event.CLICK, this, this.OnClickInUse);
        this.skinsList.mouseHandler = Laya.Handler.create(this, this.OnListMouse, null, false);
        this.skinsList.renderHandler = Laya.Handler.create(this, this.RefreshItem, null, false);
    }

    onShow(): void {
        this.PlayAnimation(true, 0.1 * 1000, null);
    }

    onEnable(): void {
        this.skinsList.selectedIndex = User_ppxhc.GetSelectiveSkin();
        this.skinsList.updateArray(GameConst.Skins);
        this.RefreshBtn();

        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

    }

    
    onDisable(): void {
        
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

    }

    onDestroy(): void {

    }

    private OnListMouse(event: Laya.Event, index: number): void {
        if (event.type != Laya.Event.CLICK) {
            return;
        }

        this.skinsList.selectedIndex = index;
        this.RefreshBtn();
        this.RefreshItem(event.target as Laya.Box, index);
    }

    private RefreshItem(cell: Laya.Box, index: number) {
        let isHave = User_ppxhc.Check_ppxhc_OwnedSkin(index);
        let isSelective = User_ppxhc.GetSelectiveSkin() == index;
        (Utilit_.FindChild(cell, "State/UnLock") as Laya.UIComponent).visible = isHave;
        (Utilit_.FindChild(cell, "State/Selective") as Laya.UIComponent).visible = isSelective;
        (Utilit_.FindChild(cell, "Outline") as Laya.Image).loadImage("Cars/" + (isHave ? (index + 1) : "0" + (index + 1)) + ".png");

        if (this.skinsList.selectedIndex == index) {
            (Utilit_.FindChild(cell, "State/Selective") as Laya.UIComponent).visible = true;
        }
        else {
            (Utilit_.FindChild(cell, "State/Selective") as Laya.UIComponent).visible = false;
        }
    }

    private RefreshBtn(): void {
        let isHave = User_ppxhc.Check_ppxhc_OwnedSkin(this.skinsList.selectedIndex);
        let isSelective = User_ppxhc.GetSelectiveSkin() == this.skinsList.selectedIndex;
        this.useBtn.visible = !isSelective;
        this.inUseBtn.visible = isSelective;

        let imagePath = "Cars/0" + (isHave ? (this.skinsList.selectedIndex + 1) : + (this.skinsList.selectedIndex + 1)) + ".png"
        console.log(imagePath, (this.skinsList.selectedIndex).toString());
        this.carImage.graphics.clear();
        this.carImage.loadImage(imagePath);
    }

    private OnClickClose(): void {
        this.closeView();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome, {view: 0});
    }

    protected onRewardVidewoFail() {
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.TipsView, "Video playback failed. can't get new car");
    }

    protected onRewardVidewoSuccess() {
        User_ppxhc.add_ppxhc_Skin(this.skinsList.selectedIndex);
        User_ppxhc.SetSelectiveSkin(1, true);
        this.RefreshBtn();
        this.skinsList.refresh();
        return;
    }

    private OnClickUse(): void {
        let self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            User_ppxhc.add_ppxhc_Skin(self.skinsList.selectedIndex);
            User_ppxhc.SetSelectiveSkin(1, true);
            self.RefreshBtn();
            self.skinsList.refresh();
        }
        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     if (completed == false) {
        //         return;
        //     }
        //     User_ppxhc.add_ppxhc_Skin(self.skinsList.selectedIndex);
        //     User_ppxhc.SetSelectiveSkin(1, true);
        //     self.RefreshBtn();
        //     self.skinsList.refresh();
        // }, () => {

        // })
    }

    private OnClickInUse(): void {

    }

    private PlayAnimation(isShow: boolean, duration: number, hander: Laya.Handler) {
        let expectTop = Laya.stage.height;
        if (isShow) {
            expectTop = (Laya.stage.height - this.clip.height);
            this.clip.top = Laya.stage.height;
        } else {
            expectTop = Laya.stage.height;
            this.clip.top = (Laya.stage.height - this.clip.height);
        }
        Laya.Tween.clearAll(this.clip);
        this.clip.left = this.clip.right = 0;
        Laya.Tween.to(this.clip, {top: expectTop}, duration, null, hander);
    }

    public closeView(): void {
        this.PlayAnimation(false, 0.1 * 1000, Laya.Handler.create(this, () => {
            Laya.Tween.clearAll(this.clip);
            super.closeView();
        }));
    }
}