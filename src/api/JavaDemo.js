// noinspection JSUnusedGlobalSymbols

import service from '@/server/hwAxios'

export function get(params) {
  return service.javaService({
    url: 'JavaService/get',
    method: 'get',
    params: params
  })
}

export function add(data) {
  return service.javaService({
    url: 'JavaService/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return service.javaService({
    url: 'JavaService/edit',
    method: 'put',
    data: data
  })
}

export function del(params) {
  return service.javaService({
    url: 'JavaService/delete',
    method: 'delete',
    params: params
  })
}