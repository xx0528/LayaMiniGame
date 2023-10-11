import ViewBase from "../ViewBase";
import LogoAni from "./LogoAni";

export default class Loading_ppxhc_View extends ViewBase
{
    protected _process_ppxhc_BarBg : Laya.Clip;
    protected _process_ppxhc_Bar : Laya.Clip;
    protected _ppxhc_bg : Laya.Clip;
    protected _bottom_ppxhc_Zone : Laya.Clip;

    protected _processWidth : number = 0;

    protected _logo_ppxhc_Ani : LogoAni = null;

    onAwake()
    {
        this._ppxhc_bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._bottom_ppxhc_Zone = this._ppxhc_bg.getChildByName("BottomZone") as Laya.Clip;
        this._process_ppxhc_BarBg = this._bottom_ppxhc_Zone.getChildByName("processBarBg") as Laya.Clip;
        this._process_ppxhc_Bar = this._process_ppxhc_BarBg.getChildByName("processBar") as Laya.Clip;
        this._processWidth = this._process_ppxhc_Bar.width;
    }

    onStart()
    {
    }

    onEnable()
    {
        super.onEnable();
    }

    addEvent()
    {
        super.addEvent();
    }

    removeEvent()
    {
        super.removeEvent();
    }

    onUpdate()
    {
        this._ppxhc_bg.width = Laya.stage.width;
        this._ppxhc_bg.height = Laya.stage.height;
    }

    public setProcess(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._processWidth * process;
        if(width < 1)
            width = 1;
        this._process_ppxhc_Bar.width = width;
    }
    
}