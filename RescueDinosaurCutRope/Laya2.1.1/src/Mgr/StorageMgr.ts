

export class Storag_JJKLBB_eReq
{
    public key : string = null;
    public data : any = {};
    public success : ()=> void = null;
    public fail :  ()=> void = null;
    public complete : ()=> void = null;
}

//数据本地持久化保存
export default class Storag_JJKLBB_eMgr {
    
    public static setSto_JJKLBB_rage(req : Storag_JJKLBB_eReq) {
        let dataStr:string = JSON.stringify(req.data);
        if (!Laya.Browser.onMiniGame) {
            localStorage.setItem(req.key,dataStr);
            return;
        } 
        wx.setStorage({
            key : req.key,
            data : dataStr,
            success : req.success,
            fail: req.fail,
            complete: req.complete
        });
    }

    public static getSto_JJKLBB_rage(key): any {
        var value = null;
        try {
            if (!Laya.Browser.onMiniGame) {
                value = localStorage.getItem(key);
            }else{
                value = wx.getStorageSync(key);
            }
        } catch (e) {
        }
        return value;
    }
}