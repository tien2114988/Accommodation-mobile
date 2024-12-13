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
  MailIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useLoginMutation, useSendOtpMutation } from "@/services";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLocales } from "expo-localization";
import { i18n, Language } from "@/localization";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import GoogleSvg from "@/components/svg/GoogleSvg";
import FacebookSvg from "@/components/svg/FacebookSvg";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { useDebounce, validateEmail } from "@/utils/helper";
import { Text } from "@/components/ui/text";

// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const LogIn = () => {
  // Set Valid
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const [isRoleInvalid, setIsRoleInvalid] = useState(false);
  const [errorRoleText, setErrorRoleText] = useState("");

  // Set form
  const [email, setEmail] = useState<string>("");
  const debounceEmail = useDebounce(email, 1000);
  const [role, setRole] = useState<string>("");
  // Call Api
  const [sendOtp] = useSendOtpMutation();

  const handleSubmit = async () => {
    setLoading(true);
    setErrorText("");
    setIsInvalid(false);
    setIsRoleInvalid(false);

    // Check Email
    if (!validateEmail(email)) {
      setIsInvalid(true);
      setErrorText(i18n.t("mail_invalid"));
      setLoading(false);
      return;
    }

    // Check Role
    if (!role) {
      setIsRoleInvalid(true);
      setErrorRoleText(i18n.t("role_not_found"));
      setLoading(false);
      return;
    }

    // console.log(email, role);

    const response = await sendOtp({ email, role });
    console.log(response);

    if (response.error) {
      const message = response.error.data?.message || "Unknown error";
      // console.log(message);
      setIsInvalid(true);
      setErrorText(message);
      setLoading(false);
    } else {
      setLoading(false);
      setIsInvalid(false);
      router.push(`/(auth)/verify?email=${email}&role=${role}`);
    }
  };

  useEffect(() => {
    if (
      debounceEmail !== undefined &&
      email !== undefined &&
      email.length > 0
    ) {
      if (!validateEmail(email)) {
        setIsInvalid(true);
        setErrorText(i18n.t("mail_invalid"));
      } else {
        setIsInvalid(false);
      }
    } else {
      setIsInvalid(false);
      setErrorText("");
    }
  }, [debounceEmail]);

  return (
    <TouchableWithoutFeedback
      className="flex h-full items-center justify-between"
      onPress={Keyboard.dismiss}
    >
      <Box className="flex items-center justify-start h-full bg-white gap-5">
        <Image
          className="h-full w-full absolute opacity-50"
          source={require("@/assets/images/bg.png")}
        />

        {/* header */}
        <Box className="p-5 mt-10 flex flex-row items-center justify-between ">
          <Box className="flex-1 flex-row gap-1">
            <Text size="3xl" className="text-black font-extrabold">
              Home
            </Text>
            <Text size="3xl" className="text-success-600 font-extrabold">
              Service
            </Text>
          </Box>
          <View className="flex-2 bg-white border-2 border-primary-300 rounded-md">
            <Button
              size="md"
              variant="solid"
              action="primary"
              className="bg-white"
            >
              <ButtonText className="text-primary-500">
                {i18n.t("language")}
              </ButtonText>
            </Button>
          </View>
        </Box>

        {/* Logo */}
        <Box className="shadow-2xl">
          <Image
            className="w-40 h-40 rounded-full"
            source={require("@/assets/images/logo.jpg")}
          />
        </Box>

        {/* login */}
        <Box className="p-10 w-[90%] rounded-xl flex gap-5 bg-white border border-gray-200">
          {/* Input */}
          {/* Email */}
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg">Email</FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="my-1 flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={MailIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`${i18n.t("mail_placeholder")}`}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorText}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Role */}

          <FormControl
            isInvalid={isRoleInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg">Role</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup
              className="flex  flex-row justify-between"
              value={role}
              onChange={setRole}
            >
              <Radio
                value="FREELANCER"
                size="lg"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>{i18n.t("freelancer")}</RadioLabel>
              </Radio>
              <Radio
                value="CUSTOMER"
                size="lg"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>{i18n.t("customer")}</RadioLabel>
              </Radio>
            </RadioGroup>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorRoleText}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Button */}
          <Box className="flex flex-col justify-between">
            {/* Login */}
            <TouchableWithoutFeedback>
              <Button
                className="w-full self-end mt-2 bg-green-500 border-none"
                size="md"
                onPress={handleSubmit}
                variant="solid"
                action="positive"
              >
                {loading && <ButtonSpinner color={"#D1D5DB"} />}
                <ButtonText size="lg" className="text-white">
                  {i18n.t("login")}
                </ButtonText>
              </Button>
            </TouchableWithoutFeedback>

            {/* You have account */}
            <Box className="flex flex-row gap-2 items-center mt-4">
              <Text size="md" className="text-center">
                {i18n.t("not_have_account")}
              </Text>
              <Pressable
                onPress={() => {
                  router.replace("/(auth)/sign-up");
                }}
              >
                <Text size="lg" className="font-bold color-green-600">
                  {i18n.t("signup")}
                </Text>
              </Pressable>
            </Box>

            <Box className="mt-3 px-10 w-full flex flex-row items-center justify-center">
              <Divider className="my-1 w-1/2" />
              <Text className="text-center px-4">{i18n.t("or")}</Text>
              <Divider className="my-1 w-1/2" />
            </Box>
            {/* Login third party */}
            <HStack
              space="md"
              reversed={false}
              className="flex justify-center items-center mt-4"
            >
              {/* Google */}
              <TouchableOpacity className="w-full hover:bg-red-500">
                <Button
                  variant="outline"
                  action="secondary"
                  className="bg-white flex flex-row items-center border border-gray-200 py-5"
                  isPressed={false}
                >
                  <GoogleSvg />
                  <ButtonText className="h-6 text-black text-lg flex items-center">
                    Google
                  </ButtonText>
                </Button>
              </TouchableOpacity>
            </HStack>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
