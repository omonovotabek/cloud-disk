export const actions = {
  async getFiles({}, dirId) {
    const response = await this.$axios.$get(
      `/api/files${dirId ? "?parent=" + dirId : ""}`
    );
    return response;
  },

  async createFile({}, data) {
   return await this.$axios.$post("/api/files", data);
  },
};
