import ViewBase from "../../ViewBase";
import KRQ_History from "../../../KRQ/Com/KRQ_History/KRQ_History";

export default class MiniGameViewTemplate extends ViewBase 
{
    protected _krqhistory : KRQ_History = null;

    onAwake()
    {
        super.onAwake();
        this._krqhistory = this.View.getChildByName("KRQ_History").getComponent(KRQ_History);
        let self = this;
        this._krqhistory.OnBackBtnClick = ()=>
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