<template>
  <div>
    <div class="my-account">
      <NuxtLink to="/myAccount">
        <v-btn class="btn btn-primary" style="background-color: #00897B; color: white; border-radius: 0px; border: 0px; margin-top: 20px; margin-left: 20px; margin-right: 20px; margin-bottom: 20px; font-size: 20px; font-weight: 600; height: 50px; text-transform: none; box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);">
          <v-icon size="30" left>
            mdi-account-cog-outline
          </v-icon>
          Mon compte
        </v-btn>
      </NuxtLink>
    </div>
      <div class="d-flex" style="display:flex;justify-content: center;align-items: center;margin-top: 80px;flex-direction: column;">
        <img style="" class="img-fluid" :src="iconUrl" alt="logo wms">
        <!-- <p style="font-size:44px"><span style="color:#00897B">WE</span>B <span style="color:#00897B">MANAGE</span>MENT <span style="color:#00897B">SYSTEM</span></p> -->
        <p style="font-size:44px">WEB MANAGEMENT SYSTEM</p>
      </div>
      <v-app>
        <div class="d-flex" style="justify-content: center;align-items: center;height: 20vh">
          <NuxtLink to="/settings/home">
            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="70" color="grey darken-3">
                 
                  mdi-cog-outline
                </v-icon>
              </div>
              Paramétrage
            </v-card>
          </NuxtLink>
          
          <NuxtLink to="/comptabilitee">


            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="70" color="teal accent-3">
                  mdi-numeric
                </v-icon>
              </div>
              Comptabilité
            </v-card>
          </NuxtLink>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="70" color="orange lighten-2">
                mdi-account-tie
              </v-icon>
            </div>
            Paie et RH
          </v-card>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="70" color="indigo darken-1">
                mdi-account-outline
              </v-icon>
            </div>
            Secrétaire juridique
          </v-card>
          <NuxtLink to="facturation">
            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="70" color="pink lighten-3">
                  mdi-file-document-outline 
                </v-icon>
              </div>
              Facturation
            </v-card>
          </NuxtLink>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="70" color="cyan darken-1">
                mdi-text-box-search-outline
              </v-icon>
            </div>
            Documentation
          </v-card>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor: pointer;">
            <div>
              <v-icon size="70" color="blue-grey lighten-4">
                mdi-calendar-multiple-check
              </v-icon>
            </div>
            agenda et suivi des travaux
          </v-card>
        </div>
      </v-app>
  
  
  
    </div>
  </template>
  
  
  <style scoped>
    .cardHover:hover{
      background: #f1f1f1;
    }
    a{
        text-decoration: none
    }
    .cardHover div{
        padding-bottom: 5px ;
    }
  </style>

  <script>
  export default{
    middleware: ['auth'],
    data: () => ({
      iconUrl: require('../assets/images/LogoWMS.png'),
    }),
  }
</script>
  