import GameManager from "../Manager/GameManager";

/**
 * 车库
 */
export default class Carport extends Laya.Script {


    private static _instance:Carport;
    public static Instance():Carport{
        return this._instance
    }
    private mCarLists:Laya.Sprite3D[] = new Array();
    constructor() { super(); }

    onAwake(){
        Carport._instance = this;
        for(let i = 0; i < GameManager.CarAmount ; i++ ){
            let car = this.owner.getChildByName("Car"+i) as Laya.Sprite3D;
            let ani:Laya.Animator = car.getComponent(Laya.Animator);
            ani.enabled = false;
            this.mCarLists.push(car);
        }
    }

    /**
     * 通过id获得对应汽车的对象
     * @param id 汽车对应的id
     */
    GetCarByID(id:number):Laya.Sprite3D{
        return this.mCarLists[id];
    }

}