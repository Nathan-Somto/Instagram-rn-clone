import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";
import { theme, typographyStyles } from "../../../constants";
import ErrorMessage from "../../../components/Auth/ErrorMessage";

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, "Login">) {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(4, "Password Length is short")
      .max(255, "Password Length is too Long")
      .required(),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Image
          source={require("../../../../assets/insta-logo.png")}
          style={styles.image}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value) => {
            console.log(value);
            navigation.navigate("Main");
          }}
          validationSchema={loginSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <>
              <View style={styles.inputContainer}>
              <View
                style={[
                  styles.input,
                  { borderColor: `${errors.email ? "red" : "#ccc"}` },
                ]}
              >
                <TextInput
                  placeholderTextColor={"#444"}
                  placeholder="Email Address"
                  autoComplete="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={{color:"white"}}
                />
              </View>
                {touched.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </View>

              <View style={styles.inputContainer}>

              <View
                style={[
                  styles.input,
                  { borderColor: `${errors.password ? "red" : "#ccc"}` },
                ]}
              >
                <TextInput
                  placeholderTextColor={"#444"}
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                  style={{color:"white"}}
                />
                
              </View>
              {touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </View>
              <View style={styles.forgotPasswordContainer}>
                <Text style={[{color:theme.colors.primaryBlue, fontWeight:"500", fontSize:14}, typographyStyles.md]}>Forgot Password</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: `${isValid ? theme.colors.primaryBlue : theme.colors.secondaryBlue}` },
                ]}
                activeOpacity={0.5}
                onPress={handleSubmit}
                /* disabled={isValid} */
              >
                <Text style={[styles.buttonText, typographyStyles.md]}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View style={styles.bottomContainer}>
          <Text style={[{color:"white"},typographyStyles.md]}>{"Don't"} Have an Account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"black"
  },
  inputContainer:{
    marginBottom: 12,
  },
  input: {
    width: 300,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,
    borderRadius: 6,
    marginBottom:6,
    color:"white"
  },
  image: {
   width:300,
  resizeMode:"contain",
  marginBottom: 6,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    height: 45,
    width: 300,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20
  },
  buttonText:{
    fontWeight:'600',
    color:'white',
    fontSize:14
  },
  bottomContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center"
  },
  linkText:{
    color:"#3797EF",
    marginLeft:5.5,
    fontWeight:"600"
  },
  forgotPasswordContainer:{
    alignItems:'flex-end',
    marginVertical:10,
    paddingHorizontal:20
  }
});
