import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/list'
import login from '@/components/login'
import register from '@/components/register'
import firebase from 'firebase'
Vue.use(Router);


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta:{
        requiresGuest:false
      }
    },
    {
      path:'/register',
      name:'register',
      component:register,
      meta:{
        requiresGuest:false
      }
    },
    {
      path:'/:name',
      name:'list',
      component:list,
      meta:{
        requiresAuth:true
      }
    },

  ]
})

router.beforeEach((to,from,next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      });
    }
    else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path:'/',
        query:{
          redirect:to.fullPath
        }
      });
    }
    else{
      next();
    }
  }
  else{
      next();
    }
});
export default router;
