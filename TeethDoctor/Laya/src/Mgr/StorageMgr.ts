

export class Stor_XYXZS_ageReq
{
    public k_XYXZS_ey : string = null;
    public d_XYXZS_ata : any = {};
    public su_XYXZS_ccess : ()=> void = null;
    public f_XYXZS_ail :  ()=> void = null;
    public co_XYXZS_mplete : ()=> void = null;
}

//数据本地持久化保存
export default class Stora_XYXZS_geMgr {
    
    public static setSt_XYXZS_orage(req : Stor_XYXZS_ageReq) {
        let d_XYXZS_ataStr:string = JSON.stringify(req.d_XYXZS_ata);
        if (!Laya.Browser.onMiniGame) {
            Laya.LocalStorage.setItem(req.k_XYXZS_ey,d_XYXZS_ataStr);
            return;
        } 
        wx.setStorage({
            key : req.k_XYXZS_ey,
            data : d_XYXZS_ataStr,
            success : req.su_XYXZS_ccess,
            fail: req.f_XYXZS_ail,
            complete: req.co_XYXZS_mplete
        });
    }

    public static getS_XYXZS_torage(key): any {
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