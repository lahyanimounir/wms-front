<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">TABLEAU DES BIENS EN CREDIT BAIL</div>
            </div>
           
            <table cellpadding=0 cellspacing=0>
                <col  span=11 >
                <tr  >
                	<td class="background_gray" rowspan=4 >Nature</td>
                	<td class="background_gray" rowspan=4 >Date 1ère échéance</td>
                	<td class="background_gray" rowspan=4 >Durée du contrat en mois</td>
                	<td class="background_gray" rowspan=4 >Valeur estimée du bien à la date du contrat</td>
                	<td class="background_gray" rowspan=4 >Durée théorique d'amortiss du bien</td>
                	<td class="background_gray" colspan=4 >Redevances</td>
                	<td class="background_gray" rowspan=4 >Prix d'achat résiduel en fin de contrat</td>
                	<td class="background_gray" rowspan=4 >Observations</td>
                </tr>
                <tr>
                	<td class="background_gray" rowspan=3 >Cumul exercices précédents</td>
                	<td class="background_gray" rowspan=3 >Montant<span ></span>de<span>l'exercice</span></td>
                	<td class="background_gray" colspan=2 >Restant à payer</td>
                </tr>
                <tr >
                	<td class="background_gray" rowspan=2 >A moins<span></span> un an</td>
                	<td class="background_gray" rowspan=2 >A<span> </span>plus un an</td>
                </tr>
                <tr >
                </tr>
                <tr >
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr   >
                	<td class="background_gray" style="text-align: center;" colspan="3">Totaux</td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >0.00 </td>
                	<td class="background_gray" >&nbsp;</td>
                </tr>
                <tr  >
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                	<td  ></td>
                </tr>
            </table>
        </v-card>
    </div>
</template>



<style>

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
        width: 9%;
        text-align: center;
        border: 1px solid #eee;
    }
    td {
        /* text-align: left; */
        padding: 0 5px;
        font-size: 14px;
    }
</style>

<script>

import Vue from 'vue'
import VueJsModal from 'vue-js-modal'
// import MyModal from '~/components/showDetails.vue'

Vue.use(VueJsModal)

export default {
    
    data: () => ({
        totals1 : [0 ,0 , 0 , 0 , 0 , 0 , 0 , 0],
        totals2 : [0 ,0 , 0 , 0 , 0 , 0 , 0 , 0],
        totals3 : [0 ,0 , 0 , 0 , 0 , 0 , 0 , 0],
        totals4 : [0 ,0 , 0 , 0 , 0 , 0 , 0 , 0],
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getIMMO";
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
            var total1 = this.total(["211" , "212" , "213"]);
            this.totals1 = [total1[0] , 0 , 0 , 0 , 0 , 0 , 0 ,0];
            var total2 = this.total(["221" , "222" , "223" , "228"]);
            this.totals2 = [total2[0] , 0 , 0 , 0 , 0 , 0 , 0 ,0];
            var total3 = this.total(["231" , "232" , "233" , "234" , "235" , "238" , "239" , "2355"]);
            this.totals3 = [total3[0] , 0 , 0 , 0 , 0 , 0 , 0 ,0];
            var total4 = this.totals1[0] + this.totals2[0] + this.totals3[0] ; 
            this.totals4 = [total4 , 0 , 0 , 0 , 0 , 0 , 0 ,0];
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