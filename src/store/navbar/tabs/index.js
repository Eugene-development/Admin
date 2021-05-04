import color from '~/vault/background'
import pathMap from '~/vault/pathMap'

export const state = () => ({
  tabs: [],
});

export const actions = {

  async getTabs({ commit, state }, path) {
    const map = new Map(pathMap);
    let tab = await map.get(path);

    const bg = color[Math.floor(Math.random() * color.length)]

    let newTabs = [
      {
        name: tab,
        path: path,
        bg
      }
    ];
    let val = await state.tabs.some(item => item.path === path)
    if (!val) {
      const tabs = await state.tabs.concat(newTabs)
      commit('TAB', tabs);
    }
  },

  async closeTab({ commit, state }, path){
    const tabs = await state.tabs.filter(item => item.path !== path);
    commit('TAB', tabs);
  }
};

export const mutations = {
  TAB: (state, tabs) => state.tabs = tabs,
};

export const getters = {
  tabs: state => state.tabs,
};
