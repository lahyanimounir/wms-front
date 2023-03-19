<template>
    <v-data-table :headers="headers" :items="rows" sort-by="calories" class="elevation-1 px-5"
    :page="offset"
    :items-per-page="limit"
    @update:page="pageUpdateFunction"
    @update:items-per-page="offsetWatch"
    :server-items-length="totalItems">
        <template v-slot:top>
            <v-toolbar flat>
                <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
                <!-- <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider> -->
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Ajouter Tiers
                        </v-btn>
                    </template>

                    <v-form lazy-validation ref="form" method="post" @submit.prevent="login">


                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="close()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title> Ajouter Tiers</v-toolbar-title>

                        </v-toolbar>
                        <v-card>

                            <v-snackbar v-model="snackbar" :timeout="timeout">
                                {{ text }}

                                <template v-slot:action="{ attrs }">
                                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                    </v-btn>
                                </template>
                            </v-snackbar>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">Dénomination *</label>
                                            <v-text-field :rules="obligationRule" v-model="editedItem.denomination"
                                                counter maxlength="30" outlined dense placeholder="Dénomination"
                                                type="text" :disabled="addClicked" :filled="addClicked"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">identifiant fiscal *</label>
                                            <div class="d-flex">

                                                <v-text-field counter data-maxlength="10" class="mr-2" type="number"
                                                    :rules="obligationRule" :disabled="addClicked" :filled="addClicked"
                                                    v-model="editedItem.immf" outlined dense
                                                    oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                    placeholder="identifiant fiscal"></v-text-field>
                                                <v-btn :disabled="addClicked" :filled="addClicked" color="primary"
                                                    @click="serachByIf()">
                                                    <i class="far fa-search"></i>
                                                </v-btn>
                                            </div>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">COMPTE TIERS *</label>
                                            <v-autocomplete v-model="editedItem.compte_tiers" :items="collectifs" :filter="getList"
                                                outlined dense :disabled="addClicked" :filled="addClicked" :rules="obligationRule"
                                                placeholder="compte de contrepartie" item-text="numero_compte"
                                                item-value="id">

                                                <template slot="selection" slot-scope="{ item }">
                                                    {{ item.numero_compte }} - {{ item.intitulee }}
                                                </template>
                                                <template slot="item" slot-scope="{ item }">
                                                    {{ item.numero_compte }} - {{ item.intitulee }}
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">{{ deviseInput? "Ajouter Devise": "DEVISE" }}</label>
                                            <div v-if="!deviseInput" class="d-flex">
                                                <v-autocomplete v-model="editedItem.devise" :items="devises" outlined
                                                    :disabled="addClicked" :filled="addClicked"
                                                    dense placeholder="DEVISE" item-text="nom" item-value="id"
                                                    class="mr-2"></v-autocomplete>
                                                <v-btn color="primary" :disabled="addClicked" :filled="addClicked" @click="addDeviseBtn()">
                                                    <i class="fas fa-plus"></i>
                                                </v-btn>
                                            </div>
                                            <div v-if="addClicked && deviseInput">
                                                <v-form ref="addDeviseForm" class="d-flex">
                                                    <v-text-field outlined dense placeholder="Nom *"
                                                        item-text="intitulee" v-model="newDevise.nom"
                                                        :rules="obligationRule" item-value="id"
                                                        class="mr-2"></v-text-field>
                                                    <v-text-field outlined dense placeholder="Taux *"
                                                        item-text="intitulee" v-model="newDevise.taux"
                                                        :rules="obligationRule" item-value="id"
                                                        class="mr-2"></v-text-field>
                                                    <v-btn color="teal lighten-4" class="mr-2" :loading="loading"
                                                        :disabled="loading" @click="handleAddDevise()">
                                                        <i class="fas fa-plus"></i>
                                                    </v-btn>

                                                    <v-btn color="red lighten-3" @click="closeAddDevise()">
                                                        <i class="fas fa-times"></i>
                                                    </v-btn>
                                                </v-form>
                                            </div>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">Activitée</label>
                                            <v-text-field counter maxlength="60" :disabled="addClicked"
                                                :filled="addClicked" v-model="editedItem.activitee" outlined dense
                                                placeholder="Activitée" type="text"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">ICE</label>
                                            <v-text-field counter data-maxlength="15" class="mr-2"
                                                :disabled="addClicked" :filled="addClicked" type="number"
                                                :rules="iceRule" v-model="editedItem.ice" outlined dense
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                placeholder="ICE"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">REGISTRE DE COMMERCE</label>
                                            <v-text-field counter data-maxlength="8" class="mr-2" type="number"
                                                :disabled="addClicked" :filled="addClicked" v-model="editedItem.rc"
                                                outlined dense
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                placeholder="REGISTRE DE COMMERCE"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">Adresse</label>
                                            <v-text-field counter maxlength="60" :disabled="addClicked"
                                                :filled="addClicked" v-model="editedItem.adresse" outlined dense
                                                placeholder="Adresse" type="text"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">{{ villeInput ? "Ajouter une Ville" : "Ville" }}</label>
                                            <div v-if="!villeInput" class="d-flex">
                                                <v-autocomplete v-model="editedItem.ville" :items="villes" outlined
                                                    :disabled="addClicked" :filled="addClicked"
                                                    dense placeholder="Ville" item-text="intitulee" item-value="id"
                                                    class="mr-2"></v-autocomplete>
                                                <v-btn :disabled="addClicked" :filled="addClicked" color="primary" @click="addVilleBtn()">
                                                    <i class="fas fa-plus"></i>
                                                </v-btn>

                                            </div>
                                            <div v-if="addClicked && villeInput">
                                                <v-form ref="addVilleForm" class="d-flex">
                                                    <v-text-field outlined dense placeholder="Code *"
                                                        item-text="intitulee" v-model="newVille.code"
                                                        :rules="obligationRule" item-value="id"
                                                        class="mr-2"></v-text-field>
                                                    <v-text-field outlined dense placeholder="Intitulée *"
                                                        v-model="newVille.intitulee" :rules="obligationRule"
                                                        item-text="intitulee" item-value="id"
                                                        class="mr-2"></v-text-field>
                                                    <v-text-field outlined dense placeholder="Code postal *"
                                                        v-model="newVille.code_postal" :rules="obligationRule"
                                                        item-text="intitulee" item-value="id"
                                                        class="mr-2"></v-text-field>
                                                    <v-btn color="teal lighten-4" class="mr-2" :loading="loading"
                                                        :disabled="loading" @click="handleAddVille()">
                                                        <i class="fas fa-plus"></i>
                                                    </v-btn>

                                                    <v-btn color="red lighten-3" @click="closeAddVilleBtn()">
                                                        <i class="fas fa-times"></i>
                                                    </v-btn>
                                                </v-form>
                                            </div>
                                        </v-col>

                                        
                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">Telephone</label>
                                            <v-text-field v-model="editedItem.telephone" outlined dense
                                                :disabled="addClicked" :filled="addClicked" placeholder="Telephone"
                                                type="text"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">Email</label>
                                            <v-text-field v-model="editedItem.email" outlined dense
                                                :disabled="addClicked" :filled="addClicked" placeholder="Email"
                                                type="text"></v-text-field>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">ECHEANCE</label>
                                            <div class="d-flex">
                                                <v-autocomplete v-model="editedItem.echeance" :items="echeances"
                                                    outlined dense :disabled="addClicked" :filled="addClicked"
                                                    placeholder="ECHEANCE" item-text="code" item-value="id"
                                                    class="mr-2"></v-autocomplete>
                                                <!-- <v-btn color="primary"  @click="">
                                                    <i class="fas fa-plus"></i>
                                                </v-btn> -->
                                            </div>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">TYPE ECHEANCE</label>
                                            <v-autocomplete v-model="editedItem.type_echeance" :items="type_echeances"
                                                outlined dense :disabled="addClicked" :filled="addClicked"
                                                placeholder="TYPE ECHEANCE" item-text="valeur"
                                                item-value="id"></v-autocomplete>
                                        </v-col>

                                        <v-col lg="4" cols="12" class="py-0">
                                            <label for="">COMPTE DE CONTREPARTIE</label>
                                            <v-autocomplete v-model="editedItem.compte_contrepartie" :items="items2"
                                                :filter="getList"
                                                outlined dense :disabled="addClicked" :filled="addClicked"
                                                placeholder="COMPTE DE CONTREPARTIE" item-text="numero_compte"
                                                item-value="id">
                                                <template slot="selection" slot-scope="{ item }">
                                                    {{ item.numero_compte }} - {{ item.intitulee }}
                                                </template>
                                                <template slot="item" slot-scope="{ item }">
                                                    {{ item.numero_compte }} - {{ item.intitulee }}
                                                </template>z
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col lg="2" cols="12" class="py-0">
                                            <label for="">CODE TVA</label>
                                            <v-autocomplete v-model="editedItem.tva" :items="tvas" outlined dense
                                                :disabled="addClicked" :filled="addClicked" placeholder="CODE TVA"
                                                item-value="id" :item-text="getTvaText">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col lg="6" cols=12 class="py-0">
                                            <div class="d-flex" style="justify-content: space-between;align-items: center;">
                                                <label for="">Banque</label>
                                                <!-- <v-btn :disabled="addClicked" color="primary" @click="addNewBanque()">
                                                    <i class="fal fa-plus"></i>
                                                </v-btn> -->
                                                
                                                <div style="color: #5092f3;cursor: pointer;" @click="ajoutBanque()" class="py-2 d-inline-block"> 
                                                    <div class="d-inline-block px-2"  style="border: 2px dotted #5092f3;border-radius: 5px;cursor: pointer;">
                                                    <i class="fal fa-plus"></i>
                                                    
                                                    </div>
                                                    Ajouter nouvelle banque
                                                </div>

                                            </div>
                                            
                                            <div class="d-flex" v-for="(value, index) in editedItem.tiers_banques " :key="index">
                                                <v-autocomplete :disabled="addClicked" :filled="addClicked"
                                                    v-model="value.banque" :items="banques" outlined
                                                    dense placeholder="Banques" item-text="nom"
                                                    item-value="id" class="mr-2"></v-autocomplete>

                                                <v-text-field :disabled="addClicked" :filled="addClicked"
                                                    counter data-maxlength="24"
                                                    oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                    class="mr-2" type="number" :rules="ribRules"
                                                    v-model="value.rib" outlined dense
                                                    placeholder="RIB"></v-text-field>

                                                <v-btn v-if=" index != 0" outlined :disabled="addClicked" class="mr-2" color="primary" @click="deleteItemBanque(value)">
                                                    <i class="fal fa-times"></i>
                                                </v-btn>

                                        
                                            </div>
                                        </v-col>

                                        <v-col lg="6" cols="12" class="py-0">
                                            <label for="">logo</label>
                                            <template>
                                                <v-file-input :disabled="addClicked" :filled="addClicked" dense outlined
                                                    label="Logo " @change="getfile"></v-file-input>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Annuler
                                </v-btn>
                                <v-btn :disabled="addClicked" :filled="addClicked" color="blue darken-1" text
                                    @click="save">
                                    Enregistrer
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Êtes-vous sûr de bien vouloir supprimer cet élément
                            ?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Supprimer</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <div style="width: 100px;">

                <i class="mr-4 fal fa-pencil" @click="editItem(item)"></i>
                <i class="fal fa-trash-alt" @click="deleteItem(item)"></i>
            </div>
        </template>
    </v-data-table>
</template>


<script>
export default {
    data: () => ({
        Name_api: process.env.Name_api,
        dialog: false,
        dialogDelete: false,
        type_echeances: [{ id: 'date_facturation', valeur: 'DATE FACTURATION' }, { id: 'fin_du_moi', valeur: 'FIN DU MOIS' }],

        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
        ],
        numeroCompteRule: [
            v => !!v || 'Ce domaine est obligatoire.',
            v => v.length == 8 || 'Le nombre de caractères doit être égal à 8.',
        ],
        iceRule: [
            v => !v || v.length === 15 || "L'ICE doit être égal à 15",
        ],
        ribRules: [
            v => !v || v.length == 24 || 'Le nombre de caractères doit être égal à 24.',
        ],
        headers: [
            // {
            //     text: 'id',
            //     align: 'start',
            //     sortable: true,
            //     value: 'id',
            // },
            { text: 'Dénomination', value: 'denomination' },
            { text: 'identifiant fiscal', value: 'immf' },
            { text: 'Activitée', value: 'activitee' },
            { text: 'ICE', value: 'ice' },
            { text: 'RC', value: 'rc' },
            { text: 'Adresse', value: 'adresse' },

            { text: 'Téléphone', value: 'telephone' },
            { text: 'Action', value: 'action' },

        ],
        items2: [],
        collectifs: [],
        devices: [],
        villes: [],
        banques: [],
        echeances: [],
        devises: [],
        tvas: [],
        rows: [],
        editedIndex: -1,
        editedItem: {
            denomination: '',
            immf: '',
            devise: '',
            activitee: '',
            ice: '',
            rc: '',
            adresse: '',
            ville: '',
            banque: '',
            rib: '',
            telephone: '',
            email: '',
            echeance: '',
            type_echeance: '',
            compte_contrepartie: '',
            logo: '',
            tva: '',
            compte_tiers: '',
            tiers_banques:[{
                banque:'',
                rib:'',
            }
            ],
        },
        defaultItem: {
            denomination: '',
            immf: '',
            devise: '',
            activitee: '',
            ice: '',
            rc: '',
            adresse: '',
            ville: '',
            banque: '',
            rib: '',
            telephone: '',
            email: '',
            echeance: '',
            type_echeance: '',
            compte_contrepartie: '',
            logo: '',
            tva: '',
            compte_tiers: '',
            tiers_banques:[{
                banque:'',
                rib:'',
            }
            ],
        },
        timeout: 3000,
        loader: null,
        loading: false,
        addClicked: false,
        deviseInput: false,
        snackbar: false,
        text: '',
        defaultDevise: {
            nom: '',
            taux: '',
        },
        newDevise: {
            nom: '',
            taux: '',
        },
        villeInput:false,
        defaultVille:{
            code:'',
            intitulee:'',
            code_postal:''
        },
        newVille:{
            code:'',
            intitulee:'',
            code_postal:''
        },
        offset:1,
        limit:10,
        totalItems:500,
        exerciceId:null,
        previousMenu:null,
        ecriture:{},
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter Forme Juridique' : 'Modifier Forme Juridique'
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 2000)

            this.loader = null
        }
    },

    created() {
        let query = this.$route.query
        let ecriture = localStorage.getItem('ecriture')
        if (ecriture != null && query.hasOwnProperty('exerciceId') && query.hasOwnProperty('previousMenu') && Object.keys(query).length){
            this.exerciceId = query.exerciceId
            this.previousMenu = query.previousMenu
            this.ecriture = JSON.parse(ecriture)
            this.dialog = true
            
        }
        this.initialize();
        this.getTiers()
    },
    fetch() {
    },
    methods: {
        getList(item, queryText, itemText) {
            return itemText.toLocaleLowerCase().startsWith(queryText.toLocaleLowerCase())
        },
        async getTiers(){
            let url = `${this.Name_api}/tiers?offset=${this.offset}&limit=${this.limit}`
            let res = await this.$myService.get(url)
            this.rows = res
        },
        ajoutBanque(){
            this.editedItem.tiers_banques.push({banque:'',rib:''})
        },
        deleteItemBanque(item){
            this.editedItem.tiers_banques.splice(item, 1)
        },
        async serachByIf() {

            // let url = `https://maroc.welipro.com/recherche?q=${this.editedItem.immf}&type=idf&rs=&cp=1&cp_max=2035272260000&et=&v=`;
            // let res = await this.$myService.get(url)
            let url = process.env.Name_api + `/dossiers/searchByIf?if=${this.editedItem.immf}`;
            const res = await this.$myService.get(url)
            let doc = new DOMParser().parseFromString(res, "text/html")
            let card = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0')
            this.editedItem.denomination = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 a') ? doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 a').outerText.trim() : '';
            this.editedItem.activitee = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 .card-body') ? doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 .card-body').outerText.trim() : '';

            if (card) {
                let lis = card.querySelectorAll('ul li')

                this.editedItem.ice = lis[0].querySelector('.ml-auto').outerText.replaceAll(" ", "").replace(/\D/g, "").trim();
                this.editedItem.rc = lis[1].querySelector('.ml-auto').outerText.replaceAll(" ", "").replace(/\D/g, "").trim();
                // this.editedItem.ville= lis[1].querySelector('.ml-auto a').outerText.replaceAll(" ","");
                // this.editedItem.date_creation = lis[2].querySelector('.ml-auto').outerText.replaceAll(" ", "");
                //console.log(lis)
                this.editedItem.adresse = lis[5].outerText.trim();
                this.$forceUpdate()
            } else {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.$refs.form.resetValidation()
            }

            //  this.editedItem.adresse= lis[5].outerText;
            // this.editedItem.rc= li[1].outerText;
            // this.editedItem.date_creation= li[3].outerText;
            // this.editedItem.etat= li[3].outerText;
            //console.log(this.editedItem)
        },
        async initialize() {
            let url = process.env.Name_api + "/planComptables";
            this.items2 = await this.$myService.get(url)
            this.collectifs = this.items2.filter(item => item.c_g.toLowerCase() === 'collectif')
            // //console.log(this.collectifs)
            // //console.log(this.items2)


            url = process.env.Name_api + "/Devises";
            this.devises = await this.$myService.get(url)


            url = process.env.Name_api + "/villes";
            this.villes = await this.$myService.get(url)

            url = process.env.Name_api + "/banques";
            this.banques = await this.$myService.get(url)

            url = process.env.Name_api + "/echeances";
            this.echeances = await this.$myService.get(url)

            url = process.env.Name_api + "/tva";
            this.tvas = await this.$myService.get(url)

            url = process.env.Name_api + "/tiers";
            this.rows = await this.$myService.get(url)

        },

        async editItem(item) {
            const url = process.env.Name_api + "/tiers/" + item.id;
            const res = await this.$myService.get(url)
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem = Object.assign({}, res)
            //console.log(this.editedItem)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.rows.indexOf(item)
            //console.log(this.editedIndex)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {

            this.delete(this.editedItem)
            // this.rows.splice(this.editedIndex, 1)

        },

        close() {
            
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.$refs.form.resetValidation()
            })
            if(this.isRedirect()){
                this.$router.push({path:`/comptabilitee/${this.exerciceId}/saisie/${this.previousMenu}`,query:{message:'close'}})
            }
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.$refs.form.validate()) {
                if (this.editedIndex > -1) {
                    this.update()
                } else {
                    this.add();
                }
            }

        },
        async add() {
            try {
                let params = this.isRedirect() ? `?exerciceId=${this.exerciceId}`: ""
                let url = process.env.Name_api + "/tiers" + params;
                var formData = new FormData();

                Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));
                formData.append('tiers_banque_arr',JSON.stringify(this.editedItem.tiers_banques))
                //console.log(formData.get('tiers_banque_arr'))
                const aaaa = await this.$myService.post(url, formData, true)
                console.log('aaaa',aaaa.data)
                aaaa.data.tiers_banques = JSON.parse(JSON.stringify(this.editedItem.tiers_banques)) 
                this.rows.push(aaaa.data)
                if(this.isRedirect()){
                    console.log('here add')
                    this.ecriture.tiers = aaaa.data
                    this.ecriture.plan_comptable = aaaa.data.compte_tiers
                    localStorage.setItem('ecriture',JSON.stringify(this.ecriture))
                    this.$router.push({path:`/comptabilitee/${this.exerciceId}/saisie/${this.previousMenu}`,query:{message:'success'}})
                }
                else this.close()
                
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                // this.$global.makeToast(this.$bvToast,'warning',this.$global.getErrorMsg(errors).message,'Attention')                  
                // statusCode
                this.close()
            }

        },
        async update() {
            try {
                let url = process.env.Name_api + "/tiers/" + this.editedItem.id;

                if (typeof this.editedItem.ville === 'object' && this.editedItem.ville !== null) {
                    this.editedItem.ville = this.editedItem.ville.id
                }
                if (typeof this.editedItem.tva === 'object' && this.editedItem.tva !== null) {
                    this.editedItem.tva = this.editedItem.tva.id
                }
                if (typeof this.editedItem.echeance === 'object' && this.editedItem.echeance !== null) {
                    this.editedItem.echeance = this.editedItem.echeance.id
                }
                if (typeof this.editedItem.devise === 'object' && this.editedItem.devise !== null) {
                    this.editedItem.devise = this.editedItem.devise.id
                }
                if (typeof this.editedItem.compte_tiers === 'object' && this.editedItem.compte_tiers !== null) {
                    this.editedItem.compte_tiers = this.editedItem.compte_tiers.id
                }
                if (typeof this.editedItem.compte_contrepartie === 'object' && this.editedItem.compte_contrepartie !== null) {
                    this.editedItem.compte_contrepartie = this.editedItem.compte_contrepartie.id
                }
                if (typeof this.editedItem.banque === 'object' && this.editedItem.banque !== null) {
                    this.editedItem.banque = this.editedItem.banque.id
                }


                var formData = new FormData();

                Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));
                formData.append('tiers_banque_arr',JSON.stringify(this.editedItem.tiers_banques))

                const aaaa = await this.$myService.post(url, formData, true)
                // const skil =this.rows.find(item=> item.id == this.editedItem.id)
                // Object.assign(skil, this.editedItem);
                Object.assign(this.rows[this.editedIndex], this.editedItem)
                this.close()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                // this.$global.makeToast(this.$bvToast,'warning',this.$global.getErrorMsg(errors).message,'Attention')                 
                // statusCode
                this.close()
            }
        },
        async delete(val) {
            //console.log(val)
            try {
                let url = process.env.Name_api + "/tiers/" + val.id;
                const aaaa = await this.$myService.delete(url, this.editItem)
                this.rows.splice(this.editedIndex, 1)
                this.closeDelete()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeDelete()
            }
        },
        async getfile($event) {
            const file = $event
            if (!file) return;
            this.editedItem.logo = file;

        },
        showToast(message) {
            this.text = message
            this.snackbar = true

        },
        addDeviseBtn() {
            this.addClicked = true
            this.deviseInput = true
        },
        closeAddDevise() {
            this.addClicked = false
            this.deviseInput = false
        },
        async handleAddDevise() {
            let url = process.env.Name_api + "/Devises";
            if (!this.$refs.addDeviseForm.validate()) {
                this.showToast("Veuillez remplir les champs obligatoires")
                return
            }
            this.loader = 'loading'
            const res = await this.$myService.post(url, this.newDevise)
            if (res.data) {
                this.deviseInput = false
                this.addClicked = false
                this.devises.push(res.data)
                this.newDevise = Object.assign({}, this.defaultDevise)
                this.showToast("Devise ajoutée avec succès")
            }
            else {
                this.showToast("Une erreur s'est produite")
            }

        },
        async handleAddVille() {
            if (!this.$refs.addVilleForm.validate()) {
                this.showToast("Veuillez remplir les champs obligatoires")
                return
            }
            this.loader = 'loading'
            await this.addVille()
            this.$r
            this.newVille = Object.assign({}, this.defaultVille)

        },
        closeAddVilleBtn(){
            this.villeInput = false
            this.addClicked = false
        },
        addVilleBtn(){
            this.villeInput = true
            this.addClicked = true
        },
        enableInputs(){
            this.addClicked = false
        },
        hideAddInputs(){
            this.villeInput = false
            this.newVille = Object.assign({}, this.defaultVille)
        },
        async addVille() {
            try {
                let url = process.env.Name_api + "/villes";
                const res = await this.$myService.post(url, this.newVille)
                if(res.data){
                    this.villes.push(res.data)
                    this.showToast('Ville a été ajouté avec succès')
                    this.enableInputs()
                    this.hideAddInputs()
                }
                else{
                    this.showToast("Erreur lors de l'ajout du ville")
                }
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.close()
            }

        },
        getTvaText(item){
            return `${item.code} - ${item.intitulee}`
        },
        pageUpdateFunction(page) {
            this.offset = page
            this.getTiers()
        },
        offsetWatch(offset){
            this.limit = offset
            this.getTiers()
        },
        isRedirect(){
            return this.exerciceId != null && this.previousMenu != null && this.exerciceId != '' && this.previousMenu != '' && localStorage.getItem('ecriture') != null
        }
    },
}
</script>