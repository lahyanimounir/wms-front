<template>
    <!-- <v-app-bar
      elevation="0"
      color="primary" class="flex-grow-0" style="border-radius: 0px;" >
      aaa
      </v-app-bar> -->
    <v-navigation-drawer app permanent elevation="0">
        <v-sheet class="pa-4 d-flex my-Menu" style="align-items: center;">
            <v-avatar color="blue-grey lighten-5" size="64"></v-avatar>

            <div class="px-2">Mounir Lahyani</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list class="py-0 menu">
            <v-list-group no-action :value="false">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fal fa-cog"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>PARAMETRAGE DOSSIER/EXERCICE</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/parametrage/definition_plan' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DEFINITION PLAN COMPTABLE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/parametrage/definition_tiers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DEFINITIONS TIERS
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CREATION JOURNAUX
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        UTILLISATEURS
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DUPLIQUER DOSSIER
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SUPPRESSION DOSSIERS
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ARCHIVER
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        IMPORTATION ECRITURE
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DEFINITION CODE TVA
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CLOTURER
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        RE CLOTURER
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        PRORATA TVA
                    </v-list-item-title>
                </v-list-item>
            </v-list-group>


            <v-list-group no-action :value="true">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fal fa-keyboard"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>MENU SAISIE</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE OPERATIONS DIVERS
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                 @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/achat' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE ACHAT
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/vente' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE VENTE

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/tresorerie' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE TRESORERIE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/desANouveau' })">
                    <v-list-item-icon>
                        <i class="fal fa-newspaper"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE DES A NOUVEAU
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/simplifier' })">
                    <v-list-item-icon>
                        <i class="fal fa-percentage"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE SIMPLIFIE

                    </v-list-item-title>
                </v-list-item>



                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/ANouveau' })"
                >
                    <v-list-item-icon>
                        <i class="fal fa-gavel"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE A NOUVEAU
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/budget' })">
                    <v-list-item-icon>
                        <i class="fad fa-map-marker-alt"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE BUDGET
                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/immobilisations' })">
                    <v-list-item-icon>
                        <i class="fad fa-calculator-alt"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        IMMOBILISATIONS
                    </v-list-item-title>
                </v-list-item>



                <v-list-item class="pl-6 pr-0" link 
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/prjImmobilier' })">
                    <v-list-item-icon>
                        <i class="fal fa-usd-circle"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE PROJET IMMOBILIER
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                @click="$router.push({ path: '/comptabilitee/' + id + '/saisie/contrat' })">
                    <v-list-item-icon>
                        <i class="fal fa-bullseye-arrow"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SAISIE CONTRATS (COPIE DU CONTRAT JOINTE)
                    </v-list-item-title>
                </v-list-item>
            </v-list-group>


            <v-list-group no-action :value="false">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fad fa-mail-bulk"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>MENU TRAITEMENT</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        LETTRAGE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        RAPPROCHEMENT BANCAIRE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'dossiers' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        RELANCE TIERS
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'tiers' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        PAIEMENT TIERS

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        VERROUILLAGE PERIODIQUE

                    </v-list-item-title>
                </v-list-item>

            </v-list-group>

            <v-list-group>
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fad fa-mail-bulk"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>OUTILS</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>
    
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>
    
                    <v-list-item-title class="pl-3">
                        RECHERCHE MULTICRITERE
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>
    
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>
    
                    <v-list-item-title class="pl-3">
                        MODIFIER COMPTE
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>
    
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>
    
                    <v-list-item-title class="pl-3">
                        MODIFIER JOURNAL
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>
    
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>
    
                    <v-list-item-title class="pl-3">
                        SUPPRESSION GROUPEE
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pl-6 pr-0" link>
                    <v-list-item-icon>
    
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>
    
                    <v-list-item-title class="pl-3">
                        EXTOURNER ECRITURE
                    </v-list-item-title>
                </v-list-item>
            </v-list-group>


            <v-list-group no-action :value="false">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fad fa-tools"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>EDITIONS COMPTABLES</v-list-item-title>
                    </v-list-item-content>
                </template>
                
                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        BALANCES
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'dossiers' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        GRANDS LIVRES
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'tiers' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        JOURNAUX

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        EDITION GLOBALE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        EDITION BUDGET VS ACTUEL

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ETAT SUIVIT PROJET IMMOBILIER

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        RAPPORT ACTIVITEE

                    </v-list-item-title>
                </v-list-item>

            </v-list-group>
           



            <v-list-group no-action :value="false">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fal fa-print"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>EDITIONS FISCALES</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION TVA
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'dossiers' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DROIT DE TIMBRE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'tiers' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        PAIEMENT RETENUE A LA SOURCE

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        TAXES SUR LES DIVIDENDES DISTRIBUES
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION DU CHIFFRE D AFFAIRE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CALCUL ET PAIEMENT IS (ACOMPTE REGULA ET COT MIN)

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CALCUL IR PROFESSIONNEL ET COTISATION MINIMALE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        PAIEMENT CONTRIBUTION SOCIALE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ETAT DES CARBURANTS

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION POUR LA TAXE PROFESSIONNELLE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ETAT DES HONORAIRES

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ETAT DES HONORAIRES MEDECINS

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION RAS REVENU FONCIER

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION RAS HONORAIRES ET RENUMERATIONS

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        ETAT DES DIVIDENDES DISTRIBUES

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION DU FONCIERS

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        DECLARATION PRORATA TVA

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        BILAN ET ETIC

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        RAPPORT D'ACTIVITE

                    </v-list-item-title>
                </v-list-item>

            </v-list-group>


            <v-list-group no-action :value="false">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <!-- <v-icon>fa-graduation-cap</v-icon> -->
                        <i class="fal fa-sync-alt"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>AUDIT ET CONTRÔLE</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item class="pl-6 pr-0" link
                    @click="$router.push({ path: '/comptabilitee/' + id + '/operation_divers' })">
                    <v-list-item-icon>

                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        COMPTE NON PREVU DANS LA LIASSE FISCALE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'dossiers' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        SIGNE COMPTE
                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'tiers' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CAISSES 

                    </v-list-item-title>
                </v-list-item>


                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CONTRÔLE TABLEAU TVA

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CONTRÔLE SOLDE TVA ET SOLDE COMPTABLE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        FORMULE DE COHERENCE

                    </v-list-item-title>
                </v-list-item>

                <v-list-item class="pl-6 pr-0" link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        CONTRÔLE  COHERENCE DECLARATION

                    </v-list-item-title>
                </v-list-item>

            </v-list-group>



        </v-list>
    </v-navigation-drawer>

</template>

<script>

export default {

    data: () => ({
        drawer: null,
        links: [
            ['mdi-inbox-arrow-down', 'Inbox'],
            ['mdi-send', 'Send'],
            ['mdi-delete', 'Trash'],
            ['mdi-alert-octagon', 'Spam'],
        ],
    }),
    props: ['id','dossier']
}
</script>

<style>
.my-Menu .v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 0px;
}

.menu .v-list-item__title {
    font-size: 0.8rem;
}
</style>