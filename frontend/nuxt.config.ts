// nuxt.config.ts
export default defineNuxtConfig({
  // ビルドモジュール
  modules: [
    '@nuxtjs/tailwindcss',
    '@bootstrap-vue-next/nuxt'
  ],

  // アプリケーション設定
  app: {
    head: {
      title: 'Shop & Coupon App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // CSS設定
  css: [
    '~/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.css'
  ],

  // 開発サーバー設定
  devServer: {
    port: 3000
  }
})