import ryw_TemplateViewBase from "../TemplateViewBase";
import ryw_KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class ryw_ExportViewTemplate extends ryw_TemplateViewBase
{
    protected ryw__continueBtn : Laya.Sprite = null;
    protected ryw__krqVLoopAd : ryw_KRQ_VLoopAd = null;
    

    onAwake()
    {
        super.onAwake();
        this.ryw__krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
        this.ryw__krqVLoopAd.ryw_useMovePause = false;
        this.ryw__continueBtn = this.ryw__krqVLoopAd.ryw_Sprite.getChildByName("ContinueBtn") as Laya.Sprite;
        this.ryw__continueBtn.visible = false;
        let self = this;
        Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000,this,()=>
        {
            self.ryw__continueBtn.visible = true;
        })
    }

    onStart()
    {
        super.onStart();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__continueBtn.on(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__continueBtn.off(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    protected ryw_onContinueBtn()
    {
        
    }
}