=========

##项目结构   
            |- actions              处理器  
                |- index.js         首页逻辑
            |- app.js               node配置根文件
            |- bin                  node启动目录
            |- build.js             react根目录
            |- components           公共组件

##2016年9月12日



##2016年9月14日
###注意点


#####FooterBar组件必须具备routes属性，通过父组件去传递


```javascript
     FooterBar.propTypes = {
         routes:React.PropTypes.array.isRequired
     }
```  
##2016-09-21
####* 新增emptyComponent组件作为没有数据的时候显示的界面
* 参数：message  默认为：没有数据

