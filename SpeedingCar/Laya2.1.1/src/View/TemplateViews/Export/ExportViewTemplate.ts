import Template_wcjtn_View_wcjtn_Base from "../TemplateViewBase";
import KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";

export default class ExportViewTemplate extends Template_wcjtn_View_wcjtn_Base
{
    protected _continue_wcjtn_Btn : Laya.Sprite = null;
    protected _krq_wcjtn_VLoopAd : KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad = null;
    

    onAwake()
    {
        super.onAwake();
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad);
        this._krq_wcjtn_VLoopAd.useMovePause = false;
        this._continue_wcjtn_Btn = this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_wcjtn_Btn.visible = false;
        let self = this;
        Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000,this,()=>
        {
            self._continue_wcjtn_Btn.visible = true;
        })
    }

    onStart()
    {
        super.onStart();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Continue_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Continue_wcjtn_Btn);
    }

    protected on_wcjtn_Continue_wcjtn_Btn()
    {
        
    }
}