import Event_myqq_Mgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量
    public  unlockSongs: PassSong[] = new Array;
}

export class PassSong {
    name: string = "";
    starLevel: number = 0;
    source: number = 0;
    completed:boolean = false;
}

export default class User_yy extends Laya.Script 
{
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static nickName: string = "";
    public static gender:number = 0;

    public static isLogin: boolean = false;

    private static readonly _gameData : UserGameData = new UserGameData();

    public static getSaveData() : string
    {
        return JSON.stringify(User_yy._gameData);
    }


    public static testInitUser()
    {
        
        var storageStr = localStorage.getItem("Game_Data")
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_yy._gameData.levelNum = 1;
            User_yy._gameData.moneyNum = 60;
            User_yy._gameData.crystalNum = 0;
            User_yy._gameData.unlockSongs = new Array;
            return;
        }
        
        let userData = data;
        User_yy._gameData.levelNum = userData.levelNum ? userData.levelNum : 0;
        User_yy._gameData.moneyNum = userData.moneyNum ? userData.moneyNum : 0;
        User_yy._gameData.crystalNum = userData.crystalNum ? userData.crystalNum : 0;
        User_yy._gameData.unlockSongs = new Array;
        if (userData.unlockSongs != null) {
            for(let i = 0; i < userData.unlockSongs.length; i++) {
                let tmep = userData.unlockSongs[i];
                let passSong = new PassSong();
                passSong.name = tmep.name;
                passSong.source = tmep.source;
                passSong.starLevel = tmep.starLevel;
                passSong.completed = tmep.completed ? tmep.completed : false;
                User_yy._gameData.unlockSongs.push(passSong);
            }
        }
    }

    public static initiUser(data)
    {
        if(data && 0 != data)
        {
            let userData = data.gamedata;
            //let frequency = data.frequency;
            User_yy._gameData.levelNum = userData.levelNum ? userData.levelNum : 0;
            User_yy._gameData.moneyNum = userData.moneyNum ? userData.moneyNum : 0;
            User_yy._gameData.crystalNum = userData.crystalNum ? userData.crystalNum : 0;
            User_yy._gameData.unlockSongs = new Array;
            if (userData.unlockSongs != null) {
                for(let i = 0; i < userData.unlockSongs.length; i++) {
                    let tmep = userData.unlockSongs[i];
                    let passSong = new PassSong();
                    passSong.name = tmep.name;
                    passSong.source = tmep.source;
                    passSong.starLevel = tmep.starLevel;
                    passSong.completed = tmep.completed ? tmep.completed : false;
                    User_yy._gameData.unlockSongs.push(passSong);
                }
            }
            // if (frequency != null && frequency != 0) {
            //     User_yy._gameData.moneyNum = frequency;
            // }
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
            User_yy._gameData.moneyNum = 60;
            User_yy._gameData.levelNum = 0;
            User_yy._gameData.crystalNum = 0;
            User_yy._gameData.unlockSongs = new Array;
        }     
    }

    public static setLeveNum(levelNum : number)
    {
        User_yy._gameData.levelNum = levelNum;
    }

    public static getLeveNum() : number
    {
        return User_yy._gameData.levelNum;
    }

    public static addMoney(add : number)
    {
        add = Math.ceil(add)
        var last = User_yy._gameData.moneyNum
        User_yy._gameData.moneyNum += add;
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
            {
                curr : User_yy._gameData.moneyNum,
                last : last
            })
    }
    public static subMoney(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_yy._gameData.moneyNum
        User_yy._gameData.moneyNum -= sub;
        if(User_yy._gameData.moneyNum < 0)
        {
            User_yy._gameData.moneyNum = 0;
        }
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
            {
                curr : User_yy._gameData.moneyNum,
                last : last
            })
    }
    public static getMoney()
    {
        return User_yy._gameData.moneyNum;
    }

    public static addCrystal(add : number)
    {
        add = Math.ceil(add)
        var last = User_yy._gameData.crystalNum
        User_yy._gameData.crystalNum += add;
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
            {
                curr : User_yy._gameData.crystalNum,
                last : last
            })
    }
    public static subCrystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_yy._gameData.crystalNum
        User_yy._gameData.crystalNum -= sub;
        if(User_yy._gameData.crystalNum < 0)
        {
            User_yy._gameData.crystalNum = 0;
        }
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
            {
                curr : User_yy._gameData.crystalNum,
                last : last
            })
    }
    public static getCrystal()
    {
        return User_yy._gameData.crystalNum;
    }

    // --------------------------------------------- //

    public static getPassSong(): PassSong[] {
        return User_yy._gameData.unlockSongs;
    }

    public static AddUnlockSong(name: string, starLevel: number = 0, source: number = 0) {
        for (let i = 0; i < User_yy._gameData.unlockSongs.length; i++) {
            let song = User_yy._gameData.unlockSongs[i];
            if (song.name == name) {
                return;
            }
        }

        let curSong = new PassSong();
        curSong.name = name;
        User_yy._gameData.unlockSongs.push(curSong);
    }

    public static IncludetSong(name: string): boolean {
        for (let i = 0; i < User_yy._gameData.unlockSongs.length; i++) {
            let song = User_yy._gameData.unlockSongs[i];
            if (song.name == name) {
                return true;
            }
        }
        return false;
    }
    // --------------------------------------------- //
}

