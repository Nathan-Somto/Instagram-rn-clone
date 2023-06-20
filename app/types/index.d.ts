type likes = string[]

type userRef = string
type comments = Omit<IUser, "email"> & {
    comment:string,
    createdAt:string
}
interface IUser{
    username:string,
    photoUrl:string,
    email:string,
}
interface IPost{
    user:IUser,
    images:string[],
    caption:string,
    createdAt:string,
    likes:likes,
    comments:comments[],
    userRef:userRef,
}
export {IPost, IUser, comments, likes}