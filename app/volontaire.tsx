import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { Appbar } from 'react-native-paper';

// Importez votre composant VolontaireForm
import VolontaireForm from "../components/VolontaireForm/VolontaireForm";

export default function VolontairePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = (volontaireId: string) => {
    // Naviguer vers les habitudes cosmétiques après création
    router.push(`/habitudes-cosmetiques?idVol=${volontaireId}`);
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

