<template>
    <div class="min-h-screen bg-gray-100">
      <!-- ヘッダーコンポーネント -->
      <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-3">
          <div class="flex justify-between items-center">
            <!-- ロゴ/サイト名 -->
            <NuxtLink to="/" class="text-xl font-bold text-gray-800">
              Shop App
            </NuxtLink>
  
            <!-- ナビゲーションメニュー -->
            <div class="flex items-center space-x-4">
              <NuxtLink 
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="text-gray-600 hover:text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
              
              <!-- ハンバーガーメニュー -->
              <div class="relative">
                <button 
                  @click="toggleMenu"
                  class="p-2 rounded-lg hover:bg-gray-100"
                >
                  <span class="sr-only">メニューを開く</span>
                  <i class="fas fa-bars"></i>
                </button>
  
                <!-- ドロップダウンメニュー -->
                <div 
                  v-if="isMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                >
                  <a 
                    href="#"
                    @click.prevent="showLogoutConfirm"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    ログアウト
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
  
      <!-- メインコンテンツ -->
      <main class="container mx-auto px-4 py-8">
        <slot />
      </main>
  
      <!-- ログアウトモーダル -->
      <div 
        v-if="showLogoutModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg p-6 max-w-sm w-full">
          <h3 class="text-lg font-semibold mb-4">ログアウトしますか？</h3>
          <div class="flex justify-end space-x-4">
            <button
              @click="closeLogoutModal"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              キャンセル
            </button>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Vueの機能をインポート
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // コンポーネントの定義
  export default {
    setup() {
      // リアクティブな状態の定義
      const isMenuOpen = ref(false)
      const showLogoutModal = ref(false)
      const router = useRouter()
  
      // ナビゲーションメニューの定義
      const menuItems = [
        { name: 'ホーム', path: '/' },
        { name: 'ショップ一覧', path: '/shops' },
        { name: 'クーポン一覧', path: '/coupons' }
      ]
  
      // メソッドの定義
      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
      }
  
      const showLogoutConfirm = () => {
        isMenuOpen.value = false
        showLogoutModal.value = true
      }
  
      const closeLogoutModal = () => {
        showLogoutModal.value = false
      }
  
      const logout = async () => {
        try {
          // ログアウト処理
          await fetch('/api/logout', { method: 'POST' })
          router.push('/login')
        } catch (error) {
          console.error('ログアウトに失敗しました:', error)
        }
        showLogoutModal.value = false
      }
  
      // 使用する値とメソッドを返す
      return {
        isMenuOpen,
        showLogoutModal,
        menuItems,
        toggleMenu,
        showLogoutConfirm,
        closeLogoutModal,
        logout
      }
    }
  }
  </script>