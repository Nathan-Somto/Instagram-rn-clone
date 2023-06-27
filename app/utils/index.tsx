import { FieldValue, Timestamp } from "firebase/firestore";
import { Dimensions } from "react-native";

function getDeviceHeight() {
    return Dimensions.get("window").height;
  }
function getDeviceWidth(){
    return Dimensions.get("window").width;
}
function formatNumber(num:number){
 /*  if(num >= 0 && num <= 999){
    return strNum;
  }
  if( num >= 1000 && num <= 9999){
    return `${strNum[0]}${strNum[1]!=='0'? `.${strNum[1]}`:''}K`;
  }
  if(num >= 10000 && num <= 99999){
    return `${strNum[0]}${strNum[1]}${strNum[2]!=='0'? `.${strNum[1]}`:''}K`;
  }
  if(num >= 100000 && num <= 999999){
    return`${strNum.slice(3)}K`
  }
  return strNum; */
  const strNum = num.toString();
  if (num >= 0 && num <= 999) {
    return strNum;
  }
  if (num >= 1000 && num <= 999999) {
    const thousands = Math.floor(num / 1000);
    const remaining = num % 1000;
    if (remaining === 0) {
      return `${thousands}K`;
    } else {
      return `${thousands}.${Math.floor(remaining / 100)}K`;
    }
  }
  return strNum;
}
function formatTimestamp(timestamp:FieldValue | Timestamp | string){
  return `${timestamp}`;
}
export {getDeviceHeight,getDeviceWidth,formatNumber,formatTimestamp};