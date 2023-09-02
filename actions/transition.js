import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const transition = (start, end, duration, trigger) => {
  const animatedValue = useRef(new Animated.Value(typeof start === 'number' ? start : 0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.timing(animatedValue, {
        toValue: typeof end === 'number' ? end : 1,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: typeof start === 'number' ? start : 0,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }
  }, [trigger]);

  return typeof start === 'number' ? animatedValue : animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [start, end],
  });
};

export default transition;
