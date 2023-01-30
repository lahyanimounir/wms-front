<template>
    <!-- <v-app-bar
      elevation="0"
      color="primary" class="flex-grow-0" style="border-radius: 0px;" >
      aaa
      </v-app-bar> -->
      <v-navigation-drawer  app permanent elevation="0">
        <v-sheet  class="pa-4 d-flex my-Menu" style="align-items: center;">
                <v-avatar color="blue-grey lighten-5" size="64"></v-avatar>

                <div class="px-2">Mounir Lahyani</div>
            </v-sheet>

            <v-divider></v-divider>

          <v-list class="py-0 menu">
       
              <v-list-item link @click="$router.push({ path: '/comptabilitee/'+id+'/operation_divers' })">
                  <v-list-item-icon>
                    
                      <i class="fal fa-chart-pie"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE OPERATIONS DIVERS
                  </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="$router.push({ path: 'dossiers' })">
                  <v-list-item-icon>
                      <i class="fal fa-folders"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE ACHAT
                  </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="$router.push({ path: 'tiers' })">
                  <v-list-item-icon>
                      <i class="far fa-users"></i>
                  </v-list-item-icon>

                  <v-list-item-title  class="pl-3">
                    SAISIE VENTE

                  </v-list-item-title>
              </v-list-item>
              
             
              <v-list-item link @click="$router.push({ path: 'planComptable' })">

                  <v-list-item-icon>
                      <i class="fal fa-book"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE TRESORERIE

                  </v-list-item-title>
              </v-list-item>

              <v-list-item link  @click="$router.push({ path: 'journaux' })" >
                  <v-list-item-icon>
                      <i class="fal fa-newspaper"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE DES A NOUVEAU
                  </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="$router.push({ path: 'tva' })">
                  <v-list-item-icon>
                      <i class="fal fa-percentage"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE SIMPLIFIE 

                  </v-list-item-title>
              </v-list-item>


           
              <v-list-item link @click="$router.push({ path: 'formeJuridique' })">
                  <v-list-item-icon>
                      <i class="fal fa-gavel"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE A NOUVEAU
                  </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="$router.push({ path: 'ville' })">
                  <v-list-item-icon>
                      <i class="fad fa-map-marker-alt"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE BUDGET
                  </v-list-item-title>
              </v-list-item>
              
              
              <v-list-item link  @click="$router.push({ path: 'typeComptabilitee' })">
                  <v-list-item-icon>
                      <i class="fad fa-calculator-alt"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    IMMOBILISATIONS
                  </v-list-item-title>
              </v-list-item>
              
              
              
              <v-list-item link @click="$router.push({ path: 'devise' })">
                  <v-list-item-icon>
                      <i class="fal fa-usd-circle"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3">
                    SAISIE PROJET IMMOBILIER
                  </v-list-item-title>
              </v-list-item>

              <v-list-item link @click="$router.push({ path: 'echeance' })">
                  <v-list-item-icon>
                      <i class="fal fa-bullseye-arrow"></i>
                  </v-list-item-icon>

                  <v-list-item-title class="pl-3" >
                    SAISIE CONTRATS (COPIE DU CONTRAT JOINTE)
                  </v-list-item-title>
              </v-list-item>         

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
  props:['id']
}
</script>

<style>
.my-Menu .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
margin-right: 0px ;
}
.menu .v-list-item__title {
    font-size: 0.8rem;
}
</style>