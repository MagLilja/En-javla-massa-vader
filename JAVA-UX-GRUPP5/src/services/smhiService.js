const smhiService = {
  async fetchData(
    URL = 'https://opendata-download-metobs.smhi.se/api/version/1.0.json',
  ) {
    let response = await fetch(URL)

    if (response.status === 200) {
      console.info('response OK')
      let promise = response.json()
      return promise
    }
    return response.status
  },
}
Object.freeze(smhiService)
export default smhiService
