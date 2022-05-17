let wSymb2Decoder = undefined

function getHourFromTime(time) {
  const event = new Date(time)
  const options = {
    hour: '2-digit',
  }
  return event.toLocaleTimeString('sv-SE', options)
}

function hourTime(time) {
  const event = new Date(time)
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  }
  return event.toLocaleTimeString('sv-SE', options)
}

function getWSymb2Unicode(data) {
  for (const wSymb2 of wSymb2Decoder.weathers) {
    if (wSymb2.value === data) {
      return wSymb2.symbol
    }
  }
}

function extractCorrectParamaterValues(
  ts,
  temperatureValue,
  precipitationValue,
  windValue,
  gustValue,
  wsymb2Value,
) {
  for (let param of ts.parameters) {
    switch (param.name) {
      case 't':
        temperatureValue = param.values[0]
        break
      case 'pmean':
        precipitationValue = param.values[0]
        break
      case 'ws':
        windValue = param.values[0]
        break
      case 'gust':
        gustValue = param.values[0]
        break
      case 'Wsymb2':
        wsymb2Value = param.values[0]
        break
    }
  }
  return {
    temperatureValue,
    precipitationValue,
    windValue,
    gustValue,
    wsymb2Value,
  }
}

function addTolist(circleDataList, ts, __ret) {
  circleDataList.push({
    time: hourTime(ts.validTime),
    validTime: ts.validTime,
    wSymb2Symbol: getWSymb2Unicode(__ret.wsymb2Value),
    temperature: __ret.temperatureValue,
    precipitation: __ret.precipitationValue /*Mean preciptation used*/,
    wind: __ret.windValue,
    gusts: __ret.gustValue,
  })
}

function getListWithWeatherData(
  fullData,
  wSymb2Json,
  interval,
  noOfDataPoints,
  onlyToday,
  type,
) {
  let counter = 0
  let dataList = []
  let today = new Date()
  wSymb2Decoder = wSymb2Json

  function populateList(ts) {
    counter++
    let temperatureValue = 0
    let precipitationValue = 0
    let windValue = 0
    let gustValue = 0
    let wsymb2Value = 0

    const __ret = extractCorrectParamaterValues(
      ts,
      temperatureValue,
      precipitationValue,
      windValue,
      gustValue,
      wsymb2Value,
    )
    addTolist(dataList, ts, __ret)
  }

  for (let ts of fullData.timeSeries) {
    let timeSerieDate = new Date(ts.validTime)
    if (onlyToday) {
      if (fullData.timeSeries.indexOf(ts) === 0 && type === 'analysis') {
        console.log(ts.validTime)
        populateList(ts)
      }
      if (
        getHourFromTime(ts.validTime) % interval === 0 &&
        today.getDate() === timeSerieDate.getDate() &&
        counter < noOfDataPoints
      ) {
        populateList(ts)
      }
    } else {
      if (
        getHourFromTime(ts.validTime) % interval === 0 &&
        today.getDate() > timeSerieDate.getDate() &&
        counter < noOfDataPoints
      ) {
        populateList(ts)
      }
    }
  }
  return dataList
}

function getWeatherDataforDate(ForecastFullData, inputDate) {
  let getValidTimeDate = (validTime) => {
    return new Date(validTime).getDate()
  }

  let lowestTemp = 500
  let highestTemp = 0
  let totalPrecipitation = 0
  let highestGust = 0
  let averageWindSpeed = 0
  let averageWeatherSymbol = 0
  let counter = 0
  let windValueSum = 0
  let roundedAvgWindSpeed = 0
  let roundedAvgTotalPrecipitation = 0

  for (let ts of ForecastFullData.timeSeries) {
    if (inputDate.getDate() === getValidTimeDate(ts.validTime)) {
      counter++
      let temperatureValue = 0
      let precipitationValue = 0
      let windValue = 0
      let gustValue = 0
      let wsymb2Value = 0

      const __ret = extractCorrectParamaterValues(
        ts,
        temperatureValue,
        precipitationValue,
        windValue,
        gustValue,
        wsymb2Value,
      )
      temperatureValue = __ret.temperatureValue
      precipitationValue = __ret.precipitationValue
      windValue = __ret.windValue
      gustValue = __ret.gustValue

      if (temperatureValue > highestTemp) {
        highestTemp = temperatureValue
      }

      if (temperatureValue < lowestTemp) {
        lowestTemp = temperatureValue
      }

      totalPrecipitation += precipitationValue
      roundedAvgTotalPrecipitation =
        Math.round((precipitationValue + Number.EPSILON) * 10) / 10

      if (gustValue > highestGust) {
        highestGust = gustValue
      }

      windValueSum += windValue
    }
    averageWindSpeed = windValueSum / counter
    roundedAvgWindSpeed =
      Math.round((averageWindSpeed + Number.EPSILON) * 10) / 10
  }

  return {
    dataDate: new Date(inputDate),
    highestTemp: highestTemp,
    lowestTemp: lowestTemp,
    totalPrecipitation: roundedAvgTotalPrecipitation,
    highestGust: highestGust,
    roundedAvgWindSpeed: roundedAvgWindSpeed,
  }
}

Object.freeze(getListWithWeatherData)
Object.freeze(getWeatherDataforDate)
export default { getListWithWeatherData, getWeatherDataforDate }
