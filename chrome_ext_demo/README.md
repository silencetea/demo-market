# Chrome Extension 扩展程序
前请说明：本文适用于之前从来没有接触过chrome extension扩展程序的同学~

## 编写demo

##### 创建项目文件夹`chrome_ext_demo`，在项目根路径（`chrome_ext_demo/`）下创建 `manifest.json`
在`manifest.json`中添加如下示例（只是个简单例子，详细字段说明可参考[官方文档](https://developer.chrome.com/extensions/manifest)）：
``` json
{
    "name":"Chrome Extension demo",
    "version":"1.0.0",
    
    "manifest_version": 2,
    "description":"Hello chrome extension.",
    "browser_action":{
        "default_icon":"icon.png",
        "default_popup":"popup.html"
    },
    "web_accessible_resources":[
        "icon.png",
        "popup.js"
    ],
    "content_scripts": [  
        {  
            "matches": ["*://xxx.com/xxx/*"],  
            "js": ["content.js"]  
        }  
    ] 
}
```

小小说明一下：
`manifest_version`的值必须是2，`content_scripts.matches`这个数组中的值表示我们希望匹配的域名，以`*://baidu.com/*`为例，这个表示只要域名是baidu.com，不论协议是什么，不论路径是什么，这个插件都生效~

##### 根据`web_accessible_resources`和`content_scripts`中填写的`icon.png`、`popup.html`、`popup.js`、`content.js`文件路径得知，我们需要在`chrome_ext_demo/`下创建以下3个文件（PS：图片偷了下懒，随便找了一张图，不规范>.<）。

在`popup.html`添加如下代码：
``` html
<!DOCTYPE html>
<html>
<head>
    <style>
        body{
            width:350px;
        }
        div{
            border:1px solid #eeeaaa;
            padding:20px;
            font: 20px normal helvetica,verdana,sans-serif;
        }
    </style>
    <script src="popup.js"></script>
</head>
<body>
    <div>123</div>
</body>
</html>
```

在`popup.js`添加如下代码：
``` javascript
function sayHello(){
    var message = document.createTextNode("Hello chrome extension!");
    var out = document.createElement("div");
    out.appendChild(message);
    document.body.appendChild(out);
}
window.onload = sayHello;
```

在`content.js`添加如下代码：
``` javascript
alert('hi content!');
```

其中，`content.js`是作用在目标域名目标路径（`*://xxx.com/xxx/*`）下的页面上的。

## 运行
打开chrome浏览器，进入`chrome://extensions/`，打开开发者模式，点击【加载已解压的扩展程序】，选中chrome_ext_demo文件夹，引入扩展


## 打包
在`chrome://extensions/`页面上，点击【打包扩展程序】，选中我们需要打包的扩展程序根目录，点击打包即可。