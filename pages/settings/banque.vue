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
                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Ajouter Banque
                        </v-btn>
                    </template>

                    <v-form lazy-validation ref="form" method="post"
                                                    @submit.prevent="login">
                                                    

                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="close()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title> Ajouter banque</v-toolbar-title>

                    </v-toolbar>
                    <v-card>


                        <v-card-text>
                            <v-container>
                                <v-row>
                            
                                    <v-col cols="12" class="py-0">
                                        <label for="">Nom *</label>
                                        <v-text-field counter maxlength="40" :rules="obligationRule" v-model="editedItem.nom" outlined dense
                                            placeholder="Nom"></v-text-field>
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
    </v-data-table>
</template>


<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        items:[{id:'credit',valeur:'Crédit'},{id:'debit',valeur:'Debit'}],
        items2:[{id:'general',valeur:'général'},{id:'collectif',valeur:'Collectif'}],
        obligationRule: [
            v => !!v || 'Ce domaine est obligatoire.',
            ],
        numeroCompteRule: [
            v => !!v || 'Ce domaine est obligatoire.',
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
            { text: 'Action', value: 'action' },

        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            Nom: '',
        },
        defaultItem: {
            Nom: '',      
        },
        offset:1,
        limit:10,
        totalItems:500,
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter banque' : 'Modifier banque'
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

        // this.initialize();
        this.getBanques();
    },
    fetch() {
    },
    
    methods: {
        async getBanques() {
            let url = `${process.env.Name_api}/banques?limit=${this.limit}&offset=${this.offset}`;
            this.rows = await this.$myService.get(url)
           
        },
        async initialize() {
            let url = process.env.Name_api + "/banques";
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
                let url = process.env.Name_api + "/banques";
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
                let url = process.env.Name_api + "/banques/" + this.editedItem.id;
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
                let url = process.env.Name_api + "/banques/" + val.id;
                const aaaa = await this.$myService.delete(url, this.editItem)
                this.rows.splice(this.editedIndex, 1)
                this.closeDelete()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeDelete()
            }
        },
        pageUpdateFunction(page) {
            this.offset = page
            this.getBanques()
        },
        offsetWatch(offset){
            this.limit = offset
            this.getBanques()
        },
    },
}
</script>