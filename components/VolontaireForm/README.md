# VolontaireForm - Structure refactorisée

## 📁 Structure des dossiers

```
VolontaireForm/
├── sections/           # Sections du formulaire
│   ├── InfosPersonnellesSection.tsx
│   ├── CaracteristiquesSection.tsx
│   ├── PeauSection.tsx
│   ├── MarquesCutaneesSection.tsx
│   ├── CheveuxSection.tsx
│   ├── CilsSection.tsx
│   ├── ProblemesSection.tsx
│   ├── MedicalSection.tsx
│   ├── MesuresSection.tsx
│   ├── NotesSection.tsx
│   └── index.ts
├── hooks/              # Hooks personnalisés
│   ├── useFormData.ts
│   ├── useFormTabs.ts
│   └── index.ts
├── types/              # Types TypeScript
│   └── index.ts
├── VolontaireForm.tsx  # Composant principal
└── index.ts           # Exports principaux
```

## 🧩 Composants

### Sections
Chaque section du formulaire est maintenant un composant séparé :

- **InfosPersonnellesSection** : Informations de base et adresse
- **CaracteristiquesSection** : Caractéristiques physiques
- **PeauSection** : Caractéristiques de la peau, exposition solaire, cellulite, etc.
- **MarquesCutaneesSection** : Cicatrices, tatouages, taches pigmentaires, vergetures
- **CheveuxSection** : Caractéristiques des cheveux et des ongles
- **CilsSection** : Caractéristiques des cils, sourcils et lèvres
- **ProblemesSection** : Problèmes dermatologiques
- **MedicalSection** : Informations médicales et allergies
- **MesuresSection** : Mesures et scores d'évaluation
- **NotesSection** : Notes et commentaires

### Props communes
Toutes les sections reçoivent les mêmes props via `SectionProps` :
```typescript
interface SectionProps {
    formData: FormData;
    errors: FormErrors;
    handleChange: (name: string, value: string) => void;
    handleBlur: (fieldName: string) => void;
}
```

## 🪝 Hooks

### useFormData
Gère l'état du formulaire et la validation :
```typescript
const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    setError,
    clearErrors
} = useFormData();
```

### useFormTabs
Gère la navigation entre les onglets :
```typescript
const { activeTab, setActiveTab, tabs } = useFormTabs();
```

## 🎨 Design System

- **100% react-native-paper** : Aucun CSS personnalisé
- **Material Design** : Interface cohérente
- **Composants utilisés** :
  - `Text` avec variants
  - `Button` avec modes
  - `Appbar` pour la navigation
  - `Banner` pour les messages
  - `Snackbar` pour les notifications
  - `ActivityIndicator` pour le chargement
  - `List.Accordion` pour les sections (si utilisé)

## 📝 Utilisation

```typescript
import { VolontaireForm } from '@/components/VolontaireForm';

// Utilisation basique
<VolontaireForm />

// Utilisation avec callbacks
<VolontaireForm
    isEmbedded={true}
    onSubmitSuccess={(id) => console.log('Créé:', id)}
/>
```

## 🔧 Maintenance

### Ajouter une nouvelle section
1. Créer le composant dans `sections/`
2. Suivre la structure des sections existantes
3. Ajouter l'export dans `sections/index.ts`
4. Ajouter le case dans `renderTabContent()` de `VolontaireForm.tsx`
5. Ajouter l'onglet dans `useFormTabs.ts`

### Ajouter un nouveau champ
1. Ajouter le champ dans la section appropriée
2. Utiliser `FormField` ou `CheckboxField`
3. Aucun style personnalisé nécessaire

## ✅ Avantages de cette structure

- **Maintenabilité** : Code organisé et modulaire
- **Réutilisabilité** : Sections peuvent être utilisées ailleurs
- **Performance** : Composants plus petits et focalisés
- **Types** : TypeScript strict pour la sécurité
- **Tests** : Plus facile de tester chaque section individuellement
- **Design** : Interface cohérente avec react-native-paper