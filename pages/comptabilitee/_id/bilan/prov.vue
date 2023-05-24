<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">TABLEAU DES PROVISIONS</div>
            </div>
            <table v-if="query['6194']" cellpadding=0 cellspacing=0>
                <tr  >
                	<td class="background_gray" rowspan=2>NATURE</td>
                	<td class="background_gray" rowspan=2>Début Exercice</td>
                	<td class="background_gray" colspan=3>DOTATIONS</td>
                	<td class="background_gray" >&nbsp;</td>
                	<td class="background_gray" >REPRISES</td>
                	<td class="background_gray" >&nbsp;</td>
                	<td class="background_gray" rowspan=2 >Fin Exercice</td>
                </tr>
                <tr  >
                	<td class="background_gray" >Exploitation</td>
                	<td class="background_gray" >Financières</td>
                	<td class="background_gray" >Non courantes</td>
                	<td class="background_gray" >Exploitation</td>
                	<td class="background_gray" >Financières</td>
                	<td class="background_gray" >Non courantes</td>
                </tr>
                <tr  >
                	<td colspan="9"></td>
                </tr>
                <tr   >
                	<td   >1. Provi. pour dépréciation actif immobilisé</td>
                	<td  >{{ showNumber(query["29"]['act']) }}</td>
                	<td  >{{ showNumber(query["6194"]['act']) }}</td>
                	<td  >{{ showNumber(query["6392"]['act']) }}</td>
                	<td  >{{ showNumber(query["65962"]['act']) }}</td>
                	<td  >{{ showNumber(query["7194"]['act']) }}</td>
                	<td  >{{ showNumber(query["7392"]['act']) }}</td>
                	<td  >{{ showNumber(query["75962"]['act']) }}</td>
                	<td   >{{ showNumber(this.totals1[0]) }}</td>
                </tr>
                <tr   >
                	<td   >2. Provisions réglementées</td>
                	<td  >{{ showNumber(query["135"]['act']) }}</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >{{ showNumber(query["6594"]['act']) }}</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >{{ showNumber(query["7594"]['act']) }}</td>
                	<td   >{{ showNumber(this.totals1[1]) }}</td>
                </tr>
                <tr   >
                	<td   >3. Provi. durables pour risques et charges</td>
                	<td  >{{ showNumber(query["15"]['act']) }}</td>
                	<td  >{{ showNumber(query["61955"]['act']) }}</td>
                	<td  >{{ showNumber(query["63935"]['act']) }}</td>
                	<td  >{{ showNumber(query["65955"]['act']) }}</td>
                	<td  >{{ showNumber(query["71955"]['act']) }}</td>
                	<td  >{{ showNumber(query["73935"]['act']) }}</td>
                	<td  >{{ showNumber(query["75955"]['act']) }}</td>
                	<td   >{{ showNumber(this.totals1[2]) }}</td>
                </tr>
                <tr   >
                	<td style="padding-left: 20px;">SOUS TOTAL (A)</td>
                	<td class="highlighted">{{ showNumber(this.totals2[0]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[1]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[2]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[3]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[4]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[5]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[6]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals2[7]) }}</td>
                </tr>
                <tr  >
                	<td colspan="9">&nbsp;</td>
                </tr>
                <tr   >
                	<td   >4. Provi. pour dépréciation actif circulant</td>
                	<td  >{{ showNumber(query["39"]['act']) }}</td>
                	<td  >{{ showNumber(query["6196"]['act']) }}</td>
                	<td  >{{ showNumber(query["6394"]['act']) }}</td>
                	<td  >{{ showNumber(query["65963"]['act']) }}</td>
                	<td  >{{ showNumber(query["7196"]['act']) }}</td>
                	<td  >{{ showNumber(query["7394"]['act']) }}</td>
                	<td  >{{ showNumber(query["75963"]['act']) }}</td>
                	<td   >{{ showNumber(this.totals1[3]) }}</td>
                </tr>
                <tr   >
                	<td   >5. Autres Provisions pour risques &amp; charges</td>
                	<td  >{{ showNumber(query["45"]['act']) }}</td>
                	<td  >{{ showNumber(query["61957"]['act']) }}</td>
                	<td  >{{ showNumber(query["63937"]['act']) }}</td>
                	<td  >{{ showNumber(query["65957"]['act']) }}</td>
                	<td  >{{ showNumber(query["71957"]['act']) }}</td>
                	<td  >{{ showNumber(query["73937"]['act']) }}</td>
                	<td  >{{ showNumber(query["75957"]['act']) }}</td>
                	<td   >{{ showNumber(this.totals1[4]) }}</td>
                </tr>
                <tr   >
                	<td>6. Provi. pour dépréciation comptes trésorie</td>
                	<td>{{ showNumber(query["59"]['act']) }}</td>
                	<td>&nbsp;</td>
                	<td>{{ showNumber(query["6396"]['act']) }}</td>
                	<td>&nbsp;</td>
                	<td>&nbsp;</td>
                	<td>{{ showNumber(query["7396"]['act']) }}</td>
                	<td>&nbsp;</td>
                	<td>{{ showNumber(this.totals1[5]) }}</td>
                </tr>
                <tr   >
                	<td style="padding-left: 20px;">SOUS TOTAL (B)</td>
                	<td class="highlighted">{{ showNumber(this.totals3[0]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[1]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[2]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[3]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[4]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[5]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[6]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals3[7]) }}</td>
                </tr>
                <tr  >
                	<td colspan="8">&nbsp;</td>
                </tr>
                <tr   >
                	<td class="background_gray">TOTAL ( A + B )</td>
                	<td class="highlighted">{{ showNumber(this.totals4[0]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[1]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[2]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[3]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[4]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[5]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[6]) }}</td>
                	<td class="highlighted">{{ showNumber(this.totals4[7]) }}</td>
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
        totals1 : [0 , 0, 0, 0, 0, 0],
        totals2 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
        totals3 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
        totals4 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getProv";
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
            var total1 = this.total(["29","6194","6392","65962"])[0] - this.query["7194"]['act'] - this.query["7392"]['act'] - this.query["75962"]['act'];
            var total2 = this.total(["135","6594"])[0] - this.query["7594"]['act'];
            var total3 = this.total(["15","61955","63935","65955"])[0] - this.query["71955"]['act'] - this.query["73935"]['act'] - this.query["75955"]['act'];
            var total4 = this.total(["39","6196","6394","65963"])[0] - this.query["7196"]['act'] - this.query["7394"]['act'] - this.query["75963"]['act'];
            var total5 = this.total(["45","61957","63937","65957"])[0] - this.query["71957"]['act'] - this.query["73937"]['act'] - this.query["75957"]['act'];	
            var total6 = this.total(["59","6396"])[0] - this.query["7396"]['act'];

            this.totals1 = [total1 , total2 , total3 , total4 , total5 , total6];
            					
            var total7 = this.total(["29" , "135" , "15"])[0];
            var total8 = this.total(["6194" , "61955"])[0];
            var total9 = this.total(["6392" , "63935"])[0];
            var total10 = this.total(["65962" , "6594" , "65955"])[0];
            var total11 = this.total(["7194" , "71955"])[0];
            var total12 = this.total(["7392" , "73935"])[0];
            var total13 = this.total(["75962" , "7594" , "75955"])[0];
            var total14 = this.totals1[0] + this.totals1[1] + this.totals1[2];
            this.totals2 = [total7 , total8 , total9 , total10 , total11 , total12 , total13 , total14];

            var total15 = this.total(["39" , "45" , "59"])[0];
            var total16 = this.total(["6196" , "61957"])[0];
            var total17 = this.total(["6394" , "63937" , "6396"])[0];
            var total18 = this.total(["65963" , "65957"])[0];
            var total19 = this.total(["7196" , "71957"])[0];
            var total20 = this.total(["7394" , "73937" ,"7396"])[0];
            var total21 = this.total(["75963" , "75957"])[0];
            var total22 = this.totals1[3] + this.totals1[4] + this.totals1[5];
            this.totals3 = [total15 , total16 , total17 , total18 , total19 , total20 , total21 , total22];

            var total23 = this.totals2[0] + this.totals3[0]; 
            var total24 = this.totals2[1] + this.totals3[1];
            var total25 = this.totals2[2] + this.totals3[2];
            var total26 = this.totals2[3] + this.totals3[3];
            var total27 = this.totals2[4] + this.totals3[4];
            var total28 = this.totals2[5] + this.totals3[5];
            var total29 = this.totals2[6] + this.totals3[6];
            var total30 = this.totals2[7] + this.totals3[7];
            this.totals4 = [total23 ,total24 ,total25 ,total26 ,total27 ,total28 ,total29 ,total30];

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