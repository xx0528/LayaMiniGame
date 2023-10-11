

export class ryw_StorageReq
{
    public key : string = null;
    public data : any = {};
    public success : ()=> void = null;
    public fail :  ()=> void = null;
    public complete : ()=> void = null;
}

//数据本地持久化保存
export default class ryw_StorageMgr {
    
    public static ryw_setStorage(req : ryw_StorageReq) {
        let dataStr:string = JSON.stringify(req.data);
        if (!Laya.Browser.onMiniGame) {
            Laya.LocalStorage.setItem(req.key,dataStr);
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

    public static ryw_getStorage(key): any {
        var value = null;
        try {
            if (!Laya.Browser.onMiniGame) {
                value = Laya.LocalStorage.getItem(key);
            }else{
                value = wx.getStorageSync(key);
            }
        } catch (e) {
        }
        return value;
    }
}