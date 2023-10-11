import { ryw_EventDef } from "../../Event/EventDef";
import ryw_EventMgr from "../../Event/EventMgr";
import Unit_JJVW_Base from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import PikeBody from "./PikeBody";
import ryw_SoundMgr from "../../Mgr/SoundMgr";

//钎子
export default class Pike extends Laya.Script3D{

    protected ryw__gravitySpeed : number = 98*8; //
    protected ryw__gravityTIme : number = 3; //单位秒
    protected ryw__gravityTween : Laya.Tween;
    // protected _collider : Laya.PhysicsCollider;
    public _transform : Laya.Transform3D;


    public ryw_isMove : boolean = false;
    protected _beginVibratePos : Laya.Vector3;
    protected _isVirate : boolean = false;
    public ryw_tipsModeForbid = false;

    onAwake(){
        // this._collider = this.owner.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;

        this._transform = (this.owner as Laya.Sprite3D).transform as Laya.Transform3D;

        var pikeBody1 : PikeBody = (this.owner.getChildByName("Cylinder").getChildByName("Cylinder_0") as Laya.Sprite3D).addComponent(PikeBody);
        pikeBody1.ryw_onSetPike(this);
        var pikeBody2 : PikeBody = (this.owner.getChildByName("pb_Mesh") as Laya.Sprite3D).addComponent(PikeBody);
        pikeBody2.ryw_onSetPike(this);

    }
    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){

    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        
    }

    public ryw_showTipsImage(){
        
    }

    public ryw_onVibrate(){
        if (this._isVirate){ return ; }

        this._isVirate = true;

        
        //抖动效果
        this._beginVibratePos = new Laya.Vector3(this._transform.localPosition.x,this._transform.localPosition.y,this._transform.localPosition.z);
        //变化坐标增量
        let v = new Laya.Vector3();
        this._transform.getRight(v); //

        var self = this;
        let subSpeed = 0.5;
        var move3 = function(){
            Laya.Tween.to(self._transform,{
                localPositionX:self._beginVibratePos.x,
                localPositionY:self._beginVibratePos.y,
                localPositionZ:self._beginVibratePos.z},
                100,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                    self._isVirate = false;
                })
            );
        }

        var index = 0;
        var move2 = function(){
            Laya.Tween.to(self._transform,{
                localPositionX:v.x*subSpeed*-1+self._beginVibratePos.x,
                localPositionY:v.y*subSpeed*-1+self._beginVibratePos.y,
                localPositionZ:v.z*subSpeed*-1+self._beginVibratePos.z},
                100,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                    if (index>=1){
                        move3();
                    }
                    else{
                        move1();
                    }
                    index++;

                })
            );
        }


        var move1 = function(){
            Laya.Tween.to(self._transform,{
                localPositionX:v.x*subSpeed+self._beginVibratePos.x,
                localPositionY:v.y*subSpeed+self._beginVibratePos.y,
                localPositionZ:v.z*subSpeed+self._beginVibratePos.z},
                100,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                    move2();
                })
            );
        }

        move1();

    }
    public ryw_onMyMouseDown(){
        // if (this.tipsModeForbid){
        //     console.log("提示模式 此钎子不能动 ",this.owner.name);
        //     return ;
        // }

        if (this._isVirate){
            this._isVirate = false;
            this.ryw_onClearTweenAndTimer();
            this._transform.localPositionX = this._beginVibratePos.x;
            this._transform.localPositionY = this._beginVibratePos.y;
            this._transform.localPositionZ = this._beginVibratePos.z;
        }
        // console.log("onMouseDownonMouseDownonMouseDown");

        // this._collider.enabled = false;
        //变化坐标增量
        let v = new Laya.Vector3();
        this._transform.getRight(v); //钎子的移动方向就是x方向
        v.x *= this.ryw__gravitySpeed * this.ryw__gravityTIme;
        v.y *= this.ryw__gravitySpeed * this.ryw__gravityTIme;
        v.z *= this.ryw__gravitySpeed * this.ryw__gravityTIme;

        //终点
        let endPos = new Laya.Vector3();
        endPos.x = v.x + this._transform.localPositionX;
        endPos.y = v.y + this._transform.localPositionY;
        endPos.z = v.z + this._transform.localPositionZ;

        this.ryw__gravityTween =  Laya.Tween.to(this._transform,{   
            localPositionX:endPos.x, 
            localPositionY:endPos.y,
            localPositionZ:endPos.z},1000*1*this.ryw__gravityTIme, Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                this.ryw_destroyUnit();
        })) as Laya.Tween;
        this.ryw_isMove = true;
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_OnMovePike, {pike : this});

        ryw_SoundMgr.ryw_instance.ryw_playSound("chou");
    }

    public ryw_destroyUnit()
    {
        this.owner.removeSelf();
        this.owner.destroy(true);
    }

    onDestroy()
    {
        this.ryw_onClearTweenAndTimer();
    }

    ryw_onClearTweenAndTimer(){
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.owner);
        Laya.timer.clearAll(this.owner);
        Laya.Tween.clearAll(this._transform);
        Laya.timer.clearAll(this._transform);
    }
}