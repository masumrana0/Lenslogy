"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  title,
  content,
  confirmText = "OK",
  onConfirm,
  showCancel = false,
}) => {
  const handleClose = () => {
    setShowModal(false);
    if (onConfirm) onConfirm();
  };

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel onClick={() => setShowModal(false)}>
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleClose}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
