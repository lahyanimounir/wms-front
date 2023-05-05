<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <v-card>
                            <div class="d-flex" style="padding:1rem">
                                <v-btn class="" color="primary" link @click="$router.push({ path: '/' })">
                                    <i class="fal fa-arrow-left mr-3"></i>Retour
                                </v-btn>
                            </div>
                            <v-card-title>
                                <h3>Gestion des utilisateurs</h3>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table :headers="headers" :items="users" class="elevation-1">
                                    <template v-slot:top>
                                        <v-toolbar flat color="white">
                                            <v-spacer></v-spacer>
                                            <v-dialog v-model="dialog" max-width="900px">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="primary" dark class="mb-2" @click="addItem()">Nouveau</v-btn>
                                                </template>
                                                <v-card>
                                                    <v-form ref="userForm">
                                                        <v-card-title>
                                                            <span class="headline">{{ formTitle }}</span>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-container>
                                                                <h3 class="my-3">Informations personelles</h3>
                                                                <v-row>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.username"
                                                                            label="Username"
                                                                            :rules="obligationRules"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.email"
                                                                            label="Email"
                                                                            :rules="obligationRules"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-text-field v-model="editedItem.telephone"
                                                                            label="Telephone"
                                                                            :rules="obligationRules"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="5">
                                                                        <v-text-field type="password"
                                                                            :filled="isPasswordDisabled"
                                                                            :disabled="isPasswordDisabled"
                                                                            v-model="editedItem.password"
                                                                            label="Mot de passe" :rules="passwordRules"
                                                                            required></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="5">
                                                                        <v-text-field type="password"
                                                                            :filled="isPasswordDisabled"
                                                                            :disabled="isPasswordDisabled"
                                                                            v-model="editedItem.passwordConfirmation"
                                                                            label="Confirmer le mot de pass"
                                                                            :rules="confirmPasswordRules.concat(passwordConfirmationRule)"></v-text-field>
                                                                    </v-col>
                                                                    <v-col v-if="!addClicked" class="mt-3" cols="2" >
                                                                        <v-btn color="primary" @click="editPassword()">
                                                                            <v-icon>{{ isPasswordDisabled ? 'mdi-pencil':'mdi-close' }}</v-icon>
                                                                        </v-btn>
                                                                    </v-col>
                                                                </v-row>
                                                                <h3 class="my-3">Informations de l'entreprise</h3>
                                                                <v-row>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.denomination"
                                                                            label="Denomination"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItem.identifiant_fiscale"
                                                                            label="Identifiant Fiscale"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.ice"
                                                                            label="ICE"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItem.taxe_professionnel"
                                                                            label="Taxe Professionnelle"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.adresse"
                                                                            label="Adresse"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.activitee"
                                                                            label="Activitee"></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <h3 class="my-3">Accès au modules</h3>
                                                                <v-row>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox
                                                                            v-model="editedItem.access.parametrage"
                                                                            label="Paramétrage"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox
                                                                            v-model="editedItem.access.comptabilitee"
                                                                            label="Comptabilité"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox v-model="editedItem.access.p_r_h"
                                                                            label="Paie et RH"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox v-model="editedItem.access.secretaire_juridique"
                                                                            label="Secrétaire juridique"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox
                                                                            v-model="editedItem.access.facturation"
                                                                            label="Facturation"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox
                                                                            v-model="editedItem.access.documentation"
                                                                            label="Documentation"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-checkbox v-model="editedItem.access.agenda"
                                                                            label="Agenda et suivi des travaux"></v-checkbox>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
                                                            <v-btn color="blue darken-1" text @click="save">Sauvegarder</v-btn>
                                                        </v-card-actions>
                                                    </v-form>
                                                </v-card>
                                            </v-dialog>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            passwordRules: [v => !!v || this.isPasswordDisabled || "Le mote de passe est obligatoire"],
            confirmPasswordRules: [v => !!v || this.isPasswordDisabled || "Confirmer le mot de passe est obligatoire"],
            obligationRules: [v => !!v || "Ce champ est obligatoire"],
            isPasswordDisabled: true,
            dialog: false,
            addClicked: false,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Nom d\'utilisateur', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Telephone', value: 'telephone' },
                { text: 'Denomination', value: 'denomination' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            users: [],
            editedIndex: -1,
            editedItem: {
                username: '',
                email: '',
                telephone: '',
                denomination: '',
                identifiant_fiscale: '',
                ice: '',
                taxe_professionnel: '',
                adresse: '',
                activitee: '',
                passwordConfirmation: '',
                password: '',
                access: {
                    parametrage: false,
                    comptabilitee: false,
                    p_r_h: false,
                    secretaire_juridique: false,
                    facturation: false,
                    documentation: false,
                    agenda: false,
                }
            },
            defaultItem: {
                username: '',
                email: '',
                telephone: '',
                denomination: '',
                identifiant_fiscale: '',
                ice: '',
                taxe_professionnel: '',
                adresse: '',
                activitee: '',
                passwordConfirmation: '',
                password: '',
                access: {
                    parametrage: false,
                    comptabilitee: false,
                    p_r_h: false,
                    secretaire_juridique: false,
                    facturation: false,
                    documentation: false,
                    agenda: false,
                }
            },
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nouvel utilisateur' : 'Modifier utilisateur'
        },
        passwordConfirmationRule() {
            return () => (this.editedItem.password === this.editedItem.passwordConfirmation) || 'Les mots de passe ne correspondent pas'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            let url = process.env.Name_api + '/users'
            const res = await this.$axios.get(url)
            this.users = res.data
        },
        addItem(){
            this.dialog = true
            this.addClicked = true
            this.isPasswordDisabled = false
        },
        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(this.editedItem)
            this.dialog = true
            this.addClicked = false
            this.isPasswordDisabled = true
        },

        async deleteItem(item) {
            let url = process.env.Name_api + "/users/" + item.id
            const res = await this.$myService.delete(url)
            if (res.status == 200) {
                const index = this.users.indexOf(item)
                this.users.splice(index, 1)
            }
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        async save() {
            if (!this.$refs.userForm.validate()) return;
            let url;
            if (this.editedIndex > -1) {
                url = process.env.Name_api + "/users/" + this.editedItem.id
                const res = await this.$axios.put(url, this.editedItem)
                if (res.status == 200) {
                    Object.assign(this.users[this.editedIndex], res.data)
                    this.close()
                }
            } else {
                url = process.env.Name_api + "/users"
                const res = await this.$axios.post(url, this.editedItem)
                if (res.status == 201) {
                    this.users.push(res.data)
                    this.close()
                }
            }
        },
        editPassword() {
            this.isPasswordDisabled = !this.isPasswordDisabled
        },

    },
}
</script>