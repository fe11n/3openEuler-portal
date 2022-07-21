<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import HeaderNav from './HeaderNav.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';

import SearchIcon from '~icons/app/search.svg';
import XIcon from '~icons/app/x.svg';
import MenuIcon from '~icons/app/menu.svg';

const router = useRouter();
const configData = useData();
const { theme: i18n } = useData();
const language = configData.lang;

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  CHILDREN: NavItem;
  IS_OPEN_WINDOW?: Number;
  IS_OPEN_MINISITE_WINDOW?: string;
}

// 导航列表
const navItems = computed(() => {
  return [
    {
      id: 'download',
      label: i18n.value.common.NAV_ROUTER.DOWNLOAD,
      path: 'download',
      children: [
        {
          id: 'iso',
          label: i18n.value.common.NAV_ROUTER.ISO,
          path: 'download',
        },
        {
          id: 'mirror',
          label: i18n.value.common.NAV_ROUTER.MIRRORLIST,
          path: 'mirror',
        },
      ],
    },
    {
      id: 'learn',
      label: i18n.value.common.NAV_ROUTER.LEARNING,
      path: 'learn',
      children: [
        {
          id: 'docs',
          label: i18n.value.common.NAV_ROUTER.DOCS,
          path: '',
        },
        {
          id: 'mooc',
          label: i18n.value.common.NAV_ROUTER.MOOC,
          path: 'learning/mooc',
        },
        {
          id: 'internship',
          label: i18n.value.common.NAV_ROUTER.INTERNSHIP,
          path: 'learning/internship',
        },
      ],
    },
    {
      id: 'interaction',
      label: i18n.value.common.NAV_ROUTER.CONNECT,
      path: '',
      children: [
        {
          id: 'news',
          label: i18n.value.common.NAV_ROUTER.NEWS,
          path: 'interaction/news-list',
        },
        {
          id: 'blog',
          label: i18n.value.common.NAV_ROUTER.BLOG,
          path: 'interaction/blog-list',
        },
        {
          id: 'live',
          label: i18n.value.common.NAV_ROUTER.LIVE,
          path: 'interaction/live-list',
        },
        {
          id: 'salon',
          label: i18n.value.common.NAV_ROUTER.SALON,
          path: 'interaction/salon-list',
        },
        {
          id: 'summit',
          label: i18n.value.common.NAV_ROUTER.SUMMIT,
          path: 'interaction/summit-list',
        },
      ],
    },
    {
      id: 'community',
      label: i18n.value.common.NAV_ROUTER.COMMUNITY,
      path: '',
      children: [
        {
          id: 'contribution',
          label: i18n.value.common.NAV_ROUTER.CONTRIBUTION,
          path: 'community/contribution',
        },
        {
          id: 'conduct',
          label: i18n.value.common.NAV_ROUTER.CONVENTION,
          path: 'community/conduct',
        },
        {
          id: 'events',
          label: i18n.value.common.NAV_ROUTER.MAILINGLIST,
          path: 'community/mailing-list',
        },
        {
          id: 'certification',
          label: i18n.value.common.NAV_ROUTER.CERTIFICATION,
          path: 'community/certification-services',
        },
        {
          id: 'talent',
          label: i18n.value.common.NAV_ROUTER.TALENT,
          path: 'https://training-assessment.osinfra.cn/login/index?sxz-lang=zh_CN',
        },
        {
          id: 'statistics',
          label: i18n.value.common.NAV_ROUTER.STATISTICS,
          path: 'https://datastat.openeuler.org/en/overview',
        },
      ],
    },
    {
      id: 'sig',
      label: i18n.value.common.NAV_ROUTER.SIG,
      path: '',
      children: [
        {
          id: 'siglist',
          label: i18n.value.common.NAV_ROUTER.SIGLIST,
          path: 'sig/sig-list',
        },
        {
          id: 'guidance',
          label: i18n.value.common.NAV_ROUTER.APPLICATION,
          path: 'sig/sig-guidance',
        },
        {
          id: 'role',
          label: i18n.value.common.NAV_ROUTER.ROLES,
          path: 'sig/role-description',
        },
        {
          id: 'meeting',
          label: i18n.value.common.NAV_ROUTER.MEETINGGUIDE,
          path: 'sig/meeting-guide',
        },
      ],
    },
    {
      id: 'projects',
      label: i18n.value.common.NAV_ROUTER.DISCOVERY,
      path: 'other/projects',
      children: [
        {
          id: 'atune',
          label: i18n.value.common.NAV_ROUTER.ATUNE,
          path: 'other/projects/atune',
        },
        {
          id: 'bishengjdk',
          label: i18n.value.common.NAV_ROUTER.BISHENGJDK,
          path: 'other/projects/bishengjdk',
        },
        {
          id: 'isula',
          label: i18n.value.common.NAV_ROUTER.ISULA,
          path: 'other/projects/isula',
        },
        {
          id: 'secgear',
          label: i18n.value.common.NAV_ROUTER.SECGEAR,
          path: 'other/projects/secgear',
        },
        {
          id: 'compassci',
          label: i18n.value.common.NAV_ROUTER.COMPASSCI,
          path: 'https://compass-ci.openeuler.org',
        },
        {
          id: 'compliance',
          label: i18n.value.common.NAV_ROUTER.COMPLIANCE,
          path: 'https://compliance.openeuler.org',
        },
        {
          id: 'pkgmanage',
          label: i18n.value.common.NAV_ROUTER.PKGSHIP,
          path: 'https://pkgmanage.openeuler.org',
        },
      ],
    },
    {
      id: 'security',
      label: i18n.value.common.NAV_ROUTER.SUPPORT,
      path: '',
      children: [
        {
          id: 'vulnerability-reporting',
          label: i18n.value.common.NAV_ROUTER.VULNERABILITY,
          path: 'security/vulnerability-reporting',
        },
        {
          id: 'safety-bulletin',
          label: i18n.value.common.NAV_ROUTER.SAFETY,
          path: 'security/safety-bulletin',
        },
        {
          id: 'cve',
          label: i18n.value.common.NAV_ROUTER.CVE,
          path: 'security/cve/',
        },
        {
          id: 'approve',
          label: i18n.value.common.NAV_ROUTER.APPROVE,
          path: 'approve/',
        },
        {
          id: 'compliance',
          label: i18n.value.common.NAV_ROUTER.COMPATIBILITY_EVALUATION,
          path: '',
        },
        {
          id: 'compatibility',
          label: i18n.value.common.NAV_ROUTER.COMPATIBILITY,
          path: 'compatibility/',
        },
      ],
    },
  ];
});

const navRouter = computed(() => {
  return i18n.value.common.NAV_ROUTER_CONFIG;
});

const activeNav = ref<string>();
const handleNavClick = (item: NavItem) => {
  activeNav.value = item.PATH;
};

// 移动端
const isPC = ref(true);
const mobileMenuIcon = ref(false);
const handleLanguageChange = () => {
  mobileMenuIcon.value = false;
};

//移动端菜单事件
const mobileMenuPanel = () => {
  const documentElement = document.documentElement;
  documentElement.classList.toggle('overflow');
  mobileMenuIcon.value = !mobileMenuIcon.value;
  mobileChildMenu.value = [];
  activeNav.value = '';
  isPC.value = false;
};

const mobileChildMenu = ref<NavItem | any>([]);
const handleMenuLayer = (e: any) => {
  const documentElement = document.documentElement;
  if (e.target.className !== 'mobile-menu-side') {
    if (mobileChildMenu.value.length === 0) {
      mobileMenuIcon.value = false;
      documentElement.classList.remove('overflow');
    }
  }
};

const goMobile = (item: NavItem) => {
  if (item.hasOwnProperty('CHILDREN')) {
    mobileChildMenu.value = item.CHILDREN;
  } else {
    mobileChildMenu.value = [];
    mobileMenuIcon.value = false;

    router.go(language.value + item.PATH);
    document.documentElement.classList.remove('overflow');
  }
  activeNav.value = item.ID;
};

const goMobileList = (item: NavItem) => {
  mobileMenuIcon.value = false;
  document.documentElement.classList.remove('overflow');

  if (item.IS_OPEN_WINDOW) {
    window.open(i18n.value.docsUrl + item.PATH);
    return;
  }
  if (item.IS_OPEN_MINISITE_WINDOW) {
    window.open(item.PATH);
    return;
  }
  if (item.PATH) {
    router.go(language.value + item.PATH);
  }
};

const toBody = ref(false);
onMounted(() => {
  toBody.value = true;
});
onUnmounted(() => {
  toBody.value = false;
});

// 返回首页
const goHome = () => {
  router.go(language.value + '/');
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单图标 -->
      <div class="mobile-menu-icon" @click="mobileMenuPanel">
        <OIcon v-if="!mobileMenuIcon" class="icon">
          <MenuIcon />
        </OIcon>
        <OIcon v-else class="icon"><XIcon /></OIcon>
      </div>
      <img
        class="logo"
        alt="openEuler logo"
        @click="goHome"
        src="../assets/logo.png"
      />
      <div class="header-content">
        <div class="header-nav">
          <HeaderNav :nav-items="navRouter" @nav-click="handleNavClick" />
        </div>
        <div class="header-tool">
          <div class="header-tool-search">
            <OIcon class="icon"><SearchIcon /></OIcon>
          </div>
          <!-- 中英文切换 -->
          <AppLanguage :device="isPC" />
          <AppTheme :device="isPC" />
        </div>
      </div>
      <!-- 移动端菜单 -->
      <teleport v-if="toBody" to="body">
        <div
          class="mobile-menu"
          :class="{ active: mobileMenuIcon }"
          @click="handleMenuLayer($event)"
        >
          <div class="mobile-menu-side">
            <div class="mobile-nav">
              <a
                v-for="item in navRouter"
                :key="item.ID"
                class="link"
                :class="[activeNav === item.ID ? 'active' : '']"
                @click.stop="goMobile(item)"
                >{{ item.NAME }}</a
              >
            </div>
            <div class="mobile-tools">
              <AppTheme :device="isPC" />
              <AppLanguage
                :device="isPC"
                @language-click="handleLanguageChange"
              />
            </div>
          </div>
          <div
            class="mobile-menu-content"
            :class="{ active: mobileChildMenu.length > 0 }"
          >
            <div class="mobile-menu-list">
              <a
                v-for="item in mobileChildMenu"
                :key="item.ID"
                class="link"
                @click="goMobileList(item)"
                >{{ item.NAME }}</a
              >
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: var(--o-color-bg);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  &-body {
    display: flex;
    align-items: center;
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 80px;

    @media (max-width: 1100px) {
      padding: 0 16px;
      height: 48px;
    }
  }
}
.logo {
  height: 32px;
  cursor: pointer;
  @media (max-width: 1100px) {
    height: 24px;
  }
}
.mobile-menu-icon {
  display: none;
  margin-right: var(--o-spacing-h5);
  @media (max-width: 1100px) {
    display: block;
  }
  .icon {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text2);
    cursor: pointer;
  }
}
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .header-nav {
    height: 100%;
    display: flex;
    flex: 1;
  }

  .header-tool {
    display: grid;
    gap: 20px;
    grid-template-columns: auto auto auto;
    align-items: center;
    height: 100%;
    .lang {
      color: var(--o-color-text2);
      letter-spacing: 0.08em;
      font-size: 16px;
    }
    &-search {
      cursor: pointer;
    }
    &-theme {
      cursor: pointer;
    }
  }
  .icon {
    font-size: 22px;
    color: var(--o-color-text2);
  }
}

.mobile-menu {
  width: 100%;
  position: fixed;
  left: 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  opacity: 0;
  visibility: hidden;
  border-top: 1px solid var(--o-color-division);
  background: rgba(0, 0, 0, 0.4);
  top: 48px;
  height: calc(100% - 48px);

  @media screen and (min-width: 1100px) {
    display: none;
  }

  &.active {
    opacity: 1;
    z-index: 111;
    display: flex;
    visibility: visible;
    @media screen and (min-width: 1100px) {
      opacity: 0;
    }

    .mobile-menu-side {
      left: 0;
      opacity: 1;
      z-index: 9;
    }
  }
  &-side {
    left: -100%;
    background: var(--o-color-bg2);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--o-color-text2);
    min-width: 164px;
    opacity: 0;
    position: relative;
    transition: all 0.4s linear;
    overflow-y: auto;
    justify-content: space-between;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #afbfe8;
    }

    .mobile-nav {
      .link {
        display: block;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text2);
        padding: 0 var(--o-spacing-h5);
        position: relative;
        cursor: pointer;
        &::after {
          width: 0;
          height: 2px;
          background: transparent;
          content: '';
          position: absolute;
          left: 16px;
          display: block;
          transition: all 0.3s;
          bottom: 0;
        }
        &.active {
          background: var(--o-color-bg);
          color: var(--o-color-brand);
          &::after {
            width: 24px;
            background: var(--o-color-text2);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--o-spacing-h5);
      margin-bottom: 24px;
    }
    .el-switch {
      &__label {
        color: var(--o-color-text3) !important;
      }
      &__label.is-active {
        color: var(--o-color-text2) !important;
        font-weight: 600;
      }
    }
  }
  &-content {
    flex: 1;
    background: var(--o-color-bg);
    left: -100%;
    position: relative;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    .mobile-menu-list {
      display: grid;
      padding: 0 16px;
      .link {
        line-height: var(--o-line-height-h3);
        font-size: var(--o-font-size-tip);
        font-weight: normal;
        color: var(--o-color-text3);
        cursor: pointer;
        &:last-child {
          border-bottom: 1px solid var(--o-color-division);
        }
      }
    }
    &.active {
      left: 0;
      opacity: 1;
      z-index: 8;
    }
  }
}
</style>