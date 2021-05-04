import pathMap from '~/vault/pathMap'

export const state = () => ({
  breadcrumbsEndPoint: '',
});

export const actions = {

  getBread({ commit }, path) {

    const map = new Map(pathMap);

    const breadcrumbsEndPoint = map.get(path);
    commit('BREAD_ENDPOINT', breadcrumbsEndPoint);
  },
};

export const mutations = {
  BREAD_ENDPOINT: (state, breadcrumbsEndPoint) => state.breadcrumbsEndPoint = breadcrumbsEndPoint,
};


export const getters = {
  breadcrumbsEndPoint: state => state.breadcrumbsEndPoint,
};
