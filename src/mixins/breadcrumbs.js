import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      'getBread': 'navbar/breadcrumbs/getBread',
    })
  },
  mounted() {
    this.getBread($nuxt.$route.path);
  },
}
