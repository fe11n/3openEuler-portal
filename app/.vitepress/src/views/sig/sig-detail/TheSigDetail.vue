<script setup lang="ts">
import { computed, ref, onMounted, onUpdated } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import showMd from 'markdown-it';

import useWindowResize from '@/components/hooks/useWindowResize';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SigMeeting from './SigMeeting.vue';
import MobileRepositoryList from './MobileRepositoryList.vue';
import ContributList from './ContributList.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import SigAnchor from './SigAnchor.vue';
import SigFloorMd from './SigFloorMd.vue';

import IconEmail from '~icons/app/icon-mail.svg';
import IconGitee from '~icons/app/icon-gitee.svg';
import IconSearch from '~icons/app/icon-search.svg';

import {
  getSigDetail,
  getSigMember,
  getSigRepositoryList,
  getSigList,
  getSigDetailInfo,
} from '@/api/api-sig';
interface SIGLIST {
  group_name: string;
  maillist: string;
}

const { lang } = useData();
const i18n = useI18n();
const screenWidth = useWindowResize();
const isIphone = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
const paginLayout = computed(() =>
  isIphone.value
    ? 'prev, slot, jumper, next'
    : 'sizes, prev, pager, next, slot, jumper'
);
const sigDetailName = ref('');
const sigDetail = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});
const sigMeetingData: any = ref('');
const sigMemberData: any = ref('');
const memberList: any = ref([]);

function getSigDetails() {
  getSigDetail(sigDetailName.value)
    .then((res: any) => {
      sigMeetingData.value = res;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
const oldEmail = ref('');
const giteeHomeLink = ref('');
function getOldEmail() {
  getSigList().then((res) => {
    const targetData = res.filter((item: SIGLIST) => {
      return item.group_name === sigDetailName.value;
    });
    if (targetData.length) {
      oldEmail.value = targetData[0].maillist;
      giteeHomeLink.value = targetData[0].home_page;
    }
  });
}
function getSigMembers() {
  const param = {
    community: 'openeuler',
    sig: sigDetailName.value,
  };
  getSigMember(param)
    .then((res: any) => {
      if (res?.data[0]) {
        const data = res.data[0];
        sigMemberData.value = data;
        const { maintainer_info } = data || [];
        if (maintainer_info) {
          memberList.value = maintainer_info;
        }
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}

// 仓库列表过滤参数
const repositoryNameList = ref([]);
const repositoryNameSelected = ref('');
const maintainerList = ref([]);
const maintainerSelected = ref('');
const committerList = ref([]);
const committerSelected = ref('');

const filterRepositoryList = () => {
  totalRepositoryList.value = _totalRepositoryList.value.filter((item) => {
    return (
      (!repositoryNameSelected.value ||
        item.repo === repositoryNameSelected.value) &&
      (!maintainerSelected.value ||
        item.maintainers.includes(maintainerSelected.value)) &&
      (!committerSelected.value ||
        item.gitee_id.includes(committerSelected.value))
    );
  });
  totalRepositoryList.value;
};

// 仓库列表参数
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = computed(() =>
  Math.ceil(totalRepositoryList.value.length / pageSize.value)
);
// 列表过滤后数据
const totalRepositoryList = ref([] as any[]);
// 列表原始数据
const _totalRepositoryList = ref([] as any[]);
const repositoryList = computed(() => {
  if (totalRepositoryList.value.length > pageSize.value) {
    return totalRepositoryList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return totalRepositoryList.value;
  }
});
const getRepositoryList = () => {
  const param = {
    community: 'openeuler',
    sig: sigDetailName.value,
  };
  getSigRepositoryList(param).then((data) => {
    if (data.code === 200) {
      const {
        committerDetails = [],
        committers = [],
        maintainers = [],
      } = data.data;
      _totalRepositoryList.value = committerDetails.map((item: any) => ({
        ...item,
        maintainers,
      }));
      filterRepositoryList();
      repositoryNameList.value = committerDetails.map((item: any) => item.repo);
      maintainerList.value = maintainers;
      committerList.value = committers;
    }
  });
};
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
  }
}
function setDefaultImage(e: any) {
  if (e?.target) {
    e.target.src = 'https://gitee.com/assets/no_portrait.png';
  }
}
onMounted(() => {
  function getUrlParam(paraName: any) {
    const searchArray = location.search.split('?');
    if (searchArray.length > 1) {
      const arrPara = searchArray[1].split('&');
      let arr;
      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=');
        if (arr !== null && arr[0] === paraName) {
          return arr[1];
        }
      }
      return '';
    } else {
      return '';
    }
  }
  sigDetailName.value = getUrlParam('name');
  getSigDetails();
  getOldEmail();
  getSigMembers();
  getRepositoryList();
});
// 处理导航锚点功能
const navRef: any = ref([]);
const titleListBefor: any = ref();
const titleList: any = ref();
const activeIndex = ref(0);
const handleScrollEvent = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  if (!activeList.length) {
    activeList.push(0);
  }
  activeIndex.value = activeList[activeList.length - 1];
};
onMounted(() => {
  window.addEventListener('scroll', handleScrollEvent);
});
onMounted(() => {
  titleListBefor.value = document.querySelectorAll('.floor-title');
});
onUpdated(() => {
  titleList.value = document.querySelectorAll('.floor-title');
  if (titleListBefor.value.length !== titleList.value.length) {
    navRef.value = [];
    Object.keys(titleList.value).forEach((item: any) => {
      navRef.value.push(titleList.value[item]);
    });
    titleListBefor.value = titleList.value;
  }
});
// 获取easyeditor编辑发布的信息
const href = `https://www.openeuler.org/${lang.value}/sig/sig-detail/?name=`;
const easyeditorInfo: any = ref({});
function getEasyeditorInfo() {
  getSigDetailInfo(href + sigDetailName.value)
    .then((res) => {
      if (res.statusCode === 200 && res.data && res.data[0]) {
        res.data.forEach((item: any) => {
          if (item.content) {
            item.content = showMd().render(item.content);
          }
          easyeditorInfo.value[item.name] = item;
        });
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
onMounted(() => {
  getEasyeditorInfo();
});
</script>
<template>
  <SigAnchor :nav-ref="navRef" :active-index="activeIndex" />
  <div class="sig-detail">
    <BreadCrumbs
      bread1="SIG"
      :bread2="sigDetailName"
      link1="/zh/sig/sig-list/"
    />
    <div class="content">
      <div class="brief-introduction">
        <h2
          :id="sigDetail.INTRODUCTION"
          class="brief-introduction-title floor-title"
        >
          {{ sigDetailName }}
          <a :href="giteeHomeLink" target="_blank">
            <OIcon class="icon"> <IconGitee /> </OIcon
          ></a>
        </h2>
        <p
          v-if="
            easyeditorInfo.introduction && easyeditorInfo.introduction.content
          "
          v-dompurify-html="easyeditorInfo.introduction.content"
          class="introduction-content"
        ></p>
        <p v-else-if="sigMemberData.description" class="introduction-content">
          {{ sigMemberData.description }}
        </p>
        <p v-else class="introduction-content">
          {{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT1
          }}<a
            target="_blank"
            :href="`https://gitee.com/openeuler/community/tree/master/sig/${sigDetailName}`"
            >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT2 }}</a
          >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT3 }}
        </p>
      </div>
      <SigFloorMd
        v-if="easyeditorInfo.markdown1"
        :floor-data="easyeditorInfo.markdown1"
      />
      <div v-if="lang === 'zh'" class="meeting">
        <h2 :id="sigDetail.ORGANIZING_MEETINGS" class="floor-title">
          {{ sigDetail.ORGANIZING_MEETINGS }}
        </h2>
        <SigMeeting
          v-if="sigMeetingData.tableData"
          class="calender-box"
          :table-data="sigMeetingData.tableData"
          :old-email="oldEmail"
          :meeting-detail="
            easyeditorInfo.meeting ? easyeditorInfo.meeting.content : null
          "
        />
        <p v-else class="no-meeting">
          {{ sigDetail.NO_MEETINGS }}
        </p>
      </div>
      <SigFloorMd
        v-if="easyeditorInfo.markdown2 && lang === 'zh'"
        :floor-data="easyeditorInfo.markdown2"
      />
      <div v-if="memberList.length" class="member">
        <h2 :id="sigDetail.MAINTAINER" class="floor-title">
          {{ sigDetail.MAINTAINER }}
        </h2>
        <div class="member-box">
          <ul>
            <li v-for="item in memberList" :key="item.gitee_id">
              <div class="member-img">
                <img
                  :src="item.avatar_url"
                  :alt="item.name"
                  @error="setDefaultImage($event)"
                />
              </div>
              <p class="name">{{ item.gitee_id }}</p>
              <p class="introduction">
                <span>Maintainer</span>
              </p>
              <div class="icon-link">
                <a :href="`https://gitee.com/${item.gitee_id}`" target="_blank">
                  <OIcon class="icon"> <IconGitee /> </OIcon
                ></a>
                <a :href="`mailto:${item.email}`">
                  <OIcon class="icon"> <IconEmail /> </OIcon
                ></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <SigFloorMd
        v-if="easyeditorInfo.markdown3"
        :floor-data="easyeditorInfo.markdown3"
      />
      <div class="repository">
        <h2 :id="sigDetail.REPOSITORY_LIST" class="floor-title">
          {{ sigDetail.REPOSITORY_LIST }}
        </h2>
        <div class="repository-box">
          <h5>
            {{
              `${sigDetailName} ${sigDetail.REPOSITORY_LIST} (${_totalRepositoryList.length})`
            }}
          </h5>
          <div class="repository-filter">
            <div :class="isIphone ? 'select-box-phone' : 'select-box'">
              <div class="select-item">
                <span class="select-item-name">
                  {{ sigDetail.REPOSITORY_NAME }}
                </span>
                <ClientOnly>
                  <OSelect
                    v-model="repositoryNameSelected"
                    filterable
                    clearable
                    :placeholder="i18n.sig.SIG_ALL"
                    @change="filterRepositoryList()"
                  >
                    <template #prefix>
                      <OIcon>
                        <IconSearch />
                      </OIcon>
                    </template>
                    <OOption
                      v-for="item in repositoryNameList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </OSelect>
                </ClientOnly>
              </div>
              <div v-if="isIphone" class="split-line"></div>
              <div class="select-item">
                <span class="select-item-name"> Maintainer </span>
                <ClientOnly>
                  <OSelect
                    v-model="maintainerSelected"
                    filterable
                    clearable
                    :placeholder="i18n.sig.SIG_ALL"
                    @change="filterRepositoryList()"
                  >
                    <template #prefix>
                      <OIcon>
                        <IconSearch />
                      </OIcon>
                    </template>
                    <OOption
                      v-for="item in maintainerList"
                      :key="item"
                      :value="item"
                      :lable="item"
                    />
                  </OSelect>
                </ClientOnly>
              </div>
              <div v-if="isIphone" class="split-line"></div>
              <div class="select-item">
                <span class="select-item-name"> Committer </span>
                <ClientOnly>
                  <OSelect
                    v-model="committerSelected"
                    filterable
                    clearable
                    :placeholder="i18n.sig.SIG_ALL"
                    @change="filterRepositoryList()"
                  >
                    <template #prefix>
                      <OIcon>
                        <IconSearch />
                      </OIcon>
                    </template>
                    <OOption
                      v-for="item in committerList"
                      :key="item"
                      :value="item"
                      :lable="item"
                    />
                  </OSelect>
                </ClientOnly>
              </div>
            </div>
          </div>
          <OTable v-if="!isIphone" :data="repositoryList">
            <el-table-column :label="sigDetail.REPOSITORY_NAME" width="550px">
              <template #default="scope">
                <a
                  target="_blank"
                  :href="`https://gitee.com/${scope.row.repo}`"
                >
                  {{ scope.row.repo }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Maintainer">
              <template #default="scope">
                <a
                  v-for="(item, index) in scope.row.maintainers"
                  :key="item"
                  target="_blank"
                  :href="`https://gitee.com/${item}`"
                >
                  {{ item
                  }}<span v-show="index !== scope.row.maintainers.length - 1">{{
                    lang === 'zh' ? '、' : ',&nbsp;'
                  }}</span>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Committer">
              <template #default="scope">
                <a
                  v-for="(item, index) in scope.row.gitee_id"
                  :key="item"
                  target="_blank"
                  :href="`https://gitee.com/${item}`"
                >
                  {{ item
                  }}<span v-show="index !== scope.row.gitee_id.length - 1">{{
                    lang === 'zh' ? '、' : ',&nbsp;'
                  }}</span>
                </a>
              </template>
            </el-table-column>
          </OTable>
          <MobileRepositoryList
            v-else
            :data="repositoryList"
          ></MobileRepositoryList>
          <div class="sig-pagination">
            <ClientOnly>
              <OPagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                class="repository-pagin"
                :hide-on-single-page="true"
                :page-sizes="[10, 20, 30, 40]"
                :background="true"
                :layout="paginLayout"
                :total="totalRepositoryList.length"
              >
                <span class="pagination-slot"
                  >{{ currentPage }}/{{ totalPage }}</span
                >
              </OPagination>
            </ClientOnly>
            <AppPaginationMo
              :current-page="currentPage"
              :total-page="totalRepositoryList.length"
              @turn-page="turnPage"
            >
            </AppPaginationMo>
          </div>
        </div>
      </div>
      <SigFloorMd
        v-if="easyeditorInfo.markdown4"
        :floor-data="easyeditorInfo.markdown4"
      />
      <div class="contribution">
        <h2 :id="sigDetail.CONTRIBUTION" class="floor-title">
          {{ sigDetail.CONTRIBUTION }}
        </h2>
        <div class="contribution-box">
          <h5>
            {{ `${sigDetailName} ${sigDetail.USER_CONTRIBUTOR}` }}
          </h5>
          <ContributList
            class="contribution-content"
            :sig="sigDetailName"
          ></ContributList>
        </div>
      </div>
      <SigFloorMd
        v-if="easyeditorInfo.markdown5"
        :floor-data="easyeditorInfo.markdown5"
      />
      <!-- <div class="recent-event">
        <h5>{{ sigDetail.LATEST_DYNAMIC }}</h5>
        <div class="dynamic">
          <div class="item">
            <div class="header">
              <span class="left">{{ sigDetail.BLOG }}</span>
              <a :href="'/' + lang + '/interaction/blog-list/'" class="right">
                <span>{{ sigDetail.MORE }}</span>
                <OIcon class="icon-more">
                  <IconChevronRight />
                </OIcon>
              </a>
            </div>
            <ul class="item-body">
              <li class="empty">
                {{ sigDetail.BLOG_EMPTY1
                }}<a
                  :href="'/' + lang + '/interaction/post-blog/'"
                  target="_blank"
                  >{{ sigDetail.BLOG_EMPTY2 }}</a
                >{{ sigDetail.BLOG_EMPTY3 }}
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="header">
              <span class="left">{{ sigDetail.NEWS }}</span>
              <a :href="'/' + lang + '/interaction/news-list/'" class="right">
                <span>{{ sigDetail.MORE }}</span>
                <OIcon class="icon-more">
                  <IconChevronRight />
                </OIcon>
              </a>
            </div>
            <ul class="item-body">
              <li class="empty">
                {{ sigDetail.NEWS_EMPTY
                }}<a
                  :href="'/' + lang + '/interaction/post-news/'"
                  target="_blank"
                  >{{ sigDetail.NEWS_EMPTY3 }}</a
                >{{ sigDetail.NEWS_EMPTY4 }}
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin title {
  text-align: center;
  position: relative;
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  color: var(--o-color-text1);
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
  }
}
@mixin floor-content {
  margin-top: var(--o-spacing-h2);
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2);
  box-shadow: var(--o-shadow-l1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h5);
    padding: var(--o-spacing-h5);
  }
}
@mixin floor-box {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
}
.sig-detail {
  max-width: 1504px;
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h1);
  margin: 0 auto;
  @media (max-width: 1100px) {
    padding: 16px 16px var(--o-spacing-h2);
  }
  .content {
    width: 100%;
    margin-top: var(--o-spacing-h2);
    // background-color: var(--o-color-bg2);
    .sig-pagination {
      margin-top: var(--o-spacing-h2);
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h2);
      }
    }
    .pagination-slot {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text1);
      line-height: var(--o-spacing-h4);
    }
    .brief-introduction {
      @include floor-content;
      .brief-introduction-title {
        font-size: var(--o-font-size-h3);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text1);
        font-weight: 300;
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
        }
        a {
          margin-left: var(--o-spacing-h4);
          font-size: var(--o-font-size-h5);
          display: flex;
          align-items: center;
          @media screen and (max-width: 768px) {
            margin-left: var(--o-spacing-h6);
            font-size: var(--o-font-size-h8);
          }
        }
      }
      .introduction-content {
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--o-color-text3);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h6);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
    :deep(.floor-box) {
      @include floor-box;
      .floor-title {
        @include title;
      }
      .markdown {
        @include floor-content;
      }
    }
    .meeting {
      @include floor-box;
      .no-meeting {
        padding: var(--o-spacing-h5) 0;
        text-align: center;
      }
      .floor-title {
        @include title;
      }
      .calender-box {
        @include floor-content;
        padding: 0;
      }
      .schedule {
        margin-top: var(--o-spacing-h4);
        .calendar {
          width: 448px;
        }
      }
    }

    .member {
      @include floor-box;
      color: var(--o-color-text1);
      .floor-title {
        @include title;
      }
      .member-box {
        @include floor-content;
        h5 {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          font-weight: 400;
          color: var(--o-color-text1);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
        }
        ul {
          // display: flex;
          margin-top: var(--o-spacing-h2);
          padding: 0 var(--o-spacing-h7);
          display: flex;
          justify-content: start;
          flex-wrap: wrap;
          gap: 24px 0;
          li {
            flex: 0 0 25%;
            text-align: center;
            .icon-link {
              display: flex;
              justify-content: center;
              margin-top: var(--o-spacing-h8);
              font-size: var(--o-font-size-h5);
              a {
                margin: 0 var(--o-spacing-h8);
              }
            }
            @media (max-width: 1080px) {
              flex: 0 0 50%;
              .icon-link {
                font-size: var(--o-font-size-h7);
                a {
                  margin: 0 var(--o-spacing-h9);
                }
              }
            }
            .member-img {
              width: 120px;
              height: 120px;
              display: block;
              margin: 0 auto;
              img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
              }
            }

            .name {
              margin-top: var(--o-spacing-h5);
              font-size: var(--o-font-size-h8);
              line-height: var(--o-line-height-h8);
            }
            .introduction {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
        }
      }
    }
    .repository {
      @include floor-box;
      color: var(--o-color-text1);
      .floor-title {
        @include title;
      }
      .repository-box {
        @include floor-content;
        h5 {
          font-size: var(--o-font-size-h6);
          font-weight: 400;
          color: var(--o-color-text1);
        }
      }

      a {
        cursor: pointer;
        color: var(--o-color-brand1);
      }
      .repository-filter {
        margin: var(--o-spacing-h4) 0;
        .select-box {
          display: flex;
          justify-items: center;
          align-items: center;
          .select-item {
            display: flex;
            align-items: center;
            &-name {
              margin-right: var(--o-spacing-h5);
            }
            margin-right: var(--o-spacing-h1);
            .el-input__prefix-inner {
              .o-icon {
                font-size: var(--o-font-size-h7);
                @media screen and (max-width: 768px) {
                  font-size: var(--o-font-size-h8);
                }
              }
            }
          }
        }
        .select-box-phone {
          .select-item {
            font-size: var(--o-font-size-text);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .split-line {
            height: 1px;
            margin: var(--o-spacing-h6) 0;
            background-color: var(--o-color-border2);
          }
        }
      }
      @media screen and (min-width: 857px) {
        .repository-pagin {
          margin-top: var(--o-spacing-h2);
        }
      }
      @media screen and (max-width: 857px) {
        .repository-pagin {
          margin-top: var(--o-spacing-h5);
        }
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .contribution {
      @include floor-box;
      color: var(--o-color-text1);
      .floor-title {
        @include title;
      }
      .contribution-box {
        @include floor-content;
        h5 {
          font-size: var(--o-font-size-h6);
          font-weight: 400;
          color: var(--o-color-text1);
        }
        .contribution-content {
          margin: var(--o-spacing-h4) 0;
        }
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
}
</style>
