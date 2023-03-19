<template>
    <div>
        
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
        
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-card elevation="0" style="border:1px solid #ddd">
        <div class=" py-5 px-3 pb-0 d-flex" style="justify-content: space-between;">
            <p class="" style="font-size:2rem">Définition des types des plans comptables</p>
            <div class="d-flex flex-row-reverse">
                <v-btn color="primary" dark @click="enableTypeCompta">
                    Valider
                </v-btn>
            </div>
        </div>
        <p class=" py-5 px-3 pb-0">
            Selectionnez les types des plans comptables que vous souhaitez utiliser dans cet exercice
        </p>
        <v-data-table :single-select="true" :headers="headers" :items="rows" class="elevation-1 px-5 pl-comptable mt-6" v-model="selected"
            item-key="id" :page="offset" :items-per-page="limit" @update:page="pageUpdateFunction"
            @update:items-per-page="offsetWatch" :server-items-length="totalItems" show-select >
            <template v-slot:item.logo="{ item }">
                <td>
                    <img :src="defaultImage" style="width: 50px; height: 50px">
                </td>
            </template>
            <!-- <template v-slot:item.active="{ item }">
                <td>
                    <v-checkbox v-model="checkbox" color="primary" ></v-checkbox>
                </td>
            </template> -->
        </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        id: null,
        rows: [],
        offset: 1,
        limit: 10,
        totalItems: 500,
        selected: [],
        snackbar: false,
        timeout: 3000,
        text: '',
        headers: [
            {
                text: 'id',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            // { text: 'Numero de compte', value: 'numero_compte' },
            // { text: 'Intitulée', value: 'intitulee' },
            // { text: 'Debit / Credit', value: 'debit_credit' },
            // { text: 'C / G', value: 'c_g' },
            // { text: 'Type comptabilite', value: 'type_comptabilitee' },
            { text: 'Code', value: 'code' },
            { text: 'Intitulee', value: 'intitulee' },

        ],
    }),
    created() {
        this.initialize()
        this.getPlanComptable();

    },
    methods: {
        async getPlanComptable() {
            let url = process.env.Name_api + "/typeComptabilitees" + "?limit=" + this.limit + "&offset=" + this.offset;
            this.rows = await this.$myService.get(url)
        },
        async initialize() {
            this.id = this.$route.params.id
            let url = process.env.Name_api + "/exercice/" + this.id+"?params=type_comptabilitee";
            const res  = await this.$myService.get(url)
            this.selected = res[0].type_comptabilitee
            
            console.log(res);
        },
        pageUpdateFunction(page) {
            // this.pagination.page = page
            console.log('offset : ' + page)
            this.offset = page
            this.getPlanComptable()
        },
        offsetWatch(offset) {
            console.log('limit : ' + offset)
            this.limit = offset
            this.getPlanComptable()
        },
        async enableTypeCompta() {
            console.log(this.selected)
            const ids = this.selected.map(item => item.id)
            const url = process.env.Name_api + `/exercice/${this.id}/enableTypeCompta`
            const res = await this.$myService.post(url, ids)
            console.log(res);
            this.text = res.data[0].message
            this.snackbar = true
        }
    }

}
</script>