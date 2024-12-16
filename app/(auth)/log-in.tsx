import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  AlertCircleIcon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useLoginMutation } from "@/services";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { useDebounce, validateEmail } from "@/utils/helper";
import { Text } from "@/components/ui/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LogIn = () => {
  // Set Valid
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Set form
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const debounceEmail = useDebounce(email, 1000);

  // Handle Logic
  const [showPassword, setShowPassword] = React.useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  // Call Api
  const [login] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorEmail("");
      setErrorPassword("");
      setIsInvalidEmail(false);
      setIsInvalidPassword(false);

      // Check Email
      if (!validateEmail(email)) {
        setIsInvalidEmail(true);
        setErrorEmail("Vui lòng nhập địa chỉ email hợp lệ");
      }

      // Check password
      if (password.length < 8) {
        setIsInvalidPassword(true);
        setErrorPassword("Nhập mật khẩu lớn hơn 8 kí tự");
        return;
      }
      console.log(email, password);
      return;
      const response = await login({ email, password });
      console.log(response);

      if (response.error) {
        const message = response.error.data?.message || "Unknown error";
        alert(message);
      } else {
        setIsInvalidEmail(false);
        setIsInvalidPassword(false);
        // router.push(`/(auth)/verify?email=${email}&role=${role}`);
        router.push(`/(customer)/(home)`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      debounceEmail !== undefined &&
      email !== undefined &&
      email.length > 0
    ) {
      if (!validateEmail(email)) {
        setIsInvalidEmail(true);
        setErrorEmail("Vui lòng nhập địa chỉ email hợp lệ");
      } else {
        setIsInvalidEmail(false);
      }
    } else {
      setIsInvalidEmail(false);
      setErrorEmail("");
    }
  }, [debounceEmail]);

  return (
    <TouchableWithoutFeedback
      className="flex h-full items-center justify-between"
      onPress={Keyboard.dismiss}
    >
      <Box className="flex items-center justify-start h-full bg-white gap-4 px-5">
        {/* header */}
        <Box className="p-5 mt-10 flex-start gap-2 flex-row items-center w-full">
          <MaterialIcons name="cabin" size={28} color="black" />
          <Text size="2xl" className="text-black w-full font-extrabold">
            Accomodation seeking
          </Text>
        </Box>
        {/* Title */}
        <Box className="p-5 flex flex-col flex-start w-full">
          <Text size="5xl" className="text-black w-full font-extrabold">
            Đăng nhập
          </Text>

          <Text size="lg" className="text-gray-600 w-full font-normal">
            Nhập email và mật khẩu để đăng nhập
          </Text>
        </Box>

        {/* login */}
        <Box className="p-5 w-full rounded-xl flex gap-5 bg-white">
          {/* Input */}
          {/* Email */}
          <FormControl
            isInvalid={isInvalidEmail}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" className="text-gray-600">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="my-1 flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={MailIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng Nhập email`}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorEmail}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Password */}
          <FormControl
            isInvalid={isInvalidPassword}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" className="text-gray-600">
                Mật khẩu
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="my-1 flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={LockIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type={showPassword ? "text" : "password"}
                  placeholder={`Vui lòng nhập mật khẩu`}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <InputSlot
                  className="pr-3 flex items-center"
                  onPress={handleState}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorPassword}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Button */}
          <Box className="flex flex-col justify-between">
            {/* Forget Password */}
            <Box className="flex flex-row items-center w-full justify-end">
              <Pressable
                onPress={() => {
                  router.replace("/(auth)/sign-up");
                }}
              >
                <Text size="md" className="font-bold text-[#4D81E7]">
                  Quên mật khẩu
                </Text>
              </Pressable>
            </Box>

            {/* Login */}
            <Pressable
              onPress={handleSubmit}
              className={`w-full h-12 bg-[#0973A8] rounded-lg flex justify-center items-center mt-2 ${
                loading ? "opacity-70" : "opacity-100"
              }`}
            >
              {loading && <ActivityIndicator color="#D1D5DB" />}
              {!loading && (
                <Text className="text-white font-bold text-lg">Đăng nhập</Text>
              )}
            </Pressable>

            {/* You have account */}
            <Box className="flex flex-row items-center gap-2 mt-4 w-full justify-center">
              <Text size="md" className="text-center">
                Không có tài khoản ?
              </Text>
              <Pressable
                onPress={() => {
                  router.push("/(auth)/sign-up");
                }}
              >
                <Text size="lg" className="font-bold text-[#4D81E7]">
                  Đăng ký
                </Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
