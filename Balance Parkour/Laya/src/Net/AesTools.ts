export default class Aes_tippy_Tools
{
    private static readonly KE_tippy_Y = 'b#63fFJ6AvkK3YT*';
    private static readonly I_tippy_V = 'J$f4DU%sNL73M&Go';

    //加密
    public static _tippy_encrypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(Aes_tippy_Tools.KE_tippy_Y);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(Aes_tippy_Tools.I_tippy_V);//向量iv
        // var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        // return encrypted.toString();
        return str;
    }

    //解密
    public static _tippy_decrypt(str: string) {
        // var key = CryptoJS.enc.Utf8.parse(Aes_tippy_Tools.KE_tippy_Y);// 秘钥
        // var iv = CryptoJS.enc.Utf8.parse(Aes_tippy_Tools.I_tippy_V);//向量iv
        // var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        // return decrypted.toString(CryptoJS.enc.Utf8);
        return str;
    }
    
    
}