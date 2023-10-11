export default class LevelTitle extends Laya.Script{

    protected _bg :Laya.Image = null;
    protected _diImg : Laya.Sprite = null;
    protected _guanImg :Laya.Sprite = null;
    protected _fontClip :Laya.FontClip = null;
    onAwake(){
        this._bg = this.owner as Laya.Image;
        this._diImg = this.owner.getChildByName("di") as Laya.Sprite;
        this._guanImg = this.owner.getChildByName("guan") as Laya.Sprite;
        this._fontClip = this.owner.getChildByName("fontClip") as Laya.FontClip;
    }

    onStart(){

    }

    setLevelString(num:number){
        let str = num.toString();
        this._fontClip.value = str;
    }
}  