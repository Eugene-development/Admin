export default function ({redirect, $auth} ) {
  if (!$auth.loggedIn) {
    console.log('Нет доступа!');
    return redirect('/admin/login')
  }
  if ($auth.user.role_id !== 1) {
    console.log('Нет прав!');
    return redirect('/admin/login')
  }
  if ($auth.user.project_id !== 2) {
    console.log('Не ваш проект!');
    return redirect('/admin/login')
  }
}
