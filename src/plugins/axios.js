export default function (ctx) {

  // const token = ctx.store.rootGetters.token;
  // const token = ctx.store.state.token;
  // console.log(ctx.store.getters['myAuth/login/token'])
  // console.log(ctx.$store)
  // const token = ctx.$store;
  // const token = ctx.$auth.user.project_id;
  // const token = ctx.store.getters['myAuth/token/token'];
  const token = ctx.store.getters['token'];

  ctx.$axios.onRequest((config) => {
    ctx.$axios.setToken(token, 'Bearer')
  })
}

// export default function ({ $axios, store, $auth }) {
//   $axios.onRequest((config) => {
//     $axios.setToken('DB5', 'Bearer')
//   })
// }
// export default function ({ $axios, store, $auth }) {
//   $axios.onRequest((config) => {
//     $axios.setToken($auth.user.project_id, 'Bearer')
//   })
// }
// export default function ({ $axios, store }, $auth) {
//   $axios.onRequest((config) => {
//     $axios.setToken($auth.login, 'Bearer')
//   })
// }
