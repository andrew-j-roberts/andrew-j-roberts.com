import { serverConfig } from './server-config'

export const query = (queryString) => {
  let graphqlServerEndpoint = `${serverConfig.endpoint}`
  return new Promise((resolve, reject)=> {
    try {
      fetch(graphqlServerEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: queryString
      })
      .then(async res => {
        let res_json = await res.json()
        resolve(res_json)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    }
    catch (e) {
      console.log(e)
      reject(e)
    }
  })
}