<template>
    <v-container>
        <v-card>
            <div class="d-flex" style="padding:1rem">
                <v-btn class="" color="primary" link @click="$router.push({ path: '/' })">
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
                                                        <!-- format du and au columns from yyyy-mm-dd to dd/mm/yyyy -->
                                                        <template v-slot:item.du="{ item }">
                                                            {{ item.du.split('-').reverse().join('/') }}
                                                        </template>
                                                        <template v-slot:item.au="{ item }">
                                                            {{ item.au.split('-').reverse().join('/') }}
                                                        </template>
                                                    </v-data-table>
                                                </v-col>


                                            </v-row>
                                            <v-card-title class="px-0 py-1"> Ajouter Exercice</v-card-title>


                                            <v-row class="py-5 mt-2 mb-0" style="border: 1px solid #ddd;">



                                                <v-col cols="6" class="py-0">
                                                    <v-col cols="12" lg="12">
                                                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                                                            transition="scale-transition" offset-y max-width="290px"
                                                            min-width="290px">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="dateFormatted" label="Du"
                                                                    hint="JJ/MM/YYYY format" persistent-hint v-bind="attrs"
                                                                    :format="'DD/MM/AAAA'" :rules="obligationRule"
                                                                    @blur="date = parseDate(dateFormatted)"
                                                                    v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="date" no-title :min="minDateDu"
                                                                @input="menu1 = false"></v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-col>
                                                <v-col cols="6" class="py-0">
                                                    <v-col cols="12" lg="12">
                                                        <v-menu ref="menu1" v-model="menu2" :close-on-content-click="false"
                                                            transition="scale-transition" offset-y max-width="290px"
                                                            min-width="290px">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="dateFormattedAu" label="Au"
                                                                    hint="JJ/MM/AAAA format" persistent-hint v-bind="attrs"
                                                                    :format="'DD/MM/YYYY'" :rules="obligationRule"
                                                                    @blur="dateAu = parseDateAu(dateFormattedAu)"
                                                                    v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="dateAu" no-title :min="minDateAu"
                                                                @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-col>

                                                <v-col lg="6" cols="12" class="py-0">
                                                    <label for="">Régime TVA *</label>
                                                    <v-autocomplete :items="regimes" :rules="obligationRule" outlined dense
                                                        placeholder="Régime TVA" item-text="valeur"
                                                        v-model="editedItem.regimeTva" item-value="id"></v-autocomplete>
                                                </v-col>

                                                <v-col lg="6" cols="12" class="py-0">
                                                    <label for="">TVA *</label>
                                                    <v-autocomplete :items="tva" :rules="obligationRule" outlined dense
                                                        placeholder="TVA" item-text="valeur" v-model="editedItem.tva"
                                                        item-value="id"></v-autocomplete>
                                                </v-col>

                                                <v-col lg="12" cols="12" class="py-0">
                                                    <label for="">Droit de timbre *</label>
                                                    <v-autocomplete v-model="editedItem.droit_timbre"
                                                        :rules="obligationRule" :items="timbre" outlined dense
                                                        placeholder="Timbre" item-text="valeur"
                                                        item-value="id"></v-autocomplete>
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
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        dateAu: new Date().toISOString().substr(0, 10),
        dateFormattedAu: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        snackbar: false,
        timeout: 3000,
        text: '',
        lastExercice: {},
        minDateDu: null,
        minDateAu: null,
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
    watch: {
        dossier(val) {
            if (val.exercices.length > 0) {
                this.lastExercice = val.exercices.reduce((prev, current) => (prev.id > current.id) ? prev : current)

                this.handleDate()

            }
        },
        lastExercice(val){
            this.handleDate()
        },
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
            if (this.date != null) {
                this.dateAu = new Date(this.date)
                this.dateAu.setDate(this.dateAu.getDate() + 365)
                this.dateAu = this.dateAu.toISOString().substr(0, 10)
            }

        },
        dateAu(val) {
            this.dateFormattedAu = this.formatDate(this.dateAu)
        },
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
        computedDateFormattedAu() {
            return this.formatDate(this.dateAu)
        },
    },
    created() {
        this.initialize()
    },
    methods: {
        async initialize() {
            let url = process.env.Name_api + "/dossiers";
            this.rows = await this.$myService.get(url)
        },
        async startExercice(item) {
            const url = process.env.Name_api + `/getExercicesByDossier/${item.id}`
            const res = await this.$myService.get(url)
            console.log('res', res)
            this.dossier = res
            this.dialog = true;

        },
        save() {

            this.dossier = item
            this.dialog = true;
        },
        async addExercice() {
            let url = process.env.Name_api + `/${this.dossier.id}/exercice/new`;
            // this.rows = await this.$myService.post(url)
            if (this.validateForm()) {

                this.editedItem.du = this.date
                this.editedItem.au = this.dateAu
                const res = await this.$myService.post(url, this.editedItem)
                if (res.data && res.status == 200) {
                    this.dossier.exercices.push(res.data)
                    this.lastExercice = res.data

                }
                this.editedItem = Object.assign({}, this.defultItem)
                this.resetForm()

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
            this.$router.push('/comptabilitee/' + item.id)

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
            if (this.minDateDu && this.minDateDu > this.parseDateToISO(date)) {
                this.showToast('La date doit être supérieur à la date de fin de l\'exercice précédent')
                console.log('this min date :', this.minDateDu)
                this.dateFormatted = this.formatDate(this.minDateDu)
                return this.minDateDu


            }
            let d = new Date(this.parseDateToISO(date))
            d.setDate(d.getDate() + 365)
            let iso = d.toISOString().substr(0, 10)
            this.dateAu = iso
            this.dateFormattedAu = this.formatDate(iso)
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        parseDateToISO(date) {
            if (!date) return null
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        parseDateAu(date) {
            if (!date) return null
            if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(date)) && date !== null) {
                this.showToast('Invalide date (jj/mm/aaaa)')
                return null
            }
            if (!(/(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/.test(date))) {
                this.showToast('Invalide date')
                return null
            }
            console.log('date :', this.date)
            if (this.date && this.date > this.parseDateToISO(date)) {
                this.showToast('La date doit être supérieur à la date de début de l\'exercice')
                return null
            }
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        handleDate() {
            let d = new Date(this.lastExercice.au)
            d.setDate(d.getDate() + 1)
            let iso = d.toISOString().substr(0, 10)
            this.date = iso
            this.minDateDu = iso

            let d2 = new Date(this.date)
            d2.setDate(d2.getDate() + 365)
            let iso2 = d2.toISOString().substr(0, 10)
            this.dateAu = iso2

            let iso3 = new Date(this.dateAu)
            iso3.setDate(iso3.getDate())
            iso3 = iso3.toISOString().substr(0, 10)
            this.minDateAu = iso3
        }
    },


}
</script>