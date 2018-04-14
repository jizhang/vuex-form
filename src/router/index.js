import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NonStrict from '@/components/NonStrict'
import LocalCopy from '@/components/LocalCopy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/non-strict',
      name: 'NonStrict',
      component: NonStrict
    },
    {
      path: '/local-copy',
      name: 'LocalCopy',
      component: LocalCopy
    }
  ]
})
