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
                        <template v-for="val in totalsClick">
                            <tr style="background-color: antiquewhite;"  v-if="val[1] != 0">
                                <td>{{ val[0] }}</td>
                                <td>{{ val[1] }}</td>
                            </tr>
                        </template>
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
                <div class="font-weight-bold" style="font-size:18px;">ETAT DES SOLDES INTERMEDIAIRES DE GESTION (E.S.G)</div>
            </div>
           
            <table cellpadding=0 cellspacing=0 width=795 class=xl7316609>
                <col width=23>
                <col width=22 >
                <col width=23 >
                <col width=392 >
                <col width=186 >
                <col width=149 >
                <tr height=37 >
                	<td colspan=4 height=37 width=460 style='height:27.75pt; width:347pt'>Eléments</td>
                	<td width=186 >Exercice</td>
                	<td width=149 >Exercice Précédent</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >1</td>
                	<td >&nbsp;</td>
                	<td >Ventes de marchandises (en l'état )</td>
                	<td v-if="query['711']">{{ showNumber(query['711']['act']) }}</td>
                    <td v-if="!query['711']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >2</td>
                	<td ><span>-</span>-</td>
                	<td >Achats revendus de marchandises</td>
                	<td v-if="query['611']">{{ showNumber(query['611']['act']) }}</td>
                    <td v-if="!query['611']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >I</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >MARGES BRUTES SUR VENTES EN L'ETAT    1- 2</td>
                	<td class="highlighted" v-if="query['711']">{{ showNumber(totalsI[0]) }}</td>
                    <td class="highlighted" v-if="!query['711']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >II</td>
                	<td >&nbsp;</td>
                	<td >+</td>
                	<td >PRODUCTION DE L'EXERCICE (3+4+5)</td>
                	<td class="highlighted" v-if="query['711']">{{ showNumber(totalsII[0]) }}</td>
                    <td v-if="!query['711']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >&nbsp;</td>
                	<td >3</td>
                	<td >&nbsp;</td>
                	<td >Ventes de biens et services produits</td>
                	<td v-if="query['712']">{{ showNumber(query['712']['act']) }}</td>
                    <td v-if="!query['712']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=21 >
                	<td height=21 >&nbsp;</td>
                	<td >4</td>
                	<td >&nbsp;</td>
                	<td >Variation de stocks de produits</td>
                	<td v-if="query['713']">{{ showNumber(query['713']['act']) }}</td>
                    <td v-if="!query['713']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=21 >
                	<td height=21 >&nbsp;</td>
                	<td >5</td>
                	<td >&nbsp;</td>
                	<td >Immobilisations produites par l'entreprise pour elle même</td>
                	<td v-if="query['714']">{{ showNumber(query['714']['act']) }}</td>
                    <td v-if="!query['714']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >III</td>
                	<td >&nbsp;</td>
                	<td >-</td>
                	<td >CONSOMMATION DE L'EXERCICE (6+7)</td>
                	<td class="highlighted" v-if="query['714']">{{ showNumber(totalsIII[0]) }}</td>
                    <td class="highlighted" v-if="!query['714']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >6</td>
                	<td >&nbsp;</td>
                	<td >Achats consommés de matières et fournitures</td>
                	<td v-if="query['612']">{{ showNumber(query['612']['act']) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >7</td>
                	<td >&nbsp;</td>
                	<td >Autres charges externes</td>
                	<td v-if="query['612']">{{ showNumber(totals7[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >IV</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >VALEUR AJOUTEE ( I+II+III )</td>
                	<td class="highlighted" v-if="query['612']">{{ showNumber(totalsIV[0]) }}</td>
                    <td class="highlighted" v-if="!query['612']">&nbsp;</td>
                	<td class=xl8916609>&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >8</td>
                	<td >+</td>
                	<td >Subventions d'exploitation</td>
                	<td v-if="query['716']">{{ showNumber(query['716']['act']) }}</td>
                    <td v-if="!query['716']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >V</td>
                	<td >9</td>
                	<td >-</td>
                	<td >Impôts et taxes</td>
                	<td v-if="query['616']">{{ showNumber(query['616']['act']) }}</td>
                    <td v-if="!query['616']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >10</td>
                	<td >-</td>
                	<td >Charges de personnel</td>
                	<td v-if="query['617']">{{ showNumber(query['617']['act']) }}</td>
                    <td v-if="!query['617']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >EXCEDENT BRUT D'EXPLOITATION ( E.B.E )</td>
                	<td class="highlighted">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >11</td>
                	<td >+</td>
                	<td >Autres produits d'exploitation</td>
                	<td v-if="query['718']">{{ showNumber(query['718']['act']) }}</td>
                    <td v-if="!query['718']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >12</td>
                	<td >-</td>
                	<td >Autres charges d'exploitation</td>
                	<td v-if="query['618']">{{ showNumber(query['618']['act']) }}</td>
                    <td v-if="!query['618']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >13</td>
                	<td >+</td>
                	<td >Reprises d'exploitation: transfert de charges</td>
                	<td v-if="query['719']">{{ showNumber(query['719']['act']) }}</td>
                    <td v-if="!query['719']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >14</td>
                	<td >-</td>
                	<td >Dotations d'exploitation</td>
                	<td v-if="query['619']">{{ showNumber(query['619']['act']) }}</td>
                    <td v-if="!query['619']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >VI</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >RESULTAT D'EXPLOITATION ( + ou -)</td>
                	<td class="highlighted">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >VII</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >RESULTAT FINANCIER</td>
                	<td v-if="query['612']">{{ showNumber(totalsVII[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >VIII</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >RESULTAT COURANT ( + ou - )</td>
                	<td class="highlighted">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >IX</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >RESULTAT NON COURANT ( + ou - )</td>
                	<td v-if="query['612']">{{ showNumber(totalsIX[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >15</td>
                	<td >-</td>
                	<td >Impôts sur les resultats</td>
                	<td v-if="query['612']">{{ showNumber(totals15[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >X</td>
                	<td >&nbsp;</td>
                	<td >=</td>
                	<td >RESULTAT NET DE L'EXERCICE ( + ou - )</td>
                	<td class="highlighted">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 ></td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                </tr>
                <tr height=25 >
                	<td height=25 colspan=4 >II - CAPACITE D'AUTOFINANCEMENT ( C.A.F ) -AUTOFINANCEMENT</td>
                	<td ></td>
                	<td ></td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >1</td>
                	<td >&nbsp;</td>
                	<td >RESULTAT NET DE L'EXERCICE ( + ou - )</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >- Benefice (+)</td>
                	<td >0</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >- Perte (-)</td>
                	<td >0</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >2</td>
                	<td >+</td>
                	<td >Dotations d'exploitation</td>
                	<td v-if="query['612']">{{ showNumber(totalsII2[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >3</td>
                	<td >+</td>
                    <td >Dotations financières</td>
                    <td v-if="query['612']">{{ showNumber(totalsII3[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >4</td>
                	<td >+</td>
                	<td >Dotations non courantes</td>
                	<td v-if="query['612']">{{ showNumber(totalsII4[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >5</td>
                	<td >-</td>
                	<td >Reprises d'exploitation</td>
                	<td v-if="query['612']">{{ showNumber(totalsII5[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >6</td>
                	<td >-</td>
                	<td >Reprises financières</td>
                	<td v-if="query['612']">{{ showNumber(totalsII6[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >7</td>
                	<td >-</td>
                	<td >Reprises non courantes</td>
                	<td v-if="query['612']">{{ showNumber(totalsII7[0]) }}</td>
                    <td v-if="!query['612']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >8</td>
                	<td >-</td>
                	<td >Produits des cession des immobilisations</td>
                	<td v-if="query['751']">{{ showNumber(query['751']['act']) }}</td>
                    <td v-if="!query['751']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >9</td>
                	<td >+</td>
                	<td >Valeurs nettes des immobilisations cédées</td>
                	<td v-if="query['651']">{{ showNumber(query['651']['act']) }}</td>
                    <td v-if="!query['651']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=19 >
                	<td height=19 >I</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >CAPACITE D'AUTOFINANCEMENT ( C.A.F )</td>
                	<td class="highlighted" v-if="query['651']">{{ showNumber(totalsII_I[0]) }}</td>
                    <td class="highlighted" v-if="!query['651']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=17 >
                	<td height=17 >&nbsp;</td>
                	<td >10</td>
                	<td >-</td>
                	<td >Distributions de bénéfices</td>
                	<td class="total-highlighted"><input style="width:100%" type="tel"/></td>
                	<td class="total-highlighted"><input style="width:100%" type="tel"/></td>
                </tr>
                <tr height=21 >
                	<td height=21 >II</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >AUTOFINANCEMENT</td>
                	<td class="highlighted" v-if="query['651']">{{ showNumber(totalsII_II[0]) }}</td>
                    <td class="highlighted" v-if="!query['651']">&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr height=0 >
                	<td width=23 ></td>
                	<td width=22 ></td>
                	<td width=23 ></td>
                	<td width=392 ></td>
                	<td width=186 ></td>
                	<td width=149 ></td>
                </tr>
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

    tr td:nth-child(4) {
        width: auto;
    }
    td {
        text-align: left;
        padding: 0 5px;
        font-size: 14px;
    }
    input {
        padding: 0 5px;
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
        totalsI:[0 , 0 ],
        totalsII:[0 , 0 ],
        totalsIII:[0 , 0 ],
        totals7:[0,0],
        totalsIV:[0 , 0 ],
        totalsVII:[0 , 0 ],
        totalsIX:[0 , 0 ],
        totalsX:[0 , 0 ],
        totalsII2 : [0 , 0 ],
        totalsII3 : [0 , 0 ],
        totalsII4 : [0 , 0 ],
        totalsII5 : [0 , 0 ],
        totalsII6 : [0 , 0 ],
        totalsII7 : [0 , 0 ],
        totalsII_I: [0 , 0 ],
        totalsII_II : [0 , 0 ],
        totals15 : [0 , 0],
        dossier:{},
        totalsClick : {},
        du:'',
        au:'',
        query :{},
        specialTitles : ['MARGES BRUTES SUR VENTES EN L\'ETAT  1- 2' , 'VALEUR AJOUTEE ( I+II+III )' , 'EXCEDENT BRUT D\'EXPLOITATION ( E.B.E )' ,'INSUFFISANCE BRUTE D\'EXPLOITATION ( I.B.E )', 'RESULTAT D\'EXPLOITATION ( + ou - )','RESULTAT COURANT ( + ou - )', 'RESULTAT NET DE L\'EXERCICE ( + ou - )' , 'II - CAPACITE D\'AUTOFINANCEMENT  ( C.A.F ) - AUTOFINANCEMENT' ,  'RESULTAT NET DE L\'EXERCICE ( + ou - ) ' ,'CAPACITE D\'AUTOFINANCEMENT  ( C.A.F )' , 'AUTOFINANCEMENT'],
        table:[[
            "Ventes de marchandises (en l'état )",
            "711"
        ],
        [
            "Achats revendus de marchandises",
            "611"
        ],
        [
            "MARGES BRUTES SUR VENTES EN L'ETAT  1- 2",
            ""
        ],
        [
            "PRODUCTION DE L'EXERCICE (3+4+5)",
            ""
        ],
        [
            "Ventes de biens et services produits",
            "712"
        ],
        [
            "Variation de stocks de produits",
            "713"
        ],
        [
            "Immobilisations produites par l'entreprise pour elle même",
            "714"
        ],
        [
            "CONSOMMATION DE L'EXERCICE (6+7)",
            ""
        ],
        [
            "Achats consommés de matières et fournitures",
            "612"
        ],
        [
            "Autres charges externes",
            ""
        ],
        [
            "VALEUR AJOUTEE ( I+II+III )",
            ""
        ],
        [
            "Subventions d'exploitation",
            "716"
        ],
        [
            "Impôts et taxes",
            "616"
        ],
        [
            "Charges de personnel",
            "617"
        ],
        [
            "EXCEDENT BRUT D'EXPLOITATION ( E.B.E )",
            ""
        ],
        [
            "Autres produits d'exploitation",
            "718"
        ],
        [
            "Autres charges d'exploitation",
            "618"
        ],
        [
            "Reprises d'exploitation: transfert de charges",
            "719"
        ],
        [
            "Dotations d'exploitation",
            "619"
        ],
        [
            "RESULTAT D'EXPLOITATION ( + ou - )",
            ""
        ],
        [
            "RESULTAT FINANCIER",
            ""
        ],
        [
            "RESULTAT COURANT ( + ou - )",
            ""
        ],
        [
            "RESULTAT NON COURANT ( + ou - )",
            ""
        ],
        [
            "Impôts sur les resultats",
            "67"
        ],
        [
            "RESULTAT NET DE L'EXERCICE ( + ou - )",
            ""
        ],
        [
            "",
            ""
        ],
        [
            "II - CAPACITE D'AUTOFINANCEMENT  ( C.A.F ) - AUTOFINANCEMENT",
            ""
        ],
        [
            "RESULTAT NET DE L'EXERCICE ( + ou - ) ",
            ""
        ],
        [
            "- Benefice (+)",
            ""
        ],
        [
            "- Perte      (-)",
            ""
        ],
        [
            "Dotations d'exploitation",
            ""
        ],
        [
            "Dotations financières",
            ""
        ],
        [
            "Dotations non courantes",
            ""
        ],
        [
            "Reprises d'exploitation",
            ""
        ],
        [
            "Reprises financières",
            ""
        ],
        [
            "Reprises non courantes",
            ""
        ],
        [
            "Produits des cession des immobilisations",
            "751"
        ],
        [
            "Valeurs nettes des immobilisations cédées",
            "651"
        ],
        [
            "CAPACITE D'AUTOFINANCEMENT  ( C.A.F )",
            ""
        ],
        [
            "Distributions de bénéfices",
            ""
        ],
        [
            "AUTOFINANCEMENT",
            ""
        ]]
    ,
}),
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.id = this.$route.params.id
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getESG";
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
            if (number === 0 || number == undefined) {
            return "";
            }
            if(number!= undefined) {
                number =  Math.round(number * 100) / 100;
            }

            const stringifiedNumber = number.toString();
            const [integerPart, decimalPart] = stringifiedNumber.split(".");
            const integerPartLength = integerPart.length;

            let separatedIntegerPart = "";

            for (let i = 0; i < integerPartLength; i++) {
                if (i !== 0 && (integerPartLength - i) % 3 === 0) {
                separatedIntegerPart += " ";
                }

                separatedIntegerPart += integerPart.charAt(i);
            }

            if (decimalPart !== undefined) {
                console.log(separatedIntegerPart + "." + decimalPart)
                return separatedIntegerPart + "." + decimalPart;
            }
            console.log(separatedIntegerPart)
            return separatedIntegerPart;
        },
        sum(title){
            switch(title){
                case 'MARGES BRUTES SUR VENTES EN L\'ETAT  1- 2':
                    var total1 = this.query['711']['act'] - this.query['611']['act'];
                    var total2 = this.query['711']['pre'] - this.query['611']['pre'];
                    this.totalsI = [total1 , total2];
                    return this.totalsI;
                case 'PRODUCTION DE L\'EXERCICE (3+4+5)':
                    this.totalsII = this.total(["712" , "713" , "714"]);
                    return this.totalsII;
                case 'CONSOMMATION DE L\'EXERCICE (6+7)':
                    var total = this.total(["612" , "613" , "614"]);
                    this.totalsIII = total ;
                    return this.totalsIII;
                case 'Autres charges externes':
                    var total = this.total(["613" , "614"]);
                    this.totals7 = total ;
                    return this.totals7;
                case 'VALEUR AJOUTEE ( I+II+III )':
                    var total1 = this.totalsI[0] + this.totalsII[0] + this.totalsII[0] ;
                    var total2 = this.totalsI[1] + this.totalsII[1] + this.totalsII[1] ; 
                    this.totalsIV = [total1 , total2];
                    return this.totalsIV;
                case 'RESULTAT FINANCIER':
                    var total1 = this.query["73"]["act"] - this.query["63"]["act"] ;
                    var total2 = this.query["73"]["pre"] - this.query["63"]["pre"] ;
                    this.totalsVII = [total1 , total2];
                    return this.totalsVII;
                case 'RESULTAT NON COURANT ( + ou - )': 
                    var total1 = this.query["75"]["act"] - this.query["65"]["act"] ;
                    var total2 = this.query["75"]["pre"] - this.query["65"]["pre"] ;
                    this.totalsIX = [total1 , total2];
                    return this.totalsIX;
                case 'RESULTAT NON COURANT ( + ou - )': 
                    this.totals15 = this.query['67'];
                    return this.totals15;
                case 'Dotations d\'exploitation':
                    this.totalsII2 = this.total(["619" , "6196"]);
                    return this.totalsII2; 
                case 'Dotations financières':
                    this.totalsII3 = this.total(["639" , "6396" , "6393"]);
                    return this.totalsII3; 
                case 'Dotations non courantes':
                    this.totalsII4 = this.total(["659" , "65963"]);
                    return this.totalsII4;
                case 'Reprises d\'exploitation':
                    this.totalsII5 = this.total(["719" , "7196" , "7197" , "7198"]);
                    return this.totalsII5;
                case 'Reprises financières':
                    this.totalsII6 = this.total(["739" , "7396" , "7397" , "7393"]);
                    return this.totalsII6;
                case 'Reprises non courantes':
                    this.totalsII7 = this.total(["759" , "75963" , "7597" , "7598" , "7595"]);
                    return this.totalsII7; 
                case 'CAPACITE D\'AUTOFINANCEMENT  ( C.A.F )':
                    var total1 = this.totalsII2[0] + this.totalsII3[0] + this.totalsII4[0] + this.totalsII5[0] + this.totalsII6[0] + this.totalsII7[0] + this.query["751"]['act'] + this.query["651"]['act'] ;
                    var total1 = this.totalsII2[1] + this.totalsII3[1] + this.totalsII4[1] + this.totalsII5[1] + this.totalsII6[1] + this.totalsII7[1] + this.query["751"]['pre'] + this.query["651"]['pre'] ;    
                    this.totalsII_I = [total1 , total2];
                    return this.totalsII_I; 
                case 'AUTOFINANCEMENT':
                    this.totalsII_II = this.totalsII_I;
                    return this.totalsII_II; 
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
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        showToast(message) {
            this.text = message
            this.snackbar = true

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