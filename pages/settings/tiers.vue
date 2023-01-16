<template>
    <v-data-table :headers="headers" :items="rows" sort-by="calories" class="elevation-1 px-5">
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

                    <v-form lazy-validation ref="form" method="post"
                                                    @submit.prevent="login">
                                                    

                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="close()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title> Ajouter Tiers</v-toolbar-title>

                    </v-toolbar>
                    <v-card>


                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Dénomination *</label>
                                        <v-text-field  :rules="obligationRule" 
                                        v-model="editedItem.denomination" counter maxlength="30" outlined dense
                                            placeholder="Dénomination" type="text"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">identifiant fiscal *</label>
                                        <div class="d-flex">

                                            <v-text-field counter data-maxlength="10" class="mr-2"
                                                type="number" :rules="obligationRule"
                                                v-model="editedItem.immf" outlined dense
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                placeholder="identifiant fiscal"></v-text-field>
                                                <v-btn color="primary" @click="serachByIf()">
                                                                <i class="far fa-search"></i>
                                                            </v-btn>
                                        </div>
                                    </v-col>
                           
                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">COMPTE TIERS *</label>
                                        <v-autocomplete   v-model="editedItem.compte_tiers" :rules="obligationRule" :items="items2" outlined dense 
                                            placeholder="compte de contrepartie" item-text="intitulee" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">DEVISE *</label>
                                        <v-autocomplete   v-model="editedItem.devise" :rules="obligationRule" :items="devises" outlined dense 
                                            placeholder="DEVISE" item-text="nom" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Activitée *</label>
                                        <v-text-field counter maxlength="30" :rules="obligationRule" 
                                        v-model="editedItem.activitee"  outlined dense
                                            placeholder="Activitée" type="text"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">ICE *</label>
                                        <v-text-field counter data-maxlength="15" class="mr-2"
                                                type="number" :rules="obligationRule"
                                                v-model="editedItem.ice" outlined dense
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                placeholder="ICE"></v-text-field>
                                    </v-col>
                             
                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">REGISTRE DE COMMERCE *</label>
                                        <v-text-field counter data-maxlength="8" class="mr-2"
                                                type="number" :rules="obligationRule"
                                                v-model="editedItem.rc" outlined dense
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                placeholder="REGISTRE DE COMMERCE"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Adresse *</label>
                                        <v-text-field  counter maxlength="60" :rules="obligationRule" 
                                        v-model="editedItem.adresse"  outlined dense
                                            placeholder="Adresse" type="text"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Villes *</label>
                                        <v-autocomplete   v-model="editedItem.ville" :rules="obligationRule" :items="villes" outlined dense 
                                            placeholder="Villes" item-text="intitulee" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Banques *</label>
                                        <v-autocomplete   v-model="editedItem.banque" :rules="obligationRule" :items="banques" outlined dense 
                                            placeholder="Banques" item-text="nom" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">RIB *</label>
                                        <v-text-field 
                                        counter data-maxlength="24"
                                        oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                        :rules="obligationRule" 
                                        v-model="editedItem.rib"  outlined dense
                                            placeholder="RIB" type="number"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Telephone *</label>
                                        <v-text-field  :rules="obligationRule" 
                                        v-model="editedItem.telephone"  outlined dense
                                            placeholder="Telephone" type="text"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">Email *</label>
                                        <v-text-field  :rules="obligationRule" 
                                        v-model="editedItem.email"  outlined dense
                                            placeholder="Email" type="text"></v-text-field>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">ECHEANCE *</label>
                                        <v-autocomplete   v-model="editedItem.echeance" :rules="obligationRule" :items="echeances" outlined dense 
                                            placeholder="ECHEANCE" item-text="code" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">TYPE ECHEANCE *</label>
                                        <v-autocomplete   v-model="editedItem.type_echeance" :rules="obligationRule" :items="type_echeances" outlined dense 
                                            placeholder="TYPE ECHEANCE" item-text="valeur" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">COMPTE DE CONTREPARTIE *</label>
                                        <v-autocomplete   v-model="editedItem.compte_contrepartie" :rules="obligationRule" :items="items2" outlined dense 
                                            placeholder="COMPTE DE CONTREPARTIE" item-text="intitulee" item-value="id">
                                            <template slot="selection" slot-scope="{ item }">
                                                {{  item.numero_compte}} -  {{ item.intitulee }} 
                                        </template>
                                        <template slot="item" slot-scope="{ item }">
                                            {{  item.numero_compte}} -  {{ item.intitulee }} 
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">CODE TVA *</label>
                                        <v-autocomplete   v-model="editedItem.tva" :rules="obligationRule" :items="tvas" outlined dense 
                                            placeholder="CODE TVA" item-text="intitulee" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col lg="6" cols="12" class="py-0">
                                        <label for="">logo *</label>
                                        <template>
                                            <v-file-input dense :rules="obligationRule" outlined label="Logo " @change="getfile"></v-file-input>
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
                            <v-btn color="blue darken-1" text @click="save">
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
        Name_api: process.env.Name_api ,
        dialog: false,
        dialogDelete: false,
        type_echeances:[{id:'date_facturation',valeur:'DATE FACTURATION'},{id:'fin_du_moi',valeur:'FIN DU MOIS'}],
       
        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
            ],
        numeroCompteRule: [
            v => !!v || 'Ce domaine est obligatoire.',
            v => v.length == 8 || 'Le nombre de caractères doit être égal à 8.',
        ],
        headers: [
            // {
            //     text: 'id',
            //     align: 'start',
            //     sortable: true,
            //     value: 'id',
            // },
            { text : 'Dénomination', value: 'denomination' },
            { text : 'identifiant fiscal', value: 'immf' },
            { text : 'Activitée', value: 'activitee' },
            { text : 'ICE', value: 'ice' },
            { text : 'RC', value: 'rc' },
            { text : 'Adresse', value: 'adresse' },
 
            { text : 'Téléphone', value: 'telephone' },
            { text: 'Action', value: 'action' },

        ],
        items2:[],
        devices:[],
        villes:[],
        banques:[],
        echeances:[],
        devises:[],
        tvas:[],
        rows: [],
        editedIndex: -1,
        editedItem: {
            denomination : '',
            immf : '',
            devise : '',
            activitee : '',
            ice : '',
            rc : '',
            adresse : '',
            ville : '',
            banque : '',
            rib : '',
            telephone : '',
            email : '',
            echeance : '',
            type_echeance : '',
            compte_contrepartie : '',
            logo : '',
            tva : '',
            compte_tiers : '',
        },
        defaultItem: {
            denomination : '',
            immf : '',
            devise : '',
            activitee : '',
            ice : '',
            rc : '',
            adresse : '',
            ville : '',
            banque : '',
            rib : '',
            telephone : '',
            email : '',
            echeance : '',
            type_echeance : '',
            compte_contrepartie : '',
            logo : '',
            tva : '',
            compte_tiers : '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter Forme Juridique' : 'Modifier Forme Juridique'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {

        this.initialize();
    },
    fetch() {
    },
    methods: {
        async serachByIf() {

            let url = `https://maroc.welipro.com/recherche?q=${this.editedItem.immf}&type=idf&rs=&cp=1&cp_max=2035272260000&et=&v=`;
            let res = await this.$myService.get(url)
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
                console.log(lis)
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
            console.log(this.editedItem)
        },
        async initialize() {
            let url = process.env.Name_api + "/planComptables";
            this.items2 = await this.$myService.get(url)
        

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

        editItem(item) {
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.rows.indexOf(item)
            console.log(this.editedIndex)
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
                let url = process.env.Name_api + "/tiers";
                var formData = new FormData();
                  
                  Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));
                const aaaa = await this.$myService.post(url, formData, true)
                this.rows.push(aaaa.data)
                this.close()
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
                const aaaa = await this.$myService.update(url, this.editedItem)
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
            console.log(val)
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

        }
    },
}
</script>