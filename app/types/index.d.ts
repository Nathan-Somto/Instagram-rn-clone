import { Timestamp,FieldValue } from "firebase/firestore";

type likes = string[]

type userRef = string
type comments = {
    user:Omit<IUser, "email">,
    comment:string,
    timestamp:FieldValue | Timestamp | string,
}
interface IUser{
    username:string,
    photoUrl:string,
    email:string,
}
interface IPost{
    user:Omit<IUser, 'email'>,
    images:string[],
    caption:string,
    timestamp:FieldValue | Timestamp | string,
    likes:likes,
    comments:comments[],
    userRef:userRef,
    id:string;
}
export {IPost, IUser, comments, likes}