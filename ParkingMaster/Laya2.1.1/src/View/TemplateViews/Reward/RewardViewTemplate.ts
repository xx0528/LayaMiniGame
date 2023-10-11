import TemplateViewBase from "../TemplateViewBase";

export default class RewardViewTemplate extends TemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _rewardBtn : Laya.Sprite = null;
    protected _skipBtn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip; 
        this._rewardBtn = this._centerZone.getChildByName("RewradBtn") as Laya.Sprite;
        this._skipBtn = this._centerZone.getChildByName("SkipBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
        this._rewardBtn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skipBtn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._rewardBtn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skipBtn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    protected onRewardBtn()
    {
        
    }

    protected onSkipBtn()
    {

    }
}