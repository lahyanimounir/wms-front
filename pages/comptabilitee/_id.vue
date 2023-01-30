<template>
    <v-app>
      

        <comptabilite-menu :id="id" />

        <v-container class="py-8 px-6" fluid style="background-color: #f9f9f9;min-height: 100vh;" >    
            <nuxt-child/>
        </v-container>
   
    </v-app>
</template>
  
    <script>
import ComptabiliteMenu from '~/components/comptabiliteMenu.vue'
    export default {
        components: {
         
                ComptabiliteMenu
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