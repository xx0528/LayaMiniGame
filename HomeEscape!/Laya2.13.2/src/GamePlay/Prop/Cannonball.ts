import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import Cannon from "./Cannon";
import SoundMgr from "../../Mgr/SoundMgr";

//大炮
export default class Cannonball extends Laya.Script3D{

        //可攻击的目标
    protected _targetArr : Array<ryw_UnitType> = new Array<ryw_UnitType>();
    protected _collision : Laya.SphereColliderShape;
        //碰撞范围
    protected _outHitArr : Array<Laya.HitResult> = new Array<Laya.HitResult>();

    protected _cannon : Cannon;
    protected _scene3D : Laya.Scene3D;
    protected _type : ryw_UnitType;
    protected _barrel : Laya.Sprite3D;

    protected _transform : Laya.Transform3D;
    protected _boxWidth : number = 0;
    protected _directionX = 1;
    protected _speedBallX : number = 300;
    protected _orientation :Laya.Vector3;

    protected _isStop : boolean = false;

    protected _lastPos : Laya.Vector3;
    protected _defaultTimerDelta : number = 16;

    protected _special :Laya.Sprite3D;

    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);
        this._targetArr.push(ryw_UnitType.ryw_Bear);
        this._targetArr.push(ryw_UnitType.ryw_Tiger);
        this._targetArr.push(ryw_UnitType.ryw_Wolf);

        this._transform = (this.owner as Laya.Sprite3D).transform as Laya.Transform3D;



        this._special = this.owner.getChildByName("Bomb").getChildByName("FX_BOOM").getChildByName("boom") as Laya.Sprite3D;
        this._special.active = false;

        this._collision = (this.owner.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.SphereColliderShape;
        this._boxWidth = this._collision.radius;
    }
    // onStart(){
    //     let self = this;
    //     Laya.Sprite3D.load("subRes/LayaScene/Conventional/bomb.lh", Laya.Handler.create(null, function(sp){
    //         self._special = self.owner.getChildByName("GameObject").addChild(sp) as Laya.Sprite3D;
    //         self._special.active = false;
    //     }));
    // }


    onLateUpdate(){
        if (false == this.owner.active){return ;}
        if (this._isStop){return ;}
        if (null == this._lastPos){
            this._lastPos = this._transform.localPosition;
        }
        var pos = new Laya.Vector3();
        pos.x = this._transform.localPosition.x + this._boxWidth;
        pos.y = this._transform.localPosition.y;
        pos.z = this._transform.localPosition.z;
        
        //碰撞范围检测
        if (!this.ryw_onAssaultedDetection(this._lastPos, pos)){
            //运动
            this.ryw_runAssaulted();
        }
        this._lastPos = pos;
    }

    ryw_onSetCannon(cannon : Cannon , orientation: Laya.Vector3){
        this._cannon = cannon;
        this._scene3D = cannon.Scene3D as Laya.Scene3D;
        this._type = cannon.Type as ryw_UnitType;
        this._barrel = cannon.ryw_getBarrel() as Laya.Sprite3D;
        this._orientation = orientation;
        this.owner.active = true;
        // this._directionX = cannon.directionX;

        Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }

    protected ryw_onAssaultedDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
        // console.log(begin);
        // console.log(end);
        // console.log("Cannonball onAssaultedDetection  *******************************");
        // var lineSprite: Laya.PixelLineSprite3D = this._scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

        this._scene3D.physicsSimulation.shapeCastAll(this._collision, begin, end,  this._outHitArr);
        if (this._outHitArr.length == 0){return ;}
        for (let i = 0; i < this._outHitArr.length; i++) {
            let outHit = this._outHitArr[i];
            if (outHit.succeeded){
                var spr = outHit.collider.owner as Laya.Sprite3D;
                if (null == spr || this.owner == spr){; continue;}
                let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
                if (null==otherUnit || otherUnit.ryw_state==ryw_UNITSTATE.ryw_Death || ryw_UnitType.ryw_Cannon==otherUnit.Type){ continue;}
                let isCollisionUnit :boolean = false;
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                if (otherUnit.Type == element){
                        otherUnit.ryw_onBeAssaulted(this._type);
                        this.ryw_onAssaulted(otherUnit.Type);
                        isCollisionUnit = true;
                        break;
                    }
                }
                if (!isCollisionUnit){
                    console.log(outHit.collider.owner.name);
                    this.ryw_onAssaulted(ryw_UnitType.None);
                }
                return true;
            }
        }
        return false;
    }

    // 检测
    // protected onAssaultedDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this._scene3D.physicsSimulation.shapeCast(this._collision, begin, end,  outHit);
    //     if (outHit.succeeded){
    //         var spr = outHit.collider.owner as Laya.Sprite3D;
    //         if (null == spr|| this.owner == spr){ return false;}
    //         let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
    //         if (null==otherUnit){ console.log("otherUnit name "+ spr.name); return  false;}
    //         for (let index = 0; index < this._targetArr.length; index++) {
    //             let element = this._targetArr[index];
    //             if (otherUnit.Type == element){
    //                 // console.log("发生爆炸");
    //                 otherUnit.onBeAssaulted(this._type);
    //                 this.onAssaulted(otherUnit.Type)
    //                 break;
    //             }
    //         }
    //         return true;
    //     }
    //     return false;
    // }

    ryw_runAssaulted(){

        let v = new Laya.Vector3();
        // this._transform.getRight(v); //移动方向就是x方向
        var time = this._defaultTimerDelta/1000;
        // let time = Laya.timer.delta/1000;
        v.x = this._speedBallX * time * this._orientation.x;
        v.y = this._speedBallX * time * this._orientation.y;
        v.z = this._speedBallX * time * this._orientation.z;

        this._transform.localPositionX += v.x;
        this._transform.localPositionY += v.y;
        this._transform.localPositionZ += v.z;


    }

    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        console.log(this._type + " 攻击 " + unit);
        this._cannon.ryw_state = ryw_UNITSTATE.None;
    
        this._isStop = true;
        // this.ryw_destroyUnit()
        this.ryw_onBombExplosion();
    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        console.log(unit + " 被攻击 " + this._type);
        this._cannon.ryw_state = ryw_UNITSTATE.None;
        this._isStop = true;
        // this.ryw_destroyUnit()
        this.ryw_onBombExplosion();
    }

    //炸弹爆炸
    protected ryw_onBombExplosion(){
        SoundMgr.ryw_instance.ryw_playSound("bomb");
        this._special.active = true;
        (this.owner as Laya.Sprite3D).transform.localScale = new Laya.Vector3();
        Laya.timer.once(1000, this, ()=>{
            this._special.active = false;
            this.ryw_destroyUnit();
        });
    }



    public ryw_destroyUnit()
    {
        this.owner.removeSelf();
        this.owner.destroy(true);
    }

    onDestroy()
    {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.owner);
        Laya.timer.clearAll(this.owner);
        Laya.Tween.clearAll(this._transform);
        Laya.timer.clearAll(this._transform);
    }

}