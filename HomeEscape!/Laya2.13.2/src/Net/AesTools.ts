export default class ryw_AesTools
{
    private static readonly ryw_KEY = 'b#63fFJ6AvkK3YT*';
    private static readonly ryw_IV = 'J$f4DU%sNL73M&Go';

    //加密
    public static ryw_encrypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(ryw_AesTools.ryw_KEY);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(ryw_AesTools.ryw_IV);//向量iv
        // var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        // return encrypted.toString();
        return str;
    }

    //解密
    public static ryw_decrypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(ryw_AesTools.ryw_KEY);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(ryw_AesTools.ryw_IV);//向量iv
        // var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        // return decrypted.toString(CryptoJS.enc.Utf8);
        return str;
    }
    
    
}