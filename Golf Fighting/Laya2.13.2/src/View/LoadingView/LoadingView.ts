import ViewBase from "../ViewBase";

export default class LoadingView extends ViewBase
{
    protected _processBarBg : Laya.Clip;
    protected _processBar : Laya.Clip;
    protected _bg : Laya.Clip;
    protected _loading:Laya.Image;
    protected m_bg:Laya.Image;

    protected _processWidth : number = 0;

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._processBarBg = this._bg.getChildByName("processBarBg") as Laya.Clip;
        this._loading = this.owner.getChildByName("loading") as Laya.Image;
        this.m_bg = this.owner.getChildByName("m_bg") as Laya.Image;

        this._loading.skin = "res/loading.png";
        this.m_bg.skin = "res/沙雕来一杆loading.png";
        this._bg.skin = "res/进度条1.png";

        if(this._processBarBg)
        {
            this._processBar = this._processBarBg.getChildByName("processBar") as Laya.Clip;
            this._processWidth = this._processBar.width;
        }
        else
        {
            this._processBar = this._bg.getChildByName("processBar") as Laya.Clip;
            this._processBar.skin = "res/进度条2.png";                                    
            this._processWidth = this._processBar.width;
        }
        this._processBar.width = 0;
        console.log(this._processBar.width);
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
        // this._bg.width = Laya.stage.width;
        // this._bg.height = Laya.stage.height;
        // if(!this._processBarBg)
        // {
        //     this._processWidth = Laya.stage.width;
        // }
        if(this._processBar.width<=this._processWidth){
            this._processBar.width+=6;
            Math.min(this._processBar.width,this._processWidth);
        }
    }

    public setProcess(process : number)
    {
        return;
        console.log(process);
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._processWidth * process;
        this._processBar.width = width;
    }
    
}