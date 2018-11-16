import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true, single: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export function filterAsyncRouter(asyncRouterMap, roles) {
  // console.log('roles: ' + JSON.stringify(roles))
  const accessedRouters = asyncRouterMap
  roles.forEach((role) => {
    const node = {
      path: role.path,
      component: Layout
    }
    if (role.type === '6') {
      node.redirct = role.path + '/index'
      node.children = [{
        path: 'index',
        name: role.name,
        component: () => import(`@/${role.component}`),
        meta: { title: role.name, icon: role.icon, single: true, perms: [] }
      }]
      if (role.children && role.children.length > 0) {
        role.children.forEach((child) => {
          if (child.path) {
            const childNode = {
              path: child.path,
              hidden: true,
              component: () => import(`@/${child.component}`),
              meta: { title: child.name }
            }
            node.children.push(childNode)
          }
          node.children[0].meta.perms.push(child.perm)
        })
      }
    } else {
      node.alwaysShow = true
      node.meta = {
        title: role.name,
        icon: role.icon
      }
      node.children = []
      if (role.children && role.children.length > 0) {
        role.children.forEach((child) => {
          console.log(child.component)
          if (child.path) {
            const childNode = {
              path: child.path,
              component: () => import(`@/${child.component}`),
              name: child.name,
              meta: { title: child.name, perms: [] }
            }
            node.children.push(childNode)
            if (child.children && child.children.length > 0) {
              child.children.forEach((child1) => {
                if (child1.path) {
                  const menuNode = {
                    path: child1.path,
                    hidden: true,
                    component: () => import(`@/${child1.component}`),
                    meta: { title: child1.name }
                  }
                  node.children.push(menuNode)
                }
                childNode.meta.perms.push(child1.perm)
              })
            }
          }
        })
      }
    }
    console.log(node)
    asyncRouterMap.unshift(node)
  })
  // console.log(JSON.stringify(accessedRouters))
  return accessedRouters
}

export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    redirct: '/admin/index',
    alwaysShow: true,
    meta: {
      title: '内容管理',
      icon: 'el-icon-document',
      roles: ['admin']
    },
    children: [{
      path: 'banner',
      component: () => import('@/views/content/banner'),
      name: '轮播图管理',
      meta: {
        title: '轮播图管理',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'news',
      component: () => import('@/views/content/news'),
      name: '新闻资讯',
      meta: {
        title: '新闻资讯',
        roles: ['admin', 'editor '] // or you can only set roles in sub nav
      }
    },
    {
      path: 'news/add',
      component: () => import('@/views/content/news/newsAdd'),
      name: '新闻资讯编辑',
      hidden: true,
      meta: {
        title: '新闻资讯编辑',
        roles: ['admin', 'editor '] // or you can only set roles in sub nav
      }
    },
    {
      path: 'cityarea',
      component: () => import('@/views/content/cityarea'),
      name: '行政区划',
      meta: {
        title: '行政区划',
        roles: ['admin', 'editor '] // or you can only set roles in sub nav
      }
    }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirct: '/product/index',
    alwaysShow: true,
    meta: {
      title: '商品管理',
      icon: 'el-icon-document',
      roles: ['admin']
    },
    children: [{
      path: 'category',
      component: () => import('@/views/product/category'),
      name: '商品类目',
      meta: {
        title: '商品类目',
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'brand',
      component: () => import('@/views/product/brand'),
      name: '品牌系列',
      meta: {
        title: '品牌系列',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'brand/add',
      component: () => import('@/views/product/brand/brandAdd'),
      name: '品牌系列',
      hidden: true,
      meta: {
        title: '品牌系列',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'spec',
      component: () => import('@/views/product/spec'),
      name: '规格列表',
      meta: {
        title: '规格列表',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'goods',
      component: () => import('@/views/product/goods'),
      name: '商品列表',
      meta: {
        title: '商品列表',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'goods/add',
      component: () => import('@/views/product/goods/GoodsAdd'),
      name: '商品新增',
      hidden: true,
      meta: {
        title: '商品新增',
        roles: ['admin', 'editor '] // or you can only set roles in sub nav
      }
    },
    {
      path: 'stock',
      component: () => import('@/views/product/stock'),
      name: '库存管理',
      meta: {
        title: '库存管理',
        // is_final: true,
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    }
    ]
  },
  {
    path: '/stock',
    component: Layout,
    name: '设置',
    meta: {
      title: '设置',
      icon: 'component'
    },
    children: [
      {
        path: 'areacode',
        component: () => import('@/views/setups/areacode'),
        name: '行政区划',
        meta: { title: '行政区划' }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
      { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
      { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'tab',
      meta: { title: 'tab', icon: 'tab', single: true }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
      { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
      { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
