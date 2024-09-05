import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import Cannonball from "./Cannonball";
import SoundMgr from "../../Mgr/SoundMgr";


//大炮
export default class Cannon extends Unit_JJVW_Base{
    protected _collision : Laya.BoxColliderShape;
    protected _barrel :Laya.Sprite3D;
    protected _ballSprite3D : Laya.Sprite3D;
    protected _ball : Cannonball;
    public directionX : number = 1;

    protected _speedX : number = 20;

    protected _ani : Laya.Animator;

    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);
        this._targetArr.push(ryw_UnitType.ryw_Bear);
        this._targetArr.push(ryw_UnitType.ryw_Tiger);
        this._targetArr.push(ryw_UnitType.ryw_Wolf);


        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
    }
    ryw_onLastInit(){
        this._barrel = this.Sprite3D.getChildByName("Barrel") as Laya.Sprite3D;
        this._ballSprite3D = this.Scene3D.getChildByName("Cannonball1") as Laya.Sprite3D;

        

        this._collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        this._boxHeighy = this._collision.sizeY/2 - this._collision.localOffset.y;
        // this._boxWidth = this._collision.localOffset.y;

        this._ani = (this.Sprite3D.getChildByName("Cannon").getChildByName("Cannon") as Laya.Sprite3D).getComponent(Laya.Animator);
        // this._ani.play("gongji");
        console.log("Cannon  ryw_onLastInit ");
        this._ani.enabled = false;

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }
    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;

        //碰撞范围检测 应该是弹药用来检测
    }

    ryw_getBarrel():Laya.Sprite3D{
        return this._barrel;
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}

        //重力检测
        this.ryw_onGravityCheck()

        let v = new Laya.Vector3();
        this.transform.getRight(v); //箭的移动方向就是x方向

        // var begin = this.transform.localPosition;
        // //终点
        // let end = new Laya.Vector3();
        // end.x = v.x + begin.x;
        // end.y = v.y + begin.y;
        // end.z = v.z + begin.z;

        var begin = this.transform.localPosition;
        // var begin = new Laya.Vector3();
        // begin.x = this.transform.localPosition.x;
        // begin.y = this.transform.localPosition.y + this._boxWidth;
        // begin.z = this.transform.localPosition.z;
        //终点
        let end = new Laya.Vector3();
        end.x = v.x * this._speedX*5 + begin.x;
        end.y = v.y * this._speedX*5 + begin.y;
        end.z = v.z * this._speedX*5 + begin.z;


        var time = this._defaultTimerDelta/1000;
        if (ryw_UNITSTATE.None == this.ryw_state){
            if (this.ryw_onRayCastSprite(begin, end)){
                this.ryw_runAssaulted(time, v);
            }
        }
    }

    protected ryw_onRayCastSprite(begin:Laya.Vector3, end:Laya.Vector3): boolean{

        // var lineSprite: Laya.PixelLineSprite3D = this.Scene3D.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
        // lineSprite.addLine(begin, end,Laya.Color.GREEN, Laya.Color.GREEN);


        var outHit : Laya.HitResult = new Laya.HitResult();
        this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
        if (outHit.succeeded){

            let spr = outHit.collider.owner as Laya.Sprite3D;
            if (null==spr || spr == this.Sprite3D){return false;}
            let name = spr.name
            // console.log(" spr.name  = ",name);
            let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
            if (null == otherUnit){return false;}
            if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){return false;}
            for (let index = 0; index < this._targetArr.length; index++) {
                let element = this._targetArr[index];
                if (otherUnit.Type == element){
                    // console.log("Cannon  onRayCastSprite  otherUnit = ",name)
                    if (otherUnit.Sprite3D.transform.localPositionX < this.Sprite3D.transform.localPositionX){
                        this.directionX = -1;
                    }

                    return true;
                }
            }
        }
        return false;
    }

    protected ryw_runAssaulted(time:number, orientation :Laya.Vector3){
        if (ryw_UNITSTATE.None == this.ryw_state){
            this._ani.enabled = true;
            console.log("Cannon  ryw_runAssaulted  play gongji");
            // this._ani.play("gongji")
            this.ryw_state = ryw_UNITSTATE.ryw_Run;
            let firstFrame = true; //第一帧不判断
            var fun = function(){
                if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                    Laya.timer.clear(this, fun);
                    this._ani.enabled = false;
                    return ;
                }
                firstFrame = false;
            }
            Laya.timer.frameLoop(1, this, fun);


            Laya.timer.once(0, this, ()=>{
                SoundMgr.ryw_instance.ryw_playSound("cannon");
                var newball = Laya.Sprite3D.instantiate(this._ballSprite3D);
                var ball = newball.addComponent(Cannonball) as Cannonball;
                this.Scene3D.addChild(newball);
                newball.transform.localPosition = this.Sprite3D.transform.localPosition;
                ball.ryw_onSetCannon(this, orientation);
            });




        }


        // this.transform.localPositionX += this._speedX * time;
    
    }

    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death == this.ryw_state){return;}
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                // this.state = UNITSTATE.Attack
                // this.state = UNITSTATE.None;
                break;
            }
        }
    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                this.ryw_state = ryw_UNITSTATE.None;
                this.ryw_destroyUnit()
                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }

    //炮 可以多次攻击
}