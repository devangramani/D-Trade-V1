import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Main_color} from '../Theme/Color';
function CustomTop({state, descriptors, navigation, theme}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.key} style={styles.container}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 28,
                backgroundColor: isFocused ? Main_color : '#ffffff',
                borderRadius: 7,
                paddingLeft: 20,
                paddingRight: 20,
                borderWidth: isFocused ? 0 : 2,
                borderColor: Main_color,
              }}>
              <Text
                style={{
                  color: isFocused ? '#ffffff' : theme,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const MapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(MapStateToProps)(CustomTop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 55,
  },
});
