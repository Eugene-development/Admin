export default function ({ $axios, store, $auth }) {
  $axios.onRequest((config) => {
    $axios.setToken('1', 'Bearer')
  })
}

// export default function ({ $axios, store, $auth }) {
//   $axios.onRequest((config) => {
//     $axios.setToken('DB5', 'Bearer')
//   })
// }
// export default function ({ $axios, store, $auth }) {
//   $axios.onRequest((config) => {
//     $axios.setToken($auth.user.name, 'Bearer')
//   })
// }
// export default function ({ $axios, store }, $auth) {
//   $axios.onRequest((config) => {
//     $axios.setToken($auth.login, 'Bearer')
//   })
// }
