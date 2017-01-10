### API


+ 创建博客 ✔
    + url: post/create/master
+ 编辑博客 ✔
    + url: post/edit/master
+ 保存博客 ✔
    + url: post/save/master
+ 发布博客 ✔
    + url: post/publish/master
+ 设为私有博客 ✔
    + url: post/private/true
+ 取消设为私有博客 ✔
    + url: post/private/false
+ 获取博客基本信息 ✔
    + url: post/get
+ 获取博客内容 ✔
    + url: post/content/get
+ 获取博客列表 ✔
    + url: post/all/master
+ 获取已发布博客列表 ✔
    + url: post/all
+ 获取私密博客列表 ✔
    + url: post/private-all/master
+ 创建评论 ✔
    + url: comment/create
+ 获取评论 ✔
    + url: comment/all
+ 删除评论 ✔
    + url: comment/delete/master
+ 获取所有评论列表 ✔
    + url: comment/all/master

+ 点赞 ✔
    + url: post/likes

+ 邮箱订阅 ✔
    + url: subscribe
+ 提交订阅邮箱
    + url: eamil/create
+ 获取邮箱订阅列表 ✔
    + url: eamil/all/master
+ 删除订阅邮箱 ✔
    + url: eamil/delete/master
+ 发布博客邮件推送 ✔
    + url: eamil/send/all/master
+ 获取发送失败邮件列表 ✔
    + url: eamil/unsent/all/master
+ 选择指定邮箱发送邮件 ✔
    + url: eamil/sent/master

+ 最近 n 天博客页面浏览数 ✔
+ 最近 n 天博客独立ip浏览数 ✔
+ 最近 n 天博客点赞数

+ 管理员登录 ✔
    + url:　/master/login
+ 管理员修改密码 ✔
    + url: /master/reset

### bug list
+ 一个 ip 一天不能给多篇博客点赞
+ ~~编辑博客会打开该博客~~
+ uv 统计存在问题

### TODO
+ 配置项，不能环境使用不同数据库
+ docker
+ https
