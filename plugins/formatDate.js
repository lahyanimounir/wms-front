import Vue from 'vue'

Vue.filter('formatDate', (value) => {
    console.log(value)
  const date = new Date(value)
  let dd;
  if(value.includes('T')){
        dd = date.toLocaleString(['fr-FR'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
  }else{
    dd = date.toLocaleString(['fr-FR'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })
  }

  return dd
})