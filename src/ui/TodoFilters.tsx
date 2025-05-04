import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@react-navigation/elements';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type TodoFiltersProps = {
  style?: StyleProp<ViewStyle>;
  onAllSelected: () => void;
  onCompletedSelected: () => void;
  onIncompletedSelected: () => void;
};

type TodoFiltersItemProps = {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

const TodoFiltersItem = ({ title, onPress, style }: TodoFiltersItemProps) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const TodoFilters: React.FC<TodoFiltersProps> = ({
  style,
  onAllSelected,
  onCompletedSelected,
  onIncompletedSelected,
}) => {
  const backgroundPositionFromLeft = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const itemWidth = containerWidth / 3;

  const backgroundStyle = useAnimatedStyle(() => ({
    left: withSpring(backgroundPositionFromLeft.value, {
      mass: 1,
      damping: 12,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    }),
  }));

  const handlePress = (index: number, callback: () => void) => {
    backgroundPositionFromLeft.value = itemWidth * index;
    callback();
  };

  const itemStyle: ViewStyle[] = [styles.item, { width: itemWidth }];

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.selectedItemBackground,
          backgroundStyle,
          { width: itemWidth, zIndex: -1 },
        ]}
      />

      <TodoFiltersItem
        title="All"
        onPress={() => handlePress(0, onAllSelected)}
        style={itemStyle}
      />
      <TodoFiltersItem
        title="Completed"
        onPress={() => handlePress(1, onCompletedSelected)}
        style={itemStyle}
      />
      <TodoFiltersItem
        title="Incompleted"
        onPress={() => handlePress(2, onIncompletedSelected)}
        style={itemStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  selectedItemBackground: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoFilters;