import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import SoundMgr from "../../Mgr/SoundMgr";

//狼
export default class Wolf extends Unit_JJVW_Base{
    protected _collision : Laya.BoxColliderShape;
    protected _speedX : number = 20;
    protected _directionX : number = 1;

    protected _ani : Laya.Animator;

    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);

        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
    }

    ryw_onLastInit(){
        this._collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        this._boxHeighy = this._collision.sizeY/2 - this._collision.localOffset.y;
        // this._boxWidth = this._collision.localOffset.y;

        this._ani = (this.Sprite3D.getChildByName("Wolf") as Laya.Sprite3D).getComponent(Laya.Animator);
        this._ani.play("lod");

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }

    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}
        //重力检测
        this.ryw_onGravityCheck()
        //碰撞范围检测
        if ( this.ryw_onAssaultedArea()){
            ryw_UNITSTATE.None==this.ryw_state
        }

        var begin = this.transform.localPosition;
        // var begin : Laya.Vector3 = new Laya.Vector3();
        // begin.x = this.transform.localPosition.x;
        // begin.y = this.transform.localPosition.y + this._boxWidth;
        // begin.z = this.transform.localPosition.z;
        var end : Laya.Vector3 = new Laya.Vector3();
        end.y =  begin.y;
        end.z =  begin.z;

        var time = this._defaultTimerDelta/1000;
        if ( ryw_UNITSTATE.ryw_Run==this.ryw_state){       
            this.ryw_runAssaulted(time);
            //碰撞范围检测

        }
        else if (ryw_UNITSTATE.None == this.ryw_state){
            //正反方向都要检测
            this._directionX = 1;
            end.x =  begin.x + 100 * this._directionX;
            if (this.ryw_onRayCastSprite(begin, end)){
                this.ryw_runAssaulted(time);
            }
            else{
                this._directionX = -1
                end.x =  begin.x + 100 * this._directionX;
                if (this.ryw_onRayCastSprite(begin, end)){
                    this.ryw_runAssaulted(time);
                }
                else{
                    //没有检测到
                }
            }
        }
    }

    protected ryw_onRayCastSprite(begin:Laya.Vector3, end:Laya.Vector3): boolean{
        var outHit : Laya.HitResult = new Laya.HitResult();
        this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit);
        if (outHit.succeeded){

            let spr = outHit.collider.owner as Laya.Sprite3D;
            if (null==spr || spr == this.Sprite3D){return false;}
            let name = spr.name
            let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
            if (null == otherUnit){return false;}
            if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){return false;}
            for (let index = 0; index < this._targetArr.length; index++) {
                let element = this._targetArr[index];
                if (otherUnit.Type == element){
                    return true;
                }
            }
        }
        return false;
    }


    protected ryw_runAssaulted(time:number){
        if (ryw_UNITSTATE.None == this.ryw_state){
            this.ryw_state = ryw_UNITSTATE.ryw_Run;
            this._ani.play("pao");
            if (this._directionX==1){
                this.transform.localRotationEulerY = (this._directionX==1)?180:0;
            }
        }
        // this._collider.applyImpulse(new Laya.Vector3(50*this._directionX,0,0));
        this.transform.localPositionX += this._speedX * this._directionX * time;
    }


    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                this.ryw_state = ryw_UNITSTATE.ryw_Attack
                this._ani.play("gongji");
                // let firstFrame = true; //第一帧不判断
                // Laya.timer.frameLoop(1, this, function(){
                //     if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                //         this._ani.play("load");
                //         this.state = UNITSTATE.None;
                //     }
                //     firstFrame = false;
                // });

                Laya.timer.frameOnce(1,this,function(){
                    if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                        this._ani.play("load");
                        this.ryw_state = ryw_UNITSTATE.None;
                    }
                });
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
                this.ryw_state = ryw_UNITSTATE.ryw_Death
                this._ani.play("die");
                // let firstFrame = true; //第一帧不判断
                // Laya.timer.frameLoop(1, this, function(){
                //     if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                //         this.state = UNITSTATE.None
                //         this.ryw_destroyUnit()
                //     }
                //     firstFrame = false;
                // });
                Laya.timer.frameOnce(1,this,function(){
                    if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                        this.ryw_state = ryw_UNITSTATE.None
                        this.ryw_onDeath()
                    }
                });
                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }

    protected ryw_onDeath(){
        SoundMgr.ryw_instance.ryw_playSound("animalDeath");
        this.ryw_destroyUnit();
    }
}