import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { clearAuthState } from "@/store/reducers";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
const Profile = () => {
  const dispatch = useDispatch();
  const LogOut = async () => {
    console.log("Log out");
    dispatch(clearAuthState());
    await SecureStore.deleteItemAsync(LOCAL_STORAGE_JWT_KEY);
  };
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => LogOut()}
        >
          <ButtonText>Đăng xuất</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Profile;
