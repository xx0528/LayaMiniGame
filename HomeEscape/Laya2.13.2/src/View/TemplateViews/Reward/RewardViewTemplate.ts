import ryw_TemplateViewBase from "../TemplateViewBase";

export default class ryw_RewardViewTemplate extends ryw_TemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__rewardBtn : Laya.Sprite = null;
    protected ryw__skipBtn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip; 
        this.ryw__rewardBtn = this.ryw__centerZone.getChildByName("RewradBtn") as Laya.Sprite;
        this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__rewardBtn.on(Laya.Event.CLICK,this,this.ryw_onRewardBtn);
        this.ryw__skipBtn.on(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__rewardBtn.off(Laya.Event.CLICK,this,this.ryw_onRewardBtn);
        this.ryw__skipBtn.off(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    protected ryw_onRewardBtn()
    {
        
    }

    protected ryw_onSkipBtn()
    {

    }
}