import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import modalActions from "@redux/modal/actions";
import { MODAL_COMPONENTS } from "@config/modal.types";

export default function ModalRoot() {
  const modalVisibility = useSelector((state) => state.modal.modalVisibility);
  const modalType = useSelector((state) => state.modal.modalType);
  const modalProps = useSelector((state) => state.modal.modalProps);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const SpecificModal = MODAL_COMPONENTS[modalType];

  if (!modalType) {
    return null;
  }
  return (
    <>
      <Modal
        {...modalProps}
        okText={modalProps.okText}
        getContainer={false}
        onCancel={() => handleCloseModal()}
        visible={modalVisibility}
        destroyOnClose={true}
        footer={null}
      >
        <SpecificModal {...modalProps} handleCancel={() => handleCloseModal()} />
      </Modal>
    </>
  );
}
