import KRQ_View_XYXZS_ComBase from "../../../../KRQ/ViewCom/KRQ_ViewComBase";
import KRQ__XYXZS_History from "../../../../KRQ/Com/KRQ_History/KRQ_History";
import Uti_XYXZS_lit from "../../../../Utilit";
import Even_XYXZS_tMgr from "../../../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../../../Event/EventDef";
import Cached_XYXZS_WXBannerAd from "../../../../CachedWXBannerAd";
import Wudi_XYXZS_anMgr from "../../../../Mgr/WudianMgr";

export default class KRQ_Main extends KRQ_View_XYXZS_ComBase {
    protected _topZone: Laya.Clip = null;
    protected _historyBtn: Laya.Sprite = null;


    protected _bottomZone: Laya.Clip = null;

    protected _krqHistory: KRQ__XYXZS_History = null;

    onAwake() {
        this._topZone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;

        if (Uti_XYXZS_lit.isIp_XYXZS_honeX()) {
            this._topZone.top = this._topZone.top + 75;
        }
        if (Wudi_XYXZS_anMgr.FakeExportBtn) {
            this._historyBtn.visible = true;
        }
        else{
            this._historyBtn.visible = false;
        }
        Laya.timer.once(300,this,()=>{
            if (Wudi_XYXZS_anMgr.FakeExportBtn) {
                this._historyBtn.visible = true;
            }
            else{
                this._historyBtn.visible = false;
            }
        })
        this._krqHistory = this.Sprite.getChildByName("KRQ_History").getComponent(KRQ__XYXZS_History) as KRQ__XYXZS_History;
        this._krqHistory.OnBackB_XYXZS_tnClick = () => {
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_Switch_XYXZS_Banner, true);
        }
        let self = this;

        var aspectRatio = Laya.stage.width / Laya.stage.height;

    }

    onEnable() {
        this._historyBtn.on(Laya.Event.CLICK, this, this.onHistoryBtn);
    }

    onDisable() {
        this._historyBtn.off(Laya.Event.CLICK, this, this.onHistoryBtn);
    }

    protected onHistoryBtn() {
        this._krqHistory.show();
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_Switch_XYXZS_Banner, false);
        Cached_XYXZS_WXBannerAd.hide();
    }
}