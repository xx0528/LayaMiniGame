import TideObject from "./TideObject";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import BaseObj from "./BaseObj";

export default class PlaneBlocker extends BaseObj {
    constructor() {
        super()
    }
    /** @prop {name:autoDestoryTime, tips:"自动销毁时间，为0不销毁", type:int,default:0}*/
    public autoDestoryTime: number = 0;
    /**
     * 设置碰撞组别
     * 
     * @memberof PlaneBlocker
     */
    protected SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.PlaneBlocker;
        this._rigBody.mask = CollisionFilterGroupEnum.None | CollisionFilterGroupEnum.Plane;
        this._collider.refresh();
    }
    onStart() {
        if (this.autoDestoryTime > 0) {
            Laya.timer.once(this.autoDestoryTime, this, () => {
                this._ownerSp.destroy();
            })
        }
    }
}