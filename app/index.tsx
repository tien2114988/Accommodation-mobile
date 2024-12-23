import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  authenticateUser,
  selectIsAuthenticated,
  setUser,
} from "@/store/reducers";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading/Loading";
import { useVerifyJwtForUserQuery } from "@/services";

const App = () => {
  // const isAuthenticated = false;
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData, isLoading: userLoading } = useVerifyJwtForUserQuery(
    token,
    {
      skip: !token,
    }
  );

  useEffect(() => {
    getFirstTime();
    getToken();
  }, [token]);

  const getFirstTime = async () => {
    setIsLoading(true);
    try {
      const firsttime = await SecureStore.getItemAsync("FT");
      if (!firsttime) {
        await SecureStore.setItemAsync("FT", "false");
        return router.replace("/(auth)/welcome");
      } else {
        if (firsttime === "false") {
          return <Redirect href="/(auth)/welcome" />;
        }
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getToken = async () => {
    setIsLoading(true);
    try {
      const jwt = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);

      if (!jwt) {
        return;
      }
      setToken(jwt);
      dispatch(authenticateUser(true));

      
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (userLoading || isLoading) {
    return <Loading />;
  }

  return <Redirect href="/(tabs)/(home)" />;
};
export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
