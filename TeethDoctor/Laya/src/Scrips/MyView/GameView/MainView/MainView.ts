import View_XYXZS_Base from "../../../../View/ViewBase";
import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "../../../../Mgr/ViewMgr";
import Gam_XYXZS_eMgr from "../../../../Mgr/GameMgr";
import KRQ__XYXZS_Banner from "../../../../KRQ/Com/KRQ_Banner";
import Sou_XYXZS_ndMgr from "../../../../Mgr/SoundMgr";

export default class MainView extends View_XYXZS_Base {
    protected _topZone: Laya.Sprite;
    protected _centerZone: Laya.Sprite;

    //  protected _moreGameBtn: Laya.Sprite;
    protected _startGameBrn: Laya.Sprite;
    //protected _timer:number=0;

    // protected _goldTex:Laya.Sprite;
    // protected _LeverIndex:Laya.Sprite;
    onAwake() {

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;

        //   this._moreGameBtn = this._centerZone.getChildByName("MoreGameBtn") as Laya.Sprite;
        this._startGameBrn = this._centerZone.getChildByName("StartGameBtn") as Laya.Sprite;

        this._topZone = this.owner.getChildByName("TopZone") as Laya.Sprite;

        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");
    }

    // onUpdate(){this._timer+=Laya.timer.delta;}


    addEvent() {
        //    this._moreGameBtn.on(Laya.Event.CLICK, this, this.onMoreGameBtn);

        this._startGameBrn.on(Laya.Event.CLICK, this, this.onStartGameBtn);
    }

    removeEvent() {
        //   this._moreGameBtn.off(Laya.Event.CLICK, this, this.onMoreGameBtn)
        this._startGameBrn.off(Laya.Event.CLICK, this, this.onStartGameBtn);
    }
    onStartGameBtn() {

        if (Gam_XYXZS_eMgr.getIns_XYXZS_tance().isLo_XYXZS_adOver) {

            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_View);
            this.closeView();
            //   this._timer=0;
        }

    }
    /*
    onMoreGameBtn() {
        ViewMgr.instance.openView(ViewDef.MoreGameView);
    }*/
    onCloseBtn() {
        Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_Over);
    }

}