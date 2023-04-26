import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import GoodJobAnimation from '../components/goodJobAnimation';
import KeepGoingAnimation from '../components/keepGoingAnimation';


const MyComponent = () => {
    const renderGoodJobAnimation = (visible) => {
        return <GoodJobAnimation visible={visible} />;
      };
    
      return (
        <View>
          {/* Render GoodJobAnimation with visible prop set to true */}
          {renderGoodJobAnimation(true)}
          {renderGoodJobAnimation(false)}
        </View>
      );
};


export default MyComponent;
