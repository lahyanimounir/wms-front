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
                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Ajouter journaux
                        </v-btn>
                    </template>

                    <v-form lazy-validation ref="form" method="post"
                                                    @submit.prevent="login">
                                                    

                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="close()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title> Ajouter journaux</v-toolbar-title>

                    </v-toolbar>
                    <v-card>


                        <v-card-text>
                            <v-container>
                                <v-row>
                             
                                    <v-col cols="12" class="py-0">
                                        <label for="">Nom journal *</label>
                                        <v-text-field counter maxlength="40" :rules="obligationRule" v-model="editedItem.nom" outlined dense
                                            placeholder="Nom"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" class="py-0">
                                        <label for="">Type Journaux *</label>
                                        <v-autocomplete   v-model="editedItem.type" :rules="obligationRule" :items="items" outlined dense 
                                            placeholder="Type Journaux" item-text="valeur" item-value="id"></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" class="py-0">
                                        <label for="">compte de contrepartie *</label>
                              


                                        
                                        <v-autocomplete   v-model="editedItem.id_compte_contrepartie" :rules="obligationRule" :items="items2" outlined dense 
                                            placeholder="compte de contrepartie" item-text="intitulee" item-value="id">
                                            <template slot="selection" slot-scope="{ item }">
                                                {{  item.numero_compte}} -  {{ item.intitulee }} 
                                        </template>
                                        <template slot="item" slot-scope="{ item }">
                                            {{  item.numero_compte}} -  {{ item.intitulee }} 
                                            </template>
                                        </v-autocomplete>
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
            <i class="mr-4 fal fa-pencil" @click="editItem(item)"></i>
            <i class="fal fa-trash-alt" @click="deleteItem(item)"></i>
        </template>
        <template v-slot:item.id_compte_contrepartie="{ item }">
           {{ item.id_compte_contrepartie.intitulee }}
        </template>
    </v-data-table>
</template>


<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        items:[{id:'Achat',valeur:'ACHAT'},{id:'Vente',valeur:'VENTE'},{id:'Tresorerie',valeur:'TRESORERIE'},{id:'OPERATIONS DIVERS',valeur:'OPERATIONS DIVERS'},{id:'A NOUVEAU',valeur:'A NOUVEAU'},{id:'RESULTAT',valeur:'RESULTAT'}],
        items2:[],
        obligationRule: [
            v => !!v || 'Ce champs est obligatoire.',
            ],
        numeroCompteRule: [
            v => !!v || 'Ce champs est obligatoire.',
            v => v.length == 8 || 'Le nombre de caractères doit être égal à 8.',
        ],
        headers: [
            {
                text: 'id',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Nom', value: 'nom' },
            { text: 'Type', value: 'type' },
            { text: 'Compte contrepartie', value: 'id_compte_contrepartie' },
            { text: 'Action', value: 'action' },
            


        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            nom: '',
            type: '',
            id_compte_contrepartie: '',
        },
        defaultItem: {
            nom: '',
            type: '',      
            id_compte_contrepartie: '',      
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter Journaux' : 'Modifier Journaux'
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
        async initialize() {
            url = process.env.Name_api + "/planComptables";
           this.items2 = await this.$myService.get(url)
            let url = process.env.Name_api + "/journaux";
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
                let url = process.env.Name_api + "/journaux";
                const aaaa = await this.$myService.post(url, this.editedItem)
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
                let url = process.env.Name_api + "/journaux/" + this.editedItem.id;
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
                let url = process.env.Name_api + "/journaux/" + val.id;
                const aaaa = await this.$myService.delete(url, this.editItem)
                this.rows.splice(this.editedIndex, 1)
                this.closeDelete()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeDelete()
            }
        },
    },
}
</script>