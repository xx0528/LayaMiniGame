import { CollisionFilterGroupEnum } from "../PhysicsUtils";

export default class BaseObj extends Laya.Script {
    constructor() {
        super();
    }
    protected _ownerSp: Laya.Sprite;
    /* 刚体组件 */
    protected _rigBody: Laya.RigidBody;
    /* 碰撞体组件 */
    protected _collider: Laya.ColliderBase;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._rigBody = this.owner.getComponent(Laya.RigidBody) as Laya.RigidBody;
        this._collider = this.owner.getComponent(Laya.ColliderBase) as Laya.ColliderBase;
        if (!this._collider) {
            throw ("没有挂载碰撞体，节点名为：" + this._ownerSp.name + "节点父级为：" + this.owner.parent.name);
        }
        else {
            this.SetColliderCategory();
        }
    }

    /**
     * 设置碰撞组别
     * 
     * @memberof PlaneBlocker
     */
    protected SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = CollisionFilterGroupEnum.Ground
        this._collider.refresh();
    }
}