const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageHome.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/member-home', component: () => import('pages/MemberHome.vue') },
      { path: '/create-account', component: () => import('pages/CreateAccount.vue') },
      { path: '/retrieve-password', component: () => import('pages/RetrievePassword.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
