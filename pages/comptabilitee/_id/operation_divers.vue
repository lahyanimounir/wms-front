<template>
    <div>


        <v-card elevation="0" style="border:1px solid #ddd">
            <div class=" py-5 px-3">

                <div class="subtitle-2 ">
                    Dossier : {{ dossier && dossier.denomination }} - {{ dossier && dossier.activitee }}
                </div>
                <div class="text--secondary">saisie operation diverses</div>
            </div>
            <v-row class="px-3">



                <v-col cols="5">
                    <label for="">Du *</label>
                    <div>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="editedItem.du" outlined dense hide-details prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.du" :max="editedItem.au"></v-date-picker>
                        </v-menu>

                    </div>
                </v-col>
                <v-col cols="5">
                    <label for="">Au *</label>
                    <div>
                        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="editedItem.au" outlined dense hide-details prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.au" :min="editedItem.du"></v-date-picker>
                        </v-menu>

                    </div>
                </v-col>

                <v-col cols="2">
                    <label for=""></label>
                    <v-btn color="primary" small class="mt-7" @click="search()">
                        Chercher
                    </v-btn>
                </v-col>





            </v-row>

            <v-row class="mx-0">
                <v-col cols="2">
                    <label for="">Journal</label>
                
                    <v-autocomplete hide-details v-model="editedItem.journal" return-object :rules="obligationRule" :items="journaux"
                        outlined dense placeholder="Journaux" item-text="nom" item-value="id">

                    </v-autocomplete>
                </v-col>
                <v-col cols="2">
                    <label for="">N° de piece</label>
                    <v-text-field v-model="editedItem.num_pieces" hide-details outlined dense></v-text-field>

                </v-col>
                <v-col cols="2">
                    <label for="">Date</label>
                    <v-menu ref="menu" v-model="menu3" :close-on-content-click="false" transition="scale-transition"
                        offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field persistent-hint v-model="editedItem.date" outlined dense hide-details
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker  @change="betweenDate()" :min="editedItem.du" :max="editedItem.au" v-model="editedItem.date" ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <label for="">Référence</label>
                    <v-text-field v-model="editedItem.reference_facture" hide-details outlined dense></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mx-0">
                <v-col cols="3" class="pl-3 pr-1 ">
                    <label for="">Compte</label>

                    <v-autocomplete v-model="editedItem.compte" return-object :rules="obligationRule" :items="items"
                        outlined dense placeholder="compte de contrepartie" item-text="intitulee" item-value="id">
                        <template slot="selection" slot-scope="{ item }">
                            {{ item.numero_compte }} - {{ item.intitulee }}
                        </template>
                        <template slot="item" slot-scope="{ item }">
                            {{ item.numero_compte }} - {{ item.intitulee }}
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="2" class="px-1 " v-if="editedItem.compte && editedItem.compte.c_g == 'COLLECTIF'">
                    <label for="">Tiers</label>
                    <v-autocomplete v-model="editedItem.tiers" :rules="obligationRule" :items="tiers" outlined dense
                        placeholder="Tiers" item-text="denomination" item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col cols="4" class="px-1 ">
                    <label for="">Libellé</label>
                    <v-text-field v-model="editedItem.libelle" outlined dense></v-text-field>
                </v-col>
                <v-col cols="1" class="px-1 ">
                    <label for="">Débit</label>
                    <v-text-field v-model="editedItem.debit"
                    @keyup="positive('d')"
                    type="number" outlined dense></v-text-field>
                </v-col>
                <v-col cols="1" class="px-1 ">
                    <label for="">Credit</label>
                    <v-text-field v-model="editedItem.credit"
                    @keyup="positive('c')"
                    type="number" outlined dense></v-text-field>

                </v-col>
                <v-col cols="1" class="px-1 ">
                    <v-btn color="primary" small class="mt-6 py-5" @click="addEcriture()">Ajouter</v-btn>
                </v-col>
            </v-row>

        </v-card>


        <v-card elevation="0" class="mt-3 px-3 py-3" style="border:1px solid #ddd">
            <div class="subtitle-2 ">
                Exercice du : {{ du }} au {{ au }}
            </div>
            <div class="pt-3">
                <v-data-table :headers="headers" hide-default-footer :items-per-page="-1" elevation="0" :items="rows" sort-by="calories">
                    <template v-slot:item.compte="{ item }">
                        <span>{{item && item.compte && item.compte.intitulee}}</span>    
                    </template>
                    <template v-slot:item.tiers="{ item }">
                        <div class="subtitle-2">{{item && item.tiers && item.tiers.denomination}}</div> 
                        <div class="text--secondary">{{item && item.tiers && item.tiers.activitee}} </div>   
                    </template>
            
                </v-data-table>
                <div style="display: flex;justify-content: space-between;">
                    <div style="width: 67%;"  class="subtitle-2" >
                        Total
                    </div> 
                    <div style="width: 33%;display: flex;justify-content: space-around;">
                        <div class="subtitle-2">{{ someDebit }}</div> 
                        <div class="subtitle-2">{{ someCredit }}</div> 
                    </div>
                </div>
               
                <v-alert
                    class="mt-3"
                    dense
                    outlined
                    v-if="someDebit != someCredit"
                    type="error"
                    >
                    Les champs Débit total et Crédit doivent être égaux.
                </v-alert>
            </div>
        </v-card>
    </div>

</template>

<script>
export default {
    data: () => ({
        someDebit:0,
        someCredit:0,
        du: null,
        au: null,
        menu: false,
        id: '',
        menu2: false,
        editedItem: {
            debit:'',
            credit:''
        },
        dossier: {},
        items: [],
        tiers: [],
        isCollectif: false,
        headers: [

            { text: 'compte', value: 'compte' },
            { text: 'Tiers', value: 'tiers' },
            { text: 'Libellé', value: 'libelle' },
            { text: 'Débit', value: 'debit' },
            { text: 'Crédit', value: 'credit' },
        ],
        rows: [],
        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
        ],
        menu3: false,
        journaux:[]
    }),
    watch:{
        rows(val){
            this.someDebit = 0
            this.someCredit = 0
            this.rows.forEach(item=>{
                if(item.credit){
                    this.someCredit = this.someCredit + parseInt(item.credit) 
                }
                if(item.debit){
                    this.someDebit = this.someDebit + parseInt(item.debit)
                } 
            });
      
            console.log(this.someDebit)
            console.log(this.someCredit)
        }
    },
    async created() {
        this.id = this.$route.params.id
        let url = process.env.Name_api + "/dossiers/" + this.id;
        this.dossier = await this.$myService.get(url)
        this.rows = this.dossier.ecritures

        url = process.env.Name_api + "/planComptables";
        this.items = await this.$myService.get(url)

        url = process.env.Name_api + "/tiers";
        this.tiers = await this.$myService.get(url)

        url = process.env.Name_api + "/journaux";
            this.journaux = await this.$myService.get(url)


    },
    methods: {
        async search() {
            let url = process.env.Name_api + "/ecriture/find/" + this.editedItem.du + "/" + this.editedItem.au + "/" + this.id;
           
            this.rows = await this.$myService.get(url)
            
            this.au = this.editedItem.au
            this.du = this.editedItem.du
            console.log(this.du)
        },
        async addEcriture(){
            
     
            let url = process.env.Name_api + "/ecriture";

            if(typeof this.editedItem.journal === 'object' && this.editedItem.journal !== null){
                this.editedItem.journal = this.editedItem.journal.id
            }

            if(typeof this.editedItem.compte === 'object' && this.editedItem.compte !== null){
                this.editedItem.compte = this.editedItem.compte.id
            }

            this.editedItem.dossier = this.id
                
           const aa = await this.$myService.post(url,this.editedItem);
           if(this.editedItem.debit){
               this.editedItem.credit = this.editedItem.debit
               console.log(this.editedItem)
            this.editedItem.debit = ''
           } else{
            this.editedItem.debit = this.editedItem.credit
            
            this.editedItem.credit = ''
           }
           console.log(aa)
           this.rows.push(aa.data)
        },
        async betweenDate(){
            if(!this.editedItem.du || !this.editedItem.au){
                this.editedItem.date = ''
                return;

            }
            let date = new Date(this.editedItem.date)
            let du = new Date(this.editedItem.du)
            let au = new Date(this.editedItem.au)
            if(date > du && date < au){

            }else{
                this.editedItem.date = ''
            }
            
        },
        positive(wich){
        
            if(this.editedItem.debit <= 0){
                this.editedItem.debit = ''
               
            }

            if(this.editedItem.credit <= 0){
                this.editedItem.credit = ''
            }
            if(wich == 'd'){
                this.editedItem.credit = ''
            }
            if(wich == 'c'){
                this.editedItem.debit = ''
            }
        }

    }

}
</script>