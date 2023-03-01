<template>
       <div style="position: relative;">
            <div class="container">
                <v-row>
                    <v-col xl="7" lg="10" sm="12" xs="12" class="offset-xl-3 offset-lg-1 px-0 ">
                        <v-card>
                            <v-card-text>

                                <v-row style="margin-top:-16px;margin-bottom: -16px;margin-right: -16px;">
                                    <v-col cols="12" md="7" class="pt-7 px-10 pb-15" style="font-family: 'Quicksand', sans-serif;">
                                        <v-row>
                                            <v-col>
                                                <h3 style="font-family: 'Quicksand', sans-serif;color: #000;font-size: 1.2rem;">Se connecter avec
                                                    votre adresse mail :</h3>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="">
                                                <v-form lazy-validation ref="form" method="post"
                                                    @submit.prevent="login">
                                                    <v-text-field  outlined require="" :rules="obligationRules" label="Username"
                                                        type="username" name="username" v-model="username"></v-text-field>
                                                    <v-text-field elevation="0" outlined id="password" require="" :rules="obligationRules"
                                                        label="Mot de passe" type="password" name="password"
                                                        v-model="password"></v-text-field>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="secondary" dark type="submit">Connexion</v-btn>
                                                    </v-card-actions>
                                                </v-form>
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                    <v-col cols="12" md="5" class="px-8 pt-8"
                                        style="background-color: #000;color: #fff;height: auto;">
                                        <v-row>
                                            <v-col>
                                                <h2 style="font-family: 'Quicksand', sans-serif;">Mon espace Candidat
                                                    :</h2>
                                            </v-col>
                                        </v-row>

                                        <div class="mt-10 d-flex">
                                            <p style="font-size: 1rem;line-height: 30px;font-family: 'Poppins', sans-serif;">Connectez-vous à votre espace personnel pour pouvoir postuler au offres.Si vous n'êtes pas encore membre, veuillez vous inscrire !</p>
                                        </div>

                                    
                                    </v-col>

                                </v-row>
                            </v-card-text>
                        </v-card>

                    </v-col>
                </v-row>
            </div>
        </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    data() {
        return {
            username: '',
            password: '',
            error: null,
            obligationRules: [
                v => !!v || "Le champ est obligatoire"
            ],
        }
    },

    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            username: this.username,
                            password: this.password
                        }
                    })

                    this.$router.push('/')
                } catch (e) {

                    // console.log(e)
                    if (e.response.data.error == "user") {
                        this.error = "Le compte est inexistant."
                    }
                    else if (e.response.data.error == "password") {
                        this.error = "Mot de passe est incorrect"
                    } else {
                        this.error = e.response.data.message
                    }

                }
            }
        }
    }
}


</script>