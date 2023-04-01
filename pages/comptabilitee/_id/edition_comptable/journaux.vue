<template>
    <div>
        <v-dialog v-model="dialog" width="300px">
            <v-card>
                <!-- add an input with choices pdf,xlx... and download button -->
                <v-card-title class="headline">Exporter</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <label>Veuillez cocher le type de fichier :</label>
                        <v-radio-group v-model="format" row>
                            <v-radio label="PDF" value="pdf"></v-radio>
                            <v-radio label="XLS" value="xls"></v-radio>
                        </v-radio-group>
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
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(dateDu) }}</b> au <b>{{ formatDate(dateAu) }}</b>
            </div>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
            <v-form class="mt-6" ref="searchForm">
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
                        <v-btn color="primary" small class="mt-5 py-5 ml-3" @click="getEcritures">Générer</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">Listes des ecritures</div>
            </div>
            <table width="100%" class="table styled-table">
                <thead>
                    <th>Date</th>
                    <th>N PIECES</th>
                    <th>COMPTES</th>
                    <th>TIERS</th>
                    <th>LIBELLE</th>
                    <th>DEBIT</th>
                    <th>CREDIT</th>
                </thead>
                <tbody>
                    <tr v-for="ecriture in ecritures" :key="ecriture.id">
                        <td>{{ formatDate(ecriture.date) }}</td>
                        <td>{{ ecriture.num_pieces }}</td>
                        <td>{{ ecriture.compte.intitulee }}</td>
                        <td>{{ ecriture.tiers?.denomination }}</td>
                        <td>{{ ecriture.libelle }}</td>
                        <td>{{ ecriture.debit }}</td>
                        <td>{{ ecriture.credit }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="5" class="text-right font-weight-bold">Total du journal :</td>
                        <td class="font-weight-bold">{{ totalDebit }}</td>
                        <td class="font-weight-bold">{{ totalCredit }}</td>
                    </tr>
                </tfoot>
            </table>
        </v-card>
    </div>
</template>
<style>
.total-row{
    background-color: #DBDBDB;
    color: #000000;
    text-align: center;
    border:1px solid rgb(133, 133, 133);
}


th{
    background-color: rgb(133, 133, 133);
    color: #ffffff;
    text-align: center;
    border:1px solid rgb(133, 133, 133);
}
.styled-table {
    border-collapse: collapse;
    border: 1px solid rgb(88, 88, 88);
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    line-height: 8px;
}

.styled-table thead tr {
    /* background-color: #505c59; */
    color: #000000;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    text-align: center;
    /* border:1px solid rgb(133, 133, 133); */

}
.total{
    background-color: #dbdbdb;
    font-size: 17px;
    font-weight: bold;
    

}
.compte{
    color: #000000;
    font-size: 17px;
}
.sub-account{
    color: aliceblue;
    font-size: 17px;

}
.debit{
    /* color:green; */
    /* font-size: 15px; */
}
.credit{
    /* color:red; */
    /* font-size: 15px; */
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
        totalDebit: 0,
        totalCredit: 0,

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
            if (this.ecritures.length == 0) return
            // this.someDebit = this.displayedRows.reduce((a, b) => a + Number(b.debit), 0)
            // this.someCredit = this.displayedRows.reduce((a, b) => a + Number(b.credit), 0)
            // calculate total debit and credit toFixed(2)
            this.totalDebit = this.ecritures.reduce((a, b) => a + Number(b.debit), 0).toFixed(2)
            this.totalCredit = this.ecritures.reduce((a, b) => a + Number(b.credit), 0).toFixed(2)
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
            // let url = process.env.Name_api + "/exercice/" + this.id + "/exportEcritures";
            // let params = {
            //     dateDebut: this.date1,
            //     dateFin: this.date2,
            //     journal: this.journal
            // }
            // this.$myService.download(url, params)
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