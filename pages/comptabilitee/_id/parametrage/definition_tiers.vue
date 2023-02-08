<template>
    <div>
        <v-title>Hello</v-title>
        <v-card class="mx-auto" max-width="264">
            <v-img :src="defaultImage" height="200px" width:="50px"></v-img>

            <v-card-title style="font-size:14px">
                Denomination : AGELEC - Rabat
            </v-card-title>

            <v-card-subtitle>
                ICE : 001459787000052
            </v-card-subtitle>

            <v-card-actions>
                <v-checkbox v-model="checkbox" label="Selectionner"></v-checkbox>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                    <v-icon>{{ show? 'mdi-chevron-up': 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text style="font-size:14px">
                        <p class="mb-0"><b>Activitée :</b> MAINTENANCE INDUSTRIELLE - ENTREP DE TRV DIVERS</p>
                        <p class="mb-0"><b>Adresse :</b> 1, AVENUE MOHAMMED V - RABAT</p>
                        <p class="mb-0"><b>Tel :</b> 0522 37 37 37</p>
                        <p class="mb-0"><b>Fax :</b> 0522 37 37 38</p>
                        <p class="mb-0"><b>Email :</b> email@email.com</p>

                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </div>
</template>

<script>
import tiersDefault from '../../../../static/tiersDefault.png'
export default {
    data: () => ({
        defaultImage: tiersDefault,
        drawer: null,
        id: null,
        checkbox: true,
        show: false,
    }),
    created() {
        this.test()
    },
    methods: {
        async test() {
            this.id = this.$route.params.id
            const url = process.env.Name_api + '/exercice/' + this.id
            const res = await this.$myService.get(url)
            console.log(res);
        }
    }

}
</script>