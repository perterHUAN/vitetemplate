import service from '@/server/hwAxios'

export function gfxzyddqk(params) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'get',
    params: params
  })
}

export function gfxzyddqkEdit(data) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'put',
    data: data
  })
}