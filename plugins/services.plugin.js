import { GlobalService } from '../_services/global.service'

export default ({ app }, inject) => {

  const global = new GlobalService()
  
  // inject the service, making it available in the context, component, store, etc.
  inject('global', global)
}