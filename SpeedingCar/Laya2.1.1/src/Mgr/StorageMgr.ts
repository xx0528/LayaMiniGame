

export class Storage_wcjtn_Req
{
    public key_wcjtn_ : string = null;
    public data_wcjtn_ : any = {};
    public _wcjtn_success_wcjtn_ : ()=> void = null;
    public _wcjtn_fail_wcjtn_ :  ()=> void = null;
    public _wcjtn_complete_wcjtn_ : ()=> void = null;
}

//数据本地持久化保存
export default class Storage_wcjtn_Mgr {
    
    public static set_wcjtn_Storage(req : Storage_wcjtn_Req) {
        let dataStr:string = JSON.stringify(req.data_wcjtn_);
        if (!Laya.Browser.onMiniGame) {
            localStorage.setItem(req.key_wcjtn_,dataStr);
            return;
        } 
        wx.setStorage({
            key : req.key_wcjtn_,
            data : dataStr,
            success : req._wcjtn_success_wcjtn_,
            fail: req._wcjtn_fail_wcjtn_,
            complete: req._wcjtn_complete_wcjtn_
        });
    }

    public static get_wcjtn_Storage(key): any {
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