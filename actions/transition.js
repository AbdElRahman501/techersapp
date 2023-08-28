import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const transition = (start, end, duration, trigger) => {
  const animatedValue = useRef(new Animated.Value(start)).current;

  useEffect(() => {
    if (trigger) {
      Animated.timing(animatedValue, {
        toValue: end,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: start,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }
  }, [trigger]);

  return animatedValue
};

export default transition;
