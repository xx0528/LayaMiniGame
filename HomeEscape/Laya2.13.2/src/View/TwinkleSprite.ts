export default class ryw_TwinkleSprite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected ryw__ownerSprite: Laya.Sprite;
    protected ryw__displaySp: Laya.Sprite;
    protected ryw__disText: Laya.Text;
    protected ryw__aniForward: boolean = false;
    protected ryw__fontSize = 25;
    protected ryw__originSize = 1;
    constructor() {
        super();
    }
    onAwake() {
        this.ryw__displaySp = this.owner as Laya.Sprite;
        this.ryw__disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this.ryw__originSize = this.ryw__displaySp.scaleX;
        if (this.ryw__disText != null) {
            this.ryw__disText.text = "";
            this.ryw__fontSize = this.ryw__disText.fontSize;
        }
    }
    onEnable(): void {
        this.ryw__displaySp.scale(this.ryw__originSize, this.ryw__originSize);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.ryw_displayAni();
    }

    protected ryw_displayAni() {
        if (!this.ryw__aniForward) {
            var scale = this.ryw__displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this.ryw__originSize);
            this.ryw__displaySp.scale(scale, scale);
            if (this.ryw__displaySp.scaleX <= this.TwinkleMinSize * this.ryw__originSize) {
                this.ryw__aniForward = true;
            }
        }
        else {
            var scale = this.ryw__displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this.ryw__originSize);
            this.ryw__displaySp.scale(scale, scale);
            if (this.ryw__displaySp.scaleX >= this.TwinkleMaxSize * this.ryw__originSize) {
                this.ryw__aniForward = false;
            }
        }
    }
}