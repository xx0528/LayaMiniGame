import Utilit from "../../Utilit";
import GameManager from "./GameManager";
import Rock from "../OBJ/Rock";
import Tree from "../OBJ/Tree";
import Cloud from "../OBJ/Cloud";
import SceneManager from "./SceneManager";
import PlayerManager from "./PlayerManager";

export default class EnvirManager extends Laya.Script {

    private static _instance: EnvirManager;
    public static Instance(): EnvirManager {
        return this._instance;
    }

    private mRockList: Rock[] = new Array();
    private mTreeList: Tree[] = new Array();
    private mCloudList: Cloud[] = new Array();
    private mTrees: Laya.Sprite3D;
    private mRocks: Laya.Sprite3D;
    private mClouds: Laya.Sprite3D;
    private mLight: Laya.DirectionLight;
    private _envirCity: Laya.Sprite3D;
    private cityEnvList: Laya.Sprite3D[] = new Array();
    private _currentCityID: number = 0;
    private _cityDis: number = 164;  //城市环境相互间隔
    private _currentCityPosID: number = 2;

    constructor() { super(); }

    onAwake() {
        EnvirManager._instance = this;
        this.Init();
    }

    onUpdate() {
        if (this._envirCity.active) this.CityEnvRecover();
    }

    Init() {
        this.mTrees = this.owner.getChildByName("trees") as Laya.Sprite3D;
        this.mTrees._children.forEach(child => {
            let tree: Tree = child.addComponent(Tree);
            this.mTreeList.push(tree);
            tree.Hide();
        });
        this.mRocks = this.owner.getChildByName("rocks") as Laya.Sprite3D;
        this.mRocks._children.forEach(child => {
            let rock: Rock = child.addComponent(Rock);
            this.mRockList.push(rock);
            rock.Hide();
        });

        this.mClouds = this.owner.getChildByName("clouds") as Laya.Sprite3D;
        this.mClouds._children.forEach(child => {
            let cloud: Cloud = child.addComponent(Cloud);
            this.mCloudList.push(cloud);
            cloud.Hide();
        });

        this.mLight = SceneManager.Instance().GetChildByName("Directional Light") as Laya.DirectionLight;
        this._envirCity = this.owner.getChildByName("cityEnv") as Laya.Sprite3D;

        //=============
        this._envirCity.active = false;
        // Laya.timer.once(2000, this, () => {
        //     this._envirCity.active = true;
        //     this.mRocks.active = false;
        //     this.mTrees.active = false;

        // })

        //======================
        this._envirCity._children.forEach(child => {
            this.cityEnvList.push(child);
        });
        // this.randomSky();

        Utilit.for_wcjtn_Each_wcjtn_Child(this._envirCity, (child: Laya.Sprite3D) => {
            if (child.name == "model") {
                (child as Laya.MeshSprite3D).meshRenderer.castShadow = true;
            }
        })
    }

    ShowEnvir(dis: number) {
        this.ConfigCloud(dis);

        if (this._envirCity.active) return;
        let randomAmount = Math.floor(Math.random() * 3) + 1;
        let randomDis = dis + Math.random() * 20 - 20;
        for (let i = 0; i < randomAmount; i++) {
            this.ConfigTree(randomDis + 3 * i);
            this.ConfigRock(dis);
        }
    }

    /**
     * 城市环境的循环生成
     */
    private CityEnvRecover() {
        let pos: Laya.Vector3 = this.cityEnvList[this._currentCityID].transform.position;
        if (pos.z - PlayerManager.Instance().GetPlayerCar().GetCarPos().z < -100) {
            this.cityEnvList[this._currentCityID].transform.position = new Laya.Vector3(pos.x, pos.y, this._cityDis * this._currentCityPosID);
            this._currentCityID++;
            this._currentCityPosID++;
            if (this._currentCityID >= this.cityEnvList.length) this._currentCityID = 0;
        }
    }

    private ConfigRock(dis: number) {
        //显示岩石
        let rock: Rock = null;
        for (let i = 0; i < this.mRockList.length; i++) {
            if (!this.mRockList[i].InShow()) {
                rock = this.mRockList[i];
                break;
            }
        }
        if (rock == null) {
            let index = Math.floor(Math.random() * this.mRockList.length);
            let sp = Laya.Sprite3D.instantiate(this.mRockList[index].owner as Laya.Sprite3D, this.mRocks);
            rock = sp.getComponent(Rock);
            this.mRockList.push(rock);
        }
        rock.Show(dis + 25);
    }

    private ConfigTree(dis: number) {
        //显示树
        let tree: Tree = null;
        for (let i = 0; i < this.mTreeList.length; i++) {
            if (!this.mTreeList[i].InShow()) {
                tree = this.mTreeList[i];
                break;
            }
        }
        if (tree == null) {
            let index = Math.floor(Math.random() * this.mTreeList.length);
            let sp = Laya.Sprite3D.instantiate(this.mTreeList[index].owner as Laya.Sprite3D, this.mRocks);
            tree = sp.getComponent(Tree);
            this.mTreeList.push(tree);
        }
        tree.Show(dis + 20);
    }

    private ConfigCloud(dis: number) {
        if (Math.random() > 0.42) return;
        let cloud: Cloud = null;
        for (let i = 0; i < this.mCloudList.length; i++) {
            if (!this.mCloudList[i].InShow()) {
                cloud = this.mCloudList[i];
                break;
            }
        }
        if (cloud == null) {
            let index = Math.floor(Math.random() * this.mCloudList.length);
            let sp = Laya.Sprite3D.instantiate(this.mCloudList[index].owner as Laya.Sprite3D, this.mClouds);
            cloud = sp.getComponent(Cloud);
            this.mCloudList.push(cloud);
        }
        cloud.Show(dis + 200);
    }

    SetEnvir(type: EnvirType) {
        switch (type) {
            case EnvirType.CityDayTime:
                this.mRocks.active = false;
                this.mTrees.active = false;
                this.ResetCity();                
                this._envirCity.active = true;
                break;
            case EnvirType.CityNight:
                this.mRocks.active = false;
                this.mTrees.active = false;
                this.ResetCity();                
                this._envirCity.active = true;
                break;
            case EnvirType.DesertDayTime:
                this._envirCity.active = false;
                this.mRocks.active = true;
                this.mTrees.active = true;
                break;
            case EnvirType.DesertNight:
                this._envirCity.active = false;
                this.mRocks.active = true;
                this.mTrees.active = true;
                break;
        }
    }

    private ResetCity(){
        for(let i = 0 ; i < this.cityEnvList.length ; i++){
            this._currentCityPosID = i;
            this.cityEnvList[i].transform.position = new Laya.Vector3(this.cityEnvList[i].transform.position.x, this.cityEnvList[i].transform.position.y, this._cityDis * this._currentCityPosID);
        }
        this._currentCityID = 0;
        this._currentCityPosID = 2;
    }
}

export enum EnvirType {
    DesertDayTime,
    DesertNight,
    CityDayTime,
    CityNight
}