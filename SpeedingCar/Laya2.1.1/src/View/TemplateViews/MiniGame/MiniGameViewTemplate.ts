import View_wcjtn_Base from "../../ViewBase";
import KRQ_wcjtn__His_wcjtn_tory from "../../../KRQ/Com/KRQ_History/KRQ_History";

export default class Mini_wcjtn_Game_wcjtn_View_wcjtn_Template extends View_wcjtn_Base 
{
    protected _krq_wcjtn_history : KRQ_wcjtn__His_wcjtn_tory = null;

    onAwake()
    {
        super.onAwake();
        this._krq_wcjtn_history = this.View_wcjtn_.getChildByName("KRQ_History").getComponent(KRQ_wcjtn__His_wcjtn_tory);
        let self = this;
        this._krq_wcjtn_history.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click = ()=>
        {
            self.close_wcjtn_View();
        }
    }

    onStart()
    {
        super.onStart();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
    }
}