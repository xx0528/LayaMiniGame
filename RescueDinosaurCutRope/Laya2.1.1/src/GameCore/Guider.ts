export default class Guider extends Laya.Script {
    constructor() {
        super();
    }
    private _ownerSp: Laya.Sprite;
    private _sk: Laya.Sprite;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._sk = this.owner.getChildByName("Sk") as Laya.Sprite;
        let skeleton = new Laya.Skeleton();
        skeleton.load("subRes/guider/NewProject.sk");
        skeleton.scaleX = skeleton.scaleX / 2;
        skeleton.scaleY = skeleton.scaleY / 2;
        this._sk.addChild(skeleton);
    }
    onMouseOver() {
        this._ownerSp.visible = false;
    }
}