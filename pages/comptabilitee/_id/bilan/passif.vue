<template>
    <div>
        <modal name="my-modal"  @close="$modal.hide('my-modal')">
            <div class="modal-class">
                <table class="text-center">
                    <thead style="background-color: bisque;">
                        <tr>
                            <th>Code</th>
                            <th>Somme</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background-color: antiquewhite;"  v-for="val in totalsClick">
                            <td>{{ val[0] }}</td>
                            <td>{{ val[1] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </modal>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">BILAN - PASSIF   (MODEL NORMAL)</div>
            </div>
           
            <table width="100%" class="table styled-table">
                <thead>
                    <tr class="top-header">
                        <th style="background-color: #f1f1f1;">Passif</th>
                        
                        <!-- <th>Journal</th> -->
                        <!-- <th>N PIECES</th> -->
                        <!-- <th>Libelle</th> -->
                        <th style="background-color: #f1f1f1;">Exercice</th>
                        <th style="background-color: #f1f1f1;">Precedent</th>
                        <!-- <th colspan="2">Solde</th> -->
                        <!-- <th>Solde</th> -->
                        <!-- <th>Action</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table">
                        <td v-if="row[0] != ''" :class="{'title2' : isBold(row[0]), 'subTitle' : !isBold(row[0]) , 'first' : true , 'total-highlighted' : row[0] == 'TOTAL PASSIF (I + II + III)'}">{{ row[0] }}</td>
                        <td v-if="row[0] == ''">&nbsp;</td>
                        <template v-if="isBold(row[0])">
                            

                            <template v-if="row[0] == 'CAPITAUX PROPRES'">
                                <td class="highlighted">{{ showNumber(totalsA[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsA[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'CAPITAUX PROPRES ASSIMILES'">
                                <td class="highlighted">{{ showNumber(totalsB[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsB[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'DETTES DE FINANCEMENT'">
                                <td class="highlighted">{{ showNumber(totalsC[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsC[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'PROVISIONS DURABLES POUR RISQUES ET CHARGES'">
                                <td class="highlighted">{{ showNumber(totalsD[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsD[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'ECARTS DE CONVERSION - PASSIF'">
                                <td class="highlighted">{{ showNumber(totalsE[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsE[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  I  (A+B+C+D+E)'">
                                <td class="total-highlighted">{{ showNumber(totals1[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals1[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'DETTES DU PASSIF CIRCULANT'">
                                <td class="highlighted">{{ showNumber(totalsF[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsF[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'AUTRES PROVISIONS POUR RISQUES ET CHARGES'">
                                <td class="highlighted">{{ showNumber(totalsG[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsG[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'ECARTS DE CONVERSION - PASSIF (Éléments circulants)'">
                                <td class="highlighted">{{ showNumber(totalsH[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsH[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  II  (F+G+H)'">
                                <td class="total-highlighted">{{ showNumber(totals2[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals2[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'TRÉSORERIE - PASSIF'">
                                <td class="highlighted">{{ showNumber(totalsI[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totalsI[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL III'">
                                <td class="total-highlighted">{{ showNumber(totals3[0]) }}</td>
                                <td class="total-highlighted">{{ showNumber(totals3[1])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL PASSIF (I + II + III)'">
                                <td class="total">{{ showNumber(totals[0]) }}</td>
                                <td class="total">{{ showNumber(totals[1]) }}</td>
                            </template>
                            
                        </template>
                        <template v-if="!isBold(row[0])">
                            <template v-if="query['111']">
                                <template v-if="!['' , 'd' , 'b' , 'g'].includes(row[1])">
                                    <td >
                                        <a @click="getSubSums(row[1] , 'act')">{{ showNumber(query[row[1]]['act']) }}</a>
                                    </td>
                                    <td v-if="!['' , 'd' , 'b' , 'g'].includes(row[1])">
                                        <a @click="getSubSums(row[1] , 'pre')">{{ showNumber(query[row[1]]['pre']) }}</a>
                                    </td>
                                </template>
                                <!-- first Column -->
                                <template v-if="row[1] == ''">
                                    <td></td>
                                    <td></td>
                                </template>
                            </template>
                            <template v-if="!query['111']">
                                <td></td>
                                <td></td>
                            </template>
                        </template>
                    </tr>
                </tbody>
            </table>
        </v-card>
    </div>
</template>



<style>
    .modal-class {
        padding: 20px;
        background-color: rgb(184, 184, 184);
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    }
    a{
        display: block;
    }
    .g-special {
        background-color: rgb(76, 71, 96);
    }
    .d-special {
        background-color: rgb(51, 46, 80);
    }
    .b-special {
        background-color: rgb(5, 4, 8);
    }
    .highlighted {
        background-color: yellow;
    }
    .total {
        background-color: rgb(119, 126, 203);
    }
    .total-highlighted {
        background-color: #f1f1f1;
    }
    .total-actif-highlight {
        background-color: rgb(130, 130, 130);
    }
    
    table {
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
    .first {
        width:fit-content;
        text-align: left;
    }
    .subTitle {
        padding-left: 15px;
    }
    .title2 {
        font-size: 14px;
        font-weight: bold;
    }
</style>

<script>

import Vue from 'vue'
import VueJsModal from 'vue-js-modal'
// import MyModal from '~/components/showDetails.vue'

Vue.use(VueJsModal)

export default {
    
    data: () => ({
        totalsA:[0 , 0 , 0 , 0 , 0 , 0],
        totalsB:[0 , 0 , 0 , 0 , 0 , 0],
        totalsC:[0 , 0 , 0 , 0 , 0 , 0],
        totalsD:[0 , 0 , 0 , 0 , 0 , 0],
        totalsE:[0 , 0 , 0 , 0 , 0 , 0],
        totalsF:[0 , 0 , 0 , 0 , 0 , 0],
        totalsG:[0 , 0 , 0 , 0 , 0 , 0],
        totalsH:[0 , 0 , 0 , 0 , 0 , 0],
        totalsI:[0 , 0 , 0 , 0 , 0 , 0],
        totals1:[0 , 0 , 0 , 0 , 0 , 0],
        totals2:[0 , 0 , 0 , 0 , 0 , 0],
        totals3:[0 , 0 , 0 , 0 , 0 , 0],
        totals: [0 , 0 , 0 , 0 , 0 , 0],
        dossier:{},
        totalsClick : {},
        du:'',
        au:'',
        query :{},
        specialTitles : ['CAPITAUX PROPRES' , 'CAPITAUX PROPRES ASSIMILES' , 'DETTES DE FINANCEMENT' , 'PROVISIONS DURABLES POUR RISQUES ET CHARGES' , 'ECARTS DE CONVERSION - PASSIF' , 'DETTES DU PASSIF CIRCULANT' , 'AUTRES PROVISIONS POUR RISQUES ET CHARGES' , 'ECARTS DE CONVERSION - PASSIF (Éléments circulants)', 'TRÉSORERIE - PASSIF', 'TOTAL  I  (A+B+C+D+E)', 'TOTAL  II  (F+G+H)', 'TOTAL III' ,'TOTAL PASSIF (I + II + III)'],
        table: [
        [
            "CAPITAUX PROPRES",
            ""
        ],
        [
            "Capital social ou personnel (1)",
            "111"
        ],
        [
            "Moins : actionnaires, capital souscrit non appele",
            ""
        ],
        [
            "Capital appele dont verse :",
            ""
        ],
        [
            "Primes d'émission, de fusion, d'apport",
            "112"
        ],
        [
            "Ecarts de réévaluation",
            "113"
        ],
        [
            "Réserve légale",
            "114"
        ],
        [
            "Autres réserves",
            "115"
        ],
        [
            "Report à nouveau (2)",
            "116"
        ],
        [
            "Résultat en instance d'affectation (2)",
            "118"
        ],
        [
            "Résultat net de l'exercice (2)",
            "119"
        ],
        [
            "CAPITAUX PROPRES ASSIMILES",
            ""
        ],
        [
            "Subventions d'investissements",
            "131"
        ],
        [
            "Provisions réglementées",
            "135"
        ],
        [
            "DETTES DE FINANCEMENT",
            ""
        ],
        [
            "Emprunts obligataires",
            "141"
        ],
        [
            "Autres dettes de financement",
            "148"
        ],
        [
            "PROVISIONS DURABLES POUR RISQUES ET CHARGES",
            ""
        ],
        [
            "Provisions pour risques",
            "151"
        ],
        [
            "Provisions pour charges",
            "155"
        ],
        [
            "ECARTS DE CONVERSION - PASSIF",
            ""
        ],
        [
            "Augmentation des créances immobilisées",
            "171"
        ],
        [
            "Diminution des dettes de financement",
            "172"
        ],
        [
            "TOTAL  I  (A+B+C+D+E)",
            ""
        ],
        [
            "",
            ""
        ],
        [
            "DETTES DU PASSIF CIRCULANT",
            ""
        ],
        [
            "Fournisseurs et comptes rattachés",
            "441"
        ],
        [
            "Clients créditeurs, avances et acomptes",
            "442"
        ],
        [
            "Personnel",
            "443"
        ],
        [
            "Organismes sociaux",
            "444"
        ],
        [
            "Etat",
            "445"
        ],
        [
            "Comptes d'associés",
            "446"
        ],
        [
            "Autres créanciers ",
            "448"
        ],
        [
            "Comptes de régularisation - passif",
            "449"
        ],
        [
            "AUTRES PROVISIONS POUR RISQUES ET CHARGES",
            "450"
        ],
        [
            "ECARTS DE CONVERSION - PASSIF (Éléments circulants)",
            "470"
        ],
        [
            "TOTAL  II  (F+G+H)",
            ""
        ],
        [
            "",
            ""
        ],
        [
            "TRÉSORERIE - PASSIF",
            ""
        ],
        [
            "Crédits d'escompte",
            "552"
        ],
        [
            "Crédits de trésorerie",
            "553"
        ],
        [
            "Banques (soldes créditeurs)",
            "554"
        ],
        [
            "TOTAL III",
            ""
        ],
        [
            "",
            ""
        ],
        [
            "TOTAL PASSIF (I + II + III)",
            ""
        ]
    ]
    ,
}),
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.id = this.$route.params.id
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getPassif";
            let info2 = await this.$myService.get(url2);
            if(info2){
                this.query = info2.results;
                console.log(this.query);
                this.specialTitles.forEach(element => {
                    this.sum(element);
                });
            }
            let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
            let info = await this.$myService.get(url)
            this.dossier = info.dossier
            this.du = info.du;
            this.au = info.au;
        },
        async getSubSums(prefix , side){
            console.log(prefix);
            let url3 = process.env.Name_api + "/exercice/" + this.id + "/" + prefix;
            let info3 = await this.$myService.get(url3);
            const keys = Object.keys(info3.results);
            let res = [];
            for (const key of keys) {
                res.push([key , info3.results[key][side]]);
            }
            this.totalsClick = res;
            this.$modal.show('my-modal');
            console.log('show done');
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
                case 'CAPITAUX PROPRES':
                    var total1 = this.total(["111" , "112", "113" , "114" , "115" , "116" ,"118" , "119"]);
                    this.totalsA = [total1[0] , total1[1]];
                    console.log('totalsA' , this.totalsA)
                    return this.totalsA;
                case 'CAPITAUX PROPRES ASSIMILES':
                    var total1 = this.total(["131" , "135"]);
                    this.totalsB = [total1[0] , total1[1]];
                    console.log('totalsB' , this.totalsB);
                    return this.totalsB;
                case 'DETTES DE FINANCEMENT':
                    var total1 = this.total(["141" , "148"]);
                    this.totalsC = [total1[0] , total1[1]];
                    console.log('totalsC' , this.totalsC);
                    return this.totalsC;
                case 'PROVISIONS DURABLES POUR RISQUES ET CHARGES':
                    var total1 = this.total(["151" , "155"]);
                    this.totalsD = [total1[0] , total1[1]];
                    console.log('totalsD' , this.totalsD);
                    return this.totalsD;
                case 'ECARTS DE CONVERSION - PASSIF':
                    var total1 = this.total(["171" , "172"]);
                    this.totalsE = [total1[0] , total1[1]];
                    console.log('totalsE' , this.totalsE);
                    return this.totalsE;
                case 'TOTAL  I  (A+B+C+D+E)':
                    var total1 = this.totalsA[0] + this.totalsB[0] + this.totalsC[0] + this.totalsD[0] + this.totalsE[0];
                    var total2 = this.totalsA[1] + this.totalsB[1] + this.totalsC[1] + this.totalsD[1] + this.totalsE[1];
                    this.totals1 = [ total1, total2];
                    console.log('totals1' , this.totals1);
                    return this.totals1;
                case 'DETTES DU PASSIF CIRCULANT': 
                    var total1 = this.total(["441" , "442", "443" ,"444" , "445", "446", "448" , "449"]);
                    this.totalsF = [total1[0] , total1[1]];
                    console.log('totalsF' , this.totalsF);
                    return this.totalsF; 
                case 'AUTRES PROVISIONS POUR RISQUES ET CHARGES':
                    var total1 = this.total(["450"]);
                    this.totalsG = [total1[0] , total1[1]];
                    console.log('totalsG' , this.totalsG);
                    return this.totalsG; 
                case 'ECARTS DE CONVERSION - PASSIF (Éléments circulants)':
                    var total1 = this.total(["470"]);
                    this.totalsH = [total1[0] , total1[1]];
                    console.log('totalsH' , this.totalsH);
                    return this.totalsH; 
                case 'TOTAL  II  (F+G+H)':
                    var total1 = this.totalsF[0] + this.totalsG[0] + this.totalsH[0];
                    var total2 = this.totalsF[1] + this.totalsG[1] + this.totalsH[1];
                    this.totals2 = [total1 , total2];
                    console.log('totals2' , this.totals2);
                    return this.totals2; 
                case 'TOTAL III':
                    total1 = [this.totalsI[0] , this.totalsI[1]];
                    this.totals3 = total1;
                    console.log('totals3' , this.totals3);
                    return this.totals3;
                case 'TOTAL PASSIF (I + II + III)':
                    var total1 = this.totals1[0] + this.totals2[0] + this.totals3[0];
                    var total2 = this.totals1[1] + this.totals2[1] + this.totals3[1];
                    this.totals = [ total1, total2];
                    console.log('totals' , this.totals);
                    return this.totals;
                case 'TRÉSORERIE - PASSIF':
                    var total1 = this.total(["552" , "553" , "554"]);
                    this.totalsI = [total1[0] , total1[1]];
                    console.log('totalsI' , this.totalsI);
                    return this.totalsI; 
                default:
                    console.log("no option for sum");
                    break;
            }
        },

        total(array) { 
            var t1 = 0;
            var t2 = 0;
            array.forEach(element => {
                t1 += this.query[element]["act"];
                t2 += this.query[element]["pre"];
            });
            return [t1 , t2];
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