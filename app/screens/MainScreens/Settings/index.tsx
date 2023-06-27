import React from "react";
import { IUser } from "../../../types";
import Screen from "../../../components/Shared/Screen";
import { SettingsList, UserProfile } from "../../../components/Settings";
import useAuth, { authValue } from "../../../hooks/useAuth";

export default function Settings() {
  const {
     user ,
  } = useAuth() as authValue;
  const userData: IUser = {
    username: user?.displayName ?? "",
    photoUrl: user?.photoURL
      ? user.photoURL
      : "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
    email: user?.email ?? "",
  };
  return (
    <Screen>
      <UserProfile {...userData} />
      <SettingsList />
    </Screen>
  );
}
