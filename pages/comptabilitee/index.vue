<template>


    <v-container>
        <v-card>
            <v-card-title>
                Dossiers
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>
            </v-card-title>


            <v-data-table :search="search" :headers="headers" :items="rows" sort-by="calories" class="elevation-1 px-5">

                <template v-slot:top>
                    <v-toolbar flat>
                        <v-dialog v-model="dialog" fullscreen>
                            <!-- <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Exercices
                                </v-btn>
                            </template> -->




                            <v-toolbar dark color="primary">
                                <v-btn icon dark @click="close()">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Exercice</v-toolbar-title>

                            </v-toolbar>
                        <v-form ref="exerciceForm">
                            <v-card>

                                <v-card-text>
                                    <v-container>
                                        <v-card-title class="px-0 py-1"> Ajouter Exercice</v-card-title>


                                        <v-row class="py-5 mt-2 mb-0" style="border: 1px solid #ddd;">



                                            <v-col cols="6" class="py-0">
                                                <label for="">Du *</label>
                                                <div>
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="editedItem.du" :rules="obligationRule" outlined dense
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem.du" :max="au"></v-date-picker>
                                                    </v-menu>

                                                </div>
                                            </v-col>
                                            <v-col cols="6" class="py-0">
                                                <label for="">Au *</label>
                                                <div>
                                                    <v-menu ref="menu" v-model="menu2" :close-on-content-click="false"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :rules="obligationRule" v-model="editedItem.au" outlined dense
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem.au" :min="du"></v-date-picker>
                                                    </v-menu>

                                                </div>
                                            </v-col>

                                            <v-col lg="6" cols="12" class="py-0">
                                                <label for="">Régime TVA *</label>
                                                <v-autocomplete :items="regimes" :rules="obligationRule" outlined dense placeholder="Régime TVA"
                                                    item-text="valeur" v-model="editedItem.regimeTva" item-value="id"></v-autocomplete>
                                            </v-col>

                                            <v-col lg="6" cols="12" class="py-0">
                                                <label for="">TVA *</label>
                                                <v-autocomplete :items="tva" :rules="obligationRule" outlined dense placeholder="TVA"
                                                    item-text="valeur" v-model="editedItem.tva" item-value="id"></v-autocomplete>
                                            </v-col>

                                            <v-col lg="12" cols="12" class="py-0">
                                                <label for="">Droit de timbre *</label>
                                                <v-autocomplete v-model="editedItem.droit_timbre" :rules="obligationRule" :items="timbre" outlined dense placeholder="Timbre"
                                                    item-text="valeur" item-value="id"></v-autocomplete>
                                            </v-col>
                                            <v-col lg="12" cols="12" class="py-0">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>

                                                    <v-btn color="blue darken-1" text @click="addExercice">
                                                        Ajouter
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-col>
                                        </v-row>
                                        <v-card-title class="px-0 pb-2 pt-3"> Choisir Exercice</v-card-title>
                                        <v-row class="py-5 ">
                                            <v-col cols="12" class="py-0 px-0">
                                                <v-data-table :search="search" :headers="Exerciceheaders"
                                                    :items="dossier.exercices" style="border: 1px solid #ddd;"
                                                    class="px-5">
                                                    <template v-slot:item.action="{ item }">
                                                    
                                                        <v-btn text color="primary" @click="actionHandle(item)">
                                                            Démarrer l'exercice
                                                        </v-btn>
                                                    
                                                    </template>
                                                </v-data-table>
                                            </v-col>


                                        </v-row>
                                    </v-container>
                                </v-card-text>


                            </v-card>
                        </v-form>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">

                    <v-btn text color="primary" @click="startExercice(item)">
                        Démarrer l'exercice
                    </v-btn>

                </template>
            </v-data-table>
        </v-card>
    </v-container>

</template>
<script>
export default {
    data: () => ({
        dialog: false,
        dossier: {},
        rows: [],
        menu: false,
        menu2: false,
        editedItem: {
            du: '',
            au: '',
            regimeTva: '',
            tva: '',
            droit_timbre: '',
        },
        defultItem: {
            du: '',
            au: '',
            regimeTva: '',
            tva: '',
            droit_timbre: '',
        },
        search: '',
        du: null,
        au: null,
        regimes: [{ id: 'EXONEREE', valeur: 'Exoneré' }, { id: 'MENSUELLE', valeur: 'Mensuel' }, { id: 'TRIMESTRIELLE', valeur: 'Trimestriel' }],
        tva: [{ id: 'DEBIT', valeur: 'Débit' }, { id: 'ENCAISSMENT', valeur: 'Encaissement' }],
        timbre: [{ id: 'ASSUJETI', valeur: 'Assujeti' }, { id: 'NON', valeur: 'NON ASSUJETTI' }],
        headers: [
            {
                text: 'id',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'denomination', value: 'denomination' },
            { text: 'if', value: 'immf' },
            { text: 'rc', value: 'rc' },
            { text: 'Mobile', value: 'telephone_mobile' },
            { text: 'Email', value: 'email' },
            { text: 'Action', value: 'action' },
        ],
        Exerciceheaders: [
            {
                text: 'id',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Du', value: 'du' },
            { text: 'Au', value: 'au' },
            { text: 'Regime Tva', value: 'regimeTva' },
            { text: 'Tva', value: 'tva' },
            { text: 'Droit Timbre', value: 'droit_timbre' },
            { text: 'Action', value: 'action' },

        ],
        obligationRule: [
            v => !!v || 'Champ obligatoire',
        ],
    }),
    created() {
        this.initialize()
    },
    methods: {
        async initialize() {
            let url = process.env.Name_api + "/dossiers";
            this.rows = await this.$myService.get(url)
        },
        startExercice(item) {
            this.dossier = item
            // console.log('item', item)
            this.dialog = true;
            
        },
        save() {

            this.dossier = item
            this.dialog = true;
        },
        async addExercice() {
            let url = process.env.Name_api +`/${this.dossier.id}/exercice/new`;
            // this.rows = await this.$myService.post(url)
            if(this.validateForm()){
                
                // this.dossier.exercices.push(this.editedItem)
                const res = await this.$myService.post(url, this.editedItem)
                if(res.data && res.status == 200){
                    this.dossier.exercices.push(res.data)
                    
                }
                this.editedItem = Object.assign({}, this.defultItem)
                this.resetForm()
                // this.dialog = false;

            }
        },
        close() {
            this.dialog = false;
        },
        validateForm() {
            return this.$refs.exerciceForm.validate()
        },
        resetForm() {
            this.$refs.exerciceForm.resetValidation()
        },
        actionHandle(item) {
            console.log('item', item)
            this.$router.push('/comptabilitee/' + item.id)

        },

    }
}
</script>