import Event_wcjtn_Mgr from "../Event/EventMgr";
import { Event_wcjtn_Def } from "../Event/EventDef";
import CarDataConfig from "../MyScripts/Model/CarConfig";
import GameManager from "../MyScripts/Manager/GameManager";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class User_wcjtn_Game_wcjtn_Data {
    public levelNum: number = 1;//当前关卡
    public moneyNum: number = 0;//金币数量
    public crystalNum: number = 0;//钻石数量  
    public carID: number = 0;   //玩家车辆ID
    public carLists: number[] = [0]; //玩家拥有车辆ID  
    public overRecord: number = 1;   //玩家超车记录
    public unlockedItem: Array<number> = [];//道具当前解锁的索引
    public usedItem: number = -1;//当前使用的道具索引
}

export default class User_wcjtn_ extends Laya.Script {
    public static code_wcjtn_: string = "";
    public static openId_wcjtn_: string = "";
    public static _wcjtn_token: string = null;
    public static nick_wcjtn_Name: string = "";
    public static gender_wcjtn_: number = 0;

    public static get is_wcjtn_Login() {
        return (User_wcjtn_.code_wcjtn_ != "") || (User_wcjtn_._wcjtn_token != "");
    }

    private static readonly _game_wcjtn_Data: User_wcjtn_Game_wcjtn_Data = new User_wcjtn_Game_wcjtn_Data();

    public static get_wcjtn_Save_wcjtn_Data(): string {
        return JSON.stringify(User_wcjtn_._game_wcjtn_Data);
    }


    public static test_wcjtn_InitUser() {
        // User_wcjtn_._game_wcjtn_Data.levelNum = 1;
        // User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
        // User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
        // User_wcjtn_._game_wcjtn_Data.carID = 0;
        // User_wcjtn_._game_wcjtn_Data.carLists = [0];
        // User_wcjtn_._game_wcjtn_Data.overRecord = 1;
        var storageStr = localStorage.getItem("Game_wcjtn_Data") 
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_wcjtn_._game_wcjtn_Data.levelNum = 1;
            User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
            User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
            User_wcjtn_._game_wcjtn_Data.carID = 0;
            User_wcjtn_._game_wcjtn_Data.carLists = [0];
            User_wcjtn_._game_wcjtn_Data.overRecord = 1;
            User_wcjtn_._game_wcjtn_Data.usedItem = -1;    
            return;
        }
        User_wcjtn_._game_wcjtn_Data.levelNum = data.levelNum;
        User_wcjtn_._game_wcjtn_Data.moneyNum = data.moneyNum;
        User_wcjtn_._game_wcjtn_Data.crystalNum = data.crystalNum;
        User_wcjtn_._game_wcjtn_Data.carID = data.carID;
        User_wcjtn_._game_wcjtn_Data.carLists = data.carLists;
        User_wcjtn_._game_wcjtn_Data.overRecord = data.overRecord;
        User_wcjtn_._game_wcjtn_Data.usedItem = data.usedItem;

        if (User_wcjtn_._game_wcjtn_Data.overRecord == null) {
            User_wcjtn_._game_wcjtn_Data.overRecord = 0;
        } else {
            var unlockedItem: Array<number> = data.unlockedItem;
            if (null != unlockedItem) {
                for (let i = 0; i < unlockedItem.length; ++i) {
                    User_wcjtn_._game_wcjtn_Data.unlockedItem.push(unlockedItem[i]);
                }
            }
        }
    }

    public static initi_wcjtn_User(data) {
        if (data && 0 != data) {
            User_wcjtn_._game_wcjtn_Data.levelNum = data.levelNum;
            User_wcjtn_._game_wcjtn_Data.moneyNum = data.moneyNum;
            User_wcjtn_._game_wcjtn_Data.crystalNum = data.crystalNum;
            User_wcjtn_._game_wcjtn_Data.carID = data.carID;
            User_wcjtn_._game_wcjtn_Data.carLists = data.carLists;
            if (User_wcjtn_._game_wcjtn_Data.overRecord == null) {
                User_wcjtn_._game_wcjtn_Data.overRecord = 0;
            } else {
                User_wcjtn_._game_wcjtn_Data.overRecord = data.overRecord;
                if (null != data.unlockedItem) {
                    let unlockedItem: Array<number> = data.unlockedItem;
                    for (let i = 0; i < unlockedItem.length; ++i) {
                        User_wcjtn_._game_wcjtn_Data.unlockedItem.push(unlockedItem[i]);
                    }
                }
                if (null != data.usedItem) {
                    User_wcjtn_._game_wcjtn_Data.usedItem = data.usedItem;
                }
            }
        }
    }


    public static set_wcjtn_LeveNum(levelNum: number) {
        User_wcjtn_._game_wcjtn_Data.levelNum = levelNum;
    }

    public static get_wcjtn_LeveNum(): number {
        return User_wcjtn_._game_wcjtn_Data.levelNum;
    }

    public static add_wcjtn_Money(add: number) {
        add = Math.ceil(add)
        var last = User_wcjtn_._game_wcjtn_Data.moneyNum
        User_wcjtn_._game_wcjtn_Data.moneyNum += add;
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,
            {
                curr: User_wcjtn_._game_wcjtn_Data.moneyNum,
                last: last
            })
    }
    public static sub_wcjtn_Money(sub: number) {
        sub = Math.ceil(sub)
        var last = User_wcjtn_._game_wcjtn_Data.moneyNum
        User_wcjtn_._game_wcjtn_Data.moneyNum -= sub;
        if (User_wcjtn_._game_wcjtn_Data.moneyNum < 0) {
            User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
        }
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,
            {
                curr: User_wcjtn_._game_wcjtn_Data.moneyNum,
                last: last
            })
    }
    public static get_wcjtn_Money() {
        return User_wcjtn_._game_wcjtn_Data.moneyNum;
    }

    public static add_wcjtn_Crystal(add: number) {
        add = Math.ceil(add)
        var last = User_wcjtn_._game_wcjtn_Data.crystalNum
        User_wcjtn_._game_wcjtn_Data.crystalNum += add;
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change,
            {
                curr: User_wcjtn_._game_wcjtn_Data.crystalNum,
                last: last
            })
    }
    public static sub_wcjtn_Crystal(sub: number) {
        sub = Math.ceil(sub)
        var last = User_wcjtn_._game_wcjtn_Data.crystalNum
        User_wcjtn_._game_wcjtn_Data.crystalNum -= sub;
        if (User_wcjtn_._game_wcjtn_Data.crystalNum < 0) {
            User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
        }
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change,
            {
                curr: User_wcjtn_._game_wcjtn_Data.crystalNum,
                last: last
            })
    }
    public static get_wcjtn_Crystal() {
        return User_wcjtn_._game_wcjtn_Data.crystalNum;
    }

    public static getCarID() {
        return User_wcjtn_._game_wcjtn_Data.carID;
    }

    public static setCarID(id: number) {
        User_wcjtn_._game_wcjtn_Data.carID = id;
    }

    public static hadCarByID(id: number): boolean {
        let had: boolean = false;
        for (let i = 0; i < User_wcjtn_._game_wcjtn_Data.carLists.length; i++) {
            if (id == User_wcjtn_._game_wcjtn_Data.carLists[i]) {
                had = true;
                break;
            }
        }
        had = had || (GameManager.mCarID == id);
        return had;
    }

    public static unlockSkin(id: number) {
        User_wcjtn_.sub_wcjtn_Money(CarDataConfig.Instance().getCarDataByID(id).price);
        User_wcjtn_._game_wcjtn_Data.carLists.push(id);
        User_wcjtn_._game_wcjtn_Data.carID = id;
    }

    public static getEnoughCoinCarID(): number {
        let id = -1;
        if (User_wcjtn_._game_wcjtn_Data.carLists.length < GameManager.CarAmount) {
            for (let i = 0; i < GameManager.CarAmount; i++) {
                if (!this.hadCarByID(i) && User_wcjtn_.get_wcjtn_Money() >= CarDataConfig.Instance().getCarDataByID(i).price) {
                    id = i;
                    break;
                }
            }
        }
        return id;
    }

    public static getOverRecord(): number {
        return User_wcjtn_._game_wcjtn_Data.overRecord;
    }

    public static setOverRecord(record: number) {
        User_wcjtn_._game_wcjtn_Data.overRecord = record;
    }

    //获取当前商店解锁的道具
    public static getItemUnlocked(): Array<number> {
        let unlocked = new Array<number>();
        for (let i = 0; i < User_wcjtn_._game_wcjtn_Data.unlockedItem.length; ++i) {
            unlocked.push(User_wcjtn_._game_wcjtn_Data.unlockedItem[i]);
        }
        return unlocked;
    }

    //商店道具是否解锁
    public static itemIsUnlocked(id: number): boolean {
        for (let i = 0; i < User_wcjtn_._game_wcjtn_Data.unlockedItem.length; ++i) {
            if (User_wcjtn_._game_wcjtn_Data.unlockedItem[i] == id) {
                return true;
            }
        }
        return false;
    }

    //解锁商店道具
    public static unlockItem(id: number) {
        if (User_wcjtn_.itemIsUnlocked(id)) {
            console.log("商店重复解锁 id : ", id);
            return;
        }
        User_wcjtn_._game_wcjtn_Data.unlockedItem.push(id);
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_OnUserUnlockedStore, { unlocked: id })
    }

    //当前正在使用的道具
    public static get curUsedItem() {
        return User_wcjtn_._game_wcjtn_Data.usedItem;
    }
    //当前正在使用的道具
    public static set curUsedItem(value: number) {
        User_wcjtn_._game_wcjtn_Data.usedItem = value;
    }
}

