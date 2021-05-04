export default function ({redirect, $auth} ) {
  if (!$auth.loggedIn) {
  // if (!$auth.loggedIn) {
    console.log('Нет доступа!');
    // console.log($auth.loggedIn)
    return redirect('/admin/login')
  }
  if ($auth.user.role !== 1) {
  // if (!$auth.loggedIn) {
    console.log('Нет прав!');
    // console.log($auth.loggedIn)
    return redirect('/admin/login')
  }
}
