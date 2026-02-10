import { Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import api from "./services/apiService";
import tokenStorage from "./services/tokenStorage";
import { PaperProvider } from 'react-native-paper';
import paperTheme from '../theme/paperTheme';

// Écran de chargement pendant la vérification de l'authentification
const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <ActivityIndicator size="large" color="#2563EB" />
    <Text style={styles.splashText}>Chargement...</Text>
  </View>
);

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification au démarrage
    const checkAuth = async () => {
      try {
        const token = await tokenStorage.getAccessToken();
        if (!token) {
          setIsAuthenticated(false);
        } else {
          // Valider côté serveur pour éviter les faux positifs
          const result = await api.validateToken();
          setIsAuthenticated(result.valid);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Afficher le SplashScreen pendant le chargement
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <PaperProvider theme={paperTheme}>
      {/* Cette redirection est la clé - elle redirige automatiquement selon l'état d'authentification */}
      {!isLoading && (
        <>
          {isAuthenticated ? (
            <Redirect href="/" />
          ) : (
            <Redirect href="/login" />
          )}
        </>
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: paperTheme.colors.background },
        }}
      >
        {/* Définir toutes les routes ici, qu'elles soient accessibles ou non */}
        <Stack.Screen name="index" options={{ gestureEnabled: false }} />
        <Stack.Screen name="volontaire" />
        <Stack.Screen name="habitudes-cosmetiques" />
        <Stack.Screen name="pre-inscription" />
        <Stack.Screen name="login" options={{ gestureEnabled: false }} />
      </Stack>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  splashText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4B5563",
  },
});
