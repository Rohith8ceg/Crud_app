import http from "../http-common";

const getAll = () => {
  return http.get("/user-list");
};

const get = (id) => {
  return http.get(`/user-detail/${id}`);
};

const create = (data) => {
  return http.post("/user-create/", data);
};

// const update = (id, data) => {
//   return http.put(`/user-update/${id}/`, data);
// };

// const remove = (id) => {
//   return http.delete(`/user-delete/${id}`);
// };

// const login = (data) => {
//   return http.post("/login/", data);
// };

export default {
  getAll,
  get,
  create,
};
