import View_XYXZS_Base from "../ViewBase";

export default class Load_XYXZS_ingView extends View_XYXZS_Base
{
    protected _proce_XYXZS_ssBarBg : Laya.Clip;
    protected _proc_XYXZS_essBar : Laya.Clip;
    protected _b_XYXZS_g : Laya.Clip;

    protected _proc_XYXZS_essWidth : number = 0;

    onAwake()
    {
        this._b_XYXZS_g = this.owner.getChildByName("Bg") as Laya.Clip;
        this._proce_XYXZS_ssBarBg = this._b_XYXZS_g.getChildByName("processBarBg") as Laya.Clip;
        if(this._proce_XYXZS_ssBarBg)
        {
            this._proc_XYXZS_essBar = this._proce_XYXZS_ssBarBg.getChildByName("processBar") as Laya.Clip;
            this._proc_XYXZS_essWidth = this._proc_XYXZS_essBar.width;
        }
        else
        {
            this._proc_XYXZS_essBar = this._b_XYXZS_g.getChildByName("processBar") as Laya.Clip;
            this._proc_XYXZS_essWidth = Laya.stage.width;
        }
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
        this._b_XYXZS_g.width = Laya.stage.width;
        this._b_XYXZS_g.height = Laya.stage.height;
        if(!this._proce_XYXZS_ssBarBg)
        {
            this._proc_XYXZS_essWidth = Laya.stage.width;
        }
    }

    public setP_XYXZS_rocess(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._proc_XYXZS_essWidth * process;
        if(width < 1)
            width = 1;
        this._proc_XYXZS_essBar.width = width;
    }
    
}