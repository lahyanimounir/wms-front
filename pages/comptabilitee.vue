<template>
    <v-app>
        <v-main style="background-color: #f9f9f9;">
            <v-container class="py-0 px-0" fluid>
                <nuxt-child/>
            </v-container>
        </v-main>
    </v-app>
</template>
  
    <script>
    import CutomMenu from '../components/menu'
    export default {
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