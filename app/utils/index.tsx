import { FieldValue, Timestamp } from "firebase/firestore";
import { Dimensions } from "react-native";
import {differenceInDays, differenceInHours, differenceInMinutes} from 'date-fns';
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
function formatTimestamp(timestamp:FieldValue | Timestamp | string)
{
  if(!(timestamp instanceof Timestamp)){
    return ''
  }
 const postDate = timestamp.toDate();
 const currentDate = new Date();
 let diff = differenceInMinutes(currentDate,postDate);
 if(diff >= 1 && diff <=59)
 {
    return `${diff}m`;
 }
  diff = differenceInHours(currentDate, postDate);
  if(diff >= 1 && diff <= 23){
    return `${diff}h`;
  }
  diff = differenceInDays(currentDate, postDate);
  return `${diff}d`;
}

export {getDeviceHeight,getDeviceWidth,formatNumber,formatTimestamp};