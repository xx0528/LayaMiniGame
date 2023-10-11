import * as CryptoJS from "./aes.js"

export default class Aes_wcjtn_Tools
{
    private static readonly _wcjtn_KEY_wcjtn_ = 'b#63fFJ6AvkK3YT*';
    private static readonly _wcjtn_IV_wcjtn_ = 'J$f4DU%sNL73M&Go';

    //加密
    public static en_wcjtn_crypt(str: string) {
        var key = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_KEY_wcjtn_);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_IV_wcjtn_);//向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    //解密
    public static de_wcjtn_crypt(str: string) {
        var key = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_KEY_wcjtn_);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_IV_wcjtn_);//向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    
}