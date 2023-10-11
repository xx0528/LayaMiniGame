import EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import SoundMgr from "../../Mgr/SoundMgr";


//箭矢
export default class Arrow extends Unit_JJVW_Base{
    protected _collision : Laya.BoxColliderShape;
    protected _speedX : number = -350;


    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);
        this._targetArr.push(ryw_UnitType.ryw_Bear);
        this._targetArr.push(ryw_UnitType.ryw_Tiger);
        this._targetArr.push(ryw_UnitType.ryw_Wolf);

        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
    }
    ryw_onLastInit(){
        this._collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        this._boxHeighy = this._collision.sizeY/2;
        // this._boxWidth = this._collision.localOffset.y;

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }
    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;

        this.Sprite3D.active
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}


        //碰撞范围检测
        this.ryw_onAssaultedArea()

        let v = new Laya.Vector3();
        this.transform.getRight(v); //箭的移动方向就是x方向
        v.x *= this._speedX*10;
        v.y *= this._speedX*10;
        v.z *= this._speedX*10;

        var begin = this.transform.localPosition;
        // var begin = new Laya.Vector3();
        // begin.x = this.transform.localPosition.x;
        // begin.y = this.transform.localPosition.y + this._boxWidth;
        // begin.z = this.transform.localPosition.z;
        //终点
        let end = new Laya.Vector3();
        end.x = v.x + begin.x;
        end.y = v.y + begin.y;
        end.z = v.z + begin.z;

        var time = this._defaultTimerDelta/1000;
        if ( ryw_UNITSTATE.ryw_Run==this.ryw_state){       
            this.ryw_runAssaulted(time);
            //碰撞范围检测
        }
        
        else if (ryw_UNITSTATE.None == this.ryw_state){
            if (this.ryw_onRayCastSprite(begin, end)){
                this.ryw_runAssaulted(time);
            }
        }
    }

    protected ryw_onRayCastSprite(begin:Laya.Vector3, end:Laya.Vector3): boolean{
        // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);


        var outHit : Laya.HitResult = new Laya.HitResult();
        this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
        if (outHit.succeeded){

            let spr = outHit.collider.owner as Laya.Sprite3D;
            // console.log("arrow onRayCastSprite  name = ",spr.name);
            if (null==spr || spr == this.Sprite3D){return false;}
            let name = spr.name
            let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
            if (null == otherUnit){return false;}
            if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){return false;}
            for (let index = 0; index < this._targetArr.length; index++) {
                let element = this._targetArr[index];
                if (otherUnit.Type == element){
                    console.log(this.Sprite3D.name + " 检测到 " + name);
                    return true;
                }
            }
        }
        return false;
    }


    protected ryw_runAssaulted(time:number){
        if (ryw_UNITSTATE.None == this.ryw_state){
            this.ryw_state = ryw_UNITSTATE.ryw_Run;
            Laya.timer.once(1000*3,this, this.ryw_destroyUnit);
            SoundMgr.ryw_instance.ryw_playSound("arrow");
        }
        // this._collider.applyImpulse(new Laya.Vector3(50*this._directionX,0,0));
        let v = new Laya.Vector3();
        this.transform.getRight(v); //箭的移动方向就是x方向
        v.x *= this._speedX * time;
        v.y *= this._speedX * time;
        v.z *= this._speedX * time;

        this.transform.localPositionX += v.x;
        this.transform.localPositionY += v.y;
        this.transform.localPositionZ += v.z;
    
    }
    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return;}
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                // this.state = UNITSTATE.Attack
                // this.state = UNITSTATE.None
                this.ryw_destroyUnit()
                break;
            }
        }

        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return;}
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                // this.state = UNITSTATE.Death
                // this.state = UNITSTATE.None
                this.ryw_destroyUnit()
                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }

    //攻击一次之后消失
    
    //测试
    onMouseDown(){
        // this.onCheckRay();
    }

    // onCheckRay(){
    //     var begin = this._transform.position
    //     var end : Laya.Vector3 = new Laya.Vector3();
    //     end.x =  begin.x + -50;
    //     end.y =  begin.y;
    //     end.z =  begin.z;


    //     var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
    //     lineSprite.addLine(begin, end,Laya.Color.RED, Laya.Color.RED);

    //     this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  this._outHitInfo);
    //     if (this._outHitInfo.succeeded){
    //         let spr = this._outHitInfo.collider.owner as Laya.Sprite3D;
    //         console.log("射线碰到的第一个物体  " + spr.name);
    //         for (let index = 0; index < this._targetArr.length; index++) {
    //             let element = this._targetArr[index];
    //             if (spr.name.indexOf(""+element) != -1){
    //                 console.log("发射箭矢");
    //                 break;
    //             }
    //         }
    //     }
    // }
}