export default class ScoreCard extends Laya.Script {

    private static _instance:ScoreCard;
    public static getInstance():ScoreCard{
        return this._instance;
    }
    private _card:Laya.Sprite3D;
    private _followCar:Laya.Sprite3D;
    
    constructor() { super(); }
    
    onAwake(){
        ScoreCard._instance = this;
        this._card = this.owner as Laya.Sprite3D;
        this.hide();
    }

    onUpdate(){
        if(this._card.active){
            this._card.transform.position = this._followCar.transform.position;
        }
    }

    show(car:Laya.Sprite3D){
        this._card.active = true;
        this._followCar = car;
    }

    hide(){
        this._followCar = null;
        this._card.active = false;
    }
    


}