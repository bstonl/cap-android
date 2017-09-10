## 简介
一个基于[openstf/minicap](https://github.com/openstf/minicap)的简单实时录屏、显示工具
该工具可在网页端控制设备

## 操作步骤
- 安装node(已安装跳到下一步)

```
brew install node
```
- 手机通过usb连接到电脑

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

正常情况下，run.sh中已经清除上一次的所有进程，如果需要一键关闭打开的所有应用：
执行如下脚本:
sh clean.sh
```
## 打开网页
在网页中输入 [localhost:9002](localhost:9002) 就能看到屏幕实时投影了。
