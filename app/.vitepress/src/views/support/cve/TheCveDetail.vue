<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { getCveDetail, getAffectedProduct } from '@/api/api-security';
import type {
  CveDetailCvss,
  AffectProduct,
} from '@/shared/@types/type-support';

import AppContent from '@/components/AppContent.vue';

import IconChevron from '~icons/app/icon-chevron-right.svg';

const { lang } = useData();
const i18n = useI18n();
const router = useRouter();

const cveDetailData = ref<CveDetailCvss>();
const affectedProductList = ref<AffectProduct[]>([]);
const cvssList: any = ref([]);

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function goDetail(id: string) {
  const url = router.route.path.replace('cve', 'security-bulletins');
  router.go(url + `?id=${id}`);
}

function jumpBulletinDetail(val: any) {
  router.go(`/${lang.value}/security/security-bulletins/detail/?id=${val}`);
}

onMounted(() => {
  const i1 = window.location.href.indexOf('=');
  const i2 = window.location.href.lastIndexOf('&');
  const i3 = window.location.href.lastIndexOf('=');
  const cveId = window.location.href.substring(i1 + 1, i2);
  const packageName = window.location.href.substring(i3 + 1);

  try {
    getCveDetail(cveId, packageName).then((res: any) => {
      cveDetailData.value = res.result;
      cvssList.value = [
        {
          cate: 'CVSS评分',
          NVD: cveDetailData.value?.cvsssCoreNVD,
          openEuler: cveDetailData.value?.cvsssCoreOE,
        },
        {
          cate: 'Attack Vector',
          NVD: cveDetailData.value?.attackVectorNVD,
          openEuler: cveDetailData.value?.attackVectorOE,
        },
        {
          cate: 'Attack Complexity',
          NVD: cveDetailData.value?.attackComplexityNVD,
          openEuler: cveDetailData.value?.attackComplexityOE,
        },
        {
          cate: 'Privileges Required',
          NVD: cveDetailData.value?.privilegesRequiredNVD,
          openEuler: cveDetailData.value?.privilegesRequiredOE,
        },
        {
          cate: 'User Interaction',
          NVD: cveDetailData.value?.userInteractionNVD,
          openEuler: cveDetailData.value?.userInteractionOE,
        },
        {
          cate: 'Scope',
          NVD: cveDetailData.value?.scopeNVD,
          openEuler: cveDetailData.value?.scopeOE,
        },
        {
          cate: 'Confidentiality',
          NVD: cveDetailData.value?.confidentialityNVD,
          openEuler: cveDetailData.value?.confidentialityOE,
        },
        {
          cate: 'Integrity',
          NVD: cveDetailData.value?.integrityNVD,
          openEuler: cveDetailData.value?.integrityOE,
        },
        {
          cate: 'Availability',
          NVD: cveDetailData.value?.availabilityNVD,
          openEuler: cveDetailData.value?.availabilityOE,
        },
      ];
    });
  } catch (e: any) {
    throw new Error(e);
  }

  try {
    getAffectedProduct(cveId, packageName).then((res: any) => {
      affectedProductList.value = res.result;
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.cve.CVE }}
      </p>
      <span class="separtor"
        ><o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">{{ i18n.cve.CVE_DETAIL }}</p>
    </div>
    <div class="cve-head">
      <p class="cve-name">{{ cveDetailData?.cveId }}</p>
      <div class="cve-intro">
        <div>
          <span>{{ i18n.cve.RELEASE_DATE }}:</span>
          <p>{{ cveDetailData?.announcementTime }}</p>
        </div>
        <div>
          <span>{{ i18n.cve.MODIFIED_TIME }}: </span>
          <p>{{ cveDetailData?.updateTime }}</p>
        </div>
      </div>
    </div>
    <div class="cve-detail-body">
      <div class="detail-item">
        <h2 class="detail-item-title">{{ i18n.cve.SYNOPSIS }}</h2>
        <p class="detail-item-content">
          {{ cveDetailData?.summary }}
        </p>
      </div>
      <div class="detail-item">
        <h2 class="detail-item-title">{{ i18n.cve.METRICS_V3 }}</h2>
        <OTable class="pc-list" :data="cvssList">
          <OTableColumn label="" prop="cate"> </OTableColumn>
          <el-table-column label="NVD" prop="NVD">
            <template #default="scope">
              {{ scope.row.NVD === '0.0' ? '' : scope.row.NVD }}
            </template>
          </el-table-column>
          <el-table-column label="openEuler" prop="openEuler">
          </el-table-column>
        </OTable>
      </div>
      <div class="detail-item">
        <h2 class="detail-item-title">
          {{ i18n.cve.AFFECTED_PRODUCTS }}
        </h2>

        <OTable class="affect-list" :data="affectedProductList">
          <OTableColumn :label="i18n.cve.PRODUCT" prop="productName">
          </OTableColumn>
          <OTableColumn :label="i18n.cve.PACKAGE" prop="packageName">
          </OTableColumn>
          <OTableColumn :label="i18n.cve.STATUS" prop="status"> </OTableColumn>

          <el-table-column :label="i18n.cve.SECURITY_ADVISORIES">
            <template #default="scope">
              <span
                class="detail-page"
                @click="jumpBulletinDetail(scope.row.securityNoticeNo)"
              >
                {{ scope.row.securityNoticeNo }}
              </span>
            </template>
          </el-table-column>

          <OTableColumn :label="i18n.cve.RELEASE_DATE" prop="releaseTime">
          </OTableColumn>
        </OTable>
        <ul class="mobile-list">
          <li
            v-for="item in affectedProductList"
            :key="item.securityNoticeNo"
            class="item"
          >
            <ul>
              <li>
                <span>{{ i18n.cve.PRODUCT }}:</span>{{ item.productName }}
              </li>
              <li>
                <span>{{ i18n.cve.PACKAGE }}:</span>{{ item.packageName }}
              </li>
              <li>
                <span>{{ i18n.cve.STATUS }}:</span>{{ item.status }}
              </li>
              <li>
                <span>{{ i18n.cve.SECURITY_ADVISORIES }}:</span
                ><a
                  class="detail-link"
                  @click="goDetail(item.securityNoticeNo)"
                  >{{ item.securityNoticeNo }}</a
                >
              </li>
              <li>
                <span>{{ i18n.cve.RELEASE_DATE }}:</span>{{ item.releaseTime }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.detail-link {
  color: var(--o-color-link1);
  cursor: pointer;
}

.breadcrumb {
  color: var(--o-color-text1);
  background: var(--o-color-bg1);
  display: flex;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
  }
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: normal;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
    .o-icon {
      color: var(--o-color-text1);
    }
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-tip);
  }
}
.cve-head {
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
  background: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h5);
    background: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
  }
  .cve-name {
    font-size: var(--o-font-size-h3);
    font-weight: normal;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      font-weight: 300;
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h8);
    }
  }
  .cve-intro {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    div {
      display: flex;
    }
    span {
      display: inline-block;
      margin-right: var(--o-spacing-h8);
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      line-height: var(--o-line-height-tip);
    }
  }
}
.cve-detail-body {
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
  }
  .detail-item {
    margin-bottom: var(--o-spacing-h2);
    &:last-child {
      margin-bottom: 0;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg2);
    }
    &-title {
      margin-bottom: var(--o-spacing-h4);
      font-size: var(--o-font-size-h5);
      font-weight: 400;
      color: var(--o-color-text1);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-bottom: var(--o-spacing-h8);
      }
    }
    .pc-list {
      box-shadow: none;
    }
    &-content {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: var(--o-spacing-h2);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-bottom: var(--o-spacing-h4);
      }
    }
    .metrics-list,
    .affect-list {
      margin-bottom: var(--o-spacing-h2);
      .detail-page {
        color: var(--o-color-link1);
        cursor: pointer;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .mobile-list {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
      }
      .item {
        padding: var(--o-spacing-h5);
        font-size: var(--o-font-size-tip);
        font-weight: 400;
        color: var(--o-color-neutral8);
        line-height: var(--o-line-height-tip);
        background-color: var(--o-color-bg4);
        &:nth-child(2n) {
          background: var(--o-color-bg1);
        }
        & li {
          margin-bottom: var(--o-spacing-h8);
        }
        li:last-child {
          margin-bottom: 0;
          a {
            color: var(--o-color-link1);
          }
        }
        li:nth-child(2) {
          display: flex;
          span {
            min-width: 30px;
          }
        }
        span {
          color: var(--o-color-text1);
          margin-right: var(--o-spacing-h8);
        }
      }
    }
  }
}
</style>
