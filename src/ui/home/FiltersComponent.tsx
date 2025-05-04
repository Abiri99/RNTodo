import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {Text} from '@react-navigation/elements';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type FiltersProps<T> = {
  style?: StyleProp<ViewStyle>;
  enumMap: Record<string, T>;
  onFilterSelected: (filter: T) => void;
};

type FilterItemProps = {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

const FilterItem = ({title, onPress, style}: FilterItemProps) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

function FiltersComponent<T extends string | number>({
  style,
  enumMap,
  onFilterSelected,
}: FiltersProps<T>) {
  const backgroundPositionFromLeft = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const itemWidth = containerWidth / 3;

  const values = Object.values(enumMap) as T[];

  const backgroundStyle = useAnimatedStyle(() => ({
    left: withSpring(backgroundPositionFromLeft.value, {
      mass: 1,
      damping: 20,
      stiffness: 200,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    }),
  }));

  const handlePress = (value: T) => {
    const index = values.indexOf(value);
    backgroundPositionFromLeft.value = itemWidth * index;
    onFilterSelected(value);
  };

  const itemStyle: ViewStyle[] = [styles.item, {width: itemWidth}];

  return (
    <View
      style={[styles.container, style]}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.selectedItemBackground,
          backgroundStyle,
          {width: itemWidth, zIndex: -1},
        ]}
      />

      {values.map(value => (
        <FilterItem
          key={value.toString()}
          title={value.toString()}
          onPress={() => handlePress(value)}
          style={itemStyle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  selectedItemBackground: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FiltersComponent;
