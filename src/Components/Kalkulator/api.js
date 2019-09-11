require('dotenv').config()
const axios = require('axios')
const header = (token) => {
      return {
            headers: {
                  'X-API-KEY': process.env.REACT_APP_TOKEN,
                  'Content-Type': 'application/json'
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

const getSubsumsjonsLocation = (response) => {
      return response.headers.location
}

const startBehov = async (params, token) => {
      post(process.env.REACT_APP_API_URL, params, token)
            .then(getSubsumsjonsLocation)
            .then(url => startPolling(url, token))
            .then(console.log)
            .catch(error => console.log(`error: ${error}`))
}

const startPolling = async (url, token, retries = 3, msDelay = 1000) => {
      const response = await get(url, token)
      console.log('hallo')
      if (response.data.status) {
            if (retries > 0) {
                   return await new Promise((resolve) => {
                         setTimeout(async () => { 
                              const shit = await startPolling(url, token, retries - 1, msDelay)
                              resolve(shit)
                        }, msDelay)})
            } else {
                  throw new Error('Polling timed out')
            }
      } else {
            return response.data
      }     
}



export default { startBehov }