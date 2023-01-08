import Vue from 'vue'
import pdf from 'vue-pdf'


Vue.component('vue-pdf', pdf)

export default ({ app }, inject) => {


    
    // inject the service, making it available in the context, component, store, etc.
    inject('pdf', pdf)
  }