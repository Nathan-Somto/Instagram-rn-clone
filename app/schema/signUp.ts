import * as Yup from "yup";
const signupSchema = Yup.object().shape({
    username:Yup.string().min(2,"username has to be longer than 2 chars").max(255, "username has to be shorter than 255 chars").required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(4, "Password Length is short")
      .max(255, "Password Length is too Long")
      .required(),
  });
export {signupSchema}