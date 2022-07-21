export default {
  GUIDANCE_LIST: {
    GUIDE: {
      MOBILE_TITLE: 'SIG申请流程',
      TITLE: 'Application Process',
      LINE_CONTENT: [
        {
          LEFT: {
            LEFT_INFO:
              'Individuals or companies find two or three persons with common goals in the openEuler community to discuss and set up a SIG, which aims to maintain a specific type of software package in the openEuler community or to initiate an incubation project.',
            LEFT_CIRCLE: '01',
            MOBILE_CIRCLE: 'Find',
            LEFT_IMG: '/img/sig/sig1.png',
            LEFT_DESC: 'Find',
          },
          RIGHT: {
            RIGHT_INFO:
              "Create an application file on Gitee and initiate a pull request (PR) according to the <a target='_blank' href='https://gitee.com/openeuler/community/blob/master/en/technical-committee/governance/README.md'>procedure</a> for setting up a SIG. Make an appointment for attending the Technical Committee meeting. ",
            RIGHT_CIRCLE: '02',
            MOBILE_CIRCLE: 'Apply',
            LEFT_IMG: '/img/sig/sig2.png',
            RIGHT_DESC: 'Apply',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              'At the regular Technical Committee (TC) meeting, discuss and reach an agreement on the technical scope and maintenance objectives of the SIG.',
            LEFT_CIRCLE: '03',
            MOBILE_CIRCLE: 'Discuss',
            LEFT_IMG: '/img/sig/sig3.png',
            LEFT_DESC: 'Discuss',
          },
          RIGHT: {
            RIGHT_INFO:
              'The TC approves the establishment of the SIG. The corresponding PR is integrated into the code repository, and the infrastructure automatically establishes the corresponding repository.',
            RIGHT_CIRCLE: '04',
            MOBILE_CIRCLE: 'Approve',
            LEFT_IMG: '/img/sig/sig4.png',
            RIGHT_DESC: 'Approve',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              'The SIG starts to operate. Members use the mailing list and regular meetings for discussion and operation.',
            LEFT_CIRCLE: '05',
            MOBILE_CIRCLE: 'Operate',
            LEFT_IMG: '/img/sig/sig5.png',
            LEFT_DESC: 'Operate',
          },
          RIGHT: {
            RIGHT_INFO:
              'The TC periodically reviews the SIG operation and provides guidance.',
            RIGHT_CIRCLE: '06',
            MOBILE_CIRCLE: 'Improve',
            LEFT_IMG: '/img/sig/sig6.png',
            RIGHT_DESC: 'Improve',
          },
        },
      ],
    },
  },
  SIG_LIST: {
    HOME_PAGE: 'Go to Gitee home page',
    MAIL: 'E-mail',
    IRC: 'IRC Channel',
    MANAGER: 'Administrators',
    NAME: 'SIG',
    GITEE_PAGE: 'Gitee',
  },
  SIG_DESCRIPTION: {
    MEANING:
      'The openEuler community is organized based on Special Interest Groups (SIGs) to better manage and improve the work processes.SIGs are open to everyone.',
    LI1: 'Each SIG comprises one or more projects on Gitee, and each project has repositories that store SIG deliverables. Registering with an SIG enables you to submit, discuss, and resolve issues with other members, as well as participate in reviews in an SIG repository.',
    LI2: 'An SIG is established for one or more specific technical topics. Core members of an SIG can manage each group, and members can contribute to the quality and the output of deliverables for the openEuler community.',
    LI3: 'In the README.md file on the project Gitee page, you can find project SIG information, members, and contact information. You can join specific SIGs by mailing the listed email addresses. Also, you can attend public meetings, join discussions or forums, or participate in other activities listed in the corresponding README.md file.',
  },
  SIG_LANDSCAPE: [
    {
      CATEGORY_NAME: 'Code Repository Management/Technology Innovation',
      SUB_LIST: [
        {
          SUB_CATEGORY_NAME: 'Industry Solutions/Applications',
          COLOR: '#7f6ffe',
          LIST: [
            {
              NAME: 'sig-bio',
            },
            {
              NAME: 'sig-ROS',
            },
            {
              NAME: 'sig-android-middleware',
            },
            {
              NAME: 'Application',
            },
            {
              NAME: 'sig-industrial-control',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'General-Purpose Middleware',
          COLOR: '#db7c61',
          LIST: [
            {
              NAME: 'sig-embedded',
            },
            {
              NAME: 'sig-OpenResty',
            },
            {
              NAME: 'sig-cms',
            },
            {
              NAME: 'DB',
            },
            {
              NAME: 'sig-Ha',
            },
            {
              NAME: 'sig-ai-bigdata',
            },
            {
              NAME: 'sig-compat-winapp',
            },
            {
              NAME: 'sig-ceph',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Toolchains/Languages/Running',
          COLOR: '#505d75',
          LIST: [
            {
              NAME: 'sig-Rust',
            },
            {
              NAME: 'sig-perl-modules',
            },
            {
              NAME: 'sig-python-modules',
            },
            {
              NAME: 'sig-Java',
            },
            {
              NAME: 'sig-nodejs',
            },
            {
              NAME: 'dev-utils',
            },
            {
              NAME: 'Runtime',
            },
            {
              NAME: 'sig-libboundscheck',
            },
            {
              NAME: 'System-tool',
            },
            {
              NAME: 'sig-golang',
            },
            {
              NAME: 'sig-ruby',
            },
            {
              NAME: 'Compiler',
            },
            {
              NAME: 'Programming-language',
              IS_WIDER: 1,
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Architecture/Processor/Core/Driver',
          COLOR: '#fec456',
          LIST: [
            {
              NAME: 'sig-RaspberryPi',
            },
            {
              NAME: 'sig-RISC-V',
            },
            {
              NAME: 'sig-aarch32',
            },
            {
              NAME: 'Kernel',
            },
            {
              NAME: 'sig-WayCa',
            },
            {
              NAME: 'sig-DyscheOS',
            },
            {
              NAME: 'sig-REDF',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Cloud Native Infrastructure',
          COLOR: '#4d7dff',
          LIST: [
            {
              NAME: 'sig-CloudNative',
            },
            {
              NAME: 'sig-ONL',
            },
            {
              NAME: 'sig-openstack',
            },
            {
              NAME: 'sig-OKD',
            },
            {
              NAME: 'Virt',
            },
            {
              NAME: 'iSulad',
            },
            {
              NAME: 'oVirt',
            },
            {
              NAME: 'sig-KubeSphere',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Desktop/Graphics System',
          COLOR: '#8e9aaf',
          LIST: [
            {
              NAME: 'sig-mate-desktop',
            },
            {
              NAME: 'sig-desktop-apps',
            },
            {
              NAME: 'Desktop',
            },
            {
              NAME: 'GNOME',
            },
            {
              NAME: 'sig-KDE',
            },
            {
              NAME: 'xfce',
            },
            {
              NAME: 'sig-DDE',
            },
            {
              NAME: 'sig-UKUI',
            },
            {
              NAME: 'sig-KIRAN-DESKTOP',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Basic Functions/Features/Tools',
          COLOR: '#2a9d8f',
          LIST: [
            {
              NAME: 'A-Tune',
            },
            {
              NAME: 'Storage',
            },
            {
              NAME: 'Base-service',
            },
            {
              NAME: 'Computing',
            },
            {
              NAME: 'sig-ops',
            },
            {
              NAME: 'sig-bootstrap',
            },
            {
              NAME: 'Networking',
            },
            {
              NAME: 'sig-security-facility',
            },
            {
              NAME: 'sig-high-performance-network',
              IS_WIDER: 1,
            },
            {
              NAME: 'sig-confidential-computing',
              IS_WIDER: 1,
            },
          ],
        },
      ],
    },
    {
      CATEGORY_NAME: 'Community Governance and Operations',
      SUB_LIST: [
        {
          SUB_CATEGORY_NAME: 'Community Ecological Progress',
          COLOR: '#8e583d',
          LIST: [
            {
              NAME: 'Marketing',
            },
            {
              NAME: 'sig-minzuchess',
            },
            {
              NAME: 'sig-Compatibility-Infra',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Version Release Related',
          COLOR: '#cec79a',
          LIST: [
            {
              NAME: 'sig-QA',
            },
            {
              NAME: 'doc',
            },
            {
              NAME: 'sig-release-management',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Build Systems/Tools/Dependencies',
          COLOR: '#19647e',
          LIST: [
            {
              NAME: 'sig-OS-Builder',
            },
            {
              NAME: 'sig-Ostree-Assembly',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME:
            'Security Committee/Technical Committee/Community Secretariat',
          COLOR: '#73c0de',
          LIST: [
            {
              NAME: 'TC',
            },
            {
              NAME: 'sig-Community',
            },
            {
              NAME: 'security-committee',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Software Package Management',
          COLOR: '#4c3e72',
          LIST: [
            {
              NAME: 'Packaging',
            },
            {
              NAME: 'sig-recycle',
            },
            {
              NAME: 'sig-EasyLife',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: 'Community Infrastructure',
          COLOR: '#c44e4e',
          LIST: [
            {
              NAME: 'Infrastructure',
            },
            {
              NAME: 'sig-CICD',
            },
            {
              NAME: 'sig-Gatekeeper',
            },
            {
              NAME: 'security-committee',
            },
          ],
        },
      ],
    },
  ],
};
