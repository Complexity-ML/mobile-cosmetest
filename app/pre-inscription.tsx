import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Appbar, TextInput as PaperTextInput, Button, HelperText } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import api from "./services/apiService";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function PreInscriptionScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<any>(null);

  const handleSearch = async () => {
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Veuillez entrer votre adresse email");
      emailRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Format d'email invalide");
      emailRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.volontaires.searchByEmail(trimmed);
      const data = response.data;
      const id = data?.id ?? data?.idVol;

      if (id !== undefined && id !== null) {
        router.push(`/volontaire?id=${id}`);
      } else {
        setError("Aucun volontaire trouvé avec cet email");
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setError("Aucun volontaire pré-inscrit avec cet email. Vérifiez l'adresse ou contactez le secrétariat.");
      } else if (err?.request && !err?.response) {
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header mode="small" elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Volontaire pré-inscrit" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBadge}>
              <Icon name="user-check" size={48} color="#D97706" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Retrouver ma fiche</Text>
            <Text style={styles.subtitle}>
              Entrez l'adresse email communiquée au secrétariat pour retrouver votre fiche pré-remplie.
            </Text>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Adresse email</Text>
              <PaperTextInput
                mode="outlined"
                placeholder="exemple@email.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError("");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                ref={emailRef}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                left={<PaperTextInput.Icon icon="email-outline" />}
                error={!!error}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleSearch}
              disabled={loading || !email.trim()}
              loading={loading}
              icon={loading ? undefined : "magnify"}
              style={styles.searchButton}
            >
              {loading ? "Recherche..." : "Rechercher"}
            </Button>
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
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: isTablet ? 120 : 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: isTablet ? 15 : 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
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
    marginBottom: 24,
  },
  label: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  searchButton: {
    borderRadius: 8,
    height: isTablet ? 52 : 48,
    justifyContent: "center",
  },
});
