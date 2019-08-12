const url = '/api/inntekt'

const get = async () => {
    const result = await fetch(url, {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
      })

    return result
}

export default { get }