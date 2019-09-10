const axios = require('axios')

const header = (token) => {
      return {
            headers: {
                  'X-API-KEY' : token,
                  'Content-Type' : 'application/json'
            }
      }
}

const get = async (url, token) => {
      const response = await axios.get(url, header(token))
      return response
}

const post = async (url, params, token) => {
      const response = await axios.post(url, params, header(token))
      return response
}

export default { get, post }