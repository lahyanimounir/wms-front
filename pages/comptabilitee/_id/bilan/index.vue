<template>
    <div>
        <h1>Bilan</h1>
        <p>Page de bilan actif</p>
    </div>
</template>
<style></style>
<script>



export default {
    data: () => ({
        dossier:{},
        du:'',
        au:'',
    }),
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.id = this.$route.params.id
            let url = process.env.Name_api + "/exercice/" + this.id + "/getExerciceInfo";
            let info = await this.$myService.get(url)
            this.dossier = info.dossier
            this.du = info.du;
            this.au = info.au;
            console.log('info : ', info)
        }
    }

}
</script>