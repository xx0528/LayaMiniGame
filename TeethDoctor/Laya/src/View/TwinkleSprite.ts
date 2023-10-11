export default class TwinkleS_XYXZS_prite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _own_XYXZS_erSprite: Laya.Sprite;
    protected _dis_XYXZS_playSp: Laya.Sprite;
    protected _dis_XYXZS_Text: Laya.Text;
    protected _ani_XYXZS_Forward: boolean = false;
    protected _fon_XYXZS_tSize = 25;
    protected _ori_XYXZS_ginSize = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._dis_XYXZS_playSp = this.owner as Laya.Sprite;
        this._dis_XYXZS_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._ori_XYXZS_ginSize = this._dis_XYXZS_playSp.scaleX;
        if (this._dis_XYXZS_Text != null) {
            this._dis_XYXZS_Text.text = "";
            this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
        }
    }
    onEnable(): void {
        this._dis_XYXZS_playSp.scale(this._ori_XYXZS_ginSize, this._ori_XYXZS_ginSize);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.disp_XYXZS_layAni();
    }

    protected disp_XYXZS_layAni() {
        if (!this._ani_XYXZS_Forward) {
            var scale = this._dis_XYXZS_playSp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._ori_XYXZS_ginSize);
            this._dis_XYXZS_playSp.scale(scale, scale);
            if (this._dis_XYXZS_playSp.scaleX <= this.TwinkleMinSize * this._ori_XYXZS_ginSize) {
                this._ani_XYXZS_Forward = true;
            }
        }
        else {
            var scale = this._dis_XYXZS_playSp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._ori_XYXZS_ginSize);
            this._dis_XYXZS_playSp.scale(scale, scale);
            if (this._dis_XYXZS_playSp.scaleX >= this.TwinkleMaxSize * this._ori_XYXZS_ginSize) {
                this._ani_XYXZS_Forward = false;
            }
        }
    }
}