import React, { useState } from "react";
import { Center } from "@/components/ui/center";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  AtSignIcon,
  CloseIcon,
  Icon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

interface Props {
  showEditModal: boolean;
  setShowEditModal: (showEditModal: boolean) => void;
}
import * as Yup from "yup";
import { formatDate } from "@/utils/helper";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/store/reducers";
import { useFormik } from "formik";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Alert, KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageModel } from "@/types/postTypes";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUploadAvatarMutation } from "@/services";
import { useDispatch } from "react-redux";

const EditProfileModal = ({ showEditModal, setShowEditModal }: Props) => {
  const currentUser = useSelector(selectUser);

  const [image, setImage] = useState<any>(currentUser?.picture!);
  const dispatch = useDispatch();
  // Call api
  const [uploadAvatar] = useUploadAvatarMutation();
  const handleImagePick = async () => {
    // Kiểm tra quyền truy cập thư viện ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Thông báo", "Bạn cần cấp quyền để sử dụng chức năng này!");
      return;
    }

    // Chọn ảnh từ thư viện
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Chọn 1 ảnh/lần (nhiều lần để thêm)
      quality: 0.8, // Chất lượng ảnh
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name:
          result.assets[0].fileName || result.assets[0].uri.split("/").pop(),
      });
    }
  };

  const updateAvatar = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: image.uri,
      type: image.type,
      name: image.name,
    } as any);
    console.log("avatar", image);
    const res = await uploadAvatar({
      file: formData,
      id: currentUser?.id!,
    });
    // Error ???
    console.log("res", res);
    dispatch(
      setUser({
        ...currentUser,
        picture: res.error.data,
      } as any)
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Center className="h-[200px]">
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" className="text-typography-950">
                Thay đổi ảnh đại diện
              </Heading>
              <ModalCloseButton></ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalBody>
                {/* Avatar Preview */}
                <Box className="relative flex flex-row justify-around items-center ">
                  {image ? (
                    <Image
                      size="md"
                      source={{
                        uri: image?.type
                          ? `${image.uri}`
                          : `https://accomodation-seeking-backend.onrender.com/pictures/${currentUser?.picture}`,
                      }}
                      alt={`${currentUser?.name}`}
                      className="rounded-full shadow-lg"
                    />
                  ) : (
                    <Box className="w-16 h-16 rounded-full bg-black flex items-center justify-center border border-gray-300">
                      <Text className="text-white text-lg font-bold">
                        {currentUser?.name[0]?.toUpperCase()}
                      </Text>
                    </Box>
                  )}
                  <Pressable onPress={handleImagePick} className="w-1/2 h-8">
                    {({ pressed }) => (
                      <Box
                        className={`h-full border-2 border-secondary-400 rounded-full flex flex-row justify-center items-center ${
                          pressed && "opacity-50"
                        }`}
                      >
                        <Ionicons name="add" size={24} />
                        <Text>Chọn ảnh</Text>
                      </Box>
                    )}
                  </Pressable>
                </Box>
              </ModalBody>
            </ModalBody>
            <ModalFooter className="flex flex-row justify-center">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowEditModal(false);
                }}
              >
                <ButtonText>Hủy bỏ</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  updateAvatar();
                  setShowEditModal(false);
                }}
              >
                <ButtonText>Lưu</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default EditProfileModal;
