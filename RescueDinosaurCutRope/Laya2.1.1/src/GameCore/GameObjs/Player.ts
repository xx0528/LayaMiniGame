import TideObject from "./TideObject";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import ExitPoint from "./ExitPoint";
import GameView from "../../View/GameView/GameView";
import Us_JJKLBB_er from "../../User/User";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";
export default class Player extends TideObject {
    constructor() {
        super();
    }
    private _list: Array<Laya.ColliderBase> = [];
    private _moveState: number = -99;
    private _moveExit: boolean = false;
    private _moveTimer: number = 0;
    private _gameState: number = 0;
    private _aniCtr: Laya.Animation;
    private _onGround: boolean = false;
    private _exitPoint: Laya.Sprite;
    private _waitForLand: boolean = false;
    private _skeleton: Laya.Skeleton;
    private _skLoaded: boolean = false;
    private _rope: Laya.Sprite;
    onAwake() {
        super.onAwake();
        this._rope = this._ownerSp.getChildByName("Rope") as Laya.Sprite;
        this._rope.x = 25;
        this._rope.y = 20;
        this._rope.scaleY = 0.3;
        this._skeleton = new Laya.Skeleton();
        let skinIndex = Us_JJKLBB_er.getCurA_JJKLBB_ctorSkin();
        this._skeleton.load("subRes/player/" + skinIndex + "/NewProject.sk", Laya.Handler.create(this, () => {
            this._skLoaded = true;
            this.SkPlay("daiji", true);
        }));
        this.SetSpDirection(-1);
        // this._skeleton.pivotX = -150;
        // this._skeleton.pivotY = -50;
        // this._skeleton.scaleX = 0.25;
        // this._skeleton.scaleY = 0.25;
        // this._skeleton.x = Laya.stage.width / 2;
        // this._skeleton.y = Laya.stage.height / 2;
        this.owner.addChildAt(this._skeleton, 0);
        this._ownerSp.texture = null;
    }
    onDisable() {
        Laya.timer.clearAll(this);
    }
    /**
     * 设置玩家的方向
     * 
     * @private
     * @param {number} dir 
     * @memberof Player
     */
    private SetSpDirection(dir: number) {
        if (dir == -1) {
            this._skeleton.scaleX = 0.25;
            this._skeleton.scaleY = 0.25;
            this._skeleton.pivotX = -150;
            this._skeleton.pivotY = -50;
        }
        else if (dir == 1) {
            this._skeleton.scaleX = -0.25;
            this._skeleton.scaleY = 0.25;
            this._skeleton.pivotX = 300;
            this._skeleton.pivotY = -50;
        }

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
        if (other == null || other.owner == null || other.owner.name == null) return;
        if (this._gameState < 0 && other.owner.name.indexOf("Ground") >= 0) {
            SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("siwang");
            Laya.timer.clearAll(this._ownerSp);
            Laya.Tween.clearAll(this._ownerSp);
            Laya.timer.once(1000, this, () => {
                GameView.Instance.GameOver(false);
            });
        }
        if (other.owner.name.indexOf("Sensor") >= 0) {
            this._moveTimer = -100;
            this._rigBody.linearVelocity = { x: 0, y: 0 };
        }
        if (other.owner.name.indexOf("Danger") >= 0) {
            SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("zhuangdaowuti");
            this._gameState = -1;
            this.GameOverSetCol();
            this.RopeBroken();
            this.SkPlay("siwang", false, true);
        }
        if (other.owner.name.indexOf("ExitPoint") >= 0) {
            this._waitForLand = true
            let sp = other.owner as Laya.Sprite;
            this._exitPoint = other.owner as Laya.Sprite;
        }
        if (other.owner.name.indexOf("Ground") >= 0) {
            this._onGround = true;
            this._moveTimer = -50;
            this._rigBody.linearVelocity = { x: 0, y: 0 };
        }
        if (!this._tide && other.owner.name.indexOf("M_L") >= 0) {
            // if (this._list.filter(u => u == other).length == 0) {
            //     this._rigBody.linearVelocity = { x: 0, y: 0 }
            //     Laya.timer.once(500, this, () => {
            //         this._rigBody.linearVelocity = { x: -6, y: 0 };
            //     });
            //     this._list.push(other);
            // }
            // this._rigBody.linearVelocity = { x: 0, y: 0 }
            // Laya.timer.once(500, this, () => {
            //     this._rigBody.linearVelocity = { x: -6, y: 0 };
            // });
            this._moveExit = false;
            this._moveTimer = 0;
            this._moveState = -1;
        }
        if (!this._tide && other.owner.name.indexOf("M_R") >= 0) {
            // this._rigBody.linearVelocity = { x: 0, y: 0 }
            // Laya.timer.once(500, this, () => {
            //     this._rigBody.linearVelocity = { x: 6, y: 0 };
            // });
            this._moveExit = false;
            this._moveTimer = 0;
            this._moveState = 1;
        }
        if (other.owner.name.indexOf("Jump") >= 0) {
            SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("tiantiao");
            this._moveExit = false;
            this.RopeBroken();
            this._rigBody.linearVelocity = { x: 0, y: -20 };
        }
    }
    onTriggerExit(other: Laya.ColliderBase, self: Laya.ColliderBase, contact: any) {
        // if(!other.owner || !other.owner.name) return;
        if (other.owner.name.indexOf("M_") >= 0) {
            // this._rigBody.linearVelocity = { x: 0, y: this._rigBody.linearVelocity.y };
            this._moveTimer = 50;
            this._moveExit = true;
        }
    }
    onTriggerStay(other: Laya.ColliderBase, self: Laya.ColliderBase, contact: any) {
        // if(!other.owner || !other.owner.name) return;
        console.log(other.owner.name);
    }
    GameOverSetCol() {
        this._rigBody.mask = CollisionFilterGroupEnum.None | CollisionFilterGroupEnum.Ground;
        this._collider.refresh();
    }
    onUpdate() {
        if (this._gameState != 0) return;
        if (this._waitForLand) {
            if (this._onGround) {
                this._gameState = 1;
                this.GameOverMoveToDoor();
            }
        }
        if (this._moveTimer <= 200) {
            this._moveTimer += Laya.timer.delta;
            return;
        }
        if (this._moveExit) {
            this._moveState = 0;
            this._onGround = false;
            this._moveExit = false;
        }
        else if (this._moveState == -1) {
            // this._moveTimer = 0;
            this.SkPlay("zoulu", true, false);
            this._rigBody.applyForceToCenter({ x: -180, y: 0 });
            this.SetSpDirection(-1);
        }
        else if (this._moveState == 1) {
            // this._moveTimer = 0;
            this.SkPlay("zoulu", true, false);
            this._rigBody.applyForceToCenter({ x: 180, y: 0 });
            this.SetSpDirection(1);
        }
        else if (this._moveState == 0) {
            this.SkPlay("daiji", true, false);
            this._rigBody.linearVelocity = { x: 0, y: this._rigBody.linearVelocity.y };
        }
    }
    SetColliderCategory() {
        this._rigBody.category = CollisionFilterGroupEnum.Player;
        this._rigBody.mask = CollisionFilterGroupEnum.ALL;
        this._collider.refresh();
    }
    GameOverMoveToDoor() {
        let time = Math.abs(this._ownerSp.x - this._exitPoint.x) * 3;
        let res = this._ownerSp.x - this._exitPoint.x;
        if (res > 0) {
            this.SetSpDirection(-1);
        }
        else {
            this.SetSpDirection(1);
        }
        Laya.Tween.to(this._ownerSp, { x: this._exitPoint.x }, time, null, Laya.Handler.create(this, this.HidePlayer), 500, true, true);
        // let myPoint = Laya.Point.create().setTo(this._ownerSp.pivotX, this._ownerSp.pivotY);
        // if (myPoint.distance(this._exitPoint.x, this._exitPoint.y) >= 1) {
        //     this._isGameOver = true;
        // }
    }
    HidePlayer() {
        this.GameOverSetCol();
        let exit = this._exitPoint.getComponent(ExitPoint) as ExitPoint;
        exit.PlayAni();
        this.SkPlay("qingzhu", true, true);
        SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("chenggong");
        Laya.timer.once(2000, this, () => {
            this._ownerSp.visible = false;
            GameView.Instance.GameOver(true);
        });
    }
    SkPlay(nameOrIndex: any, loop: boolean, force?: boolean, star?: number, end?: number, freshSkin?: boolean) {
        if (this._skLoaded) {
            this._skeleton.play(nameOrIndex, loop, force, star, end, freshSkin);
        }
    }
    RopeBroken() {
        super.RopeBroken();
        if (this._rope) {
            this._rope.visible = false;
        }
    }
}