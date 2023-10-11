export default class HeadPic extends Laya.Script {

    private m_pic: Laya.Image;
    private m_level: Laya.Text;

    constructor() { super(); }

    onAwake() {
        this.m_pic = this.owner.getChildByName("pic") as Laya.Image;
        this.m_level = this.owner.getChildByName("board").getChildByName("level") as Laya.Text;
    }

    set(level: number,path?: string) {
        let num = Math.floor(level / 5);
        switch (num) {
            case 0:
                this.m_level.text = "Bronze";
                break;
            case 1:
                this.m_level.text = "Silver";
                break;
            case 2:
                this.m_level.text = "Gold";
                break;
            case 3:
                this.m_level.text = "Platinum";
                break;
            case 4:
                this.m_level.text = "Diamond";
                break;
            case 5:
                this.m_level.text = "King";
                break;
        }
        if(path)this.m_pic.skin = path;
    }

}