import TemplateViewBase from "../TemplateViewBase";

export default class RewardView_ppxhc_Template extends TemplateViewBase
{
    protected _center_ppxhc_Zone : Laya.Clip = null;
    protected _reward_ppxhc_Btn : Laya.Sprite = null;
    protected _skip_ppxhc_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone") as Laya.Clip; 
        this._reward_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("RewradBtn") as Laya.Sprite;
        this._skip_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("SkipBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
        this._reward_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_ppxhc_Event()
    {
        super.remove_ppxhc_Event();
        this._reward_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    protected onRewardBtn()
    {
        
    }

    protected onSkipBtn()
    {

    }
}