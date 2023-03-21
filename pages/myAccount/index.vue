<template>
    <v-app>
        <v-container>
            <v-card>
                <div class="d-flex" style="padding:1rem">
                    <v-btn class="" color="primary" link @click="$router.push({ path: '/' })">
                        <i class="fal fa-arrow-left mr-3"></i>Retour
                    </v-btn>
                </div>
                <v-card-title>Mon compte</v-card-title>
                <v-card-text>
                    <v-avatar size="150">
                        <img :src="tempImg" alt="User Image" />
                    </v-avatar>
                    <v-form ref="form">
                        <v-text-field v-model="editedItem.username" :rules="obligationRule" label="Username"></v-text-field>
                        <v-text-field v-model="editedItem.email" :rules="obligationRule" label="Email" type="email"></v-text-field>
                        <v-text-field v-model="editedItem.password" :rules="obligationRule" label="Password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" @click="saveChanges">Modifier</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-app>
</template>
  
<script>
export default {
    middleware: ["auth"],
    data: () => ({
        obligationRule: [(v) => !!v || "Ce champ est obligatoire"],
        tempImg: "https://picsum.photos/200",
        editedItem:{
            username: "",
            email: "",
            password: "",
        }
    }),
    async created(){
        this.editedItem = JSON.parse(JSON.stringify(this.$auth.user))

    },
    methods: {
        async saveChanges() {
            if (this.$refs.form.validate()) {
                let url = process.env.Name_api + "/profile";
                const res = await this.$myService.put(url, this.editedItem);
                this.$auth.strategy.token.set(res.data.token);
                this.$auth.setUser(res.data.user);
            }
        },
    },
};
</script>