import TideObject from "./TideObject";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";

export default class Plane extends TideObject {
    constructor() {
        super()
    }
    SetColliderCategory() {
        super.SetColliderCategory();
        this._rigBody.category = CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = this._rigBody.mask | CollisionFilterGroupEnum.PlaneBlocker;
        this._collider.refresh();
    }
}