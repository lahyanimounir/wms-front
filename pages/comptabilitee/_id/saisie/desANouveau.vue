<template>
    <div>


        <v-card elevation="0" style="border:1px solid #ddd">
            <div class=" py-2 px-3 pb-0 d-flex" style="justify-content: space-between;">

            <div style="font-size:18px">
                Dossier :<b> {{ dossier && dossier.d_denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b> | 
                N° de piece : <b>{{ editedItem.num_pieces }}</b>
                <div class="font-weight-bold" style="font-size:18px">Saisie de Des A Nouveau</div>
            </div>
            <div>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        size="small"
                        color="teal"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon>mdi-menu</v-icon>
                        </v-btn>
                        
                    </template>
                    
                    <!-- add button with image icon -->
                    
                    
                    <v-list>
                        <v-list-item @click="afficherEcritures()">
                        <v-list-item-title>Afficher ecritures</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="interrogationCompte()">
                        <v-list-item-title>Interrogation comptes</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="serieComptes()">
                        <v-list-item-title>Interrogation series comptes</v-list-item-title>
                        </v-list-item>
        
                    </v-list>
                </v-menu>
            </div>
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
                    <v-col cols="2" hidden>
                        <label for="">N° de piece</label>
                        <v-text-field :disabled="true" :filled="true" v-model="editedItem.num_pieces" hide-details outlined
                            dense></v-text-field>

                    </v-col>
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
                    <v-col cols="6">
                        <label for="">Référence *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.reference_facture" hide-details outlined
                            dense></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mx-0">
                    <v-col cols="3" class="pl-3 pr-1 ">
                        <label for="">Compte *</label>

                        <v-autocomplete :filter="getList" v-model="editedItem.compte" return-object :rules="obligationRule" :items="items"
                            outlined dense placeholder="compte de contrepartie" item-text="numero_compte" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Tiers *</label>
                        <v-autocomplete v-model="editedItem.tiers" color="red" return-object
                            :rules="editedItem.compte && editedItem.compte.c_g == 'COLLECTIF' ? obligationRule : []"
                            :disabled="!(editedItem.compte && editedItem.compte.c_g == 'COLLECTIF')"
                            :filled="!(editedItem.compte && editedItem.compte.c_g == 'COLLECTIF')" :items="test" outlined
                            dense placeholder="Tiers" item-text="denomination" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.denomination }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="3" class="px-1 ">
                        <label for="">Libellé *</label>
                        <v-text-field v-model="editedItem.libelle" :rules="obligationRule" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="1" class="px-1 ">
                        <label for="">Débit</label>
                        <v-text-field v-model="editedItem.debit" @keyup="positive('d')" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="1" class="px-1 ">
                        <label for="">Credit</label>
                        <v-text-field v-model="editedItem.credit" @keyup="positive('c')" type="number" outlined
                            dense></v-text-field>

                    </v-col>

                    <v-col cols="1" class="px-1 d-flex">
                        <v-btn v-if="isEdit" color="#EF9A9A" class="mt-5 py-5" @click="cancelEdit()">Annuler</v-btn>
                        <v-btn color="primary" small class="mt-5 py-5 ml-3" @click="addEcriture()">{{ btnText }}</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>


        <v-card elevation="0" class="mt-3 px-3 py-3" style="border:1px solid #ddd">
            <div class="pt-3">
                <v-data-table :headers="headers" hide-default-footer :items-per-page="-1" elevation="0" :items="rows">
                    <template v-slot:item.compte="{ item }">
                        <span>{{ item && item.compte && item.compte.intitulee }}</span>
                    </template>
                    <template v-slot:item.tiers="{ item }">
                        <span>{{ item.tiers?.denomination }}</span>
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                        <v-icon size="small" class="me-2" @click="editItem(item, index)">
                            mdi-pencil
                        </v-icon>
                        <v-icon size="small" @click="deleteItem(item, index)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <template slot="body.append">
                        <tr class="">
                            <th class="title">Total</th>
                            <th class=""></th>
                            <th class=""></th>
                            <th class="" style="font-size:1rem">{{ someDebit }}</th>
                            <th class="" style="font-size:1rem">{{ someCredit }}</th>
                            <th class=""></th>
                        </tr>
                    </template>

                </v-data-table>
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
import { throws } from 'assert';

export default {
    data: (vm) => ({
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        someDebit: 0,
        someCredit: 0,
        du: null,
        au: null,
        menu: false,
        id: '',
        menu2: false,
        editedItem: {
            debit: '',
            credit: '',
            tiers: '',
            compte: '',
            libelle: '',
            reference_facture: '',
            journal: '',
            date: '',
            num_pieces: '',
        },
        defaultItem: {
            debit: '',
            credit: '',
            tiers: '',
            compte: '',
            libelle: '',
            reference_facture: '',
            journal: '',
            date: '',
            num_pieces: '',
        },
        exerciceId: '',
        exercice: {},
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
            { text: 'Actions', value: 'actions', sortable: false },

        ],
        rows: [],
        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
        ],
        menu3: false,
        journaux: [],
        journal: 'AN',
        month: '',
        ecritures: [],
        dialogConfirmation: false,
        test: [],
        dossier: {},
        isEdit: false,
        previousEditedItem: {},
        editedIndex: -1,
        snackbar: false,
        timeout: 3000,
        text: '',
        editMode: false,


    }),
    computed: {
        btnText() {
            return this.isEdit ? 'Modifier' : 'Ajouter'
        },
        computedDateFormatted() {
            return this.formatDate(this.date)
        }

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
            if (this.editMode) return
            this.getNumPiece()

        },
        rows(val) {
            this.updateTotal()
        },
        'editedItem.reference_facture'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
        },
        'editedItem.compte'(val) {
            this.editedItem.libelle = this.editedItem.reference_facture + ' ' + (this.editedItem.compte?.intitulee ? this.editedItem.compte.intitulee : '')
            this.test = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
            if (this.test.length == 0) this.editedItem.tiers = ''
        },
        // 'editedItem.journal'(val) {
        //     if (val.type.split(' ').length == 1) {
        //         this.journal = val.type.split(' ')[0].substring(0, 2).toUpperCase()
        //     } else {
        //         this.journal = val.type.split(' ')[0].substring(0, 1).toUpperCase() + val.type.split(' ')[1].substring(0, 1).toUpperCase()
        //     }
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


        // },

    },

    async created() {
        this.id = this.$route.params.id
        let url = process.env.Name_api + "/exercice/" + this.id + "?params=AN";
        let exercice = await this.$myService.get(url)
        if (exercice && exercice.data != null) {
            this.dossier = { d_id: exercice.d_id, d_activitee: exercice.d_activitee, d_denomination: exercice.d_denomination }
            this.exercice = exercice.data
            // this.journaux = exercice.data.journaux;
            this.journaux = exercice.data.journaux
            this.tiers = exercice.data.tiers;
            this.items = exercice.data.planComptable;
            this.ecritures = exercice.data.ecritures;
            this.du = this.exercice.du
            this.au = this.exercice.au
            this.editedItem.date = this.du
            this.date = this.du
        }
        let num_pieces = this.$route.query.num_pieces
        let mode = this.$route.query.mode
        console.log("num_pieces", num_pieces)
        if(num_pieces && mode == 'edit'){
            this.editMode = true
            this.editedItem.num_pieces = num_pieces
            let url = process.env.Name_api + "/exercice/" + this.id + "/getEcritures?num_pieces=" + num_pieces;
            let ecritures = await this.$myService.get(url)
            this.rows = ecritures
            this.ecritures = ecritures
            console.log("ecritures", ecritures)
            console.log("this.rows", this.rows)
            // console.log("ecritures", ecritures)
        }

    },
    methods: {
        async getNumPiece(){
            let url = process.env.Name_api + "/exercice/" + this.id + "/getNumPiece";
            let params = {
                date: this.date,
                journal: 'A NOUVEAU'
            }
            let res = await this.$myService.get(url, params)
            this.editedItem.num_pieces = res.num_pieces
            
        },
        async allValid() {
            if(this.someCredit !== this.someDebit) return
            this.dialogConfirmation = true
        },
        async search() {
            let url = process.env.Name_api + "/ecriture/find/" + this.editedItem.du + "/" + this.editedItem.au + "/" + this.id;

            this.rows = await this.$myService.get(url)

            this.au = this.editedItem.au
            this.du = this.editedItem.du
        },
        async addEcriture() {

            if (!this.$refs.ecritureForm.validate() || (this.editedItem.debit == 0 && this.editedItem.credit == 0)) {
                return
            }
            if (this.editedIndex > -1) {
                console.log('edit')
                this.editedItem.date = this.date
                console.log('this edited item : ',this.editedItem)
                let copy = JSON.parse(JSON.stringify(this.rows))
                console.log('this rows before : ',copy)
                console.log('this edited index : ',this.editedIndex)
                Object.assign(this.rows[this.editedIndex], this.editedItem)
                console.log('this rows after : ',this.rows)
                this.editedIndex = -1
                this.editedItem = Object.assign({}, this.previousEditedItem)
                this.isEdit = false
                if (this.editMode) this.editedItem.id = null
                this.updateTotal()


            } else{
                console.log('add')
                this.editedItem.date = this.date
                console.log('this edited item : ',this.editedItem)
                this.rows.push(JSON.parse(JSON.stringify(this.editedItem)))
                this.editedItem.compte = this.items.find(item => item.id == this.editedItem.journal.id_compte_contrepartie?.id)
            }
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
        positive(wich) {

            if (this.editedItem.debit <= 0) {
                this.editedItem.debit = ''

            }

            if (this.editedItem.credit <= 0) {
                this.editedItem.credit = ''
            }
            if (wich == 'd') {
                this.editedItem.credit = ''
            }
            if (wich == 'c') {
                this.editedItem.debit = ''
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        closeDelete() {
            this.dialogDelete = false
        },
        async confimEcriture() {
            let url;
            let data = JSON.parse(JSON.stringify(this.rows))
            data.forEach(item => {
                item.tiers = item?.tiers?.id
            })

            if(this.editMode){
                // make data an object of data and deleted ids array
                data = {
                    data,
                    deletedIds: this.deletedIds
                }
                console.log('data : ',data) 
                url = process.env.Name_api + "/ecriture/" + this.exercice.id ;
                const aa = await this.$myService.update(url, data);
                this.$router.go(-1)
            }
            else {
                url = process.env.Name_api + "/ecriture/" + this.exercice.id;
                const aa = await this.$myService.post(url, data);
            }

            // this.ecritures = [...this.ecritures, ...this.rows]
            this.rows = []
            this.dialogConfirmation = false
            // this.incrementSuffix()
            this.getNumPiece()
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
            this.editedItem.debit = ''
            this.editedItem.credit = ''
            this.editedItem.tiers = ''
            this.editedItem.compte = ''
        },
        editItem(item, index) {
            console.log('item : ', item)
            console.log('index : ', index)
            Object.assign(this.previousEditedItem, this.editedItem)
            Object.assign(this.editedItem, item)
            this.date = this.editedItem.date
            this.editedIndex = index
            this.isEdit = true
        },
        deleteItem(item, index) {
            this.editedIndex = index
            this.rows.splice(this.editedIndex, 1)
            if(this.editMode && item.id) this.deletedIds.push(item.id)
            this.editedIndex = -1
        },
        cancelEdit() {
            this.isEdit = false
            this.editedItem = this.previousEditedItem
        },
        updateTotal() {
            this.someDebit = 0
            this.someCredit = 0
            if (this.rows && this.rows.length > 0) {
                this.rows.forEach(item => {
                    if (item.credit) {
                        this.someCredit = this.someCredit + parseInt(item.credit)
                    }
                    if (item.debit) {
                        this.someDebit = this.someDebit + parseInt(item.debit)
                    }
                });
            }
            if (this.someDebit > this.someCredit) {
                this.editedItem.credit = this.someDebit - this.someCredit
                this.editedItem.debit = ''
            } else if (this.someCredit > this.someDebit) {
                this.editedItem.debit = this.someCredit - this.someDebit
                this.editedItem.credit = ''
            }
            else {
                this.editedItem.debit = ''
                this.editedItem.credit = ''
            }
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
        },
        afficherEcritures(){
            this.$router.push({ path: '/comptabilitee/' + this.id + '/saisie/lists/ecritures' , query: { previousMenu : this.$route.path, selectedJournal : this.editedItem.journal.id }})
        },
        interrogationCompte(){
            this.$router.push({ path: '/comptabilitee/' + this.id + '/saisie/lists/interrogationComptes', query: { previousMenu : this.$route.path }})
        },
        serieComptes(){
            this.$router.push({ path: '/comptabilitee/' + this.id + '/saisie/lists/serieComptes' })
        },
    }

}
</script>