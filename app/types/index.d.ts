import { Timestamp,FieldValue } from "firebase/firestore";

type likes = string[]

type userRef = string
interface IComments{
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
    userRef:userRef,
    id:string;
}
export {IPost, IUser, IComments, likes}