## 简介
一个基于[openstf/minicap](https://github.com/openstf/minicap)的简单实时录屏、显示工具

## 操作步骤
- 安装node(已安装跳到下一步)

```
brew install node
```

- 在电脑终端敲命令 **adb version** 会有类似如下信息

```
Android Debug Bridge version 1.0.39
Revision 3db08f2c6889-android
Installed as /usr/local/bin/adb
```
- 满足以上两点之后执行如下,

```
在终端进入到工程目录
cd cap-android
执行如下脚本:
sh run.sh
```
## 打开网页
在网页中输入 [localhost:9002](localhost:9002) 就能看到屏幕实时投影了。