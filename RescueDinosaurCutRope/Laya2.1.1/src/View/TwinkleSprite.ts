export default class Twinkl_JJKLBB_eSprite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _owner_JJKLBB_Sprite: Laya.Sprite;
    protected _displ_JJKLBB_aySp: Laya.Sprite;
    protected _dis_JJKLBB_Text: Laya.Text;
    protected _aniF_JJKLBB_orward: boolean = false;
    protected _font_JJKLBB_Size = 25;
    protected _ori_JJKLBB_ginSize = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._displ_JJKLBB_aySp = this.owner as Laya.Sprite;
        this._dis_JJKLBB_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._ori_JJKLBB_ginSize = this._displ_JJKLBB_aySp.scaleX;
        if (this._dis_JJKLBB_Text != null) {
            this._dis_JJKLBB_Text.text = "";
            this._font_JJKLBB_Size = this._dis_JJKLBB_Text.fontSize;
        }
    }
    onEnable(): void {
        this._displ_JJKLBB_aySp.scale(this._ori_JJKLBB_ginSize, this._ori_JJKLBB_ginSize);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.displ_JJKLBB_ayAni();
    }

    protected displ_JJKLBB_ayAni() {
        if (!this._aniF_JJKLBB_orward) {
            var scale = this._displ_JJKLBB_aySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._ori_JJKLBB_ginSize);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX <= this.TwinkleMinSize * this._ori_JJKLBB_ginSize) {
                this._aniF_JJKLBB_orward = true;
            }
        }
        else {
            var scale = this._displ_JJKLBB_aySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._ori_JJKLBB_ginSize);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX >= this.TwinkleMaxSize * this._ori_JJKLBB_ginSize) {
                this._aniF_JJKLBB_orward = false;
            }
        }
    }
}