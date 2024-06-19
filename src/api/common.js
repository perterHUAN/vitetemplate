import service from '@/server/hwAxios'

export function tyfl(params) {
  return service.dasService({
    url: 'ddjc/ddjc/tyjk/tyfl',
    method: 'get',
    params: params
  })
}