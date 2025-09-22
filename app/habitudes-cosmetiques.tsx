import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import api from "./services/apiService";

// Importez votre composant VolontaireHcForm
import VolontaireHcForm from "../components/VolontaireHc/VolontaireHcForm";

export default function HabitudesCosmetiquesPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const idVol = params.idVol as string | undefined;
  
  const [volontaireInfo, setVolontaireInfo] = useState<any>(null);
  const [loading, setLoading] = useState(!!idVol);
  const [error, setError] = useState<string | null>(null);

  // Charger les informations du volontaire si un ID est fourni
  useEffect(() => {
    const loadVolontaireInfo = async () => {
      if (!idVol) return;
      
      try {
        setLoading(true);
        const response = await api.volontaires.getById(idVol);
        setVolontaireInfo(response.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors du chargement des informations du volontaire:", error);
        setError("Impossible de charger les informations du volontaire");
        Alert.alert(
          "Erreur",
          "Impossible de charger les informations du volontaire"
        );
      } finally {
        setLoading(false);
      }
    };

    loadVolontaireInfo();
  }, [idVol]);

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="list" size={24} color="#7C3AED" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>
            Habitudes cosmétiques
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Icon name="x" size={22} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : !idVol ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={40} color="#9CA3AF" />
          <Text style={styles.errorText}>
            Veuillez sélectionner un volontaire pour saisir ses habitudes cosmétiques
          </Text>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => router.push('/volontaire')}
          >
            <Text style={styles.buttonText}>Créer un volontaire</Text>
          </TouchableOpacity>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={40} color="#9CA3AF" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => router.push('/volontaire')}
          >
            <Text style={styles.buttonText}>Retour à la liste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {volontaireInfo && (
            <View style={styles.volontaireInfoContainer}>
              <View style={styles.volontaireAvatarContainer}>
                <Icon name="user" size={22} color="#7C3AED" />
              </View>
              <View>
                <Text style={styles.volontaireName}>
                  {volontaireInfo.nom} {volontaireInfo.prenom}
                </Text>
                <Text style={styles.volontaireDetails}>
                  ID: {idVol} • {volontaireInfo.sexe}
                  {volontaireInfo.typePeauVisage && ` • ${volontaireInfo.typePeauVisage}`}
                </Text>
              </View>
            </View>
          )}

          <ScrollView contentContainerStyle={styles.formContainer}>
            <VolontaireHcForm
              idVol={idVol}
              onSubmitSuccess={handleSuccess}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4B5563",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  volontaireInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  volontaireAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  volontaireName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  volontaireDetails: {
    fontSize: 14,
    color: "#6B7280",
  },
  formContainer: {
    padding: 16,
    paddingBottom: 40,
  },
});