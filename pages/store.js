import { View } from 'react-native';
import Navbar from "../components/navbar";

const Store = ({ navigation }) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.9}}>
            </View>
            <View style={{flex: 0.1}}>
                <Navbar nav={navigation}></Navbar>
            </View>
        </View>
    );
};

export default Store;