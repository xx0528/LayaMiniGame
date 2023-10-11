import ViewBase from "../ViewBase";
import LogoAni from "./LogoAni";

export default class LoadingView extends ViewBase
{
    protected _processBarBg : Laya.Clip;
    protected _processBar : Laya.Clip;
    protected _bg : Laya.Clip;
    protected _bottomZone : Laya.Clip;

    protected _processWidth : number = 0;

    protected _logoAni : LogoAni = null;

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._bottomZone = this._bg.getChildByName("BottomZone") as Laya.Clip;
        this._processBarBg = this._bottomZone.getChildByName("processBarBg") as Laya.Clip;
        this._processBar = this._processBarBg.getChildByName("processBar") as Laya.Clip;
        this._processWidth = this._processBar.width;
        // this._logoAni = this._bottomZone.getChildByName("LogoAni").getComponent(LogoAni);
    }

    onStart()
    {
        // Laya.timer.once(250,this,()=>
        // {
        //     this._logoAni.playAni();
        // })
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
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
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
        this._processBar.width = width;
    }
    
}