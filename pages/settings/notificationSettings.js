import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import DarkModeContext from '../../components/DarkModeContext';


const NotificationSettings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return () => {unsubscribe};
}, [navigation]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkModeEnabled ? '#303030' : '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: isDarkModeEnabled ? '#444' : '#ccc',
  },
  label: {
    fontSize: 16,
    color: isDarkModeEnabled ? 'white' : 'black',
  },
});
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Push Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>SMS Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};


export default NotificationSettings;