import smhiService from "./../services/smhiService.js";

let getSwedenCoordinates = (boundary) => {
    let cornersLong = [];
    let cornersLat = [];
    for (let coordinates of boundary.features[0].geometry.coordinates[0]) {
        cornersLong.push(coordinates[0]);
        cornersLat.push(coordinates[1]);
    }
    return {cornersLong, cornersLat};
}


let getMinMaxValCoord = async (param, level, boundary, downsample) => {
    let validTimeData = await smhiService.fetchData("https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/validtime.json");
    let validTime = validTimeData.validTime[0];
    let p = param;
    let lt = "hl";
    validTime = validTime.replace(/[:-]/g, "");
    let l = level;
    let url = `https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/multipoint/validtime/${validTime}/parameter/${p}/leveltype/${lt}/level/${l}/data.json?downsample=${downsample}`;
    //SMHI ger coordinaterna på fel håll
    let data = await smhiService.fetchData(url);
    console.info(`metanalys multipoint parameter: ${param} level: ${level} downsample: ${downsample}`)
    let {cornersLong, cornersLat} = getSwedenCoordinates(boundary);

    let target = {
        maxValue: -100000,
        maxCoordinates: undefined,
        minValue: 100000,
        minCoordinates: undefined,
        unit: undefined,
        city: {
            maxValueGeo:undefined,
            minValueGeo: undefined
        },

    }

    target.unit = data.timeSeries[0].parameters[0].unit
    data.geometry.coordinates.forEach((c, i) => {
        let longitude = c[0];
        let latitude = c[1];

        let isSweden = rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);
        if (isSweden) {
            c.sweden = true;
            if (data.timeSeries[0].parameters[0].values[i] < target.minValue) {
                target.minValue = data.timeSeries[0].parameters[0].values[i]
                target.minCoordinates = c
            }
            if (data.timeSeries[0].parameters[0].values[i] > target.maxValue) {
                target.maxValue = data.timeSeries[0].parameters[0].values[i]
                target.maxCoordinates = c
            }
        } else {
            c.sweden = false;
        }
    })


    target.city = await getCityFromGeoLocationDataApi(target)
    return target;

    // Gothenburg
    // let latitude =57.7065806
    // let longitude =11.9294613

    // Norrland
    // let latitude = 63.792215;
    // let longitude = 15.366540;

    // Denmark
    // let latitude =57.448878
    // let longitude =10.290267


}

function rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong) {
    var i, j = cornersLat.length - 1;
    var odd = false;

    var pX = cornersLat;
    var pY = cornersLong;

    for (i = 0; i < cornersLat.length; i++) {
        if ((pY[i] < longitude && pY[j] >= longitude || pY[j] < longitude && pY[i] >= longitude)
            && (pX[i] <= latitude || pX[j] <= latitude)) {
            odd ^= (pX[i] + (longitude - pY[i]) * (pX[j] - pX[i]) / (pY[j] - pY[i])) < latitude;
        }

        j = i;
    }
    if (odd === 1) odd = true;
    return odd;
}

let getCityFromGeoLocationDataApi = async (target) => {
    let maxUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${target.maxCoordinates[1]}&lon=${target.maxCoordinates[0]}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`
    let minUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${target.minCoordinates[1]}&lon=${target.minCoordinates[0]}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`
    // if the coordinates in the Store match the geolocation data coordinates in the Store
    let maxResponse = await fetch(maxUrl)
    let maxResult = await maxResponse.json()

    let minResponse = await fetch(minUrl)
    let minResult = await minResponse.json()

    return {
        maxValueGeo: maxResult,
        minValueGeo: minResult
    }
}

export default {getMinMaxValCoord, getCityFromGeoLocationDataApi}
