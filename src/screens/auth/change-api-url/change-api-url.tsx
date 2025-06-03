import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';

// Temporarily comment out problematic imports to debug
// import GearIcon from '../../../../assets/icons/gear.svg';
// import { Button } from '../../../../src/components';
// import { ButtonKind } from '../../../../src/types/button';
import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';
  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  return (
    isNonProdEnv && (
      <>
        <View style={styles.buttonContainer}>
          {/* Replace Button with TouchableOpacity temporarily */}
          <TouchableOpacity
            onPress={() => setIsChangeAPIUrlModalOpen(true)}
            style={styles.debugButton}>
            {/* Replace GearIcon with placeholder */}
            <Text style={styles.debugIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
        <ChangeApiUrlModal
          handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
          isModalOpen={isChangeAPIUrlModalOpen}
        />
      </>
    )
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: -28,
    right: -28,
    zIndex: 1000,
  },
  debugButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  debugIcon: {
    fontSize: 24,
  },
});

export default ChangeApiUrlButton;
