import Axios from 'axios';
export const makeRequest = (url,data,methodType,token) => {
    return new Promise((resolve, reject) => {
         Axios(
            {
                method: methodType,
                url: `${url}`,
                data: JSON.stringify(data),
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `${token}`,
                    'accept-language': 'en-US,en;q=0.9'
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}

export const get = (url,token) => {
    return new Promise((resolve, reject) => {
         Axios(
            {
                method: 'GET',
                url: `${url}`,
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'accept-language': 'en-US,en;q=0.9'
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}