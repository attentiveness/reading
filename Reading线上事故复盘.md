# Reading线上事故复盘
---
## 0.1.2
### *2016年二月五日晚19点*
**线上事故**：由于react-native中image的原生实现为fresco，在加载gif图片时crash。具体原因：
[Load gif lib error](https://github.com/facebook/fresco/issues/209)

**处理方案**：
在android的`proguard`文件中加入：

```
-keep class com.facebook.imagepipeline.gif.** { *; }

-keep class com.facebook.imagepipeline.webp.** { *; }
```
**此次线上事故导致发布版本0.1.3进行修复**，发布渠道：
>* 360市场
>* 豌豆荚
