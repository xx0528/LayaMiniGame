import Camera from "./Camera";
import Wheel from "./Wheel";
import GameManager from "../Manager/GameManager";
import Utilit from "../../Utilit";
import Rookie from "./Rookie";

export default class Car extends Laya.Script3D {

    protected mCar :Laya.Sprite3D;    
    protected mLanePosX:number = 0;
    protected mRig:Laya.Rigidbody3D;
    public static mLength:number = 0;
    protected mHeadstock:Laya.Sprite3D;   //车头
    protected mTailstock:Laya.Sprite3D;   //车尾
    public mCarID:number = 0;
    protected mWheelLists:Wheel[] = new Array();
    protected mCarModel:Laya.Sprite3D;

    protected mHeadLight0:Laya.Sprite3D;
    protected mHeadLight1:Laya.Sprite3D;
    protected mCarAni:Laya.Animator;

    protected modelStartLocalPos:Laya.Vector3;
    protected modelStartLocalRot:Laya.Vector3;

    protected mRookie:Rookie;
    
    
    constructor() { super(); }
    
    onAwake(){
        this.mCar = this.owner as Laya.Sprite3D;
        this.mRig = this.mCar.getComponent(Laya.Rigidbody3D);
        this.mHeadstock = this.mCar.getChildByName("Headstock") as Laya.Sprite3D;
        this.mTailstock = this.mCar.getChildByName("Tailstock") as Laya.Sprite3D;
        this.mCarModel = this.mCar.getChildByName("CarModel") as Laya.Sprite3D;

        this.mHeadLight0 = (this.mCar.getChildByName("HeadLight0")as Laya.Sprite3D);
        this.mHeadLight0.active = false;
        this.mHeadLight1 = (this.mCar.getChildByName("HeadLight1")as Laya.Sprite3D);
        this.mHeadLight1.active = false;

        this.mRookie = this.mCar.getChildByName("rookie").addComponent(Rookie);
        this.mRookie.hide();

        this.modelStartLocalPos = this.mCarModel.transform.localPosition.clone();
        this.modelStartLocalRot = this.mCarModel.transform.localRotationEuler.clone();

        this.mCarAni = this.mCar.getComponent(Laya.Animator);
        this.mCarAni.enabled = false;

        let lunzi = this.mCarModel.getChildByName("lunzi") as Laya.Sprite3D;
        lunzi._children.forEach(child => {
            let wheel = (child as Laya.Sprite3D).addComponent(Wheel);
            this.mWheelLists.push(wheel);
        });   
        let mesh = this.mCarModel as Laya.MeshSprite3D;
        mesh.meshRenderer.castShadow = true;   
    }

    SetCarTrans(pos:Laya.Vector3,rot:Laya.Vector3){
        this.mCar.transform.position = new Laya.Vector3(pos.x,this.mCar.transform.position.y,pos.z);
        this.mCar.transform.rotationEuler = rot;
        this.mLanePosX = this.mCar.transform.position.x;
        this.Show();
    }

    GetRookie():Rookie{
        return this.mRookie;
    }

    GetCarPos():Laya.Vector3{
        return this.mCar.transform.position;
    }

    GetHeadstock():Laya.Vector3{
        return this.mHeadstock.transform.position;
    }

    GetTailstock():Laya.Vector3{
        return this.mTailstock.transform.position;
    }

    GetCar():Laya.Sprite3D{
        return this.mCar;
    }

    Hide(){
        this.mCar.active = false;
        this.mRookie.hide();
    }

    Show(){
        this.mCarModel.transform.localPosition = this.modelStartLocalPos;
        this.mCarModel.transform.localRotationEuler = this.modelStartLocalRot;
        this.mCar.active = true;
        this.mCarAni.enabled = false;        
        this.ResetWheel();
    }

    private ResetWheel(){
        this.mWheelLists.forEach(wheel => {
            (wheel as Wheel).Reset();
        });
    }



}

