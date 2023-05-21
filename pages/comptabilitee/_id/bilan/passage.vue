<template>
    <div>
        <v-card class="mt-3 px-3 py-3" elevation="0" style="border:1px solid #ddd">
            <div style="font-size:18px" class="pt-5 px-3">
                Dossier :<b> {{ dossier && dossier.denomination }} </b>|
                Exercice du : <b>{{ formatDate(du) }}</b> au <b>{{ formatDate(au) }}</b>
            </div>
            <div class="py-5 px-3">
                <div class="font-weight-bold" style="font-size:18px;">PASSAGE DU RESULTAT NET COMPTABLE AU RESULTAT NET FISCAL</div>
            </div>
           
            <table v-if="query['6168']"   cellpadding=0 cellspacing=0>
                <tr   >
                	<td   class="title2" style="text-align: center;" >INTITULES</td>
                	<td   class="title2">Montant</td>
                	<td   class="title2">Montant</td>
                </tr>
                <tr  >
                	<td class="title2"  >I.RESULTAT NET COMPTABLE</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Bénéfice net</td>
                	<td  class="title2 background_pink">C</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Perte nette</td>
                	<td  >&nbsp;</td>
                	<td  class="background_pink">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2 background_gray"  >II.REINTEGRATIONS FISCALES</td>
                	<td class="title2 background_gray">{{ showNumber(totals5[0]) }}</td>
                	<td class="background_gray">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2 subTitle">1.Courantes</td>
                	<td class="title2 highlighted">{{ showNumber(totals3[0]) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- RRR obtenus des exercice anterieurs</td>
                	<td >{{ showNumber(totals1[0]) }}</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Autres charges des exercice anterieurs</td>
                	<td >{{ showNumber(totals2[0]) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Impots et taxes des exercices anterieurs</td>
                	<td >{{ showNumber(query["6168"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Charges de personnel exercices anterieurs</td>
                	<td >{{ showNumber(query["6178"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Dotation d'exploitation exercices anterieurs</td>
                	<td >{{ showNumber(query["6198"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Charges d'interet des exercices anterieurs</td>
                	<td >{{ showNumber(query["6318"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Pertes de changes exercice anterieurs</td>
                	<td >{{ showNumber(query["6338"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Autres charges financieres exercice anterieurs</td>
                	<td >{{ showNumber(query["6398"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Achats revendus de marchandises des exercices anterieurs</td>
                	<td >{{ showNumber(query["6118"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Achats de matieres et de fournitures des exercices anterieurs</td>
                	<td >{{ showNumber(query["6128"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Cadeaux non deductibles</td>
                	<td  ><input type="text" style="width:100%;" ></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Dons non deductible</td>
                	<td  ><input type="text" style="width:100%;"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2 subTitle">2. Non courantes</td>
                	<td  class="title2 highlighted" >{{ showNumber(totals4[0]) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Cotisation Minimale</td>
                	<td  >{{ showNumber(query["6701"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Impot sur le resultat<span ></span></td>
                	<td  >{{ showNumber(query["6708"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Creances devenues irrecouvrables</td>
                	<td  >{{ showNumber(query["6585"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Subventions accordees exercice anterieurs</td>
                	<td  >{{ showNumber(query["6568"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Penalites et amandes fiscales</td>
                	<td  >{{ showNumber(query["6583"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Autres charges non courant des exercices ant</td>
                	<td  >{{ showNumber(query["6588"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Dotations non courantes exercices anterieurs</td>
                	<td  >{{ showNumber(query["6598"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">- Contribution sociale de solidarité sur les bénéfices (C.S.S)</td>
                	<td  >{{ showNumber(query["65864"]['act']) }}</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2 background_gray">III. DEDUCTIONS FISCALES</td>
                	<td class="title2 background_gray">TOTAL<span ></span>A + B + C</td>
                	<td class="title2 background_gray" >{{ showNumber(totals7[0]) }}</td>
                </tr>
                <tr  >
                	<td class="title2 subTitle">1. Courantes</td>
                	<td  >&nbsp;</td>
                	<td class="title2" >{{ showNumber(totals6[0]) }}</td>
                </tr>
                <tr  >
                	<td  class="normal">- Dividendes et produits de participation</td>
                	<td  >&nbsp;</td>
                	<td  >{{ showNumber(query["732"]['act']) }}</td>
                </tr>
                <tr  >
                	<td  class="normal">- Ind.retard (Loi 32-10) compt.non encaissées<span></span></td>
                	<td  >&nbsp;</td>
                	<td  >{{ showNumber(query["738111"]['act']) }}</td>
                </tr>
                <tr  >
                	<td  class="normal">- Ind.retard (Loi 32-10) compt.non payées en N<span></span></td>
                	<td  >&nbsp;</td>
                	<td  >{{ showNumber(query["631181"]['act']) }}</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2 subTitle">2. Non courantes</td>
                	<td  >&nbsp;</td>
                	<td class="title2" >TOTAL B</td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="background_blue normal"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  class="background_blue">&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td colspan="3">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2" style="text-align: right;">Total</td>
                	<td  >&nbsp;</td>
                	<td class="title2">TOTAL A + B</td>
                </tr>
                <tr  >
                	<td class="title2">IV. RESULTAT BRUT FISCAL</td>
                	<td class="title2">T1</td>
                	<td class="title2">T2</td>
                </tr>
                <tr  >
                	<td  class="normal">Bénéfice brut si T1 &gt; T2 (A)</td>
                	<td  class="highlighted">&nbsp;</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Déficit brut fiscal si T2 &gt; T1 (B)</td>
                	<td  >&nbsp;</td>
                	<td  class="highlighted">&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2">V. REPORTS DEFICITAIRES IMPUTES<span > </span>(C)<span> </span>(1)</td>
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Exercice n-4 (2018)</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Exercice n-3 (2019)</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Exercice n-2 (2020)</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Exercice n-1 (2021)</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Amort fiscalement différés imputés</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td class="title2">VI. RESULTAT NET FISCAL</td>
                	<td >&nbsp;</td>
                	<td >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">Bénéfice net fiscal<span > </span>(A-C)</td>
                	<td  class="title2">0.00</td>
                	<td  >&nbsp;</td>
                </tr>
                <tr  >
                	<td  class="normal">ou déficit net fiscal<span > </span>(B)</td>
                	<td  >&nbsp;</td>
                	<td  class="title2">0.00</td>
                </tr>
                <tr  >
                	<td  >&nbsp;</td>
                	<td  >&nbsp;</td>
                	<td class="title2">Montant</td>
                </tr>
                <tr  >
                    <td  class="title2">VII. CUMUL DES AMORTISSEMENTS FISCALEMENT DIFFERES</td>
                	<td  >&nbsp;</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                </tr>
                <tr  >
                	<td  class="title2">VIII. CUMUL DES DEFICITS FISCAUX RESTANT A REPORTER</td>
                	<td  >&nbsp;</td>
                    <td  class="title2">0.00</td>
                </tr>
                <tr  >
                	<td  class="normal">Exercice n-4 (2018)</td>
                	<td  class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td  >&nbsp;</td>
                </tr>
                <tr >
                	<td class="normal">Exercice n-3 (2019)</td>
                	<td class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td >&nbsp;</td>
                </tr>
                <tr >
                	<td class="normal">Exercice n-2 (2020)</td>
                	<td class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td >&nbsp;</td>
                </tr>
                <tr >
                	<td class="normal">Exercice n-1 (2021)</td>
                	<td class="background_blue"><input type="text" style="width:100%;" class="background_blue"></td>
                	<td >&nbsp;</td>
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
        totals1 : [0 ,0],
        totals2 : [0 ,0],
        totals3 : [0 ,0],
        totals4 : [0 ,0],
        totals5 : [0 ,0],
        totals6 : [0 ,0],
        totals7 : [0 ,0],
        totals8 : [0 ,0],
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
            let url2 = process.env.Name_api + "/exercice/" + this.id + "/getPassage";
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
            var total1 = this.total(["61298" , "6149"]);
            this.totals1 = [total1[0] , total1[1]];

            var total2 = this.total(["6148" , "6188"]);
            this.totals2 = [total2[0] , total2[1]];

            var total3 = this.total(["61298","6149","6148","6188","6168","6178","6198","6318","6338","6398","6118","6128"]);
            this.totals3 = [total3[0] , total3[1]];

            var total4 = this.total(["6701","6708","6585","6568","6583","6588","6598","65864"]);
            this.totals4 = [total4[0] , total4[1]];

            var total5 = this.totals3[0] + this.totals4[0] ; 
            this.totals5 = [total5 , 0];

            var total6 = this.total(["732","738111","631181"]);
            this.totals6 = [total6[0] , total6[1]];

            var total7 = this.totals6[0] ; 
            this.totals7 = [total7 , 0];
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