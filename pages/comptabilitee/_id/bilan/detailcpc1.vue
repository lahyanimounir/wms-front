<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">DETAIL DES POSTES DU C.P.C.</div>
            </div>
           
            <table v-if="query['6114']" cellpadding=0 cellspacing=0 >
                <tr  >
                	<td colspan=2 >Poste</td>
                	<td  >Exercice</td>
                	<td  >Exercice Précédent</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >CHARGESD'EXPLOITATION</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >611</td>
                	<td >Achats revendus de marchandises</td>
                	<td ></td>
                	<td ></td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Achats de marchandises</td>
                	<td >{{ showNumber(totals611_1[0]) }}</td>
                	<td >{{ showNumber(totals611_1[1]) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Variation des stocks de marchandises</td>
                	<td >{{ showNumber(query['6114']['act']) }}</td>
                	<td >{{ showNumber(query['6114']['pre']) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(query['611']['act']) }}</td>
                	<td >{{ showNumber(query['611']['pre']) }}</td>
                </tr>
                <tr >
                	<td >612</td>
                	<td >Achats consommés de matières et fournitures</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Achats de matières premières</td>
                	<td >{{ showNumber(totals612_1[0]) }}</td>
                	<td >{{ showNumber(totals612_1[1]) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Variation des stocks de matières premières</td>
                	<td >{{ showNumber(query['61241']['act']) }}</td>
                	<td >{{ showNumber(query['61241']['pre']) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Achats de matières et fournitures consommables et d'emballages</td>
                	<td  >{{ showNumber(totals612_2[0]) }}</td>
                	<td  >{{ showNumber(totals612_2[1]) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Variation des stocks de matières, fournitures et emballages</td>
                	<td >{{ showNumber(totals612_3[0]) }}</td>
                	<td >{{ showNumber(totals612_3[1]) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Achats non stockés de matières et de fournitures</td>
                	<td >{{ showNumber(totals612_4[0]) }}</td>
                	<td >{{ showNumber(totals612_4[1]) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Achats de travaux, études et prestation de services</td>
                	<td  >{{ showNumber(totals612_5[0]) }}</td>
                	<td  >{{ showNumber(totals612_5[1]) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(totals612_6[0]) }}</td>
                	<td >{{ showNumber(totals612_6[1]) }}</td>
                </tr>
                <tr  >
                	<td >613/614</td>
                	<td >Autres charges externes</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Locations et charges locatives</td>
                	<td >{{ showNumber(totals613_1[0]) }}</td>
                	<td >{{ showNumber(totals613_1[1]) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Redevances de crédit-bail</td>
                	<td >{{ showNumber(totals613_2[0]) }}</td>
                	<td >{{ showNumber(totals613_2[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Entretient et réparations</td>
                	<td >{{ showNumber(totals613_3[0]) }}</td>
                	<td >{{ showNumber(totals613_3[1]) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Primes d'assurances</td>
                	<td >{{ showNumber(totals613_4[0]) }}</td>
                	<td >{{ showNumber(totals613_4[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Rémunérations du personnel extérieur à l'entreprise</td>
                	<td >{{ showNumber(totals613_5[0]) }}</td>
                	<td >{{ showNumber(totals613_5[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Rémunérations d'intermédiaires et honoraires</td>
                	<td >{{ showNumber(totals613_6[0]) }}</td>
                	<td >{{ showNumber(totals613_6[1]) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Redevances pour brevets, marque, droits ...</td>
                	<td >{{ showNumber(totals613_7[0]) }}</td>
                	<td >{{ showNumber(totals613_7[1]) }}</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >- Transports</td>
                	<td >{{ showNumber(totals613_8[0]) }}</td>
                	<td >{{ showNumber(totals613_8[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Déplacements, missions et réceptions</td>
                	<td >{{ showNumber(totals613_9[0]) }}</td>
                	<td >{{ showNumber(totals613_9[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Reste du poste des autres charges externes</td>
                	<td >{{ showNumber(totals613_10[0]) }}</td>
                	<td >{{ showNumber(totals613_10[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(totals613_11[0]) }}</td>
                	<td >{{ showNumber(totals613_11[1]) }}</td>
                </tr>
                <tr  >
                	<td >617</td>
                	<td >Charges de personnel</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Rémunération du personnel</td>
                	<td >{{ showNumber(query['6171']['act']) }}</td>
                	<td >{{ showNumber(query['6171']['pre']) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Charges sociales</td>
                	<td >{{ showNumber(query['6174']['act']) }}</td>
                	<td >{{ showNumber(query['6174']['pre']) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Reste du poste des charges de personnel</td>
                	<td >{{ showNumber(totals617_1[0]) }}</td>
                	<td >{{ showNumber(totals617_1[1]) }}</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(query['617']['act']) }}</td>
                	<td >{{ showNumber(query['617']['pre']) }}</td>
                </tr>
                <tr>
                	<td >618</td>
                	<td >Autres charges d'exploitation</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr>
                	<td >&nbsp;</td>
                	<td >- Jetons de présence</td>
                	<td >{{ showNumber(query['6181']['act']) }}</td>
                	<td >{{ showNumber(query['6181']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Pertes sur créances irrécouvrables</td>
                	<td  >{{ showNumber(query['6182']['act']) }}</td>
                	<td  >{{ showNumber(query['6182']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste des autres charges d'exploitation</td>
                	<td  >{{ showNumber(totals618_1[0]) }}</td>
                	<td  >{{ showNumber(totals618_1[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['618']['act']) }}</td>
                	<td  >{{ showNumber(query['618']['pre']) }}</td>
                </tr>
                <tr>
                	<td >638</td>
                	<td >CHARGES FINANCIERES</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr>
                	<td  >&nbsp;</td>
                	<td >Autres charges financières</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >- Charges nettes sur cessions de titres et valeurs de placement</td>
                	<td  >{{ showNumber(query['6385']['act']) }}</td>
                	<td  >{{ showNumber(query['6385']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste des autres charges financières</td>
                	<td  >{{ showNumber(totals638_1[0]) }}</td>
                	<td  >{{ showNumber(totals638_1[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['638']['act']) }}</td>
                	<td  >{{ showNumber(query['638']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >658</td>
                	<td >CHARGES NON COURANTES</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >Autres charges non courantes</td>
                	<td  >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Pénalités sur marchés et débits</td>
                	<td  >{{ showNumber(query['6581']['act']) }}</td>
                	<td  >{{ showNumber(query['6581']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Rappels d'impôts (autres qu'impôts sur les résultats)</td>
                	<td  >{{ showNumber(query['6582']['act']) }}</td>
                	<td  >{{ showNumber(query['6582']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Pénalités et amendes fiscales et pénales</td>
                	<td  >{{ showNumber(query['6583']['act']) }}</td>
                	<td  >{{ showNumber(query['6583']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Créances devenues irrécouvrables</td>
                	<td  >{{ showNumber(query['6585']['act']) }}</td>
                	<td  >{{ showNumber(query['6585']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste des autres charges non courantes</td>
                	<td  >{{ showNumber(totals658_1[0]) }}</td>
                	<td  >{{ showNumber(totals658_1[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['658']['act']) }}</td>
                	<td  >{{ showNumber(query['658']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >PRODUITS D'EXPLOITATION</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >711</td>
                	<td >Ventes de marchandises</td>
                	<td  >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes de marchandises au Maroc</td>
                	<td  >{{ showNumber(query['7111']['act']) }}</td>
                	<td  >{{ showNumber(query['7111']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes de marchandises à l'étranger</td>
                	<td  >{{ showNumber(query['7113']['act']) }}</td>
                	<td  >{{ showNumber(query['7113']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste des ventes de marchandises</td>
                	<td  >{{ showNumber(totals711_1[0]) }}</td>
                	<td  >{{ showNumber(totals711_1[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['711']['act']) }}</td>
                	<td  >{{ showNumber(query['711']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >712</td>
                	<td >Ventes des biens et services produits</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes de biens au Maroc</td>
                	<td  >{{ showNumber(totals712_1[0]) }}</td>
                	<td  >{{ showNumber(totals712_1[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes de biens à l'étranger</td>
                	<td  >{{ showNumber(totals712_2[0]) }}</td>
                	<td  >{{ showNumber(totals712_2[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes des services au Maroc</td>
                	<td  >{{ showNumber(totals712_3[0]) }}</td>
                	<td  >{{ showNumber(totals712_3[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Ventes des services à l'étranger</td>
                	<td  >{{ showNumber(totals712_4[0]) }}</td>
                	<td  >{{ showNumber(totals712_4[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Redevances pour brevets, marques, droits ...</td>
                	<td  >{{ showNumber(query['7126']['act']) }}</td>
                	<td  >{{ showNumber(query['7126']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste des ventes et services produits</td>
                	<td  >{{ showNumber(totals712_5[0]) }}</td>
                	<td  >{{ showNumber(totals712_5[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['712']['act']) }}</td>
                	<td  >{{ showNumber(query['712']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >713</td>
                	<td >Variation des stocks de produits</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Variation des stocks de produits de produits en cours</td>
                	<td  >{{ showNumber(query['7131']['act']) }}</td>
                	<td  >{{ showNumber(query['7131']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Variation des stocks de biens produits</td>
                	<td  >{{ showNumber(query['7132']['act']) }}</td>
                	<td  >{{ showNumber(query['7132']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Variation des stocks de services en cours</td>
                	<td  >{{ showNumber(query['7134']['act']) }}</td>
                	<td  >{{ showNumber(query['7134']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(totals713[0]) }}</td>
                	<td >{{ showNumber(totals713[1]) }}</td>
                </tr>
                <tr  >
                	<td  >718</td>
                	<td >Autres produits d'exploitation</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Jetons de présence reçus</td>
                	<td  >{{ showNumber(query['7181']['act']) }}</td>
                	<td  >{{ showNumber(query['7181']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste (produits divers)</td>
                	<td  >{{ showNumber(totals718[0]) }}</td>
                	<td  >{{ showNumber(totals718[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td  >{{ showNumber(query['718']['act']) }}</td>
                	<td  >{{ showNumber(query['718']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >719</td>
                	<td >Reprises d'exploitation, transferts de charges</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reprises</td>
                	<td  >{{ showNumber(totals719[0]) }}</td>
                	<td  >{{ showNumber(totals719[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Transferts de charges</td>
                	<td  >{{ showNumber(query['7197']['act']) }}</td>
                	<td  >{{ showNumber(query['7197']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(query['719']['act']) }}</td>
                	<td >{{ showNumber(query['719']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >PRODUITS FINANCIERS</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >738</td>
                	<td >Intérêts et autres produits financiers</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Intérêt et produits assimilés</td>
                	<td  >{{ showNumber(query['7381']['act']) }}</td>
                	<td  >{{ showNumber(query['7381']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Revenus des créances rattachées à des participations</td>
                	<td  >{{ showNumber(query['7383']['act']) }}</td>
                	<td  >{{ showNumber(query['7383']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Produits nets sur cessions de titres et valeurs de placement</td>
                	<td  >{{ showNumber(query['7385']['act']) }}</td>
                	<td  >{{ showNumber(query['7385']['pre']) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td >- Reste du poste intérêts et autres produits financiers</td>
                	<td  >{{ showNumber(totals738[0]) }}</td>
                	<td  >{{ showNumber(totals738[1]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td style="text-align:right ; padding-right:15px;">Total</td>
                	<td >{{ showNumber(query['738']['act']) }}</td>
                	<td >{{ showNumber(query['738']['pre']) }}</td>
                </tr>
            </table>    
        </v-card>
    </div>
</template>



<style>

    tr td:first-child {
        text-align: left;
    }
    .modal-class {
        padding: 20px;
        background-color: rgb(184, 184, 184);
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    }
    a{
        display: block;
    }
    .background_gray {
        background-color: rgb(235, 234, 234);
    }
    .background_pink {
        background-color: rgb(222, 152, 108);
    }
    .background_blue {
        background-color: rgb(148, 198, 230);
    }
    .highlighted {
        background-color: yellow;
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
    .normal {
        padding-left: 30px;
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
        totals611_1 : [0 ,0],
        totals612_1 : [0 ,0],
        totals612_2 : [0 ,0],
        totals612_3 : [0 ,0],
        totals612_4 : [0 ,0],
        totals612_5 : [0 ,0],
        totals612_6 : [0 ,0],
        totals612 : [0 ,0],
        totals613_1 : [0 ,0],
        totals613_2 : [0 ,0],
        totals613_3 : [0 ,0],
        totals613_4 : [0 ,0],
        totals613_5 : [0 ,0],
        totals613_6 : [0 ,0],
        totals613_7 : [0 ,0],
        totals613_8 : [0 ,0],
        totals613_9 : [0 ,0],
        totals613_10 : [0 ,0],
        totals613_11 : [0 ,0],
        totals617_1 : [0 ,0],
        totals618_1 : [0 ,0],
        totals638_1 : [0 ,0],
        totals658_1 : [0 ,0],
        totals711_1 : [0 ,0],
        totals712_1 : [0 ,0],
        totals712_2 : [0 ,0],
        totals712_3 : [0 ,0],
        totals712_4 : [0 ,0],
        totals712_5 : [0 ,0],
        totals713 : [0 ,0],
        totals718 : [0 ,0],
        totals719 : [0 ,0],
        totals738 : [0 ,0],



        dossier:{},
        totalsClick : {},
        du:'',
        au:'',
        query :{},
}),
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.id = this.$route.params.id
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getDetailsCPC";
            let info2 = await this.$myService.get(url2);
            if(info2){
                this.query = info2.results;
                console.log(this.query);
                this.makeSums();
            }
            let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
            let info = await this.$myService.get(url)
            this.dossier = info.dossier
            this.du = info.du;
            this.au = info.au;
        },
        async makeSums() {

            // var total1 = this.total(["211" , "212" , "213"]);
            var total1 = this.query["611"]['act'] - this.query["6114"]['act'];
            var total2 = this.query["611"]['pre'] - this.query["6114"]['pre'];
            this.totals611_1 = [total1 , total2];

            var total3 = this.total(["6121", "61281" , "61291", "61298"]);
            this.totals612_1 = total3;

            var total4 = this.total(["6122","6123","61282","61292","61283","61293"])
            this.totals612_2 = total4;

            var total5 = this.total(["61242","61243","61244"])
            this.totals612_3 = total5;

            var total6 = this.total(["6125","61285","61295"])
            this.totals612_4 = total6;

            var total7 = this.total(["6126","61286","61296"])
            this.totals612_5 = total7;

            var total8 = this.totals612_1[0] + this.totals612_2[0] + this.totals612_3[0] + this.totals612_4[0] + this.totals612_5[0] + this.query["61241"]['act'];
            var total9 = this.totals612_1[1] + this.totals612_2[1] + this.totals612_3[1] + this.totals612_4[1] + this.totals612_5[1] + this.query["61241"]['pre'];
            this.totals612_6 = [total8 , total9];

            var total10 = this.total(["6131","61481","61491"])
            this.totals613_1 = total10;
            
            var total11 = this.total(["6132","61482","61492"]);
            this.totals613_2 = total11;

            var total12 = this.total(["6133","61483","61493"]);
            this.totals613_3 = total12;

            var total13 = this.total(["6134","61484","61494"]);
            this.totals613_4 = total13;

            var total14 = this.total(["6135","61485"]);
            this.totals613_5 = total14;

            var total15 = this.total(["6136","61486","61496"])
            this.totals613_6 = total15;

            var total16 = this.total(["6137","61487","61497"])
            this.totals613_7 = total16 ;

            var total17 = this.total(["6142","61488","61498"])
            this.totals613_8 = total17;

            var total18 = this.total(["6143","61489"])
            this.totals613_9 = total18 ;

            var total19 = this.total(["613","614"]);
            this.totals613_11 = total19;

            var total20 = this.totals613_11[0] - this.totals613_1[0] - this.totals613_2[0] - this.totals613_3[0] - this.totals613_4[0] - this.totals613_5[0] - this.totals613_6[0] - this.totals613_7[0] - this.totals613_8[0] - this.totals613_9[0];
            var total21 = this.totals613_11[1] - this.totals613_1[1] - this.totals613_2[1] - this.totals613_3[1] - this.totals613_4[1] - this.totals613_5[1] - this.totals613_6[1] - this.totals613_7[1] - this.totals613_8[1] - this.totals613_9[1];
            this.totals613_10 = [total20 , total21];

            var total22 = this.query["617"]['act'] -  this.query["6171"]['act'] - this.query["6174"]['act'];
            var total23 = this.query["617"]['pre'] -  this.query["6171"]['pre'] - this.query["6174"]['pre'];
            this.totals617_1 = [total22 , total23];

            var total24 = this.query["618"]['act'] -  this.query["6181"]['act'] - this.query["6182"]['act'];
            var total25 = this.query["618"]['pre'] -  this.query["6181"]['pre'] - this.query["6182"]['pre'];
            this.totals618_1 = [total24 , total25];

            var total26 = this.query["638"]['act'] -  this.query["6385"]['act'];
            var total27 = this.query["638"]['pre'] -  this.query["6385"]['pre'];
            this.totals638_1 = [total26 , total27];

            var total28 = this.query["658"]['act'] -  this.query["6581"]['act'] -  this.query["6582"]['act']  -  this.query["6583"]['act'] -  this.query["6585"]['act'];
            var total29 = this.query["658"]['pre'] -  this.query["6581"]['pre'] -  this.query["6582"]['pre']  -  this.query["6583"]['pre'] -  this.query["6585"]['pre'];
            this.totals658_1 = [total28 , total29];

            var total30 = this.query["711"]['act'] -  this.query["7111"]['act'] -  this.query["7113"]['act'];
            var total31 = this.query["711"]['pre'] -  this.query["7111"]['pre'] -  this.query["7113"]['pre'];
            this.totals711_1 = [total30 , total31];


            var total32 = this.query["7121"]['act'] + this.query["71291"]['act'];
            var total33 = this.query["7121"]['pre'] + this.query["71291"]['pre'];
            this.totals712_1 = [total32 , total33];

            var total34 = this.query["7122"]['act'] + this.query["71292"]['act'];
            var total35 = this.query["7122"]['pre'] + this.query["71292"]['pre'];
            this.totals712_2 = [total34 , total35];

            var total36 = this.query["7124"]['act'] + this.query["71924"]['act'];
            var total37 = this.query["7124"]['pre'] + this.query["71924"]['pre'];
            this.totals712_3 = [total36 , total37];

            var total38 = this.query["7125"]['act'] + this.query["71925"]['act'];
            var total39 = this.query["7125"]['pre'] + this.query["71925"]['pre'];
            this.totals712_4 = [total38 , total39];


            var total40 = this.query["712"]['act'] - this.totals712_1[0] - this.totals712_2[0] - this.totals712_3[0] - this.totals712_4[0] - this.query["7126"]['act'];
            var total41 = this.query["712"]['pre'] - this.totals712_1[1] - this.totals712_2[1] - this.totals712_3[1] - this.totals712_4[1] - this.query["7126"]['pre'];
            this.totals712_5 = [total40 , total41]; 

            var total42 = this.total(["7131" , "7132" , "7134"]);
            this.totals713 = total42 ;

            var totla43 = this.query["718"]["act"] - this.query["7181"]["act"];
            var totla44 = this.query["718"]["pre"] - this.query["7181"]["pre"];
            this.totals718 = [total43 , total44];

            var totla45 = this.query["719"]["act"] - this.query["7197"]["act"];
            var totla46 = this.query["719"]["pre"] - this.query["7197"]["pre"];
            this.totals719 = [total45 , total46];
            
            var totla47 = this.query["738"]["act"] - this.query["7381"]["act"] - this.query["7383"]["act"] - this.query["7385"]["act"];
            var totla48 = this.query["738"]["pre"] - this.query["7381"]["pre"] - this.query["7383"]["pre"] - this.query["7385"]["pre"];
            this.totals738 = [total47 , total48];

            return;
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