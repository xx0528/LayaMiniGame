/**
 * 用来控制绳子显示效果核心的类
 * 
 * @export
 * @class RopePieces
 * @extends {Laya.Script}
 */
export default class RopePieces extends Laya.Script {
    constructor() {
        super();
    }
    private _topSprite: Laya.Sprite;
    private _bottomSprite: Laya.Sprite;
    private _ownerSp: Laya.Sprite;
    private _rotate: boolean = false;
    private _ropeCount: number;
    private _ropeIndex: number;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._ownerSp.on("StopRote", this, () => {
            this._rotate = false;
        });
    }
    SetAngle(topSprite: Laya.Sprite, bottomSprite: Laya.Sprite) {
        this._topSprite = topSprite;
        this._bottomSprite = bottomSprite;
        this._rotate = true;
        // this._ropeCount = ropeCount;
        // this._ropeIndex = ropeIndex;
        // let radio = 1 - (Math.abs(this._ropeIndex - (this._ropeCount / 2)) / (this._ropeCount / 2));
        this._ownerSp.scaleY = 1.5;
    }
    RopeBeenCut(isUp: boolean) {
        if (isUp) {
            this._topSprite = this._ownerSp;
        }
        else {
            this._bottomSprite = this._ownerSp;
        }
    }
    onUpdate() {
        if (this._rotate) {
            let direct = Laya.Point.create();
            direct.setTo(this._topSprite.x - this._bottomSprite.x, this._topSprite.y - this._bottomSprite.y);
            let angel = Math.atan2(direct.x, direct.y) * 180 / Math.PI * -1;
            this._ownerSp.rotation = angel;
            direct.recover();
        }
    }
}