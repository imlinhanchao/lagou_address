# 关键字检索拉勾网公司地址及抓取职位信息脚本

## 使用方法

1. 使用Chrome打开一个拉勾职位搜索页，比如：http://www.lagou.com/jobs/list_?px=new&city=%E6%B7%B1%E5%9C%B3  
2. 按下快捷键 Ctrl + Shift + J , 打开Console;  
3. 将control.js的`state`更改为你要检索的地址的关键字;  
4. 将control.js的所有代码复制，粘贴到Chrome Console里，Enter即可;  

## 其他
1. 检索到符合条件的职位会打印出来;  
2. 翻到最后一页时会自动下载一个文件，包含刚才所检索到的所有职位;  
3. 如果要中间停止检索，按下*Esc*键即可，然后会下载一个文件，包含刚才所检索到的所有职位;  