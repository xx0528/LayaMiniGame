import PropBase from "../Model/PropBase";


export default class PropManager{

    private static _instance: PropManager;
    private typeList:PropBase[]=[
        {
            type: "ball",
            amount: 8
        },
        {
            type: "club",
            amount: 20
        },
        {
            type: "people",
            amount: 9
        }
    ]

    public static getInstance() : PropManager
    {
        if(null == PropManager._instance)
        {
            PropManager._instance = new PropManager();
        }
        return PropManager._instance
    }


    public getPropBase(type:PropType):PropBase{
        return this.typeList[type];
    }

    public getPropTypeNum():number{
        return this.typeList.length;
    }

    

}

export enum PropType{
    ball = 0,
    club = 1,
    peopel = 2
}