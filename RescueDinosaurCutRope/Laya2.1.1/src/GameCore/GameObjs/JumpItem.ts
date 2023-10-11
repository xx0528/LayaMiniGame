import TideObject from "./TideObject";

export default class JumpItem extends TideObject {
    constructor() {
        super();
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
        super.onTriggerEnter(other, self, contact);
        if (other.owner.name.indexOf("Ground") >= 0) {
            this._rigBody.type = "static";
        }
    }
}