import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions({
      'getTabs': 'navbar/tabs/getTabs',
    })
  },
  mounted() {
    this.getTabs($nuxt.$route.path);
  },
}
