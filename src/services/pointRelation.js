import request from '../utils/request';
import {requestWithStatus} from '../utils/request';
const PAGE_SIZE = 1000
const axios = require('axios');

export function fetch() {
  return request(`/v1/point_relation?limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/v1/point_relation/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/v1/point_relation/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return axios.post('/v1/point_relation', values);
}
