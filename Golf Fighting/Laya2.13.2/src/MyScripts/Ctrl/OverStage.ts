import Stage from "./Stage";
import PreManager, { PreType } from "../Manager/PreManager";
import Hole from "./Hole";
import OverHole from "./OverHole";

export default class OverStage extends Stage {

    
    constructor() { super(); }

/**
 * 随机设置Over旗帜在当前场地上的位置
 */
CreateFlag(){
    let flag:Laya.Sprite3D = PreManager.createPre(PreType.OverFlag,this.m_stage);
    flag.transform.position = this.RandomFlagPos();
    this.m_hole = flag.getChildByName("Hole").addComponent(OverHole);
    
    this.right_dis = flag.transform.position.z-this.m_beatPos.z;    
} 

}