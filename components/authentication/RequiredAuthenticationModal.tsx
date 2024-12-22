import React from "react";
import { Center } from "../ui/center";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { router } from "expo-router";

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const RequiredAuthenticationModal = ({ showModal, setShowModal }: Props) => {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          router.push("/(tabs)/(home)");
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-error-600">
              Lỗi
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              Bạn cần phải đăng nhập để sử dụng dịch vụ
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                router.push("/(tabs)/(home)");
                setShowModal(false);
              }}
            >
              <ButtonText>Hủy bỏ</ButtonText>
            </Button>
            <Button
              onPress={() => {
                router.push("/(auth)/log-in");
                setShowModal(false);
              }}
            >
              <ButtonText>Đăng nhập</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default RequiredAuthenticationModal;
