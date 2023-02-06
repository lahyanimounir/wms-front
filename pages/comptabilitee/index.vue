<template>


    <v-container>
        <v-card>
            <div class="d-flex" style="padding:1rem">
                <v-btn class="" 
                color="primary"
                link @click="$router.push({ path: '/' })"
                >
                    <i class="fal fa-arrow-left mr-3"></i>Retour
            </v-btn>
            </div>
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

                            <v-snackbar v-model="snackbar" :timeout="timeout">
                                {{ text }}
                            
                                <template v-slot:action="{ attrs }">
                                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                    </v-btn>
                                </template>
                                </v-snackbar>


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
                                        
                                        <v-card-title class="px-0 pb-2 pt-3"> Choix des Exercices</v-card-title>
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
                                        <v-card-title class="px-0 py-1"> Ajouter Exercice</v-card-title>


                                        <v-row class="py-5 mt-2 mb-0" style="border: 1px solid #ddd;">



                                            <v-col cols="6" class="py-0">
                                                <label for="">Du *</label>
                                                <div>
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :rules="obligationRule" v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" outlined dense
                                                                prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="date" no-title @input="handleDateDu" :min="minDateDu"></v-date-picker>
                                                    </v-menu>

                                                </div>
                                            </v-col>
                                            <v-col cols="6" class="py-0">
                                                <label for="">Au *</label>
                                                <div>
                                                    <!-- <v-menu ref="menu" v-model="menu2" :close-on-content-click="false"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :rules="obligationRule" v-model="editedItem.au" outlined dense
                                                                prepend-icon="mdi-calendar" v-bind="attrs"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker @input="menu2 = false" v-model="editedItem.au" :min="du"></v-date-picker>
                                                    </v-menu> -->
                                                    <v-menu ref="menu" v-model="menu2" :close-on-content-click="false"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field :rules="obligationRule" v-model="dateFormattedAu" label="Date" hint="MM/DD/YYYY format" outlined dense
                                                                prepend-icon="mdi-calendar" v-bind="attrs" @blur="dateAu = parseDate(dateFormattedAu)"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="dateAu" no-title @input="handleDateAu" :min="minDateAu"></v-date-picker>
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
                                    </v-container>
                                </v-card-text>


                            </v-card>
                        </v-form>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">

                    <v-btn text color="primary" @click="startExercice(item)">
                        Ouvrir
                    </v-btn>

                </template>
            </v-data-table>
        </v-card>
    </v-container>

</template>
<script>
export default {
    data: (vm) => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        // dateAu: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateAu: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000 + 31536000000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        // dateFormattedAu: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        dateFormattedAu: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000 + 31536000000)).toISOString().substr(0, 10)),
        snackbar: false,
        timeout: 3000,
        text: '',
        lastExercice: {},
        minDateDu:null,
        minDateAu:null,
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
            { text: 'Regime Tva', value: 'regime_tva' },
            { text: 'Tva', value: 'tva' },
            { text: 'Droit Timbre', value: 'droit_timbre' },
            { text: 'Action', value: 'action' },

        ],
        obligationRule: [
            v => !!v || 'Champ obligatoire',
        ],
    }),
    watch: {
      date (val) {
        if(val !== null && /^\d{4}-\d{2}-\d{2}$/.test(val)){

            let d = new Date(val)
            if(!isNaN(d.getTime())){
                if(this.lastExercice !== null && this.lastExercice !== undefined && this.lastExercice !== ''){
                    let lastExerciceDate = new Date(this.lastExercice.au)
                    if(d.getTime() < lastExerciceDate.getTime()){
                        this.showToast('La date du debut de l\'exercice doit être supérieur à la date de fin de l\'exercice précédent')
                        this.date = new Date(lastExerciceDate.getTime() + 86400000).toISOString().substr(0, 10)
                        this.dateAu = new Date(lastExerciceDate.getTime() + 31536000000).toISOString().substr(0, 10)
                        this.dateFormatted = this.formatDate(this.date)
                        this.dateFormattedAu = this.formatDate(this.dateAu)
                        this.minDateAu = this.date
                        return
                    }
                }
                this.dateFormatted = this.formatDate(val)
                this.dateAu = new Date(val)
                this.dateAu.setDate(this.dateAu.getDate() + 365)
                this.dateAu = this.dateAu.toISOString().substr(0, 10)
                this.minDateAu = val
            }
            else{
                this.showToast('Date invalide (aaaa/mm/jj)')
            }
           
        }
      },
      dateAu (val) {
        if(/^\d{4}-\d{2}-\d{2}$/.test(val)){
            let d = new Date(val)
            if(!isNaN(d.getTime())){
                if(this.date !== null && this.date !== undefined && this.date !== ''){
                    let dateDu = new Date(this.date)
                    if(d.getTime() < dateDu.getTime()){
                        this.showToast('La date du fin de l\'exercice ne peut pas être inférieur à la date de début.')
                        this.dateAu = new Date(dateDu.getTime() + 31536000000).toISOString().substr(0, 10)
                        this.dateFormattedAu = this.formatDate(this.dateAu)
                        this.minDateAu = this.date
                        return
                    }
                }
                this.dateFormattedAu = this.formatDate(val)
            }
            else{
                this.showToast('Date invalide (aaaa/mm/jj)')
            }
            
        }
    },
      dossier(val){
        if(val.exercices.length > 0){
            this.lastExercice = val.exercices.reduce((prev, current) => (prev.id > current.id) ? prev : current)
            
            // Adding 1 day from lastExercice date
            this.date = new Date(this.lastExercice.au)
            this.date.setDate(this.date.getDate() + 1)
            this.date = this.date.toISOString().substr(0, 10)
            this.minDateDu = this.date

            // Adding 1 year from start date
            this.dateAu = new Date(this.date)
            this.dateAu.setDate(this.dateAu.getDate() + 365)
            this.dateAu = this.dateAu.toISOString().substr(0, 10)

            // Setting the minimum date to start date + 1
            this.minDateAu = new Date(this.date)
            this.minDateAu.setDate(this.minDateAu.getDate() + 1)
            this.minDateAu = this.minDateAu.toISOString().substr(0, 10)
        }
        else{
            this.lastExercice = {}
            this.minDateDu = null
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
      }
    },
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
                this.editedItem.du = this.date
                this.editedItem.au = this.dateAu
                const res = await this.$myService.post(url, this.editedItem)
                if(res.data && res.status == 200){
                    this.dossier.exercices.push(res.data)
                    this.lastExercice = res.data
                    this.minDateAu = this.date
                    let newDate = new Date(res.data.au)
                    this.date = new Date(newDate.getTime() + 86400000).toISOString().substr(0,10)
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
            // console.log('item', item)
            this.$router.push('/comptabilitee/' + item.id)

        },
        updateDate(value) {
            this.defultItem.du = value;
        },
        formatDate (date) {
        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return null
        }
        

        const [year, month, day] = date.split('-')
        return `${year}/${month}/${day}`
        },
        parseDate (date) {
        if(!(/^\d{4}\/\d{2}\/\d{2}$/.test(date)) && date !== null){
            this.showToast('Invalide date (aaaa/mm/jj)')
            return null
        }
        if(!date) return null
        const [month, day, year] = date.split('/')
        return `${month.padStart(2, '0')}-${day.padStart(2, '0')}-${year}`
        },
        handleDateDu() {
            this.menu = false
        },
        handleDateAu(){
            this.menu2= false
        },
        showToast(message){
            this.text = message
            this.snackbar = true
            
        },

    }
}
</script>