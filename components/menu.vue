<template>
      <!-- <v-app-bar
        elevation="0"
        color="primary" class="flex-grow-0" style="border-radius: 0px;" >
        aaa
        </v-app-bar> -->
        <v-navigation-drawer absolute app permanent elevation="0">
            <v-sheet  class="pa-4 d-flex my-Menu" style="align-items: center;">
                <v-avatar color="blue-grey lighten-5" size="64"></v-avatar>

                <div class="px-2">Mounir Lahyani</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list class="py-0">

                <v-list-item link>
                    <v-list-item-icon>
                      
                        <i class="fal fa-chart-pie"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Accueil
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'dossiers' })">
                    <v-list-item-icon>
                        <i class="fal fa-folders"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Dossier
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'tiers' })">
                    <v-list-item-icon>
                        <i class="far fa-users"></i>
                    </v-list-item-icon>

                    <v-list-item-title  class="pl-3">
                        Tiers
                    </v-list-item-title>
                </v-list-item>
                
               
                <v-list-item link @click="$router.push({ path: 'planComptable' })">

                    <v-list-item-icon>
                        <i class="fal fa-book"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Plan comptable
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link  @click="$router.push({ path: 'journaux' })" >
                    <v-list-item-icon>
                        <i class="fal fa-newspaper"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Journeaux
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'tva' })">
                    <v-list-item-icon>
                        <i class="fal fa-percentage"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Code TVA
                    </v-list-item-title>
                </v-list-item>


                

                <!-- <v-list-item link @click="$router.push({ path: 'associe' })">
                    <v-list-item-icon>
                        <i class="fad fa-map-marker-alt"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Associe / Gerant
                    </v-list-item-title>
                </v-list-item> -->
                <!-- <v-list-item link>
                    <v-list-item-icon>
                        <i class="fal fa-donate"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Mode de reglement
                    </v-list-item-title>
                </v-list-item> -->
                
                <v-list-item link @click="$router.push({ path: 'formeJuridique' })">
                    <v-list-item-icon>
                        <i class="fal fa-gavel"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Formes juridiques
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'ville' })">
                    <v-list-item-icon>
                        <i class="fad fa-map-marker-alt"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Ville
                    </v-list-item-title>
                </v-list-item>
                
                
                <v-list-item link  @click="$router.push({ path: 'typeComptabilitee' })">
                    <v-list-item-icon>
                        <i class="fad fa-calculator-alt"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Type de Comptabilité
                    </v-list-item-title>
                </v-list-item>
                
                
                
                <v-list-item link @click="$router.push({ path: 'devise' })">
                    <v-list-item-icon>
                        <i class="fal fa-usd-circle"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Devise
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'echeance' })">
                    <v-list-item-icon>
                        <i class="fal fa-bullseye-arrow"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3" >
                        Echeance
                    </v-list-item-title>
                </v-list-item>


                <v-list-item link @click="$router.push({ path: 'localisation' })">
                    <v-list-item-icon>
                        <i class="fal fa-bullseye-arrow"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3" >
                        localisation
                    </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="$router.push({ path: 'banque' })">
                    <v-list-item-icon>
                        <i class="fal fa-bullseye-arrow"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3" >
                        Banques
                    </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item link>
                    <v-list-item-icon>
                        <i class="fad fa-newspaper"></i>
                    </v-list-item-icon>

                    <v-list-item-title class="pl-3">
                        Type de jouneaux
                    </v-list-item-title>
                </v-list-item> -->

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
}
</script>

<style>
.my-Menu .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
margin-right: 0px ;
}
</style>