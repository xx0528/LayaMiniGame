import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class ExportView_ppxhc_Template extends TemplateViewBase
{
    protected _continue_ppxhc_Btn : Laya.Sprite = null;
    protected _krqVLoop_ppxhc_Ad : KRQ_VLoopAd = null;
    

    onAwake()
    {
        super.onAwake();
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._continue_ppxhc_Btn = this._krqVLoop_ppxhc_Ad.Sprite.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_ppxhc_Btn.visible = false;
        let self = this;
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBtnDelayTime * 1000,this,()=>
        {
            self._continue_ppxhc_Btn.visible = true;
        })
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
        this._continue_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    remove_ppxhc_Event()
    {
        super.remove_ppxhc_Event();
        this._continue_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected onContinueBtn()
    {
        
    }
}