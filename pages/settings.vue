<template>
    <v-app>
      

        <CutomMenu />

        <v-main style="background-color: #f9f9f9;">
            <v-container class="py-8 px-6" fluid>
               
             <nuxt-child/>
            </v-container>
        </v-main>
    </v-app>
</template>
  
    <script>
    import CutomMenu from '../components/menu'
    export default {
        middleware: ['auth'],
        components: {
            CutomMenu
        },
        data: () => ({
            cards: ['Today', 'Yesterday'],
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