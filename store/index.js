export const state = () => ({
  zips: []
});

export const mutations = {
  SET_zips(state, zips) {
    state.zips = zips;
  }
};

export const actions = {
  async fetchZips({ commit }, key) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(
          `https://back.usstartruckingllc.com/api/shipping/zip-codes/?search=${key}`
        )
        .then(res => {
          commit("SET_zips", res.data.results);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
