<template>
    <h1>Tiers</h1>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        id:null,
    }),
    created(){
        this.test()
    },
    methods:{
        async test(){
            this.id = this.$route.params.id
            const url = process.env.Name_api+'/exercice/'+this.id
            const res = await this.$myService.get(url)
            console.log(res);
        }
    }

}
</script>