import CryptoJS from "crypto-js";
import base64 from "base-64";

const secretPass = "XkhZG4fW2t2W";


function encrypt(text) {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();
    return base64.encode(data);
};

function decrypt(text) {
    const bytes = CryptoJS.AES.decrypt(base64.decode(text), secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};

export {encrypt, decrypt};