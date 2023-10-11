export default class SkeletonPlayWin extends Laya.Script {
    // private _ownerSp: Laya.Sprite;
    private _sk: Laya.Sprite;
    onAwake() {
        //this._ownerSp = this.owner as Laya.Sprite;
        this._sk = this.owner as Laya.Sprite;
        let skeleton = new Laya.Skeleton();
        skeleton.load("subRes/longgu/NewProject.sk", Laya.Handler.create(this, (res) => {
            this._sk.addChild(res);

            res.play(0,true);
        }));
        //  skeleton.scaleX = skeleton.scaleX / 4;
        // skeleton.scaleY = skeleton.scaleY / 4;


        //skeleton.play("SHULE",true);
    }
}