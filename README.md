BookRent
======

Simple book rent app, self used

#### TODO
- 使用Office2010风格的框架
- 提醒有哪些人 借的 哪些书 到期了

#### Done
- 支持拼音首字母，检索书名和人名
- 输入ISBN后，自动通过豆瓣api检索书籍的相关信息，并自动保存。
  由于官方限制单ip每小时150次、即每分钟2.5次，因为稍微留出余地app.config里设置为每30秒一次。比如：
  https://api.douban.com/v2/book/isbn/9787544708999?fields=title,price，
  返回：{"price":"16.50元","title":"边城"}
