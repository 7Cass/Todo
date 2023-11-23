import { Text, View } from "react-native";

import Rocket from "../../assets/rocket.svg";
import To from "../../assets/to.svg";
import Do from "../../assets/do.svg";
import { THEME } from "../../styles/theme";

export function Header() {
  return (
    <View style={{
      backgroundColor: THEME.COLORS.BASE.GRAY_700, 
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      paddingTop: 20,
      paddingBottom: 70
    }}>
      <Rocket />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <To />
        <Do />
      </View>
    </View>
  )  
}