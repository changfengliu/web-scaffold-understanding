# Babel 工作原理

## 工作过程

相对于编译器 compiler，babel 称作转译器 transpiler 更准确一些，因为它只是把同种语言的高版本规则翻译成低版本规则，而不像编译器那样，输出的是一种更低级的语言代码。

与编译器类似，babel 的转译过程也分为三个阶段：**parsing**、**transforming**、**generating**，以 ES6转译为 ES5 为例：

<mermaid>
graph LR
    A[ES6代码] -- babylon 解析 --> B[AST]
		B -- babel-traverse对AST进行遍历转译 --> C[新AST]
		C -- babel-generator --> D[ES5代码]
</mermaid>

> 注意: babel只是转译新标准引入的语法，比如 ES6 的箭头函数转译成 ES5 的函数；而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的API等（如Proxy、Set等），这些 babel 是不会转译的。需要用户自行引入 polyfill 来解决。



Babel使用的引擎是**babylon**，babylon并非由babel团队自己开发的，而是fork的acorn项目，acorn的项目本人在很早之前在兴趣部落1.0在构建中使用，为了是做一些代码的转换，是很不错的一款引擎，不过acorn引擎只提供基本的解析ast的能力，遍历还需要配套的 acorn-travesal, 替换节点需要使用acorn-，而这些开发，在Babel的插件体系开发下，变得一体化了.

Babel会将源码转换AST之后，通过便利AST树，对树做一些修改，然后再将AST转成code，即成源码。
<img src="http://www.alloyteam.com/wp-content/uploads/2017/04/1490858489_75_w920_h326.png"/>
上面提到Babel是fork acon项目，我们先来看一个来自兴趣部落项目的，简单的ACON示例


## ACON

一个简单的ACON转换示例
解决的问题：

```javascript
Model.task('getData', function($scope, dbService){});
// 转化成
Model.task('getData', ['$scope', 'dbService', function($scope, dbService){}]);
```
熟悉angular的同学都能看到这段代码做的是对DI的自动提取功能，使用ACON手动撸代码
```javascript
var code = 'let a = 1; // ....';

var acorn = require("acorn");
var traverse = require("ast-traverse");
var alter = require("alter");

var ast = acorn.parse(code);
var ctx = [];

traverse(ast, {
    pre: function(node, parent, prop, idx){
        if(node.type === "MemberExpression") {

            var object = node.object;

            var objectName = object.name;

            var property = node.property;
            var propertyName = property.name;

            // 这里要进行替换
            if (objectName === "Model" && (propertyName === "service" || propertyName === "task")) {
                // 第一个就为serviceName 第二个是function
                var arg = parent.arguments;
                var serviceName = arg[0];
                var serviceFunc = arg[1];
                for (var i = 0; i < arg.length; i++) {
                    if (arg[i].type === "FunctionExpression") {
                        serviceFunc = arg[i];

                        break;
                    }

                }

                if (serviceFunc.type === "FunctionExpression") {
                    var params = serviceFunc.params;
                    var body = serviceFunc.body;

                    var start = serviceFunc.start;
                    var end = serviceFunc.end;

                    var funcStr = source.substring(start, end);

                    //params里是注入的代码

                    var injectArr = [];
                    for (var j = 0; j < params.length; j++) {
                        injectArr.push(params[j].name);
                    }

                    var injectStr = injectArr.join('","')

                    var replaceString = '["' + injectStr + '", ' + funcStr + ']';
                    if(params.length){
                        ctx.push({
                            start: start,
                            end: end,
                            str: replaceString
                        })
                    }

                }
            }
        }



    }
});
var distStr = alter(code, ctx);
console.log(distStr);

```

## Babylon

## babel-types

## babel-traverse
