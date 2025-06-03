import React, {useRef, useEffect, useMemo} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {useTheme, Box, Text} from 'native-base';

// Temporarily comment out problematic imports to debug
// import BrandLogo from '../../../assets/img/logo.svg';
// import Spinner from '../spinner/spinner';
// import {SpinnerSize, SpinnerTypes} from '../../../src/types/spinner';

type Props = {
  height?: number | string;
  width?: number | string;
};

const Brand: React.FC<Props> = ({height = '100%', width = '100%'}) => {
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');

  const LOGO_SIZE = 150;
  const ANIM_DURATION_IN_MS = 500;
  const FADE_DURATION_IN_MS = 300;
  const PAUSE_DURATION_IN_MS = 1000;

  const translateY = useRef(new Animated.Value(-LOGO_SIZE)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme();

  // Extract color value to avoid complex expression in dependency array
  const secondaryColor = colors.secondary?.[50] || '#000000';

  useEffect(() => {
    /**
     * Animates the company logo and brand text in a simple intro sequence:
     * 1. The logo slides down from above the viewport to the vertical center over ANIM_DURATION_IN_MS = 500 ms.
     * 2. A PAUSE_DURATION_IN_MS = 1000 ms pause occurs with the logo fully visible.
     * 3. The logo fades out while the brand text ("Better.") fades in over FADE_DURATION_IN_MS = 300 ms.
     */
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT / 2 - LOGO_SIZE / 2,
        duration: ANIM_DURATION_IN_MS,
        useNativeDriver: true,
      }),
      Animated.delay(PAUSE_DURATION_IN_MS),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [translateY, logoOpacity, textOpacity, SCREEN_HEIGHT]);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        logoAnim: {
          transform: [{translateY}],
          opacity: logoOpacity,
        },
        textColor: {
          color: secondaryColor,
        },
      }),
    [translateY, logoOpacity, secondaryColor],
  );

  return (
    <Box
      testID="brand-img-wrapper"
      backgroundColor={colors.primary?.[500] || '#007bff'}
      height={height}
      width={width}
      position="relative">
      {/* Temporarily replace BrandLogo with a placeholder */}
      <Animated.View style={[styles.logoContainer, dynamicStyles.logoAnim]}>
        <Box
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          backgroundColor="white"
          borderRadius={LOGO_SIZE / 2}
          justifyContent="center"
          alignItems="center">
          <Text fontSize="24" color="black">
            LOGO
          </Text>
        </Box>
      </Animated.View>

      <Animated.View style={[styles.centerContainer, {opacity: textOpacity}]}>
        <Text style={[styles.centerText, dynamicStyles.textColor]}>
          Better.
        </Text>
      </Animated.View>

      {/* Temporarily replace Spinner with a placeholder */}
      <Animated.View style={styles.spinnerWrapper}>
        <Box
          width="40"
          height="40"
          backgroundColor="white"
          borderRadius="20"
          justifyContent="center"
          alignItems="center">
          <Text>⟳</Text>
        </Box>
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 48,
    textAlign: 'center',
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
});

export default Brand;
