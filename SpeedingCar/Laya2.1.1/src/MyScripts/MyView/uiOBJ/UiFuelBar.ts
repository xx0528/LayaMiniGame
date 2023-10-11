export default class UiFuelBar extends Laya.Script {

    private mBar:Laya.Image;

    private _enoughPic:string = "res/油条2.png";
    private _lowFuelPic:string = "res/油条1.png";

    private _startHeight:number = 0;
    private _inWanning:boolean = false;
    constructor() { super(); }

    onAwake(){
        this.mBar = this.owner as Laya.Image;
        this.mBar.skin = this._enoughPic;
        this._startHeight = this.mBar.height;
    }

    onUpdate(){
        if(this.mBar.height <= this._startHeight/2 && !this._inWanning){
            this.Wanning();
        }else if(this.mBar.height>this._startHeight/2 && this._inWanning){
            Laya.timer.clearAll(this);
            this._inWanning = false;
            this.mBar.skin = this._enoughPic;
        }
    }

    Wanning(){
        this._inWanning = true;
        this.mBar.skin = this._enoughPic;
        Laya.timer.once(200,this,()=>{
            this.mBar.skin = this._lowFuelPic;
            Laya.timer.once(200,this,()=>{
                this.Wanning();
            })
        })
    }
}