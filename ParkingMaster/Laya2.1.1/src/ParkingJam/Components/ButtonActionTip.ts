import Utils from "../Util/Utils";

enum ActionState {
    None,
    Acting
};

export default class ButtonActionTip extends Laya.Script {
    
    private sp: Laya.Sprite;

    private srcScale: Laya.Vector2 = new Laya.Vector2();

    private actionTime: number = 100;

    private state: ActionState = ActionState.None;

    constructor() { super(); }

    onAwake() {
        this.sp = this.owner as Laya.Sprite;
        this.srcScale.x = this.sp.scaleX;
        this.srcScale.y = this.sp.scaleY;
        // console.log("onAwake ButtonActionTIp", this.sp);
    }

    onUpdate() {
        if (this.sp.visible) {
            if (this.state == ActionState.None) {
                this.state = ActionState.Acting;
                Laya.timer.clearAll(this);
                Laya.timer.loop(Utils.getInstance().randomRange(2, 4) * 1000, this, ()=>{
                    this._tweenAction(4);
                })
            }
        } else {
            if (this.state == ActionState.Acting) {
                Laya.timer.clearAll(this);
            }
            this.state = ActionState.None;
        }
    }

    _tweenAction(times: number) {
        times --;
        if (times < 0) {
            Laya.Tween.to(this.sp, {scaleX: this.srcScale.x, scaleY: this.srcScale.y}, this.actionTime);
            return;
        }
        let action = ()=>{
            this._tweenAction(times);
        }
        Laya.Tween.to(this.sp, {
            scaleX: Utils.getInstance().floatRandomRange(0.9, 1.2),
            scaleY: Utils.getInstance().floatRandomRange(0.9, 1.2),
        }, this.actionTime, null, Laya.Handler.create(this, action));
    }
}