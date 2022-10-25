import React, { Component, useEffect, useState  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { Button, Icon } from "@rneui/themed";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        flex: 1
    }
});

const Navbar = (props) => {
    return (
        <View style={styles.container}>
            <Button type="solid" style={styles.buttonContainer}
                onPress={() => 
                    props.nav.navigate("Dashboard")
                }
            >
                <Icon name="home" color="white" />
            </Button>
            <Button type="solid" style={styles.buttonContainer}
                onPress={() => 
                    props.nav.navigate("Store")
                }
            >
                <Icon name="home" color="white" />
            </Button>
            <Button type="solid" style={styles.buttonContainer}
                onPress={() => 
                    props.nav.navigate("Settings")
                }
            >
                <Icon name="home" color="white" />
            </Button>
        </View>
    );
};
export default Navbar;