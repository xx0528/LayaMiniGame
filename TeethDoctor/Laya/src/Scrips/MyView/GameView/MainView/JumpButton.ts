export default class JumpButton extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _ownerSprite: Laya.Sprite;

    protected _timer: number = 0;
    protected _angle: number = 0;
    protected _orY: number = 0;
    constructor() {
        super();
    }
    onAwake() {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._orY = this._ownerSprite.y;
    }
    onEnable(): void {
    }
    onDisable(): void {

    }
    onUpdate() {
        this.displayAni();
    }

    protected displayAni() {
        if (this._timer < 1000) {
            this._timer += Laya.timer.delta;
        }
        else {
            this._angle += (Laya.timer.delta / 1000) * 360;
            this._ownerSprite.y = this._orY - Math.abs(Math.sin(this._angle * Math.PI / 180) * 50);
            if (this._angle > 360) {
                this._angle = 0;
                this._timer = 0
            }
        }
        // }
        // if (!this._aniForward) {
        //     var scale = this._displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
        //     scale = Math.max(scale, this.TwinkleMinSize * this._originSize);
        //     this._displaySp.scale(scale, scale);
        //     if (this._displaySp.scaleX <= this.TwinkleMinSize * this._originSize) {
        //         this._aniForward = true;
        //     }
        // }
        // else {
        //     var scale = this._displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
        //     scale = Math.min(scale, this.TwinkleMaxSize * this._originSize);
        //     this._displaySp.scale(scale, scale);
        //     if (this._displaySp.scaleX >= this.TwinkleMaxSize * this._originSize) {
        //         this._aniForward = false;
        //     }
        // }
    }
}