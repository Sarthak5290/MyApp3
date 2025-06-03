import {SpinnerSize, SpinnerTypes} from '../../../src/types/spinner';
import {useThemeColor} from '../../../src/utils';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {styles} from './spinner.styles';

interface SpinnerProps {
  size?: SpinnerSize;
  type?: SpinnerTypes;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = SpinnerSize.SMALL,
  type = SpinnerTypes.PRIMARY,
}) => {
  const typeToColorMap = new Map<SpinnerTypes, string>([
    [SpinnerTypes.PRIMARY, 'primary'],
    [SpinnerTypes.SECONDARY, 'secondary.50'],
    [SpinnerTypes.TERTIARY, 'tertiary'],
  ]);

  const color = useThemeColor(typeToColorMap.get(type) as string);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Spinner;
