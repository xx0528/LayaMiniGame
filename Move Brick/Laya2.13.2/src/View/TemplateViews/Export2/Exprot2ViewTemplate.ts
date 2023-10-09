import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import Utilit_ZMDGJ_ from "../../../Utilit";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";
import Game_ZMDGJ_Mgr from "../../../Mgr/GameMgr";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../../Mgr/ViewMgr";
import View_ZMDGJ_Base from "../../ViewBase";
import WX_ZMDGJ_ADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";

export default class Exprot2_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base {
    protected _continue_ZMDGJ_Btn: Laya.Sprite = null;
    protected _krq_ZMDGJ_VLoopAd: KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad = null;
    protected _KRQ_V_ZMDGJ_LoopAd: Laya.Clip = null;

    protected _isCanClose: boolean = false;
    protected _banner: WX_ZMDGJ_BannderAd = null;

    onAwake()  {
        super.onAwake();
        this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
        this._krq_ZMDGJ_VLoopAd.use_ZMDGJ_Local_ZMDGJ_Random = true;
        this._krq_ZMDGJ_VLoopAd.use_ZMDGJ_Random = false;
        this._krq_ZMDGJ_VLoopAd.useMovePause = false;
        this._krq_ZMDGJ_VLoopAd.sort_ZMDGJ_Datas = this.sort_ZMDGJ_Datas;
        this._continue_ZMDGJ_Btn = this.View_ZMDGJ_.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_ZMDGJ_Btn.visible = false;
        let self = this;
        if (Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner)  {
            Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000, self, () =>  {
                self._continue_ZMDGJ_Btn.visible = true;
                Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner_ZMDGJ_ShowTime * 1000, self, () =>  {
                    self.ShowBanner();
                    Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner_ZMDGJ_HideTime * 1000, self, () =>  {
                        self._isCanClose = true;
                        if (null != self._banner)  {
                            self._banner._ZMDGJ_hide_ZMDGJ_();
                        }
                        self._banner = null;
                    })

                })
            })
        }
        else  {
            Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000, self, () =>  {
                self._continue_ZMDGJ_Btn.visible = true;
                self._isCanClose = true;
            })
        }

        this._KRQ_V_ZMDGJ_LoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())  {
            this._KRQ_V_ZMDGJ_LoopAd.top = this._KRQ_V_ZMDGJ_LoopAd.top + 75;
        }
    }

    onStart()  {
        this._krq_ZMDGJ_VLoopAd.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID;
        super.onStart();
    }

    add_ZMDGJ_Event()  {
        super.add_ZMDGJ_Event();
        this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()  {
        super.remove_ZMDGJ_Event();
        this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    protected ShowBanner()  {
        let self = this;
        WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner: WX_ZMDGJ_BannderAd) =>  {
            // if (null != self._banner)  {
            //     self._banner._ZMDGJ_hide_ZMDGJ_();
            // }
            // self._banner = banner
            // if (null != self._banner) {
            //     self._banner._ZMDGJ_show_ZMDGJ_();
            // }
            // else  {
            //     this._isCanClose = true;
            // }
            // if (this.is_ZMDGJ_Show_ZMDGJ_HistoryBtn)  {
            //     self.History_ZMDGJ_Btn.visible = true;
            // }
        });
    }

    onDestroy()  {
        if (null != this._banner)  {
            this._banner._ZMDGJ_hide_ZMDGJ_();
        }
        this._banner = null;
    }

    protected on_ZMDGJ_Continue_ZMDGJ_Btn()  {

        if (!this._isCanClose)
            return;
        let self = this;
        let excute = () =>  {
            // self.close_ZMDGJ_View();//关闭此界面
            //todo:你关闭此界面之后你的逻辑
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().EnterGameScene(() => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.Export2View);
            });
        }
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.tryShowPopAd((v: View_ZMDGJ_Base) => //尝试打开 ViewDef.Export3View 界面
        {
            if (null != v)//成功打开 ViewDef.Export3View 界面
            {
                v.on_ZMDGJ_CloseEvent = () => //当 ViewDef.Export3View 界面关闭 后执行你的逻辑
                {
                    excute();
                }
            }
            else  {
                excute();  //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        })
    }

    protected sort_ZMDGJ_Datas(datas: any): any {
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
        while (keys.length > 0)  {
            let isComplate = true;
            for (let i = 0; i < keys.length; ++i)  {
                let key = keys[i];
                let isOk = true;
                for (let j = 0; j < ignores.length; ++j)  {
                    let ignore = ignores[j];
                    if (ignore == key)  {
                        isOk = false;
                        break;
                    }
                }
                if (isOk)  {
                    isComplate = false;
                    let data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if (ignores.length > 3)  {
                        ignores.shift();
                    }
                    if (dataDic[key].length <= 0)  {
                        keys.splice(i, 1);
                        --i;
                        continue;
                    }
                }
                else  {
                    continue;
                }
            }
            if (isComplate)  {
                for (let j = 0; j < keys.length; ++j) {
                    let key = keys[j];
                    let isOk = true;
                    let dataArray = dataDic[key];
                    ignores.splice(0);
                    for (let h = 0; h < dataArray.length; ++h)  {
                        let data = dataArray[h];
                        for (let i = 0; i < res.length; ++i) {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                            for (let k = 0; k < ignores.length; ++k)  {
                                let ignore = ignores[k];
                                if (null != ignore && ignore == key)  {
                                    isOk = false;
                                    break;
                                }
                            }
                            if (isOk)  {
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
