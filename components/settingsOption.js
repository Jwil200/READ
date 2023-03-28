import React, { Component,useState  } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Switch, Icon } from "@rneui/themed";

const SettingsOption = (props) => {
    const [checked, setChecked] = useState(false);

    const toggleSwitch = () => {
        setChecked(!checked);
    }

    const styles = props.styles;

    return (<TouchableOpacity 
        style={styles.rowContainer}
        onPress={() => console.log("Option pressed!")}
    >
        <Icon style={styles.icon} name={props.icon} type="font-awesome" />
        <Text style={styles.text}>{props.title}</Text>
        { (props.isSwitch) 
            ? <Switch 
                style={{marginLeft:'auto', marginRight: 5}} 
                value={checked}
                onValueChange={toggleSwitch}
            />
            : ""
        }
    </TouchableOpacity>);
}
export default SettingsOption;