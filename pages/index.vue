<template>
  <div>
      <div class="d-flex" style="display:flex;justify-content: center;align-items: center;margin-top: 80px;flex-direction: column;">
        <img style="" class="img-fluid" :src="iconUrl" alt="logo wms">
        <p style="font-size:44px"><span style="color:#00897B">WE</span>B <span style="color:#00897B">MANAGE</span>MENT <span style="color:#00897B">SYSTEM</span></p>
      </div>
      <v-app>
        <div class="d-flex" style="justify-content: center;align-items: center;height: 20vh">
          <NuxtLink to="/settings/home">
            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="large" color="blue">
                 
                  mdi-cog-outline
                </v-icon>
              </div>
              Paramétrage
            </v-card>
          </NuxtLink>
          
          <NuxtLink to="/comptabilitee">


            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="large" color="blue">
                  mdi-numeric
                </v-icon>
              </div>
              Comptabilité
            </v-card>
          </NuxtLink>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="large" color="blue">
                mdi-account-tie
              </v-icon>
            </div>
            Paie et RH
          </v-card>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="large" color="blue">
                mdi-account-outline
              </v-icon>
            </div>
            Secrétaire juridique
          </v-card>
          <NuxtLink to="facturation">
            <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
              <div>
                <v-icon size="large" color="blue">
                  mdi-file-document-outline 
                </v-icon>
              </div>
              Facturation
            </v-card>
          </NuxtLink>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
            <div>
              <v-icon size="large" color="blue">
                mdi-text-box-search-outline
              </v-icon>
            </div>
            Documentation
          </v-card>
          <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor: pointer;">
            <div>
              <v-icon size="large" color="blue">
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
    data: () => ({
      iconUrl: require('../assets/images/LogoWMS.png'),
    }),
  }
</script>
  