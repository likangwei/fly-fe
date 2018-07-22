import request from '../utils/request';

const PAGE_SIZE = 1000

export function fetch() {
  return request(`/v1/reason?limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/v1/reason/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/v1/reason/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/v1/reason', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
