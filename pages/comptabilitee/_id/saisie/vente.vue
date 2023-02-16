<template>
    <div>


        <v-card elevation="0" style="border:1px solid #ddd">
            <div class=" py-5 px-3">

                <div style="font-size:18px">
                    Dossier :<b> {{ dossier && dossier.d_denomination }} </b>-<b> {{ dossier && dossier.d_activitee }} </b>| Exercice du : <b>{{ du }}</b> au <b>{{ au }}</b>
                    <p>N° de piece : <b>{{ editedItem.num_pieces }}</b></p>
                </div>
                <div class="text--secondary">Saisie de vente</div>
            </div>

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
                        <v-text-field :disabled="true" :filled="true" v-model="editedItem.num_pieces" hide-details
                            outlined dense></v-text-field>

                    </v-col>
                    <v-col cols="2">
                        <label for="">Date *</label>

                        <v-menu ref="menu" v-model="menu3" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field :rules="obligationRule" readonly v-model="editedItem.date" outlined dense hide-details
                                    prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker :min="du" :max="au" v-model="editedItem.date"></v-date-picker>
                        </v-menu>
                    </v-col>
                   
                    <v-col cols="2">
                        <label for="">ECHEANCE</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.echeance" hide-details outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <label for="">Référence *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.reference_facture" hide-details
                            outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="3" class="px-1 ">
                        <label for="">Libellé *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.libelle" outlined dense></v-text-field>
                    </v-col>
                    
                    
                </v-row>

                <v-row class="mx-0 mt-0">
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Plan comptable *</label>

                        <v-autocomplete v-model="editedItem.plan_comptable" return-object :rules="obligationRule"
                            :items="collectif" outlined dense placeholder="Plan comptable" item-text="numero_compte"
                            item-value="id" style="font-size:16px">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee.length > 5 && charsNumberCollectif != -1 ?item.intitulee.substring(0, charsNumberCollectif) + '...' : item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Tiers</label>
                        <v-autocomplete v-model="editedItem.tiers" color="red"
                            return-object
                            :disabled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')"
                            :filled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')" :items="tiersShow"
                            outlined dense placeholder="Tiers" item-text="denomination" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.denomination }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    
                    <v-col cols="3" class="pl-3 pr-1 ">
                        <label for="">Compte contrepartie *</label>

                        <v-autocomplete v-model="editedItem.compte" return-object :rules="obligationRule"
                            :items="contreparties" outlined dense placeholder="compte de contrepartie"
                            item-text="numero_compte" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee.length ? item.intitulee.substring(0, charsNumberContreparties) + '...' : item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="3" class="px-1 ">
                        <label for="">Code TVA</label>
                        <v-autocomplete  v-model="editedItem.code_tva" return-object :items="tvas" :rules="obligationRule" outlined dense placeholder="Code TVA"
                            item-text="id" item-value="code">
                            <template slot="item" slot-scope="{ item }">
                                {{ item.code }} - {{ item.intitulee }}
                            </template>
                            <template slot="selection" slot-scope="{ item }">
                                {{item.code}} - {{ item.intitulee.length > 20 ? item.intitulee.substring(0, charsNumberTva) + '...' : item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="1" class="px-1 ">
                        <label for="">Taux TVA</label>
                        <v-text-field :disabled="true" :filled="true" v-model="editedItem.taux_tva" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mx-0 mt-0" style="justify-content:end">
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TTC</label>
                        <v-text-field :rules="obligationRule" @blur="addDecimals()" v-model="editedItem.montant_ttc" @keyup="positive()" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT HT</label>
                        <v-text-field v-model="editedItem.montant_ht"  type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TVA</label>
                        <v-text-field v-model="editedItem.montant_tva"  type="number" outlined
                            dense></v-text-field>
                    </v-col>
                   
                    <v-col cols="2" class="px-1 text-center">
                        <v-btn color="primary" large class="mt-5 py-5" @click="addEcriture()">Ajouter</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>


        <v-card elevation="0" class="mt-3 px-3 py-3" style="border:1px solid #ddd">
            <div class="subtitle-2 ">
                Ecritures :
            </div>
            <div class="pt-3">
                <table width="100%" class="table styled-table" >
                    <thead class="text-left">
                        <tr>
                            <th class="subtitle-2">Date</th>
                            <th class="subtitle-2">Compte</th>
                            <th class="subtitle-2">Tiers</th>
                            <th class="subtitle-2">Libelle</th>
                            <th class="subtitle-2">Debit</th>
                            <th class="subtitle-2">Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tempEcritures" :key="index">
                            <td>{{ item?.date }}</td>
                            <td>{{ item?.compte }}</td>
                            <td>{{ item?.tiers }}</td>
                            <td>{{ item?.libelle }}</td>
                            <td>{{ item?.debit }}</td>
                            <td>{{ item?.credit }}</td>
                        </tr>
                        <!-- <tr>
                            <td >01/01/2020</td>
                            <td>21117500 - Compte de l'exploitant</td>
                            <td>STE DROGUERIE</td>
                            <td>510 Compte de l'exploitant</td>
                            <td></td>
                            <td>544.00</td>
                        </tr>
                        <tr>
                            <td ></td>
                            <td>1111-Actionnaires, capital souscrit-non appelé</td>
                            <td>-</td>
                            <td>-</td>
                            <td>453.33</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td ></td>
                            <td>83-Opérations de crédit-bail</td>
                            <td>-</td>
                            <td>-</td>
                            <td>90.67</td>
                            <td></td>
                        </tr> -->
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="subtitle-2">Totaux</td>
                            <td class="subtitle-2">{{ someDebit }}</td>
                            <td class="subtitle-2">{{ someCredit }}</td>
                        </tr>
                    </tfoot>
                </table>
                <!-- <div style="display: flex;justify-content: space-between;">
                    <div style="width: 67%;" class="subtitle-2">
                        Total
                    </div>
                    <div style="width: 33%;display: flex;justify-content: space-around;">
                        <div class="subtitle-2">{{ someDebit }}</div>
                        <div class="subtitle-2">{{ someCredit }}</div>
                    </div>
                </div> -->

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

<script>
export default {
    data: () => ({
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
        tempEcritures:[],
        selectedTiers:{},
        selectedTva:{},
        charsNumberTva: 25,
        charsNumberCollectif: 10,
        charsNumberTiers: 7,
        charsNumberContreparties: 18,
    }),
    watch: {
        newEcritures(val) {
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
        'editedItem.montant_ht'(val){
            if (val && this.editedItem.taux_tva) {
                this.editedItem.montant_tva = (val * (this.editedItem.taux_tva / 100)).toFixed(2)
            }
        },
        'editedItem.montant_tva'(val){
            if (val && this.editedItem.taux_tva) {
                this.editedItem.montant_ht = (val / (this.editedItem.taux_tva / 100)).toFixed(2)
            }
        },
        'editedItem.taux_tva'(val) {
            if (val && this.editedItem.montant_ttc) {
                this.editedItem.montant_ht = (this.editedItem.montant_ttc / (1 + (val / 100))).toFixed(2)
                this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
            }
        },
        'editedItem.montant_ttc'(val) {
            // this.editedItem.montant_ht = val / (1 + (this.editedItem.taux_tva / 100))
            // this.editedItem.montant_tva = val - this.editedItem.montant_ht
            // val can't be null or 0
            if(val == 0 || val == null) {
                this.editedItem.montant_ht = ''
                this.editedItem.montant_tva = ''
                return
            }
            if (val && this.editedItem.taux_tva) {
                // add 2 decimals to the value
                if(val.toString().split('.').length == 1) {
                    val = val + '.00'
                }
                else if(val.toString().split('.')[1].length == 1) {
                    val = val + '0'
                }
                this.editedItem.montant_ht = (val / (1 + (this.editedItem.taux_tva / 100))).toFixed(2)
                this.editedItem.montant_tva = (val - this.editedItem.montant_ht).toFixed(2)
            }
        },
        'editedItem.code_tva'(val){
            let tva = this.tvas.find(item => item.id == val.id)
            this.editedItem.taux_tva = tva?.taux
            this.selectedTva = tva
            this.editedItem.montant_ht = (this.editedItem.montant_ttc / (1 + (this.editedItem.taux_tva / 100))).toFixed(2)
            this.editedItem.montant_tva = (this.editedItem.montant_ttc - this.editedItem.montant_ht).toFixed(2)
        },
        'editedItem.plan_comptable'(val){
            this.tiersShow = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
        },
        'editedItem.tiers'(val){
            this.selectedTiers = this.tiers.find(item => item.id == val)
            this.editedItem.echeance = this.calculateEcheance()
        },
        'editedItem.reference_facture'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
        },
        'editedItem.compte'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
            this.test = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
        },
        'editedItem.date'(val) {
            if (isNaN(new Date(val))) return
            this.month = new Date(val).getMonth() + 1
            let incr
            let aaa = this.ecritures.filter(item => item.num_pieces.split('/')[0] == this.journal && new Date(item.date).getMonth() + 1 == this.month)
            console.log('here ',aaa)    
            if (aaa.length > 0) {
                incr = aaa[aaa.length - 1].num_pieces.split('/')[2]
                incr = this.zeroPad(parseInt(incr) + 1, 5)
                this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            }
            else {
                incr = this.zeroPad(1, 5)
                this.editedItem.num_pieces = this.journal + '/' + this.month + '/' + incr
            }
            this.editedItem.echeance = this.calculateEcheance()

        },
        'editedItem.journal'(val) {
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
            console.log('aaa', aaa);


        },

    },

    async created() {
        this.id = this.$route.params.id
        let url = process.env.Name_api + "/exercice/" + this.id + "?params=VE";
        let exercice = await this.$myService.get(url)
        url = process.env.Name_api + "/planComptables";
        let contreparties = await this.$myService.get(url)
        url = process.env.Name_api + "/tva";
        let tvas = await this.$myService.get(url)

        if (exercice && exercice.data != null) {
            this.dossier = {d_id:exercice.d_id,d_activitee:exercice.d_activitee,d_denomination:exercice.d_denomination}
            this.exercice = exercice.data
            this.journaux = exercice.data.journaux
            this.tiers = exercice.data.tiers;
            this.collectif = exercice.collectif;
            this.contreparties = contreparties;
            this.tvas = tvas;
            this.du = this.exercice.du
            this.au = this.exercice.au
            this.editedItem.date = this.exercice.du
            this.ecritures = exercice.data.ecritures;
            
            // this.items = exercice.data.planComptable;
        }

    },
    methods: {
        async allValid() {
            if(this.someCredit == this.someCredit && this.newEcritures.length > 0){
                this.dialogConfirmation = true
            }
            else{
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
            if (!this.$refs.ecritureForm.validate()) {
                return
            }
            for(let i = 0; i < 3; i++){
                let compte,compteObj;
                if(i==0){
                    compte =  `${this.editedItem?.plan_comptable?.numero_compte} - ${this.editedItem?.plan_comptable?.intitulee}`
                    compteObj = this.editedItem?.plan_comptable
                }
                else if (i==1){
                    compte =  `${this.editedItem?.compte?.numero_compte} - ${this.editedItem?.compte?.intitulee}`
                    compteObj = this.editedItem?.compte
                }
                else{
                    compte = `${this.editedItem.code_tva.compte?.numero_compte} - ${this.editedItem.code_tva.compte?.intitulee}`
                    compteObj = this.editedItem.code_tva?.compte
                }
                this.tempEcritures.push({ 
                    date: this.editedItem?.date, 
                    compte: compte, 
                    tiers: `${this.editedItem?.tiers?.denomination}`, 
                    libelle: this.editedItem?.libelle,
                })
                let debit;
                let credit;
                if(i == 0){
                    debit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ttc : '';
                    credit = this.editedItem.montant_ttc < 0 ?  this.editedItem.montant_ttc: '';
                }else if(i == 1){
                    credit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_ht : ''
                    debit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_ht : '';
                }else{
                    credit = this.editedItem.montant_ttc > 0 ? this.editedItem.montant_tva : ''
                    debit = this.editedItem.montant_ttc < 0 ? this.editedItem.montant_tva : '';
                }
                this.tempEcritures[this.tempEcritures.length-1].credit = credit
                this.tempEcritures[this.tempEcritures.length-1].debit = debit
                let row = {
                    num_pieces: this.editedItem.num_pieces,
                    journal: this.editedItem.journal,
                    date: this.editedItem.date,
                    echeance: this.editedItem.echeance,
                    reference_facture: this.editedItem.reference_facture,
                    libelle: this.editedItem.libelle,
                    compte: compteObj,
                    tiers: this.editedItem.tiers.id,
                    debit: debit,
                    credit: credit,

                }
                this.newEcritures.push(row)
            }
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
            // if (this.editedItem.montant_ttc == 0) {
            //     this.editedItem.montant_ttc = ''
            // }
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
            this.ecritures = [...this.ecritures, ...this.newEcritures]
            this.newEcritures = []
            this.dialogConfirmation = false
            console.log('ecriture', this.ecritures);
            this.incrementSuffix()
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
            echeance = echeance.toISOString().split('T')[0]
            return echeance
        },
        calculateEcheanceDateFixe(d,duration){
            let date = new Date(d)
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            let echeance = new Date(year, month, day + duration)
            echeance = echeance.toISOString().split('T')[0]
            return echeance
        },
        calculateEcheance(){
            let type = this.selectedTiers?.type_echeance
            let duration = this.selectedTiers?.echeance?.nbr_jours
            let date = this.editedItem?.date
            if(date && duration && type){
                if(type == 'fin_du_moi'){
                    return this.calculateEcheanceFinMois(date, duration)
                }
                if(type == 'date_facturation'){
                    return this.calculateEcheanceDateFixe(date, duration)
                }
            }
            else if(date){
                return new Date(date).toISOString().split('T')[0]
            }
            else{
                return ''
            }
        },
        addDecimals() {
            this.editedItem.montant_ttc = (Math.round(this.editedItem.montant_ttc * 100) / 100).toFixed(2)
        },

    }

}
</script>