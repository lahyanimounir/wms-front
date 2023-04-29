<!-- <template>
    <div>
        <h1>Bilan</h1>
        <p>Page de bilan actif</p>
    </div>
</template>
<style></style>-->


<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">BILAN - ACTIF   (MODEL NORMAL) :</div>
            </div>
           
            <table width="100%" class="table styled-table">
                <thead>
                    <tr class="top-header">
                        <th  rowspan="2" style="background-color: #f1f1f1;">Actif</th>
                        
                        <!-- <th>Journal</th> -->
                        <!-- <th>N PIECES</th> -->
                        <!-- <th>Libelle</th> -->
                        <th colspan="3" style="background-color: #f1f1f1;">Exercice</th>
                        <th colspan="3" style="background-color: #f1f1f1;">Precedent</th>
                        <!-- <th colspan="2">Solde</th> -->
                        <!-- <th>Solde</th> -->
                        <!-- <th>Action</th> -->
                    </tr>
                    <tr class="table-header">
                        <!-- <th>Date</th> -->
                        <th>Brut</th>
                        <!-- <th>Journal</th> -->
                        <!-- <th>N PIECES</th> -->
                        <!-- <th>Libelle</th> -->
                        <th>Amort-Prov</th>
                        <th>Net</th>
                        <th>Brut</th>
                        <th>Amort-Prov</th>
                        <th>Net</th>
                        <!-- <th>Crédit</th> -->
                        <!-- <th>Solde</th> -->
                        <!-- <th>Action</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table">
                        <td>{{row[0]}}</td>
                        <td>{{ row[1] }}</td>
                        <td>{{ row[2] }}</td>
                        <td></td>
                        <td>{{ row[1] }}</td>
                        <td>{{ row[2] }}</td>
                        <td></td>
                    </tr>
                </tbody>
                    
                <!-- <tbody> -->
                    <!-- <tr v-for="ecriture in grouped"  :key="ecriture.id"> -->
                        <!-- <template v-if="!ecriture.isTotal"> -->
                            <!-- <td>{{ formatDate(ecriture.date) }}</td> -->
                            <!-- <td>{{ ecriture.compte.numero_compte }} - {{ ecriture.compte.intitulee }}</td> -->
                            <!-- <td>{{ ecriture.numero_compte}}</td> -->
                            <!-- <td>{{ ecriture.intitulee }}</td> -->
                            <!-- <td>{{ ecriture.tiers && ecriture.tiers.denomination }}</td> -->
                            <!-- <td class="debit">{{ ecriture.reportDebit }}</td>
                            <td class="credit">{{ ecriture.reportCredit }}</td>
                            <td class="debit">{{ ecriture.mouvementDebit }}</td>
                            <td class="credit">{{ ecriture.mouvementCredit }}</td>
                            <td class="debit">{{ ecriture.soldeDebit }}</td>
                            <td class="credit">{{ ecriture.soldeCredit }}</td> -->

                            <!-- <td>{{ ecriture.journal.type }} - {{ ecriture.journal.nom }}</td> -->
                            <!-- <td>{{ ecriture.num_pieces }}</td> -->
                            <!-- <td>{{ ecriture.libelle }}</td> -->
                            <!-- <td v-if="ecriture.debit > 0" style="color:green">{{ ecriture.debit }}</td>
                            <td v-else>{{ ecriture.debit }}</td>
                            <td v-if="ecriture.credit > 0" style="color:red">{{ ecriture.credit }}</td>
                            <td v-else>{{ ecriture.credit }}</td>
                            <td>{{ ecriture.montant }}</td> -->
                            <!-- <td>
                                <v-icon color="#546E7A" class="mr-2" @click="editEcriture(ecriture)">mdi-star</v-icon>
                            </td> -->
                        <!-- </template>
                        <template v-else>
                            <td colspan="2" class="text-left font-weight-bold total compte">
                                SOUS TOTAL COMPTE {{ ecriture.intitulee }} :
                            </td>
                            <td class="total debit">
                                {{ ecriture.report_debit }}
                            </td>
                            <td class="total credit">
                                {{ ecriture.report_credit }}
                            </td>
                            <td class="total debit">
                                {{ ecriture.mouvement_debit }}
                            </td>
                            <td class="total credit">
                                {{ ecriture.mouvement_credit }}
                            </td>
                            <td class="total debit">
                                {{ ecriture.solde_debit }}
                            </td>
                            <td class="total credit">
                                {{ ecriture.solde_credit }}
                            </td> -->
                            <!-- <td colspan="2" class="total">

                            </td> -->
                            <!-- <td style="font-size:1rem;color:green">{{ ecriture.debit }}</td>
                            <td style="font-size:1rem;color:red">{{ ecriture.credit }}</td>
                            <td></td>
                            <td></td> -->
                        <!-- </template> -->
                    <!-- </tr> -->
                    <!-- <tr>
                        <th class="title">Total</th>
                        <th class=""></th>
                        <th class=""></th>
                       
                        <th class="" style="font-size:1rem;color:green">{{ someDebit }}</th>
                        <th class="" style="font-size:1rem;color:red">{{ someCredit }}</th>
                        <th class=""></th>
                    </tr> -->
                <!-- </tbody> -->
            </table>
        </v-card>
    </div>
</template>

<style>
    table {
        border: 1px solid #eee;
    }
    th , td {
        border: 1px solid #eee;
    }
</style>

<script>
export default {
    data: () => ({
        dossier:{},
        du:'',
        au:'',
        query :[],
        table: [
        [
            "IMMOBILISATION EN NON VALEUR",
            "",
            ""
        ],
        [
            "Frais préliminaires",
            "211",
            "2811"
        ],
        [
            "Charges à répartir sur plusieurs exercices",
            "212",
            "2812"
        ],
        [
            "Primes de remboursement des obligations",
            "213",
            "2813"
        ],
        [
            "IMMOBILISATIONS INCORPORELLES",
            "",
            ""
        ],
        [
            "Immobilisation en recherche et développement",
            "221",
            "2821"
        ],
        [
            "Brevets, marques, droits et valeurs similaires",
            "222",
            "2822"
        ],
        [
            "Fonds commercial",
            "223",
            "2823"
        ],
        [
            "Autres immobilisations incorporelles",
            "228",
            "2828"
        ],
        [
            "IMMOBILISATIONS CORPORELLES",
            "",
            ""
        ],
        [
            "Terrains",
            "231",
            "2930"
        ],
        [
            "Constructions",
            "232",
            "2832"
        ],
        [
            "Installations techniques, matériel et outillage",
            "233",
            "2833"
        ],
        [
            "Matériel transport",
            "234",
            "2834"
        ],
        [
            "Mobilier, matériel de bureau, aménagements divers",
            "235",
            "2835"
        ],
        [
            "Autres immobilisations corporelles",
            "238",
            "2838"
        ],
        [
            "Immobilisations corporelles en cours",
            "239",
            ""
        ],
        [
            "IMMOBILISATIONS FINANCIERES",
            "",
            ""
        ],
        [
            "Prêts immobilisés",
            "241",
            "2941"
        ],
        [
            "Autres créances financières",
            "248",
            "2948"
        ],
        [
            "Titres de participation",
            "251",
            "2951"
        ],
        [
            "Autres titres immobilisés",
            "258",
            "2958"
        ],
        [
            "ECARTS DE CONVERSION ACTIF",
            "",
            ""
        ],
        [
            "Diminution des créances immobilisées",
            "271",
            ""
        ],
        [
            "Augmentation des dettes de financement",
            "272",
            ""
        ],
        [
            "TOTAL  I  (A+B+C+D+E)  ",
            "",
            ""
        ],
        [
            "STOCKS",
            "",
            ""
        ],
        [
            "Marchandises",
            "311",
            "3911"
        ],
        [
            "Matières et fournitures consommables",
            "312",
            "3912"
        ],
        [
            "Produits en cours",
            "313",
            "3913"
        ],
        [
            "Produits intermédiaires et produits résiduels",
            "314",
            "3914"
        ],
        [
            "Produits finis",
            "315",
            "3915"
        ],
        [
            "CREANCES DE L'ACTIF CIRCULANT",
            "",
            ""
        ],
        [
            "Fournisseurs débiteurs, avances et acomptes",
            "341",
            "3941"
        ],
        [
            "Clients et comptes rattachés ",
            "342",
            "3942"
        ],
        [
            "Personnel",
            "343",
            "3943"
        ],
        [
            "Etat",
            "345",
            "3944"
        ],
        [
            "Comptes d'associés",
            "346",
            "3946"
        ],
        [
            "Autres débiteurs ",
            "348",
            "3948"
        ],
        [
            "Comptes de régularisation Actif",
            "349",
            ""
        ],
        [
            "TITRES ET VALEURS DE PLACEMENT",
            "350",
            "3950"
        ],
        [
            "ECARTS DE CONVERSION - ACTIF",
            "370",
            ""
        ],
        [
            "TOTAL  II  (F+G+H+I)  ",
            "",
            ""
        ],
        [
            "TRÉSORERIE - ACTIF",
            "",
            ""
        ],
        [
            "Chèques et valeurs à encaisser",
            "511",
            ""
        ],
        [
            "Banque, T.G. et C.C.P.",
            "514",
            ""
        ],
        [
            "Caisse, Régies d'avances et accréditifs",
            "516",
            ""
        ],
        [
            "TOTAL III  ",
            "",
            ""
        ],
        [
            "TOTAL ACTIF ( I + II + III)",
            "",
            ""
        ]
    ],
}),
    created() {
        this.init()
    },
    methods: {
        async init() {
            // console.log('initiated it');
            this.id = this.$route.params.id
            let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
            let info = await this.$myService.get(url)
            this.dossier = info.dossier
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getActif";
            this.query = await this.$myService.get(url2)
            this.du = info.du;
            this.au = info.au;
            console.log('info : ', info)
        },

        async getEcritures(init = false) {
            if (init == false && (!this.$refs.searchForm.validate() || !this.compteDu || !this.date1 || !this.date2)) {
                this.showToast('Veuillez remplir tous les champs')
                return
            }

            let url = process.env.Name_api + "/exercice/" + this.id + "/getEcrituresBySerie";
            let params = {}
            if(init === true){
                console.log('init')
                let min = this.comptes.find(x => x.numero_compte === Math.min.apply(Math, this.comptes.map(function(o) { return o.numero_compte; })))
                let max = this.comptes.find(x => x.numero_compte === Math.max.apply(Math, this.comptes.map(function(o) { return o.numero_compte; })))
                params = {
                    dateDebut: this.date1,
                    dateFin: this.date2,
                    compteDu:min.id,
                    compteAu:max.id
                }
                this.compteDu = min
                this.compteAu = max
            }
            else{
                console.log('not init')
                params = {
                    dateDebut: this.date1,
                    dateFin: this.date2,
                    compteDu:this.compteDu.id,
                    compteAu:this.compteAu.id
                }
            }
            // let params = {
            //     dateDebut: this.date1,
            //     dateFin: this.date2,
            //     compteDu:this.compteDu.id,
            //     compteAu:this.compteAu.id
            // }
            // let params = {
            //     dateDebut: this.date1,
            //     dateFin: this.date2,
            //     compteDu: 4925,
            //     compteAu: 5259
            // }
            console.log('params : ', params)
            const res = await this.$myService.get(url, params)
            this.ecritures = res
            // console.log('this ecr : ', this.ecritures)
            // console.log('temp : ', temp)
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
            const groupedData = {};
            this.ecritures.forEach(entry => {
            if (!groupedData[entry.compte.numero_compte]) {
                groupedData[entry.compte.numero_compte] = [];
            }
            groupedData[entry.compte.numero_compte].push(entry);
            });

            const transformedData = [];
            let previousAccountNumber = null;
            let reportDebitSubTotal = 0;
            let reportCreditSubTotal = 0;
            let mouvementDebitSubTotal = 0;
            let mouvementCreditSubTotal = 0;
            let soldeDebitSubTotal = 0;
            let soldeCreditSubTotal = 0;
            Object.keys(groupedData).forEach(accountNumber => {
            if (previousAccountNumber && accountNumber[0] !== previousAccountNumber[0]) {
                
                const previousTransformedEntry = {
                    intitulee: `TOTAL ${previousAccountNumber[0]}XXXXXXX`,
                    report_debit: reportDebitSubTotal.toFixed(2),
                    report_credit: reportCreditSubTotal.toFixed(2),
                    mouvement_debit: mouvementDebitSubTotal.toFixed(2),
                    mouvement_credit: mouvementCreditSubTotal.toFixed(2),
                    solde_debit: soldeDebitSubTotal.toFixed(2),
                    solde_credit: soldeCreditSubTotal.toFixed(2),
                    isTotal: true
                };
                transformedData.push(previousTransformedEntry);
                reportDebitSubTotal = 0;
                reportCreditSubTotal = 0;
                mouvementDebitSubTotal = 0;
                mouvementCreditSubTotal = 0;
                soldeDebitSubTotal = 0;
                soldeCreditSubTotal = 0;
            }
           
            const accountEntries = groupedData[accountNumber];
            const reportDebit = accountEntries
                .filter(entry => entry.journal.type === "A NOUVEAU")
                .reduce((total, entry) => total + Number(entry.debit), 0);
            const reportCredit = accountEntries
                .filter(entry => entry.journal.type === "A NOUVEAU")
                .reduce((total, entry) => total + Number(entry.credit), 0);
            const mouvementDebit = accountEntries.reduce((total, entry) => total + Number(entry.debit), 0);
            const mouvementCredit = accountEntries.reduce((total, entry) => total + Number(entry.credit), 0);
            const soldeDebit = reportDebit + mouvementDebit;
            const soldeCredit = reportCredit + mouvementCredit;
            const transformedEntry = {
                numero_compte: parseInt(accountNumber),
                intitulee: accountEntries[0].compte.intitulee,
                reportDebit : reportDebit,
                reportCredit: reportCredit,
                mouvementDebit :mouvementDebit,
                mouvementCredit: mouvementCredit,
                soldeDebit: soldeDebit,
                soldeCredit: soldeCredit,
            };
            reportDebitSubTotal += reportDebit;
            reportCreditSubTotal += reportCredit;
            mouvementDebitSubTotal += mouvementDebit;
            mouvementCreditSubTotal += mouvementCredit;
            soldeDebitSubTotal += soldeDebit;
            soldeCreditSubTotal += soldeCredit;

            transformedData.push(transformedEntry);

             if (accountNumber === Object.keys(groupedData)[Object.keys(groupedData).length - 1]) {
                const previousTransformedEntry = {
                    intitulee: `TOTAL ${accountNumber[0]}XXXXXXX`,
                    report_debit: reportDebitSubTotal.toFixed(2),
                    report_credit: reportCreditSubTotal.toFixed(2),
                    mouvement_debit: mouvementDebitSubTotal.toFixed(2),
                    mouvement_credit: mouvementCreditSubTotal.toFixed(2),
                    solde_debit: soldeDebitSubTotal.toFixed(2),
                    solde_credit: soldeCreditSubTotal.toFixed(2),
                    isTotal: true
                };
                transformedData.push(previousTransformedEntry);
            }
            previousAccountNumber = accountNumber;
            });
            
            console.log('transformedData : ', transformedData)
            this.grouped = transformedData
        }

    },

}
</script>