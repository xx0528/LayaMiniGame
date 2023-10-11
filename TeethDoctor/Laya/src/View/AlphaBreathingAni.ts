export default class AlphaBr_XYXZS_eathingAni extends Laya.Script 
{

    public breathi_XYXZS_ngSpeed = 500;
    protected _a_XYXZS_dd : boolean = false;
    protected _ow_XYXZS_nerSprite : Laya.Sprite;
    
    onAwake()
    {
        this._ow_XYXZS_nerSprite = this.owner as Laya.Sprite;
    }
    
    onUpdate()
    {
        if(this._ow_XYXZS_nerSprite.visible)
        {
            this.bg_XYXZS_Ani();
        }
    }

    protected bg_XYXZS_Ani()
    {
        if(!this._a_XYXZS_dd)
        {
            this._ow_XYXZS_nerSprite.alpha = this._ow_XYXZS_nerSprite.alpha - Math.min(50,Laya.timer.delta) / this.breathi_XYXZS_ngSpeed  * 1
            if(this._ow_XYXZS_nerSprite.alpha <= 0)
            {
                this._a_XYXZS_dd = true;
            }
        }
        else
        {
            this._ow_XYXZS_nerSprite.alpha = this._ow_XYXZS_nerSprite.alpha + Math.min(50,Laya.timer.delta) / this.breathi_XYXZS_ngSpeed  * 1 
            if(this._ow_XYXZS_nerSprite.alpha >= 1)
            {
                this._a_XYXZS_dd = false;
            }
        }
    }
}