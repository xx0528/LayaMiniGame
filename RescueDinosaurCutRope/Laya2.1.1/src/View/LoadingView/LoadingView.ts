import ViewBase from "../ViewBase";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import Shar_JJKLBB_eAd from "../../ShareAd/ShareAd";

export default class LoadingView extends ViewBase
{
    protected _processBarBg : Laya.Clip;
    protected _processBar : Laya.Clip;
    protected _bg : Laya.Clip;

    protected _processWidth : number = 0;

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._processBarBg = this._bg.getChildByName("processBarBg") as Laya.Clip;
        if(this._processBarBg)
        {
            this._processBar = this._processBarBg.getChildByName("processBar") as Laya.Clip;
            this._processWidth = this._processBar.width;
            this._processBar.width = 20;
        }
        else
        {
            this._processBar = this._bg.getChildByName("processBar") as Laya.Clip;
            this._processWidth = Laya.stage.width;
        }
        Laya.timer.once(6000,this,this.loadingJump);
    }

    onEnable()
    {
        super.onEnable();
    }

    addEvent()
    {
        super.addEvent();
        this._bg.on(Laya.Event.CLICK,this,this.loadingJump);
    }

    removeEvent()
    {
        super.removeEvent();
        this._bg.off(Laya.Event.CLICK,this,this.loadingJump);
    }

    onUpdate()
    {
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
        if(!this._processBarBg)
        {
            this._processWidth = Laya.stage.width;
        }
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
    
    loadingJump(){
        if(AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch == 1){
            Shar_JJKLBB_eAd.Rando_JJKLBB_mJump(1);
        }
    }
}