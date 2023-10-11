import BaseObj from "./BaseObj";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";

export default class ExitPoint extends BaseObj {
    constructor() {
        super();
    }
    /** @prop {name:expointTexture, tips:"退出点动画图集", type:string,accept:res,default:"GameObjs/Rope.png"}*/
    public expointTexture: string = "res/atlas/ExitPoint.atlas";
    private _animation: Laya.Animation;
    onAwake() {
        super.onAwake();
        this._animation = this.owner.getChildByName("Ani") as Laya.Animation;
        this._animation.loadAtlas(this.expointTexture);
    }
    PlayAni() {
        this._ownerSp.loadImage(null);
        this._animation.play(0, false);
        SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("kaimen");
    }
    SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = CollisionFilterGroupEnum.Player;
    }
}