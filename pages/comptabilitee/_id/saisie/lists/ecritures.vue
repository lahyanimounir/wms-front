<template>
    <div>
        <v-dialog v-model="dialog" width="300px">
            <v-card>
                <!-- add an input with choices pdf,xlx... and download button -->
                <v-card-title class="headline">Exporter</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <label>Veuillez choisir le type de fichier :</label>
                        <div class="py-5 d-flex">
                            <download-excel :data="excel"  class="mr-3">
                            <v-btn>
                                    <span style="font-size: large;color:black">XLS</span>
                                    <v-icon >mdi-download</v-icon>
                                </v-btn>
                            </download-excel>
                            <v-btn @click="exportEcritures">
                                <span style="font-size: large;color:black">PDF</span>
                                <v-icon >mdi-download</v-icon>
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="exportEcritures">Telecharger</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
        <v-card elevation="0" style="border:1px solid #ddd">
            <!-- add left arrow with retourner now -->
            <div class="pt-5 px-3 pb-0 d-flex">
                <v-btn color="#BDBDBD" @click="goBack">
                    <v-icon class="mr-2">mdi-arrow-left</v-icon>
                    Retourner
                </v-btn>
                <v-btn :disabled="ecritures.length == 0" @click="printEcritures" color="primary" style="color:#FFF" class="ml-auto">
                    <v-icon class="mr-2">mdi-printer</v-icon>
                    Imprimer
                </v-btn>
            </div>
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(dateDu) }}</b> au <b>{{ formatDate(dateAu) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">Rechercher ecritures</div>
            </div>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
            <v-form ref="searchForm">
                <v-row class="mx-0">
                    <v-col cols="2">
                        <label for="">Journal *</label>

                        <v-autocomplete hide-details outlined dense placeholder="Journaux" item-text="nom" item-value="id"
                            :items="journaux" v-model="journal" :rules="obligationRule"></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                        <label for="">Du</label>
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                            offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dateFormatted" persistent-hint v-bind="attrs"
                                    hint="JJ/MM/AAAA format" prepend-icon="mdi-calendar" outlined dense
                                    :format="'DD/MM/AAAA'" :rules="obligationRule" @blur="date1 = parseDate(dateFormatted)"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date1" no-title @input="menu1 = false" :min="dateDu"
                                :max="dateAu"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="2">
                        <label for="">Au</label>
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                            offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dateFormatted2" persistent-hint v-bind="attrs"
                                    hint="JJ/MM/AAAA format" prepend-icon="mdi-calendar" outlined dense
                                    :format="'DD/MM/AAAA'" :rules="obligationRule" @blur="date2 = parseDate(dateFormatted2)"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date2" no-title @input="menu2 = false" :min="dateDu"
                                :max="dateAu"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="primary" small class="mt-5 py-5 ml-3" @click="getEcritures">Rechercher</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">Listes des ecritures</div>
            </div>
            <v-data-table ref="myTable" :headers="headers" :items="ecritures" :items-per-page="rowsPerPage" :page="pageNum"
                class="elevation-1" @update:page="pageChange" @update:items-per-page="itemsPerPageChange"
                @current-items="currentItems">
                <template v-slot:item.action="{ item }">
                    <v-icon color="#546E7A" class="mr-2" @click="editEcriture(item)">mdi-star</v-icon>
                </template>
                <template v-slot:item.date="{ item }">
                    {{ formatDate(item.date) }}
                </template>
                <template v-slot:item.compte="{ item }">
                    {{ item.compte.numero_compte }} - {{ item.compte.intitulee }}
                </template>
                <template v-slot:item.debit="{ item }">
                    <span v-if="item.debit > 0" style="color:green">{{ item.debit }}</span>
                    <span v-else>{{ item.debit }}</span>
                </template>
                <template v-slot:item.credit="{ item }">
                    <span v-if="item.credit > 0" style="color:red">{{ item.credit }}</span>
                    <span v-else>{{ item.credit }}</span>
                </template>
                <template slot="body.append">
                    <tr class="">
                        <th class="title">Total</th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class="" style="font-size:1rem;color:green">{{ someDebit }}</th>
                        <th class="" style="font-size:1rem;color:red">{{ someCredit }}</th>
                        <th class=""></th>
                    </tr>
                </template>
            </v-data-table>
            <client-only>
                <vue-html2pdf
                :show-layout="false"
                :enable-download="true"
                :filename="`ecritures-${new Date().toJSON().slice(0,10)}`"
                :pdf-quality="2"
                pdf-format="a4"
                pdf-orientation="portrait"
                ref="html2Pdf"
                :manual-pagination="true"
                :paginate-elements-by-height="1400"

                >
                    <section slot="pdf-content">
                        <div style="padding:20px">
                            <div class="print-header">
                                <div class="title" style="font-size:13px;width:100%">
                                    <h1 style="text-align: center;">Ecritures</h1>
                                    <span><b>Dossier : </b>{{ dossier && dossier.denomination }}</span><br>
                                    <span><b>Journal :</b> {{ journaux.find(j=>j.id === journal)?.nom }}</span><br>
                                    <span><b>Intervalle : </b>{{ dateFormatted }} - {{ dateFormatted2 }}</span><br>
                                    <span style="float:right">{{ new Date().toLocaleString('fr') }}</span>
                                </div>
                            </div>
                            <div class="print-table">

                                <table style="font-size:12px;  border-collapse: collapse;width:100%">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>N PIECES</th>
                                            <th>COMPTES</th>
                                            <th>TIERS</th>
                                            <th>LIBELLE</th>
                                            <th>Débit</th>
                                            <th>Crédit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in ecritures" :key="item.id">
                                            <td>{{ formatDate(item.date) }}</td>
                                            <td>{{ item.num_pieces }}</td>
                                            <td>{{ item.compte.numero_compte }} - {{ item.compte.intitulee }}</td>
                                            <td>{{ item?.tiers.denomination }}</td>
                                            <td>{{ item.libelle }}</td>
                                            <td>{{ item.debit }}</td>
                                            <td>{{ item.credit }}</td>
                                        </tr>
                                        <tr>
                                            <td class="title">Total</td>
                                            <td class=""></td>
                                            <td class=""></td>
                                            <td class=""></td>
                                            <td class=""></td>
                                            <td class="">{{ someDebit }}</td>
                                            <td class="">{{ someCredit }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </vue-html2pdf>
            </client-only>
        </v-card>
    </div>
</template>
<style>
.print-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

 div.print-table th, div.print-table td {
    border: 1px solid black;
    padding:2px;
}

.print-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
}
</style>
<script>
export default {
    data: (vm) => ({
        dateDebut: '',
        dateFin: '',
        journal: '',
        headers: [
            { text: 'Date', value: 'date' },
            { text: 'N PIECES', value: 'num_pieces' },
            { text: 'COMPTES', value: 'compte' },
            { text: 'TIERS', value: 'tiers.denomination' },
            { text: 'Libelle', value: 'libelle' },
            { text: 'Débit', value: 'debit' },
            { text: 'Crédit', value: 'credit' },
            { text: 'Action', value: 'action', sortable: false }
        ],
        menu1: false,
        menu2: false,
        dateFormatted: '',
        dateFormatted2: '',
        dateDu: null,
        dateAu: null,
        date1: null,
        date2: null,
        obligationRule: [
            v => !!v || 'Ce champ est obligatoire'
        ],
        id: null,
        ecritures: [],
        journaux: [],
        dossier: {},
        displayedRows: [],
        someDebit: 0,
        someCredit: 0,
        snackbar: false,
        timeout: 3000,
        text: '',
        pageNum: 1,
        rowsPerPage: 5,
        previousMenu: null,
        selectedJournal: null,
        dialog: false,
        valid: false,
        format:null,
        excel:[],

    }),
    async created() {
        this.id = this.$route.params.id
        let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
        let info = await this.$myService.get(url)
        console.log('info : ', info)
        this.dossier = info.dossier
        this.journaux = info.journaux
        this.dateDu = this.date1 = info.du
        this.dateAu = this.date2 = info.au
        this.journal = Number(this.$route.query?.selectedJournal)
        this.previousMenu = this.$route.query?.previousMenu
        // if journal is selected and date1 and date2 are not null then get ecritures
        if (this.journal && this.date1 && this.date2) {
            console.log(this.$refs.searchForm.validate())
            await this.getEcritures()
        }

    },
    watch: {
        date1(val) {
            this.dateFormatted = this.formatDate(this.date1)
        },
        date2(val) {
            this.dateFormatted2 = this.formatDate(this.date2)
        },
        displayedRows(val) {
            this.calculateTotal()
        }
    },
    methods: {
        async getEcritures() {
            if (!this.journal || !this.date1 || !this.date2) {
                this.showToast('Veuillez remplir tous les champs')
                return
            }

            let url = process.env.Name_api + "/exercice/" + this.id + "/getEcritures";
            let params = {
                dateDebut: this.date1,
                dateFin: this.date2,
                journal: this.journal
            }
            const res = await this.$myService.get(url, params)
            this.ecritures = res
            let someDebit = 0
            let someCredit = 0
            this.excel = res.map((e, i) => {
                if (typeof e.debit === 'string') {
                    someDebit += parseFloat(e.debit)
                } else {
                    someDebit += e.debit
                }
                if (typeof e.credit === 'string') {
                    someCredit += parseFloat(e.credit)
                } else {
                    someCredit += e.credit
                }
                if (i === this.ecritures.length - 1) {
                    return {
                        Date: '',
                        Journal: 'Total',
                        'N PIECES': '',
                        Libelle: '',
                        Débit: someDebit,
                        Crédit: someCredit,
                    }
                }
                return {
                    Date: this.formatDate(e.date),
                    Journal: e.journal.type + ' - ' + e.journal.nom,
                    'N PIECES': e.num_pieces,
                    Libelle: e.libelle,
                    Débit: e.debit,
                    Crédit: e.credit,
                }
            })
            this.calculateTotal()
            console.log('res : ', res)

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
            let d = new Date(this.parseDateToISO(date))
            let du = new Date((this.dateDu))
            let au = new Date((this.dateAu))
            console.log(d, du, au)
            if (d > au || d < du && date !== null) {
                this.showToast('La date doit être comprise entre ' + this.formatDate(this.dateDu) + ' et ' + this.formatDate(this.dateAu))
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
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        showToast(message) {
            this.text = message
            this.snackbar = true

        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        calculateTotal() {
            if (this.displayedRows.length == 0) return
            // this.someDebit = this.displayedRows.reduce((a, b) => a + Number(b.debit), 0)
            // this.someCredit = this.displayedRows.reduce((a, b) => a + Number(b.credit), 0)
            // calculate total debit and credit toFixed(2)
            this.someDebit = this.displayedRows.reduce((a, b) => a + Number(b.debit), 0).toFixed(2)
            this.someCredit = this.displayedRows.reduce((a, b) => a + Number(b.credit), 0).toFixed(2)
        },
        pageChange(newPage) {
            console.log('newPage : ', newPage)
        },
        itemsPerPageChange(newItemsPerPage) {
            console.log('newItemsPerPage : ', newItemsPerPage)
        },
        currentItems(newCurrentItems) {
            this.displayedRows = newCurrentItems
        },
        goBack() {
            this.previousMenu ? this.$router.push({ path: this.previousMenu }) : this.$router.go(-1)
        },
        printEcritures() {
            this.dialog = true
        },
        exportEcritures() {
            this.$refs.html2Pdf.generatePdf()
        },
        editEcriture(item) {
            console.log('item : ', item)
            // this.$router.push({path:this.previousMenu, query:{num_pieces:item.num_pieces,mode:'edit'}})
            let menu;
            switch(item.journal.type){
                case 'Achat':
                    menu = 'achat'
                    break
                case 'Vente':
                    menu = 'vente'
                    break
                case 'Tresorerie':
                    menu = 'tresorerie'
                    break
                case 'OPERATIONS DIVERS':
                    menu = 'operation_divers'
                    break
                case 'A NOUVEAU':
                    menu = 'desANouveau'
                    break
                case 'BUDGET':
                    menu = 'budget'
                    break
            }
            const url = `/comptabilitee/${this.id}/saisie/${menu}`
            this.$router.push({path:url, query:{num_pieces:item.num_pieces,mode:'edit'}})
        },
    },


}
</script>