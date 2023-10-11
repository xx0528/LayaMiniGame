import { ryw_UnitType } from "./UnitType";
import EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";
import LevelBase from "./Level/LevelBase";


export enum ryw_UNITSTATE{
    None = 0,
    ryw_Run = 1,
    ryw_Attack = 2,
    ryw_Death = 3,
}

export default class Unit_JJVW_Base extends Laya.Script3D{

    private _type : ryw_UnitType;
    private _scene3D : Laya.Scene3D;
    private _ownerSprite3D : Laya.Sprite3D;
    private _transform : Laya.Transform3D;

    public ryw_onLastInit() {};

    public ryw_onAssaulted(unit:ryw_UnitType) {};
    public ryw_onBeAssaulted(unit:ryw_UnitType) {} ;
    //可攻击的目标
    protected _targetArr : Array<ryw_UnitType> = new Array<ryw_UnitType>();
    //天敌，能 被攻击的目标
    protected _naturalEnemyArr : Array<ryw_UnitType> = new Array<ryw_UnitType>();
        

    // protected _detectionType : SHAPETYPE = SHAPETYPE.RAY;
    protected _isInitEnd : boolean = false;

    //重力
    protected _boxHeighy : number = 0;
    public ryw__gracityLenght : number = -0.3;
    public ryw__currentGravitySpeed : number = -40; //下坠速度
    // public _g: number = -9.8*3; //重力加速度
    public _g: number = 0; //重力加速度
    public ryw_standOnTheGround = true;
    protected ryw__lastGravityPos : number;
    protected _defaultTimerDelta : number = 16;

    //碰撞范围
    protected ryw__outHitArr : Array<Laya.HitResult> = new Array<Laya.HitResult>();
    protected ryw__boxWidth : number = 0;
    protected _subPosX : number = 0.3; //两物体中心点，相差距离
    protected _lastPos : Laya.Vector3;
    
    public ryw_state = ryw_UNITSTATE.None;


    public get Type():ryw_UnitType{
        return this._type;
    }

    public get Scene3D():Laya.Scene3D {
        return this._scene3D;
    }

    public get Sprite3D():Laya.Sprite3D{
        return this._ownerSprite3D;
    }

    public get transform():Laya.Transform3D {
        return this._transform;
    }

    protected ryw_onInit(scene : Laya.Scene3D, type: ryw_UnitType){
        this._type = type;
        this._scene3D = scene;

        this._ownerSprite3D = this.owner as Laya.Sprite3D;
        this._transform = this._ownerSprite3D.transform;
        
        // if (UnitType.Cannon == this._type || UnitType.Bomb == this._type){
        //     this._detectionType = SHAPETYPE.SPHERE;
        // }
        // else if (   UnitType.Arrow == this._type ||
        //             UnitType.Bear == this._type ||
        //             UnitType.Tiger == this._type ||
        //             UnitType.Wolf == this._type)    {
        //     this._detectionType = SHAPETYPE.BOX;
        // }

        this.ryw_onLastInit();
        
    }

    onStart(){


        // this.onShapeDetectionType(begin, end)
    }

    onEnable(){
        // EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_LevelInitEnd, this, this.onLevelInitEnd);
    }
    onDisable(){
        // EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_LevelInitEnd, this, this.onLevelInitEnd);
    }

    // protected onLevelInitEnd(){
    //     console.log("onLevelInitEnd");
    //     this._isInitEnd = true;
    // }

    onUpdate(){

    }
    onLateUpdate(){

    }

    // 重力检测
    protected ryw_onGravityCheck(){

        // if (UNITSTATE.Death == this.state){return ;}
        // if (null == this._lastPos){
        //     this._lastPos = this.transform.localPosition;
        //     // console.log("onAssaultedArea  this._lastPos == null");
        // }
        // var pos = this.transform.localPosition;
        // var end : Laya.Vector3 = new Laya.Vector3();
        // end.x = pos.x;
        // end.y = pos.y;
        // end.z = pos.z;


        // this.onAreaDetection(this._lastPos,pos);
        // this._lastPos = end;

        // _lastGravityPos
        if (false==this._isInitEnd){return ;}
        if (null == this.ryw__lastGravityPos){
            this.ryw__lastGravityPos = this.transform.localPosition.y - this._boxHeighy;
        }

        var time = this._defaultTimerDelta/1000;
        //重力检测

        let subPosY = (this.ryw__currentGravitySpeed*time + 0.5*this._g*time*time);
        if (subPosY>-0.3){
            subPosY = -0.3;
        }

        var fallVec : number = this.ryw__lastGravityPos + subPosY;


        // var fallVec : number = this._lastGravityPos + this._gracityLenght;
        // var fallVec : Laya.Vector3 = new Laya.Vector3();
        // fallVec.x =  this.transform.localPosition.x;
        // fallVec.y =  this._lastGravityPos.y + subPosY;
        // fallVec.z =  this.transform.localPosition.z;

        
        var begin : Laya.Vector3 = new Laya.Vector3(this.transform.localPosition.x, this.ryw__lastGravityPos, this.transform.localPosition.z)
        var end : Laya.Vector3 = new Laya.Vector3(this.transform.localPosition.x,fallVec, this.transform.localPosition.z)

        if (this.ryw_onFallDetection(begin,end)){
            this.ryw__currentGravitySpeed = -40;
            this.ryw_standOnTheGround = true;
        }
        else{
            this.transform.localPositionY = fallVec + this._boxHeighy;
            // this.transform.localPositionY = fallVec.y + this._boxHeighy;
            this.ryw__currentGravitySpeed += this._g*time;
            this.ryw_standOnTheGround = false;
            this.ryw__lastGravityPos = fallVec;
        }

        // if (this.onFallDetection(begin,fallVec)){
        //     this._currentGravitySpeed = 0;
        //     this.standOnTheGround = true;
        // }
        // else{
        //     this.transform.localPositionY += this._currentGravitySpeed*time + 0.5*this._g*time*time;
        //     this._currentGravitySpeed += this._g*time;
        //     this.standOnTheGround = false;
        // }
    }

    // protected onAreaDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
    //     this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end,  this._outHitArr);
    //     if (this._outHitArr.length==0){return ;}
    //     let isCrash :boolean = false;
    //     for (let i = 0; i < this._outHitArr.length; i++) {
    //         let outHit = this._outHitArr[i];
    //         if (outHit.succeeded){
    //             var spr = outHit.collider.owner as Laya.Sprite3D;
    //             if (null == spr|| this.Sprite3D == spr){ continue;}
    //             var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
    //             if (null == otherUnit){ 
    //                 //脚本没继承自 Unit_JJVW_Base，只能是墙壁和钎子  只是停止移动
    //                 this.state = UNITSTATE.None;
    //                 isCrash = true; 
    //                 continue;
    //             } 
    //             if (UNITSTATE.Death == otherUnit.state){continue;} //已经死亡，不做判断
    //             this.state = UNITSTATE.None; //停止移动
    //             for (let index = 0; index < this._targetArr.length; index++) {
    //                 let element = this._targetArr[index];
    //                 if (otherUnit.Type == element){
    //                     // 相互攻击
    //                     otherUnit.onBeAssaulted(this.Type);
    //                     otherUnit.onAssaulted(this.Type);
    //                     this.onBeAssaulted(otherUnit.Type);
    //                     this.onAssaulted(otherUnit.Type);
    //                     isCrash = true; 
    //                     break;
    //                 }
    //             }
    //             return isCrash;
    //         }            
    //     }
    //     return isCrash;
    // }

    //下落 检测
    protected ryw_onFallDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {

        // if (this.Type == UnitType.Cannon ){
        //     console.log(begin);
        //     console.log(end);
        //     console.log(" onFallDetection 下落检测 this.Type == UnitType.Cannon");
        //     var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        //     lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);
        // }

        // var outHit : Laya.HitResult = new Laya.HitResult();
        this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end,  this.ryw__outHitArr);
        if (this.ryw__outHitArr.length == 0){  return false;}
        var isCrash :boolean = false;
        for (let i = 0; i < this.ryw__outHitArr.length; i++) {
            let outHit = this.ryw__outHitArr[i];
            if (outHit.succeeded){
                var spr = outHit.collider.owner as Laya.Sprite3D;
                if (null == spr|| this.Sprite3D == spr){ continue;}
                var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
                if (null == otherUnit){
                    //脚本没继承自 Unit_JJVW_Base，只能是墙壁和钎子  只是停止移动
                    // this.state = UNITSTATE.None;
                    isCrash = true; 
                    continue;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){continue;}//已经死亡，不做判断
                if (ryw_UNITSTATE.ryw_Death == this.ryw_state){continue;}//已经死亡，不做判断
                // this.state = UNITSTATE.None; //停止移动
                otherUnit.ryw_onBeAssaulted(this.Type);
                otherUnit.ryw_onAssaulted(this.Type);
                this.ryw_onBeAssaulted(otherUnit.Type);
                this.ryw_onAssaulted(otherUnit.Type);
                isCrash = true;
                return isCrash;
            }
        }
        return isCrash;
    }

    // //下落 检测
    // protected onFallDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
    //     if (outHit.succeeded){
    //         var spr = outHit.collider.owner as Laya.Sprite3D;
    //         if (null == spr|| this.Sprite3D == spr){ return false;}

    //         return true;
    //     }
    //     return false;
    // }

    //范围检测
    protected ryw_onAssaultedArea() : boolean{
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return ;}
        if (null == this._lastPos){
            this._lastPos = new Laya.Vector3(this.transform.localPosition.x,this.transform.localPosition.y,this.transform.localPosition.z);
            // console.log("onAssaultedArea  this._lastPos == null");
        }
        var pos = new Laya.Vector3(this.transform.localPosition.x,this.transform.localPosition.y,this.transform.localPosition.z);
        var end : Laya.Vector3 = new Laya.Vector3(pos.x,pos.y,pos.z);

        let isAssaulted = this.ryw_onAreaDetection(this._lastPos,pos);
        this._lastPos = end;

        return  isAssaulted;
    }

     //本碰撞范围 射线 检测所有 上次坐标->这次坐标
     protected ryw_onAreaDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {

        
        // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

        this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end,  this.ryw__outHitArr);
        if (this.ryw__outHitArr.length==0){return ;}

        for (let i = 0; i < this.ryw__outHitArr.length; i++) {
            let outHit = this.ryw__outHitArr[i];
            if (outHit.succeeded){
                var spr = outHit.collider.owner as Laya.Sprite3D;
                if (null == spr|| this.Sprite3D == spr){ continue;}
                var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
                if (null == otherUnit){ return true;} 
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){continue;} //已经死亡，不做判断
                // this.state = UNITSTATE.None; //停止移动
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element){
                        // 相互攻击
                        
                        otherUnit.ryw_onBeAssaulted(this.Type);
                        this.ryw_onAssaulted(otherUnit.Type);
                        break;
                    }
                }
                return true;
            }            
        }
        return false;
    }

    // //本碰撞范围 射线 检测第一个 上次坐标->这次坐标
    // protected onAreaDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
    //     if (outHit.succeeded){
    //         var spr = outHit.collider.owner as Laya.Sprite3D;
    //         if (null == spr|| this.Sprite3D == spr){ return;}
    //         var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
    //         if (null == otherUnit){return;}
    //         if (UNITSTATE.Death == otherUnit.state){return;}
    //         this.state = UNITSTATE.None;
    //         for (let index = 0; index < this._targetArr.length; index++) {
    //             let element = this._targetArr[index];
    //             if (otherUnit.Type == element){
    //                 otherUnit.onBeAssaulted(this.Type);
    //                 this.onAssaulted(otherUnit.Type);
    //                 break;
    //             }
    //         }
    //         // var subX = otherUnit.transform.localPosition.x - this.transform.localPosition.x;
    //         // if ( Math.abs(subX) < this._subPosX){
    //         //     if (UNITSTATE.Death == otherUnit.state){return;}
    //         //     for (let index = 0; index < this._targetArr.length; index++) {
    //         //         let element = this._targetArr[index];
    //         //         if (otherUnit.Type == element){
    //         //             otherUnit.onBeAssaulted(this.Type);
    //         //             this.onAssaulted(otherUnit.Type);
    //         //             break;
    //         //         }
    //         //     }
    //         // }
    //         return true;
    //     }
    //     return false;
    // }





    // //射线 检测
    // protected onLineDetection(begin:Laya.Vector3, end:Laya.Vector3): boolean{
    //     var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
    //     lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
    //     if (outHit.succeeded){
    //         let spr = outHit.collider.owner as Laya.Sprite3D;
    //         console.log("射线碰到的第一个物体  " + spr.name);
    //         let name = spr.name
    //         for (let index = 0; index < this._targetArr.length; index++) {
    //             let element = this._targetArr[index];
    //             if (name.indexOf(""+element) != -1){
    //                 console.log("熊 扑过去");
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

    // //球形 检测
    // protected onSphereDetection(begin:Laya.Vector3, end:Laya.Vector3){
    //     var sphereCollider:Laya.SphereColliderShape = new Laya.SphereColliderShape();

    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.shapeCast(sphereCollider, begin, end, outHit);

    //     if (outHit.succeeded){
    //         var point = outHit.point //
    //     }
    // }

    // //盒子 检测
    // protected onBoxDetection(begin:Laya.Vector3, end:Laya.Vector3){
    //     var boxCollider:Laya.BoxColliderShape = new Laya.BoxColliderShape();

    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.shapeCast(boxCollider, begin, end, outHit);

    //     if (outHit.succeeded){

    //     }
    // }

    // protected onShapeDetectionType(begin:Laya.Vector3, end:Laya.Vector3, shapeType:SHAPETYPE, property?:any){
    //     // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
    //     // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

    //     if (SHAPETYPE.RAY == shapeType){
    //         this.onLineDetection(begin, end);
    //     }
    //     else if (SHAPETYPE.BOX == shapeType){
    //         this.onBoxDetection(begin, end)
    //     }
    //     else if (SHAPETYPE.SPHERE == shapeType){
    //         this.onSphereDetection(begin, end)
    //     }
    // }


    public ryw_destroyUnit()
    {

        this._ownerSprite3D.removeSelf();
        this._ownerSprite3D.destroy(true);
        this.ryw_standOnTheGround = true;
        this.ryw_state = ryw_UNITSTATE.ryw_Death;
    }

    onDestroy()
    {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.Sprite3D);
        Laya.timer.clearAll(this.Sprite3D);
        Laya.Tween.clearAll(this.transform);
        Laya.timer.clearAll(this.transform);
    }
}