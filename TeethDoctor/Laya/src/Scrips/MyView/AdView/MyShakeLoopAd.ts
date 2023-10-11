
import Shar_XYXZS_eAd from "../../../ShareAd/ShareAd";

import MyChang_XYXZS_eLoopAdBox from "./MyChangeLoopAdBox";
import Uti_XYXZS_lit from "../../../Utilit";


export default class MySha_XYXZS_keLoopAd extends Laya.Script {
 //   /** @prop {name:numType, tips:"数字类型示例", type:number,default:271}*/
   // public AdPosID: number = 271;
     public AdP_XYXZS_osID: number = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
    public Shak_XYXZS_eTime: number = 1000;
    public Chan_XYXZS_eAdTime: number = 20000;
    public Rota_XYXZS_Angel: number = 10;
    public Sc_XYXZS_ale: number = 0.1;
    protected _l_XYXZS_ist: Laya.List;
    protected _c_XYXZS_ells: Array<Laya.UIComponent>;
    protected _sh_XYXZS_akeTimer: number = 0;
    protected _ch_XYXZS_angeAdTimer: number = 0;;
    protected _sha_XYXZS_keIndex: number = 0;


    protected _hadAdName: string[] = new Array(4);
    onAwake() {
        this._l_XYXZS_ist = this.owner.getChildByName("List") as Laya.List;
        this._l_XYXZS_ist.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._c_XYXZS_ells = this._l_XYXZS_ist.cells;
        // this._list.hScrollBarSkin = "";
    }
    onEnable(): void {
        this.GetAdData();
    }

    public Chan_XYXZS_geAd(adName: string, complate: Function) {
        var i:number;
        while (true) {
             i=Math.floor((Math.random()*this._l_XYXZS_ist.array.length));
            // for (var i = 0; i < this._list.array.length;++i)  {
            var _ishad = false
            for (var j = 0; j < this._hadAdName.length; ++j)  {


                if (this._l_XYXZS_ist.array[i].title == this._hadAdName[j])  {

                    _ishad = true;
                }

            }

            if (!_ishad)  {

                complate(this._l_XYXZS_ist.array[i]);
                for (var k = 0; k < this._hadAdName.length; ++k)  {
                    if (this._hadAdName[k] == adName)  {
                        this._hadAdName[k] = this._l_XYXZS_ist.array[i].title;
                        break;
                    }
                }
                break;
            }
            // }
        }
    }

    protected onListRender(cell: Laya.Box, index: number): void {



        //  var data = this._list.array[index];
        //var loopAdBox: LoopAdBox = cell.getComponent(LoopAdBox);
        var data = this._l_XYXZS_ist.array[index];
        var loopAdBox: MyChang_XYXZS_eLoopAdBox = cell.getComponent(MyChang_XYXZS_eLoopAdBox);

        loopAdBox.setData(data);

        this._hadAdName[index] = data.title;


    }
    GetAdData() {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
            console.log("广告数" + datas.length);
            if (self.owner && !self.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    var temp = [];
                    for (var i = 0; i < datas.length; ++i) {
                        let repeat = false;
                        for (let index = 0; index < temp.length; index++) {
                            const element = temp[index];
                            if (element.appid == datas[i]) {
                                repeat = true;
                                break;
                            }
                        }
                        if (!repeat) {
                            temp.push(datas[i]);
                        }
                    }
                    temp.sort(() => { return 1 - Math.random() })
                    this._l_XYXZS_ist.array = temp;
                }
                else {
                    this._l_XYXZS_ist.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
            //  console.log("广告数"+datas.length);           
        });

    }
}