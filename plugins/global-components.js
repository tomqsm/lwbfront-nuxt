import Vue from 'vue'

import NavBar from '@/components/NavBar'
import LoginForm from '@/components/LoginForm'
import HomeTabs from '@/components/HomeTabs'
import BlogArticle from '@/components/BlogArticle'
import globalMixins from '@/mixins/global'

// this navbar isn't necessary as global but shows example
Vue.mixin(globalMixins)
Vue.component('NavBar', NavBar)
Vue.component('LoginForm', LoginForm)
Vue.component('HomeTabs', HomeTabs)
Vue.component('BlogArticle', BlogArticle)
