import Even_JJKLBB_tMgr from "../Event/EventMgr";
import { Event_JJKLBB_Def } from "../Event/EventDef";
import GameComm_JJKLBB_onConfig from "../Config/GameCommonConfig";
import Game_JJKLBB_Mgr from "../Mgr/GameMgr";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserG_JJKLBB_ameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量
    public  energyNum: number = 0;//体力数量
    public  readonly actorSkins : Array<number> = [1];//已解锁的皮肤
    public  curActorSkin : number = 1;//当前皮肤
    public  lastSignInTime: number = 0;//上次签到时间
}

export default class Us_JJKLBB_er extends Laya.Script 
{
    public static co_JJKLBB_de: string = "";
    public static open_JJKLBB_Id: string = "";
    public static tok_JJKLBB_en: string = null;
    public static nic_JJKLBB_kName: string = "";
    public static gen_JJKLBB_der:number = 0;

    public static is_JJKLBB_Login: boolean = false;

    private static readonly _gameData : UserG_JJKLBB_ameData = new UserG_JJKLBB_ameData();

    public static getS_JJKLBB_aveData() : string
    {
        return JSON.stringify(Us_JJKLBB_er._gameData);
    }


    public static testIn_JJKLBB_itUser()
    {
        var storageStr = localStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            Us_JJKLBB_er._gameData.levelNum = 1;
            Us_JJKLBB_er._gameData.moneyNum = 0;
            Us_JJKLBB_er._gameData.crystalNum = 0;
            Us_JJKLBB_er._gameData.energyNum = 80;
            return;
        }
        Us_JJKLBB_er._gameData.levelNum = data.levelNum;
        Us_JJKLBB_er._gameData.moneyNum = data.moneyNum;
        Us_JJKLBB_er._gameData.crystalNum = data.crystalNum;
        Us_JJKLBB_er._gameData.energyNum = data.energyNum;
        var actorSkins = data.actorSkins;
        if(null != actorSkins)
        {
            for(var i=0;i < actorSkins.length;++i)
            {
                if(1 != actorSkins[i])
                {
                    Us_JJKLBB_er._gameData.actorSkins.push(actorSkins[i]);
                }
            }
        }
        Us_JJKLBB_er._gameData.curActorSkin = data.curActorSkin || 1;
        if (null == data.lastSignInTime) {
            Us_JJKLBB_er._gameData.energyNum = 80;
            console.log("初始化 恢复体力----------");
        }
        else {
            if(Us_JJKLBB_er.canSignIn(data.lastSignInTime))
            {
                console.log("恢复体力----------");
                Us_JJKLBB_er._gameData.energyNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        Us_JJKLBB_er._gameData.lastSignInTime = Date.now();
    }

    public static initi_JJKLBB_User(data)
    {
        if(data && data.cddata && 0 != data.cddata)
        {
            Us_JJKLBB_er._gameData.levelNum = data.cddata.levelNum;
            Us_JJKLBB_er._gameData.moneyNum = data.cddata.moneyNum;
            Us_JJKLBB_er._gameData.crystalNum = data.cddata.crystalNum;
            Us_JJKLBB_er._gameData.energyNum = data.cddata.energyNum;
            var actorSkins = data.cddata.actorSkins;
            if(null != actorSkins)
            {
                for(var i=0;i < actorSkins.length;++i)
                {
                    if(1 != actorSkins[i])
                    {
                        Us_JJKLBB_er._gameData.actorSkins.push(actorSkins[i]);
                    }
                }
            }
            Us_JJKLBB_er._gameData.curActorSkin = data.cddata.curActorSkin;
            Us_JJKLBB_er._gameData.lastSignInTime = data.cddata.lastSignInTime;

            if(0 == data.is_day)
            {
                Us_JJKLBB_er._gameData.energyNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        else if(null != data)
        {
            if(0 == data.is_day)
            {
                Us_JJKLBB_er._gameData.energyNum = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        else
        {
            Us_JJKLBB_er._gameData.energyNum = 100;
        }     
    }

    public static unLockMax_JJKLBB_LevelNum(levelNum : number)
    {
        if(Us_JJKLBB_er._gameData.levelNum < levelNum)
        {
            Us_JJKLBB_er._gameData.levelNum = levelNum;
        }
    }

    public static setLev_JJKLBB_eNum(levelNum : number)
    {
        Us_JJKLBB_er._gameData.levelNum = levelNum;
    }

    public static getLev_JJKLBB_eNum() : number
    {
        return Us_JJKLBB_er._gameData.levelNum;
    }

    public static addMo_JJKLBB_ney(add : number)
    {
        add = Math.ceil(add)
        var last = Us_JJKLBB_er._gameData.moneyNum
        Us_JJKLBB_er._gameData.moneyNum += add;
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUser_JJKLBB_MoneyChange,
            {
                curr : Us_JJKLBB_er._gameData.moneyNum,
                last : last
            })
    }
    public static subM_JJKLBB_oney(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_JJKLBB_er._gameData.moneyNum
        Us_JJKLBB_er._gameData.moneyNum -= sub;
        if(Us_JJKLBB_er._gameData.moneyNum < 0)
        {
            Us_JJKLBB_er._gameData.moneyNum = 0;
        }
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUser_JJKLBB_MoneyChange,
            {
                curr : Us_JJKLBB_er._gameData.moneyNum,
                last : last
            })
    }
    public static get_JJKLBB_Money()
    {
        return Us_JJKLBB_er._gameData.moneyNum;
    }

    public static addCrys_JJKLBB_tal(add : number)
    {
        add = Math.ceil(add)
        var last = Us_JJKLBB_er._gameData.crystalNum
        Us_JJKLBB_er._gameData.crystalNum += add;
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,
            {
                curr : Us_JJKLBB_er._gameData.crystalNum,
                last : last
            })
    }
    public static subC_JJKLBB_rystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_JJKLBB_er._gameData.crystalNum
        Us_JJKLBB_er._gameData.crystalNum -= sub;
        if(Us_JJKLBB_er._gameData.crystalNum < 0)
        {
            Us_JJKLBB_er._gameData.crystalNum = 0;
        }
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,
            {
                curr : Us_JJKLBB_er._gameData.crystalNum,
                last : last
            })
    }
    public static getCr_JJKLBB_ystal()
    {
        return Us_JJKLBB_er._gameData.crystalNum;
    }

    public static addEne_JJKLBB_rgy(add : number)
    {
        add = Math.ceil(add)
        var last = Us_JJKLBB_er._gameData.energyNum
        Us_JJKLBB_er._gameData.energyNum += add;
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,
            {
                curr : Us_JJKLBB_er._gameData.energyNum,
                last : last
            })
    }
    public static subE_JJKLBB_nergy(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_JJKLBB_er._gameData.energyNum
        Us_JJKLBB_er._gameData.energyNum -= sub;
        if(Us_JJKLBB_er._gameData.energyNum < 0)
        {
            Us_JJKLBB_er._gameData.energyNum = 0;
        }
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,
            {
                curr : Us_JJKLBB_er._gameData.energyNum,
                last : last
            })
    }
    public static getEn_JJKLBB_ergy()
    {
        return Us_JJKLBB_er._gameData.energyNum;
    }


    public static setCurA_JJKLBB_ctorSkin(skin : number)
    {
        if(!Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(skin))
            return;
        var last = Us_JJKLBB_er._gameData.curActorSkin;
        Us_JJKLBB_er._gameData.curActorSkin = skin;
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change,
            {
                curSkin : skin,
                lastSkin : last
            });
    }
    public static getCurA_JJKLBB_ctorSkin()
    {
        return Us_JJKLBB_er._gameData.curActorSkin;
    }
    public static unlock_JJKLBB_ActorSkin(skin : number) : boolean
    {
        if(Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(skin))
            return false;
        Us_JJKLBB_er._gameData.actorSkins.push(skin);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin,{skin : skin});
        return true;
    }
    public static actorSkin_JJKLBB_IsUnlock(skin : number) : boolean
    {
        for(var i=0; i < Us_JJKLBB_er._gameData.actorSkins.length;++i)
        {
            if(skin == Us_JJKLBB_er._gameData.actorSkins[i])
                return true;
        }
        return false;
    }
    public static getAct_JJKLBB_orSkins() : Array<number>
    {
        var arry : Array<number> = new Array<number>();
        for(var i=0; i < Us_JJKLBB_er._gameData.actorSkins.length;++i)
        {
            arry.push(Us_JJKLBB_er._gameData.actorSkins[i]);
        }
        return arry;
    }

    public static setlast_JJKLBB_SignInTime(time : number)
    {
        Us_JJKLBB_er._gameData.lastSignInTime = time;
    }
    public static getlast_JJKLBB_SignInTime()
    {
        return Us_JJKLBB_er._gameData.lastSignInTime;
    }

    public static canSignIn(lastTime) : boolean
    {
        var lastDate = new Date(lastTime);
        var curDate = new Date(Date.now());
        // if(Date.now() - Us_JJKLBB_er.getlast_JJKLBB_SignInTime() >= 86400000 || lastDate.getUTCDay() != curDate.getUTCDay())
        // {
        //     return true;
        // }
        // return false;
        console.log("lastTime = " + lastTime + " curTime = " + Date.now());
        console.log("lastDate = " + lastDate + " curDate = " + curDate);
        console.log("上次签到日期：" + lastDate.getDay() + "这次签到日期：" + curDate.getDay());
        return lastDate.getDay() != curDate.getDay();
        
    }

}

