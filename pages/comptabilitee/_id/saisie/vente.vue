<template>
    <div>
        <v-card elevation="0" style="border:1px solid #ddd">
            <div class=" py-5 px-3">

                <div class="subtitle-2 ">
                    Dossier : {{ dossier && dossier.d_denomination }} - {{ dossier && dossier.d_activitee }}
                    <p>N° de piece : <b>{{ editedItem.num_pieces }}</b></p>
                </div>
                <div class="text--secondary">saisie operation de vente</div>
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
                                <v-text-field v-model="editedItem.date" outlined dense hide-details
                                    prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.date"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="2">
                        <label for="">Référence *</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.reference_facture" hide-details
                            outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="1" class="px-1 ">
                        <label for="">Libellé *</label>
                        <v-text-field v-model="editedItem.libelle" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="3" class="pl-3 pr-1 ">
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
                            :disabled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')"
                            :filled="!(editedItem.plan_comptable && editedItem.plan_comptable.c_g == 'COLLECTIF')" :items="tiersShow"
                            outlined dense placeholder="Tiers" item-text="denomination" item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.denomination }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>

                <v-row class="mx-0 mt-0">
                    <v-col cols="2" class="pl-3 pr-1 ">
                        <label for="">Compte *</label>

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
                   
                    
                    <v-col cols="2">
                        <label for="">ECHEANCE</label>
                        <v-text-field :rules="obligationRule" v-model="editedItem.echeance" hide-details outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="3" class="px-1 ">
                        <label for="">Code TVA</label>
                        <v-autocomplete  v-model="editedItem.code_tva" :items="tvas" outlined dense placeholder="Code TVA"
                            item-text="code" item-value="id">
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
                        <v-text-field v-model="editedItem.taux_tva" @keyup="positive('d')" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <!-- <v-col cols="1" class="px-1 ">
                    <label for="">Débit</label>
                    <v-text-field v-model="editedItem.debit" @keyup="positive('d')" type="number" outlined
                        dense></v-text-field>
                </v-col>
                <v-col cols="1" class="px-1 ">
                    <label for="">Credit</label>
                    <v-text-field v-model="editedItem.credit" @keyup="positive('c')" type="number" outlined
                        dense></v-text-field>

                </v-col> -->
                   
                </v-row>
                <v-row class="mx-0 mt-0" style="justify-content:end">
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT HT</label>
                        <v-text-field v-model="editedItem.montant_ht" @keyup="positive('c')" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TVA</label>
                        <v-text-field v-model="editedItem.montant_tva" @keyup="positive('c')" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="2" class="px-1 ">
                        <label for="">MONTANT TTC</label>
                        <v-text-field v-model="editedItem.montant_ttc" @keyup="positive('d')" type="number" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="3" class="px-1 text-center">
                        <v-btn color="primary" large class="mt-5 py-5" @click="addEcriture()">Ajouter</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>


        <v-card elevation="0" class="mt-3 px-3 py-3" style="border:1px solid #ddd">
            <div class="subtitle-2 ">
                Exercice du : {{ du }} au {{ au }}
            </div>
            <div class="pt-3">
                <v-data-table :headers="headers" hide-default-footer :items-per-page="-1" elevation="0" :items="rows">
                    <template v-slot:item.compte="{ item }">
                        <span>{{ item && item.compte && item.compte.intitulee}}</span>
                    </template>
                    <template v-slot:item.tiers="{ item }">
                        <span>{{ item.denomination }}</span>
                    </template>

                </v-data-table>
                <div style="display: flex;justify-content: space-between;">
                    <div style="width: 67%;" class="subtitle-2">
                        Total
                    </div>
                    <div style="width: 33%;display: flex;justify-content: space-around;">
                        <div class="subtitle-2">{{ someDebit }}</div>
                        <div class="subtitle-2">{{ someCredit }}</div>
                    </div>
                </div>

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
            tiers: {},
            compte: {},
            libelle: '',
            reference_facture: '',
            journal: {},
            plan_comptable: {},
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
        journaux: [],
        journal: '',
        month: '',
        ecritures: [],
        dialogConfirmation: false,
        tiersShow: [],
        tvas: [],
        charsNumberTva: 20,
        charsNumberCollectif: -1,
        charsNumberTiers: 7,
        charsNumberContreparties: 7,
    }),
    watch: {
        rows(val) {
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
            // calculate the right amount needed to equalize the debit and credit and add it to the right field
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
        'editedItem.plan_comptable'(val){
            this.tiersShow = this.tiers.filter(item => item.compte_tiers?.id == val?.id)
        },
        'editedItem.tiers'(val){
            console.log('val', val)
            let selectedTiers = this.tiers.find(item => item.id == val)
            console.log('selected tiers : ', selectedTiers)
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
        'editedItem.journal'(val) {
            // console.log(val)
            if (val.type.split(' ').length == 1) {
                this.journal = val.type.split(' ')[0].substring(0, 2).toUpperCase()
            } else {
                this.journal = val.type.split(' ')[0].substring(0, 1).toUpperCase() + val.type.split(' ')[1].substring(0, 1).toUpperCase()
            }
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
            
            // this.items = exercice.data.planComptable;
            // this.ecritures = exercice.data.ecritures;
        }

    },
    methods: {
        async allValid() {
            this.dialogConfirmation = true
        },
        async search() {
            let url = process.env.Name_api + "/ecriture/find/" + this.editedItem.du + "/" + this.editedItem.au + "/" + this.id;

            this.rows = await this.$myService.get(url)

            this.au = this.editedItem.au
            this.du = this.editedItem.du
            console.log(this.du)
        },
        async addEcriture() {

            if (!this.$refs.ecritureForm.validate() || (this.editedItem.debit == 0 && this.editedItem.credit == 0)) {
                return
            }

            this.rows.push(JSON.parse(JSON.stringify(this.editedItem)))

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
            let url = process.env.Name_api + "/ecriture/" + this.exercice.id;
            const aa = await this.$myService.post(url, this.rows);
            this.ecritures = [...this.ecritures, ...this.rows]
            this.rows = []
            this.dialogConfirmation = false
            console.log('ecriture', this.ecritures);
            this.incrementSuffix()
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
            this.editedItem.tiers = {}
            this.editedItem.compte = {}
        },
    }

}
</script>