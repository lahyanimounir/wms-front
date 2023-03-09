<template>
    <div class="d-flex" style="height:90px;background-color: #D4FFDB;justify-content: space-between;">
        <div class="logo d-flex ml-5" style="align-items: center;gap:23px;">
            <!-- <img style="height:45px" src="~/assets/images/LogoWMS.png" alt="logo"> -->
            <div style="background-color: aliceblue;height:46px;width:110px;border-radius: 48px;border:1px solid black;display:flex;justify-content:center;align-items:center;">
                <span style="font-size:20px;font-weight:bold;">WMS</span>
            </div>
            <span style="font-size:20px;">WEB Management Service</span>
        </div>
        <div class="d-flex mr-5">            
            <v-icon color="black" size="35px" class="me-2 px-6">
                mdi-cog-outline
            </v-icon>
            <v-icon color="black" size="35px" class="me-2 px-6">
                mdi-menu
            </v-icon>
            <div style="font-size:16px;font-weight:bold;align-items: center;gap:12px" class="user-card d-flex px-6">
                <span>Zouhair El Moutez</span>
                <!-- avatar -->
                <v-avatar size="35px" class="ml-2">
                    <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                </v-avatar>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'TopBar'
}
</script>