import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import SoundMgr from "../../Mgr/SoundMgr";

//虎
export default class Tiger extends Unit_JJVW_Base{

    protected _collision : Laya.BoxColliderShape;
    protected _speedX : number = 40;
    protected _directionX : number = 1;

    protected _lastStand : boolean = true;
    protected _ani : Laya.Animator;

    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Warrior);
        this._targetArr.push(ryw_UnitType.ryw_Queen);

        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);

        // this._gracityLenght = -0.75;
    }

    ryw_onLastInit(){
        this._collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        this._boxHeighy = this._collision.sizeY/2 - this._collision.localOffset.y;
        // this._boxWidth = this._collision.localOffset.y;

        console.log(" this._collision.localOffset.y = "+  this._collision.localOffset.y);

        this._ani = (this.Sprite3D.getChildByName("Tiger") as Laya.Sprite3D).getComponent(Laya.Animator);
        this._ani.speed = 0.5;
        this._ani.play("load");

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }

    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}
        // console.log("Tiger onLateUpdate state = ", this.state);

        //重力检测
        this.ryw_onGravityCheck();
        if ( this.ryw_onAssaultedArea()){
            // this._ani.play("load");
            // this.state = UNITSTATE.None;
        }

        if (this.ryw_standOnTheGround){
            this.ryw_onEnemyCheck()
        }
        else{
            if ( ryw_UNITSTATE.ryw_Run==this.ryw_state){       
                var time = this._defaultTimerDelta/1000;
                this.ryw_runAssaulted(time);
                //碰撞范围检
            }
        }

        this._lastStand = this.ryw_standOnTheGround;
    }

    protected ryw_onEnemyCheck(){
        if (this.ryw_state == ryw_UNITSTATE.ryw_Death){return ;}
        var begin = this.transform.localPosition;
        var end : Laya.Vector3 = new Laya.Vector3();
        end.y = begin.y;
        end.z = begin.z;

        var time = this._defaultTimerDelta/1000;
        if (this.ryw_standOnTheGround){
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
                    if (ryw_UNITSTATE.ryw_Run == this.ryw_state){
                        this.ryw_state = ryw_UNITSTATE.None;
                        this._ani.play("load");
                    }
                }
            }
        }
        else if ( ryw_UNITSTATE.ryw_Run==this.ryw_state){       
            this.ryw_runAssaulted(time);
            //碰撞范围检测

        }




    }

    //
    protected ryw_runAssaulted(time:number){
        if (this.ryw_state == ryw_UNITSTATE.ryw_Death){return ;}
        if (ryw_UNITSTATE.None == this.ryw_state){
            this.ryw_state = ryw_UNITSTATE.ryw_Run;
            this._ani.play("walk");
            this.transform.localRotationEulerY = (this._directionX==1)?180:0;
        }
        this._speedX = (this.ryw_standOnTheGround)?40:10;
        this.transform.localPositionX += this._speedX * this._directionX * time;
    }

    protected ryw_onRayCastSprite(begin:Laya.Vector3, end:Laya.Vector3): boolean{
        var outHit : Laya.HitResult = new Laya.HitResult();
        this.Scene3D.physicsSimulation.raycastFromTo(begin, end,  outHit,Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER,Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
        if (outHit.succeeded){

            let spr = outHit.collider.owner as Laya.Sprite3D;
            if (null==spr || spr == this.Sprite3D){return false;}
            let name = spr.name
            let otherUnit = spr.getComponent(Unit_JJVW_Base) as Unit_JJVW_Base;
            if (null == otherUnit){return false;}
            if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state){return false;}
            // if (otherUnit.Type == UnitType.Bomb){ continue;} //
            for (let index = 0; index < this._targetArr.length; index++) {
                let element = this._targetArr[index];
                if (otherUnit.Type == element){
                    return true;
                }
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
                this.ryw_state = ryw_UNITSTATE.ryw_Attack
                this._ani.play("gongji");
                SoundMgr.ryw_instance.ryw_playSound("tiger");
                let firstFrame = true; //第一帧不判断
                var fun = function(){
                    if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                        if (ryw_UNITSTATE.ryw_Death != this.ryw_state){
                            this._ani.play("load");
                            this.ryw_state = ryw_UNITSTATE.None;
                        }
                        Laya.timer.clear(this, fun);
                        return ;
                    }
                    firstFrame = false;
                }
                Laya.timer.frameLoop(1, this, fun);

                break;
            }
        }
    }


    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        if (this.ryw_state == ryw_UNITSTATE.ryw_Death){return ;}
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                this.ryw_state = ryw_UNITSTATE.ryw_Death
                this._ani.play("die");
                SoundMgr.ryw_instance.ryw_playSound("animalDeath");
                let firstFrame = true; //第一帧不判断

                var fun = function(){
                    if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                        this._ani.speed = 0;
                        Laya.timer.clear(this, fun);
                        this.ryw_onDeath();
                        return ;
                    }
                    firstFrame = false;
                }
                Laya.timer.frameLoop(1, this, fun);
                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
    }

    protected ryw_onDeath(){
        let index = 0;
        var fun = function(){
            if (index>=5){
                Laya.timer.clear(this, fun);
                // this.state = UNITSTATE.None;
                this.ryw_destroyUnit();
            }
            // this.Sprite3D.active = (index%2==0)?false:true;
            if (index%2==0){
                this.transform.localScale = new Laya.Vector3();
            }
            else{
                this.transform.localScale = new Laya.Vector3(1,1,1);
            }
            index++;
        }
        Laya.timer.loop(150, this, fun);
    }
}