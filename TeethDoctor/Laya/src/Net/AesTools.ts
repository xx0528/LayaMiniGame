// import * as CryptoJS from "./aes.js"

export default class Aes_XYXZS_Tools
{
    private static readonly KE_XYXZS_Y = 'b#63fFJ6AvkK3YT*';
    private static readonly I_XYXZS_V = 'J$f4DU%sNL73M&Go';

    //加密
    public static en_XYXZS_crypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(Aes_XYXZS_Tools.KE_XYXZS_Y);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(Aes_XYXZS_Tools.I_XYXZS_V);//向量iv
        // var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        // return encrypted.toString();
        return str;
    }

    //解密
    public static de_XYXZS_crypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(Aes_XYXZS_Tools.KE_XYXZS_Y);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(Aes_XYXZS_Tools.I_XYXZS_V);//向量iv
        // var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        // return decrypted.toString(CryptoJS.enc.Utf8);
        return str;
    }
    
    
}