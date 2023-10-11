import Event_tippy_Mgr from "../Event/EventMgr";
import { Event_tippy_Def } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class User_tippy_GameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量    
}

export default class Us_tippy_er extends Laya.Script 
{
    public static co_tippy_de: string = "";
    public static open_tippy_Id: string = "";
    public static tok_tippy_en: string = null;
    public static nick_tippy_Name: string = "";
    public static gen_tippy_der:number = 0;

    public static is_tippy_Login: boolean = false;    
    public static get isLogin()
    {
        return (Us_tippy_er.co_tippy_de != "") || (Us_tippy_er.tok_tippy_en != "");
    }

    private static readonly _game_tippy_Data : User_tippy_GameData = new User_tippy_GameData();

    public static getSave_tippy_Data() : string
    {
        return JSON.stringify(Us_tippy_er._game_tippy_Data);
    }


    public static testInit_tippy_User()
    {
        var storageStr = Laya.LocalStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
                
            Us_tippy_er._game_tippy_Data.levelNum = 1;
            Us_tippy_er._game_tippy_Data.moneyNum = 0;
            Us_tippy_er._game_tippy_Data.crystalNum = 0;
            return;
        }

        Us_tippy_er._game_tippy_Data.levelNum = data.levelNum;
        Us_tippy_er._game_tippy_Data.moneyNum = data.moneyNum;
        Us_tippy_er._game_tippy_Data.crystalNum = data.crystalNum;
        
    }

    public static initi_tippy_User(data)
    {
        if(data && 0 != data)
        {
            Us_tippy_er._game_tippy_Data.levelNum = data.levelNum;
            Us_tippy_er._game_tippy_Data.moneyNum = data.moneyNum;
            Us_tippy_er._game_tippy_Data.crystalNum = data.crystalNum;
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }     
    }

    public static setLeve_tippy_Num(levelNum : number)
    {
        Us_tippy_er._game_tippy_Data.levelNum = levelNum;
    }

    public static getLeve_tippy_Num() : number
    {
        return Us_tippy_er._game_tippy_Data.levelNum;
    }

    public static add_tippy_Money(add : number)
    {
        add = Math.ceil(add)
        var last = Us_tippy_er._game_tippy_Data.moneyNum
        Us_tippy_er._game_tippy_Data.moneyNum += add;
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserMoneyChange,
            {
                curr : Us_tippy_er._game_tippy_Data.moneyNum,
                last : last
            })
    }
    public static sub_tippy_Money(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_tippy_er._game_tippy_Data.moneyNum
        Us_tippy_er._game_tippy_Data.moneyNum -= sub;
        if(Us_tippy_er._game_tippy_Data.moneyNum < 0)
        {
            Us_tippy_er._game_tippy_Data.moneyNum = 0;
        }
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserMoneyChange,
            {
                curr : Us_tippy_er._game_tippy_Data.moneyNum,
                last : last
            })
    }
    public static get_tippy_Money()
    {
        return Us_tippy_er._game_tippy_Data.moneyNum;
    }

    public static add_tippy_Crystal(add : number)
    {
        add = Math.ceil(add)
        var last = Us_tippy_er._game_tippy_Data.crystalNum
        Us_tippy_er._game_tippy_Data.crystalNum += add;
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserCrystalChange,
            {
                curr : Us_tippy_er._game_tippy_Data.crystalNum,
                last : last
            })
    }
    public static sub_tippy_Crystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_tippy_er._game_tippy_Data.crystalNum
        Us_tippy_er._game_tippy_Data.crystalNum -= sub;
        if(Us_tippy_er._game_tippy_Data.crystalNum < 0)
        {
            Us_tippy_er._game_tippy_Data.crystalNum = 0;
        }
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserCrystalChange,
            {
                curr : Us_tippy_er._game_tippy_Data.crystalNum,
                last : last
            })
    }
    public static get_tippy_Crystal()
    {
        return Us_tippy_er._game_tippy_Data.crystalNum;
    }
}

