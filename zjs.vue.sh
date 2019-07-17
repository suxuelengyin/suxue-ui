#!/bin/sh
cd D:/suxue/suxue-ui/zjs-vue/zjs
nohup npm run serve
cd zjs-vue/zjs/docs
nohup vuepress dev .
exit