# Audit de compatibilité et sécurité — tablette Cosmetest

Date : 2026-07-14

## Périmètre

Application Expo/React Native utilisée sur le réseau local Cosmetest, comparée au backend `cosmetest-back` actuel.

## Compatibilité corrigée

- Les routes d'authentification, volontaires, détails et habitudes cosmétiques correspondent au backend actuel.
- Les mutations utilisent l'ID technique du volontaire.
- Après création du volontaire principal, les détails sont maintenant ajoutés avec `PUT /api/volontaires/details/{id}`. L'ancien enchaînement vers `POST /details` créait un deuxième volontaire.
- La sauvegarde des habitudes ne fait plus de `DELETE` avant le `POST` d'upsert : une panne réseau ne supprime donc plus les habitudes existantes.
- Les quatre champs de cellulite affichés sont maintenant transmis.
- Une erreur de sauvegarde des détails ou habitudes n'est plus masquée par un faux succès global.
- Les identifiants venant des paramètres de route sont limités aux entiers strictement positifs.

## Authentification et conservation du formulaire

- La session est vérifiée avant le chargement métier du formulaire. Un token déjà invalide redirige vers la connexion avant que la saisie commence.
- Pendant un formulaire commencé, un `401` ne déclenche plus une navigation automatique qui détruirait la saisie.
- Une boîte de reconnexion s'ouvre dans le formulaire. La reconnexion renouvelle le token sans démonter le composant ni perdre les champs.
- Après reconnexion, l'utilisateur relance explicitement l'enregistrement. Il n'y a pas de retry automatique pouvant créer un doublon après une réponse réseau incertaine.
- La déconnexion locale efface toujours le token, même si l'appel de déconnexion serveur échoue.

## Sécurité corrigée

- `expo-secure-store` est installé et utilisé sur Android/iOS avec `WHEN_UNLOCKED_THIS_DEVICE_ONLY`.
- Sur une plateforme native, l'application échoue de manière sûre si SecureStore est indisponible au lieu de stocker silencieusement le Bearer token dans AsyncStorage.
- Les réponses de login, identifiants, objets Axios et corps d'erreur sensibles ne sont plus journalisés.
- Les messages serveur arbitraires ne sont plus affichés directement à l'utilisateur.
- Une URL API HTTP est acceptée uniquement pour une adresse privée, localhost ou un nom local ; HTTPS reste accepté.
- Les dépendances directes inutilisées ont été retirées. L'audit npm est passé de 55 vulnérabilités de production, dont 5 critiques, à 25, sans vulnérabilité critique.
- La configuration Expo invalide a été retirée et les icônes ont été rendues carrées.

## Risques restant à traiter

### HTTP sur le LAN

L'API reste en HTTP parce que le déploiement actuel est local. Le mot de passe, le JWT et les données médicales peuvent néanmoins être interceptés par une machine compromise présente sur le LAN. La cible recommandée est HTTPS avec certificat interne installé sur les tablettes, puis désactivation de `usesCleartextTraffic`.

Mesures transitoires : VLAN dédié aux tablettes, Wi-Fi protégé, pare-feu limitant l'API aux sous-réseaux/appareils autorisés et absence d'exposition du port 8888 hors LAN.

### SDK Expo

Les vulnérabilités hautes restantes sont transitives dans Expo 52 et son outillage. `npm audit` propose une montée majeure vers Expo 57. Elle ne doit pas être appliquée avec `--force` sans lot dédié de migration React Native et test APK sur tablette.

### Autorisation serveur

La validation de l'ID dans le mobile évite les paramètres malformés, mais ne remplace pas l'autorisation objet côté backend. Le backend doit continuer à valider rôle et droits sur chaque fiche.

### Champ `pays`

Le champ est visible dans le formulaire mais n'a pas de colonne correspondante dans le DTO backend actuel. Il n'est donc pas persisté. Une évolution backend séparée est nécessaire pour le conserver.

## Vérifications

- TypeScript : `npx tsc --noEmit`
- ESLint : `npm run lint`
- Tests URL réseau : `npx jest app/services/__tests__/apiConfig.test.ts --runInBand`
- Cohérence Expo : `npx expo-doctor`
- Audit dépendances : `npm audit --omit=dev`
