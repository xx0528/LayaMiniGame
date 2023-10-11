import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量    
    public  unlockedItem: Array<number> = [];//道具当前解锁的索引
    public  usedItem: number = -1;//当前使用的道具索引
    public selectiveSkin: number = 0;
    public ownedSkins: number[] = [0];//已解锁的皮肤
}

export default class User_ppxhc extends Laya.Script 
{
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static nickName: string = "";
    public static gender:number = 0;

    public static get isLogin()
    {
        return (User_ppxhc.code != "") || (User_ppxhc.token != "");
    }

    private static readonly _gameData : UserGameData = new UserGameData();

    public static getSaveData() : string
    {
        return JSON.stringify(User_ppxhc._gameData);
    }


    public static testInitUser()
    {
        var storageStr = localStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_ppxhc._gameData.levelNum = 1;
            User_ppxhc._gameData.moneyNum = 100;
            User_ppxhc._gameData.crystalNum = 100;
            User_ppxhc._gameData.selectiveSkin = 0;
            User_ppxhc._gameData.ownedSkins = [0];
            return;
        }

        User_ppxhc._gameData.levelNum = data.levelNum;
        User_ppxhc._gameData.moneyNum = data.moneyNum;
        User_ppxhc._gameData.crystalNum = data.crystalNum;
        if(null != data.unlockedItem)
        {
            let unlockedItem : Array<number> =  data.unlockedItem;
            for(let i=0;i < unlockedItem.length;++i)
            {
                User_ppxhc._gameData.unlockedItem.push(unlockedItem[i]);
            }
        }
        if(null != data.usedItem)
        {
            User_ppxhc._gameData.usedItem = data.usedItem;
        }
        User_ppxhc._gameData.selectiveSkin = data.selectiveSkin == null ? 0 : data.selectiveSkin;
        User_ppxhc._gameData.ownedSkins = data.ownedSkins == null ? [0] : data.ownedSkins;

        if (typeof(User_ppxhc._gameData.selectiveSkin) != "number") {
            User_ppxhc._gameData.selectiveSkin = 0;
        }
        if (typeof(User_ppxhc._gameData.ownedSkins.unshift) == null) {
            User_ppxhc._gameData.ownedSkins = [0];
        }
    }

    public static initiUser(data)
    {
        if(data && 0 != data)
        {
            User_ppxhc._gameData.levelNum = data.levelNum;
            User_ppxhc._gameData.moneyNum = data.moneyNum;
            User_ppxhc._gameData.crystalNum = data.crystalNum;
            if(null != data.unlockedItem)
            {
                let unlockedItem : Array<number> =  data.unlockedItem;
                for(let i=0;i < unlockedItem.length;++i)
                {
                    User_ppxhc._gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if(null != data.usedItem)
            {
                User_ppxhc._gameData.usedItem = data.usedItem;
            }
            User_ppxhc._gameData.selectiveSkin = data.selectiveSkin == null ? 0 : data.selectiveSkin;
            User_ppxhc._gameData.ownedSkins = data.ownedSkins == null ? [0] : data.ownedSkins;

            if (typeof(User_ppxhc._gameData.selectiveSkin) != "number") {
                User_ppxhc._gameData.selectiveSkin = 0;
            }
            if (typeof(User_ppxhc._gameData.ownedSkins.unshift) == null) {
                User_ppxhc._gameData.ownedSkins = [0];
            }
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
            User_ppxhc._gameData.levelNum = 1;
            User_ppxhc._gameData.moneyNum = 0;
            User_ppxhc._gameData.crystalNum = 0;
            User_ppxhc._gameData.selectiveSkin = 0;
            User_ppxhc._gameData.ownedSkins = [0];
        }     
        console.log(User_ppxhc._gameData);
    }

    public static set_ppxhc_LeveNum(levelNum : number)
    {
        User_ppxhc._gameData.levelNum = levelNum;
    }

    public static get_ppxhc_LeveNum() : number
    {
        return User_ppxhc._gameData.levelNum;
    }

    public static add_ppxhc_Money(add : number)
    {
        add = Math.ceil(add)
        var last = User_ppxhc._gameData.moneyNum
        User_ppxhc._gameData.moneyNum += add;
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnUserMoneyChange,
            {
                curr : User_ppxhc._gameData.moneyNum,
                last : last
            })
    }
    public static sub_ppxhc_Money(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_ppxhc._gameData.moneyNum
        User_ppxhc._gameData.moneyNum -= sub;
        if(User_ppxhc._gameData.moneyNum < 0)
        {
            User_ppxhc._gameData.moneyNum = 0;
        }
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnUserMoneyChange,
            {
                curr : User_ppxhc._gameData.moneyNum,
                last : last
            })
    }
    public static get_ppxhc_Money()
    {
        return User_ppxhc._gameData.moneyNum;
    }

    public static add_ppxhc_Crystal(add : number)
    {
        add = Math.ceil(add)
        var last = User_ppxhc._gameData.crystalNum
        User_ppxhc._gameData.crystalNum += add;
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnUserCrystalChange,
            {
                curr : User_ppxhc._gameData.crystalNum,
                last : last
            })
    }
    public static sub_ppxhc_Crystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_ppxhc._gameData.crystalNum
        User_ppxhc._gameData.crystalNum -= sub;
        if(User_ppxhc._gameData.crystalNum < 0)
        {
            User_ppxhc._gameData.crystalNum = 0;
        }
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnUserCrystalChange,
            {
                curr : User_ppxhc._gameData.crystalNum,
                last : last
            })
    }
    public static get_ppxhc_Crystal()
    {
        return User_ppxhc._gameData.crystalNum;
    }

    public static add_ppxhc_Skin(skinType: number): void {
        let index = User_ppxhc._gameData.ownedSkins.indexOf(skinType);
        if (index != -1) {
            return;
        }
        User_ppxhc._gameData.ownedSkins.push(skinType);
    }

    public static Check_ppxhc_OwnedSkin(skinType: number): boolean {
        let index = User_ppxhc._gameData.ownedSkins.indexOf(skinType);
        return index != -1;
    }

    public static GetOwnedSkin(): number[] {
        return User_ppxhc._gameData.ownedSkins;
    }

    public static GetSelectiveSkin(): number {
        return User_ppxhc._gameData.selectiveSkin;
    }

    public static SetSelectiveSkin(skinType: number, needDispatch: boolean) {
        let oldSkin = User_ppxhc._gameData.selectiveSkin;
        User_ppxhc._gameData.selectiveSkin = skinType;

        if (oldSkin != skinType && needDispatch) {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_Change, skinType);
        }
    }

    //获取当前商店解锁的道具
    public static getItemUnlocked() : Array<number>
    {
        let unlocked = new Array<number>();
        for (let i = 0; i < User_ppxhc._gameData.unlockedItem.length; ++i)  
        {
            unlocked.push(User_ppxhc._gameData.unlockedItem[i]);
        }
        return unlocked;
    }

    //商店道具是否解锁
    public static itemIsUnlocked(id : number) : boolean
    {
        for (let i = 0; i < User_ppxhc._gameData.unlockedItem.length; ++i)  
        {
            if(User_ppxhc._gameData.unlockedItem[i] == id)
            {
                return true;
            }
        } 
        return false;
    }

    //解锁商店道具
    public static unlockItem(id : number)
    {
        if(User_ppxhc.itemIsUnlocked(id))
        {
            console.log("商店重复解锁 id : ",id);
            return;
        }
        User_ppxhc._gameData.unlockedItem.push(id);
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnUserUnlockedStore,{unlocked : id})
    }

    //当前正在使用的道具
    public static get curUsedItem()
    {
        return User_ppxhc._gameData.usedItem;
    }
    //当前正在使用的道具
    public static set curUsedItem(value : number)  
    {
        User_ppxhc._gameData.usedItem = value;
    }
}

