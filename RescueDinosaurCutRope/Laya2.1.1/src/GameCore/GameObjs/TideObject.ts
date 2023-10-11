import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import BaseObj from "./BaseObj";
export default class TideObject extends BaseObj {
    constructor() {
        super();
    }
    /* 绳子组件 */
    protected _ropeAnchorList: Array<Laya.JointBase> = [];
    /* 捆绑状态 */
    protected _tide: boolean = false;
    /* 绑住的绳子数量 */
    protected _ropeCount: number = 0;
    onStart() {
        if (this._ropeAnchorList.length > 0) {
            this._tide = true;
        }
    }
    /**
     * 设置绳子碰撞组别
     * 
     * @protected
     * @memberof TideObject
     */
    protected SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = CollisionFilterGroupEnum.ALL ^ CollisionFilterGroupEnum.Rope;
        this._collider.refresh();
    }
    /**
     * 设置绳子锚点
     * 
     * @param {Laya.RopeJoint} rope 
     * @memberof TideObject
     */
    public SetRopeAnchor(rope: Laya.JointBase) {
        this._ropeAnchorList.push(rope);
        this._ropeCount++;
    }
    /**
     * 进入触发器
     * 
     * @param {Laya.ColliderBase} other 
     * @param {Laya.ColliderBase} self 
     * @param {*} contact 
     * @memberof TideObject
     */
    onTriggerEnter(other: Laya.ColliderBase, self: Laya.ColliderBase, contact: any) {
        // if(!other.owner || !other.owner.name) return;
        if (!other.isSensor && !this._tide) {
            this.RopeBroken();
        }
        if (other.owner.name.indexOf("Ground") >= 0) {
            this.RopeBroken();
        }
    }
    /**
     * 在落地的时候,打断绳子
     * 
     * @param {Laya.RopeJoint} rope 
     * @memberof TideObject
     */
    public RopeBroken() {
        this._ropeAnchorList.forEach(u => {
            u._setActive(false);
        })
        this._tide = false;
    }
    /**
     * 切断一根绳子
     * 
     * @memberof TideObject
     */
    RopeCut() {
        this._ropeCount--;
        if (this._ropeCount <= 0) {
            this._tide = false;
        }
    }
    // onUpdate() {
    //     if (this._rigBody.angularVelocity != 0) {
    //         this._rigBody.angularVelocity = 0;
    //     }
    // }
}