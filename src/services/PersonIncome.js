const axios = require('axios')

const url = '/api/inntekt/'

const get = async () => {
      const response = await axios.get(url)
      return response.data
}

export default { get }