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
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { theme, typographyStyles } from "../../../constants";
import { RootStackParamList } from "../..";
import { loginSchema } from "../../../schema/signIn";
import { ErrorMessage, Button } from "../../../components/Auth";
import { IUser } from "../../../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import useAuth, { authValue } from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader";

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, "Login">) {
  const { dispatch } = useAuth() as authValue;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submitHandler(
    user: Omit<IUser, "username" | "photoUrl"> & { password: string }
  ) {
    setLoading(true);
    try {
      const { email, password } = user;
      const createdUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "Login", payload: createdUser.user });
    } catch (err) {
      let message = "Failed to create user.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loader />}
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
              onSubmit={submitHandler}
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
                  {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        styles.input,
                        { borderColor: `${(errors.email && touched.email) ? "red" : "#ccc"}` },
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
                        style={{ color: "white" }}
                      />
                    </View>
                    {(errors.email && touched.email) && (
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                  </View>

                  <View>
                    <View
                      style={[
                        styles.input,
                        { borderColor: `${(touched.password && errors.password) ? "red" : "#ccc"}` },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor={"#444"}
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        value={values.password}
                        style={{ color: "white" }}
                      />
                    </View>
                    {(touched.password && errors.password) && (
                      <ErrorMessage>{errors.password}</ErrorMessage>
                    )}
                  </View>
                  <View style={styles.forgotPasswordContainer}>
                    <Text
                      style={[
                        {
                          color: theme.colors.primaryBlue,
                          fontWeight: "500",
                          fontSize: 14,
                        },
                        typographyStyles.md,
                      ]}
                    >
                      Forgot Password
                    </Text>
                  </View>
                  <Button
                    activeOpacity={0.5}
                    //@ts-ignore
                    onPress={handleSubmit}
                    disabled={!isValid}
                    btnStyle={{ marginBottom: 25 }}
                    bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
                  >
                    Login
                  </Button>
                </>
              )}
            </Formik>
            <View style={styles.bottomContainer}>
              <Text style={[{ color: "white" }, typographyStyles.md]}>
                {"Don't"} Have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    width: 300,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,
    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,
  },
  image: {
    width: 300,
    resizeMode: "contain",
    marginBottom: 6,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "#3797EF",
    marginLeft: 5.5,
    fontWeight: "600",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
