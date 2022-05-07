export default function ({ $axios, redirect, store }) {
  $axios.interceptors.request.use(request => {
    if(store.getters['auth/isAuthenticated']){
      const token = store.getters['auth/token']
      request.headers.common['x-auth-token'] = token
    }
    return request
  });

$axios.onError((error) => {
  if (error.response.status === 400) {
    redirect(`/badRequest?message=${error.response.data}&apiUrl=${error.response.config.url}`);
  }
  if (error.response.status === 401) {
    redirect("/auth/login?message=session");
  }
  if (error.response.status === 500) {
    redirect("/serverError");
  }
});
}