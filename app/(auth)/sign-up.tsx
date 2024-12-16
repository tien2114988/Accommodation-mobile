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
  AtSignIcon,
  CalendarDaysIcon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useSignupMutation } from "@/services";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
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
import * as Yup from "yup";
import { Form, Formik, useFormik } from "formik";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar } from "react-native-calendars";
import { Button as ButtonRN } from "react-native";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .required("Vui lòng nhập tên"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  birthdate: Yup.date()
    .max(new Date(), "Ngày sinh không hợp lệ")
    .required("Vui lòng chọn ngày sinh"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  birthdate: "",
  password: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  // Date

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    day: 1,
    month: 1,
    year: 2024,
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2024 - i);
  
  // Form
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);

      try {
        return;
        // const response = await signup({ email, password });
        // console.log(response);

        // if (response.error) {
        //   const message = response.error.data?.message || "Unknown error";
        //   alert(message);
        // } else {
        //   setIsInvalidEmail(false);
        //   setIsInvalidPassword(false);
        //   // router.push(`/(auth)/verify?email=${email}&role=${role}`);
        //   router.push(`/(customer)/(home)`);
        // }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    },
  });

  // Call Api
  const [signup, { isLoading }] = useSignupMutation();

  // Handle

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <TouchableWithoutFeedback
      className="flex h-full items-center justify-between"
      onPress={Keyboard.dismiss}
    >
      <Box className="flex items-center justify-start h-full bg-white gap-2 px-5">
        {/* header */}
        <Box className="p-5 mt-10 flex-start flex-row items-center w-full">
          <TouchableOpacity
            onPress={() => router.back()}
            // className="bg-white flex rounded-full w-16 h-16 items-center justify-center"
          >
            <AntDesign name="arrowleft" size={36} color="black" />
          </TouchableOpacity>
        </Box>
        {/* Title */}
        <Box className="p-5 flex flex-col flex-start w-full">
          <Text size="5xl" className="text-black w-full font-extrabold">
            Đăng ký
          </Text>

          <Text size="lg" className="text-gray-600 w-full font-normal">
            Tạo tài khoản để đăng nhập
          </Text>
        </Box>

        {/* Signup form */}
        <Box className="p-5 w-full rounded-xl flex gap-2 bg-white">
          {/* Input */}

          {/* Name */}
          <FormControl
            isInvalid={formik.errors.name ? true : false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" className="text-gray-600">
                Họ và tên
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={AtSignIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng nhập họ và tên`}
                  value={formik.values.name}
                  onChangeText={formik.handleChange("name")}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{formik.errors.name}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Email */}
          <FormControl
            isInvalid={formik.errors.email ? true : false}
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
              <Input size="lg" className="flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={MailIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng nhập email`}
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{formik.errors.email}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Birthdate */}
          <FormControl
            isInvalid={formik.errors.birthdate ? true : false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" className="text-gray-600">
                Ngày sinh
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={CalendarDaysIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng chọn ngày sinh`}
                  value={formik.values.birthdate}
                  onChangeText={formik.handleChange("birthdate")}
                />
              </Input>
            </TouchableWithoutFeedback>
            <FormControlHelper>
              <FormControlHelperText>YY-MM-DD</FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {formik.errors.birthdate}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Phone */}
          <FormControl
            isInvalid={formik.errors.phone ? true : false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" className="text-gray-600">
                Số điện thoại
              </FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input size="lg" className="flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={PhoneIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng nhập email`}
                  // value={email}
                  // onChangeText={(text) => setEmail(text)}
                  value={formik.values.phone}
                  onChangeText={formik.handleChange("phone")}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{formik.errors.phone}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Password */}
          <FormControl
            isInvalid={formik.errors.password ? true : false}
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
              <Input size="lg" className="flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={LockIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`Vui lòng nhập mật khẩu`}
                  // value={email}
                  // onChangeText={(text) => setEmail(text)}
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {formik.errors.password}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Button */}
          <Box className="flex flex-col justify-between">
            {/* Login */}
            <Pressable
              onPress={() => {
                formik.handleSubmit();
              }}
              className={`w-full h-12 bg-[#0973A8] rounded-lg flex justify-center items-center mt-2 ${
                isLoading ? "opacity-70" : "opacity-100"
              }`}
            >
              {isLoading && <ActivityIndicator color="#D1D5DB" />}
              {!isLoading && (
                <Text className="text-white font-bold text-lg">Đăng ký</Text>
              )}
            </Pressable>

            {/* You have account */}
            <Box className="flex flex-row items-center gap-2 mt-4 w-full justify-center">
              <Text size="md" className="text-center">
                Bạn đã có tài khoản ?
              </Text>
              <Pressable
                onPress={() => {
                  router.replace("/(auth)/log-in");
                }}
              >
                <Text size="lg" className="font-bold text-[#4D81E7]">
                  Đăng nhập
                </Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
