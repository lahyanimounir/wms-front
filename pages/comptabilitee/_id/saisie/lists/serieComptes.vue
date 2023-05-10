<template>
    <div>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <!-- add an input with choices pdf,xlx... and download button -->
                <v-card-title class="headline">Exporter</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <label>Veuillez cocher le type de fichier :</label>
                        <v-radio-group v-model="format" row>
                            <v-radio label="PDF" value="pdf"></v-radio>
                            <v-radio label="XLS" value="xls"></v-radio>
                            <!-- <download-excel :data="excel">
                            Download Data
                            <img src="download_icon.png" />
                            </download-excel> -->
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
            <!-- add left arrow with retourner now -->
            <div class="pt-5 px-3 pb-0 d-flex">
                <v-btn color="#BDBDBD" @click="goBack">
                    <v-icon class="mr-2">mdi-arrow-left</v-icon>
                    Retourner
                </v-btn>
                <v-btn @click="printEcritures" color="primary" style="color:#FFF" class="ml-auto">
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
                    <v-col cols="3">
                        <label for="">Du Compte</label>

                        <v-autocomplete :filter="getList" v-model="compteDu" return-object :rules="obligationRule"
                            :items="comptes" outlined dense placeholder="compte de contrepartie" item-text="numero_compte"
                            item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                        <label for="">Au Compte</label>

                        <v-autocomplete :filter="getList" v-model="compteAu" return-object :rules="obligationRule"
                            :items="comptes" outlined dense placeholder="compte de contrepartie" item-text="numero_compte"
                            item-value="id">
                            <template slot="selection" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                            <template slot="item" slot-scope="{ item }">
                                {{ item.numero_compte }} - {{ item.intitulee }}
                            </template>
                        </v-autocomplete>
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
            <!-- <v-data-table ref="myTable" :headers="headers" :items="ecritures" :items-per-page="rowsPerPage" :page="pageNum"
                class="elevation-1" @update:page="pageChange" @update:items-per-page="itemsPerPageChange"
                @current-items="currentItems">
                <template v-slot:item.action="{ item }">
                    <v-icon color="#546E7A" class="mr-2" @click="editEcriture(item)">mdi-star</v-icon>
                </template>
                <template v-slot:item.date="{ item }">
                    {{ formatDate(item.date) }}
                </template>
                <template v-slot:item.journal="{ item }">
                    {{ item.journal.type }} - {{ item.journal.nom }}
                </template>
                <template v-slot:item.compte="{ item }">
                    {{ item.compte.numero_compte }} - {{ item.compte.intitulee }}
                </template>
                <template v-slot:item.tiers="{ item }">
                    {{ item.tiers?.denomination }}
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
                        <th class=""></th>
                        <th class="" style="font-size:1rem;color:green">{{ someDebit }}</th>
                        <th class="" style="font-size:1rem;color:red">{{ someCredit }}</th>
                        <th class=""></th>
                        <th class=""></th>
                    </tr>
                </template>
            </v-data-table> -->
            <table width="100%" class="table styled-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Journal</th>
                        <th>Compte</th>
                        <th>Tiers</th>
                        <th>N PIECES</th>
                        <th>Libelle</th>
                        <th>Débit</th>
                        <th>Crédit</th>
                        <th>Solde</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ecriture in grouped"  :key="ecriture.id">
                        <template v-if="!ecriture.isTotal">
                            <td>{{ formatDate(ecriture.date) }}</td>
                            <td>{{ ecriture.journal.type }} - {{ ecriture.journal.nom }}</td>
                            <td>{{ ecriture.compte.numero_compte }} - {{ ecriture.compte.intitulee }}</td>
                            <td>{{ ecriture.tiers && ecriture.tiers.denomination }}</td>
                            <td>{{ ecriture.num_pieces }}</td>
                            <td>{{ ecriture.libelle }}</td>
                            <td v-if="ecriture.debit > 0" style="color:green">{{ ecriture.debit }}</td>
                            <td v-else>{{ ecriture.debit }}</td>
                            <td v-if="ecriture.credit > 0" style="color:red">{{ ecriture.credit }}</td>
                            <td v-else>{{ ecriture.credit }}</td>
                            <td>{{ ecriture.montant }}</td>
                            <td>
                                <v-icon color="#546E7A" class="mr-2" @click="editEcriture(ecriture)">mdi-star</v-icon>
                            </td>
                        </template>
                        <template v-else>
                            <td colspan="6" class="text-left font-weight-bold total compte">
                                SOUS TOTAL COMPTE :  {{ ecriture.numero_compte }} - {{ ecriture.intitulee }}
                            </td>
                            <td class="total debit">
                                {{ ecriture.totalDebit.toFixed(2) }}
                            </td>
                            <td class="total credit">
                                {{ ecriture.totalCredit.toFixed(2) }}
                            </td>
                            <td colspan="2" class="total">

                            </td>
                            <!-- <td style="font-size:1rem;color:green">{{ ecriture.debit }}</td>
                            <td style="font-size:1rem;color:red">{{ ecriture.credit }}</td>
                            <td></td>
                            <td></td> -->
                        </template>
                    </tr>
                    <tr>
                        <th class="title">Total</th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class=""></th>
                        <th class="" style="font-size:1rem;color:green">{{ someDebit }}</th>
                        <th class="" style="font-size:1rem;color:red">{{ someCredit }}</th>
                        <th class=""></th>
                        <th class=""></th>
                    </tr>
                </tbody>
            </table>
        </v-card>
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
    text-align: center;
}
.total{
    background-color: #dbdbdb;

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
    color:green;
    font-size: 15px;
}
.credit{
    color:red;
    font-size: 15   px;
}
</style>
<script>
export default {
    data: (vm) => ({
        dateDebut: '',
        dateFin: '',
        journal: '',
        compteDu: '',
        compteAu: '',
        headers: [
            { text: 'Date', value: 'date', sortable: false },
            { text: 'Journal', value: 'journal', sortable: false },
            { text: 'Compte', value: 'compte', sortable: false },
            { text: 'Tiers', value: 'tiers', sortable: false },
            { text: 'N PIECES', value: 'num_pieces', sortable: false },
            // { text: 'TIERS', value: 'tiers.denomination' },
            { text: 'Libelle', value: 'libelle', sortable: false },
            { text: 'Débit', value: 'debit', sortable: false },
            { text: 'Crédit', value: 'credit', sortable: false },
            { text: 'Solde', value: 'solde', sortable: false },
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
        comptes: [],
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
        format: null,
        grouped:[],
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
        url = process.env.Name_api + "/planComptables";
        this.comptes = await this.$myService.get(url)

        // if journal is selected and date1 and date2 are not null then get ecritures
        // if (this.journal && this.date1 && this.date2) {
        //     console.log(this.$refs.searchForm.validate())
        //     await this.getEcritures()
        // }
        // this.getEcritures()

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
            if (!this.$refs.searchForm.validate() || !this.compteDu || !this.date1 || !this.date2) {
                this.showToast('Veuillez remplir tous les champs')
                return
            }

            let url = process.env.Name_api + "/exercice/" + this.id + "/getEcrituresBySerie";
            let params = {
                dateDebut: this.date1,
                dateFin: this.date2,
                compteDu:this.compteDu.id,
                compteAu:this.compteAu.id
            }
            // let params = {
            //     dateDebut: this.date1,
            //     dateFin: this.date2,
            //     compteDu: 4925,
            //     compteAu: 5259
            // }
            console.log('params : ', params)
            const res = await this.$myService.get(url, params)
            this.ecritures = res
            this.groupeData()
            this.calculateTotal()
            // console.log('res : ', res)

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
            this.someDebit = this.ecritures.reduce((a, b) => a + Number(b.debit), 0).toFixed(2)
            this.someCredit = this.ecritures.reduce((a, b) => a + Number(b.credit), 0).toFixed(2)
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
            console.log('here', this.previousMenu !== null)
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
            let menu;
            switch (item.journal.type) {
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
            this.$router.push({ path: url, query: { num_pieces: item.num_pieces, mode: 'edit' } })
        },
        getList(item, queryText, itemText) {
            return itemText.toLocaleLowerCase().startsWith(queryText.toLocaleLowerCase())
        },
        groupeData() {
            let grouped = this.ecritures.reduce((acc, cur) => {
                const compteId = cur.compte.id;
                if (!acc[compteId]) {
                    acc[compteId] = {
                        rows: [],
                        totalDebit: 0,
                        totalCredit: 0
                    };
                }
                acc[compteId].rows.push(cur);
                if (cur.debit) {
                    acc[compteId].totalDebit += Number(cur.debit);
                    
                }
                if (cur.credit) {
                    acc[compteId].totalCredit += Number(cur.credit);
                }
                return acc;
            }, {});
            let t = [];
            // console.log('grouped : ',grouped)
            // console.log(Object.keys(grouped))
            Object.keys(grouped).forEach(key => {
                grouped[key].rows.forEach(row=>{
                    t.push(row)
                })
                t.push({
                    totalDebit: grouped[key].totalDebit,
                    totalCredit: grouped[key].totalCredit,
                    isTotal: true,
                    numero_compte:t[t.length-1].compte.numero_compte,
                    intitulee:t[t.length-1].compte.intitulee
                })
                
            })
            this.grouped = t
            // console.log('grouped : ',this.grouped)
            this.excel = this.grouped.map(e=>{
                if(e.isTotal){
                    return {
                        journal: `SOUS TOTAL : ${e.numero_compte} - ${e.intitulee}`,
                        debit:e.totalDebit,
                        credit:e.totalCredit
                    }
                }
                else {
                    return {
                        date: this.formatDate(e.date),
                        journal: e.journal.nom,
                        compte: `${e.compte.numero_compte} - ${e.compte.intitulee}`,
                        tiers: e.tiers ? e.tiers.denomination : '',
                        libelle: e.libelle,
                        debit:e.debit,
                        credit:e.credit
                    }
                }
            })
            // console.log('excel : ',this.excel)
        }

    },


}
</script>