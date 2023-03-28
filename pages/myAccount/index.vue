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
                    <div>
                        <v-avatar size="150" outlined>
                            <img :src="preview" alt="User Image" class="image"/>
                            <div class="overlay" @click="openFileInput">
                                <v-icon size="38px" class="text">mdi-camera</v-icon>
                            </div>
                        </v-avatar>
                        <v-file-input style="display:none" ref="fileInput" dense outlined
                      label="Logo " @change="changeImage" hidden></v-file-input>
                    </div>
                    <v-form ref="form">
                        <v-row class="my-0">
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.username" :rules="obligationRule" label="Username"></v-text-field>
                            </v-col >
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.email" :rules="obligationRule" label="Email" type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.denomination" :rules="obligationRule" label="Denomination" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.identifiant_fiscale" :rules="obligationRule" label="IF" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.ice" :rules="obligationRule" label="ICE" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.taxe_professionnel" :rules="obligationRule" label="TAXE PROFESSIONNELLE" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.adresse" :rules="obligationRule" label="ADRESSE" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.activitee" :rules="obligationRule" label="ACTIVITEE" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.telephone" :rules="obligationRule" label="TELEPHONE" type="text"></v-text-field>
                            </v-col>
                            
                            <!-- <v-col cols="12" lg="6">
                                <v-text-field v-model="editedItem.password" :rules="obligationRule" label="Password" type="password"></v-text-field>
                            </v-col> -->
                        </v-row>
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
<style>
.v-avatar img {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
    cursor: pointer;
}

.v-avatar .overlay {
    cursor: pointer;
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.v-avatar:hover .overlay {
    opacity: 1;
}

.v-avatar:hover img {
    opacity: 0.5;
}

.v-avatar .text {
    color: rgb(0, 0, 0);
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}


</style>
<script>
export default {
    middleware: ["auth"],
    data: () => ({
        obligationRule: [(v) => !!v || "Ce champ est obligatoire"],
        preview: "https://pic.onlinewebfonts.com/svg/img_264157.png",
        editedItem:{
            username: "",
            email: "",
            password: "",
            denomination: "",
            identifiant_fiscale: "",
            ice: "",
            taxe_professionnel: "",
            adresse: "",
            activitee: "",
            telephone: "",
            logo: "",
        }
    }),
    async created(){
        this.editedItem = JSON.parse(JSON.stringify(this.$auth.user))
        if (this.editedItem.logo) this.preview = this.editedItem.logo   

    },
    methods: {
        async saveChanges() {
            if (this.$refs.form.validate()) {
                var formData = new FormData();
                Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));
                this.editedItem.logo = this.preview
                let url = process.env.Name_api + "/profile";
                const res = await this.$myService.put(url, this.editedItem,true);
                console.log(res)

                // this.$auth.strategy.token.set(res.data.token);
                // this.$auth.setUser(res.data.user);
            }
        },
        async changeImage($event) {
            const file = $event
            if (!file) return;
            console.log('file', file)
            const reader = new FileReader();
            reader.onload = (e) => {
                this.preview = e.target.result;
            };
            reader.readAsDataURL(file);
            // store image file to send to server
            this.editedItem.logo = file;



        },
        openFileInput() {
            this.$nextTick(() => {
                try {
                console.log('Trying to trigger file input...');
                this.$refs.fileInput.$refs.input.click();
                } catch (error) {
                console.error('Error triggering file input:', error);
                }
            });
            },
    },
};
</script>