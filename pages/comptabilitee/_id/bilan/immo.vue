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
                <div class="font-weight-bold" style="font-size:18px;">TABLEAU DES IMMOBILISATIONS AUTRES QUE FINANCIERES</div>
            </div>
           
            <table cellpadding=0 cellspacing=0 width=1318>
                <col  width=315>
                <col  width=123 span=7>
                <col  width=142 >
                <tr  height=17 >
                    <td rowspan=2 >Nature</td>
                    <td rowspan=2  width=123 >Montant brut début exercice</td>
                    <td colspan=3  width=369 >Augmentation</td>
                    <td colspan=3  width=369 >Diminution</td>
                    <td rowspan=2  width=142 >Montant brut fin exercice</td>
                </tr>
                <tr  height=51 >
                    <td height=51  width=123 >Acquisition</td>
                    <td  width=123 >Production par l'Etps pour elle même</td>
                    <td  width=123 >Virement</td>
                    <td  width=123 >Cession</td>
                    <td  width=123 >Retrait</td>
                    <td  width=123 >Virement</td>
                </tr>
                <tr  height=19 >
                    <td height=19  class="title2">IMMOBILISATION EN NON-VALEURS</td>
                    <td class="highlighted">{{ showNumber(totals1[0]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[1]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[2]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[3]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[4]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[5]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[6]) }}</td>
                    <td class="highlighted">{{ showNumber(totals1[7]) }}</td>
                </tr>
                <tr height=17 >
                    <td height=17 >- Frais préliminaires</td>
                    <td v-if="query['211']">{{ showNumber(query['211'][0]) }}</td>
                    <td v-if="!query['211']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Charges à répartir sur plusieurs exercices</td>
                    <td v-if="query['212']">{{ showNumber(query['212'][0]) }}</td>
                    <td v-if="!query['212']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Primes de remboursement obligations</td>
                    <td v-if="query['213']">{{ showNumber(query['213'][0]) }}</td>
                    <td v-if="!query['213']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr  height=19 >
                    <td height=19  class="title2">IMMOBILISATIONS INCORPORELLES</td>
                    <td class="highlighted">{{ showNumber(totals2[0]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[1]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[2]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[3]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[4]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[5]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[6]) }}</td>
                    <td class="highlighted">{{ showNumber(totals2[7]) }}</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Immobilisation en recherche et développement</td>
                    <td v-if="query['221']">{{ showNumber(query['221'][0]) }}</td>
                    <td v-if="!query['221']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Brevets, marques, droits et valeurs similaires</td>
                    <td v-if="query['222']">{{ showNumber(query['222'][0]) }}</td>
                    <td v-if="!query['222']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Fonds commercial</td>
                    <td v-if="query['223']">{{ showNumber(query['223'][0]) }}</td>
                    <td v-if="!query['223']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Autres immobilisations incorporelles</td>
                    <td v-if="query['228']">{{ showNumber(query['228'][0]) }}</td>
                    <td v-if="!query['228']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr  height=19 >
                    <td height=19 class="title2" >IMMOBILISATIONS CORPORELLES</td>
                    <td class="highlighted">{{ showNumber(totals3[0]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[1]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[2]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[3]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[4]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[5]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[6]) }}</td>
                    <td class="highlighted">{{ showNumber(totals3[7]) }}</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Terrains</td>
                    <td v-if="query['231']">{{ showNumber(query['231'][0]) }}</td>
                    <td v-if="!query['231']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Constructions</td>
                    <td v-if="query['232']">{{ showNumber(query['232'][0]) }}</td>
                    <td v-if="!query['232']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Installations techniques, matériel et outillage</td>
                    <td v-if="query['233']">{{ showNumber(query['233'][0]) }}</td>
                    <td v-if="!query['233']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Matériel de transport</td>
                    <td v-if="query['234']">{{ showNumber(query['234'][0]) }}</td>
                    <td v-if="!query['234']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Mobilier, matériel de bureau et aménagement</td>
                    <td v-if="query['235']">{{ showNumber(query['235'][0]) }}</td>
                    <td v-if="!query['235']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=19 >
                    <td height=19  >- Autres immobilisations corporelles</td>
                    <td v-if="query['238']">{{ showNumber(query['238'][0]) }}</td>
                    <td v-if="!query['238']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Immobilisations corporelles en cours</td>
                    <td v-if="query['239']">{{ showNumber(query['239'][0]) }}</td>
                    <td v-if="!query['239']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr height=17 >
                    <td height=17  >- Matériel informatique</td>
                    <td v-if="query['2355']">{{ showNumber(query['2355'][0]) }}</td>
                    <td v-if="!query['2355']">&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td >&nbsp;</td>
                    <td  >&nbsp;</td>
                    <td >&nbsp;</td>
                    <td >&nbsp;</td>
                    <td  >&nbsp;</td>
                </tr>
                <tr  height=34 >
                    <td height=34 class="title2" >Total</td>
                    <td class="highlighted">{{ showNumber(totals4[0]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[1]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[2]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[3]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[4]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[5]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[6]) }}</td>
                    <td class="highlighted">{{ showNumber(totals4[7]) }}</td>
                </tr>
                <tr height=0 >
                    <td width=315 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=123 ></td>
                    <td width=142 ></td>
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