# Blog
A blog build with Jade + Express + Mongoose + Materialize

## About this project
### 技术栈
初学`node`后端开发的练手之作, 采用前后端混合的方式, 模板语言采用`Jade`, `Web`框架采用`Express`, 数据库采用`MongoDB`, 驱动采用`mongoose`, 前端UI框架采用`materialize`
### features
- 文章发表, 编辑, 删除, 撤回, 草稿, md文件下载(支持markdown)
- 登录注册 (第一位注册的为管理员), 退出登录
- 添加, 删除评论
- 资料修改 (头像, 性别, 简介, email)


## TODO
前后端混合的方式, 发现限制还是比较多的, 对用户也不友好, 还是前后端分离分离比较好. 计划在放寒假的时候重构成前后端分离的形式, 前端会改用`vue`或者`react`做成`web app`
d的形式.

- [ ] web app
- [ ] Markdown 文件上传发表
- [ ] json api
- [ ] Google Drive 同步
- [ ] 评论 -> Disqus评论系统
- [ ] 测试编写
- [ ] 自动化部署脚本
