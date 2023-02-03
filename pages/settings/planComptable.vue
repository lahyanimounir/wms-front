<template>
    <v-data-table :headers="headers" :items="rows" sort-by="calories" class="elevation-1 px-5 pl-comptable">
        <template v-slot:top>
            <v-toolbar flat>
              
                <v-file-input style="display: none;" id="fileUpload" outlined hide-details="auto" class="pr-4"
                    v-model="file" placeholder="Choisir Image" prepend-icon="" @change="getfile"></v-file-input>


                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" outlined dark v-bind="attrs" v-on="on">
                            Gérer vos données
                        </v-btn>
                    </template>
                    <v-list link>
                        <v-list-item link>
                            <v-list-item-title @click="uploadFile()">
                                Importer les données
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-title>
                                <a style="color: inherit;text-decoration: none;"
                                    :href="Name_api + '/planComptables/file'"> Télecharger canvas</a>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-title>
                                <a style="color: inherit;text-decoration: none;"
                                    :href="Name_api + '/planComptables/exportData'" class="mr-2"> Exporter données</a>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-spacer></v-spacer>



                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn elevation="1" color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Ajouter Plan Comptable
                        </v-btn>
                    </template>

                    <v-form lazy-validation ref="form" method="post" @submit.prevent="login">


                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="close()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title> Ajouter Plan Comptable</v-toolbar-title>

                        </v-toolbar>
                        <v-card>


                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" class="pb-0">
                                            <label for="">Numero de compte *</label>
                                            <v-text-field counter data-maxlength="8" :rules="numeroCompteRule"
                                                v-model="editedItem.numero_compte" outlined dense
                                                placeholder="Numero de compte" type="number"
                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0">
                                            <label for="">Intitulée *</label>
                                            <v-text-field counter maxlength="100" :rules="obligationRule"
                                                v-model="editedItem.intitulee" outlined dense
                                                placeholder="Intitulée"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0">
                                            <label for="">Crédit / Debit *</label>
                                            <v-autocomplete v-model="editedItem.debit_credit" :rules="obligationRule"
                                                :items="items" outlined dense placeholder="Crédit / Debit"
                                                item-text="valeur" item-value="id"></v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" class="py-0">
                                            <label for="">GENERAL / COLLECTIF *</label>
                                            <v-autocomplete v-model="editedItem.c_g" :rules="obligationRule"
                                                :items="items2" outlined dense placeholder="GENERAL / COLLECTIF"
                                                item-text="valeur" item-value="id"></v-autocomplete>
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
        Name_api: process.env.Name_api,
        file: null,
        dialog: false,
        dialogDelete: false,
        items: [{ id: 'CREDIT', valeur: 'Crédit' }, { id: 'DEBIT', valeur: 'Debit' }],
        items2: [{ id: 'GENERALE', valeur: 'général' }, { id: 'COLLECTIF', valeur: 'Collectif' }],
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
            { text: 'Numero de compte', value: 'numero_compte' },
            { text: 'Intitulée', value: 'intitulee' },
            { text: 'Debit / Credit', value: 'debit_credit' },
            { text: 'C / G', value: 'c_g' },
            { text: 'Action', value: 'action' },

        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            numero_compte: '',
            intitulee: '',
            debit_credit: '',
            type_compte: '',
            c_g: '',

        },
        defaultItem: {
            numero_compte: '',
            intitulee: '',
            debit_credit: '',
            type_compte: '',
            c_g: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter Plan comptable' : 'Modifier Plan comptable'
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
            let url = process.env.Name_api + "/planComptables";
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
                let url = process.env.Name_api + "/planComptables";
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
                let url = process.env.Name_api + "/planComptables/" + this.editedItem.id;
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
                let url = process.env.Name_api + "/planComptables/" + val.id;
                const aaaa = await this.$myService.delete(url, this.editItem)
                this.rows.splice(this.editedIndex, 1)
                this.closeDelete()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeDelete()
            }
        },
        uploadFile() {
            document.getElementById('fileUpload').click();
        },
        async getfile($event) {
            const file = $event
            if (!file) return;
            this.file = file;

            let fData = new FormData();
            fData.append("file", file);
            let url = process.env.Name_api + "/upload-excel";
            const aaaa = await this.$myService.post(url, fData, true)
        }
    },

}
</script>


<style >
.pl-comptable .v-toolbar__content {
    flex-direction: row-reverse;
}
</style>