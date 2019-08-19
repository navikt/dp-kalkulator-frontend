const axios = require('axios')

const url = '/api/inntekt/'

const get = async () => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.log(error.response)
      if (error.response.data.title) {
        throw new Error(error.response.data.title)
      } else {
        throw new Error('Noe skjedde, whoopsie doopsie')
      }
    }
}

export default { get }