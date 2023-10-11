import BaseObj from "./BaseObj";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";

export default class DangerZone extends BaseObj {
    constructor() {
        super();
    }
    /** @prop {name:projectileDir,tips:"投射物方向",type:Option,option:"bottom,left,right,top",default:"bottom"}*/
    public projectileDir: string = "bottom";
    /** @prop {name:projectileSpd,tips:"投射物速度",type:number,default:2000}*/
    public projectileSpd: number = 2000;
    /** @prop {name:waitTime,tips:"等待时间",type:number,default:0}*/
    public waitTime: number = 0;
    /** @prop {name:hideProjectile,tips:"隐藏投射物",type:Bool,default:false}*/
    public hideProjectile: Boolean = false;
    private _projectile: Laya.Sprite;
    private _projectileRig: Laya.RigidBody;
    private _fired: boolean = false;
    onAwake() {
        this._projectile = this.owner.getChildByName("DangerProjectile") as Laya.Sprite;
        this._projectileRig = this._projectile.getComponent(Laya.RigidBody);
        if (this.hideProjectile) {
            this._projectile.visible = false;
        }
        super.onAwake();
    }
    SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = CollisionFilterGroupEnum.Player | CollisionFilterGroupEnum.Enemy;
        this._collider.refresh();
    }
    /**
     * 危险区触发器
     * 
     * @param {Laya.ColliderBase} other 
     * @param {Laya.ColliderBase} self 
     * @param {*} contact 
     * @memberof DangerZone
     */
    onTriggerEnter(other: Laya.ColliderBase, self: Laya.ColliderBase, contact: any) {
        if (this._fired) return;
        console.log(other.owner);
        this._fired = true;
        this.owner.parent.event("shoot");
        Laya.timer.once(this.waitTime, this, this.shootProjectile);
    }
    shootProjectile() {
        this._projectile.visible = true;
        Laya.timer.frameLoop(1, this, () => {
            let spd = (this.projectileSpd * Laya.timer.delta) / 1000;
            if (this._projectile.x < -2 * Laya.stage.height ||
                this._projectile.x > 2 * Laya.stage.height ||
                this._projectile.y < -2 * Laya.stage.height ||
                this._projectile.y > 2 * Laya.stage.height) {
                Laya.timer.clearAll(this);
                this.owner.removeSelf();
                // this._projectile.destroy();
            }
            switch (this.projectileDir) {
                case "bottom":
                    this._projectile.y += spd;
                    break;
                case "left":
                    this._projectile.x -= spd;
                    break;
                case "right":
                    this._projectile.x += spd;
                    break;
                case "top":
                    this._projectile.y -= spd;
                    break;
            }
        })
    }
}