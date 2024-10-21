import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticated ? "SIM" : "NÃO"}</Text>
    </View>
  );
}
