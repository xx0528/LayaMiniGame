import ryw_EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class ryw_UserGameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量
    public  unlockedItem: Array<number> = [];//道具当前解锁的索引
    public  usedItem: number = -1;//当前使用的道具索引
    public  levelData : Array<number> = new Array<number>(); //所有的的关卡
    public  localLeveData :Array<number> = new Array<number>(); //存本地的关卡
    public  winLevelData : Array<number> = new Array<number>(); //通关过的关卡， 下次进入游戏的时候优先加载没通关的关卡
}

export default class ryw_User extends Laya.Script 
{
    public static ryw_code: string = "";
    public static ryw_openId: string = "";
    public static ryw_token: string = null;
    public static ryw_nickName: string = "";
    public static ryw_gender:number = 0;

    public static get ryw_isLogin()
    {
        return (ryw_User.ryw_code != "") || (ryw_User.ryw_token != "");
    }

    private static readonly ryw__gameData : ryw_UserGameData = new ryw_UserGameData();

    public static ryw_getSaveData() : string
    {
        return JSON.stringify(ryw_User.ryw__gameData);
    }


    public static ryw_testInitUser()
    {
        var storageStr = Laya.LocalStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            ryw_User.ryw__gameData.levelNum = 1;
            ryw_User.ryw__gameData.moneyNum = 0;
            ryw_User.ryw__gameData.crystalNum = 0;
            ryw_User.ryw__gameData.levelData = [];
            ryw_User.ryw__gameData.localLeveData = [];
            ryw_User.ryw__gameData.winLevelData = [];
            return;
        }

        ryw_User.ryw__gameData.levelNum = data.levelNum;
        ryw_User.ryw__gameData.moneyNum = data.moneyNum;
        ryw_User.ryw__gameData.crystalNum = data.crystalNum;
        ryw_User.ryw__gameData.levelData = data.levelData || [];
        ryw_User.ryw__gameData.localLeveData = data.localLeveData || [];
        ryw_User.ryw__gameData.winLevelData = data.winLevelData || [];
        if(null != data.unlockedItem)
        {
            let unlockedItem : Array<number> =  data.unlockedItem;
            for(let i=0;i < unlockedItem.length;++i)
            {
                ryw_User.ryw__gameData.unlockedItem.push(unlockedItem[i]);
            }
        }
        if(null != data.usedItem)
        {
            ryw_User.ryw__gameData.usedItem = data.usedItem;
        }

    }

    public static ryw_initiUser(data)
    {
        console.log("*****************************  User initUser  **************************************  ");
        console.log(data);
        if(data && 0 != data)
        {
            ryw_User.ryw__gameData.levelNum = data.levelNum;
            ryw_User.ryw__gameData.moneyNum = data.moneyNum;
            ryw_User.ryw__gameData.crystalNum = data.crystalNum;
            ryw_User.ryw__gameData.levelData = data.levelData;
            ryw_User.ryw__gameData.localLeveData = data.localLeveData;
            ryw_User.ryw__gameData.winLevelData = data.winLevelData || [];
            if(null != data.unlockedItem)
            {
                let unlockedItem : Array<number> =  data.unlockedItem;
                for(let i=0;i < unlockedItem.length;++i)
                {
                    ryw_User.ryw__gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if(null != data.usedItem)
            {
                ryw_User.ryw__gameData.usedItem = data.usedItem;
            }
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        } 
  
    }

    public static setLevelData(data:Array<number>){
        ryw_User.ryw__gameData.levelData = data;
    }

    public static getLevelData():Array<number> | null{
        return ryw_User.ryw__gameData.levelData;
    }

    public static passLevel(){
        ryw_User.ryw__gameData.levelData.splice(0,1); //删除 从下标0开始，共计1个元素
        console.log("passLevel   ryw_User.ryw__gameData.levelData = ",ryw_User.ryw__gameData.levelData)
    }

    public static setLocalLevelData(data:Array<number>){
        ryw_User.ryw__gameData.localLeveData = data;

    }
    public static getLocalLevelData():Array<number> | null{
        return ryw_User.ryw__gameData.localLeveData; 
    }
    public static passLoaclLevel(){
        ryw_User.ryw__gameData.localLeveData.splice(0,1); //删除 从下标0开始，共计1个元素
        console.log("passLevel   ryw_User.ryw__gameData.localLeveData = ",ryw_User.ryw__gameData.localLeveData)
    }

    public static setwinLevelData(data:Array<number>){
        ryw_User.ryw__gameData.winLevelData = data;

    }
    public static getwinLevelData():Array<number> | null{
        return ryw_User.ryw__gameData.winLevelData; 
    }
    public static addwinLevel(num: number){
        let index = ryw_User.ryw__gameData.winLevelData.indexOf(num);
        if (index==-1){
            console.log("addwinLevel num = ",num);
            ryw_User.ryw__gameData.winLevelData.push(num);
        }
        console.log("addwinLevel   ryw_User.ryw__gameData.winLevelData = ",ryw_User.ryw__gameData.winLevelData)
    }

    public static ryw_setLeveNum(levelNum : number)
    {
        ryw_User.ryw__gameData.levelNum = levelNum;
    }

    public static ryw_getLeveNum() : number
    {
        return ryw_User.ryw__gameData.levelNum;
    }

    public static ryw_addMoney(add : number)
    {
        add = Math.ceil(add)
        var last = ryw_User.ryw__gameData.moneyNum
        ryw_User.ryw__gameData.moneyNum += add;
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserMoneyChange,
            {
                curr : ryw_User.ryw__gameData.moneyNum,
                last : last
            })
    }
    public static ryw_subMoney(sub : number)
    {
        sub = Math.ceil(sub)
        var last = ryw_User.ryw__gameData.moneyNum
        ryw_User.ryw__gameData.moneyNum -= sub;
        if(ryw_User.ryw__gameData.moneyNum < 0)
        {
            ryw_User.ryw__gameData.moneyNum = 0;
        }
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserMoneyChange,
            {
                curr : ryw_User.ryw__gameData.moneyNum,
                last : last
            })
    }
    public static ryw_getMoney()
    {
        return ryw_User.ryw__gameData.moneyNum;
    }

    public static ryw_addCrystal(add : number)
    {
        add = Math.ceil(add)
        var last = ryw_User.ryw__gameData.crystalNum
        ryw_User.ryw__gameData.crystalNum += add;
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserCrystalChange,
            {
                curr : ryw_User.ryw__gameData.crystalNum,
                last : last
            })
    }
    public static ryw_subCrystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = ryw_User.ryw__gameData.crystalNum
        ryw_User.ryw__gameData.crystalNum -= sub;
        if(ryw_User.ryw__gameData.crystalNum < 0)
        {
            ryw_User.ryw__gameData.crystalNum = 0;
        }
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserCrystalChange,
            {
                curr : ryw_User.ryw__gameData.crystalNum,
                last : last
            })
    }
    public static ryw_getCrystal()
    {
        return ryw_User.ryw__gameData.crystalNum;
    }

    //获取当前商店解锁的道具
    public static getItemUnlocked() : Array<number>
    {
        let unlocked = new Array<number>();
        for (let i = 0; i < ryw_User.ryw__gameData.unlockedItem.length; ++i)  
        {
            unlocked.push(ryw_User.ryw__gameData.unlockedItem[i]);
        }
        return unlocked;
    }

    //商店道具是否解锁
    public static itemIsUnlocked(id : number) : boolean
    {
        for (let i = 0; i < ryw_User.ryw__gameData.unlockedItem.length; ++i)  
        {
            if(ryw_User.ryw__gameData.unlockedItem[i] == id)
            {
                return true;
            }
        } 
        return false;
    }

    //解锁商店道具
    public static unlockItem(id : number)
    {
        if(ryw_User.itemIsUnlocked(id))
        {
            console.log("商店重复解锁 id : ",id);
            return;
        }
        ryw_User.ryw__gameData.unlockedItem.push(id);
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_OnUserUnlockedStore,{unlocked : id})
    }

    //当前正在使用的道具
    public static get curUsedItem()
    {
        return ryw_User.ryw__gameData.usedItem;
    }
    //当前正在使用的道具
    public static set curUsedItem(value : number)  
    {
        ryw_User.ryw__gameData.usedItem = value;
    }
}

