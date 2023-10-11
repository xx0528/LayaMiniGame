import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class ExportViewTemplate extends TemplateViewBase
{
    protected _continueBtn : Laya.Sprite = null;
    protected _krqVLoopAd : KRQ_VLoopAd = null;
    

    onAwake()
    {
        super.onAwake();
        this._krqVLoopAd = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._krqVLoopAd.useMovePause = false;
        this._continueBtn = this._krqVLoopAd.Sprite.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continueBtn.visible = false;
        let self = this;
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().continueBtnDelayTime * 1000,this,()=>
        {
            self._continueBtn.visible = true;
        })
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
        this._continueBtn.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._continueBtn.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected onContinueBtn()
    {
        
    }
}