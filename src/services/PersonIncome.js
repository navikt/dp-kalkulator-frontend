const axios = require('axios')

const url = '/api/inntekt/'

const get = async () => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.log(error.response)
      throw Error(error.response)
    }
}

export default { get }