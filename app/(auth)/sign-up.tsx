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
import { useSignupMutation, useVerifyJwtForUserQuery } from "@/services";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { formatDate, useDebounce, validateEmail } from "@/utils/helper";
import { Text } from "@/components/ui/text";
import * as Yup from "yup";
import { Form, Formik, useFormik } from "formik";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import { authenticateUser, setUser } from "@/store/reducers";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { ScrollView } from "react-native";
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
  birthdate: formatDate(new Date()),
  password: "",
  gender: "Nam",
};

const SignUp = () => {
  // dispatch
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);

  // Toast
  const showNewToast = (type: string, error: string, message: string) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId + "",
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            nativeID={uniqueToastId}
            action={`${type}` as any}
            variant="outline"
          >
            <ToastTitle>{error}</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  // Call api
  // const [verify] = useVerifyJwtForUserMutation();

  // Date

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Form
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);

      try {
        const response = await signup({
          email: values.email,
          gender: values.gender,
          birthdate: values.birthdate as any as Date,
          name: values.name,
          password: values.password,
          phone: values.phone,
        });
        console.log(response);
        if (response.error) {
          const message =
            response.error.data.message ||
            response.error.message ||
            "Unknown error";
          showNewToast("error", "Lỗi", message);
        } else {
          if (response.data) {
            const token = response.data.token;
            await SecureStore.setItemAsync(LOCAL_STORAGE_JWT_KEY, token);

            // return
            dispatch(authenticateUser(true));
          }
          router.replace(`/(tabs)/(home)`);
        }
      } catch (error) {
        console.error(error);
        router.replace(`/+not-found`);
      } finally {
        // setLoading(false);
      }
    },
  });

  // Call Api
  const [signup, { isLoading }] = useSignupMutation();

  // Handle

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: Date | undefined) => {
    if (type == "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
      }
      formik.setFieldValue("birthdate", formatDate(currentDate));
    } else {
      toggleDatepicker();
    }
  };

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const confirmIOSDate = () => {
    formik.setFieldValue("birthdate", formatDate(date));
    toggleDatepicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 w-full" // Ensure the container takes full screen
    >
      <TouchableWithoutFeedback
        className="flex h-full items-center justify-between"
        onPress={Keyboard.dismiss}
      >
        <ScrollView className="flex flex-grow h-full w-full">
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
                    // onBlur={formik.handleBlur("name")} // Correct Formik method for onBlur
                  />
                </Input>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.name}
                  </FormControlErrorText>
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

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.email}
                  </FormControlErrorText>
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
                <View className="w-full">
                  {!showPicker && (
                    <Pressable onPress={() => toggleDatepicker()}>
                      <Input
                        size="lg"
                        className="flex items-center h-12 justify-center"
                      >
                        <InputSlot className="pl-3 flex items-center">
                          <InputIcon as={CalendarDaysIcon} size={"md"} />
                        </InputSlot>

                        <InputField
                          className="leading-none px-4 py-2 h-full"
                          type="text"
                          placeholder={`Vui lòng chọn ngày sinh`}
                          value={date ? formatDate(date) : ""}
                          // onChangeText={formik.handleChange("birthdate")}
                          onPressIn={toggleDatepicker}
                          editable={false}
                        />
                      </Input>
                    </Pressable>
                  )}
                  {showPicker && (
                    <DateTimePicker
                      style={[
                        {
                          height: 120,
                          marginTop: -10,
                        },
                      ]}
                      mode="date"
                      display="spinner"
                      value={date}
                      onChange={onChange}
                    />
                  )}
                  {showPicker && Platform.OS === "ios" && (
                    <View className="flex flex-row justify-center items-center w-full gap-3">
                      <TouchableOpacity
                        className="w-1/2 h-12 bg-error-400 rounded-lg flex justify-center items-center mt-2"
                        onPress={toggleDatepicker}
                      >
                        <Text className="text-white font-bold text-lg">
                          Hủy bỏ
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-1/2 h-12 bg-success-400 rounded-lg flex justify-center items-center mt-2"
                        onPress={confirmIOSDate}
                      >
                        <Text className="text-white font-bold text-lg">
                          Xác nhận
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <FormControlHelper>
                  {/* <FormControlHelperText>YY-MM-DD</FormControlHelperText> */}
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
                <Input size="lg" className="flex items-center h-12">
                  <InputSlot className="pl-3 flex items-center">
                    <InputIcon as={PhoneIcon} size={"md"} />
                  </InputSlot>
                  <InputField
                    className="leading-none px-4 py-2 h-full"
                    type="text"
                    placeholder={`Vui lòng nhập số điện thoại`}
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    value={formik.values.phone}
                    onChangeText={formik.handleChange("phone")}
                  />
                </Input>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.phone}
                  </FormControlErrorText>
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
                <Input size="lg" className="flex items-center h-12">
                  <InputSlot className="pl-3 flex items-center">
                    <InputIcon as={LockIcon} size={"lg"} />
                  </InputSlot>
                  <InputField
                    className="leading-none px-4 py-2 h-full"
                    type={showPassword ? "text" : "password"}
                    placeholder={`Vui lòng nhập mật khẩu`}
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                  />
                  <InputSlot
                    className="pr-3 flex items-center"
                    onPress={handleState}
                  >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>

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
                    <Text className="text-white font-bold text-lg">
                      Đăng ký
                    </Text>
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
          <Box className="bg-white h-full">{/* <Text>abc1</Text> */}</Box>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
