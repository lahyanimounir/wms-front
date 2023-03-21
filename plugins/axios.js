export default function ({ $axios }, inject) {



  
  const myService = {
     get (apiName,params=null) {
      console.log('ici axios', apiName)
      return  $axios.$get(apiName, {params})
    },
    delete(apiName) {
      return $axios.$delete(apiName)
    },
    update(apiName,data, formData = false) {
      if(formData){
        return $axios.$patch(apiName,data, {headers: { "Content-Type": "multipart/form-data" }})
      }else{
        return $axios.$patch(apiName,data)
      }
      
    },
    async post (apiName,data, formData = false) {

      if(formData){
        return $axios.post(apiName,  data , {headers: { "Content-Type": "multipart/form-data" }})
      }else{
        return $axios.post(apiName,  data )
      }
    },
    async put (apiName,data, formData = false) {
        
        if(formData){
          return $axios.put(apiName,  data , {headers: { "Content-Type": "multipart/form-data" }})
        }else{
          return $axios.put(apiName,  data )
        }
      }
  }

  // Will be available in the components as this.$myService
  inject('myService', myService)

}

