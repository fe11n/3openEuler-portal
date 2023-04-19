import data from '../../data/download/download';
export default {
  RELEASE_DESC: '发行说明',
  COPY_SUCCESS: '复制成功',
  SERVER_IMAGE: '服务器镜像',
  CLOUD_IMAGE: '云镜像',
  EDGE_IMAGE: '边缘镜像',
  EMBEDDEN_IMAGE: '嵌入式镜像',
  INSTALL_GUIDENCE: '安装指南',
  SEEK_HELP: '提问求助',
  GET_ISO: '获取 ISO',
  SELECT: '筛选',
  // 新增 start
  COMMUNITY: '社区发行版',
  BUSINESS: '商业发行版',
  DETAIL1:
    'openEuler当前最新版本为23年3月发布的openEuler 23.03，欢迎下载体验！',
  DETAIL2: '请',
  CLICK_VIEW: '点此查看更多历史版本。',
  ARCHIVE_LINK: '/zh/download/archive/',
  DETAIL3:
    '我们会根据访问的IP地址为您推荐最优镜像仓下载源，如果您需要寻找特定的镜像仓、或者您在考虑为openEuler社区创建一个新的公共镜像仓，请',
  CLICK_LIST: '点此访问openEuler镜像仓列表',
  MIRROR_LIST_LINK: '/zh/mirror/list/',
  HISTORY: '历史版本下载',
  ARCHITECTURE2: '架构',
  SCENARIO2: '场景',
  ARCHITECTUREList: ['x86_64', 'AArch64', 'ARM32'],
  SCENARIOList: ['服务器', '边缘计算', '云计算', '嵌入式'],
  VERSION_TYPE: '版本类型',
  VERSION_LIST: [
    {
      KEY: 'ALL',
      VALUE: '全部',
    },
    {
      KEY: 'LTS',
      VALUE: 'LTS',
    },
    {
      KEY: 'NEW',
      VALUE: '创新版本',
    },
  ],
  PLANNEDEOL: 'Planned EOL',
  DOWNLOADGO: '前往下载',
  CLICK_DOWNLOAD: '点此下载',
  PUBLISH_FACTURER: '发行厂商：',
  APPROVE_ARCH: '支持架构：',
  PLACEHOLDER: '请输入版本名称',
  TABLE_HEAD: [
    '软件包类型',
    '软件包大小',
    '镜像仓推荐',
    '完整性校验',
    '软件包下载',
  ],
  APPROVE_MIRROR: '推荐镜像仓',
  MORE_MIRROR: '更多镜像仓',
  ALL_MIRROR: '查看全部镜像仓',
  EMPTY_TIP: '暂无数据',
  // 新增 end

  VERSION: '版本',
  ARCHITECTURE: '架构',
  SCENARIO: '应用场景',
  // 改动
  RELEASE_DATE: '发行时间',
  DOWNLOAD_LINK: '下载地址',
  ALL_DATA: '全部',
  LIFE_CYCLE: '生命周期',
  DOWNLOAD_BTN_NAME: '立即下载',
  OUTSIDE_TITLE: '下载',
  MANUFACTURER: '厂商',
  PUBLISH_DATE: '发行时间',
  WHITE_PAPER: '白皮书',
  WEBSITE_SELECT: '站点选择',
  COPY_SUCCESSFULLY: '复制成功！',
  DOWNLOAD_CLASS: '下载：',
  DOCS_CLASS: '文档：',
  GUIDANCE_CLASS: '社区指导：',
  PAGINATION: ['已显示', '条记录/共', '条', '加载更多'],
  BTNSURE: '确定',
  BTNRESET: '重置',
  COMMUNITY_LIST: data.zh.COMMUNITY_LIST,
  SCENARIO_LIST: data.zh.SCENARIO_LIST,
  BUSINESS_LIST: data.zh.BUSINESS_LIST,
  MIRROR_SELECT: {
    TITLE: '获取 ISO',
    RANK: 'Rank',
    NAME: 'Mirror Name',
    URL: 'URL',
    COUNTRY: 'Area',
    CONTINENT: 'Continent',
    DISTANCE: 'Distance(KM)',
    CONTENT: [
      'You are connecting from IP address: ',
      ', which belongs to ',
      '. We believe you are somewhere in ',
      ' and have selected the applicable mirrors.',
    ],
  },
  MIRROR_ALL: {
    TITLE: '镜像仓列表',
    NAME: 'Mirror Name',
    LOCATION: 'Location',
    SPONSOR: 'Sponsor',
    HTTPS: 'Http(s)',
    RSNC: 'RSYNC',
    FTP: 'FTP',
    Mbs: 'NetworkBandwidth(Mb/s)',
    TIME: 'Last Sync time',
    CONTENT: [
      'openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to',
      'contact us',
    ],
  },
};
