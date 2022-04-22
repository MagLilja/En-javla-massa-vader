const smhiService = {

    async fetchData(URL = "https://opendata-download-metobs.smhi.se/api/version/1.0.json") {
        let response = await fetch(URL);
        return response.json();
    },
}
Object.freeze(smhiService)
export default smhiService
