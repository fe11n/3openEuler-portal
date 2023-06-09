---
title: 特性说明
titleTemplate: openEuler社区官网
category: migration
---

### 新增特性

1.x2openEuler新增对RedHat7系到openEuler20.03系，openEuler22.03系，RedHat8到openEuler22.03系的支持

2.x2openEuler新增回退一致性检测功能，用于检测回退后与升级前操作系统当中存在差异的文件

3.x2openEuler新增升级完整性检查，用于对比升级后与升级前检查结果的差异

4.x2openEuler将冲突分析，兼容性分析卸载到升级节点，在升级阶段对数据库的使用方式发生变化，需要将数据库RPM包放置到服务端/etc/x2openEuler/rpms/databases目录下即可

5.x2openEuler连通性测试步骤替换为升级检查步骤，升级检查步骤支持自定义编辑，可以支持自定义增加，删除对应检查项

6.x2openEuler新增环境巡检，在升级成功之后可以执行巡检，巡检步骤支持自定义编辑，可以支持自定义增加，删除对应巡检项

7.x2openEuler新增节点强制删除功能，可以在节点失败的情况下强制删除节点



8.x2openEuler升级软件包提前至升级前检查下载 

### 问题修复 

1.修改因kernel包在升级过程中没有对应的版本，导致升级完成后出现rd.break进入紧急模式的问题

2.修改因nss和nspr软件因为冲突，导致被卸载后ssh连接无法使用的问题

3.修复备份目录存在多级目录，并且目录都不存在的情况下，无法创建备份目录的问题 

4.修复升级到openEuler22.03，进行回退时fat文件系统驱动默认不加载导致磁盘挂载不上，从而回退失败的问题 

5.修复任务名称输入非法时无提示的问题 

6.修复环境检查在某些偶现场景出现repo源残留的问题 

7.修复rsync导致ssh超时的问题 

8.ssh超时时间可配置，默认为600s 

9.修复当非root用户登录时，升级重试提示密码不对的问题 

10.修复普通用户因超时退出导致的升级前检查失败问题 

11.修复数据库不存在，报No such file or directory的问题 

12.修复白名单查询问题 

13.修复2203上无法安装工具的问题 

14.修复第一次升级检查是报libpython找不到的问题 

15.修复原系统中i686包对升级前检查的干扰 

16.修复服务端证书不生效的问题 

17.修改部分文案 

18.修复swap包异常输入导致程序崩溃问题 

19.新增对升级节点不能安装x2openEuler-core的检查 

20.硬件兼容性清单更新 

21.修复配置swap包无法替换默认swap包的问题 

22.修复ssh匹配时，无匹配符的问题 

23.增加会退前全盘扫描，对不可修改权限目录进行提示，防止存在不可修改权限的文件和目录导致回退失败 

24.修复中文decode报错问题 

25.修复rpm包路径依赖缺失问题 

26.提高升级前检查准确性 

27.加强部分安全问题 

28.远程执行命令增加超时时间，防止命令卡住问题 

29.x2openEuler-upgrade依赖提前安装 

30.修复保留包为空，但填写业务包的时候报错的问题 

31.修复重启命令不生效的问题 

32.修复ssh回传出现的乱码问题 

33.修复glibc-header冲突的问题 

34.修复管理页面卡死的问题 

35.修改回退流程，增加回退流程鲁棒性 

36.修改收集评估轮询失效问题 

37.修复升级页面节点名称不显示问题 

