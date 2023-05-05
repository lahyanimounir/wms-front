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
                <div class="font-weight-bold" style="font-size:18px;">COMPTE DE PRODUITS ET CHARGES (Hors taxes)</div>
            </div>
           
            <table width="100%" class="table styled-table">
                <thead>
                    <tr class="top-header">
                        <th rowspan="2" style="background-color: #f1f1f1;">( MODEL NORMAL )</th>
                        <th colspan="3" style="background-color: #f1f1f1;">Operations</th>
                        <th style="background-color: #f1f1f1;"></th>
                    </tr>
                    <tr>
                        <th style="background-color: #f1f1f1">Propres à L'exercice 1</th>
                        <th style="background-color: #f1f1f1">Exercices précédants 2</th>
                        <th style="background-color: #f1f1f1">Exercice 1 + 2 = 3</th>
                        <th style="background-color: #f1f1f1">Exercice Précédant 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table">
                        <td v-if="row[0] != ''" :class="{'title2' : isBold(row[0]), 'subTitle' : !isBold(row[0]) , 'first' : !isTotal(row[0]) , 'last' : isTotal(row[0])}">{{ row[0] }}</td>
                        <td v-if="row[0] == ''">&nbsp;</td>
                        <template v-if="isBold(row[0])">
                            <template v-if="row[0] == 'TOTAL  I'">
                                <td class="highlighted">{{ showNumber(totals1[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals1[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals1[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals1[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  II'">
                                <td class="highlighted">{{ showNumber(totals2[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals2[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals2[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals2[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'III - RESULTAT D\'EXPLOITATION ( I - II )'">
                                <td class="d-special">{{ showNumber(totals3[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals3[1])}}</td>
                                <td class="g-special">{{ showNumber(totals3[2])}}</td>
                                <td class="g-special">{{ showNumber(totals3[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  IV'">
                                <td class="highlighted">{{ showNumber(totals4[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals4[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals4[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals4[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  V'">
                                <td class="highlighted">{{ showNumber(totals5[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals5[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals5[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals5[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'VI - RESULTAT FINANCIER ( IV - V )'">
                                <td class="d-special">{{ showNumber(totals6[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals6[1])}}</td>
                                <td class="g-special">{{ showNumber(totals6[2])}}</td>
                                <td class="g-special">{{ showNumber(totals6[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'VII - RESULTAT COURANT ( III + V I)'">
                                <td class="d-special">{{ showNumber(totals7[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals7[1])}}</td>
                                <td class="g-special">{{ showNumber(totals7[2])}}</td>
                                <td class="g-special">{{ showNumber(totals7[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  VIII'">
                                <td class="highlighted">{{ showNumber(totals8[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals8[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals8[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals8[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'TOTAL  IX'">
                                <td class="highlighted">{{ showNumber(totals9[0]) }}</td>
                                <td class="highlighted">{{ showNumber(totals9[1])}}</td>
                                <td class="highlighted">{{ showNumber(totals9[2])}}</td>
                                <td class="highlighted">{{ showNumber(totals9[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'X - RESULTAT NON COURANT ( VIII- IX )'">
                                <td class="d-special">{{ showNumber(totals10[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals10[1])}}</td>
                                <td class="g-special">{{ showNumber(totals10[2])}}</td>
                                <td class="g-special">{{ showNumber(totals10[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XI - RESULTAT AVANT IMPOTS ( VII+ X )'">
                                <td class="d-special">{{ showNumber(totals11[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals11[1])}}</td>
                                <td class="g-special">{{ showNumber(totals11[2])}}</td>
                                <td class="g-special">{{ showNumber(totals11[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XII - IMPOTS SUR LES RESULTATS'">
                                <td>{{ showNumber(totals12[0]) }}</td>
                                <td>{{ showNumber(totals12[1])}}</td>
                                <td>{{ showNumber(totals12[2])}}</td>
                                <td>{{ showNumber(totals12[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XIII - RESULTAT NET ( XI - XII )'">
                                <td class="d-special">{{ showNumber(totals13[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals13[1])}}</td>
                                <td class="g-special">{{ showNumber(totals13[2])}}</td>
                                <td class="g-special">{{ showNumber(totals13[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XIV - TOTAL DES PRODUITS ( I + IV + VIII )'">
                                <td class="d-special">{{ showNumber(totals14[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals14[1])}}</td>
                                <td class="g-special">{{ showNumber(totals14[2])}}</td>
                                <td class="g-special">{{ showNumber(totals14[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XV - TOTAL DES CHARGES ( II + V + IX + XII )'">
                                <td class="d-special">{{ showNumber(totals15[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals15[1])}}</td>
                                <td class="g-special">{{ showNumber(totals15[2])}}</td>
                                <td class="g-special">{{ showNumber(totals15[3])}}</td>
                            </template>

                            <template v-if="row[0] == 'XVI - RESULTAT NET ( XIV - XV )'">
                                <td class="d-special">{{ showNumber(totals16[0]) }}</td>
                                <td class="d-special">{{ showNumber(totals16[1])}}</td>
                                <td class="g-special">{{ showNumber(totals16[2])}}</td>
                                <td class="g-special">{{ showNumber(totals16[3])}}</td>
                            </template>
                            
                            <template v-if="['I - PRODUITS D\'EXPLOITATION' , 'Chiffres d\'affaires' ,'II - CHARGES D\'EXPLOITATION' , 'IV - PRODUITS FINANCIERS' , 'V - CHARGES FINANCIERES' , 'VIII - PRODUITS NON COURANTS' , 'IX - CHARGES NON COURANTES'].includes(row[0])" >
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </template>
                        </template>
                        <template v-if="!isBold(row[0])">
                            <template v-if="query['7598']">
                                <template v-if="row[1] == ''">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </template>

                                <template v-if="row[1] == '713'">
                                    <td >
                                        <a @click="getSubSums(row[1] , 'act')">{{ showNumber(query[row[1]]['act']) }}</a>
                                    </td>
                                    <td class="b-special">&nbsp;</td>
                                    <td >{{ showNumber(query[row[1]]['act']) }}</td>
                                    <td>&nbsp;</td>
                                </template>

                                <template v-if="row[1] != '713' && row[1] != ''">
                                    <td>
                                        <a @click="getSubSums(row[1] , 'act')">{{ showNumber(query[row[1]]['act']) }}</a>
                                    </td>
                                    <td>
                                        <a @click="getSubSums(row[2] , 'act')">{{ showNumber(query[row[2]]['act']) }}</a>
                                    </td>
                                    <td>{{ showNumber(query[row[2]]['act'] + query[row[1]]['act']) }}</td>
                                    <td>&nbsp;</td>
                                </template>
                            </template>
                            <template v-if="!query['7598']">
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
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
    .last {
        width:fit-content;
        text-align: right;
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
        totals1: [0 , 0 , 0 , 0],
        totals2: [0 , 0 , 0 , 0],
        totals3: [0 , 0 , 0 , 0],
        totals4: [0 , 0 , 0 , 0],
        totals5: [0 , 0 , 0 , 0],
        totals6: [0 , 0 , 0 , 0],
        totals7: [0 , 0 , 0 , 0],
        totals8: [0 , 0 , 0 , 0],
        totals9: [0 , 0 , 0 , 0],
        totals10:[0 , 0 , 0 , 0],
        totals11:[0 , 0 , 0 , 0],
        totals12:[0 , 0 , 0 , 0],
        totals13:[0 , 0 , 0 , 0],
        totals14:[0 , 0 , 0 , 0],
        totals15:[0 , 0 , 0 , 0],
        totals16:[0 , 0 , 0 , 0],
        dossier:{},
        totalsClick : {},
        du:'',
        au:'',
        query :{},
        specialTitles : ['I - PRODUITS D\'EXPLOITATION' , 'Chiffres d\'affaires' , 'TOTAL  I', 'II - CHARGES D\'EXPLOITATION' , 'TOTAL  II' , 'III - RESULTAT D\'EXPLOITATION ( I - II )' , 'IV - PRODUITS FINANCIERS' , 'TOTAL  IV' , 'V - CHARGES FINANCIERES' ,'TOTAL  V' ,  'VI - RESULTAT FINANCIER ( IV - V )'  , 'VII - RESULTAT COURANT ( III + V I)' , 'VIII - PRODUITS NON COURANTS' , 'TOTAL  VIII' , 'IX - CHARGES NON COURANTES' , 'TOTAL  IX' , 'X - RESULTAT NON COURANT ( VIII- IX )' , 'XI - RESULTAT AVANT IMPOTS ( VII+ X )' , 'XII - IMPOTS SUR LES RESULTATS' , 'XIII - RESULTAT NET ( XI - XII )' ,'XIV - TOTAL DES PRODUITS ( I + IV + VIII )' , 'XV - TOTAL DES CHARGES ( II + V + IX + XII )'  , 'XVI - RESULTAT NET ( XIV - XV )'],
        table: [
        [
            "I - PRODUITS D'EXPLOITATION",
            "",
            ""
        ],
        [
            "Ventes de marchandises (en l'état)",
            "711",
            "7118"
        ],
        [
            "Ventes de biens et services produits",
            "712",
            "7128"
        ],
        [
            "Chiffres d'affaires",
            "",
            ""
        ],
        [
            "Variation de stock de produits (±)",
            "713",
            ""
        ],
        [
            "Immobilisations produites par l'Ese pour elle même",
            "714",
            "7148"
        ],
        [
            "Subvention d'exploitation",
            "716",
            "7168"
        ],
        [
            "Autres produits d'exploitation",
            "718",
            "7188"
        ],
        [
            "Reprises d'exploitation; transfert de charges",
            "719",
            "7198"
        ],
        [
            "TOTAL  I",
            "",
            ""
        ],
        [
            "II - CHARGES D'EXPLOITATION",
            "",
            ""
        ],
        [
            "Achats revendus de marchandises",
            "611",
            "6118"
        ],
        [
            "Achats consommés de matières et de fournitures",
            "612",
            "6128"
        ],
        [
            "Autres charges externes",
            "613",
            "6148"
        ],
        [
            "Impôts et taxes",
            "616",
            "6168"
        ],
        [
            "Charges de personnel",
            "617",
            "6178"
        ],
        [
            "Autres charges d'exploitation",
            "618",
            "6188"
        ],
        [
            "Dotations d'exploitation",
            "619",
            "6198"
        ],
        [
            "TOTAL  II",
            "",
            ""
        ],
        [
            "III - RESULTAT D'EXPLOITATION ( I - II )",
            "",
            ""
        ],
        [
            "IV - PRODUITS FINANCIERS",
            "",
            ""
        ],
        [
            "Produits des titres de participation et autres t. immo",
            "732",
            "7328"
        ],
        [
            "Gains de change",
            "733",
            "7338"
        ],
        [
            "Intérêts et autres produits financiers",
            "738",
            "7388"
        ],
        [
            "Reprises financières; transferts de charges",
            "739",
            "7398"
        ],
        [
            "TOTAL  IV",
            "",
            ""
        ],
        [
            "V - CHARGES FINANCIERES",
            "",
            ""
        ],
        [
            "Charges d'intérêts",
            "631",
            "6318"
        ],
        [
            "Pertes de change",
            "633",
            "6338"
        ],
        [
            "Autres charges financières",
            "638",
            "6388"
        ],
        [
            "Dotations financières",
            "639",
            "6398"
        ],
        [
            "TOTAL  V",
            "",
            ""
        ],
        [
            "VI - RESULTAT FINANCIER ( IV - V )",
            "",
            ""
        ],
        [
            "VII - RESULTAT COURANT ( III + V I)",
            "",
            ""
        ],
        [
            "VIII - PRODUITS NON COURANTS",
            "",
            ""
        ],
        [
            "Produits des cessions d'immobilisations",
            "751",
            "7518"
        ],
        [
            "Subventions d'équilibre",
            "756",
            "7568"
        ],
        [
            "Reprises sur subventions d'investissement",
            "757",
            "7578"
        ],
        [
            "Autres produits non courants",
            "758",
            "7588"
        ],
        [
            "Reprises non courantes; transferts de charges",
            "759",
            "7598"
        ],
        [
            "TOTAL  VIII",
            "",
            ""
        ],
        [
            "IX - CHARGES NON COURANTES",
            "",
            ""
        ],
        [
            "Valeurs nettes d'amort. des immo. cédées",
            "651",
            "6518"
        ],
        [
            "Subventions accordées",
            "656",
            "6568"
        ],
        [
            "Autres charges non courantes",
            "658",
            "6588"
        ],
        [
            "Dotations non courantes aux amort. et provisions",
            "659",
            "6598"
        ],
        [
            "TOTAL  IX",
            "",
            ""
        ],
        [
            "X - RESULTAT NON COURANT ( VIII- IX )",
            "",
            ""
        ],
        [
            "",
            "",
            ""
        ],
        [
            "XI - RESULTAT AVANT IMPOTS ( VII+ X )",
            "",
            ""
        ],
        [
            "XII - IMPOTS SUR LES RESULTATS",
            "670",
            "670"
        ],
        [
            "XIII - RESULTAT NET ( XI - XII )",
            "",
            ""
        ],
        [
            "",
            "",
            ""
        ],
        [
            "XIV - TOTAL DES PRODUITS ( I + IV + VIII )",
            "",
            ""
        ],
        [
            "XV - TOTAL DES CHARGES ( II + V + IX + XII )",
            "",
            ""
        ],
        [
            "XVI - RESULTAT NET ( XIV - XV )",
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getCPC";
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
                case 'TOTAL  I':
                    var total1 = this.total(['711','712','713','714','716','718','719']);
                    var total2 = this.total(['7118','7128','7148','7168','7188','7198']);
                    var sum = total1[0] + total2[0];
                    this.totals1 = [total1[0] , total2[0] , sum , 0];
                    return this.totals1;
                case 'TOTAL  II':
                    var total1 = this.total(['611','612','613','616','617','618','619']);
                    var total2 = this.total(['6118','6128','6148','6168','6178','6188','6198']);
                    var sum = total1[0] + total2[0];
                    this.totals2 = [total1[0] , total2[0] , sum , 0];
                    return this.totals2;
                case 'III - RESULTAT D\'EXPLOITATION ( I - II )':
                    var total1 = this.totals1[0] - this.totals2[0];
                    var total2 = this.totals1[1] - this.totals2[1];
                    var total3 = this.totals1[2] - this.totals2[2];
                    this.totals3 = [total1 , total2 , total3 , 0];
                    return this.totals3;
                case 'TOTAL  IV':
                    var total1 = this.total(['732','733','738','739']);
                    var total2 = this.total(['7328','7338','7388','7398']);
                    var sum = total1[0] + total2[0];
                    this.totals4 = [total1[0] , total2[0] , sum , 0];
                    return this.totals4;
                case 'TOTAL  V':
                    var total1 = this.total(['631','633','638','639']);
                    var total2 = this.total(['6318','6338','6388','6398']);
                    var sum = total1[0] + total2[0];
                    this.totals5 = [total1[0] , total2[0] , sum , 0];
                    return this.totals5;
                case 'VI - RESULTAT FINANCIER ( IV - V )':
                    var total1 = this.totals4[0] - this.totals5[0];
                    var total2 = this.totals4[1] - this.totals5[1];
                    var total3 = this.totals4[2] - this.totals5[2];
                    this.totals6 = [total1 , total2 , total3 , 0];
                    return this.totals6;
                case 'VII - RESULTAT COURANT ( III + V I)': 
                    var total1 = this.totals3[0] + this.totals6[0];
                    var total2 = this.totals3[1] + this.totals6[1];
                    var total3 = this.totals3[2] + this.totals6[2];
                    this.totals7 = [total1 , total2 , total3 , 0];
                    return this.totals7;
                case 'TOTAL  VIII':
                    var total1 = this.total(['751','756','757','758','759']);
                    var total2 = this.total(['7518','7568','7578','7588','7598']);
                    var sum = total1[0] + total2[0];
                    this.totals8 = [total1[0] , total2[0] , sum , 0];
                    return this.totals8;
                case 'TOTAL  IX':
                    var total1 = this.total(['651','656','658','659']);
                    var total2 = this.total(['6518','6568','6588','6598']);
                    var sum = total1[0] + total2[0];
                    this.totals9 = [total1[0] , total2[0] , sum , 0];
                    return this.totals9;    
                case 'X - RESULTAT NON COURANT ( VIII- IX )':
                    var total1 = this.totals8[0] - this.totals9[0];
                    var total2 = this.totals8[1] - this.totals9[1];
                    var total3 = this.totals8[2] - this.totals9[2];
                    this.totals10 = [total1 , total2 , total3 , 0];
                    return this.totals10;
                case 'XI - RESULTAT AVANT IMPOTS ( VII+ X )':
                    var total1 = this.totals7[0] + this.totals10[0];
                    var total2 = this.totals7[1] + this.totals10[1];
                    var total3 = this.totals7[2] + this.totals10[2];
                    this.totals11 = [total1 , total2 , total3 , 0];
                    return this.totals11;
                case 'XII - IMPOTS SUR LES RESULTATS':
                    var total1 = this.total(['670'])[0];
                    this.totals12 = [total1 , total1 , total1 + total1 , 0];
                    return this.totals12;
                case 'XIII - RESULTAT NET ( XI - XII )':
                    var total1 = this.totals11[0] - this.totals12[0];
                    var total2 = this.totals11[1] - this.totals12[1];
                    var total3 = this.totals11[2] - this.totals12[2];
                    this.totals13 = [total1 , total2 , total3 , 0];
                    return this.totals13;
                case 'XIV - TOTAL DES PRODUITS ( I + IV + VIII )':
                    var total1 = this.totals1[0] + this.totals4[0] + this.totals8[0];
                    var total2 = this.totals1[1] + this.totals4[1] + this.totals8[1];
                    var total3 = this.totals1[2] + this.totals4[2] + this.totals8[2];
                    this.totals14 = [total1 , total2 , total3 , 0];
                    return this.totals14;
                case 'XV - TOTAL DES CHARGES ( II + V + IX + XII )':
                    var total1 = this.totals2[0] + this.totals5[0] + this.totals9[0] + this.totals12[0];
                    var total2 = this.totals2[1] + this.totals5[1] + this.totals9[1] + this.totals12[1];
                    var total3 = this.totals2[2] + this.totals5[2] + this.totals9[2] + this.totals12[2];
                    this.totals15 = [total1 , total2 , total3 , 0];
                    return this.totals15;
                case 'XVI - RESULTAT NET ( XIV - XV )':
                    var total1 = this.totals14[0] + this.totals15[0];
                    var total2 = this.totals14[1] + this.totals15[1];
                    var total3 = this.totals14[2] + this.totals15[2];
                    this.totals16 = [total1 , total2 , total3 , 0];
                    return this.totals16;
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

        isTotal(title) {
            var total = ['TOTAL  I' , 'TOTAL  II' , 'TOTAL  IV' , 'TOTAL  V' , 'TOTAL  VIII' , 'TOTAL  IX']
            if(total.includes(title)) {
                return true;
            } else {
                return false;
            }
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