import { CollisionFilterGroupEnum } from "./PhysicsUtils";

export default class TouchCtr extends Laya.Script {
    /** @prop {name:touchTexture, tips:"显示效果材质", type:string,accept:res,default:"GameObjs/TouchEffect.png"}*/
    public touchTexture: string = "GameObjs/TouchEffect.png";
    /** @prop {name:effectSize, tips:"显示效果材质大小", type:int,default:20}*/
    public effectSize: number = 20;
    /** @prop {name:effecTime, tips:"显示效果消失次数,单位毫秒", type:int,default:1000}*/
    public effecTime: number = 1000;
    private _touchEffectParent: Laya.Sprite;
    // private _touchTime: number = -1;
    // private _touchCollider: Laya.ChainCollider;
    // private _touchRigbody: Laya.RigidBody;
    // private _mouseX: number;
    // private _mouseY: number;
    constructor() {
        super();
    }
    private _mouseDown: boolean;
    onAwake() {
        this._touchEffectParent = Laya.stage.getChildByName("TouchEffectParent") as Laya.Sprite;
        if (this._touchEffectParent == null) {
            this._touchEffectParent = new Laya.Sprite();
            this._touchEffectParent.mouseEnabled = false;
            Laya.stage.addChild(this._touchEffectParent);
        }
        if (Laya.stage.getChildIndex(this._touchEffectParent) != Laya.stage.numChildren - 1) {
            Laya.stage.setChildIndex(this._touchEffectParent, Laya.stage.numChildren - 1);
        }
        // this._touchCollider = this.owner.addComponent(Laya.ChainCollider);
        // this._touchCollider.points = "0,0,0,0";
        // this._touchCollider.loop = false;
        // this._touchRigbody = this.owner.addComponent(Laya.RigidBody);
        // this._touchRigbody.type = "kinematic";
        // this._touchRigbody.allowRotation = false;
        // this._touchRigbody.category = CollisionFilterGroupEnum.RopeCut;
        // this._touchRigbody.mask = CollisionFilterGroupEnum.Rope;
        // this._touchCollider.refresh();
    }
    onStageMouseDown() {
        this._mouseDown = true;
    }
    onStageMouseUp() {
        this._mouseDown = false;
    }
    onUpdate() {
        if (!this._mouseDown) {
            // this._mouseX = -1;
            // this._mouseY = -1;
            // this._touchTime = 0;
            return;
        }
        /* 划痕显示效果 */
        let effect: Laya.Sprite = Laya.Pool.getItemByCreateFun("touchEffect", (res) => {
            let eff = new Laya.Sprite();
            eff.mouseEnabled = false;
            eff.loadImage(this.touchTexture);
            eff.width = this.effectSize;
            eff.height = this.effectSize;
            let effScript = eff.addComponent(TouchEffect) as TouchEffect;
            effScript.effecTime = this.effecTime;
            return eff;
        }, this);
        effect.x = Laya.stage.mouseX;
        effect.y = Laya.stage.mouseY;
        effect.pivotX = this.effectSize / 2;
        effect.pivotY = this.effectSize / 2;
        this._touchEffectParent.addChild(effect);
        /* 真正切绳子 */
        // if (this._touchTime <= 50) {
        //     this._touchTime += Laya.timer.delta;
        //     return;
        // }
        // if (this._mouseX <= 0 || this._mouseY <= 0) {
        //     this._mouseX = Laya.stage.mouseX;
        //     this._mouseY = Laya.stage.mouseY;
        //     return;
        // }
        // this._touchCollider.points = this._mouseX.toString() + "," + this._mouseY.toString() + "," +
        //     Laya.stage.mouseX.toString() + "," + Laya.stage.mouseY.toString();
        // this._touchCollider.refresh();
        // this._mouseX = Laya.stage.mouseX;
        // this._mouseY = Laya.stage.mouseY;
        // this._touchTime = 0;
    }
}

export class TouchEffect extends Laya.Script {
    constructor() {
        super();
    }
    private _scare: number;
    private _isScare: boolean;
    private _ownerSp: Laya.Sprite;
    public effecTime: number = 1000;
    onAwake() {
        this._isScare = false;
        this._ownerSp = this.owner as Laya.Sprite;
    }
    onEnable() {
        this._scare = 1;
        this._isScare = true;
        // Laya.timer.once(500, this, () => {
        //     this.owner.removeSelf();
        // })
    }
    onUpdate() {
        if (this._isScare && this._scare > 0) {
            this._scare -= Laya.timer.delta / this.effecTime;
            this._ownerSp.scaleX = this._scare
            this._ownerSp.scaleY = this._scare
            this._ownerSp.alpha = this._scare;
        }
        else {
            this.owner.removeSelf();
        }
    }
    onDisable(): void {
        //效果，回收效果对象池，方便下次复用，减少对象创建开销
        this._isScare = false;
        Laya.Pool.recover("touchEffect", this.owner);
    }
}