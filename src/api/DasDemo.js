// noinspection JSUnusedGlobalSymbols

import service from '@/server/hwAxios'

export function get(params) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'get',
    params: params
  })
}

export function add(data) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'put',
    data: data
  })
}

export function save(data) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'post',
    headers: {'Actiontype': 'save'},
    data: data
  })
}

export function del(params) {
  return service.dasService({
    url: 'ddjc/ddjc/gnfw/gfxzyddqk',
    method: 'delete',
    params: params
  })
}