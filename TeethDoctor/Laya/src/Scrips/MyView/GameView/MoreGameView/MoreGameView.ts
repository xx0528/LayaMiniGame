import View_XYXZS_Base from "../../../../View/ViewBase";
import AppSwi_XYXZS_tchConfig from "../../../../Config/AppSwitchConfig";
import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "../../../../Mgr/ViewMgr";

export enum openMoreViewType {
    mainView,
    gameView,

}

export default class MoreGameView extends View_XYXZS_Base {

    protected _continueBtn: Laya.Text;

    //   protected _openMoreViewType: openMoreViewType;
    onAwake() {
        this._continueBtn = this.owner.getChildByName("ContinueGameBtn") as Laya.Text;

        this._continueBtn.visible = false;
      //  let time = AppSwitchConfig.getInstance().getAppSwitchData().GoOnBtnDelayTime;
        Laya.timer.once( 2000, this, () => {

            this._continueBtn.visible = true;
        })
    }

    addEvent() {
        this._continueBtn.once(Laya.Event.CLICK, this, this.onContinueBtn);
    }
    onCloseBtn() {

    }
    onContinueBtn() {
        /*
                if(this._openMoreViewType==openMoreViewType.gameView)
                {
                    this.closeView();
                    ViewMgr.instance.openView(ViewDef.GameOver);
                }
                else
                {
                    this.closeView();
                }
                */
        Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
        this.closeView();

    }
    /*
    public openView(data?: any): void {

        super.openView(data);
        this._openMoreViewType = data;
    }
*/
}