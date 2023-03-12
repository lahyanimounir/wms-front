<template>
    <div>
    <div class="navbar" style="height:73px;background-color: #65B891;">
        <ul class="navbar-items">
            <li><i style="cursor:pointer;color:white;font-size:18px;font-weight:bold;" class="fal fa-arrow-left mr-3" link @click="$router.push({ path: '/comptabilitee' })"></i></li>
            <li v-for="link in linksArray" :key="link.id">
                <a @click="linkClicked(link)" style="color:white;font-size:18px;font-weight:bold;">
                    {{link.title}}
                </a>
            </li>
        </ul>
    </div>
    <div class="childs mx-6 mt-4" style="background-color: #FAFAFA;">
        <!-- <ul class="navbar-childs">
            <li v-for="link in childs" :key="link.id">
                <nuxt-link :to="link.path" style="color:black;font-size:15px;font-weight:bold;">
                    {{link.title}}
                </nuxt-link>
            </li>
        </ul> -->
        <v-tabs
            background-color="#FAFAFA"
            show-arrows
            height="80px"
        >
        <v-tabs-slider color="#5092f3"></v-tabs-slider>
      <v-tab
        v-for="link in childs"
        :key="link.id"
        :to="link.path"
        style="color:black;font-size:15px;font-weight:bold;"
      >
        {{ link.title }}
      </v-tab>
    </v-tabs>
    </div> 
    </div>  
</template>
<style>
ul{
    padding:0px !important;
}
.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px; */
}
.navbar-items{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
    padding: 0;
}
.navbar-items a{
    margin: 0 10px;
    text-decoration: none;
}
.navbar-items a:hover{
    color: #f1f1f1;
}
.navbar-items a.active{
    color: #f1f1f1;
}
.childs{
    display: flex;
    align-items: center;
}
.navbar-childs{
    width: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
}
.navbar-childs a{
    margin: 0 10px;
    text-decoration: none;
}
</style>
<script>
import links from '../constants/'
import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink
    },
    name: 'Navbar',
    data: () => ({
        drawer: null,
        linksArray: [],
        childs: []
    }),
    props: {
        id: {
            type: String,
            default: 'null'
        }
    },
    created(){
        this.linksArray = links(this.id)
        // parse the current path to get the current link
        let currentPath = this.$route.path
        currentPath = currentPath.split('/')[3]
        this.childs = this.linksArray.find(link => link.path == currentPath).childs
        // const currentLink = this.linksArray.find(link => link.childs.find(child => child.path === currentPath))
    },
    methods:{
        linkClicked(link){
            this.childs = link.childs
            this.$router.push({path: link.childs[0].path})

        }
    }
}
</script>