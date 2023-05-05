<template>
  <v-app>
    <div class="my-account">
      <template>
        <v-container fluid>
          <v-row justify="space-between" class="mt-1 d-flex">
            <div class="ml-4" style="height: 50px;line-height: 50px;text-align: center;">
              <span style="font-size: larger;margin:0">Connecté(e) en tant que : <span style="font-weight:bold">{{ user.username }}</span></span>
            </div>
            <v-menu  bottom min-width="200px" rounded offset-y>
              <template  v-slot:activator="{ on }">
                <v-btn class="mr-4" icon x-large v-on="on">
                  <v-avatar  color="" size="48" >
                    <img :src="user.logo" alt="User Image" class="image"/>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar color="">
                      <img :src="user.logo" alt="User Image" class="image"/>
                    </v-avatar>
                    <h3>{{ user.username }}</h3>
                    <p class="text-caption mt-1">
                      {{ this.$auth.user.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn @click="$router.push({path:'/myAccount'})" depressed rounded text>
                      Mon compte
                    </v-btn>
                    <template v-if="user.is_admin">
                      <v-divider class="my-3"></v-divider>
                      <v-btn @click="$router.push({path:'/manageUsers'})" depressed rounded text>
                        Gerer les utilisateurs
                      </v-btn>
                    </template>
                    <v-divider class="my-3"></v-divider>
                    <v-btn @click="logout()" depressed rounded text>
                      Deconnexion
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-row>
        </v-container>
      </template>
      <!-- <NuxtLink to="/myAccount">
        <v-btn class="btn btn-primary" style="background-color: #00897B; color: white; border-radius: 0px; border: 0px; margin-top: 20px; margin-left: 20px; margin-right: 20px; margin-bottom: 20px; font-size: 20px; font-weight: 600; height: 50px; text-transform: none; box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);">
          <v-icon size="30" left>
            mdi-account-cog-outline
          </v-icon>
          Mon compte
        </v-btn>
      </NuxtLink> -->
      <v-menu anchor="bottom end" rounded>

      </v-menu>
    </div>
    <div class="d-flex"
      style="display:flex;justify-content: center;align-items: center;margin-top: 30px;flex-direction: column;">
      <img style="" class="img-fluid" :src="iconUrl" alt="logo wms">
      <!-- <p style="font-size:44px"><span style="color:#00897B">WE</span>B <span style="color:#00897B">MANAGE</span>MENT <span style="color:#00897B">SYSTEM</span></p> -->
      <p style="font-size:44px">WEB MANAGEMENT SYSTEM</p>
    </div>
    <div class="d-flex" style="justify-content: center;align-items: center;height: 20vh">
      <NuxtLink to="/settings/home" v-if="user.is_admin || user.access.parametrage">
        <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
          <div>
            <v-icon size="70" color="grey darken-3">

              mdi-cog-outline
            </v-icon>
          </div>
          Paramétrage
        </v-card>
      </NuxtLink>

      <NuxtLink to="/comptabilitee" v-if="user.is_admin || user.access.comptabilitee">


        <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
          <div>
            <v-icon size="70" color="teal accent-3">
              mdi-numeric
            </v-icon>
          </div>
          Comptabilité
        </v-card>
      </NuxtLink>
      <!-- add NuxtLink here later -->
      <v-card v-if="user.is_admin || user.access.p_r_h" class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
        <div>
          <v-icon size="70" color="orange lighten-2">
            mdi-account-tie
          </v-icon>
        </div>
        Paie et RH
      </v-card>
      <!-- add NuxtLink here later -->
      <v-card v-if="user.is_admin || user.access.secretaire_juridique" class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
        <div>
          <v-icon size="70" color="indigo darken-1">
            mdi-account-outline
          </v-icon>
        </div>
        Secrétaire juridique
      </v-card>
      <NuxtLink to="facturation" v-if="user.is_admin || user.access.facturation">
        <v-card class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
          <div>
            <v-icon size="70" color="pink lighten-3">
              mdi-file-document-outline
            </v-icon>
          </div>
          Facturation
        </v-card>
      </NuxtLink>
      <!-- add NuxtLink here later -->
      <v-card v-if="user.is_admin || user.access.documentation" class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor:pointer">
        <div>
          <v-icon size="70" color="cyan darken-1">
            mdi-text-box-search-outline
          </v-icon>
        </div>
        Documentation
      </v-card>
      <!-- Here as well -->
      <v-card v-if="user.is_admin || user.access.agenda" class="px-3 py-3 ml-4 text-center cardHover" elevation="0" style="border: 1px solid #ddd;cursor: pointer;">
        <div>
          <v-icon size="70" color="blue-grey lighten-4">
            mdi-calendar-multiple-check
          </v-icon>
        </div>
        agenda et suivi des travaux
      </v-card>
    </div>
  </v-app>
</template>
  
  
<style scoped>
.cardHover:hover {
  background: #f1f1f1;
}

a {
  text-decoration: none
}

.cardHover div {
  padding-bottom: 5px;
}

.centered {
  display: flex;
  align-items: center;
  /* height: 100px; */
  /* Set a height to see the effect */
}
</style>

<script>
export default {
  middleware: ['auth'],
  data: () => ({
    iconUrl: require('../assets/images/LogoWMS.png'),
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
      logo:"null",
    },
  }),
  created(){
    this.user = this.$auth.user
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
  