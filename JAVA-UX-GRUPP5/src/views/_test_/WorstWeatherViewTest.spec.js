import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WorstWeatherView from '@/views/WorstWeatherView.vue'

describe('checkCoordinate function', () => {
  it('should do', function () {
    const wrapper = mount(WorstWeatherView)

    let { cornersLong, cornersLat } = WorstWeatherView.getSwedenCoordinates()
    // Norrland
    let latitude = 63.792215
    let longitude = 15.36654
    let res = WorstWeatherView.checkCoordinate(
      latitude,
      longitude,
      cornersLat,
      cornersLong,
    )
    expect(res).to.equal(1)
  })
})
