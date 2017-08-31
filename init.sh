abi=$(adb shell getprop ro.product.cpu.abi | tr -d '\r')
sdk=$(adb shell getprop ro.build.version.sdk | tr -d '\r')
pre=$(adb shell getprop ro.build.version.preview_sdk | tr -d '\r')
rel=$(adb shell getprop ro.build.version.release | tr -d '\r')
size=$(adb shell dumpsys window | grep -Eo 'init=\d+x\d+' | head -1 | cut -d= -f 2)
if [ "$size" = "" ]; then
  w=$(adb shell dumpsys window | grep -Eo 'DisplayWidth=\d+' | head -1 | cut -d= -f 2)
  h=$(adb shell dumpsys window | grep -Eo 'DisplayHeight=\d+' | head -1 | cut -d= -f 2)
  size="${w}x${h}"
fi
echo $size
echo $abi
adb push bin/armeabi-v7a/minitouch data/local/tmp
adb push bin/armeabi-v7a/minicap data/local/tmp
adb push libs/android-$sdk/armeabi-v7a/minicap.so data/local/tmp
adb shell chmod 777 data/local/tmp/minitouch
adb shell chmod 777 data/local/tmp/minicap
adb shell LD_LIBRARY_PATH=/data/local/tmp /data/local/tmp/minicap -P $size@$size/0