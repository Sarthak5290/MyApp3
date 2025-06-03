import { Nullable } from '../../../src/types';
import { ButtonKind } from '../../../src/types/button';
import React from 'react';
import { View } from 'react-native';

import Button from '../button/button';

import { useModalStyles } from './modal.styles';

interface ModalFooterProps {
  onCancel?: Nullable<() => void>;
  onConfirm?: Nullable<() => void>;
  cancelText?: string;
  confirmText?: string;
  isConfirmDisabled?: boolean;
  children?: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  isConfirmDisabled = false,
  children,
}) => {
  const styles = useModalStyles();

  return (
    <View style={[styles.footerContainer]}>
      {onCancel && (
        <View style={styles.button}>
          <Button kind={ButtonKind.SECONDARY} onClick={onCancel}>
            {cancelText}
          </Button>
        </View>
      )}
      {onConfirm && (
        <View style={styles.button}>
          <Button onClick={onConfirm} kind={ButtonKind.PRIMARY} disabled={isConfirmDisabled}>
            {confirmText}
          </Button>
        </View>
      )}
      {children}
    </View>
  );
};



export default ModalFooter;
