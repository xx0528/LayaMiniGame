export default class MyButton extends Laya.Script {

    /** @prop {name:press, tips:"点击的时候会变化", type:Bool, default:false}*/
    public press: boolean = false;
    /** @prop {name:minScale, tips:"点击的时候会大小", type:Number, default:0.85}*/
    public minScale: number = 0.85;

    /** @prop {name:breath, tips:"按钮呼吸式放大缩小", type:Bool, default:false}*/
    public breath: boolean = false;
    /** @prop {name:breathOff, tips:"按钮呼吸式变化阈值", type:Number, default:0.1}*/
    public breathOff: number = 0.1;
    /** @prop {name:breathTime, tips:"按钮呼吸式变化时间", type:Number, default:1}*/
    public breathTime: number = 1;


    private mButton: Laya.Button;
    private startScale: Laya.Vector2 = new Laya.Vector2(0, 0);
    constructor() { super(); }

    onAwake() {
        this.mButton = this.owner as Laya.Button;
        this.mButton.pivot(this.mButton.width / 2, this.mButton.height / 2);
        this.startScale.x = this.mButton.scaleX;
        this.startScale.y = this.mButton.scaleY;
        this.breathTime = this.breathTime*1000;
    }

    onStart() {
        if (this.mButton.visible && this.breath) {
            this.Breath();
        }
    }


    onDestroy() {
        Laya.Tween.clearAll(this.mButton);
    }


    private Breath() {
        let minScale: Laya.Vector2 = new Laya.Vector2(this.startScale.x - this.breathOff, this.startScale.y - this.breathOff);
        let maxScale: Laya.Vector2 = new Laya.Vector2(this.startScale.x + this.breathOff, this.startScale.y + this.breathOff);
        Laya.Tween.to(this.mButton, { scaleX: minScale.x, scaleY: minScale.y }, this.breathTime, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.mButton, { scaleX: maxScale.x, scaleY: maxScale.y }, this.breathTime, null, Laya.Handler.create(this, () => {
                this.Breath();
            }))
        }))
    }


    onMouseDown() {
        if (this.press) {
            this.mButton.scale(this.minScale, this.minScale);
        }
    }

    onMouseUp() {
        if (this.press) {
            this.mButton.scale(1, 1);
        }
    }

    onMouseOut() {
        if (this.press) {
            this.mButton.scale(1, 1);
        }
    }
}   