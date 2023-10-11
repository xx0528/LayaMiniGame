import View_wcjtn_Base from "../ViewBase";
import Logo_wcjtn_Ani from "./LogoAni";

export default class Loading_wcjtn_View extends View_wcjtn_Base
{
    protected _process_wcjtn_BarBg : Laya.Clip;
    protected _process_wcjtn_Bar : Laya.Clip;
    protected _bg_wcjtn_ : Laya.Clip;
    protected _bottom_wcjtn_Zone : Laya.Clip;

    protected _process_wcjtn_Width : number = 0;

    // protected _logo_wcjtn_Ani : Logo_wcjtn_Ani = null;

    onAwake()
    {
        this._bg_wcjtn_ = this.owner.getChildByName("Bg") as Laya.Clip;
        this._bottom_wcjtn_Zone = this._bg_wcjtn_.getChildByName("BottomZone") as Laya.Clip;
        this._process_wcjtn_BarBg = this._bottom_wcjtn_Zone.getChildByName("processBarBg") as Laya.Clip;
        this._process_wcjtn_Bar = this._process_wcjtn_BarBg.getChildByName("processBar") as Laya.Clip;
        this._process_wcjtn_Width = this._process_wcjtn_Bar.width;
        // this._logo_wcjtn_Ani = this._bottom_wcjtn_Zone.getChildByName("LogoAni").getComponent(Logo_wcjtn_Ani);
    }

    onStart()
    {
        // Laya.timer.once(250,this,()=>
        // {
        //     this._logo_wcjtn_Ani.play_wcjtn_Ani();
        // })
    }

    onEnable()
    {
        super.onEnable();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
    }

    onUpdate()
    {
        this._bg_wcjtn_.width = Laya.stage.width;
        this._bg_wcjtn_.height = Laya.stage.height;
    }

    public set_wcjtn_Process(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._process_wcjtn_Width * process;
        if(width < 1)
            width = 1;
        this._process_wcjtn_Bar.width = width;
    }
    
}