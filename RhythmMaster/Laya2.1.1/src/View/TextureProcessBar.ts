export default class TextureProcessBar extends Laya.Script {

    /** @prop {name: resType, tips:"图片地址",type:string,accept:res} */
    resType:string ="";

    /** @prop {name: speed, tips:"进度条缓动速度",type:int,default=5} */
    soomthSpeed:number = 5;

    private _texture;
    private _image: Laya.UIComponent;
    private _value: number = 0;
    private _curValue: number = 0;

    public get CurrentValue(): number {
        return this._curValue;
    }

    onAwake(): void {
        this._image = this.owner as  Laya.UIComponent;
    }

    onEnable(): void {
        this._texture = Laya.loader.getRes(this.resType);
        if (this._texture == null) {
            Laya.loader.load(this.resType, Laya.Handler.create(this, () => {
                this._texture = Laya.loader.getRes(this.resType);
            }),null, Laya.Loader.IMAGE, 1)
        }
    }

    onUpdate(): void {
        this._curValue = this.Lerp(this._curValue, this._value, 1 / 60 * this.soomthSpeed);

        if (1 - this._curValue <= 0.01)
            this._curValue = 1;

        this.draw(this._curValue);
    }
    
    private Lerp(num1, num2, t): number {
        return num1 + t * (num2 - num1);
    }

    public setValue(value: number, curValue = null) {
        this._value = value;
        if (this._value > 1)
            this._value = 1;
        if (curValue != null)
            this._curValue = curValue;
    }

    private draw(value): void {
        if (this._texture == null)
        return;

        let x = 0, y = 0;
        let height = this._image.height;
        let width = this._image.width * value;
        this._image.graphics.clear();
        //this.getTexture(this._texture, 0, 0, this._image.width, this._image.height)
        this._image.graphics.fillTexture(this._texture, x, y, width, height, "no-repeat");
    }

    private getTexture(tex: Laya.Texture, x,y,width,height): Laya.Texture {
		if (width <=0)width=1;
		if (height <=0)height=1;
		tex.$_GID || (tex.$_GID=Laya.Utils.getGID())
		var texture;
		if (!texture || !texture._getSource()){
            texture=Laya.Texture.create(tex.bitmap,x,y,width,height,0,0,tex.width,tex.height);
            texture.width = width;
            texture.height = height;
		}
		return texture;
	}
}