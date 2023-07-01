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
import { signupSchema } from "../../../schema/signUp";
import { ErrorMessage, Button } from "../../../components/Auth";
import { IUser } from "../../../types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import useAuth, { authValue } from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader";

export default function Register({
  navigation,
}: StackScreenProps<RootStackParamList, "Register">) {
  const { dispatch } = useAuth() as authValue;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submitHandler(
    user: Omit<IUser, "photoUrl"> & { password: string }
  ) {
    setLoading(true);
    try {
      const { email, password, username } = user;
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(createdUser.user, { displayName: username });
      const userDocRef = doc(db, "users", createdUser.user.uid);
      await setDoc(userDocRef, {
        email,
        username,
        photoUrl: "",
      });
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
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={submitHandler}
              validationSchema={signupSchema}
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
                        { borderColor: `${(errors.username && touched.username)  ? "red" : "#ccc"}` },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor={"#444"}
                        placeholder="Username"
                        autoComplete="username"
                        keyboardType="default"
                        autoCapitalize="none"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        style={{ color: "white" }}
                      />
                    </View>
                    {(errors.username && touched.username) && (
                      <ErrorMessage>{errors.username}</ErrorMessage>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        styles.input,
                        { borderColor: `${(touched.email && errors.email) ? "red" : "#ccc"}` },
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
                    {(touched.email && errors.email) && (
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
                    {(touched.password && errors.password)&& (
                      <ErrorMessage>{errors.password}</ErrorMessage>
                    )}
                  </View>
                  <Button
                    activeOpacity={0.5}
                    //@ts-ignore
                    onPress={handleSubmit}
                    disabled={!isValid}
                    btnStyle={{ marginBottom: 25, marginTop: 30 }}
                    bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
                  >
                    Signup
                  </Button>
                </>
              )}
            </Formik>
            <View style={styles.bottomContainer}>
              <Text style={[{ color: "white" }, typographyStyles.md]}>
                Have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Sign in</Text>
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
    marginBottom: 15,
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
});
