2018.08.04
上海鑫相信息科技有限公司，门户网站。
$ cd ../py3web/env
$ source bin/activate
$ python -V
… python3.5.4
$ cd Mytest
$ ./start.sh

一、注册用户
admin/1234qazx     管理员 超级用户/密码
test/1234qazx        普通用户/密码

二、留言板功能
1、普通用户，提交问题；超级用户，回答问题。
2、普通用户只能看得到自己提交的问题，管理员可以看得全部提交问题。

三、备注
1、本项目是python3.5 
2、用到了连网图标，保持连网状态使用。
3、部署通过。

恢复到版本：
git reset --hard  acf36815b941 
