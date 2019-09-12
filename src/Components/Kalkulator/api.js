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
      return post(process.env.REACT_APP_API_URL, params, token)
                  .then(getSubsumsjonsLocation)
                  .then(poll)
                  .catch(error => console.log(`error: ${error}`))

}

const poll = async (url, token, retries = 3, msDelay = 1000) => {
      const response = await get(url, token)

      if (response.data.status) {
            if (retries > 0) {
                   await delay(msDelay) 
                   return poll(url, token, retries - 1, msDelay)
            } else {
                  throw new Error('Polling timed out')
            }
      } 
      
      return response.data
}


const delay = async (msDelay) => {
      return await new Promise((resolve) => {
            setTimeout(async () => {
                  resolve()
            }, msDelay)
      })
}




export default { startBehov }