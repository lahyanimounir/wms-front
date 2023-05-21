<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">TABLEAU DES AMORTISSEMENTS</div>
            </div>
           
            <table v-if="query['2811']" cellpadding=0 cellspacing=0>
                <col >
                <col >
                <tr >
                	<td style="text-align: center; width:20%" class="background_gray title2" rowspan=2 >NATURE</td>
                	<td style="text-align: center;" class="background_gray title2" >Cumul début exercice</td>
                	<td style="text-align: center;" class="background_gray title2" >Dotation de l'exercice</td>
                	<td style="text-align: center;" class="background_gray title2" >Des immo sorties</td>
                	<td style="text-align: center;" class="background_gray title2" >Cumul fin exercice</td>
                </tr>
                <tr >
                	<td style="text-align: center;" class="background_gray title2">1</td>
                	<td style="text-align: center;" class="background_gray title2">2</td>
                	<td style="text-align: center;" class="background_gray title2">3</td>
                	<td style="text-align: center;" class="background_gray title2">4 = 1 + 2 - 3</td>
                </tr>
                <tr >
                	<td ></td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                </tr>
                <tr >
                	<td class="title2">IMMOBILISATION EN NON-VALEURS</td>
                	<td class="highlighted">{{ showNumber(totals1[0]) }}</td>
                	<td class="highlighted">{{ showNumber(totals1[1]) }}</td>
                	<td class="highlighted">{{ showNumber(totals1[2]) }}</td>
                	<td class="highlighted">{{ showNumber(totals1[3]) }}</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Frais préliminaires</td>
                	<td  >{{showNumber(query['2811']['act'])}}</td>
                	<td  >{{showNumber(query['61911']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Charges à répartir sur plusieurs exercices</td>
                	<td  >{{showNumber(query['2812']['act'])}}</td>
                	<td  >{{showNumber(query['61912']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Primes de remboursement des obligations</td>
                	<td  >{{showNumber(query['2813']['act'])}}</td>
                	<td  >{{showNumber(query['6391']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="title2">IMMOBILISATIONS INCORPORELLES</td>
                	<td class="highlighted">{{ showNumber(totals2[0]) }}</td>
                	<td class="highlighted">{{ showNumber(totals2[1]) }}</td>
                	<td class="highlighted">{{ showNumber(totals2[2]) }}</td>
                	<td class="highlighted">{{ showNumber(totals2[3]) }}</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Immobilisation en recherche et développement</td>
                	<td  >{{showNumber(query['2821']['act'])}}</td>
                	<td  >{{showNumber(query['61921']['act'])}}</td>
                	<td  ></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Brevets, marques, droits et valeurs similaires</td>
                	<td  >{{showNumber(query['2822']['act'])}}</td>
                	<td  >{{showNumber(query['61922']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Fonds commercial</td>
                	<td  >{{showNumber(query['2823']['act'])}}</td>
                	<td  >{{showNumber(query['61923']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Autres immobilisations incorporelles</td>
                	<td  >{{showNumber(query['2828']['act'])}}</td>
                	<td  >{{showNumber(query['61928']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="title2">IMMOBILISATIONS CORPORELLES</td>
                	<td class="highlighted">{{ showNumber(totals3[0]) }}</td>
                	<td class="highlighted">{{ showNumber(totals3[1]) }}</td>
                	<td class="highlighted">{{ showNumber(totals3[2]) }}</td>
                	<td class="highlighted">{{ showNumber(totals3[3]) }}</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Terrains</td>
                	<td  >{{showNumber(query['2831']['act'])}}</td>
                	<td  >{{showNumber(query['61931']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Constructions</td>
                	<td  >{{showNumber(query['2832']['act'])}}</td>
                	<td  >{{showNumber(query['61932']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Installations techniques, matériel et outillage</td>
                	<td  >{{showNumber(query['2833']['act'])}}</td>
                	<td  >{{showNumber(query['61933']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Matériel de transport</td>
                	<td  >{{showNumber(query['2834']['act'])}}</td>
                	<td  >{{showNumber(query['61934']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Mobilier, matériel de bureau et aménagement</td>
                	<td  >{{showNumber(query['2835']['act'])}}</td>
                	<td  >{{showNumber(query['61935']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Autres immobilisations corporelles</td>
                	<td  >{{showNumber(query['2838']['act'])}}</td>
                	<td  >{{showNumber(query['61938']['act'])}}</td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td class="normal">- Immobilisations corporelles en cours</td>
                	<td ></td>
                	<td ></td>
                	<td ></td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td   >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td class="background_gray">TOTAUX</td>
                	<td class="highlighted">{{ showNumber(totals4[0]) }}</td>
                	<td class="highlighted">{{ showNumber(totals4[1]) }}</td>
                	<td class="highlighted">0.00</td>
                	<td class="highlighted">{{ showNumber(totals4[3]) }}</td>
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
    .subTitle {
        padding-left: 15px;
    }
    .normal {
        padding-left: 30px;
        text-align: left;
    }
    .title2 {
        font-size: 14px;
        text-align: left;
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
        totals1 : [0 ,0 , 0 , 0],
        totals2 : [0 ,0 , 0 , 0],
        totals3 : [0 ,0 , 0 , 0],
        totals4 : [0 ,0 , 0 , 0],
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getAmort";
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
            var total1 = this.total(["2811" , "2812" , "2813"]);
            var total2 = this.total(["61911" , "61911" , "6391"]);
            this.totals1 = [total1[0] , total2[0] , 0 , total1[0] + total2[0]];
            
            var total3 = this.total(["2821" , "2822" , "2823" , "2828"]);
            var total4 = this.total(["61921" , "61922" , "61923" , "61928"]);
            this.totals2 = [total3[0] , total4[0] , 0 , total3[0] + total4[0]];

            var total5 = this.total(["2831" , "2832" , "2833" , "2834" , "2835" , "2838"]);
            var total6 = this.total(["61931" , "61932" , "61933", "61934" , "61935" , "61938"]);
            this.totals3 = [total5[0] , total6[0] , 0 , total5[0] + total6[0]];

            var total7 = this.totals1[0] + this.totals2[0] + this.totals3[0];
            var total8 = this.totals1[1] + this.totals2[1] + this.totals3[1];

            this.totals4 = [total7 , total8 , 0 , total7 + total8];
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