import TideObject from "./TideObject";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";

export default class Enemy extends TideObject {
    constructor() {
        super()
    }
    // /** @prop {name:enemyDirect, tips:"敌人朝向", type:Option,option:"Left,Right",default:"Left"}*/
    // public enemyDirect: string = "Left";
    private _skUrl: string = "subRes/enemy/NewProject.sk";
    private _skeleton: Laya.Skeleton;
    private _skLoaded: boolean = false;
    private _sk: Laya.Sprite;
    onAwake() {
        super.onAwake();
        this._sk = this.owner.getChildByName("Sk") as Laya.Sprite;
        this._skeleton = new Laya.Skeleton();
        this._skeleton.scaleX = -0.25;
        this._skeleton.scaleY = 0.25;
        this._skeleton.load(this._skUrl, Laya.Handler.create(this, () => {
            this._skLoaded = true;
            this.SkPlay("daiji", true);
        }));
        // this.owner.addChild(this._skeleton);
        this._sk.addChild(this._skeleton);
        this.owner.on("shoot", this, this.shoot)
        // if (this.enemyDirect == "Right") {
        //     this._ownerSp.scaleX = -1;
        // }
        // else {
        //     this._ownerSp.scaleX = 1;
        // }
        // this._collider.refresh();
    }
    SkPlay(nameOrIndex: any, loop: boolean, force?: boolean, star?: number, end?: number, freshSkin?: boolean) {
        if (this._skLoaded) {
            this._skeleton.play(nameOrIndex, loop, force, star, end, freshSkin);
        }
    }
    SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Enemy;
        this._rigBody.mask = CollisionFilterGroupEnum.ALL ^ CollisionFilterGroupEnum.Rope ^ CollisionFilterGroupEnum.Player;
        this._collider.refresh();
    }
    onTriggerEnter(other: Laya.ColliderBase, self: Laya.ColliderBase, contact: any) {
        if (other.owner.name.indexOf("SensorZone") >= 0) {
            this._rigBody.linearVelocity = [this._rigBody.linearVelocity[0] / 2, this._rigBody.linearVelocity[1] / 2];
        }
        if (other.owner.name.indexOf("Danger") >= 0) {
            SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("zhuangdaowuti");
            this.owner.getChildByName("SensorZone").removeSelf();
            this.EnemyDead();
        }
    }
    shoot() {
        SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("sheji");
        this.SkPlay("kaiqiang", false);
    }
    EnemyDead() {
        this.SkPlay("sw", false);
        Laya.timer.once(200, this, () => {
            this.owner.destroy();
        })
    }
}