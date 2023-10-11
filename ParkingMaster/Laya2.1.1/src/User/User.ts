import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量
    public  unlockedItem: Array<number> = [];//道具当前解锁的索引
    public  usedItem: number = -1;//当前使用的道具索引
}

export default class User extends Laya.Script 
{
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static nickName: string = "";
    public static gender:number = 0;

    public static get isLogin()
    {
        return (User.code != "") || (User.token != "");
    }

    private static readonly _gameData : UserGameData = new UserGameData();

    public static getSaveData() : string
    {
        return JSON.stringify(User._gameData);
    }


    public static testInitUser()
    {
        var storageStr = localStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User._gameData.levelNum = 1;
            User._gameData.moneyNum = 100;
            User._gameData.crystalNum = 100;
            return;
        }

        User._gameData.levelNum = data.levelNum;
        User._gameData.moneyNum = data.moneyNum;
        User._gameData.crystalNum = data.crystalNum;
        if(null != data.unlockedItem)
        {
            let unlockedItem : Array<number> =  data.unlockedItem;
            for(let i=0;i < unlockedItem.length;++i)
            {
                User._gameData.unlockedItem.push(unlockedItem[i]);
            }
        }
        if(null != data.usedItem)
        {
            User._gameData.usedItem = data.usedItem;
        }
    }

    public static initiUser(data)
    {
        if(data && 0 != data)
        {
            User._gameData.levelNum = data.levelNum;
            User._gameData.moneyNum = data.moneyNum;
            User._gameData.crystalNum = data.crystalNum;
            if(null != data.unlockedItem)
            {
                let unlockedItem : Array<number> =  data.unlockedItem;
                for(let i=0;i < unlockedItem.length;++i)
                {
                    User._gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if(null != data.usedItem)
            {
                User._gameData.usedItem = data.usedItem;
            }
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }     
    }

    public static setLeveNum(levelNum : number)
    {
        User._gameData.levelNum = levelNum;
    }

    public static getLeveNum() : number
    {
        return User._gameData.levelNum;
    }

    public static addMoney(add : number)
    {
        add = Math.ceil(add)
        var last = User._gameData.moneyNum
        User._gameData.moneyNum += add;
        EventMgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
            {
                curr : User._gameData.moneyNum,
                last : last
            })
    }
    public static subMoney(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User._gameData.moneyNum
        User._gameData.moneyNum -= sub;
        if(User._gameData.moneyNum < 0)
        {
            User._gameData.moneyNum = 0;
        }
        EventMgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
            {
                curr : User._gameData.moneyNum,
                last : last
            })
    }
    public static getMoney()
    {
        return User._gameData.moneyNum;
    }

    public static addCrystal(add : number)
    {
        add = Math.ceil(add)
        var last = User._gameData.crystalNum
        User._gameData.crystalNum += add;
        EventMgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
            {
                curr : User._gameData.crystalNum,
                last : last
            })
    }
    public static subCrystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User._gameData.crystalNum
        User._gameData.crystalNum -= sub;
        if(User._gameData.crystalNum < 0)
        {
            User._gameData.crystalNum = 0;
        }
        EventMgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
            {
                curr : User._gameData.crystalNum,
                last : last
            })
    }
    public static getCrystal()
    {
        return User._gameData.crystalNum;
    }

    //获取当前商店解锁的道具
    public static getItemUnlocked() : Array<number>
    {
        let unlocked = new Array<number>();
        for (let i = 0; i < User._gameData.unlockedItem.length; ++i)  
        {
            unlocked.push(User._gameData.unlockedItem[i]);
        }
        return unlocked;
    }

    //商店道具是否解锁
    public static itemIsUnlocked(id : number) : boolean
    {
        for (let i = 0; i < User._gameData.unlockedItem.length; ++i)  
        {
            if(User._gameData.unlockedItem[i] == id)
            {
                return true;
            }
        } 
        return false;
    }

    //解锁商店道具
    public static unlockItem(id : number)
    {
        if(User.itemIsUnlocked(id))
        {
            console.log("商店重复解锁 id : ",id);
            return;
        }
        User._gameData.unlockedItem.push(id);
        EventMgr.instance.dispatch(EventDef.Game_OnUserUnlockedStore,{unlocked : id})
    }

    //当前正在使用的道具
    public static get curUsedItem()
    {
        return User._gameData.usedItem;
    }
    //当前正在使用的道具
    public static set curUsedItem(value : number)  
    {
        User._gameData.usedItem = value;
    }
}

