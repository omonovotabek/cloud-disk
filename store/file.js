import jsCookie from "js-cookie";

export const actions = {
  async getFiles({}, payload) {
    let url = `/api/files?sort=date`;
    if (payload) {
      if (payload.dirId) {
        url = `/api/files?parent=${payload.dirId}&sort=date`;
      }
      if (payload.sort) {
        url = `/api/files?sort=${payload.sort}`;
      }
      if (payload.sort && payload.dirId) {
        url = `/api/files?parent=${payload.dirId}&sort=${payload.sort}`;
      }
    }
    return await this.$axios.$get(url);
  },

  async createFile({}, { name, dirId }) {
    const formData = new FormData();
    formData.append("type", "dir");
    formData.append("name", name);
    if (dirId) {
      formData.append("parent", dirId);
    }
    return await this.$axios.$post("/api/files", formData);
  },

  async uploadFile({}, { file, dirId }) {
    const formData = new FormData();
    formData.append("file", file);
    if (dirId) {
      formData.append("parent", dirId);
    }
    return await this.$axios.$post("/api/files/upload", formData);
  },

  async downloadFile({}, id) {
    return await fetch(`/api/files/download?id=${id}`, {
      headers: {
        "x-auth-token": `${jsCookie.get("jwt-token")}`,
      },
    });
  },

  async searchFile({}, search) {
    return await this.$axios.$get(`/api/files/search?search=${search}`)
  },

  async deleteFile({}, id) {
    return await this.$axios.$delete(`/api/files?id=${id}`);
  },
};
