

export class Storage_ppxhc_Req
{
    public key : string = null;
    public data : any = {};
    public success : ()=> void = null;
    public fail :  ()=> void = null;
    public complete : ()=> void = null;
}

//数据本地持久化保存
export default class Storage_ppxhc_Mgr {
    
    public static set_ppxhc_Storage(req : Storage_ppxhc_Req) {
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

    public static get_ppxhc_Storage(key): any {
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