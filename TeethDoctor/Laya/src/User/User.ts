import Even_XYXZS_tMgr from "../Event/EventMgr";
import { Even_XYXZS_tDef } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGa_XYXZS_meData
{
    public  leve_XYXZS_lNum: number = 1;//当前关卡
    public  mone_XYXZS_yNum: number = 0;//金币数量
    public  crys_XYXZS_talNum: number = 0;//钻石数量    
}

export default class Us_XYXZS_er extends Laya.Script 
{
    public static c_XYXZS_ode: string = "";
    public static o_XYXZS_penId: string = "";
    public static to_XYXZS_ken: string = null;
    public static nick_XYXZS_Name: string = "";
    public static gen_XYXZS_der:number = 0;

    public static get isLo_XYXZS_gin()
    {
        return (Us_XYXZS_er.c_XYXZS_ode != "") || (Us_XYXZS_er.to_XYXZS_ken != "");
    }

    private static readonly _game_XYXZS_Data : UserGa_XYXZS_meData = new UserGa_XYXZS_meData();

    public static getSa_XYXZS_veData() : string
    {
        return JSON.stringify(Us_XYXZS_er._game_XYXZS_Data);
    }


    public static testIn_XYXZS_itUser()
    {
        var storageStr = Laya.LocalStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = 0;
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = 0;
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = 0;
            return;
        }

        Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = data.levelNum;
        Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = data.levelNum;
        Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = data.levelNum;
    }

    public static init_XYXZS_iUser(data)
    {
        if(data && 0 != data)
        {
            Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = data.levelNum;
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = data.moneyNum;
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = data.crystalNum;
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }     
    }

    public static setLe_XYXZS_veNum(levelNum : number)
    {
        Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = levelNum;
    }

    public static getL_XYXZS_eveNum() : number
    {
        return Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum;
    }

    public static addM_XYXZS_oney(add : number)
    {
        add = Math.ceil(add)
        var last = Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum
        Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum += add;
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUse_XYXZS_rMoneyChange,
            {
                curr : Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum,
                last : last
            })
    }
    public static subM_XYXZS_oney(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum
        Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum -= sub;
        if(Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum < 0)
        {
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = 0;
        }
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUse_XYXZS_rMoneyChange,
            {
                curr : Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum,
                last : last
            })
    }
    public static getM_XYXZS_oney()
    {
        return Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum;
    }

    public static addCr_XYXZS_ystal(add : number)
    {
        add = Math.ceil(add)
        var last = Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum
        Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum += add;
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUs_XYXZS_erCrystalChange,
            {
                curr : Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum,
                last : last
            })
    }
    public static sub_XYXZS_Crystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum
        Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum -= sub;
        if(Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum < 0)
        {
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = 0;
        }
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUs_XYXZS_erCrystalChange,
            {
                curr : Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum,
                last : last
            })
    }
    public static getC_XYXZS_rystal()
    {
        return Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum;
    }
}

