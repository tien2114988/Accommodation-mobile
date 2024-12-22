import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import {
  clearAuthState,
  selectIsAuthenticated,
  selectUser,
} from "@/store/reducers";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { useSelector } from "react-redux";
import RequiredAuthenticationModal from "@/components/authentication/RequiredAuthenticationModal";
import { router, useFocusEffect } from "expo-router";
const Profile = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showModal, setShowModal] = React.useState(!isAuthenticated);

  const dispatch = useDispatch();

  const LogOut = async () => {
    console.log("Log out");
    dispatch(clearAuthState());
    await SecureStore.deleteItemAsync(LOCAL_STORAGE_JWT_KEY);
    setShowModal(false);
    router.replace("/(tabs)/(home)");
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        setShowModal(false); // Hide the modal if authenticated
      } else {
        setShowModal(true); // Show the modal if not authenticated
      }
    }, [isAuthenticated])
  );

  return (
    <SafeAreaView>
      {!isAuthenticated && (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {isAuthenticated && (
        <TouchableWithoutFeedback>
          <Button
            className="w-fit self-end mt-4"
            size="md"
            onPress={LogOut}
          >
            <ButtonText>Đăng xuất</ButtonText>
          </Button>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

export default Profile;
