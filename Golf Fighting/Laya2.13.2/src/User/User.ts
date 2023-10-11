import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData {
    public levelNum: number = 0;//当前关卡
    public moneyNum: number = 0;//金币数量
    public crystalNum: number = 0;//钻石数量   
    public bag: string[] = new Array();   //拥有的道具id 
    public club: string = "normal";
    public people: string = "people2";
    public ball: string = "normal";
    public needCoin: number = 100;    //解锁皮肤所需金币
    public rank_level:number = 0;   
}

export default class Us_sdlyg_er extends Laya.Script {
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static nickName: string = "";
    public static gender: number = 0;

    public static get isLogin()  {
        return (Us_sdlyg_er.code != "") || (Us_sdlyg_er.token != "");
    }

    private static readonly _gameData: UserGameData = new UserGameData();

    public static getSaveData(): string  {
        return JSON.stringify(Us_sdlyg_er._gameData);
    }


    public static testInitUser()  {
        Us_sdlyg_er._gameData.levelNum = Number(Laya.LocalStorage.getItem("levelNum"));
        Us_sdlyg_er._gameData.moneyNum = Number(Laya.LocalStorage.getItem("moneyNum"));
        Us_sdlyg_er._gameData.crystalNum = Number(Laya.LocalStorage.getItem("crystalNum"));

        var clubStr = Laya.LocalStorage.getItem("club");
        if (clubStr == "" || clubStr == null) {
            Us_sdlyg_er._gameData.club = "normal";
        }else {
            Us_sdlyg_er._gameData.people =  clubStr;
        }
        var peopleStr = Laya.LocalStorage.getItem("people");
        if (peopleStr == "" || peopleStr == null) {
            Us_sdlyg_er._gameData.people =  "people2";
        }
        else {
            Us_sdlyg_er._gameData.people =  peopleStr;
        }
        var ballStr = Laya.LocalStorage.getItem("ball");
        if (ballStr == "" || ballStr == null) {
            Us_sdlyg_er._gameData.ball = "normal";
        }
        else {
            Us_sdlyg_er._gameData.ball = ballStr;
        }

        var bagStr = Laya.LocalStorage.getItem("bag");
        if (bagStr == "" || bagStr == null) {
            Us_sdlyg_er._gameData.bag = ["people2"];
        }
        else {
            Us_sdlyg_er._gameData.bag = JSON.parse(bagStr);
        }

        Us_sdlyg_er._gameData.needCoin = 100;
        Us_sdlyg_er._gameData.rank_level = Number(Laya.LocalStorage.getItem("rank_level"));
    }
    
    public static initiUser(data)  {
        if (data && 0 != data)  {
            Us_sdlyg_er._gameData.levelNum = data.levelNum;
            Us_sdlyg_er._gameData.moneyNum = data.moneyNum;
            Us_sdlyg_er._gameData.crystalNum = data.crystalNum;
            Us_sdlyg_er._gameData.bag = data.bag;
            Us_sdlyg_er._gameData.club = data.club;
            Us_sdlyg_er._gameData.people = data.people;
            Us_sdlyg_er._gameData.ball = data.ball;
            //后期往里面加的
            if (!data.needCoin) data.needCoin = 100;
            Us_sdlyg_er._gameData.needCoin = data.needCoin;
            if(!data.rank_level) data.rank_level = 0;
            Us_sdlyg_er._gameData.rank_level = data.rank_level;
            

            console.log(data);
        }
        else  {
            //todo：处理没有获取到玩家数据的情况
            Us_sdlyg_er.testInitUser();
        }
    }


    public static addLevelNum() {
        Us_sdlyg_er._gameData.levelNum++;
        Laya.LocalStorage.setItem("levelNum", Us_sdlyg_er._gameData.levelNum.toString());
    }

    public static getLeveNum(): number  {
        return Us_sdlyg_er._gameData.levelNum;
    }

    public static addMoney(add: number)  {
        add = Math.ceil(add)
        var last = Us_sdlyg_er._gameData.moneyNum
        Us_sdlyg_er._gameData.moneyNum += add;
        Laya.LocalStorage.setItem("moneyNum", Us_sdlyg_er._gameData.moneyNum.toString());
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserMoneyChange,
            {
                curr: Us_sdlyg_er._gameData.moneyNum,
                last: last
            })
    }
    public static subMoney(sub: number)  {
        sub = Math.ceil(sub)
        var last = Us_sdlyg_er._gameData.moneyNum
        Us_sdlyg_er._gameData.moneyNum -= sub;
        if (Us_sdlyg_er._gameData.moneyNum < 0)  {
            Us_sdlyg_er._gameData.moneyNum = 0;
        }
        Laya.LocalStorage.setItem("moneyNum", Us_sdlyg_er._gameData.moneyNum.toString());
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserMoneyChange,
            {
                curr: Us_sdlyg_er._gameData.moneyNum,
                last: last
            })
    }
    public static getMoney()  {
        return Us_sdlyg_er._gameData.moneyNum;
    }

    public static addCrystal(add: number)  {
        add = Math.ceil(add)
        var last = Us_sdlyg_er._gameData.crystalNum
        Us_sdlyg_er._gameData.crystalNum += add;
        Laya.LocalStorage.setItem("crystalNum", Us_sdlyg_er._gameData.crystalNum.toString());
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserCrystalChange,
            {
                curr: Us_sdlyg_er._gameData.crystalNum,
                last: last
            })
    }
    public static subCrystal(sub: number)  {
        sub = Math.ceil(sub)
        var last = Us_sdlyg_er._gameData.crystalNum
        Us_sdlyg_er._gameData.crystalNum -= sub;
        if (Us_sdlyg_er._gameData.crystalNum < 0)  {
            Us_sdlyg_er._gameData.crystalNum = 0;
        }
        Laya.LocalStorage.setItem("crystalNum", Us_sdlyg_er._gameData.crystalNum.toString());
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserCrystalChange,
            {
                curr: Us_sdlyg_er._gameData.crystalNum,
                last: last
            })
    }
    public static getCrystal()  {
        return Us_sdlyg_er._gameData.crystalNum;
    }


    /**
     * 解锁了道具
     * @param name 道具名称包含类型和id
     */
    public static unlockProp(name: string) {
        Us_sdlyg_er._gameData.bag.push(name);
        var bagData = JSON.stringify(Us_sdlyg_er._gameData.bag);
        Laya.LocalStorage.setItem("bag", bagData);
    }

    /**
     * 判断是否拥有该道具
     * @param name 道具名称包含类型和id
     */
    public static ownerProp(name: string): boolean {
        let isOwner: boolean = false;
        for (let i = 0; i < Us_sdlyg_er._gameData.bag.length; i++) {
            if (Us_sdlyg_er._gameData.bag[i] == name) {
                isOwner = true;
                break;
            }
        }
        return isOwner;
    }

    public static setSkin(people: string, club: string, ball: string) {
        Us_sdlyg_er._gameData.people = people;
        Us_sdlyg_er._gameData.club = club;
        Us_sdlyg_er._gameData.ball = ball;
        Laya.LocalStorage.setItem("people", Us_sdlyg_er._gameData.people);
        Laya.LocalStorage.setItem("club", Us_sdlyg_er._gameData.club);
        Laya.LocalStorage.setItem("ball", Us_sdlyg_er._gameData.ball);
    }

    public static getSkinConfig(): any {
        return {
            people: Us_sdlyg_er._gameData.people,
            club: Us_sdlyg_er._gameData.club,
            ball: Us_sdlyg_er._gameData.ball
        }
    }

    public static setNeedCoin() {
        Us_sdlyg_er._gameData.needCoin = Math.floor(Us_sdlyg_er._gameData.needCoin * 1.5);
        Laya.LocalStorage.setItem("rank_level", Us_sdlyg_er._gameData.rank_level.toString());        
    }

    public static getNeedCoin(): number {
        return Us_sdlyg_er._gameData.needCoin;
    }

    public static ownerPropAll(): boolean {
        return (Us_sdlyg_er._gameData.bag.length >= 37);
    }

    public static getRankLevel():number{
        return Us_sdlyg_er._gameData.rank_level;
    }

    public static addRankLevel(){
        Us_sdlyg_er._gameData.rank_level++;
        Laya.LocalStorage.setItem("rank_level", Us_sdlyg_er._gameData.rank_level.toString());
    }

    public static subRankLevel(){
        Us_sdlyg_er._gameData.rank_level--;   
        Us_sdlyg_er._gameData.rank_level = Math.max(0,Us_sdlyg_er._gameData.rank_level);
    }

}

