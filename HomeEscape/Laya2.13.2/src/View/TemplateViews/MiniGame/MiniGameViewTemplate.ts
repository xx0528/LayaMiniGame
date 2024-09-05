import ryw_ViewBase from "../../ViewBase";
import ryw_KRQ_History from "../../../KRQ/Com/KRQ_History/KRQ_History";

export default class ryw_MiniGameViewTemplate extends ryw_ViewBase 
{
    protected ryw__krqhistory : ryw_KRQ_History = null;

    onAwake()
    {
        super.onAwake();
        this.ryw__krqhistory = this.ryw_View.getChildByName("KRQ_History").getComponent(ryw_KRQ_History);
        let self = this;
        this.ryw__krqhistory.ryw_OnBackBtnClick = ()=>
        {
            self.ryw_closeView();
        }
    }

    onStart()
    {
        super.onStart();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
    }
}