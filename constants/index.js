const links = (id) => {
    return[
    {
        title: 'Parametrage dossier',
        path:'parametrage',
        childs: [
            {
                title: 'Definition types plans comptables',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/parametrage/definition_plan' 
            },
            {
                title: 'Defiinition Tiers',
                icon: 'mdi-account',
                path: '/comptabilitee/' + id + '/parametrage/definition_tiers'
            },
            {
                title: 'Creation des journaux',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'UTILISATEURS',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'DUPLIQUER DOSSIER',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'SUPPRESSION DOSSIER',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'ARCHIVER',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'IMPORTATION ECRITURE',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'DEFINITION CODE TVA',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'RE CLOTURER',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
            {
                title: 'PRORATA TVA ',
                icon: 'mdi-book',
                path: '/comptabilitee/' + id + '/parametrage/journaux'
            },
        ]
    },  
    {
        title: 'Menu Saisie',
        path:'saisie',
        childs: [
            {
                title: 'SAISIE OPERATIONS DIVERS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/operation_divers'
            },
            {
                title: 'SAISIE ACHAT',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/achat'
            },
            {
                title: 'SAISIE VENTE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/vente'
            },
            {
                title: 'SAISIE TRESORERIE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/tresorerie'
            },
            {
                title: 'SAISIE DES A NOUVEAU',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/desANouveau' 
            },
            // {
            //     title: 'SAISIE SIMPLIFIE',
            //     icon: 'mdi-folder',
            //     path: '/comptabilitee/' + id + '/saisie/simplifier'
            // },
            {
                title: 'SAISIE BUDGET',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/budget'
            },
            {
                title: 'IMMOBILISATIONS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/immobilisations'
            },
            {
                title: 'SAISIE PROJET IMMOBILIER',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/prjImmobilier'
            },
            {
                title: 'SAISIE CONTRATS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/saisie/contrat'
            },
        ]
    },
    {
        title:"MENU TRAITEMENT",
        childs: [
            {
                title: 'LETTRAGE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/traitement/lettrage'
            },
            {
                title: 'RAPPROCHEMENT BANCAIRE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/traitement/rapprochement'
            },
            {
                title: 'RELANCE TIERS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/traitement/relance'
            },
            {
                title: 'PAIEMENT TIERS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/traitement/paiement'
            },
            {
                title: 'VERROUILLAGE PERIODIQUE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/traitement/verrouillage'
            }
        ] 
    },
    {
        title: 'OUTILS',
        childs: [
            {
                title: 'RECHERCHE MULTICRITERE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/outils/recherche'
            },
            {
                title: 'MODIFIER COMPTE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/outils/modifier'
            },
            {
                title: 'MODIFIER JOURNAL',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/outils/modifierJournal'
            },
            {
                title: 'SUPPRESSION GROUPEE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/outils/suppression'
            },
            {
                title: 'EXTOURNER ECRITURE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/outils/extourner'
            }
        ]
    },
    {
        title:'EDITIONS COMPTABLES',
        childs:[
            {
                title:'BALANCES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/balances'
            },
            {
                title:'GRANDS LIVRES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/grandlivre'
            },
            {
                title:'JOURNAUX',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/journaux'
            },
            {
                title:'EDITION GLOBALE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/edition'
            },
            {
                title:'EDITION BUDGET VS ACTUEL',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/budget'
            },
            {
                title:'ETAT SUIVIT PROJET IMMOBILIER',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/etat'
            },
            {
                title:'RAPPORT ACTIVITEE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/edition/rapport'
            },

            
        ]
    },
    {
        title:'EDITIONS FISCALES',
        childs:[
            {
                title:'DECLARATION TVA',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/tva'
            },
            {
                title:'DROIT DE TIMBRE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/timbre'
            },
            {
                title:'PAIEMENT RETENUE A LA SOURCE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/paiement'
            },
            {
                title:'TAXES SUR LES DIVIDENDES DISTRIBUES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/taxes'
            },
            {
                title:'DECLARATION DU CHIFFRE D AFFAIRE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'CALCUL ET PAIEMENT IS (ACOMPTE REGULA ET COT MIN)',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/calcul'
            },
            {
                title:'CALCUL IR PROFESSIONNEL ET COTISATION MINIMALE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/calculir'
            },
            {
                title:'PAIEMENT CONTRIBUTION SOCIALE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/paiement'
            },
            {
                title:'ETAT DES CARBURANTS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/etat'
            },
            {
                title:'DECLARATION POUR LA TAXE PROFESSIONNELLE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'ETAT DES HONORAIRES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/etat'
            },
            {
                title:'ETAT DES HONORAIRES MEDECINS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/etat'
            },
            {
                title:'DECLARATION RAS REVENU FONCIER',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'DECLARATION RAS HONORAIRES ET RENUMERATIONS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'ETAT DES DIVIDENDES DISTRIBUES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/etat'
            },
            {
                title:'DECLARATION DU FONCIERS',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'DECLARATION PRORATA TVA',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/declaration'
            },
            {
                title:'BILAN ET ETIC',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/bilan'
            },
            {
                title:'RAPPORT D\'ACTIVITE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/editionFiscales/rapport'
            }
        ]
    },
    {
        title:'AUDIT ET CONTRÔLE',
        childs:[
            {
                title:'COMPTE NON PREVU DANS LA LIASSE FISCALE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/audit'
            },
            {
                title:'SIGNE COMPTE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/signe'
            },
            {
                title:'CAISSES',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/caisses'
            },
            {
                title:'CONTRÔLE TABLEAU TVA',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/controle'
            },
            {
                title:'CONTRÔLE TABLEAU TVA',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/controle'
            },
            {
                title:'CONTRÔLE SOLDE TVA ET SOLDE COMPTABLE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/controle'
            },
            {
                title:'FORMULE DE COHERENCE',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/formule'
            },
            {
                title:'CONTRÔLE  COHERENCE DECLARATION',
                icon: 'mdi-folder',
                path: '/comptabilitee/' + id + '/audit/controle'
            },
            
        ]
    }
]
}
const NavBarHeight = '90px'
const TopBarHeight = '50px'

export default links