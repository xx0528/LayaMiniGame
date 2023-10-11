import ryw_ViewBase from "../ViewBase";
import LogoAni from "./LogoAni";

export default class ryw_LoadingView extends ryw_ViewBase
{
    protected ryw__processBarBg : Laya.Clip;
    protected ryw__processBar : Laya.Clip;
    protected ryw__bg : Laya.Clip;
    protected ryw__bottomZone : Laya.Clip;

    protected ryw__processWidth : number = 0;

    onAwake()
    {
        this.ryw__bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this.ryw__bottomZone = this.ryw__bg.getChildByName("BottomZone") as Laya.Clip;
        this.ryw__processBarBg = this.ryw__bottomZone.getChildByName("processBarBg") as Laya.Clip;
        this.ryw__processBar = this.ryw__processBarBg.getChildByName("processBar") as Laya.Clip;
        this.ryw__processWidth = this.ryw__processBar.width;
    }

    onStart()
    {
    }

    onEnable()
    {
        super.onEnable();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
    }

    onUpdate()
    {
        this.ryw__bg.width = Laya.stage.width;
        this.ryw__bg.height = Laya.stage.height;
    }

    public ryw_setProcess(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this.ryw__processWidth * process;
        if(width < 1)
            width = 1;
        this.ryw__processBar.width = width;
    }
    
}