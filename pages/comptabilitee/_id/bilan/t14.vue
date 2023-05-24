<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">AFFECTATION DES RESULTATS INTERVENUE AU COURS DE L'EXERCICE</div>
            </div>
            <table v-if="query['116']" cellpadding=0 cellspacing=0>
                <tr  >
                	<td class="background_gray">ORIGINE RESULTATS A AFFECTER</td>
                	<td class="background_gray">MONTANT</td>
                	<td class="background_gray">AFFECTATION DES RESULTATS</td>
                	<td class="background_gray">MONTANT</td>
                </tr>
                <tr  >
                	<td>&nbsp;</td>
                	<td>&nbsp;</td>
                	<td></td>
                	<td>&nbsp;</td>
                </tr>
                <tr  >
                	<td >- - Décision du :</td>
                	<td >&nbsp;</td>
                	<td >- Réserve légale</td>
                	<td >{{ showNumber(query["114"]['act']) }}</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >- Report à nouveau</td>
                	<td >{{ showNumber(query["116"]['act']) }}</td>
                	<td >- Autres réserves</td>
                	<td >{{ showNumber(query["115"]['act']) }}</td>
                </tr>
                <tr  >
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >- Résultats nets en instance d'affectation</td>
                	<td >{{ showNumber(query["118"]['act']) }}</td>
                	<td >- Tantièmes</td>
                	<td >&nbsp;</td>
                </tr>
                <tr >
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >- Résultat net de l'exercice N-1</td>
                	<td >{{ showNumber(query["119"]['act']) }}</td>
                	<td >- Dividendes</td>
                	<td >{{ showNumber(query["446"]['act']) }}</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >- Prélèvements sur les réserves</td>
                	<td >{{ showNumber(query["115"]['act']) }}</td>
                	<td >- Autres affectations</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td >- Autres prélèvements</td>
                	<td >&nbsp;</td>
                	<td >- Report à nouveau</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td style="text-align: center;" class="highlighted">TOTAL A</td>
                	<td class="highlighted">{{ showNumber(totals1[0]) }}</td>
                	<td style="text-align: center;" class="highlighted">TOTAL B</td>
                	<td class="highlighted">{{ showNumber(totals2[0]) }}</td>
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
        totals1 : [0],
        totals2 : [0],
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/get14";
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
            var total1 = this.total(["116" , "118" , "119" , "115"]);
            this.totals1 = [total1[0]];
            var total2 = this.total(["114" , "115" , "446"]);
            this.totals2 = [total2[0]];
            return;
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