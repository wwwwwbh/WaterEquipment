import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeView from './views/HomeView.vue'
import historyData from './views/HistoryData.vue'
// import EquipmentView from '../views/OverviewOfEquipment'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/overview/Equipment',
        name: 'OverviewOfEquipment',
        component: () => import('./views/OverviewOfEquipment.vue'),
        meta: {
          isPublic: true
        }
      }, {
        path: '/overview/Data',
        name: 'OverviewOfData',
        component: () => import('./views/OverviewOfData.vue')
      }, {
        path: '/subStationMonitoring',
        name: 'SubStationMonitoring',
        component: (resolve) => require(['./views/SubStationMonitoring'], resolve)
      }, {
        path: '/historyData',
        name: 'HistoryData',
        component: historyData,
        // component: (resolve) => require(['./views/HistoryData'], resolve)
      }, {
        path: '/realInfo',
        name: 'RealInfo',
        component: (resolve) => require(['./views/RealInfo'], resolve)
      }, {
        path: '/historyAlarm',
        name: 'HistoryAlarm',
        component: (resolve) => require(['./views/HistoryAlarm'], resolve)
      }, {
        path: '/repair/create',
        name: 'RepairEdit',
        component: (resolve) => require(['./views/RepairEdit'], resolve)
      }, {
        path: '/equipment/edit',
        name: 'Threshold',
        component: (resolve) => require(['./views/ThresholdView'], resolve)
      }, {
        path: '/user/list',
        name: 'UserList',
        component: (resolve) => require(['./views/UserList'], resolve)
      }
    ],
    meta: {
      isPublic: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: (resolve) => require(['./views/LoginView.vue'], resolve),
    meta: {
      isPublic: true
    }
  }, {
    path: '/logon',
    name: 'Logon',
    component: (resolve) => require(['./views/LogonView.vue'], resolve),
    meta: {
      isPublic: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') return next('/overview/Equipment')
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next()
  // if (localStorage.token) {
  //   /* has token */
  //   if (to.path === "/login") {
  //     next({ path: "/home" });
  //   } else {
  //     // ????????????????????????
  //     if (??????????????????) {
  //       router.addRoutes(asyncRouter)
  //       //?????? addRoutes ?????????????????????????????????????????????????????????????????? addRoutes ??????????????????????????????
  //       next({ ...to, replace: true })
  //     }
  //     next()
  //   }
  // } else {
  //   if (whiteList.includes(to.name)) {
  //     // ????????????????????????????????????
  //     next();
  //   } else {
  //     next({ path: "/login" });
  //   }
  // }
});

router.afterEach(() => {

});


export default router
