import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import api from "./services/apiService";
import logger from "./services/logger";
import { TextInput as PaperTextInput, Button, HelperText } from 'react-native-paper';

// Vérifier si c'est une tablette
const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function LoginScreen() {
  const router = useRouter();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const identifiantRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const handleLogin = async () => {
    // Validation simple
    if (!identifiant.trim()) {
      setError("Identifiant requis");
      identifiantRef.current?.focus();
      return;
    }

    if (!password.trim()) {
      setError("Mot de passe requis");
      passwordRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      setError("");

      logger.info("Tentative de connexion", identifiant);

      // Appel à l'API pour se connecter
      const response = await api.login(identifiant, password);
      
      logger.debug("Réponse du serveur", response.data);
      
      // Le stockage est désormais géré dans la méthode login de apiService
      // qui stocke le token à la fois dans les cookies et dans AsyncStorage
      
      // Redirection vers la page d'accueil
      router.replace("/");
      
    } catch (error) {
      logger.error("Erreur de connexion:", error);
      
      // Afficher un message d'erreur approprié
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        error.response
      ) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        const err = error as { response: { status: number; data: any } };
        if (err.response.status === 401) {
          setError("Identifiant ou mot de passe incorrect");
        } else {
          setError(`Erreur ${err.response.status} lors de la connexion. Veuillez réessayer.`);
        }
        // Log supplémentaire pour le débogage
        logger.debug("Détails de l'erreur:", err.response.data);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "request" in error &&
        error.request
      ) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion internet.");
        logger.debug("Aucune réponse reçue");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        // Une erreur s'est produite lors de la configuration de la requête
        setError("Une erreur est survenue. Veuillez réessayer.");
        logger.debug("Erreur de configuration:", (error as any).message);
    } else {
      setError("Une erreur inconnue est survenue.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            {/* Remplacer par votre logo */}
            <Image
              source={require("../assets/images/logo.png")} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Gestion des Volontaires</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Connexion</Text>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Identifiant</Text>
              <PaperTextInput
                mode="outlined"
                placeholder="Entrez votre identifiant"
                value={identifiant}
                onChangeText={setIdentifiant}
                autoCapitalize="none"
                autoCorrect={false}
                ref={identifiantRef}
                accessibilityLabel="Identifiant"
                testID="login-identifiant"
                error={!!error && !identifiant.trim()}
              />
              {!!error && !identifiant.trim() && (
                <HelperText type="error" visible={true}>
                  Identifiant requis
                </HelperText>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mot de passe</Text>
              <PaperTextInput
                mode="outlined"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordRef}
                accessibilityLabel="Mot de passe"
                testID="login-password"
                error={!!error && !password.trim()}
              />
              {!!error && !password.trim() && (
                <HelperText type="error" visible={true}>
                  Mot de passe requis
                </HelperText>
              )}
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => Alert.alert("Info", "Veuillez contacter votre administrateur pour réinitialiser votre mot de passe.")}
            >
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={loading || !identifiant.trim() || !password.trim()}
              accessibilityLabel="Se connecter"
              accessibilityState={{ disabled: loading || !identifiant.trim() || !password.trim() }}
              testID="login-submit"
              style={styles.loginButton}
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {new Date().getFullYear()} Cosmetest
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: isTablet ? 120 : 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: isTablet ? 150 : 100,
    height: isTablet ? 150 : 100,
  },
  appName: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 16,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: isTablet ? 14 : 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F4F6",
    height: isTablet ? 52 : 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    fontSize: isTablet ? 16 : 14,
    color: "#1F2937",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#2563EB",
    fontSize: isTablet ? 14 : 12,
  },
  loginButton: {
    backgroundColor: "#2563EB",
    height: isTablet ? 52 : 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#93C5FD",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: isTablet ? 16 : 14,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
    fontSize: isTablet ? 14 : 12,
  },
});
