export default class ScaleBrea_XYXZS_thingAni extends Laya.Script 
{

    public breat_XYXZS_hingSpeed = 500;
    public ma_XYXZS_xScale = 1;
    public minS_XYXZS_cale = 0.9;
    protected _a_XYXZS_dd : boolean = false;
    protected _ow_XYXZS_nerSprite : Laya.Sprite;
    
    onAwake()
    {
        this._ow_XYXZS_nerSprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._ow_XYXZS_nerSprite.scale(this.ma_XYXZS_xScale,this.ma_XYXZS_xScale);
    }
    
    onEnable()
    {
        this._ow_XYXZS_nerSprite.on(Laya.Event.FOCUS_CHANGE,this,this.onFo_XYXZS_cusChange);
    }

    onDisable()
    {
        this._ow_XYXZS_nerSprite.off(Laya.Event.FOCUS_CHANGE,this,this.onFo_XYXZS_cusChange);
    }

    onUpdate()
    {
        if(this._ow_XYXZS_nerSprite.visible)
        {
            this.b_XYXZS_gAni();
        }
    }

    protected b_XYXZS_gAni()
    {
        if(!this._a_XYXZS_dd)
        {
            var value = this._ow_XYXZS_nerSprite.scaleX - Math.min(50,Laya.timer.delta) / this.breat_XYXZS_hingSpeed  * 1
            value = Math.max(this.minS_XYXZS_cale,value)
            this._ow_XYXZS_nerSprite.scale(value,value);
            if(this._ow_XYXZS_nerSprite.scaleX <= this.minS_XYXZS_cale)
            {
                this._a_XYXZS_dd = true;
            }
        }
        else
        {
            var value = this._ow_XYXZS_nerSprite.scaleX + Math.min(50,Laya.timer.delta) / this.breat_XYXZS_hingSpeed  * 1;
            value = Math.min(this.ma_XYXZS_xScale,value)
            this._ow_XYXZS_nerSprite.scale(value,value);
            if(this._ow_XYXZS_nerSprite.scaleX >= this.ma_XYXZS_xScale)
            {
                this._a_XYXZS_dd = false;
            }
        }
    }

    protected onFo_XYXZS_cusChange()
    {
        this._ow_XYXZS_nerSprite.scale(this.ma_XYXZS_xScale,this.ma_XYXZS_xScale);
        this._a_XYXZS_dd = false;
    }
}