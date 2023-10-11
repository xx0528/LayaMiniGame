export default class Twinkle_wcjtn_Sprite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _owner_wcjtn_Sprite: Laya.Sprite;
    protected _display_wcjtn_Sp: Laya.Sprite;
    protected _dis_wcjtn_Text: Laya.Text;
    protected _ani_wcjtn_Forward: boolean = false;
    protected _font_wcjtn_Size = 25;
    protected _origin_wcjtn_Size = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._display_wcjtn_Sp = this.owner as Laya.Sprite;
        this._dis_wcjtn_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._origin_wcjtn_Size = this._display_wcjtn_Sp.scaleX;
        if (this._dis_wcjtn_Text != null) {
            this._dis_wcjtn_Text.text = "";
            this._font_wcjtn_Size = this._dis_wcjtn_Text.fontSize;
        }
    }
    onEnable(): void {
        this._display_wcjtn_Sp.scale(this._origin_wcjtn_Size, this._origin_wcjtn_Size);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.display_wcjtn_Ani();
    }

    protected display_wcjtn_Ani() {
        if (!this._ani_wcjtn_Forward) {
            var scale = this._display_wcjtn_Sp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._origin_wcjtn_Size);
            this._display_wcjtn_Sp.scale(scale, scale);
            if (this._display_wcjtn_Sp.scaleX <= this.TwinkleMinSize * this._origin_wcjtn_Size) {
                this._ani_wcjtn_Forward = true;
            }
        }
        else {
            var scale = this._display_wcjtn_Sp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._origin_wcjtn_Size);
            this._display_wcjtn_Sp.scale(scale, scale);
            if (this._display_wcjtn_Sp.scaleX >= this.TwinkleMaxSize * this._origin_wcjtn_Size) {
                this._ani_wcjtn_Forward = false;
            }
        }
    }
}