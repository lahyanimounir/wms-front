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
            <p class="" style="font-size:2rem">Choix des tiers</p>
            <div class="d-flex flex-row-reverse">
                <v-btn color="primary" dark  @click="enableTiers">
                    Valider
                </v-btn>
            </div>
        </div>
        <p class=" py-5 px-3 pb-0">
            Selectionnez les tiers que vous souhaitez utiliser dans cet exercice
        </p>

        <v-data-table :headers="headers" :items="tiers" class="elevation-1 px-5 pl-comptable mt-6" v-model="selected"
        item-key="id" show-select>
        </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        // defaultImage: 'https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png',
        
        tiers: [],
        editedItem:{
            id:'',
            denomination:'',
            immf:'',
            devise:'',
            activitee:'',
            ice:'',
            rc:'',
            adresse:'',
            ville:'',
            rib:'',
            telephone:'',

        },
        defaultItem:{
            id:'',
            denomination:'',
            immf:'',
            devise:'',
            activitee:'',
            ice:'',
            rc:'',
            adresse:'',
            ville:'',
            rib:'',
            telephone:'',
        },  
        drawer: null,
        id: null,
        checkbox: true,
        show: false,
        show1:false,
        selected: [],
        snackbar: false,
        timeout: 3000,
        text: '',
        headers: [
            // {
            //     text: 'Logo',
            //     align: 'start',
            //     sortable: false,
            //     value: 'logo',
            // },
            {text:'id',value:'id'},
            { text: 'Denomination', value: 'denomination' },
            { text: 'Identifiant fiscale', value: 'immf' },
        ],
    }),
    created() {
        this.initialize();
        this.getExercice()
    },
    methods: {
        async getExercice(){
            this.id = this.$route.params.id
            const url = process.env.Name_api+'/exercice/'+this.id+'?params=tiers'  
            const res = await this.$myService.get(url);
            console.log("resultas",res[0].tiers.map( (item) => item.id));
            this.selected = res[0].tiers;
        },
        async initialize() {
            this.id = this.$route.params.id
            const url = process.env.Name_api + '/tiers'
            const res = await this.$myService.get(url)
            this.tiers = res
        },
        async enableTiers(){
            const ids = this.selected.map(item => item.id)
            const url = process.env.Name_api + `/exercice/${this.id}/enableTiers`
            const res = await this.$myService.post(url, ids)
            this.text = res.data[0].message
            this.snackbar = true
            console.log(res);
        }
    }

}
</script>