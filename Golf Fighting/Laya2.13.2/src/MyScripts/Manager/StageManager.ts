import Stage from "../Ctrl/Stage";
import PreManager, { PreType } from "./PreManager";
import Hole from "../Ctrl/Hole";
import StrikeGroundManager from "./StrikeGroundManager";
import OverStage from "../Ctrl/OverStage";

export default class StageManager extends Laya.Script3D {

    private static _instance:StageManager;
    public static Instance(){
        return this._instance
    }

    private m_owner:Laya.Sprite3D;
    private _levelConfig:Stage[] = new Array();
    private readonly stage_dis:number = 9;    

    private _level_right_dis:number[] = new Array();

    constructor() { super(); }
    
    onAwake(){
        StageManager._instance = this;
        this.m_owner = this.owner as Laya.Sprite3D;
        this.m_owner.addComponent(StrikeGroundManager);

    }
/**
 * 根据配置设置场地
 * @param array 对应的配置字符串数组
 */
    SetStage(array:string[],complete?:Function,barrier_list?:number[],barrier_type_list?:number[]){  
        this._levelConfig = [];
        this._level_right_dis = [];
        let pos_z:number = 0;
        let barrier_num=0;
        for(let i = 0 ; i < array.length ; i ++){
            if(i<array.length-1){
                let stage:Stage = PreManager.createPre(PreType[array[i]],this.m_owner).addComponent(Stage);
                if(barrier_list){
                    if(barrier_list[barrier_num]==i){
                        stage.CreateFlag(barrier_type_list[barrier_num]);
                        barrier_num++;
                    }else{
                        stage.CreateFlag();   
                    }                    
                }else{
                    stage.CreateFlag();
                }
                stage.SetHoleId(i);                
                stage.Show(new Laya.Vector3(0,0,pos_z));
                this._levelConfig.push(stage);
                this._level_right_dis.push(stage.getRightDis());
                pos_z+=this.stage_dis;            
            }else{
                //最后一块场地
                let stage:Stage = PreManager.createPre(PreType[array[i]],this.m_owner).addComponent(OverStage);
                stage.CreateFlag();
                stage.SetHoleId(i);                
                stage.Show(new Laya.Vector3(0,0,pos_z));
                this._levelConfig.push(stage);
                this._level_right_dis.push(stage.getRightDis());                
            }
            // pos_z+=this.GetDisByStageType(PreType[array[i]]);
        }
        if(complete)complete()
    }

/**
 * 根据编号得到对应Stage
 */
    GetStageById(id:number):Stage{
        return this._levelConfig[id];
    }
/**
 * 销毁原来的场地
 */
    DestroyStage(){
        if(this._levelConfig){
            this._levelConfig.forEach(item => {
                let stage = item.owner as Laya.Sprite3D;
                stage.destroy();
            });
        }
    }

    getRightDis(id:number){
        return this._level_right_dis[id];
    }

    
// /**
//  * 根据不同的类型的舞台得到不同的距离
//  */
//     GetDisByStageType(type:PreType):number{
//         let dis :number = 0;
//         switch (type) {
//             case PreType.Stage1:
//                 dis = 9;
//                 break;
//             case PreType.Stage2:
//                 dis = 9;
//                 break;
//             case PreType.Stage3:
//                 dis = 9;
//                 break;
//             case PreType.Stage4:
//                 dis = 9;
//                 break;
//         }
//         return dis;
//     }


}