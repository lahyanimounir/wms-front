<template>
    <v-app>
      

        <!-- <comptabilite-menu :id="id" /> -->
        <TopBar/>
        <NavBar :id="id"/>

        <v-container class="pb-8 px-6" fluid style="background-color: #f9f9f9;min-height: 100vh;padding:0px" >    
            <nuxt-child/>
        </v-container>
   
    </v-app>
</template>
  
    <script>
import ComptabiliteMenu from '~/components/comptabiliteMenu.vue'
import TopBar from '~/components/TopBar.vue'
import NavBar from '~/components/Navbar.vue'
    export default {
        components: {
         
                ComptabiliteMenu,
                TopBar,
                NavBar
        },
        data: () => ({
            id:'',
            cards: ['Today', 'Yesterday'],
            drawer: null,
            links: [
                ['mdi-inbox-arrow-down', 'Inbox'],
                ['mdi-send', 'Send'],
                ['mdi-delete', 'Trash'],
                ['mdi-alert-octagon', 'Spam'],
            ],
        }),
        created(){
            this.id = this.$route.params.id
        }
    }
    </script>