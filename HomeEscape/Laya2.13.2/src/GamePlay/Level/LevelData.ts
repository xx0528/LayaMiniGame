export default class LevelData extends Laya.Script3D{

    private _currentLevel : number = 1;
    private _surplusLevel : Array<number> = new Array<number>();

    private _normal : Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    constructor(){
        super();
    }

    public ryw_setCurrentLevel(level : number){
        this._currentLevel = level;
    }

    public ryw_getCurrentLevel() : number{
        return this._currentLevel;
    }

    public ryw_initializeSurplusLevel(){

        if (this._currentLevel < 1){
            console.log("error : this._currentLevel < 1")
            return ;
        }

        if (this._currentLevel<=20){
            for (let i = this._currentLevel; i <= 20; i++) {
                this._surplusLevel.push(i);
            }
        }
        else {
            this.ryw_onShuffleArithmetic()
            this._surplusLevel = this._normal;
        }
    }

    public ryw_setSurplusLevel(data: Array<number>){
        this._surplusLevel = data;
    }
    public ryw_getSurplusLevel() : Array<number>{
        return this._surplusLevel;
    }




    //随机打散
    public ryw_onShuffleArithmetic(){
        let len = this._normal.length
        for (let i = len-1; i > 0; i--) {
            let randomIndex= Math.floor(Math.random() * (i+1)); 
            // 互换
            let temp = this._normal[i];
            this._normal[i] = this._normal[randomIndex];
            this._normal[randomIndex] = temp;
        }

    }

}