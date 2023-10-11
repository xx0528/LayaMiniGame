import Cup from "./Cup";
import Us_sdlyg_er from "../../User/User";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";

export default class OverCup extends Cup {


    constructor() { super(); }

    onStart() {
        super.onStart();
        this.condition.visible = false;
    }

    addStar() {
        if(Us_sdlyg_er.getRankLevel()>=30)return;
        Us_sdlyg_er.addRankLevel();
        this.current_star_num++;
        if (this.current_star_num >= 5) {
            //晋级了
            this.changeLevel();
        } else {
            //普通长星   
            this.starList[this.current_star_num].scale(0, 0);
            Laya.timer.once(500, this, () => {
                Sound_sdlyg_Mgr.instance.playSound(SoundType.AddStar);
                Laya.Tween.to(this.starList[this.current_star_num], { alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.starList[this.current_star_num], { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.circInOut);
                }));
            })
        }
    }

    subStar() {
        Us_sdlyg_er.subRankLevel();
        if (this.current_star_num <= 0) {
            //降级了
            this.changeLevel();
        } else {
            //普通掉星
            Laya.timer.once(500, this, () => {
                Laya.Tween.to(this.starList[this.current_star_num], { alpha: 0 }, 500);
            })
        }
    }

    changeLevel() {
        Laya.Tween.to(this.m_owner, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.circInOut, Laya.Handler.create(this, () => {
            this.hideStar();
            this.current_star_num = 0;
            this.showStar();
            Laya.Tween.to(this.m_owner, { scaleX: 1, scaleY: 1 }, 800, Laya.Ease.circInOut);
        }))
    }

    hide() {
        this.m_owner.visible = false;
    }
}