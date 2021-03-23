import request from 'utils/request'

export const loadCityList = async (value: string) => {
  return request({
    url: `/cities?search=${value}`,
    method: 'GET'
  })
}
