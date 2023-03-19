<template>
    <div>


        <v-card elevation="0" style="border:1px solid #ddd">
            <div class=" py-5 px-3">

                <div style="font-size:18px">
                    Dossier :<b> {{ dossier && dossier.d_denomination }} </b>|
                    Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
                    <p>N° de piece : <b>{{ editedItem.num_pieces }}</b></p>
                </div>
                <div class="font-weight-bold" style="font-size:18px">Saisie Achat</div>
            </div>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>

            <v-form ref="ecritureForm">
                <v-row class="mx-0">
                    <v-col cols="2">
                        <label for="">Journal *</label>

                        <v-autocomplete hide-details v-model="editedItem.journal" return-object :rules="obligationRule"
                            :items="journaux" outlined dense placeholder="Journaux" item-text="nom" item-value="id">

                        </v-autocomplete>
                    </v-col>
                    <v-col cols="1" hidden>
                        <label for="">N° de piece</label>
                        <v-text-field :disabled="true" :filled="true" v-model="editedItem.num_pieces" hide-details outlined
                            dense></v-text-field>

                    </v-col>
                    <!-- <v-col cols="2">
                        <label for="">Date *</label>

                        <v-menu ref="menu" v-model="menu3" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field :rules="obligationRule" readonly v-model="editedItem.date" outlined dense
                                    hide-details prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker :min="du" :max="au" v-model="editedItem.date"></v-date-picker>
                        </v-menu>
                    </v-col> -->
                    <v-col cols="2">
                        <label for="">Date *</label>
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                            offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }" >
                                <v-text-field v-model="dateFormatted" persistent-hint v-bind="attrs" hint="JJ/MM/AAAA format"
                                prepend-icon="mdi-calendar" outlined dense
                                    :format="'DD/MM/AAAA'" :rules="obligationRule" @blur="date = parseDate(dateFormatted)"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false" :min="du" :max="au"></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="2">
                        <label for="">ECHEANCE</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.echeance" hide-details outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <label for="">Référence *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.reference_facture" hide-details outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="3" class="px-1 ">
                        <label for="">Libellé *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.libelle" outlined dense></v-text-field>
                    </v-col>


                </v-row>

                <v-row class="mx-0 mt-0">
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Plan comptable *</label>

                        <v-autocomplete :filter="getList" v-model="editedItem.plan_comptable" return-object :rules="editedItem.montant_ttc ? obligationRule : []"
                            :items="collectif" outlined dense placeholder="Plan comptable" item-text="numero_compte"
                            item-value="id" style="font-size:16px">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee.length > 5 && charsNumberCollectif != -1
                                    ? item.intitulee.substring(0, charsNumberCollectif) + '...' : item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Tiers</label>
                        <div class="d-flex">
                            <v-autocomplete v-model="editedItem.tiers" color="red" return-object
                                :disabled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')"
                                :filled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')"
                                :rules="editedItem.plan_comptable ? obligationRule : []"
                                :items="tiersShow" outlined dense placeholder="Tiers" item-text="denomination" item-value="id">
                                <template slot="selection" slot-scope="{ item }">
                                    {{ item.denomination }}
                                </template>
                            </v-autocomplete>
                            <div style="color: #5092f3;cursor: pointer;margin-left: 0.5rem;" @click="addTiers()" class="">
                            <div class="d-inline-block px-2"
                                style="border: 2px dotted; height: 38px; line-height: 36px; #5092f3;border-radius: 5px;cursor: pointer;">
                                <i class="fal fa-plus"></i>

                            </div>
                        </div>

                        </div>
                        
                        
                    </v-col>

                    <v-col cols="3" class="pl-3 pr-1 ">
                        <label for="">Compte contrepartie *</label>

                        <v-autocomplete :filter="getList" v-model="editedItem.compte" return-object :rules="obligationRule"
                            :items="contreparties" outlined dense placeholder="compte de contrepartie"
                            item-text="numero_compte" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee.length ? item.intitulee.substring(0,
                                    charsNumberContreparties) + '...' : item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    
                    <v-col cols="1" class="px-1 ">
                        <label for="">Taux TVA</label>
                        <v-text-field v-model="editedItem.taux_tva" type="number" outlined
                            dense>
                        <!-- add percentage icon inside centered vertically and horizontally -->
                        <template v-slot:append>
                            <span class="font-weight-bold" style="padding:5px 0">%</span>
                        </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3" class="px-1 ">
                        <label  for="">Code TVA</label>
                        <v-autocomplete  v-model="editedItem.code_tva" return-object :items="filteredTvas" :rules="obligationRule"
                            outlined dense placeholder="Code TVA" item-text="id" item-value="code">
                            <template slot="item" slot-scope="{ item }">
                                {{ item.code }} - {{ item.intitulee }}
                            </template>
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.code }} - {{ item.intitulee.length > 20 ? item.intitulee.substring(0, charsNumberTva)
                                    + '...' : item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row class="mx-0 mt-0" style="justify-content:end">
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TTC</label>
                        <v-text-field  @blur="addDecimals()" v-model="editedItem.montant_ttc"
                            @keyup="positive()" type="number" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT HT</label>
                        <v-text-field v-model="editedItem.montant_ht" type="number" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TVA</label>
                        <v-text-field v-model="editedItem.montant_tva" type="number" outlined dense></v-text-field>
                    </v-col>
                   
                    <v-col cols="2" class="px-1 text-center">
                        <v-btn v-if="isEdit" color="#EF9A9A" class="mt-5 py-5" @click="resetEcriture()">Annuler</v-btn>
                        <v-btn color="primary" large class="mt-5 py-5" @click="addEcriture()">{{ btnText }}</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>


        <v-card elevation="0" class="mt-3 px-3 py-3" style="border:1px solid #ddd">
            <div class="subtitle-2 ">
                Ecritures :
            </div>
            <div class="pt-3">
                <table width="100%" class="table styled-table">
                    <thead class="text-left">
                        <tr>
                            <th class="subtitle-2">Date</th>
                            <th class="subtitle-2">Compte</th>
                            <th class="subtitle-2">Tiers</th>
                            <th class="subtitle-2">Libelle</th>
                            <th class="subtitle-2">Debit</th>
                            <th class="subtitle-2">Credit</th>
                            <th class="subtitle-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tempEcritures" :key="index">
                            <td>{{ item.isNewOne ? item.date.split('-').reverse().join('/'):'-' }}</td>
                            <td>{{ item.compte }}</td>
                            <td>{{ item.isNewOne ? item.tiers:'-'}}</td>
                            <td>{{ item.isNewOne ? item.libelle:'-' }}</td>
                            <td>{{ item.debit }}</td>
                            <td>{{ item.credit }}</td>
                      
                            <td  class="text-center">
                                <v-btn v-if="item.isNewOne" icon @click="deleteEcriture([ ...Array(item.nbrEcriture).keys() ].map( i => i+index))">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-btn v-if="item.isNewOne" icon @click="editEcriture([ ...Array(item.nbrEcriture).keys() ].map( i => i+index))">
                                    <v-icon>mdi-pencil </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="subtitle-2">Totaux</td>
                            <td class="subtitle-2">{{ someDebit }}</td>
                            <td class="subtitle-2">{{ someCredit }}</td>
                        </tr>
                    </tfoot>
                </table>
                <v-alert class="mt-3" dense outlined v-if="someDebit != someCredit" type="error">
                    Les champs Débit total et Crédit doivent être égaux.
                </v-alert>
            </div>
            <div class="mt-2">
                <v-btn color="primary" small class="mt-6 py-5" @click="allValid()">Valider</v-btn>
            </div>
        </v-card>
        <v-dialog v-model="dialogConfirmation" max-width="520px">
            <v-card>
                <v-card-title class="text-h6">Êtes-vous sûr de bien vouloir valider cet ecriture
                    ?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                    <v-btn color="blue darken-1" text @click="confimEcriture">Confirmer</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
</div>
</template>

<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #505c59;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
</style>
<script>
export default {
    data: (vm) => ({
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        nbrEcriture:3,
        menu1: false,
        someDebit: 0,
        someCredit: 0,
        du: null,
        au: null,
        menu: false,
        id: '',
        menu2: false,
        editedItem: {
            montant_tva: '',
            montant_ttc: '',
            montant_ht: '',
            taux_tva: '',
            code_tva: '',
            echeance: '',
            tiers: '',
            compte: '',
            libelle: '',
            reference_facture: '',
            journal: '',
            plan_comptable: '',
            date: '',
            num_pieces: '',

        },
        defaultItem: {
            montant_tva: '',
            montant_ttc: '',
            montant_ht: '',
            taux_tva: '',
            code_tva: '',
            echeance: '',
            tiers: {},
            compte: {},
            libelle: '',
            reference_facture: '',
            journal: {},
            plan_comptable: {},
            date: '',
            num_pieces: '',

        },
        exerciceId: '',
        exercice: {},
        dossier: {},
        contreparties: [],
        tiers: [],
        isCollectif: false,
        dossier: {},
        collectif: [],
        rows: [],
        newEcritures: [],
        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
        ],
        menu3: false,
        journaux: [],
        journal: 'AC',
        month: '',
        ecritures: [],
        dialogConfirmation: false,
        tiersShow: [],
        tvas: [],
        tempEcritures: [],
        selectedTiers: {},
        selectedTva: {},
        charsNumberTva: 25,
        charsNumberCollectif: 10,
        charsNumberTiers: 7,
        charsNumberContreparties: 18,
        isUpdate:false,
        isEdit:false,
        editedItems:[],
        previousEditedItem:{},
        snackbar: false,
        timeout: 3000,
        text: '',
        filteredTvas: [],

    }),
    computed:{
        btnText(){
            return this.isEdit ? 'Editer' : 'Ajouter'
        },
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
            if (isNaN(new Date(val))) return
            // this.month = new Date(val).getMonth() + 1
            // let incr
            // let aaa = this.ecritures.filter(item => item.num_pieces.split('/')[0] == this.journal && new Date(item.date).getMonth() + 1 == this.month)
            // if (aaa.length > 0) {
            //     incr = aaa[aaa.length - 1].num_pieces.split('/')[2]
            //     incr = this.zeroPad(parseInt(incr) + 1, 5)
            //     this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            // }
            // else {
            //     incr = this.zeroPad(1, 5)
            //     this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            // }
            // if (this.editMode) return
            this.getNumPiece()
            this.editedItem.echeance = this.calculateEcheance()
        },
        newEcritures(val) {
            this.updateTotal()
        },
        editedItems(val){
            this.updateTotal()
        },
        'editedItem.montant_ht'(val) {
            if (val && this.editedItem.taux_tva && this.editedItem.montant_ttc) {
                // this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
             }else if(val && this.editedItem.taux_tva ){
               
                this.editedItem.montant_tva = (this.editedItem.montant_ht * this.editedItem.taux_tva) / 100
             }
        },
        // 'editedItem.montant_tva'(val) {
        //     if (val && this.editedItem.taux_tva) {
        //         // this.editedItem.montant_ht = (this.editedItem.montant_ttc - this.editedItem.montant_tva).toFixed(2)
        //         this.editedItem.montant_ht = (this.editedItem.taux_tva * 100) /this.editedItem.taux_tva
        //     }
        // },
        'editedItem.taux_tva'(val) {
            this.filteredTvas = val ? this.tvas.filter(item => item.taux == val) : this.tvas
            this.editedItem.taux_tva = val
            if (val && this.editedItem.montant_ttc) {
                // this.editedItem.montant_ht = (this.editedItem.montant_ttc / (1 + (val / 100))).toFixed(2)
                // this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
                this.editedItem.montant_ht = (this.editedItem.montant_ttc / (1 + (this.editedItem.taux_tva / 100))).toFixed(2)
                this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
            }else if(val && this.editedItem.montant_ht){
                this.editedItem.montant_tva = (this.editedItem.montant_ht * this.editedItem.taux_tva) / 100

            }
        },
        'editedItem.montant_ttc'(val) {
            // if (val == 0 || val == null) {
            //     this.editedItem.montant_ht = ''
            //     this.editedItem.montant_tva = ''
            //     return
            // }
            // if (val && this.editedItem.taux_tva && !this.isUpdate) {
            //     if (val.toString().split('.').length == 1) {
            //         val = val + '.00'
            //     }
            //     else if (val.toString().split('.')[1].length == 1) {
            //         val = val + '0'
            //     }

                this.editedItem.montant_ht = (this.editedItem.montant_ttc / (1 + (this.editedItem.taux_tva / 100))).toFixed(2)
                this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
            // }
            this.isUpdate = false
        },
        'editedItem.code_tva'(val) {
            let tva = this.tvas.find(item => item.id == val?.id)
            this.editedItem.taux_tva = tva?.taux
        },
        'editedItem.plan_comptable'(val) {
            this.tiersShow = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
        },
        'editedItem.tiers'(val) {
            console.log('val : ', val)
            this.selectedTiers = this.tiers.find(item => item.id == val?.id)
            this.editedItem.echeance = this.calculateEcheance()
            this.editedItem.compte = this.selectedTiers?.compte_contrepartie
            this.editedItem.code_tva = this.selectedTiers?.tva
        },
        'editedItem.reference_facture'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
        },
        'editedItem.compte'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
            this.test = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
        },
        // 'editedItem.date'(val) {
        //     if (isNaN(new Date(val))) return
        //     this.month = new Date(val).getMonth() + 1
        //     let incr
        //     let aaa = this.ecritures.filter(item => item.num_pieces.split('/')[0] == this.journal && new Date(item.date).getMonth() + 1 == this.month)
        //     if (aaa.length > 0) {
        //         incr = aaa[aaa.length - 1].num_pieces.split('/')[2]
        //         incr = this.zeroPad(parseInt(incr) + 1, 5)
        //         this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
        //     }
        //     else {
        //         incr = this.zeroPad(1, 5)
        //         this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
        //     }
        //     this.editedItem.echeance = this.calculateEcheance()

        // },
        // 'editedItem.journal'(val) {
        //     let incr
        //     let aaa = this.ecritures.filter(item => item.num_pieces.split('/')[0] == this.journal && new Date(item.date).getMonth() + 1 == this.month)
        //     if (aaa.length > 0) {
        //         incr = aaa[aaa.length - 1].num_pieces.split('/')[2]
        //         incr = this.zeroPad(parseInt(incr) + 1, 5)
        //         this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
        //     }
        //     else {
        //         incr = this.zeroPad(1, 5)
        //         this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
        //     }
        //     console.log('aaa', aaa);


        // },

    },

    async created() {
        this.id = this.$route.params.id
        let url = process.env.Name_api + "/exercice/" + this.id + "?params=AC";
        let exercice = await this.$myService.get(url)
        url = process.env.Name_api + "/planComptables";
        let contreparties = await this.$myService.get(url)
        url = process.env.Name_api + "/tva";
        let tvas = await this.$myService.get(url)

        if (exercice && exercice.data != null) {
            this.dossier = { d_id: exercice.d_id, d_activitee: exercice.d_activitee, d_denomination: exercice.d_denomination }
            this.exercice = exercice.data
            this.journaux = exercice.data.journaux
            this.tiers = exercice.data.tiers;
            this.collectif = exercice.collectif;
            this.contreparties = contreparties;
            this.tvas = tvas;
            this.filteredTvas = tvas;
            this.du = this.exercice.du
            this.au = this.exercice.au
            // this.editedItem.date = this.exercice.du
            this.ecritures = exercice.data.ecritures;
            let query = this.$route.query
            let ecriture = localStorage.getItem('ecriture')
            this.date = this.du

            if (ecriture != null && query.hasOwnProperty('message') && Object.keys(query).length){
                let ec = JSON.parse(ecriture)
                console.log('ec', ec);
                this.editedItem = ec
                // this.editedItem.tiers = ec.tiers
                // this.editedItem.plan_comptable = ec.plan_comptable
            }
            let num_pieces = this.$route.query.num_pieces
            let mode = this.$route.query.mode
            if(num_pieces && mode == 'edit'){
                this.editMode = true
                this.editedItem.num_pieces = num_pieces
                let url = process.env.Name_api + "/exercice/" + this.id + "/getEcritures?num_pieces=" + num_pieces;
                let ecritures = await this.$myService.get(url)
                // this.rows = ecritures
                // this.ecritures = ecritures
                console.log("ecritures", ecritures)
                // console.log("this.rows", this.rows)
                // console.log("ecritures", ecritures)
            }

            // this.items = exercice.data.planComptable;
        }


    },
    methods: {
        async getNumPiece(){
            let url = process.env.Name_api + "/exercice/" + this.id + "/getNumPiece";
            let params = {
                date: this.date,
                journal: 'Achat'
            }
            let res = await this.$myService.get(url, params)
            this.editedItem.num_pieces = res.num_pieces
            console.log('this edited item', this.editedItem);
            
        },
        async allValid() {
            if (this.someCredit == this.someCredit && this.newEcritures.length > 0) {
                this.dialogConfirmation = true
            }
            else {
                return
            }

        },
        async search() {
            let url = process.env.Name_api + "/ecriture/find/" + this.editedItem.du + "/" + this.editedItem.au + "/" + this.id;

            this.rows = await this.$myService.get(url)

            this.au = this.editedItem.au
            this.du = this.editedItem.du
            console.log(this.du)
        },
        async addEcriture() {
            this.nbrEcriture = this.editedItem.montant_ttc ? 3 : 2 
            let index =  this.nbrEcriture == 3 ? 0 : 1
            if (!this.$refs.ecritureForm.validate() || (this.editedItem.montant_ht == 0 && this.editedItem.montant_ttc == 0)) {
                return
            }
            if(this.isEdit){
                for(let i = index; i < 3 ; i++){
                    let compte, compteObj;
                    if(i == 0){
                        compte = `${this.editedItem?.plan_comptable?.numero_compte} - ${this.editedItem?.plan_comptable?.intitulee}`
                        compteObj = this.editedItem?.plan_comptable
                    }
                    else if(i == 1){
                        compte = `${this.editedItem?.compte?.numero_compte} - ${this.editedItem?.compte?.intitulee}`
                        compteObj = this.editedItem?.compte
                    }
                    else{
                        compte = `${this.editedItem.code_tva.compte?.numero_compte} - ${this.editedItem.code_tva.compte?.intitulee}`
                        compteObj = this.editedItem.code_tva?.compte
                    }
                    let editedEcriture = {
                        date:this.date,
                        compte: compte,
                        tiers: this.editedItem.tiers?.denomination,
                        libelle: this.editedItem?.libelle,
                        taux_tva: this.editedItem?.taux_tva,
                        nbrEcriture: this.nbrEcriture,
                        isNewOne: i-index == 0 ? true : false,
                    }
                    this.tempEcritures[this.editedItems[i - index]] = editedEcriture
                    let debit, credit;
                    if (i == 0) {
                        credit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ttc : '';
                        debit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_ttc : '';
                    } else if (i == 1) {
                        if (this.editedItem.montant_ttc) {

                            debit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ht : ''
                            credit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_ht : '';
                        } else {
                            debit = this.editedItem.montant_ht > 0 ? this.editedItem.montant_ht : ''
                            credit = this.editedItem.montant_ht < 0 ? this.editedItem.montant_ht : '';
                        }

                    } else {
                        if (this.editedItem.montant_ttc) {
                            debit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_tva : ''
                            credit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_tva : '';
                        } else {
                            debit = this.editedItem.montant_tva > 0 ? this.editedItem.montant_tva : ''
                            credit = this.editedItem.montant_tva < 0 ? this.editedItem.montant_tva : '';
                        }
                    }
                    credit = Math.abs(credit)
                    debit = Math.abs(debit)
                    this.tempEcritures[this.editedItems[i - index]].debit = debit
                    this.tempEcritures[this.editedItems[i - index]].credit = credit

                    let row = {
                        num_pieces: this.editedItem.num_pieces,
                        journal: this.editedItem.journal,
                        date: this.date,
                        echeance: this.editedItem.echeance,
                        reference_facture: this.editedItem.reference_facture,
                        libelle: this.editedItem.libelle,
                        compte: compteObj,
                        tiers: this.editedItem.tiers.id,
                        debit: debit,
                        credit: credit,
                        taux_tva : this.editedItem.taux_tva
                    }
                    this.newEcritures[this.editedItems[i -  index]] = row
                }
                // this.editedItem = this.previousEditedItem
                this.isEdit = false
                this.editedItems = []
            }
            else{
               let isNewOne = true;
            for (let i = index ; i < 3; i++) {
                let compte, compteObj;
                if (i == 0) {
                    compte = `${this.editedItem?.plan_comptable?.numero_compte} - ${this.editedItem?.plan_comptable?.intitulee}`
                    compteObj = this.editedItem?.plan_comptable
                }
                else if (i == 1) {
                    compte = `${this.editedItem?.compte?.numero_compte} - ${this.editedItem?.compte?.intitulee}`
                    compteObj = this.editedItem?.compte
                }
                else {
                    compte = `${this.editedItem.code_tva.compte?.numero_compte} - ${this.editedItem.code_tva.compte?.intitulee}`
                    compteObj = this.editedItem.code_tva?.compte
                }
                this.tempEcritures.push({
                    date: this.date,
                    compte: compte,
                    tiers: `${this.editedItem?.tiers?.denomination}`,
                    libelle: this.editedItem?.libelle,
                    taux_tva:this.editedItem?.taux_tva,
                    nbrEcriture: this.nbrEcriture,
                    isNewOne: isNewOne
                })
                let debit;
                let credit;
                if (i == 0) {
                    credit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ttc : '';
                    debit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_ttc : '';
                } else if (i == 1) {
                    if(this.editedItem.montant_ttc){

                        debit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ht : ''
                        credit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_ht : '';
                    }else{
                        debit = this.editedItem.montant_ht > 0 ? this.editedItem.montant_ht : ''
                        credit = this.editedItem.montant_ht < 0 ? this.editedItem.montant_ht : '';
                    }
                
                } else {
                    if(this.editedItem.montant_ttc){
                        debit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_tva : ''
                        credit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_tva : '';
                    }else{
                        debit = this.editedItem.montant_tva > 0 ? this.editedItem.montant_tva : ''
                        credit = this.editedItem.montant_tva < 0 ? this.editedItem.montant_tva : '';
                    }
                }
                credit = Math.abs(credit)
                debit = Math.abs(debit)
                this.tempEcritures[this.tempEcritures.length - 1].credit = credit
                this.tempEcritures[this.tempEcritures.length - 1].debit = debit
                console.log('this edited item', this.editedItem)
                let row = {
                    num_pieces: this.editedItem.num_pieces,
                    journal: this.editedItem.journal,
                    date: this.date,
                    echeance: this.editedItem.echeance,
                    reference_facture: this.editedItem.reference_facture,
                    libelle: this.editedItem.libelle,
                    compte: compteObj,
                    tiers: this.editedItem.tiers.id,
                    taux_tva:this.editedItem?.taux_tva,
                    debit: debit,
                    credit: credit,

                }
                console.log('row', row)
                this.newEcritures.push(row)
                isNewOne = false
            }
            console.log('this.tempEcriture', this.tempEcritures)

            }
            localStorage.removeItem('ecriture')
            this.$refs.ecritureForm.resetValidation()
            this.editedItem.montant_ht = ''
            this.editedItem.montant_tva = ''
            this.editedItem.montant_ttc = ''




        },
        async betweenDate() {
            if (!this.editedItem.du || !this.editedItem.au) {
                this.editedItem.date = ''
                return;
            }
            let date = new Date(this.editedItem.date)
            let du = new Date(this.editedItem.du)
            let au = new Date(this.editedItem.au)
            if (date > du && date < au) {

            } else {
                this.editedItem.date = ''
            }

        },
        positive() {

        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        closeDelete() {
            this.dialogDelete = false
        },
        async confimEcriture() {
            let url = process.env.Name_api + "/ecriture/" + this.exercice.id;
            const aa = await this.$myService.post(url, this.newEcritures);
            console.log('aa', aa)
            // this.ecritures = [...this.ecritures, ...this.newEcritures]
            this.newEcritures = []
            this.dialogConfirmation = false
            console.log('ecriture', this.ecritures);
            // this.incrementSuffix()
            this.getNumPiece()
            this.tempEcritures = []
            this.clearInputs()
            this.$refs.ecritureForm.resetValidation()


        },
        incrementSuffix() {
            let incr
            let aaa = this.ecritures.filter(item => item.num_pieces.split('/')[0] == this.journal && new Date(item.date).getMonth() + 1 == this.month)
            if (aaa.length > 0) {
                incr = aaa[aaa.length - 1].num_pieces.split('/')[2]
                incr = this.zeroPad(parseInt(incr) + 1, 5)
                this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            }
            else {
                incr = this.zeroPad(1, 5)
                this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            }
        },
        clearInputs() {
            this.editedItem.reference_facture = ''
            this.editedItem.libelle = ''
            this.editedItem.echeance = ''
            this.editedItem.reference_facture = ''
            this.editedItem.plan_comptable = ''
            this.editedItem.tiers = ''
            this.editedItem.compte = ''
            this.editedItem.code_tva = ''
            this.editedItem.montant_ht = ''
            this.editedItem.montant_tva = ''
            this.editedItem.montant_ttc = ''
        },
        calculateEcheanceFinMois(d, duration) {
            let date = new Date(d)
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            let nextMonth = new Date(year, month + 1, 1)
            let nextMonthDay = nextMonth.getDate()
            let nextMonthYear = nextMonth.getFullYear()
            let nextMonthMonth = nextMonth.getMonth()
            let echeance = new Date(nextMonthYear, nextMonthMonth, nextMonthDay + duration)
            echeance = echeance.toLocaleDateString('en-GB')
            return echeance
        },
        calculateEcheanceDateFixe(d, duration) {
            let date = new Date(d)
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            let echeance = new Date(year, month, day + duration)
            echeance = echeance.toLocaleDateString('en-GB')
            return echeance
        },
        calculateEcheance() {
            let type = this.selectedTiers?.type_echeance
            console.log('tiers', this.selectedTiers)
            let duration = this.selectedTiers?.echeance?.nbr_jours
            let date = this.date
            if (date && duration && type) {
                if (type == 'fin_du_moi') {
                    return this.calculateEcheanceFinMois(date, duration)
                }
                if (type == 'date_facturation') {
                    return this.calculateEcheanceDateFixe(date, duration)
                }
            }
            else if (date) {
                return new Date(date).toLocaleDateString('en-GB')
            }
            else {
                return ''
            }
        },
        addDecimals() {
            // this.editedItem.montant_ttc = (Math.round(this.editedItem.montant_ttc * 100) / 100).toFixed(2)
        },
        addTiers(){
            // save edited item in local storage and redirect to tiers page
            localStorage.setItem('ecriture', JSON.stringify(this.editedItem))
            this.$router.push({path:'/settings/tiers', query:{exerciceId:this.id,previousMenu:'achat'}})

        },
        editEcriture(item) {
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.previousEditedItem = JSON.parse(JSON.stringify(this.editedItem))
            this.isUpdate = true
            this.isEdit = true
            this.editedItems = item
            console.log('new Ecr', this.newEcritures)
            if(item.length < 3){
                let ecriture1 = this.newEcritures[item[0]]
                let ecriture2 = this.newEcritures[item[1]]
                console.log('ecriture1', ecriture1)
                console.log('ecriture2', ecriture2)
                this.editedItem.journal = this.journaux.find(i=>i.id == ecriture1.journal?.id)
                this.date = ecriture1.date
                this.editedItem.tiers = this.tiers.find(i=>i.id == ecriture1.tiers)
                this.editedItem.libelle = ecriture1.libelle
                this.editedItem.reference_facture = ecriture1.reference_facture
                this.editedItem.taux_tva = ecriture1.taux_tva
                this.editedItem.compte = ecriture1.compte
                this.editedItem.code_tva = this.tvas.find(i=>i.compte?.id == ecriture2.compte?.id)
                this.editedItem.echeance = ecriture1.echeance
                this.editedItem.montant_ht = ecriture1.debit != 0 ? ecriture1.debit : ecriture1.credit *-1
                this.editedItem.montant_tva = ecriture2.debit != 0 ? ecriture2.debit : ecriture2.credit*-1

            }
            else{
                console.log('here edit > 3')
            item.forEach((i,index)=>{
                let ecriture = this.newEcritures[i]
                if(index == 0){
                    this.date = ecriture.date
                    this.editedItem.tiers = this.tiers.find(i=>i.id == ecriture.tiers)
                    this.editedItem.libelle = ecriture.libelle
                    this.editedItem.reference_facture = ecriture.reference_facture
                    this.editedItem.taux_tva = ecriture.taux_tva
                    this.editedItem.plan_comptable = ecriture.compte
                    this.editedItem.montant_ttc = ecriture.debit != 0 ? ecriture.debit *-1 : ecriture.credit
                    this.editedItem.journal = this.journaux.find(i=>i.id == ecriture.journal.id)

                }
                else if (index == 1){
                    this.editedItem.montant_ht = ecriture.debit != 0 ? ecriture.debit : ecriture.credit *-1
                    this.editedItem.compte = ecriture.compte
                }
                else if (index == 2){
                    this.editedItem.montant_tva = ecriture.debit != 0 ? ecriture.debit : ecriture.credit *-1
                    this.editedItem.code_tva = this.tvas.find(i=>i.compte?.id == ecriture.compte?.id)
                }
            })
        }
            // this.editedIndex = this.ecritures.indexOf(item)
            // this.editedItem = Object.assign({}, item)
            // this.dialog = true

        },
        deleteEcriture(item) {
            this.newEcritures.splice(item[0],item.length)
            this.tempEcritures.splice(item[0],item.length)
            this.isEdit = false
        },
        resetEcriture() {
            this.editedItem = this.previousEditedItem
            this.isEdit = false
        },
        updateTotal(){
            this.someDebit = 0
            this.someCredit = 0
            if (this.newEcritures && this.newEcritures.length > 0) {
                this.newEcritures.forEach(item => {
                    if (item.credit) {
                        // this.someCredit = this.someCredit + parseInt(item.credit)
                        this.someCredit = (this.someCredit + parseFloat(item.credit))
                    }
                    if (item.debit) {
                        // this.someDebit = this.someDebit + parseInt(item.debit)
                        this.someDebit = (this.someDebit + parseFloat(item.debit))
                    }
                });
            }
            this.someCredit = this.someCredit.toFixed(2)
            this.someDebit = this.someDebit.toFixed(2)
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null
            if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(date)) && date !== null) {
                this.showToast('Invalide date (jj/mm/aaaa)')
                return null
            }
            if (!(/(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/.test(date))) {
                this.showToast('Invalide date')
                return null
            }
            // date should not be greate than this.au or less than this.du
            let d = new Date(this.parseDateToISO(date))
            let du = new Date((this.du))
            let au = new Date((this.au))
            console.log(d, du, au)
            if (d > au || d < du && date !== null) {
                this.showToast('La date doit être comprise entre ' + this.formatDate(this.du) + ' et ' + this.formatDate(this.au))
                return null
            }
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        parseDateToISO(date) {
            if (!date) return null
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        showToast(message) {
            this.text = message
            this.snackbar = true

        },
        getList(item, queryText, itemText) {
            return itemText.toLocaleLowerCase().startsWith(queryText.toLocaleLowerCase())
        }

    }

}
</script>