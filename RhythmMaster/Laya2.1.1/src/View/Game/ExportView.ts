import ViewBase from "../ViewBase";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";

export default class ExportView extends ViewBase {

    private backButton: Laya.Image;

    onAwake(): void {
        this.backButton = this.owner.getChildByName("BackButton") as Laya.Image;

        this.backButton.on(Laya.Event.CLICK, this, this.OnClickBack);
    }

    OnClickBack(): void {
        let self = this;
        View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
            self.closeView();
        })
    }
}