<template>
  <div
    v-if="blokData"
    :class="[
      !topOfPage && 'bg-white',
      topOfPage && isProductPage && 'invertedNav',
      'position-fixed w-100 z-50 nav-container'
    ]"
    style="flex-direction: column;"
  >
    <div class="desktopNav position-relative z-50">
      <div
        v-if="blokData.topBar && blokData.topBar.length"
        :class="BEM_E('topBar')"
      >
        <div class="col-12">
          <Btn
            :class="BEM_E('topBar-link')"
            v-for="(item, index) in blokData.topBar"
            :blok="item"
            v-bind:key="index"
          />
        </div>
      </div>
      <div class="container">
        <div class="row">
          <a
            v-if="blokData.variation === 'subnav'"
            @click="scrollToTop()"
            :class="BEM_E('to-top') + ' Btn Btn--outline-sm tooltip-balloon'"
            data-balloon="Back to top"
            data-balloon-pos="bottom"
          >↑</a>
          <JoinedNavItems
            v-if="blokData.variation === 'mainnav'"
            :items="blokData.NavItems"
          />
        </div>
      </div>
    </div>
    <div class="mobileNav position-relative">
      <div id="mobile-logo-white" class="text-center py-3">
        <a :href="blok.NavItems[0].HomeLink.cached_url">
          <svg
            width="115"
            height="25"
            viewBox="0 0 115 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M108.394 15.5625C107.633 15.0034 106.681 14.5375 105.444 14.0715C104.968 13.8851 104.492 13.7919 104.112 13.6988C103.445 13.5124 102.779 13.4192 102.208 13.1396C101.923 12.9533 101.352 12.7669 101.447 12.3009C101.542 11.7418 102.113 11.4622 102.399 11.369C104.207 10.7167 105.92 11.6486 106.776 12.3009C106.871 12.3941 107.062 12.3941 107.157 12.3941C107.347 12.3941 107.538 12.2077 107.728 12.0214L109.441 9.69166C109.631 9.50528 109.536 9.03934 109.346 8.85296C107.347 7.26876 104.683 6.61644 102.113 6.98919C99.734 7.36194 97.8307 8.66658 97.0694 10.5304C96.1177 12.7669 96.879 15.1898 98.9727 16.4944C100.02 17.1467 101.257 17.5195 102.494 17.7991L102.779 17.8922C103.255 17.9854 103.826 18.1718 104.302 18.265C104.683 18.3582 105.158 18.5446 105.444 18.9173C105.729 19.2901 105.634 19.5696 105.539 19.756C105.254 20.4083 104.016 20.6879 103.445 20.6879C102.018 20.6879 100.495 20.1288 98.9727 19.0105C98.8775 18.9173 98.7824 18.9173 98.6872 18.9173H98.592C98.4017 18.9173 98.2114 19.1037 98.1162 19.2901L96.4032 21.713C96.2129 21.8993 96.308 22.3653 96.4984 22.5517C98.7824 24.3222 101.542 25.1609 104.207 24.9746C106.3 24.7882 108.775 23.8563 109.917 21.6198C110.773 19.3833 110.202 16.9604 108.394 15.5625Z"
              fill="#1B51A3"
            />
            <path
              d="M74.515 0H71.089C70.8987 0 70.7084 0.0931885 70.518 0.186377C70.3277 0.372754 70.3277 0.465942 70.3277 0.745508V24.0426C70.3277 24.229 70.4229 24.4154 70.518 24.6018C70.7084 24.7881 70.8035 24.7881 71.089 24.7881H74.515C74.7053 24.7881 74.8957 24.6949 75.086 24.6018C75.2763 24.4154 75.2763 24.229 75.2763 24.0426V0.745508C75.2763 0.559131 75.1812 0.372754 75.086 0.279565C74.8957 0.0931885 74.7053 0 74.515 0Z"
              fill="#1B51A3"
            />
            <path
              d="M47.6782 0H44.2522C44.0619 0 43.8716 0.0931884 43.6812 0.186377C43.4909 0.372754 43.4909 0.465942 43.4909 0.745508V8.1074C42.1586 7.36189 40.6359 7.08232 39.0181 7.08232C36.4486 7.08232 34.1646 7.92102 32.3565 9.6916C30.5483 11.4622 29.5966 13.5123 29.5966 16.0284C29.5966 18.5445 30.5483 20.5947 32.3565 22.3652C34.1646 24.0426 36.3534 24.9745 39.0181 24.9745C40.6359 24.9745 42.1586 24.6018 43.4909 23.9494V24.229C43.4909 24.4154 43.5861 24.6018 43.6812 24.7881C43.7764 24.9745 43.9667 24.9745 44.2522 24.9745H47.6782C47.8685 24.9745 48.0589 24.8813 48.2492 24.7881C48.4395 24.6018 48.4395 24.4154 48.4395 24.229V0.931885C48.4395 0.745508 48.3444 0.559131 48.2492 0.465942C48.0589 0.0931885 47.8685 0 47.6782 0ZM42.1586 19.1036C41.3021 19.9423 40.2552 20.4083 39.0181 20.4083C37.7809 20.4083 36.7341 19.9423 35.8776 19.1036C35.0211 18.2649 34.6404 17.2399 34.6404 15.9352C34.6404 14.7238 35.0211 13.6055 35.8776 12.7668C36.7341 11.9281 37.7809 11.4622 39.0181 11.4622C40.2552 11.4622 41.3021 11.9281 42.1586 12.7668C43.0151 13.6055 43.3957 14.7238 43.3957 15.9352C43.3957 17.2399 43.0151 18.2649 42.1586 19.1036Z"
              fill="#1B51A3"
            />
            <path
              d="M86.3156 6.98901C81.2718 6.98901 77.1797 10.9961 77.1797 15.9351C77.1797 20.8741 81.2718 24.8812 86.3156 24.8812C91.3594 24.8812 95.4515 20.8741 95.4515 15.9351C95.3564 10.9961 91.2642 6.98901 86.3156 6.98901ZM86.3156 20.315C83.8413 20.315 81.7476 18.358 81.7476 15.8419C81.7476 13.419 83.7461 11.3689 86.3156 11.3689C88.7899 11.3689 90.8836 13.3258 90.8836 15.8419C90.7884 18.358 88.7899 20.315 86.3156 20.315Z"
              fill="#1B51A3"
            />
            <path
              d="M112.486 6.98901H111.154C111.059 6.98901 111.059 7.0822 111.059 7.0822V7.36177C111.059 7.45496 111.154 7.45496 111.154 7.45496H111.535V9.03916C111.535 9.13235 111.63 9.13235 111.63 9.13235H111.915C112.01 9.13235 112.01 9.03916 112.01 9.03916V7.54814H112.391C112.486 7.54814 112.486 7.45496 112.486 7.45496V7.17539C112.677 7.0822 112.581 6.98901 112.486 6.98901Z"
              fill="#1B51A3"
            />
            <path
              d="M114.865 6.98901H114.675C114.675 6.98901 114.58 6.98901 114.58 7.0822L113.914 8.10727L113.248 7.0822L113.152 6.98901H112.962C112.867 6.98901 112.867 7.0822 112.867 7.0822V9.03916C112.867 9.13235 112.962 9.13235 112.962 9.13235H113.248C113.343 9.13235 113.343 9.03916 113.343 9.03916V8.20046L113.723 8.75959L113.819 8.85278H114.009C114.009 8.85278 114.104 8.85278 114.104 8.75959L114.485 8.20046V9.03916C114.485 9.13235 114.58 9.13235 114.58 9.13235H114.865C114.961 9.13235 114.961 9.03916 114.961 9.03916V7.17539C115.056 7.0822 114.961 6.98901 114.865 6.98901Z"
              fill="#1B51A3"
            />
            <path
              d="M19.2235 15.8422C18.6525 17.24 16.9396 20.1288 13.3232 20.222C10.1828 20.222 7.80362 18.0787 7.23262 15.8422C7.13745 15.5626 6.94712 15.3762 6.56646 15.3762H0.666162C0.285498 15.3762 0 15.6558 0 16.0285C0.285498 19.9425 3.52114 24.9746 9.89727 24.9746C16.6541 24.9746 19.1284 19.1969 19.3187 15.9353C19.4139 15.8422 19.3187 15.749 19.2235 15.8422Z"
              fill="#1B51A3"
            />
            <path
              d="M16.5589 3.54126C9.8021 3.54126 7.32778 9.31894 7.13745 12.5805C7.13745 12.6737 7.23262 12.6737 7.32778 12.5805C7.89878 11.1827 9.61177 8.29387 13.2281 8.20068C16.3686 8.20068 18.7477 10.344 19.3187 12.5805C19.4139 12.8601 19.6042 13.0465 19.9849 13.0465H25.9803C26.361 13.0465 26.6465 12.7669 26.6465 12.3942C26.1707 8.48025 23.0302 3.54126 16.5589 3.54126Z"
              fill="#1B51A3"
            />
            <path
              d="M68.4244 18.2648C68.5195 17.8921 68.234 17.4261 67.7582 17.4261H64.3322C64.0467 17.4261 63.7612 17.6125 63.6661 17.8921C63.6661 17.8921 63.6661 17.9853 63.5709 17.9853C62.8096 19.3831 61.3821 20.315 59.5739 20.315C58.3368 20.315 57.1948 19.7558 56.3383 19.0103L58.4319 17.9853L67.1872 13.5122C67.7582 13.2326 68.0437 12.4871 67.7582 11.8348C66.2356 8.94597 63.1902 6.98901 59.6691 6.98901C54.6253 6.98901 50.5331 10.9961 50.5331 15.9351C50.5331 20.8741 54.6253 24.8812 59.6691 24.8812C63.7612 24.8812 67.2824 22.0855 68.4244 18.2648ZM59.5739 11.4621C60.4304 11.4621 61.1917 11.7416 61.8579 12.1144L55.1011 15.5624C55.2914 13.2326 57.1948 11.4621 59.5739 11.4621Z"
              fill="#1B51A3"
            /></svg
        ></a>
      </div>
      <div
        @click="mobileNavOpen = !mobileNavOpen"
        class="d-flex h-100 position-absolute"
        style="right: 0; top: 0;"
      >
        <svg
          class="text-blue-50 mr-3"
          style="width: 30px; cursor: pointer;"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
    <div
      id="mobile-sliding-nav-wrapper"
      :class="[
        mobileNavOpen ? 'slide-in' : 'slide-out',
        'mobileNav text-white position-fixed w-100'
      ]"
      style="height: 100%; right: 0; top: 0; z-index: 100;"
    >
      <div
        id="mobile-nav-wrapper"
        :class="[mobileNavOpen ? 'slide-in' : 'slide-out']"
        class="mobile-container bg-blue5000 pt-3 ml-auto position-relative"
      >
        <div
          @click="collapseAllSubNavChildren()"
          class="d-flex position-absolute"
          style="height: 30px; right: 10px; top: 17px;"
        >
          <svg
            style="width: 30px; cursor: pointer;"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div id="mobile-logo" class="text-center">
          <a href="/">
            <svg
              width="115"
              height="25"
              viewBox="0 0 111 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M104.058 14.94C103.328 14.4032 102.414 13.9559 101.226 13.5086C100.769 13.3297 100.313 13.2402 99.9472 13.1508C99.3077 12.9719 98.6682 12.8824 98.12 12.614C97.846 12.4351 97.2978 12.2562 97.3892 11.8089C97.4805 11.2721 98.0287 11.0037 98.3028 10.9143C100.039 10.288 101.683 11.1826 102.505 11.8089C102.597 11.8983 102.779 11.8983 102.871 11.8983C103.053 11.8983 103.236 11.7194 103.419 11.5405L105.063 9.30396C105.246 9.12503 105.155 8.67773 104.972 8.49881C103.053 6.97797 100.495 6.35174 98.0287 6.70959C95.7447 7.06743 93.9175 8.31989 93.1866 10.1091C92.273 12.2562 93.0039 14.5821 95.0138 15.8346C96.0188 16.4608 97.2064 16.8187 98.3941 17.0871L98.6682 17.1765C99.125 17.266 99.6731 17.4449 100.13 17.5344C100.495 17.6238 100.952 17.8027 101.226 18.1606C101.5 18.5184 101.409 18.7868 101.318 18.9657C101.044 19.592 99.8559 19.8603 99.3077 19.8603C97.9373 19.8603 96.4756 19.3236 95.0138 18.25C94.9225 18.1606 94.8311 18.1606 94.7397 18.1606H94.6484C94.4657 18.1606 94.2829 18.3395 94.1916 18.5184L92.5471 20.8444C92.3644 21.0233 92.4557 21.4706 92.6385 21.6496C94.8311 23.3493 97.4805 24.1545 100.039 23.9755C102.048 23.7966 104.424 22.902 105.52 20.755C106.342 18.6079 105.794 16.2819 104.058 14.94Z"
                fill="white"
              />
              <path
                d="M71.5345 0H68.2455C68.0628 0 67.8801 0.0894609 67.6974 0.178922C67.5147 0.357844 67.5146 0.447305 67.5146 0.715688V23.0809C67.5146 23.2598 67.606 23.4388 67.6974 23.6177C67.8801 23.7966 67.9714 23.7966 68.2455 23.7966H71.5345C71.7172 23.7966 71.8999 23.7071 72.0826 23.6177C72.2653 23.4388 72.2653 23.2598 72.2653 23.0809V0.715688C72.2653 0.536766 72.174 0.357844 72.0826 0.268383C71.8999 0.0894609 71.7172 0 71.5345 0Z"
                fill="white"
              />
              <path
                d="M45.7711 0H42.4822C42.2995 0 42.1168 0.0894609 41.934 0.178922C41.7513 0.357844 41.7513 0.447305 41.7513 0.715687V7.7831C40.4723 7.06741 39.0105 6.79903 37.4574 6.79903C34.9907 6.79903 32.7981 7.60418 31.0623 9.30394C29.3264 11.0037 28.4128 12.9718 28.4128 15.3873C28.4128 17.8027 29.3264 19.7709 31.0623 21.4706C32.7981 23.0809 34.8994 23.9755 37.4574 23.9755C39.0105 23.9755 40.4723 23.6177 41.7513 22.9915V23.2598C41.7513 23.4388 41.8427 23.6177 41.934 23.7966C42.0254 23.9755 42.2081 23.9755 42.4822 23.9755H45.7711C45.9539 23.9755 46.1366 23.8861 46.3193 23.7966C46.502 23.6177 46.502 23.4388 46.502 23.2598V0.894609C46.502 0.715687 46.4107 0.536766 46.3193 0.447305C46.1366 0.089461 45.9539 0 45.7711 0ZM40.4723 18.3395C39.6501 19.1446 38.6451 19.5919 37.4574 19.5919C36.2698 19.5919 35.2648 19.1446 34.4426 18.3395C33.6203 17.5343 33.2549 16.5503 33.2549 15.2978C33.2549 14.1348 33.6203 13.0613 34.4426 12.2561C35.2648 11.451 36.2698 11.0037 37.4574 11.0037C38.6451 11.0037 39.6501 11.451 40.4723 12.2561C41.2945 13.0613 41.66 14.1348 41.66 15.2978C41.66 16.5503 41.2945 17.5343 40.4723 18.3395Z"
                fill="white"
              />
              <path
                d="M82.863 6.70959C78.021 6.70959 74.0925 10.5564 74.0925 15.2978C74.0925 20.0393 78.021 23.8861 82.863 23.8861C87.7051 23.8861 91.6335 20.0393 91.6335 15.2978C91.5422 10.5564 87.6137 6.70959 82.863 6.70959ZM82.863 19.5025C80.4877 19.5025 78.4778 17.6238 78.4778 15.2084C78.4778 12.8824 80.3963 10.9143 82.863 10.9143C85.2384 10.9143 87.2483 12.7929 87.2483 15.2084C87.1569 17.6238 85.2384 19.5025 82.863 19.5025Z"
                fill="white"
              />
              <path
                d="M107.987 6.70959H106.708C106.616 6.70959 106.616 6.79906 106.616 6.79906V7.06744C106.616 7.1569 106.708 7.1569 106.708 7.1569H107.073V8.67773C107.073 8.7672 107.165 8.7672 107.165 8.7672H107.439C107.53 8.7672 107.53 8.67773 107.53 8.67773V7.24636H107.895C107.987 7.24636 107.987 7.1569 107.987 7.1569V6.88852C108.17 6.79906 108.078 6.70959 107.987 6.70959Z"
                fill="white"
              />
              <path
                d="M110.271 6.70959H110.088C110.088 6.70959 109.997 6.7096 109.997 6.79906L109.357 7.78312L108.718 6.79906L108.626 6.70959H108.444C108.352 6.70959 108.352 6.79906 108.352 6.79906V8.67773C108.352 8.76719 108.444 8.76719 108.444 8.76719H108.718C108.809 8.76719 108.809 8.67773 108.809 8.67773V7.87259L109.175 8.40935L109.266 8.49881H109.449C109.449 8.49881 109.54 8.49881 109.54 8.40935L109.905 7.87259V8.67773C109.905 8.76719 109.997 8.76719 109.997 8.76719H110.271C110.362 8.76719 110.362 8.67773 110.362 8.67773V6.88852C110.454 6.79906 110.362 6.70959 110.271 6.70959Z"
                fill="white"
              />
              <path
                d="M18.4546 15.2084C17.9064 16.5503 16.262 19.3236 12.7903 19.4131C9.77546 19.4131 7.49147 17.3555 6.94332 15.2084C6.85196 14.94 6.66924 14.7611 6.3038 14.7611H0.639516C0.274078 14.7611 0 15.0295 0 15.3873C0.274078 19.1447 3.3803 23.9756 9.50138 23.9756C15.9879 23.9756 18.3632 18.429 18.546 15.2979C18.6373 15.2084 18.546 15.119 18.4546 15.2084Z"
                fill="white"
              />
              <path
                d="M15.8966 3.39954C9.41012 3.39954 7.03477 8.94611 6.85205 12.0772C6.85205 12.1667 6.94341 12.1667 7.03477 12.0772C7.58293 10.7353 9.2274 7.96204 12.6991 7.87258C15.7139 7.87258 17.9979 9.93018 18.5461 12.0772C18.6374 12.3456 18.8201 12.5246 19.1856 12.5246H24.9412C25.3067 12.5246 25.5807 12.2562 25.5807 11.8983C25.1239 8.14097 22.1091 3.39954 15.8966 3.39954Z"
                fill="white"
              />
              <path
                d="M65.6873 17.5344C65.7787 17.1765 65.5046 16.7292 65.0478 16.7292H61.7588C61.4848 16.7292 61.2107 16.9081 61.1193 17.1765C61.1193 17.1765 61.1193 17.266 61.028 17.266C60.2971 18.6079 58.9267 19.5025 57.1909 19.5025C56.0032 19.5025 54.9069 18.9657 54.0846 18.2501L56.0946 17.266L64.4996 12.9719C65.0478 12.7035 65.3219 11.9878 65.0478 11.3616C63.586 8.58827 60.6625 6.70959 57.2822 6.70959C52.4402 6.70959 48.5117 10.5564 48.5117 15.2978C48.5117 20.0393 52.4402 23.8861 57.2822 23.8861C61.2107 23.8861 64.591 21.2023 65.6873 17.5344ZM57.1909 11.0037C58.0131 11.0037 58.744 11.2721 59.3835 11.6299L52.897 14.94C53.0797 12.7035 54.9069 11.0037 57.1909 11.0037Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <div
          id="side-nav-wrapper"
          :class="[currentActiveSubNavChild === -1 ? 'slide-in' : 'slide-out']"
        >
          <div v-for="(item, index) in blokData.NavItems" :key="index">
            <div
              v-if="
                item &&
                  item.subitems &&
                  item.subitems.length > 0 &&
                  item.classes !== 'language'
              "
              class="mb-4"
            >
              <div
                @click="toggleSubNavChild(index - 1)"
                class="mobile-nav-item d-flex w-100 justify-content-between"
              >
                <h3>{{ item.link[0].linkLabel }}</h3>
                <div class="navigation-collapse-arrow">
                  <svg
                    style="width: 30px; color: #fff;"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <div
                ref="sideNav-children-wrapper"
                v-if="item.subitems && item.subitems.length"
                class="sideNav-children-wrapper slide-out"
              >
                <a
                  @click="collapseSubNavChild(index - 1)"
                  class="sideNav-child-collapse"
                  href="javascript:void(0)"
                >
                  <span class="nav-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">

                      <path
                        d="M16 19L23 12L16 5"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    </svg>

                  </span>
                  back
                </a>
                <h4
                  v-html="item.link[0].linkLabel"
                  class="sideNav-child-header"
                />
                <h5
                  v-for="(sub_item, sub_index) in item.subitems"
                  :key="sub_index"
                  class="text-white mt-2"
                  style="text-transform: uppercase !important; opacity: .75;"
                >
                  <a
                    v-if="sub_item.link.url"
                    :href="sub_item.link.url"
                    target="_blank"
                  >
                    {{ sub_item.linkLabel }}
                  </a>
                  <nuxt-link
                    v-else
                    :to="`/${sub_item.link.cached_url}/`"
                    @click.native="mobileNavOpen = false"
                  >
                    {{ sub_item.linkLabel }}
                    <span
                      v-if="item.showMobileLinkCaption && sub_item.linkCaption"
                      v-html="sub_item.linkCaption"
                      class="link-caption"
                    />
                  </nuxt-link>
                </h5>
              </div>
            </div>
            <div v-else-if="item.link && item.link[0]" class="mobile-nav-item">
              <h3 class="mb-4">
                <a
                  v-html="item.link[0].linkLabel"
                  :href="item.link[0].link.cached_url"
                  :target="item.link[0].targetBlank ? '_blank' : null"
                />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JoinedNavItems from './JoinedNavItems'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  components: {
    JoinedNavItems
  },

  extends: BaseComponent,

  props: {
    name: {
      type: String,
      default: 'Navigation'
    },
    blok: Object
  },

  data() {
    return {
      openNav: false,
      mobileNavOpen: false,
      visible: false,
      blokData: null,
      topOfPage: true,
      currentActiveSubNavChild: -1
    }
  },

  mounted() {
    this.blokData = { ...this.blok }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    isProductPage() {
      // excluding specific page that SG asked for
      return (
        (
          this.$route.path.includes('products/') ||
          this.$route.path.includes('campaigns/') ||
          this.$route.path.includes('/campaigns/thankyou/')
        ) &&
        !this.$route.path.includes('products/advanced-air-standalone')
      )
    },
    lang() {
      return this.$route.fullPath.split('/')[1]
    },
    homeLink() {
      let base =
        process.env.NODE_ENV == 'production' ? this.MAIN_URL : this.BASE_URL
      let lang =
        this.$store.state.language !== 'en'
          ? '/' + this.$store.state.language
          : ''

      let fullLink = base

      if (this.blok && this.blok.variation == 'subnav') {
        let url = this.blok.homeLink.cached_url
        fullLink += url.startsWith(lang) ? url : lang + url
        return fullLink
      } else {
        return base + lang + '/'
      }

      return base + lang
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      // console.log(window.scrollY)
      if (window.scrollY === 0) {
        this.topOfPage = true
      } else {
        this.topOfPage = false
      }
    },
    toggleSubNavChild(idx) {
      if (idx === this.currentActiveSubNavChild) {
        this.currentActiveSubNavChild = -1
        this.$refs['sideNav-children-wrapper'][idx].classList.add('slide-out')
        this.$refs['sideNav-children-wrapper'][idx].classList.remove('slide-in')
      } else {
        this.$refs['sideNav-children-wrapper'][idx].classList.add('slide-in')
        this.$refs['sideNav-children-wrapper'][idx].classList.remove(
          'slide-out'
        )
        this.currentActiveSubNavChild = idx
      }
    },
    collapseSubNavChild(idx) {
      this.$refs['sideNav-children-wrapper'][idx].classList.add('slide-out')
      this.$refs['sideNav-children-wrapper'][idx].classList.remove('slide-in')
      this.currentActiveSubNavChild = -1
    },
    collapseAllSubNavChildren() {
      this.mobileNavOpen = !this.mobileNavOpen

      if (
        this.$refs['sideNav-children-wrapper'][this.currentActiveSubNavChild]
      ) {
        this.$refs['sideNav-children-wrapper'][
          this.currentActiveSubNavChild
        ].classList.remove('slide-in')
        this.$refs['sideNav-children-wrapper'][
          this.currentActiveSubNavChild
        ].classList.add('slide-out')
        this.currentActiveSubNavChild = -1
      }
    },
    collapseAll() {
      for (let i = 0; this.blokData.NavItems.length - 1; i++) {
        // console.log(this.blokData.NavItems[i])
        // this.blokData.NavItems[i].visible = false
      }
    },
    toggleNav() {
      this.openNav = !this.openNav
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style lang="scss">
.mobile-nav-item {
  cursor: pointer;
  &:hover {
    h3, a {
      color: gray;
    }
  }
  h3, a {
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
}

.text-blue-50 {
  color: #1b51a3 !important;
}

.desktopNav {
  display: none;
  padding-top: 30px;
  padding-bottom: 30px;
}

.nav-container {
  // --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  // box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

//.mobile-container{
//  width: 90vw;
//}

@media (min-width: 1050px) {
  .mobileNav {
    display: none !important;
  }
  .desktopNav {
    display: flex;
  }
}

.invertedNav .JoinedNav .nav-item {
  color: white !important;
}

@media (max-width: 1050px) {
  .invertedNav {
    background: white;
  }
}
</style>

<style lang="scss" scoped>
#mobile-logo-white {

  @media(max-width: 767px) {
    padding-left: 15px;
    text-align: left !important;
  }
}

#mobile-nav-wrapper {
  padding-left: 28px;
  width: 55vw;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #091F40;

  @media(max-width: 767px) {
    width: 90vw;
  }

  #mobile-logo {
    width: 55vw;

    a {
      margin-left: -28px;
    }

    @media(max-width: 767px) {
      width: 90vw;
      text-align: left !important;

      a {
        margin-left: 0;
        padding-left: 7vw;
      }
    }
  }

  .navigation-collapse-arrow {
    padding-right: 28px;
    align-self: center;
  }

  .text-center a svg {
    margin-left: -28px;
  }
}

#mobile-sliding-nav-wrapper {
  width: 100vw;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  -webkit-transition: transform 0.25s;
  transition: transform 0.25s;
  position: absolute;

  &.slide-in {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
  &.slide-out {
    -webkit-transform: translateX(100vw);
    transform: translateX(100vw);
  }
}

#side-nav-wrapper {
  margin-top: 72px;
  position: relative;

  -webkit-transition: transform 0.25s;
  transition: transform 0.25s;

  &.slide-in {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
  &.slide-out {
    -webkit-transform: translateX(-100vw);
    transform: translateX(-100vw);
  }

  .sideNav-children-wrapper {
    position: absolute;
    top: 0;
    //right: -100vw;
    width: 90vw;
    height: 100vw;
    background-color: #091f40;
    -webkit-transition: transform 0.25s;
    transition: transform 0.25s;

    &.slide-in {
      -webkit-transform: translateX(100vw);
      transform: translateX(100vw);
    }
    &.slide-out {
      -webkit-transform: translateX(200vw);
      transform: translateX(200vw);
    }

    a.sideNav-child-collapse {
      display: inline-block;
      margin-bottom: 24px;
      color: #fff;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 125%;
      letter-spacing: 1.5px;
      text-transform: uppercase;

      span.nav-icon svg {
        transform: rotate(180deg);
        color: #fff !important;
        position: relative;
        top: -2px;
      }
    }

    h4.sideNav-child-header {
      max-width: 80vw;
      word-break: break-word;
      margin-bottom: 28px;
      color: white;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    h5 {
      margin-bottom: 18px;
      max-width: 80vw;

      a {
        word-break: break-word;
        color: #fff;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 25px;
        letter-spacing: 0.25px;
        text-transform: none;

        span.link-caption {
          display: block;
          font-size: 16px;
          line-height: 29px;
          font-weight: normal;
          text-transform: none;
        }
      }
    }
  }
}
</style>
