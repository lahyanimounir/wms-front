<template>
    <div>
    <v-data-table :headers="headers" :items="rows" sort-by="calories" class="elevation-1 px-5"
    :page="offset"
    :items-per-page="limit"
    @update:page="pageUpdateFunction"
    @update:items-per-page="offsetWatch"
    :server-items-length="totalItems"
    >
        <template v-slot:top>
            <v-toolbar flat>


                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" outlined dark v-bind="attrs" v-on="on">
                            Générer vos données
                        </v-btn>
                    </template>
                    <v-list link>

                        <v-list-item link>
                            <v-list-item-title>
                                <a style="text-decoration: none;color: inherit;"
                                    :href="Name_api + '/dossiers/export-pdf'">imprimer dossiers pdf</a>

                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-title>
                                <a style="color: inherit;text-decoration: none;"
                                    :href="Name_api + '/dossiers/exportData'">imprimer dossiers excel</a>

                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            Ajouter dossier
                        </v-btn>
                    </template>
                    <v-card>





                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Ajouter dossier</v-toolbar-title>

                        </v-toolbar>
                        <v-card-text>




                            <v-stepper v-model="e1" class="mt-6" elevation="0" style="border: 1px solid #ddd;">
                                <v-stepper-header style="box-shadow: none;border-bottom: 1px solid #ddd">
                                    <v-stepper-step :complete="e1 > 1" step="1">
                                        Etape 1
                                    </v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :complete="e1 > 2" step="2">
                                        Etape 2
                                    </v-stepper-step>

                                    <!-- <v-divider></v-divider>

                                    <v-stepper-step :complete="e1 > 3" step="3">
                                        Etape 3
                                    </v-stepper-step> -->


                                </v-stepper-header>

                                <v-stepper-items>
                                    <v-stepper-content step="1">
                                        <v-snackbar v-model="snackbar" :timeout="timeout">
                                            {{ text }}
                                        
                                            <template v-slot:action="{ attrs }">
                                                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                                                    Close
                                                </v-btn>
                                            </template>
                                        </v-snackbar>
                                        <v-form lazy-validation ref="formSteep1" method="post">
                                            <v-card elevation="0">
                                                <v-row class="my-0">
                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Dénomination *</label>
                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter maxlength="60" :rules="obligationRule"
                                                            v-model="editedItem.denomination" outlined dense
                                                            placeholder="Dénomination"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">identifiant fiscal *</label>
                                                        <div class="d-flex">

                                                            <v-text-field :disabled="addClicked" :filled="addClicked"
                                                                counter data-maxlength="10" class="mr-2" type="number"
                                                                :rules="obligationRule" v-model="editedItem.immf"
                                                                outlined dense
                                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                                placeholder="identifiant fiscal"></v-text-field>
                                                            <v-btn :disabled="addClicked" color="primary"
                                                                @click="serachByIf()">
                                                                <i class="far fa-search"></i>
                                                            </v-btn>
                                                        </div>
                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">

                                                        <label for="">Activité</label>
                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter maxlength="100" class="mr-2" type="text"
                                                            v-model="editedItem.activitee" outlined dense
                                                            placeholder="Activité"></v-text-field>

                                                    </v-col>



                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Adresse</label>
                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter maxlength="60" v-model="editedItem.adresse" outlined
                                                            dense placeholder="Adresse"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">REGISTRE DE COMMERCE</label>

                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter data-maxlength="8"
                                                            oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                            class="mr-2" type="number" v-model="editedItem.rc" outlined
                                                            dense placeholder="register de commerce"></v-text-field>


                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Identifiant Commun de l'Entreprise - ICE</label>

                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter data-maxlength="15"
                                                            oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                            class="mr-2" type="number" :rules="iceRule"
                                                            v-model="editedItem.ice" outlined dense
                                                            placeholder="Identifiant Commun de l'Entreprise - ICE"></v-text-field>


                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">{{ villeInput ? "Ajouter une ville" : "Ville" }}</label>
                                                        <div v-if="!addClicked && !villeInput" class="d-flex">
                                                            <v-autocomplete v-model="editedItem.ville" :items="villes"
                                                                outlined dense placeholder="Ville" item-text="intitulee"
                                                                item-value="id" class="mr-2"></v-autocomplete>
                                                            <v-btn :disabled="addClicked" color="primary"
                                                                @click="addVilleBtn()">
                                                                <i class="fas fa-plus"></i>
                                                            </v-btn>

                                                        </div>
                                                        <div v-if="addClicked && villeInput">
                                                            <v-form ref="addVilleForm" class="d-flex">
                                                                <v-text-field 
                                                                    outlined dense placeholder="Code *" item-text="intitulee"
                                                                    v-model="newVille.code" :rules="obligationRule"
                                                                    item-value="id" class="mr-2"></v-text-field>
                                                                <v-text-field 
                                                                    outlined dense placeholder="Intitulée *"
                                                                    v-model="newVille.intitulee" :rules="obligationRule"
                                                                    item-text="intitulee" item-value="id"
                                                                    class="mr-2"></v-text-field>
                                                                <v-text-field 
                                                                    outlined dense placeholder="Code postal *"
                                                                    v-model="newVille.code_postal" :rules="obligationRule"
                                                                    item-text="intitulee" item-value="id"
                                                                    class="mr-2"></v-text-field>
                                                                <v-btn color="teal lighten-4" class="mr-2" :loading="loading"  :disabled="loading" @click="handleAddVille()">
                                                                    <i class="fas fa-plus"></i>
                                                                </v-btn>

                                                                <v-btn color="red lighten-3"
                                                                    @click="closeAddVilleBtn()">
                                                                    <i class="fas fa-times"></i>
                                                                </v-btn>
                                                            </v-form>
                                                        </div>
                                                    </v-col>


                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Type de Comptabilité</label>
                                                        <v-autocomplete :disabled="addClicked" :filled="addClicked"
                                                            v-model="editedItem.typeComptabilitee.id"
                                                            :items="typeComptabilitees" outlined dense
                                                            placeholder="type de Comptabilité" item-text="intitulee"
                                                            item-value="id"></v-autocomplete>

                                                    </v-col>
                                                    <v-col lg="6" cols=12 class="py-0">
                                                        <div class="d-flex" style="justify-content: space-between;align-items: center;">
                                                            <label for="">Banque</label>
                                                            <!-- <v-btn :disabled="addClicked" color="primary" @click="addNewBanque()">
                                                                <i class="fal fa-plus"></i>
                                                            </v-btn> -->
                                                           
                                                            <div style="color: #5092f3;cursor: pointer;" @click="ajoutBanque()" class="py-2 d-inline-block"> 
                                                                <div class="d-inline-block px-2"  style="border: 2px dotted #5092f3;border-radius: 5px;cursor: pointer;">
                                                                <i class="fal fa-plus"></i>
                                                              
                                                               </div>
                                                                Ajouter nouvelle banque
                                                            </div>

                                                        </div>
                                                       
                                                        <div class="d-flex" v-for="(value, index) in editedItem.dossier_banques " :key="index">
                                                            <v-autocomplete :disabled="addClicked" :filled="addClicked"
                                                                v-model="value.banque" :items="banques" outlined
                                                                dense placeholder="Banques" item-text="nom"
                                                                item-value="id" class="mr-2"></v-autocomplete>

                                                            <v-text-field :disabled="addClicked" :filled="addClicked"
                                                                counter data-maxlength="24"
                                                                oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                                class="mr-2" type="number" :rules="ribRules"
                                                                v-model="value.rib" outlined dense
                                                                placeholder="RIB"></v-text-field>

                                                            <v-btn v-if=" index != 0" outlined :disabled="addClicked" class="mr-2" color="primary" @click="deleteItemBanque(value)">
                                                                <i class="fal fa-times"></i>
                                                            </v-btn>

                                                  
                                                        </div>
                                                    </v-col>
                                               

                                                  
                                                    
                                                   
                                                  
                                                    
                                                </v-row>

                                            </v-card>
                                            <div style="text-align: right;">

                                                <v-btn :disabled="addClicked" color="primary" @click="next(2)">
                                                    Continue
                                                </v-btn>
                                            </div>
                                        </v-form>

                                    </v-stepper-content>

                                    <v-stepper-content step="2">
                                        <v-form lazy-validation ref="formSteep2" method="post">
                                            <v-card elevation="0">
                                                <v-row class="my-0">

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">TAXE PROFESSIONNEL</label>
                                                        <v-text-field counter data-maxlength="10"
                                                            oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                            class="mr-2" type="number"
                                                            v-model="editedItem.taxe_professionnel" outlined dense
                                                            placeholder="TAXE PROFESSIONNEL"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Email</label>
                                                        <v-text-field counter maxlength="18" class="mr-2" type="text"
                                                            v-model="editedItem.email" outlined dense
                                                            placeholder="email"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Téléphone fixe</label>
                                                        <v-text-field counter maxlength="18" class="mr-2" type="text"
                                                            v-model="editedItem.telephone_fixe" outlined dense
                                                            placeholder="Téléphone fixe"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Téléphone Mobile</label>
                                                        <v-text-field counter maxlength="18" class="mr-2" type="text"
                                                            v-model="editedItem.telephone_mobile" outlined dense
                                                            placeholder="Téléphone mobile"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Capital</label>
                                                        <v-text-field :disabled="addClicked" :filled="addClicked"
                                                            counter data-maxlength="18"
                                                            oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
                                                            class="mr-2" type="number" v-model="editedItem.capital"
                                                            outlined dense placeholder="Capital"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Code adhesion</label>
                                                        <v-text-field counter maxlength="15" class="mr-2" type="text"
                                                            v-model="editedItem.code_adhesion" outlined dense
                                                            placeholder="Code adhesion"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Login simpl</label>
                                                        <v-text-field counter maxlength="25" class="mr-2" type="text"
                                                            v-model="editedItem.login_simpl" outlined dense
                                                            placeholder="Login simpl"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Mot de passe simpl</label>
                                                        <v-text-field counter maxlength="26" class="mr-2" type="text"
                                                            v-model="editedItem.mot_passe_simpl" outlined dense
                                                            placeholder="Mot de passe simpl"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Régime TVA</label>
                                                        <v-autocomplete v-model="editedItem.regimes" :items="regimes"
                                                            outlined dense placeholder="Régime TVA" item-text="valeur"
                                                            item-value="id"></v-autocomplete>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">TVA</label>
                                                        <v-autocomplete v-model="editedItem.tva" :items="tva" outlined
                                                            dense placeholder="TVA" item-text="valeur"
                                                            item-value="id"></v-autocomplete>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Imposition</label>
                                                        <v-autocomplete v-model="editedItem.imposition"
                                                            :items="imposition" outlined dense placeholder="Imposition"
                                                            item-text="valeur" item-value="id"></v-autocomplete>
                                                    </v-col>

                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Droit de timbre</label>
                                                        <v-autocomplete v-model="editedItem.timbre" :items="timbre"
                                                            outlined dense placeholder="Timbre" item-text="valeur"
                                                            item-value="id"></v-autocomplete>
                                                    </v-col>

                                                    <v-col lg="2" cols="12" class="py-0">
                                                        <label for="">Numero affiliation cnss</label>
                                                        <v-text-field counter maxlength="15" class="mr-2" type="text"
                                                            v-model="editedItem.n_affiliation_cnss" outlined dense
                                                            placeholder="Numero affiliation cnss"></v-text-field>
                                                    </v-col>
                                                    <v-col lg="2" cols="12" class="py-0">
                                                        <label for="">code utilisateur cnss</label>
                                                        <v-text-field counter maxlength="18" class="mr-2" type="text"
                                                            v-model="editedItem.code_utilisateur_cnss" outlined dense
                                                            placeholder="Numero affiliation cnss"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="2" cols="12" class="py-0">
                                                        <label for="">Mot de passe cnss</label>
                                                        <v-text-field counter maxlength="18" class="mr-2" type="text"
                                                            v-model="editedItem.mot_passe_cnss" outlined dense
                                                            placeholder="Mot de passe cnss"></v-text-field>
                                                    </v-col>


                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Periodicite honoraire </label>
                                                        <v-autocomplete v-model="editedItem.periodicite_honoraire"
                                                            :items="periodicite_honoraire" outlined dense
                                                            placeholder="Periodicite honoraire" item-text="valeur"
                                                            item-value="id"></v-autocomplete>
                                                    </v-col>
                                                    
                                                    <v-col lg="3" cols="12" class="py-0">
                                                        <label for="">Honoraires</label>
                                                        <v-text-field counter maxlength="10" class="mr-2" type="text"
                                                        v-model="editedItem.honoraires" outlined dense
                                                        placeholder="Honoraires"></v-text-field>
                                                    </v-col>

                                                    <v-col lg="6" cols="12" class="py-0">
                                                        <label for="">Logo</label>

                                                        <template>
                                                            <v-file-input dense outlined label="Logo"
                                                                @change="getfile"></v-file-input>
                                                        </template>
                                                    </v-col>


                                                </v-row>
                                            </v-card>
                                            <div class="d-flex" style="justify-content: space-between;">
                                                <v-btn text @click="e1 = 1">
                                                    Precedent
                                                </v-btn>

                                                <v-btn color="primary" @click="save()">
                                                    Enregistrer
                                                </v-btn>
                                            </div>
                                        </v-form>

                                    </v-stepper-content>
<!-- 
                                    <v-stepper-content step="3">
                                        <v-form lazy-validation ref="formSteep3" method="post">
                                            <v-card elevation="0">

                                                <v-row class="my-0 pt-5">



                                                    



                                                </v-row>
                                            </v-card>
                                            <div class="d-flex" style="justify-content: space-between;">
                                                <v-btn text @click="e1 = 2">
                                                    Precedent
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                
                                            </div>
                                        </v-form>
                                    </v-stepper-content> -->
                                </v-stepper-items>
                            </v-stepper>








                        </v-card-text>

                    </v-card>
                </v-dialog>



                <v-dialog v-model="dialogGerant" max-width="800px">


                    <v-form lazy-validation ref="form" method="post" @submit.prevent="login">


                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="closeAssocie()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title> Ajouter Gerant / Associe</v-toolbar-title>

                        </v-toolbar>
                        <v-card>


                            <v-card-text>
                                <v-container>
                                    <v-row>


                                        <v-col cols="6" class="py-0">
                                            <label for="">Type *</label>
                                            <v-autocomplete v-model="associeItem.type" :rules="obligationRule"
                                                :items="items" outlined dense placeholder="Type " item-text="valeur"
                                                item-value="id"></v-autocomplete>
                                        </v-col>

                                        <v-col cols="6" class="py-0">
                                            <label for="">Nom prenom / designation *</label>
                                            <v-text-field counter maxlength="30" :rules="obligationRule"
                                                v-model="associeItem.nom_designation" outlined dense
                                                placeholder="Nom prenom / designation"></v-text-field>
                                        </v-col>

                                        <v-col cols="6" class="py-0">
                                            <label for="">Cne/ Passport / If *</label>
                                            <v-text-field counter maxlength="10" :rules="obligationRule"
                                                v-model="associeItem.cne_passport_if" outlined dense
                                                placeholder="Cne/ Passport / If"></v-text-field>
                                        </v-col>

                                        <v-col cols="6" class="py-0">
                                            <label for="">Adresse *</label>
                                            <v-text-field counter maxlength="80" :rules="obligationRule"
                                                v-model="associeItem.adresse" outlined dense
                                                placeholder="Adresse"></v-text-field>
                                        </v-col>

                                        <v-col cols="6" class="py-0">
                                            <label for="">Ville *</label>
                                            <v-autocomplete v-model="associeItem.id_ville" :rules="obligationRule"
                                                :items="villes" outlined dense placeholder="Ville "
                                                item-text="intitulee" item-value="id"></v-autocomplete>


                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <label for="">NOMBRE DE PARTS OU ACTIONS *</label>
                                            <v-text-field counter maxlength="6" :rules="obligationRule"
                                                v-model="associeItem.nombre_parts_action" outlined dense
                                                placeholder="NOMBRE DE PARTS OU ACTIONS"></v-text-field>

                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <label for="">Email *</label>

                                            <v-text-field counter maxlength="40" :rules="obligationRule"
                                                v-model="associeItem.email" outlined dense
                                                placeholder="Email"></v-text-field>

                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <label for="">Télephone *</label>

                                            <v-text-field counter maxlength="40" :rules="obligationRule"
                                                v-model="associeItem.phone" outlined dense
                                                placeholder="Télephone"></v-text-field>

                                        </v-col>
                                        <v-col cols="6" class="py-0">
                                            <label for="">Gerant *</label>
                                            <v-autocomplete v-model="associeItem.gerant" :rules="obligationRule"
                                                :items="gerants" outlined dense placeholder="Gerant " item-text="valeur"
                                                item-value="id"></v-autocomplete>
                                            <!-- 
                                        <v-text-field counter maxlength="40" :rules="obligationRule" v-model="associeItem.gerant" outlined dense
                                            placeholder="Gerant"></v-text-field> -->

                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="red darken-1" v-if="isUpdate" text @click="deleteAssocie">
                                    Supprimer
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeAssocie">
                                    Annuler
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="saveGerant">
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
        <template v-slot:item.gerant="{ item }">
            <div style="display: flex;justify-content: space-between;max-width: 240px;">


                <div style="align-self: center;">
                    <div v-if="item.id_associe.length">
                        <div v-for="associer in item.id_associe" :key="associer.id" class="my-2">

                            <div class="subtitle-2" @click="UpdateAssocie(associer)"
                                style="color:#2ca2fb;cursor: pointer;">
                                {{ associer.nom_designation }}
                            </div>
                            <div style="font-size: 0.8rem;">
                                <span v-if="associer.gerant == 'oui'">Gerant</span>
                                <span v-else>Associer</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="my-2 subtitle-2">
                        Ajouter Gerant / associe
                    </div>

                </div>
                <div class="py-2">
                    <v-btn fab small dark elevation="0" color="primary" @click="ajoutAssocie(item)">
                        <i class="fal fa-plus"></i>
                    </v-btn>

                </div>


            </div>
        </template>
        
    </v-data-table>
    <!-- <div class="d-flex">
        <v-pagination
            v-model="offset"
            :length="pageCount"
          ></v-pagination>
          <v-text-field
          aria-readonly="true"
            :value="limit"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            @input="limit = parseInt($event, 10)"
          ></v-text-field>
    </div> -->
    </div>
</template>


<script>
import axios from '~/plugins/axios'

export default {
    data: () => ({
        nombre:1,
        Name_api: process.env.Name_api,
        dialog: false,
        dialogDelete: false,
        dialogGerant: false,
        gerants: [{ id: 'oui', valeur: 'Oui' }, { id: 'non', valeur: 'Non' }],
        items: [{ id: 'pp', valeur: ' personne physique' }, { id: 'pm', valeur: 'personne morale' }],
        items2: [{ id: 'general', valeur: 'général' }, { id: 'collectif', valeur: 'Collectif' }],
        regimes: [{ id: 'EXONEREE', valeur: 'Exoneré' }, { id: 'MENSUELLE', valeur: 'Mensuel' }, { id: 'TRIMESTRIELLE', valeur: 'Trimestriel' }],
        tva: [{ id: 'DEBIT', valeur: 'Débit' }, { id: 'ENCAISSMENT', valeur: 'Encaissement' }],
        imposition: [{ id: 'IS', valeur: 'IMPOT SUR LES SOCIETES' }, { id: 'IR', valeur: 'IMPOTS SUR LES REVENUS' }],
        timbre: [{ id: 'ASSUJETI', valeur: 'Assujeti' }, { id: 'NON', valeur: 'NON ASSUJETTI' }],
        periodicite_honoraire: [{ id: 'ANNUELLE', valeur: 'Annuelle' }, { id: 'MENSUELLE', valeur: 'Mensuelle' }, { id: 'TRIMESTRE', valeur: 'Trimestrielle ' }, { id: 'SEMESTRELLE', valeur: 'Semestrelle' }],
        e1: 1,
        prevClicked: null,
        addClicked: false,
        villeInput:false,
        menu2: false,
        logo: '',
        obligationRule: [
            v => !!v || 'Ce champs est obligatoire.',
        ],
        numeroCompteRule: [
            v => !!v || 'Ce champs est obligatoire.',
            v => v.length == 8 || 'Le nombre de caractères doit être égal à 8.',
        ],
        iceRule: [
            v => !v || v.length === 15 || "L'ICE doit être égal à 15",
        ],
        ribRules: [
            v => !v || v.length == 24 || 'Le nombre de caractères doit être égal à 24.',
        ],
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
            { text: 'Gerant / associe', value: 'gerant' },
            { text: 'Telephone Mobile', value: 'telephone_mobile' },




            { text: 'Action', value: 'action' },

        ],
        rows: [],
        villes: [],
        banques: [],
        typeComptabilitees: [],
        editedIndex: -1,
        isUpdate: false,
        loader: null,
        loading: false,
        snackbar: false,
        text: 'La Ville a été bien ajoutée.',
        timeout: 3000,
        associeItem: {
            type: '',
            nom_designation: '',
            cne_passport_if: '',
            adresse: '',
            id_ville: '',
            nombre_parts_action: '',
            email: '',
            phone: '',
            gerant: '',
            dossier: '',
        },
        defaultAssocie: {
            type: '',
            nom_designation: '',
            cne_passport_if: '',
            adresse: '',
            id_ville: '',
            nombre_parts_action: '',
            email: '',
            phone: '',
            gerant: '',
            dossier: '',
        },
        editedItem: {
            code: '',
            immf: '',
            ice: '',
            rc: '',
            dossier_banques:[{
                banque:'',
                rib:'',
            }
            ],

            adresse: '',
            denomination: '',
            ville: '',
            activitee: '',
            type_comptabilitee: '',
            capital: '',
            part_action: '',
            banque: '',
            rib: '',
            taxe_professionnel: '',
            email: '',
            telephone_fixe: '',
            code_adhesion: '',
            login_simpl: '',
            regimes: '',
            tva: '',
            imposition: '',
            timbre: '',
            n_affiliation_cnss: '',
            code_utilisateur_cnss: '',
            mot_passe_cnss: '',
            honoraires: '',
            periodicite_honoraire: '',
            mot_passe_simpl: '',
            telephone_mobile: '',
            typeComptabilitee:{
                id:'',
                intitulee:'',
                code:'',
            }

        },
        defaultItem: {
            code: '',
            immf: '',
            ice: '',
            rc: '',
            dossier_banques:[{
                banque:'',
                rib:'',
            }
            ],
            adresse: '',
            denomination: '',
            ville: '',
            activitee: '',
            typeComptabilitee: '',
            capital: '',
            part_action: '',
            banques: '',
            rib: '',
            taxe_professionnel: '',
            email: '',
            telephone_fixe: '',
            code_adhesion: '',
            login_simpl: '',
            regimes: '',
            tva: '',
            imposition: '',
            timbre: '',
            n_affiliation_cnss: '',
            code_utilisateur_cnss: '',
            mot_passe_cnss: '',
            honoraires: '',
            periodicite_honoraire: '',
            mot_passe_simpl: '',
            telephone_mobile: '',
            typeComptabilitee:{
                id:'',
                intitulee:'',
                code:'',
            }

        },
        defaultVille:{
            code:'',
            intitulee:'',
            code_postal:''
        },
        newVille:{
            code:'',
            intitulee:'',
            code_postal:''
        },
        offset:1,
        limit:10,
        totalItems:500,
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter Dossier' : 'Modifier Dossier'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        dialogGerant(val) {
            val || this.closeAssocie()
        },
        loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 2000)

        this.loader = null
      },

    },

    created() {

        this.initialize();
        this.getDossiers();
    },
    fetch() {
    },
    methods: {
        async getDossiers(){
            let url = process.env.Name_api + `/dossiers${this.offset ? `?offset=${this.offset}` : ''}${this.limit ? `&limit=${this.limit}` : ''}`;
            const res = await this.$myService.get(url)
            this.rows = res
        },
        ajoutBanque(){
            this.editedItem.dossier_banques.push({banque:'',rib:''})
        },
        ajoutAssocie(dossier) {
            this.isUpdate = false
            this.dialogGerant = true
            this.associeItem.dossier = dossier.id
        },
        UpdateAssocie(associe) {
            console.log(associe)


            this.associeItem = Object.assign({}, associe)
            this.dialogGerant = true
            this.isUpdate = true
            console.log(this.associeItem)
        },
        next(steep) {
            if (steep == 2 && this.$refs.formSteep1.validate()) {
                this.e1 = steep
            }
            if (steep == 3 && this.$refs.formSteep2.validate()) {
                this.e1 = steep
            }


        },
        async serachByIf() {

            let url = `https://maroc.welipro.com/recherche?q=${this.editedItem.immf}&type=idf&rs=&cp=1&cp_max=2035272260000&et=&v=`;
            let res = await this.$myService.get(url)
            let doc = new DOMParser().parseFromString(res, "text/html")
            let card = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0')
            this.editedItem.denomination = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 a') ? doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 a').outerText.trim() : '';
            this.editedItem.activitee = doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 .card-body') ? doc.querySelector('.card.border-bottom-1.border-bottom-success.rounded-bottom-0 .card-body').outerText.trim() : '';

            if (card) {
                let lis = card.querySelectorAll('ul li')

                this.editedItem.ice = lis[0].querySelector('.ml-auto').outerText.replaceAll(" ", "").replace(/\D/g, "").trim();
                this.editedItem.rc = lis[1].querySelector('.ml-auto').outerText.replaceAll(" ", "").replace(/\D/g, "").trim();
                // this.editedItem.ville= lis[1].querySelector('.ml-auto a').outerText.replaceAll(" ","");
                // this.editedItem.date_creation = lis[2].querySelector('.ml-auto').outerText.replaceAll(" ", "");
                console.log(lis)
                this.editedItem.adresse = lis[5].outerText.trim();
                this.$forceUpdate()
            } else {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.$refs.form.resetValidation()
            }

            //  this.editedItem.adresse= lis[5].outerText;
            // this.editedItem.rc= li[1].outerText;
            // this.editedItem.date_creation= li[3].outerText;
            // this.editedItem.etat= li[3].outerText;
            console.log(this.editedItem)
        },
        async initialize() {

            // let url = process.env.Name_api + `/dossiers${this.offset ? `?offset=${this.offset}` : ''}${this.limit ? `&limit=${this.limit}` : ''}`;
            // this.rows = await this.$myService.get(url)
            let url;

            url = process.env.Name_api + "/villes?limit=-1";
            this.villes = await this.$myService.get(url)

            url = process.env.Name_api + "/typeComptabilitees";
            this.typeComptabilitees = await this.$myService.get(url)

            url = process.env.Name_api + "/banques";
            this.banques = await this.$myService.get(url)


            // url = `https://maroc.welipro.com/recherche?q=${}&type=&rs=&cp=1&cp_max=2035272260000&et=&v=`;
            // let res = await this.$myService.get(url)
            // let doc = new DOMParser().parseFromString(res, "text/html")

            // doc.querySelector("#collapse1 #mCriteria").value = "25065021"
            // url = "https://r-entreprise.tax.gov.ma/rechercheentreprise/result";
            //  res = await this.$myService.post(url,{param['criteria']})
            // setTimeout(() => {

            //     console.log(doc.getElementsByTagName('textarea')[0])
            // }, 2000);
            // res = await this.$myService.post(url)

            // doc = new DOMParser().parseFromString(res.data, "text/html")
            // console.log(doc.getElementsByTagName('textarea')[0])
            //.setAttribute('value','25065021'); 
            // let aa = doc.getElementById("btnSearch").click

            // console.log(doc)

        },

        async editItem(item) {
            const url = `${process.env.Name_api}/dossiers/${item.id}`;
            const res = await this.$myService.get(url)
            console.log(res);
            // to keep the same form step when editing if the previous closed element was the same
            if (this.prevClicked !== null && this.prevClicked !== this.rows.indexOf(item)) {
                // if its not the same element form step is reset to 1
                this.e1 = 1
            }
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem = Object.assign({}, res)
            this.prevClicked = this.editedIndex
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem.id = item.id
            console.log("item", this.editedItem.id)
            // console.log("item", item.id)
            // return
            console.log(this.editedItem)

            this.dialogDelete = true
        },
        deleteItemBanque(item){
            this.editedItem.dossier_banques.splice(item, 1)
        },
        deleteItemConfirm() {

            this.delete(this.editedItem.id)
            // this.rows.splice(this.editedIndex, 1)

        },


        close() {
            this.$refs.formSteep1.resetValidation()
            this.$refs.formSteep2.resetValidation()
            // this.$refs.formSteep3.resetValidation()
            this.enableInputs()
            this.hideAddInputs()
            this.dialog = false
            console.log('close')
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                // this.$refs.form.resetValidation()
            })
        },
        closeAssocie() {
            this.dialogGerant = false
            this.$nextTick(() => {
                this.associeItem = Object.assign({}, this.defaultAssocie)
                this.editedAssocie = -1
                // this.$refs.form.resetValidation()
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

            if (this.editedIndex > -1) {
                this.update()
            } else {
                this.add();
            }


        },

        saveGerant() {
            if (this.isUpdate) {
                this.updateGerant()
            } else {
                this.addGerant();
            }
        },
        async handleAddVille(){
            if(!this.$refs.addVilleForm.validate()){
                this.showToast("Veuillez remplir les champs obligatoires")
                return
            }
            this.loader = 'loading'
            this.addVille()
            this.newVille = Object.assign({}, this.defaultVille)
            
        },
        resetForms() {
            this.e1 = 1
            this.$refs.formSteep1.resetValidation()
            this.$refs.formSteep2.resetValidation()
            // this.$refs.formSteep3.resetValidation()
        },
        async add() {
            if (this.$refs.formSteep2.validate()) {
                try {

                    var formData = new FormData();

                    Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));

                    formData.append("logo", this.logo);
                    formData.append('dossiers_banques',JSON.stringify(this.editedItem.dossier_banques))
                    formData.append('type_comptabilitee',this.editedItem.typeComptabilitee.id)
                    let url = process.env.Name_api + "/dossiers";
                    const aaaa = await this.$myService.post(url, formData, true)
                    aaaa.data.dossier_banques = JSON.parse(JSON.stringify(this.editedItem.dossier_banques)) 
                    this.rows.push(aaaa.data)
                    this.resetForms()
                    this.close()
                } catch (errors) {
                    this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                    // this.$global.makeToast(this.$bvToast,'warning',this.$global.getErrorMsg(errors).message,'Attention')                  
                    // statusCode
                    this.close()
                }
            }

        },
        async addGerant() {
            try {

                let url = process.env.Name_api + "/associes";
                const aaaa = await this.$myService.post(url, this.associeItem)

                this.rows.find(item => item.id == this.associeItem.dossier).id_associe.push(aaaa.data)
                this.closeAssocie()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                // this.$global.makeToast(this.$bvToast,'warning',this.$global.getErrorMsg(errors).message,'Attention')                  
                // statusCode
                this.closeAssocie()

            }

        },

        async updateGerant() {
            try {

                let url = process.env.Name_api + "/associes/" + this.associeItem.id;
                console.log(this.associeItem)
                if (typeof this.associeItem.id_ville === 'object' && this.associeItem.id_ville !== null) {
                    this.associeItem.id_ville = this.associeItem.id_ville.id
                }

                if (typeof this.associeItem.id_dossier === 'object' && this.associeItem.id_dossier !== null) {
                    this.associeItem.id_dossier = this.associeItem.id_dossier.id
                }

                const aaaa = await this.$myService.update(url, this.associeItem)

                let dossier = this.rows.find(item => item.id == this.associeItem.id_dossier)
                console.log('dossier', dossier);
                let index = dossier.id_associe.findIndex(item => item.id == this.associeItem.id)
                Object.assign(dossier.id_associe[index], aaaa)
                //  id_associe.find(item=> item.id == this.associeItem.id) = aaaa.data
                this.closeAssocie()

            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                // this.$global.makeToast(this.$bvToast,'warning',this.$global.getErrorMsg(errors).message,'Attention')                  
                // statusCode
                this.closeAssocie()

            }

        },
        async update() {
            try {
                if (typeof this.editedItem.banque === 'object' && this.editedItem.banque !== null) {
                    this.editedItem.banque = this.editedItem.banque.id
                }

                if (typeof this.editedItem.type_comptabilitee === 'object' && this.editedItem.type_comptabilitee !== null) {
                    this.editedItem.type_comptabilitee = this.editedItem.type_comptabilitee.id
                }

                if (typeof this.editedItem.ville === 'object' && this.editedItem.ville !== null) {
                    this.editedItem.ville = this.editedItem.ville.id
                }




                var formData = new FormData();

                Object.keys(this.editedItem).forEach(key => formData.append(key, this.editedItem[key]));
                formData.append('dossiers_banques',JSON.stringify(this.editedItem.dossier_banques))
                formData.append('type_comptabilitee',this.editedItem.typeComptabilitee.id)

                let url = process.env.Name_api + "/dossiers/" + this.editedItem.id;
                const aaaa = await this.$myService.post(url, formData, true)
                // const skil =this.rows.find(item=> item.id == this.editedItem.id)
                // Object.assign(skil, this.editedItem);
                Object.assign(this.rows[this.editedIndex], this.editedItem)
                this.resetForms()
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
                let url = process.env.Name_api + "/dossiers/" + val;
                const aaaa = await this.$myService.delete(url, this.editItem)
                this.rows.splice(this.editedIndex, 1)
                this.closeDelete()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeDelete()
            }
        },
        async deleteAssocie() {
            try {

                let url = process.env.Name_api + "/associes/" + this.associeItem.id;
                const aaaa = await this.$myService.delete(url)
                if (typeof this.associeItem.id_dossier === 'object' && this.associeItem.id_dossier !== null) {
                    this.associeItem.id_dossier = this.associeItem.id_dossier.id
                }
                let dossier = this.rows.find(item => item.id == this.associeItem.id_dossier)

                let index = dossier.id_associe.findIndex(item => item.id == this.associeItem.id)
                dossier.id_associe.splice(index, 1)


                this.closeAssocie()
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.closeAssocie()
            }
        },
        async getfile($event) {
            const file = $event
            if (!file) return;
            this.editedItem.logo = file;

        },
        addVilleBtn(){
            this.villeInput = true
            this.addClicked = true
        },
        closeAddVilleBtn(){
            this.villeInput = false
            this.addClicked = false
        },
        showToast(message){
            this.text = message
            this.snackbar = true
            
        },
        enableInputs(){
            this.addClicked = false
        },
        hideAddInputs(){
            this.villeInput = false
            this.newVille = Object.assign({}, this.defaultVille)
        },
        async addVille() {
            try {
                let url = process.env.Name_api + "/villes";
                const res = await this.$myService.post(url, this.newVille)
                if(res.data){
                    this.villes.push(res.data)
                    this.showToast('Ville a été ajouté avec succès')
                    this.enableInputs()
                    this.hideAddInputs()
                }
                else{
                    this.showToast("Erreur lors de l'ajout du ville")
                }
            } catch (errors) {
                this.$global.makeToast(this.$toast.error, this.$global.getErrorMsg(errors).message, 'fal fa-exclamation-triangle')
                this.close()
            }

        },
        pageUpdateFunction(page) {
            this.offset = page
            this.getDossiers()
        },
        offsetWatch(offset){
            this.limit = offset
            this.getDossiers()
        },
    },
}
</script>