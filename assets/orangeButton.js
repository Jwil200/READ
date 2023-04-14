import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles'

const OrangeButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["orange","#e65c00"]}
        style={styles.appButtonContainer2}
      >  
        <Text style={styles.appButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
export default OrangeButton;
