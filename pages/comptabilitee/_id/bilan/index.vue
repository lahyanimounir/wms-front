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
                        <td :class="{'title' : isBold(row[0]), 'subTitle' : !isBold(row[0]) , 'first' : true}">{{ row[0] }}</td>
                        <template v-if="isBold(row[0])">

                            <template v-if="row[0] == 'IMMOBILISATION EN NON VALEUR'">
                                <td class="highlighted">{{ showNumber(totalsA[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsA[1])}}</td>
                                <td class="highlighted">{{ showNumber(totalsA[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'IMMOBILISATIONS INCORPORELLES'">
                                <td class="highlighted">{{ showNumber(totalsB[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsB[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsB[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'IMMOBILISATIONS CORPORELLES'">
                                <td class="highlighted">{{ showNumber(totalsC[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsC[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsC[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'IMMOBILISATIONS FINANCIERES'">
                                <td class="highlighted">{{ showNumber(totalsD[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsD[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsD[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'ECARTS DE CONVERSION ACTIF'">
                                <td class="highlighted">{{ showNumber(totalsE[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsE[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsE[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'STOCKS'">
                                <td class="highlighted">{{ showNumber(totalsF[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsF[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsF[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'CREANCES DE L\'ACTIF CIRCULANT'">
                                <td class="highlighted">{{ showNumber(totalsG[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsG[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsG[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TITRES ET VALEURS DE PLACEMENT'">
                                <td class="highlighted">{{ showNumber(totalsH[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsH[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsH[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'ECARTS DE CONVERSION - ACTIF'">
                                <td class="highlighted">{{ showNumber(totalsI[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsI[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsI[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  I  (A+B+C+D+E)'">
                                <td class="total-highlighted">{{ showNumber(totals1[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals1[1]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals1[2]) }}</td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  II  (F+G+H+I)'">
                                <td class="total-highlighted">{{ showNumber(totals2[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals2[1]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals2[2]) }}</td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TRÉSORERIE - ACTIF'">
                                <td class="highlighted">{{ showNumber(totals3[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals3[1]) }}</td>
                                <td class="highlighted">{{ showNumber(totals3[2]) }}</td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                                <td class="highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TOTAL III'">
                                <td class="total-highlighted">{{ showNumber(totals3[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals3[1]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals3[2]) }}</td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                                <td class="total-highlighted"></td>
                            </template>

                            <template v-if="row[0] == 'TOTAL ACTIF ( I + II + III)'">
                                <td class="total-actif-highlight">{{ showNumber(totals[0]) }}</td>
                                <td class="total-actif-highlight">{{ showNumber(totals[1]) }}</td>
                                <td class="total-actif-highlight">{{ showNumber(totals[2]) }}</td>
                                <td class="total-actif-highlight"></td>
                                <td class="total-actif-highlight"></td>
                                <td class="total-actif-highlight"></td>
                            </template>
                            
                        </template>
                        <template v-if="!isBold(row[0])">
                            <td >{{ showNumber(query[row[1]]) }}</td>
                            <td >{{ showNumber(query[row[2]]) }}</td>
                            <td >{{ showNumber(calcDiff(query[row[1]] , query[row[2]])) }}</td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </v-card>
    </div>
</template>

<style>
    .highlighted {
        background-color: yellow;
    }
    .total-highlighted {
        background-color: #f1f1f1;
    }
    .total-actif-highlight {
        background-color: rgb(130, 130, 130);
    }
    
    table {
        table-layout: fixed;
        width: 100%;
        border: 1px solid #eee;
    }
    th , td {
        width:max-content;
        border: 1px solid #eee;
    }
    td {
        text-align: center;
        font-size: 14px;
    }
    .title {
        font-weight:bold;
        font-size: 14px;
    }
    .first {
        text-align: left;
    }
    .subTitle {
        padding-left: 15px;
    }
</style>

<script>
export default {
    data: () => ({
        totalsA:[0 , 0 , 0],
        totalsB:[0 , 0 , 0],
        totalsC:[0 , 0 , 0],
        totalsD:[0 , 0 , 0],
        totalsE:[0 , 0 , 0],
        totalsF:[0 , 0 , 0],
        totalsG:[0 , 0 , 0],
        totalsH:[0 , 0 , 0],
        totalsI:[0 , 0 , 0],
        totals1:[0 , 0 , 0],
        totals2:[0 , 0 , 0],
        totals3:[0 , 0 , 0],
        totals: [0 , 0, 0],
        dossier:{},
        du:'',
        au:'',
        query :[],
        specialTitles : ['IMMOBILISATION EN NON VALEUR' , 'IMMOBILISATIONS INCORPORELLES' , 'IMMOBILISATIONS CORPORELLES' , 'IMMOBILISATIONS FINANCIERES' , 'ECARTS DE CONVERSION ACTIF' , 'TOTAL  I  (A+B+C+D+E)' , 'STOCKS' , 'CREANCES DE L\'ACTIF CIRCULANT' , 'TOTAL  II  (F+G+H+I)' , 'TRÉSORERIE - ACTIF' , 'TOTAL III' , 'TOTAL ACTIF ( I + II + III)' , 'ECARTS DE CONVERSION - ACTIF' , 'TITRES ET VALEURS DE PLACEMENT'],
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
            "TOTAL  I  (A+B+C+D+E)",
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
            "TOTAL  II  (F+G+H+I)",
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
            "TOTAL III",
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
            this.id = this.$route.params.id
            let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
            let info = await this.$myService.get(url)
            this.dossier = info.dossier
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getActif";
            let info2 = await this.$myService.get(url2);
            if(info2){
                this.query = info2.results;
                this.specialTitles.forEach(element => {
                    this.sum(element);
                });
            }
            this.du = info.du;
            this.au = info.au;
        },
        showNumber(number) {
            if(number == 0) {
                return '';
            }else if(number!= undefined) {
                return Math.round(number * 100) / 100;
            }return number;
        },
        sum(title){
            switch(title){
                case 'IMMOBILISATION EN NON VALEUR':
                    var total1 = this.total(["211" , "212", "213"]);
                    var total2 = this.total(["2811" , "2812" , "2813"]);
                    var net = total1-total2;
                    this.totalsA = [total1 , total2 , net];
                    return this.totalsA;
                case 'IMMOBILISATIONS INCORPORELLES':
                    var total1 = this.total(["221" , "222", "223" , "228"]);
                    var total2 = this.total(["2821" , "2822" , "2823" , "2828"]);
                    var net = total1-total2;
                    this.totalsB = [total1 , total2 , net];
                    return this.totalsB;
                case 'IMMOBILISATIONS CORPORELLES':
                    var total1 = this.total(["231" , "232", "233" , "234" , "235" , "238" , "239"]);
                    var total2 = this.total(["2930" , "2832" , "2833", "2834" , "2835" , "2838"]);
                    var net = total1-total2;
                    this.totalsC = [total1 , total2 , net];
                    return this.totalsC;
                case 'IMMOBILISATIONS FINANCIERES':
                    var total1 = this.total(["241" , "248", "251" , "258"]);
                    var total2 = this.total(["2941" , "2948" , "2951" , "2958"]);
                    var net = total1-total2;
                    this.totalsD = [total1 , total2 , net];
                    return this.totalsD;
                case 'ECARTS DE CONVERSION ACTIF':
                    var total1 = this.total(["271" , "272"]);
                    // var net = total1-total2;
                    this.totalsE = [total1 , 0 , total1];
                    return this.totalsE;  
                case 'TOTAL  I  (A+B+C+D+E)':
                    var total1 = this.totalsA[0] + this.totalsB[0] + this.totalsC[0] + this.totalsD[0] + this.totalsE[0];
                    var total2 = this.totalsA[1] + this.totalsB[1] + this.totalsC[1] + this.totalsD[1] + this.totalsE[1];
                    var total3 = this.totalsA[2] + this.totalsB[2] + this.totalsC[2] + this.totalsD[2] + this.totalsE[2];
                    this.totals1 = [ total1, total2 , total3];
                    return this.totals1;
                case 'STOCKS': 
                    var total1 = this.total(["311" , "312", "313" ,"314" , "315"]);
                    var total2 = this.total(["3911" , "3912" , "3913" , "3914", "3915"]);
                    this.totalsF = [total1 , total2 , total1-total2];
                    return this.totalsF; 
                case 'CREANCES DE L\'ACTIF CIRCULANT':
                    var total1 = this.total(["341" , "342", "343" , "345" , "346" , "348" , "349" , "350" , "370"]);
                    var total2 = this.total(["3941" , "3942" , "3943" , "3944" , "3946" , "3948" , "3950"]);
                    this.totalsG = [total1 , total2 , total1-total2];
                    return this.totalsG; 
                case 'TOTAL  II  (F+G+H+I)':
                    var total1 = this.totalsF[0] + this.totalsG[0] + this.totalsH[0] + this.totalsI[0];
                    var total2 = this.totalsF[1] + this.totalsG[1] + this.totalsH[1] + this.totalsI[1];
                    var total3 = this.totalsF[2] + this.totalsG[2] + this.totalsH[2] + this.totalsI[2];
                    this.totals2 = [ total1, total2 , total3];
                    return this.totals2;
                case 'TRÉSORERIE - ACTIF':
                    var total1 = this.total(["511" , "514", "516"]);
                    this.totals3 = [ total1, 0 , total1];
                    return this.totals3;
                case 'TOTAL III':
                    var total1 = this.total(["511" , "514", "516"]);
                    this.totals3 = [ total1, 0 , total1];
                    return this.totals3;
                case 'TOTAL ACTIF ( I + II + III)':
                    var total1 = this.totals1[0] + this.totals2[0] + this.totals3[0];
                    var total2 = this.totals1[1] + this.totals2[1] + this.totals3[1];
                    var total3 = this.totals1[2] + this.totals2[2] + this.totals3[2];
                    this.totals = [ total1, total2 , total3];
                    return this.totals;
                case 'ECARTS DE CONVERSION - ACTIF':
                    var total1 = this.total(["370"]);
                    this.totalsI = [total1 , 0 , total1];
                    return this.totalsI; 
                case 'TITRES ET VALEURS DE PLACEMENT':   
                    var total1 = this.total(["350"]);
                    var total2 = this.total(["3950"]);
                    this.totalsH = [total1 , total2 , total1-total2];
                    return this.totalsH; 
                default:
                    console.log("no option for sum");
                    break;
            }
        },

        total(array) { 
            var t = 0;
            array.forEach(element => {
                t += this.query[element];
            });
            return t;
        },
        isBold(title){
            if(this.specialTitles.includes(title)){
                return true;
            }
            return false;
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
        calcDiff(brut ,amort){
            if(amort == undefined){
                amort = 0;
            }
            return brut - amort;
        },
        goBack() {
            console.log('here', this.previousMenu !== null)
            this.previousMenu ? this.$router.push({ path: this.previousMenu }) : this.$router.go(-1)

        },
    },
}
</script>