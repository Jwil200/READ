import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Switch, Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import DarkModeContext from './DarkModeContext';
import { useEffect } from 'react';

const SettingsOption = (props) => {
  const [checked, setChecked] = useState(props.isDarkModeEnabled);
  const { title, icon, isSwitch, navigation, screenName } = props;
  const { isDarkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);
  
  useEffect(() => {
    if (props.title === 'Dark Mode') {
      setChecked(isDarkModeEnabled);
    }
  }, [isDarkModeEnabled]);

  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      console.log(`${title} option pressed!`);
    }
  };

  const toggleSwitch = () => {
    if (props.title === "Dark Mode") {
      toggleDarkMode(); // Use the toggleDarkMode function from the context
    }
    setChecked(!checked);
  };

  const styles = props.styles;

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => {
        console.log('Option pressed!');
        handlePress();
      }}
    >
      <Icon style={styles.icon} name={props.icon} type="font-awesome" />
      <Text style={styles.text}>{props.title}</Text>
      {props.isSwitch ? (
        <Switch
          style={{ marginLeft: 'auto', marginRight: 5 }}
          value={checked}
          onValueChange={toggleSwitch}
        />
      ) : (
        ''
      )}
    </TouchableOpacity>
  );
};

export default SettingsOption;
