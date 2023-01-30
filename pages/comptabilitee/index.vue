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
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Exercices
                                </v-btn>
                            </template>

                            <v-form lazy-validation ref="form" method="post" @submit.prevent="login">


                                <v-toolbar dark color="primary">
                                    <v-btn icon dark @click="close()">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Exercice</v-toolbar-title>

                                </v-toolbar>
                                <v-card>


                                    <v-card-text>
                                        <v-container>
                                            <v-row class="mb-15">


                                                <v-col cols="6" class="py-0">
                                                    <label for="">Du *</label>
                                                    <div>
                                                        <v-menu ref="menu" v-model="menu"
                                                            :close-on-content-click="false"
                                                            transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="du" outlined dense
                                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                    v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="du"
                                                            :max="au"
                                                              ></v-date-picker>
                                                        </v-menu>

                                                    </div>
                                                </v-col>
                                                <v-col cols="6" class="py-0">
                                                    <label for="">Au *</label>
                                                    <div>
                                                        <v-menu ref="menu" v-model="menu2"
                                                            :close-on-content-click="false"
                                                            transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="au" outlined dense
                                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                    v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="au" :min="du"
                                                              ></v-date-picker>
                                                        </v-menu>

                                                    </div>
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
                                            Démarrer
                                        </v-btn>
                                    </v-card-actions>
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
        menu:false,
        menu2:false,
        search: '',
        du: null,
        au: null,
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
            this.$router.push('/comptabilitee/' + item.id)
        },
        save() {
            
            this.dossier = item
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        }

    }
}
</script>