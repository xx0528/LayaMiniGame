export default class FakePlayer extends Laya.Script {
    constructor() {
        super();
    }
    /** @prop {name:skinIndex, tips:"皮肤索引", type:int,default:1}*/
    public skinIndex: number = 1;
    /** @prop {name:autoMove,tips:"自动移动",type:Bool,default:true}*/
    public autoMove: Boolean = true;
    private _ownerSp: Laya.Sprite;
    private _sk: Laya.Sprite;
    private _rig: Laya.RigidBody;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._rig = this.owner.getComponent(Laya.RigidBody) as Laya.RigidBody;
        if(this.autoMove){
            Laya.timer.once(100, this, this.RdSwimming);
        }
        this._sk = this.owner.getChildByName("Sk") as Laya.Sprite;
        let skeleton = new Laya.Skeleton();
        skeleton.load("subRes/player/" + this.skinIndex + "/NewProject.sk");
        skeleton.scaleX = skeleton.scaleX / 4;
        skeleton.scaleY = skeleton.scaleY / 4;
        this._sk.addChild(skeleton);
    }
    RdSwimming() {
        if (this._rig.linearVelocity[0] > 0) {
            this._rig.linearVelocity = [5, 0];
        }
        else {
            this._rig.linearVelocity = [-5, 0];
        }
        let rdtime = Math.random() * 5000 + 3000;
        Laya.timer.once(rdtime, this, this.RdSwimming);
    }
}