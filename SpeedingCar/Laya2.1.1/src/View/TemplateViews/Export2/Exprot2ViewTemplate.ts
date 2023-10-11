import Template_wcjtn_View_wcjtn_Base from "../TemplateViewBase";
import KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import Utilit_wcjtn_ from "../../../Utilit";
import _wcjtn_ShareAd_wcjtn_ from "../../../ShareAd/ShareAd";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../../Mgr/ViewMgr";
import View_wcjtn_Base from "../../ViewBase";
import WX_wcjtn_ADMgr, { WX_wcjtn_BannderAd } from "../../../Mgr/WXADMgr";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";

export default class Exprot2_wcjtn_View_wcjtn_Template extends Template_wcjtn_View_wcjtn_Base {
    protected _continue_wcjtn_Btn: Laya.Sprite = null;
    protected _krq_wcjtn_VLoopAd: KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad = null;
    protected _KRQ_V_wcjtn_LoopAd: Laya.Clip = null;

    protected _isCanClose: boolean = false;
    protected _banner: WX_wcjtn_BannderAd = null;

    onAwake() {
        super.onAwake();
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad);
        this._krq_wcjtn_VLoopAd.use_wcjtn_Local_wcjtn_Random = true;
        this._krq_wcjtn_VLoopAd.use_wcjtn_Random = false;
        this._krq_wcjtn_VLoopAd.useMovePause = false;
        this._krq_wcjtn_VLoopAd.sort_wcjtn_Datas = this.sort_wcjtn_Datas;
        this._continue_wcjtn_Btn = this.View_wcjtn_.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_wcjtn_Btn.visible = false;
        let self = this;
        // if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag && 1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner)
        // {
        //     Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000,self,()=>
        //     {
        //         self._continue_wcjtn_Btn.visible = true;
        //         Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_ShowTime * 1000,self,()=>
        //         {
        //             self.ShowBanner();
        //             Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_HideTime * 1000,self,()=>
        //             {
        //                 self._isCanClose = true;
        //                 if(null != self._banner)
        //                 {
        //                     self._banner._wcjtn_hide_wcjtn_();
        //                 }
        //                 self._banner = null;
        //             })

        //         })
        //     })
        // }
        // else
        // {
        //     Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000,self,()=>
        //     {
        //         self._continue_wcjtn_Btn.visible = true;
        //         self._isCanClose = true;
        //     })
        // }
        Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, () => {
            self._continue_wcjtn_Btn.visible = true;
        })
        this._KRQ_V_wcjtn_LoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if (Utilit_wcjtn_.is_wcjtn_IphoneX()) {
            this._KRQ_V_wcjtn_LoopAd.top = this._KRQ_V_wcjtn_LoopAd.top + 75;
        }
    }

    onStart() {
        this._krq_wcjtn_VLoopAd.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.MoreGame_wcjtn_LocationID;
        super.onStart();
    }

    add_wcjtn_Event() {
        super.add_wcjtn_Event();
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    }

    remove_wcjtn_Event() {
        super.remove_wcjtn_Event();
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    }

    protected ShowBanner() {
        let self = this;
        WX_wcjtn_ADMgr.get_wcjtn_Banner((banner: WX_wcjtn_BannderAd) => {
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner
            if (null != self._banner) {
                self._banner._wcjtn_show_wcjtn_();
            }
            else {
                this._isCanClose = true;
            }
            if (this.is_wcjtn_Show_wcjtn_HistoryBtn) {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    }

    onDestroy() {
        if (null != this._banner) {
            this._banner._wcjtn_hide_wcjtn_();
        }
        this._banner = null;
    }

    private _clickFlag: boolean = false;
    protected on_wcjtn_Continue_wcjtn_Btn() {
        let self = this;
        if (!this._clickFlag) {
            this._clickFlag = true;
            if (Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag && 1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner)  {
                Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, () =>  {
                    self._continue_wcjtn_Btn.visible = true;
                    Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_ShowTime * 1000, self, () =>  {
                        self.ShowBanner();
                        Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_HideTime * 1000, self, () =>  {
                            self._isCanClose = true;
                            if (null != self._banner)  {
                                self._banner._wcjtn_hide_wcjtn_();
                            }
                            self._banner = null;
                        })

                    })
                })
            }
            else  {
                Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, () =>  {
                    self._continue_wcjtn_Btn.visible = true;
                    self._isCanClose = true;
                })
            }
        }
        if (!this._isCanClose)
            return;
        let excute = () => {
            self.close_wcjtn_View();//关闭此界面
            //todo:你关闭此界面之后你的逻辑
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MyMainView);
        }
        View_wcjtn_Mgr.ins_wcjtn_tance.tryShowPopAd((v: View_wcjtn_Base) => //尝试打开 ViewDef.Export3View 界面
        {
            if (null != v)//成功打开 ViewDef.Export3View 界面
            {
                v.on_wcjtn_CloseEvent = () => //当 ViewDef.Export3View 界面关闭 后执行你的逻辑
                {
                    excute();
                }
            }
            else {
                excute();  //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        })
    }

    protected sort_wcjtn_Datas(datas: any): any {
        if (null == datas || 0 == datas.length)
            return [];
        let dataDic: { [appid: string]: any[] } = {};
        let keys = new Array<string>();
        for (let i = 0; i < datas.length; ++i) {
            let data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        for (let i = 0; i < keys.length; ++i) {
            let key = keys[i];
            let randomIndex = Math.floor(Math.random() * keys.length);
            let temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (let i = 0; i < keys.length; ++i) {
            let key = keys[i];
            let dataArray = dataDic[key];
            for (let j = 0; j < dataArray.length; ++j) {
                let data = dataArray[j];
                let randomIndex = Math.floor(Math.random() * dataArray.length);
                let temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        let res = new Array<any>();
        let ignores = [];
        while (keys.length > 0) {
            let isComplate = true;
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let isOk = true;
                for (let j = 0; j < ignores.length; ++j) {
                    let ignore = ignores[j];
                    if (ignore == key) {
                        isOk = false;
                        break;
                    }
                }
                if (isOk) {
                    isComplate = false;
                    let data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if (ignores.length > 3) {
                        ignores.shift();
                    }
                    if (dataDic[key].length <= 0) {
                        keys.splice(i, 1);
                        --i;
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
            if (isComplate) {
                for (let j = 0; j < keys.length; ++j) {
                    let key = keys[j];
                    let isOk = true;
                    let dataArray = dataDic[key];
                    ignores.splice(0);
                    for (let h = 0; h < dataArray.length; ++h) {
                        let data = dataArray[h];
                        for (let i = 0; i < res.length; ++i) {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                            for (let k = 0; k < ignores.length; ++k) {
                                let ignore = ignores[k];
                                if (null != ignore && ignore == key) {
                                    isOk = false;
                                    break;
                                }
                            }
                            if (isOk) {
                                if (null != data) {
                                    let f = res.slice(0, i + 1);
                                    let b = res.slice(i + 1, res.length);
                                    res = f;
                                    res.push(data);
                                    for (let a = 0; a < b.length; ++a) {
                                        res.push(b[a]);
                                    }
                                }
                            }
                        }
                    }

                }
                break;
            }
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let randomIndex = Math.floor(Math.random() * keys.length);
                let temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
        }
        return res;
    }
}
