import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, View, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Button, Snackbar, ActivityIndicator } from 'react-native-paper';
import api from '../../app/services/apiService';
import FormTabs from './FormTabs';
import { useFormData } from './hooks/useFormData';
import { useFormTabs } from './hooks/useFormTabs';
import { TabId, VolontaireFormRouteParams, VolontaireFormProps } from './types';
import {
    InfosPersonnellesSection,
    CaracteristiquesSection,
    PeauSection,
    MarquesCutaneesSection,
    CheveuxSection,
    CilsSection,
    ProblemesSection,
    MedicalSection,
    MesuresSection,
    NotesSection,
} from './sections';

type NavProps = {
    VolontaireDetails: { id: string };
};

const VolontaireForm: React.FC<VolontaireFormProps> = ({
    isEmbedded = false,
    onSubmitSuccess
}) => {
    const route = useRoute<RouteProp<{ params: VolontaireFormRouteParams }, 'params'>>();
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<ScrollView>(null);
    const { width, height } = Dimensions.get('window');
    const [isLandscape, setIsLandscape] = useState(width > height);

    const { id } = route.params || {};
    const isEditMode = Boolean(id);

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [focusFieldId, setFocusFieldId] = useState<string | undefined>(undefined);
    const [focusRequestId, setFocusRequestId] = useState<number>(0);

    const { formData, setFormData, errors, setErrors, handleChange, handleBlur, clearErrors } = useFormData();
    const { activeTab, setActiveTab, tabs } = useFormTabs();

    // Orientation listener
    useEffect(() => {
        const onChange = ({ window }: { window: { width: number; height: number } }) => {
            setIsLandscape(window.width > window.height);
            // Reset focus to avoid unintended dialog reopen on orientation change
            setFocusFieldId(undefined);
        };
        const subscription = Dimensions.addEventListener('change', onChange);
        return () => {
            // RN >= 0.65 returns subscription with remove()
            // @ts-ignore
            if (subscription?.remove) subscription.remove();
        };
    }, []);

    // Load existing data if editing
    useEffect(() => {
        if (isEditMode && id) {
            loadVolontaireData(id);
        }
    }, [id, isEditMode]);

    const loadVolontaireData = async (volontaireId: string) => {
        try {
            setIsLoading(true);
            const response = await api.volontaires.getById(volontaireId);
            if (response.data) {
                const d = response.data as any;
                // Map backend -> form keys for edit mode
                const mapped: any = {
                    ...d,
                    // unify keys coming from backend (ReflectionUtils strips "Vol" suffix on GET)
                    titre: d.titre ?? d.titreVol ?? '',
                    nomVol: d.nomVol ?? d.nom ?? d.lastName ?? '',
                    prenomVol: d.prenomVol ?? d.prenom ?? d.firstName ?? '',
                    email: d.email ?? d.emailVol ?? '',
                    telephone: d.telephone ?? d.telPortableVol ?? '',
                    telephoneDomicile: d.telephoneDomicile ?? d.telDomicileVol ?? '',
                    adresse: d.adresse ?? d.adresseVol ?? '',
                    codePostal: d.codePostal ?? d.cpVol ?? '',
                    ville: d.ville ?? d.villeVol ?? '',
                    // keep pays if it existed previously
                    pays: d.pays ?? '',
                    dateNaissance: d.dateNaissance ?? '',
                    sexe: d.sexe ?? '',
                    typePeau: d.typePeau ?? d.typePeauVisage ?? '',
                };
                setFormData(mapped);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            setErrorMessage('Erreur lors du chargement des données du volontaire');
        } finally {
            setIsLoading(false);
        }
    };

    const fieldToTabMap: { [key: string]: TabId } = {
        // Infos personnelles
        titre: 'infos-personnelles',
        nomVol: 'infos-personnelles',
        prenomVol: 'infos-personnelles',
        email: 'infos-personnelles',
        telephone: 'infos-personnelles',
        telephoneDomicile: 'infos-personnelles',
        dateNaissance: 'infos-personnelles',
        sexe: 'infos-personnelles',
        adresse: 'infos-personnelles',
        codePostal: 'infos-personnelles',
        ville: 'infos-personnelles',
        pays: 'infos-personnelles',
        // Peau
        typePeau: 'peau',
    };

    const validateForm = (): { valid: boolean; firstErrorKey?: string } => {
        const newErrors: { [key: string]: string } = {};

        // Required fields validation
        const requiredFields = [
            { key: 'nomVol', label: 'Nom' },
            { key: 'prenomVol', label: 'Prénom' },
            { key: 'email', label: 'Email' },
            { key: 'telephone', label: 'Téléphone' },
            { key: 'dateNaissance', label: 'Date de naissance' },
            { key: 'sexe', label: 'Sexe' },
            { key: 'typePeau', label: 'Type de peau' },
        ];

        requiredFields.forEach(field => {
            if (!formData[field.key] || formData[field.key].trim() === '') {
                newErrors[field.key] = `${field.label} est obligatoire`;
            }
        });

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        setErrors(newErrors);
        const keys = Object.keys(newErrors);
        return { valid: keys.length === 0, firstErrorKey: keys[0] };
    };

    // Pas de sanitization personnalisée: on envoie les données telles quelles

    const handleSubmit = async () => {
        const validation = validateForm();
        if (!validation.valid) {
            setErrorMessage('Veuillez corriger les erreurs dans le formulaire');
            const targetTab = validation.firstErrorKey ? fieldToTabMap[validation.firstErrorKey] : undefined;
            if (targetTab) {
                setActiveTab(targetTab as TabId);
                setFocusFieldId(validation.firstErrorKey);
                setFocusRequestId((n) => n + 1);
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }, 150);
            } else {
                // No mapping found: just scroll to top of current tab
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            }
            return;
        }

        try {
            setIsSaving(true);
            setErrorMessage(null);
            clearErrors();

            // Map frontend form -> backend VolontaireDTO
            const mapSexe = (s?: string) => {
                const v = (s || '').toLowerCase();
                if (v.startsWith('f')) return 'F'; // Féminin/F -> F
                if (v.startsWith('m')) return 'M'; // Masculin/M -> M
                if (v.includes('autre') || v === 'o') return 'Autre';
                return s || undefined;
            };

            const toVolontaireDTO = (data: any) => {
                const out: any = {};
                const setIf = (key: string, val: any) => {
                    if (val === undefined || val === null) return;
                    if (typeof val === 'string') {
                        const t = val.trim();
                        if (t.length === 0) return; // avoid sending empty strings that may fail validation
                        out[key] = t;
                    } else {
                        out[key] = val;
                    }
                };

                setIf('titreVol', data.titre);
                setIf('nomVol', data.nomVol);
                setIf('prenomVol', data.prenomVol);
                setIf('emailVol', data.email);
                setIf('telPortableVol', data.telephone);
                setIf('telDomicileVol', data.telephoneDomicile);
                setIf('adresseVol', data.adresse);
                setIf('cpVol', data.codePostal);
                setIf('villeVol', data.ville);
                setIf('sexe', mapSexe(data.sexe));
                setIf('dateNaissance', data.dateNaissance);
                setIf('typePeauVisage', data.typePeau);
                // Optionnels (caractéristiques)
                if (data.poids && String(data.poids).trim() !== '') {
                    const p = parseInt(String(data.poids), 10);
                    if (!Number.isNaN(p)) out.poids = p;
                }
                if (data.taille && String(data.taille).trim() !== '') {
                    const t = parseInt(String(data.taille), 10);
                    if (!Number.isNaN(t)) out.taille = t;
                }
                setIf('phototype', data.phototype);
                setIf('ethnie', data.ethnie);
                setIf('sousEthnie', data.sousEthnie);
                // Optional: forwarded but currently no backend fields for pays, ignore
                return out;
            };

            const payload = toVolontaireDTO(formData);

            const toVolontaireDetailDTO = (data: any, volontaireId?: string | number) => {
                const out: any = {};
                const put = (k: string, v: any) => {
                    if (v === undefined || v === null) return;
                    if (typeof v === 'string') {
                        const t = v.trim();
                        if (t.length === 0) return;
                        out[k] = t;
                    } else {
                        out[k] = v;
                    }
                };

                // Lier au volontaire existant lors de la création des détails
                if (volontaireId !== undefined && volontaireId !== null) {
                    out.idVol = typeof volontaireId === 'string' ? parseInt(volontaireId, 10) : volontaireId;
                }

                // Peau & exposition
                put('carnation', data.carnation);
                put('bronzage', data.bronzage);
                put('coupsDeSoleil', data.coupsDeSoleil);
                put('expositionSolaire', data.expositionSolaire);
                put('sensibiliteCutanee', data.sensibiliteCutanee);
                put('teintInhomogene', data.teintInhomogene);
                put('teintTerne', data.teintTerne);
                put('poresVisibles', data.poresVisibles);

                // Sécheresse
                put('secheresseLevres', data.secheresseLevres);
                put('secheresseCou', data.secheresseCou);
                put('secheressePoitrineDecollete', data.secheressePoitrineDecollete);
                put('secheresseVentreTaille', data.secheresseVentreTaille);
                put('secheresseFessesHanches', data.secheresseFessesHanches);
                put('secheresseBras', data.secheresseBras);
                put('secheresseMains', data.secheresseMains);
                put('secheresseJambes', data.secheresseJambes);
                put('secheressePieds', data.secheressePieds);

                // Taches
                put('tachesPigmentairesVisage', data.tachesPigmentairesVisage);
                put('tachesPigmentairesCou', data.tachesPigmentairesCou);
                put('tachesPigmentairesDecollete', data.tachesPigmentairesDecollete);
                put('tachesPigmentairesMains', data.tachesPigmentairesMains);

                // Fermeté
                put('perteDeFermeteVisage', data.perteDeFermeteVisage);
                put('perteDeFermeteCou', data.perteDeFermeteCou);
                put('perteDeFermeteDecollete', data.perteDeFermeteDecollete);

                // Marques cutanées
                put('cicatrices', data.cicatrices);
                put('tatouages', data.tatouages);
                put('piercings', data.piercings);

                // Vergetures
                put('vergeturesJambes', data.vergeturesJambes);
                put('vergeturesFessesHanches', data.vergeturesFessesHanches);
                put('vergeturesVentreTaille', data.vergeturesVentreTaille);
                put('vergeturesPoitrineDecollete', data.vergeturesPoitrineDecollete);

                // Mesures (nombres)
                if (data.ihBrasDroit && String(data.ihBrasDroit).trim() !== '') {
                    const n = parseFloat(String(data.ihBrasDroit));
                    if (!Number.isNaN(n)) out.ihBrasDroit = n;
                }
                if (data.ihBrasGauche && String(data.ihBrasGauche).trim() !== '') {
                    const n = parseFloat(String(data.ihBrasGauche));
                    if (!Number.isNaN(n)) out.ihBrasGauche = n;
                }

                // Cheveux
                put('couleurCheveux', data.couleurCheveux);
                put('natureCheveux', data.natureCheveux);
                put('longueurCheveux', data.longueurCheveux);
                put('epaisseurCheveux', data.epaisseurCheveux);
                put('natureCuirChevelu', data.natureCuirChevelu);
                put('cuirCheveluSensible', data.cuirCheveluSensible);
                put('chuteDeCheveux', data.chuteDeCheveux);
                put('cheveuxCassants', data.cheveuxCassants);

                // Cils & sourcils
                put('cils', data.cils);
                put('epaisseurCils', data.epaisseurCils);
                put('longueurCils', data.longueurCils);
                put('courbureCils', data.courbureCils);
                put('cilsAbimes', data.cilsAbimes);
                put('cilsBroussailleux', data.cilsBroussailleux);
                put('chuteDeCils', data.chuteDeCils);
                put('caracteristiqueSourcils', data.caracteristiqueSourcils);

                // Visage/yeux/levres
                put('cernesPigmentaires', data.cernesPigmentaires);
                put('cernesVasculaires', data.cernesVasculaires);
                put('poches', data.poches);
                put('yeux', data.yeux);
                put('levres', data.levres);

                // Médical/allergies
                put('traitement', data.traitement);
                put('anamnese', data.anamnese);
                put('contraception', data.contraception);
                put('santeCompatible', data.santeCompatible);
                put('menopause', data.menopause);
                put('bouffeeChaleurMenaupose', data.bouffeeChaleurMenaupose);
                put('ths', data.ths);
                put('reactionAllergique', data.reactionAllergique);
                put('desensibilisation', data.desensibilisation);
                put('terrainAtopique', data.terrainAtopique);
                put('allergiesCommentaires', data.allergiesCommentaires);
                put('acne', data.acne);
                put('couperoseRosacee', data.couperoseRosacee);
                put('psoriasis', data.psoriasis);
                put('dermiteSeborrheique', data.dermiteSeborrheique);
                put('eczema', data.eczema);
                put('angiome', data.angiome);
                put('pityriasis', data.pityriasis);
                put('vitiligo', data.vitiligo);
                put('melanome', data.melanome);
                put('zona', data.zona);
                put('herpes', data.herpes);
                put('pelade', data.pelade);

                // Scores
                const floatKeys = ['scorePod','scorePog','scoreFront','scoreLion','scorePpd','scorePpg','scoreDod','scoreDog','scoreSngd','scoreSngg','scoreLevsup','scoreComlevd','scoreComlevg','scorePtose','ita'];
                for (const k of floatKeys) {
                    const v = data[k];
                    if (v !== undefined && String(v).trim() !== '') {
                        const n = parseFloat(String(v));
                        if (!Number.isNaN(n)) out[k] = n;
                    }
                }

                // Divers
                put('originePere', data.originePere);
                put('origineMere', data.origineMere);
                put('nbCigarettesJour', data.nbCigarettesJour);

                // Notes entières seulement
                if (data.notes && /^\d+$/.test(String(data.notes).trim())) {
                    out.notes = parseInt(String(data.notes).trim(), 10);
                }

                return out;
            };

            let response;
            if (isEditMode) {
                response = await api.volontaires.update(id!, payload);
            } else {
                response = await api.volontaires.create(payload);
            }

            const data = response?.data as any;
            const createdId: any = data?.id ?? data?.idVol ?? data?.idVOL ?? data?.volontaireId ?? data?.volunteerId ?? data?.data?.id;

            if (createdId !== undefined && createdId !== null) {
                // Formulaire de création: créer les détails (POST) et non une mise à jour
                if (!isEditMode) {
                    try {
                        const idStr = String(createdId);
                        const detailsPayload = toVolontaireDetailDTO(formData, idStr);
                        if (Object.keys(detailsPayload).length > 0) {
                            await api.volontaires.createDetails(detailsPayload);
                        }
                    } catch (e) {
                        console.warn('Création des détails du volontaire échouée:', e);
                    }
                }
                setSuccessMessage(isEditMode ? 'Volontaire mis à jour avec succès!' : 'Volontaire créé avec succès!');

                const idStr = String(createdId);
                if (onSubmitSuccess) {
                    onSubmitSuccess(idStr);
                } else if (!isEmbedded) {
                    // Par défaut, aller sur le formulaire Habitudes Cosmétiques
                    // en passant l'id du volontaire nouvellement créé
                    setTimeout(() => {
                        // Using expo-router pattern via query string
                        // @ts-ignore - navigation may not understand path; fallback to router if injected later
                        navigation.navigate('/habitudes-cosmetiques', { idVol: idStr });
                    }, 500);
                }
            } else {
                // Si l'ID n'est pas clairement renvoyé, rester visuel mais informer
                setSuccessMessage('Volontaire créé. ID non détecté.');
            }
        } catch (error: any) {
            console.error('Erreur lors de la sauvegarde:', error);
            const serverMsg: string = error?.response?.data?.message || error?.response?.data || error?.message || 'Erreur lors de la sauvegarde';
            setErrorMessage(serverMsg);

            // Essaye de cibler le champ mentionné dans le message serveur
            const msg = (serverMsg || '').toLowerCase();
            const candidates: Array<{ key: string; tab: TabId; needles: string[] }> = [
                { key: 'nomVol', tab: 'infos-personnelles', needles: ['nom', 'nomvol'] },
                { key: 'prenomVol', tab: 'infos-personnelles', needles: ['prénom', 'prenom', 'prenomvol', 'prénomvol'] },
                { key: 'email', tab: 'infos-personnelles', needles: ['email', 'e-mail'] },
                { key: 'telephone', tab: 'infos-personnelles', needles: ['téléphone', 'telephone'] },
                { key: 'dateNaissance', tab: 'infos-personnelles', needles: ['naissance'] },
                { key: 'sexe', tab: 'infos-personnelles', needles: ['sexe'] },
                { key: 'typePeau', tab: 'peau', needles: ['type de peau', 'typepeau'] },
            ];

            for (const c of candidates) {
                if (c.needles.some(n => msg.includes(n))) {
                    setActiveTab(c.tab);
                    setErrors(prev => ({ ...prev, [c.key]: prev[c.key] || 'Champ obligatoire' }));
                    setFocusFieldId(c.key);
                    setFocusRequestId((n) => n + 1);
                    setTimeout(() => scrollViewRef.current?.scrollTo({ y: 0, animated: true }), 150);
                    break;
                }
            }
        } finally {
            setIsSaving(false);
        }
    };

    const renderTabContent = () => {
        const sectionProps = { formData, errors, handleChange, handleBlur, focusFieldId, focusRequestId };

        switch (activeTab) {
            case 'infos-personnelles':
                return <InfosPersonnellesSection {...sectionProps} />;
            case 'caracteristiques':
                return <CaracteristiquesSection {...sectionProps} />;
            case 'peau':
                return <PeauSection {...sectionProps} />;
            case 'marques-cutanees':
                return <MarquesCutaneesSection {...sectionProps} />;
            case 'cheveux':
                return <CheveuxSection {...sectionProps} />;
            case 'cils':
                return <CilsSection {...sectionProps} />;
            case 'problemes':
                return <ProblemesSection {...sectionProps} />;
            case 'medical':
                return <MedicalSection {...sectionProps} />;
            case 'mesures':
                return <MesuresSection {...sectionProps} />;
            case 'notes':
                return <NotesSection {...sectionProps} />;
            default:
                return <InfosPersonnellesSection {...sectionProps} />;
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.select({ ios: 80, android: 80 })}
            >

                {/* Banner removed to avoid gray framed block; rely on Snackbar + field errors */}

                {isLandscape ? (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <FormTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={(tabId) => setActiveTab(tabId as TabId)}
                            orientation="vertical"
                        />
                        <ScrollView
                            ref={scrollViewRef}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="on-drag"
                            showsVerticalScrollIndicator={true}
                            scrollEnabled={true}
                            removeClippedSubviews={false}
                            nestedScrollEnabled={true}
                        >
                            {renderTabContent()}
                        </ScrollView>
                    </View>
                ) : (
                    <>
                        <FormTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={(tabId) => setActiveTab(tabId as TabId)}
                            orientation="horizontal"
                        />
                        <ScrollView
                            ref={scrollViewRef}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="on-drag"
                            showsVerticalScrollIndicator={true}
                            scrollEnabled={true}
                            removeClippedSubviews={false}
                            nestedScrollEnabled={true}
                        >
                            {renderTabContent()}
                        </ScrollView>
                    </>
                )}

                <View style={{ padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e0e0e0' }}>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.goBack()}
                        style={{ marginBottom: 8 }}
                    >
                        Annuler
                    </Button>

                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        disabled={isSaving}
                        loading={isSaving}
                        icon={isSaving ? undefined : "content-save"}
                    >
                        {isSaving ? 'Enregistrement...' : (isEditMode ? 'Mettre à jour' : 'Enregistrer')}
                    </Button>
                </View>

                <Snackbar
                    visible={!!errorMessage}
                    onDismiss={() => setErrorMessage(null)}
                    duration={4000}
                    style={{ backgroundColor: '#DC2626' }}
                >
                    {errorMessage || ''}
                </Snackbar>

                <Snackbar
                    visible={!!successMessage}
                    onDismiss={() => setSuccessMessage(null)}
                    duration={3000}
                >
                    {successMessage || ''}
                </Snackbar>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default VolontaireForm;
