import ViewBase from "../../ViewBase";
import KRQ_History from "../../../KRQ/Com/KRQ_History/KRQ_History";

export default class MiniGameView_ppxhc_Template extends ViewBase 
{
    protected _krq_ppxhc_history : KRQ_History = null;

    onAwake()
    {
        super.onAwake();
        this._krq_ppxhc_history = this.View.getChildByName("KRQ_History").getComponent(KRQ_History);
        let self = this;
        this._krq_ppxhc_history.OnBackBtn_ppxhc_Click = ()=>
        {
            self.closeView();
        }
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
    }

    removeEvent()
    {
        super.removeEvent();
    }
}