import smhiService from "@/services/smhiService.js";

let getSummary = async (param, nearestStation) => {
    // ger oss en länk till tillgängliga perioder för stationen
    let hrefToStationPeriods = await smhiService.fetchData(nearestStation.link[0].href)
    console.log(hrefToStationPeriods);
    console.log("utanför for")
    for (let period of hrefToStationPeriods.period) {
        console.log("innanför for");
        console.log(period.key);
        //Dubbelkolla att den heter latest-months
        if (period.key === "latest-months") {
// ger oss en länk till datan för tillgängliga perioden
            let hrefToPeriodData = await smhiService.fetchData(period.link[0].href)
            let actualData = await smhiService.fetchData(hrefToPeriodData.data[0].link[0].href)
            console.log(actualData);
            console.log("actualdata");
            //NEDERBÖRD
            if (param === 23) {
                console.log(actualData.value[actualData.value.length - 1].value)
                return actualData.value[actualData.value.length - 1].value
                // https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/23/station/71420/period/latest-months/data.json
            }

        } else return "värde saknas"
    }

    // if (hrefToStationPeriods.period[0].key === "latest-months") {
    //     // 23 = nederbörd
    //
    //     // if nederbörd
    //
    //     //Solskenstimmar
    //     if (param === 10) {
    //
    //
    //         return "solskenplaceholder"
    //     }
    //     return "error"
    // }

}
Object.freeze(getSummary);
export default {getSummary}