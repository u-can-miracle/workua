interface IParams {
  url: string
  payload?: any
  method: 'GET' | 'POST' | 'PUTCH' | 'PUT'
}

export default async function request(params: IParams){
  const {
    url,
    payload,
    method = 'POST',
  } = params

  const apiUrl = url
  let fetchResponse

  if(method.toLowerCase() === 'delete'){
    fetchResponse = await fetch(apiUrl, {
      method
    })
  } else {
    const isFormData = payload instanceof FormData
    const body = isFormData ? payload : JSON.stringify(payload)
    const headers = isFormData ? {} : {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const bodyParams = method.toLowerCase() === 'get' ? {} : { body }

    fetchResponse = await fetch(apiUrl, {
      method,
      ...headers,
      credentials: 'include',
      ...bodyParams,
    })
  }

  // TODO: handle error
  try {
    const data = await fetchResponse.json()

    return data
  } catch (err) {
    console.log(err)
  }
}
