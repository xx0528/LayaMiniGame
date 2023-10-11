import Game_tippy_Mgr from "../Mgr/GameMgr";
import Cubemove from "./Cubemove";

export default class createcube extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    constructor() { super(); }
    public loaded = false//是否加载完成
    public dir = 1//创建方向（相对摄像机方向） 1前面z- 2左边x+ 3后面z+ 4右边x-
    public pos = { up: 4, y: 0.5 }//方块之间的平面差距和高度差距
    public lastpos = new Laya.Vector3(0, 0, 0)//初始第一个方块的坐标
    public leavedata = {//color就是颜色不同如果没有color就是默认
        //01中间挥动正方形 02竖向长方体 03横向长方体 4两个长方体 7 8
        leave1: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) },
        ],
        leave2: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            // { name: "Cube02", color: new Laya.Vector4(1, 1, 1, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave3: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            // { name: "Cube02", color: new Laya.Vector4(1, 1, 1, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave4: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            // { name: "Cube02", color: new Laya.Vector4(1, 1, 1, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave5: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave6: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave7: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave8: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave9: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],

        leave10: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave11: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave12: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave13: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave14: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave15: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave16: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave17: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave18: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave19: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_L", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave20: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave21: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave22: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave23: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave24: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave25: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave26: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave27: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave28: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave29: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave30: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave31: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave32: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave33: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "fangkuai01", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave34: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai07", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave35: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai05", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
        leave36: [
            { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai08", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
            { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
            { name: "fangkuai09", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
            { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
        ],
    }
    public leave = 1
    public useleave = 1
    public cubepoop = []//被创建的都放到这个里面
    public cubeinitinfo = []//被创建的初始信息
    public Mainscenesp
    public ep: Laya.Sprite3D
    public createlayer: Laya.Sprite3D

    public norcube: Laya.Sprite3D//普通的cube
    public zhongdian: Laya.Sprite3D
    public zhuanpan: Laya.Sprite3D
    public meshs: Laya.Sprite3D
    public fangkuais: Laya.Sprite3D
    public baoshi: Laya.Sprite3D

    onAwake() {
        // Laya.stage.getChildAt(1).getChildAt(0).getComponent(Game_tippy_Mgr)
        this.Mainscenesp = Game_tippy_Mgr.mainsp
        // console.log(Laya.stage._children);
        this.ep = this.Mainscenesp.gamescene.getChildAt(5)
        this.createlayer = this.Mainscenesp.gamescene.getChildAt(3)

        this.norcube = this.ep.getChildAt(1) as Laya.Sprite3D
        this.zhongdian = this.ep.getChildAt(3) as Laya.Sprite3D
        this.zhuanpan = this.ep.getChildAt(2) as Laya.Sprite3D
        this.meshs = this.ep.getChildAt(4) as Laya.Sprite3D
        this.fangkuais = this.ep.getChildAt(5) as Laya.Sprite3D
        this.baoshi = this.ep.getChildAt(0) as Laya.Sprite3D
        let b = this.baoshi.getChildAt(0) as Laya.MeshSprite3D
        b.meshRenderer.castShadow = true

        // console.log(this.ep, this.meshs);
        let a = Number(Laya.LocalStorage.getItem("leave"));
        if (a) {
            console.log("有过游戏记录！！！", a);

            this.useleave = a
            this.leave = a
        }
    }

    cultnameandreturncube(str: string) {//传入名字，返回对应的对象
        let func = (lab, re?) => {
            let a
            a = str.split(lab)
            if (re) {
                // console.log(a[1]);
                return a[1];
            } else {
                // console.log(a[0]);
                return a[0];
            }

        }
        let c
        if (str == 'Cube02') {
            c = this.norcube
        } else if (str == 'zhuanpan') {//旋转
            c = this.zhuanpan
        } else if (func('0') == 'fangkuai') {//方块
            c = this.fangkuais.getChildAt(Number(func('0', true)) - 1)
            // console.log("放看看");
        } else if (func('_') == 'MESH') {//字母形状
            c = this.meshs.getChildByName(str)
            // console.log("怎么回事");
        } else if (str == 'zhongdian') {//重点
            c = this.zhongdian
        }
        // console.log(c,"这个是什么");

        return c
    }

    addcubecon(a: Laya.Sprite3D) {//给fangkuai类型添加脚本
        let b
        b = a.name.split('0')
        if (b[0] == 'fangkuai') {
            let c = a.addComponent(Cubemove)
            if (b[1] == '1' || b[1] == '9') {
                if (this.dir == 1 || this.dir == 3) {
                    c.move(1, a.getChildAt(0).getChildAt(0))
                } else {
                    c.move(2, a.getChildAt(0).getChildAt(0))
                }
            } else if (b[1] == '8' || b[1] == '7') {
                c.move(3, a.getChildAt(0).getChildAt(0))
            }

        }
    }

    createcube(call, not?) {
        console.log("创建", this.useleave);
        let a = Number(Laya.LocalStorage.getItem("leave"));
        if (a) {
            if (!not) {
                this.useleave = a
            }
            // this.leave = a
        }
        if (!this.leavedata['leave' + this.useleave]) {
            this.useleave = Math.ceil(Math.random() * 36);
            this.createcube(call, true);
            console.log("没有这个等级下一个");

            return
        }
        this.initcube(true)
        this.initrandowcreate()
        for (const key in this.leavedata['leave' + this.useleave]) {
            let inf = this.leavedata['leave' + this.useleave][key]//根据类型选中需要的图形去添加
            let item = this.cultnameandreturncube(inf.name) as Laya.Sprite3D
            let yt = item.getChildAt(0) as Laya.MeshSprite3D
            yt.meshRenderer.receiveShadow = true
            // yt.meshRenderer.castShadow = true
            let x = this.lastpos.x
            let y = this.lastpos.y
            let z = this.lastpos.z
            let a = Laya.Sprite3D.instantiate(item, this.createlayer, false, new Laya.Vector3(x, y, z));
            if (key == '0') {
                this.Mainscenesp.conbox = a.getChildAt(0) as Laya.MeshSprite3D
                this.Mainscenesp.playersp.lastcolor = inf.color
            }

            // this.createlayer.addChild(a)
            a.transform.localRotationEulerY = 90
            console.log(a.transform.localPosition, " this.conbox Y " + a.transform.localRotationEulerY);
            this.addcubecon(a)
            if (inf.color) {

                let t: Laya.MeshSprite3D = a.getChildAt(0) as Laya.MeshSprite3D
                // console.log(t.meshRenderer._indexInCastShadowList);
                // t.meshRenderer.castShadow = true
                t.meshRenderer.receiveShadow = true

                // console.log("aaa", t.meshRenderer.material['albedoColor']);
                t.meshRenderer.material['albedoColor'] = inf.color
                // console.log("aaa", t.meshRenderer.material);
                if (inf.name == "fangkuai01" || inf.name == "fangkuai02" || inf.name == "fangkuai03" || inf.name == "fangkuai04" || inf.name == "fangkuai05" || inf.name == "fangkuai06" || inf.name == "fangkuai09") {
                    for (var i = 0; i < t.numChildren; i++ ) {
                        let cont = t.getChildAt(i) as Laya.MeshSprite3D;
                        cont.meshRenderer.castShadow = true
                    }
                    // let tt = t._children
                    // for (const key in tt) {
                    //     let cont = tt[key] as Laya.MeshSprite3D
                    //     // cont.meshRenderer.receiveShadow = true
                    //     cont.meshRenderer.castShadow = true
                    // }
                } else if (inf.name == "fangkuai07" || inf.name == "fangkuai08") {
                    let tt = t.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D
                    // tt.meshRenderer.receiveShadow = true
                    tt.meshRenderer.castShadow = true
                }
            }

            this.savecubeinfo(a)//保存位置信息
            if (key != '0') {
                if (inf.name != "zhongdian" && inf.name != "MESH_T" && inf.name != "zhuanpan") {
                    if (this.have < this.all) {
                        this.create(this.jun, a)
                    }
                }
            } else {
                // this.createlayer.addChild(a)
            }
        }
        call()
        // console.log(this.cubeinitinfo);

    }

    public jun = 1//本关方块支持生成多少个
    public have = 0 //已经创建了
    public all = 0

    initrandowcreate() {//随机生成宝石
        this.have = 0
        let randownum = 10 + Math.ceil(Math.random() * 5)
        this.all = randownum
        let can = 0//有几个能生成几个方块
        // console.log(randownum, "生成了这么多个");
        for (const key in this.leavedata['leave' + this.useleave]) {
            let n = this.leavedata['leave' + this.useleave][key].name
            if (n != "zhongdian" && n != "MESH_T" && n != "zhuanpan") {
                can++
            }
        }
        can--
        this.jun = randownum / can
        // console.log("平均数是", this.jun);
        this.jun = Number(this.jun.toFixed(0))
        if (this.jun < 1) {
            this.jun = 1
        } else if (this.jun > 4) {
            this.jun = 4
        }
        // console.log(this.jun);
    }
    create(time, tar) {//创建次数 1~4
        let po = 1.5
        let ran = [
            { x: -po, y: po, use: false },
            { x: po, y: -po, use: false },
            { x: po, y: po, use: false },
            { x: -po, y: -po, use: false },
        ]
        let ranbase = [
            { x: -1, y: 1, use: false },
            { x: -1, y: -1, use: false },
            { x: 1, y: 1, use: false },
            { x: 1, y: -1, use: false },
            { x: 0, y: 0, use: false },
            { x: 0, y: po, use: false },
            { x: po, y: 0, use: false },
            { x: 0, y: -po, use: false },
            { x: -po, y: 0, use: false },
        ]
        let allisuse = 0
        let getrand = (base?) => {
            let rann
            let tar
            if (base) {
                tar = ranbase
                rann = Math.floor(Math.random() * 8.99)
            } else {
                tar = ran
                rann = Math.floor(Math.random() * 3.99)
            }
            // console.log(rann, "随机的第");
            if (tar[rann].use) {
                if (base) {
                    return getrand(base)
                } else {
                    return getrand()
                }
            } else {
                tar[rann].use = true
                return tar[rann]
            }
        }
        for (let k = 0; k < time; k++) {
            let rann
            // console.log("tarname", tar.name);

            if (tar.name == "Cube02" || tar.name == "fangkuai09" || tar.name == "fangkuai01" || tar.name == "fangkuai07" || tar.name == "fangkuai08") {
                rann = getrand(true);
            } else {
                rann = getrand();
            }


            // console.log(rann);
            let a = Laya.Sprite3D.instantiate(this.baoshi, tar, false, new Laya.Vector3(0, 1, 0));
            a.transform.localPositionX = rann.x
            a.transform.localPositionY = 1
            a.transform.localPositionZ = rann.y
            a.transform.localRotationEulerX = -90
            let t: Laya.MeshSprite3D = a.getChildAt(0) as Laya.MeshSprite3D
            // t.meshRenderer.receiveShadow = false
            // console.log(t.meshRenderer._indexInCastShadowList);

            // console.log(a);
            t.meshRenderer.castShadow = true
            a.getChildAt(1).active = false
            // Laya.StaticBatchManager.combine(t)
            // console.log("静态");

            // this.createlayer.addChild(a);
            this.have++;
        }


        // this.createlayer.addChild(tar);
    }


    savecubeinfo(cub: Laya.Sprite3D) {//保存位置信息
        // 1前面z- 2左边x+ 3后面z+ 4右边x-

        // let cub: Laya.MeshSprite3D = this.Mainscenesp.gamescene.addChild(new Laya.MeshSprite3D(mesh))
        if (cub.name == 'zhuanpan') {
            this.dir -= 1
            if (this.dir < 1) {
                this.dir = 4
            }
        }
        if (this.dir == 1) {
            this.lastpos.x -= this.pos.up
        } else if (this.dir == 2) {
            this.lastpos.z -= this.pos.up
        } else if (this.dir == 3) {
            this.lastpos.x += this.pos.up
        } else if (this.dir == 4) {
            this.lastpos.z += this.pos.up
        }
        this.lastpos.y -= this.pos.y
        // cub.transform.localPosition = this.lastpos
        this.cubepoop.push(cub);
        let info = { x: cub.transform.localPositionX, y: cub.transform.localPositionY, z: cub.transform.localPositionZ }
        this.cubeinitinfo.push(info)
        // this.savecubeinfo(cub);
    }
    // savecubeinfo(cube: Laya.MeshSprite3D) {

    // }

    public bgcolor = [
        { R: 239, G: 209, B: 185 },
        { R: 176, G: 232, B: 145 },
        { R: 178, G: 167, B: 245 },
        { R: 190, G: 208, B: 248 },

        // { R: 199, G: 186, B: 235 },
        // { R: 235, G: 186, B: 233 },
        // { R: 235, G: 228, B: 186 },
    ]
    initcube(des, call?) {//失败后初始化所有

        console.log("初始化");
        this.Mainscenesp.gameuicontrosp.nextleave(this.leave, this.leavedata['leave' + this.useleave].length)//初始化关卡信息

        this.lastpos = new Laya.Vector3(0, 0, 0)
        this.dir = 1

        if (des) {//是否销毁
            for (const key in this.cubepoop) {
                // let t: Laya.MeshSprite3D = this.cubepoop[key].getChildAt(0) as Laya.MeshSprite3D
                this.cubepoop[key].destroy()
                // t.meshRenderer.material.destroy();
                // let ch = this.cubepoop[key]._children
                // for (const key in ch) {
                //     if (ch[key].meshRenderer) {
                //         console.log("有這個摧毀mesh");
                //         // if (condition) {
                //             t.meshRenderer.material.destroy();
                //         // }
                //     }

                // }

            }
            // this.createlayer.destroyChildren()
            // Laya.Resource.destroyUnusedResources();//释放内存
            let key = ((this.leave + 1) / 2) % 4
            console.log(key);
            key = Math.floor(key)
            console.log("用的是第", key);

            // let key = Math.floor(Math.random() * 6.999)
            this.Mainscenesp.Maincam.clearColor = new Laya.Vector4(this.bgcolor[key].R / 255, this.bgcolor[key].G / 255, this.bgcolor[key].B / 255, 1)
            // this.Mainscenesp.Maincam.clearColor = new Laya.Vector4(Math.random(), Math.random(), Math.random(), 1);
            this.cubepoop = []
            this.cubeinitinfo = []
        } else {
            for (const key in this.cubepoop) {
                this.cubepoop[key].transform.localPositionX = this.cubeinitinfo[key].x
                this.cubepoop[key].transform.localPositionY = this.cubeinitinfo[key].y
                this.cubepoop[key].transform.localPositionZ = this.cubeinitinfo[key].z
                this.cubepoop[key].transform.localRotationEulerY = 90


                this.cubepoop[key].haveactive = false
                let ch = this.cubepoop[key]._children
                for (const keys in ch) {
                    // console.log(ch[keys].name, "名字啥")
                    if (ch[keys].name == "Cylinder001") {
                        // console.log("是钻石");\
                        ch[keys].haveactive = false
                        let tar = ch[keys].getChildAt(0)
                        let color: Laya.Vector4 = tar.meshRenderer.material['albedoColor']
                        color.w = 1.0
                        tar.meshRenderer.material['albedoColor'] = color
                        tar.active = true
                        ch[keys].getChildAt(1).active = false
                        // let chs = this.cubepoop[key]._children
                        // for (const key in chs) {
                        //     chs[key].active = true
                        // }
                    }
                }


            }
        }


        if (call) {
            call()
        }
    }

    onEnable(): void {
    }

    onDisable(): void {
    }
}