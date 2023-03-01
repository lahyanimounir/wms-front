export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
    
  }
  export const mutations = {
    setUserm(state,user) {
      
      state.auth.user = user
      // console.log('this is from index',state)
      // console.log('this is from index',user)
    }
  }