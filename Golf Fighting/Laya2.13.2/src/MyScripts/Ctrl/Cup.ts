import Us_sdlyg_er from "../../User/User";

export default class Cup extends Laya.Script {

    protected m_owner:Laya.Image;
    protected condition:Laya.Image;
    protected starList:Laya.Sprite[] = new Array();
    protected current_star_num:number = 0;

    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Image;
        this.condition = this.m_owner.getChildByName("condition") as Laya.Image;

        let stars = this.m_owner.getChildByName("stars") as Laya.Sprite;
        for(let i = 0 ; i < 5 ; i++){
            let s = stars.getChildByName("star"+i) as Laya.Sprite;
            s.alpha = 0;
            this.starList.push(s);
        }
        this.showStar();
        
    }


    showStar(){
        let rank_level = Math.min(Math.floor(Us_sdlyg_er.getRankLevel()/5),5);        
        this.condition.skin = "Rank/condition"+rank_level+".png";
        this.m_owner.skin = "Rank/level"+rank_level+".png";
        this.current_star_num = Us_sdlyg_er.getRankLevel()%5;                
        for(let i = 0 ; i <=this.current_star_num ; i++){
            this.starList[i].alpha = 1;
        }
    }

    hideStar(){
        for(let i = 0 ; i < 5 ; i++){
            this.starList[i].alpha = 0;
        }
    }
}