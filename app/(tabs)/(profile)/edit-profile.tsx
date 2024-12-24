import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
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
} from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import {
  useGetUserQuery,
  useSignupMutation,
  useUpdateUserMutation,
  useVerifyJwtForUserQuery,
} from '@/services';
import { Link, router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { formatDate, useDebounce, validateEmail } from '@/utils/helper';
import { Text } from '@/components/ui/text';
import * as Yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { useDispatch } from 'react-redux';
import { authenticateUser, selectUser, setUser } from '@/store/reducers';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import { VStack } from '@/components/ui/vstack';

const InforSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .required('Vui lòng nhập tên'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .required('Vui lòng nhập số điện thoại'),
  birthdate: Yup.date()
    .max(new Date(), 'Ngày sinh không hợp lệ')
    .required('Vui lòng chọn ngày sinh'),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
});
function extractDate(timestamp: any) {
  return timestamp.split('T')[0] as any as Date;
}

const EditProfile = () => {
  // dispatch
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [userForEdit] = useState({
    name: currentUser?.name,
    birthdate: currentUser?.birthdate,
    gender: currentUser?.gender,
    phone: currentUser?.phone,
    ...currentUser,
  });
  // Call api
  const [update, { isLoading }] = useUpdateUserMutation();

  // Date

  const [date, setDate] = useState(
    new Date(extractDate(currentUser?.birthdate)),
  );
  const [showPicker, setShowPicker] = useState(false);
  // Form
  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: InforSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Form submitted with values:', values);

      try {
        const response = await update({
          ...values,
        });
        // console.log(response);
        if (response.error) {
          const message =
            response.error.data.message ||
            response.error.message ||
            'Unknown error';
        } else {
          //   Update user
          dispatch(setUser(values as any));
          router.replace(`/(tabs)/(profile)/profile`);
        }
      } catch (error) {
        console.error(error);
        router.replace(`/+not-found`);
      } finally {
        // setLoading(false);
      }
    },
  });

  // Handle

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: Date | undefined) => {
    if (type == 'set' && selectedDate) {
      const currentDate = selectedDate;
      console.log('currentDate', currentDate);
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker();
      }
      formik.setFieldValue('birthdate', formatDate(currentDate));
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    formik.setFieldValue('birthdate', formatDate(date));
    toggleDatepicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <Text size="4xl" className="text-black w-full font-extrabold">
                Thay đổi thông tin
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
                    <InputIcon as={AtSignIcon} size={'lg'} />
                  </InputSlot>
                  <InputField
                    className="leading-none px-4 py-2 h-full"
                    type="text"
                    placeholder={`Vui lòng nhập họ và tên`}
                    value={formik.values.name}
                    onChangeText={formik.handleChange('name')}
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
                          <InputIcon as={CalendarDaysIcon} size={'md'} />
                        </InputSlot>

                        <InputField
                          className="leading-none px-4 py-2 h-full"
                          type="text"
                          placeholder={`Vui lòng chọn ngày sinh`}
                          value={date ? formatDate(date) : ''}
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
                  {showPicker && Platform.OS === 'ios' && (
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
                    {/* {formik.errors.birthdate} */}
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
                    <InputIcon as={PhoneIcon} size={'md'} />
                  </InputSlot>
                  <InputField
                    className="leading-none px-4 py-2 h-full"
                    type="text"
                    placeholder={`Vui lòng nhập số điện thoại`}
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    value={formik.values.phone}
                    onChangeText={formik.handleChange('phone')}
                  />
                </Input>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.phone}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Gender */}
              <FormControl
                isInvalid={formik.errors.gender ? true : false}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={false}
              >
                <FormControlLabel>
                  <FormControlLabelText size="lg" className="text-gray-600">
                    Giới tính
                  </FormControlLabelText>
                </FormControlLabel>
                <RadioGroup
                  className="my-2"
                  value={formik.values.gender}
                  onChange={formik.handleChange('gender')}
                >
                  <VStack space="sm">
                    <Radio size="lg" value="Nam">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Nam</RadioLabel>
                    </Radio>
                    <Radio size="lg" value="Nữ">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Nữ</RadioLabel>
                    </Radio>
                  </VStack>
                </RadioGroup>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.email}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              {/* Button */}
              <Box className="flex flex-col justify-between mt-4">
                {/* Login */}
                <Button
                  onPress={() => {
                    formik.handleSubmit();
                  }}
                  action="positive"
                >
                  <ButtonText className="text-white font-bold text-lg">
                    Lưu
                  </ButtonText>
                  {isLoading && <ButtonSpinner color="#D1D5DB" />}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="bg-white h-full">{/* <Text>abc1</Text> */}</Box>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
