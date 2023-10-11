import View_XYXZS_Base from "../../../../View/ViewBase";
import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "../../../../Mgr/ViewMgr";

import Gam_XYXZS_eMgr from "../../../../Mgr/GameMgr";
import SceneManager from "../../../../Script/GameCore/SceneManager";
import Sou_XYXZS_ndMgr from "../../../../Mgr/SoundMgr";


export default class GameView extends View_XYXZS_Base {

    protected _bannerAd: Laya.Sprite;

    onAwake() {
        // this._bannerAd = this.owner.getChildByName("Banner") as Laya.Sprite;
        var aspectRatio = Laya.stage.width / Laya.stage.height;

        // if (aspectRatio > 0.6) {
        //     this._bannerAd.visible = false;
        // }
    }
    onStart() {
        SceneManager.Instance.StartGame();
        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");        
    }
    onUpdate() {
        if (SceneManager.Instance.IsGameOver) {
            //  GameMgr.getInstance
            Laya.timer.once(2000, this, () => { this.onBtn(); });
        }
    }
    addEvent() {

    }

    removeEvent() {

    }
    onBtn() {
        this.closeView();

        Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_Over);
    }

}