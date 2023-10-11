import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import SoundMgr from "../../Mgr/SoundMgr";

//炸弹
export default class Bomb extends Unit_JJVW_Base{

    protected _rig : Laya.Rigidbody3D;
    // protected _currentGravitySpeed : number = 0; //下坠速度
    // protected _g: number = -98; //重力加速度
    // protected _gravityTween : Laya.Tween;

    protected _collision : Laya.SphereColliderShape;
    protected _special :Laya.Sprite3D;


    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);
        this._targetArr.push(ryw_UnitType.ryw_Bear);
        this._targetArr.push(ryw_UnitType.ryw_Tiger);
        this._targetArr.push(ryw_UnitType.ryw_Wolf);
        this._targetArr.push(ryw_UnitType.ryw_Cannon);
        this._targetArr.push(ryw_UnitType.ryw_Arrow);

        //无敌，没有能攻击我的
        // this._naturalEnemyArr.push();

        // Laya.Tween.to

        // this._collision = new Laya.SphereColliderShape(this._radius);
        // this._collision.localOffset = new Laya.Vector3(0,0.65,0);
    }

    ryw_onLastInit(){
        this._special = this.Sprite3D.getChildByName("GameObject").getChildByName("FX_BOOM").getChildByName("boom") as Laya.Sprite3D;
        this._special.active = false;

        var collider = this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        collider.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        this._collision = collider.colliderShape as Laya.SphereColliderShape;
        this._boxHeighy = this._collision.radius;

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }

    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;
    }
    onLateUpdate(){
        if (false==this._isInitEnd){return ;}
        //重力检测
        this.ryw_onGravityCheck();
        //炸弹的碰撞范围检测，就是重力检测

        this.ryw_onAssaultedArea();
    }
    // // 重力检测
    // protected onGravityCheck(){
    //     if (false==this._isInitEnd){return ;}

    //     var begin = this.transform.localPosition;
    //     //重力检测
    //     var fallVec : Laya.Vector3 = new Laya.Vector3();
    //     fallVec.x =  begin.x;
    //     fallVec.y =  begin.y - this._boxHeighy;
    //     fallVec.z =  begin.z;

    //     if (this.onFallDetection(begin,fallVec)){
    //         this.standOnTheGround = true;
    //     }
    //     else{
    //         this.transform.localPositionY += -0.5;
    //         this.standOnTheGround = false;
    //     }
    // }
    protected ryw_onGravityCheck(){

        if (false==this._isInitEnd){return ;}
        if (null == this.ryw__lastGravityPos){
            this.ryw__lastGravityPos = this.transform.localPosition.y - this._boxHeighy;
        }

        // var time = Laya.timer.delta/1000;
        var time = this._defaultTimerDelta/1000;
        //重力检测
        let subPosY = (this.ryw__currentGravitySpeed*time + 0.5*this._g*time*time);
        if (subPosY>-0.3){
            subPosY = -0.3;
        }

        var fallVec : number = this.ryw__lastGravityPos + subPosY;

        var begin : Laya.Vector3 = new Laya.Vector3(this.transform.localPosition.x, this.ryw__lastGravityPos, this.transform.localPosition.z)
        var end : Laya.Vector3 = new Laya.Vector3(this.transform.localPosition.x,fallVec, this.transform.localPosition.z)

        if (this.ryw_onFallDetection(begin,end)){
            // console.log("this.onFallDetection   == true");
            this.ryw__currentGravitySpeed = -40;
            this.ryw_standOnTheGround = true;
        }
        else{
            // console.log("this.onFallDetection   == false");
            
            this.transform.localPositionY = fallVec + this._boxHeighy;
            this.ryw__currentGravitySpeed += this._g*time;
            this.ryw_standOnTheGround = false;
            this.ryw__lastGravityPos = fallVec;
        }
    }

    //下落 检测
    protected ryw_onFallDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {

        // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

        this.Scene3D.physicsSimulation.shapeCastAll(this._collision, begin, end,  this.ryw__outHitArr);
        if (this.ryw__outHitArr.length==0){return ;}
        let isCrash :boolean = false;
        for (let i = 0; i < this.ryw__outHitArr.length; i++) {
            let outHit = this.ryw__outHitArr[i];
            if (outHit.succeeded){
                var spr = outHit.collider.owner as Laya.Sprite3D;
                if (null == spr|| this.Sprite3D == spr){ continue;}
                // console.log("onFallDetection   spr.name = ", spr.name);
                let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
                if (null==otherUnit){ 
                    isCrash = true; 
                    continue;
                }
                // console.log("Bomb otherUnit.Type = "+ otherUnit.Type);
                if (ryw_UNITSTATE.ryw_Death == this.ryw_state){continue;}
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.ryw_state == ryw_UNITSTATE.ryw_Death){break;}
                    if (otherUnit.Type == element){
                        console.log("发生爆炸");
                        otherUnit.ryw_onBeAssaulted(this.Type);
                        this.ryw_onAssaulted(otherUnit.Type);
                        break;
                    }
                }
                isCrash = true;
                return isCrash;
            }
        }
        return isCrash;
    }

    //范围检测
    protected ryw_onAssaultedArea(): boolean{
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return ;}
        var pos = new Laya.Vector3(this.transform.localPosition.x - this._boxHeighy*1,this.transform.localPosition.y,this.transform.localPosition.z);
        var end : Laya.Vector3 = new Laya.Vector3(this.transform.localPosition.x + this._boxHeighy*1,this.transform.localPosition.y,this.transform.localPosition.z);
        let isAssaulted = this.ryw_onAreaDetection(pos,end);
        return isAssaulted;
    }

    //本碰撞范围 射线 检测所有 上次坐标->这次坐标
    protected ryw_onAreaDetection(begin:Laya.Vector3, end:Laya.Vector3):boolean {
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return ;}
        // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

        this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end,  this.ryw__outHitArr);
        // this.Scene3D.physicsSimulation.shapeCastAll(this._collision, begin, end, this._outHitArr);
        if (this.ryw__outHitArr.length==0){return ;}

        for (let i = 0; i < this.ryw__outHitArr.length; i++) {
            let outHit = this.ryw__outHitArr[i];
            if (outHit.succeeded){
                var spr = outHit.collider.owner as Laya.Sprite3D;
                if (null == spr|| this.Sprite3D == spr){ continue;}
                var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
                if (null == otherUnit){ continue;} 
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

    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return;}
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                // this.state = UNITSTATE.Attack
                this.ryw_state = ryw_UNITSTATE.ryw_Death
                this.onBombExplosion();
                break;
            }
        }
    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return;}
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                // this.state = UNITSTATE.Death
                this.ryw_state = ryw_UNITSTATE.ryw_Death
                this.onBombExplosion()
                break;
            }
        }
    }



    // //球形 检测
    // protected onSphereDetection(begin:Laya.Vector3, end:Laya.Vector3):Laya.Vector3 | null{

    //     var outHit : Laya.HitResult = new Laya.HitResult();
    //     this.Scene3D.physicsSimulation.shapeCast(this._collision, begin, end, outHit);

    //     if (outHit.succeeded){
    //         var spr = outHit.collider.owner as Laya.Sprite3D;
    //         if (null == spr){ return };
    //         let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;


    //         for (let index = 0; index < this._targetArr.length; index++) {
    //             let element = this._targetArr[index];
    //             if (otherUnit.Type == element){
    //                 // console.log("发生爆炸");
    //                 otherUnit.onBeAssaulted(this.Type);
    //                 this.onBombExplosion();
    //                 break;
    //             }
    //         }
    //         return outHit.point;
    //     }

    //     return null;
    // }


    // onTenesmus(){
    //    //变化坐标增量
    //    let v = new Laya.Vector3();
    //    this._transform.getUp(v); //炸弹的移动方向就是Y方向
    //    v.x *= this._gravitySpeed * this._gravityTIme;
    //    v.y *= this._gravitySpeed * this._gravityTIme;
    //    v.z *= this._gravitySpeed * this._gravityTIme;

    //    //终点
    //    let endPos = new Laya.Vector3();
    //    endPos.x = v.x + this._transform.localPositionX;
    //    endPos.y = v.y + this._transform.localPositionY;
    //    endPos.z = v.z + this._transform.localPositionZ;

    //     this._gravityTween =  Laya.Tween.to(this._ownerSprite3D.transform,{   
    //         localPositionX:endPos.x, 
    //         localPositionY:endPos.y,
    //         localPositionZ:endPos.z},1000*1*this._gravityTIme,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
    //         // this.ryw_destroyUnit();
    //     })) as Laya.Tween;
    // }

    //爆炸了之后消失，只能攻击一次

    // onCollisionEnter(collision: Laya.Collision){
    //     let spr = collision.other.owner as Laya.Sprite3D;
    //     if (spr == null){ return;}
    //     console.log("碰撞器碰到的第一个物体  " + spr.name);
    //     if (spr.name.indexOf("Arrow") != -1){
    //         //穿透
    //         return;
    //     }

    //     //停止运动
    //     console.log("停止运动");

    //     for (let index = 0; index < this._targetArr.length; index++) {
    //         let element = this._targetArr[index];
    //         if (spr.name.indexOf(""+element) != -1){
    //             console.log("发生爆炸");
    //             // Laya.Tween.clear(this._gravityTween);
    //             var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
    //             otherUnit.onBeAssaulted(this.Type);
    //             this.onBombExplosion();
    //             break;
    //         }
    //     }
    // }

    // onCollisionEnter(collision: Laya.Collision){
    //     if (UNITSTATE.Death==this.state){return ;}
    //     let spr = collision.other.owner as Laya.Sprite3D;
    //     if (spr == null){ return;}
    //     // console.log("炸弹碰到的第一个物体  " + spr.name);
    //     this.state = UNITSTATE.None

    //     var otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
    //     if (null == otherUnit){return ;}
    //     if (UNITSTATE.Death == otherUnit.state){return;}
    //     for (let index = 0; index < this._targetArr.length; index++) {
    //         let element = this._targetArr[index];
    //         if (otherUnit.Type == element){
    //             // console.log("炸弹停止运动，攻击");
    //             // this._collider.linearVelocity = new Laya.Vector3(0,0,0);
    //             // Laya.Tween.clear(this._gravityTween);

    //             otherUnit.onBeAssaulted(this.Type);
    //         //    (otherUnit.Sprite3D.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D ).linearDamping=100;
    //             this.onAssaulted(otherUnit.Type);
    //             break;
    //         }
    //     }
    // }


    //炸弹爆炸
    protected onBombExplosion(){
        this.ryw_state = ryw_UNITSTATE.ryw_Death;
        SoundMgr.ryw_instance.ryw_playSound("bomb");
        this._special.active = true;
        this.transform.localScale = new Laya.Vector3();
        Laya.timer.once(1000, this, ()=>{
            this._special.active = false;
            this.ryw_destroyUnit();
        });
    }

}