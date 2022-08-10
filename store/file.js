import jsCookie from "js-cookie";

export const actions = {
  async getFiles({}, dirId) {
    const response = await this.$axios.$get(
      `/api/files${dirId ? "?parent=" + dirId : ""}`
    );
    return response;
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

  async deleteFile({}, id) {
    return await this.$axios.$delete(`/api/files?id=${id}`)
  }
};
