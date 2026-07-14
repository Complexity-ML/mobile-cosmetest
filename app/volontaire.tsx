import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { Appbar } from 'react-native-paper';

// Importez votre composant VolontaireForm
import VolontaireForm from "../components/VolontaireForm/VolontaireForm";

export default function VolontairePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = typeof rawId === 'string' && /^\d+$/.test(rawId) && Number(rawId) > 0
    ? rawId
    : undefined;

  // Pas d'id = pas de volontaire pré-inscrit → rediriger
  React.useEffect(() => {
    if (!id) {
      router.replace("/pre-inscription" as any);
    }
  }, [id, router]);

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = (_volontaireId: string) => {
    // Questionnaire terminé : retour à l'accueil
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header mode="small" elevated>
        <Appbar.BackAction onPress={handleClose} />
        <Appbar.Content title={id ? "Modifier le volontaire" : "Ajouter un volontaire"} />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <VolontaireForm onSubmitSuccess={handleSuccess} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  formContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
  },
});

