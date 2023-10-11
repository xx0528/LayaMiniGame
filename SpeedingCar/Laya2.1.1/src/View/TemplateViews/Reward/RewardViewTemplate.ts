import Template_wcjtn_View_wcjtn_Base from "../TemplateViewBase";

export default class Reward_wcjtn_View_wcjtn_Template extends Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _reward_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip; 
        this._reward_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("RewradBtn") as Laya.Sprite;
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._reward_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._reward_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    protected onRewardBtn()
    {
        
    }

    protected onSkipBtn()
    {

    }
}