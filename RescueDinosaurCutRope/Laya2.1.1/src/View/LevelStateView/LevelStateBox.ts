import { LevelCo_JJKLBB_nfigData } from "../../Config/LevelConfig";
import Us_JJKLBB_er from "../../User/User";
import WXAPI from "../../WXAPI";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import { FreeRewardType } from "../FreeReward/FreeRewardView";

export default class LevelStateBox extends Laya.Script 
{

    public static LockClick : boolean = false;

    protected _currentTag : Laya.Sprite;
    protected _complateTag : Laya.Sprite;
    protected _lockTag : Laya.Sprite;
    
    protected _noEnergyCost : Laya.Sprite;
    protected _moreCrystalReward : Laya.Sprite;

    protected _levelNumText : Laya.FontClip;

    protected _data : LevelCo_JJKLBB_nfigData;

    onAwake()
    {
        this._currentTag = this.owner.getChildByName("Current") as Laya.Sprite;
        this._complateTag = this.owner.getChildByName("Complate") as Laya.Sprite;
        this._lockTag = this.owner.getChildByName("Lock") as Laya.Sprite;

        this._noEnergyCost = this.owner.getChildByName("NoEnergyCost") as Laya.Sprite;
        this._moreCrystalReward = this.owner.getChildByName("MoreCrystalReward") as Laya.Sprite;

        this._levelNumText = this.owner.getChildByName("LevelNumText") as Laya.FontClip;
    }

    public setData(data : LevelCo_JJKLBB_nfigData)
    {
        this._currentTag.visible = false;
        this._complateTag.visible = false;
        this._lockTag.visible = false;
        this._data = data;
        if(null != this._data)
        {
            var currentLevelNum = Us_JJKLBB_er.getLev_JJKLBB_eNum();
            this._levelNumText.value = String(this._data.levelNum);
            this._levelNumText.y = 69;
            if(currentLevelNum == this._data.levelNum)
            {
                this._currentTag.visible = true;
            }
            else if(currentLevelNum > this._data.levelNum)
            {
                this._complateTag.visible = true;
                this._levelNumText.y = 54;
            }
            else if(currentLevelNum < this._data.levelNum)
            {
                this._lockTag.visible = true;
            }
            this._noEnergyCost.visible = this._data.vedioCostNoEnergy == 1;
            this._moreCrystalReward.visible = this._data.vedioDoubleDiamond == 1;
        }
    }

    onClick()
    {
        var data = this._data
        if(null != data)
        {
            var currentLevelNum = Us_JJKLBB_er.getLev_JJKLBB_eNum();
            if(currentLevelNum >= data.levelNum)
            {
                if(1 == data.vedioCostNoEnergy)
                {
                    LevelStateBox.LockClick = true;
                    WXAPI.showRewardedVideoAd((ok)=>
                    {
                        if(ok)
                        {
                            //不消耗体力开局
                            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                                {
                                    levelNum : data.levelNum,
                                    costEnergy : data.costEnergy * 0,
                                    crystalReward : data.getDiamond,
                                })
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                        }
                        else
                        {
                            if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                                View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                                    {
                                        rewardType: FreeRewardType.Energy
                                    });
                                View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                                return;
                            }
                            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                                {
                                    levelNum : data.levelNum,
                                    costEnergy : data.costEnergy,
                                    crystalReward : data.getDiamond,
                                })
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                                
                        }
                        LevelStateBox.LockClick = false;
                    },()=>
                    {
                        if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                                {
                                    rewardType: FreeRewardType.Energy
                                });
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                            return;
                        }
                        //正常开局
                        LevelStateBox.LockClick = false;
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy,
                                crystalReward : data.getDiamond,
                            })
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                            
                    })
                }
                else if(1 ==  data.vedioDoubleDiamond)
                {
                    if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                            {
                                rewardType: FreeRewardType.Energy
                            });
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    WXAPI.showRewardedVideoAd((ok)=>
                    {
                        if(ok)
                        {
                            //双倍奖励开局
                            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                                {
                                    levelNum : data.levelNum,
                                    costEnergy : data.costEnergy,
                                    crystalReward : data.getDiamond * 2,
                                })
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                        }
                        else
                        {
                            //正常开局
                            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                                {
                                    levelNum : data.levelNum,
                                    costEnergy : data.costEnergy,
                                    crystalReward : data.getDiamond,
                                })
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                        }
                        LevelStateBox.LockClick = false;
                    },()=>
                    {
                        //正常开局
                        LevelStateBox.LockClick = false;
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy,
                                crystalReward : data.getDiamond,
                            })
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                    })
                }
                else
                {
                    if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                            {
                                rewardType: FreeRewardType.Energy
                            });
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    //正常开局
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                        {
                            levelNum : data.levelNum,
                            costEnergy : data.costEnergy,
                            crystalReward : data.getDiamond,
                        })
                    View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.LevelStateView);
                }
            }
        }
    }
}