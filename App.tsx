import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { styles } from "./styles";

import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types);
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert(
        "Login",
        "Nenhuma biometria encontrada. Cadastre no dispositivo"
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com biometria Mundo Azul",
      fallbackLabel: "Biometria não reconhecida",
    });
    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticated ? "SIM" : "NÃO"}</Text>
      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  );
}
