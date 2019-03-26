# Babel

## 定义

Babel 是**一个 JavaScript 编译器**，用于将源代码转译成目标代码。源代码是 ES6+ 系列的各种高级 JS 语法，甚至也可以是一些自定义语法；目标代码是浏览器兼容性良好的 JS 语法。Babel 使我们马上可以用最前沿的 JS 语法编写我们的应用，而不必等宿主环境的升级。

::: tip
编译器的一般处理过程，请参考：[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler), 这篇文章也介绍了 Babel 本身是如何工作的.
:::

## 插件

插件主要应用于 babel 的转译过程，尤其是第二个阶段 transforming，如果这个阶段不使用任何插件，那么 babel 会原样输出代码。

我们主要关注transforming阶段使用的插件，因为transform插件会自动使用对应的词法插件，所以parsing阶段的插件不需要配置。

**Babel is pluggable!**

您可以使用 babel 官方提供的大量插件，也可自定义插件。一个 babel 自定义插件就是一个函数，如：
```javascript
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

**preset 是插件集合.**

babel 细粒度地封装了大量插件，使用 preset 将插件分组，使我们更方便地管理使用这些插件，我们可以自定义 preset:
```javascript
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```


如果要自行配置转译过程中使用的各类插件，那太痛苦了，所以babel官方帮我们做了一些预设的插件集，称之为preset，这样我们只需要使用对应的preset就可以了。

以JS标准为例，babel提供了如下的一些 preset：

- es2015
- es2016
- es2017
- env

es20xx 的 preset 只转译该年份批准的标准，而 env 则代指最新的标准，包括了latest和es20xx各年份
另外，还有 stage-0 到 stage-4 的标准成形之前的各个阶段，这些都是实验版的 preset，建议不要使用。

## 配置

如果是**静态**配置，则在根目录下配置 .babelrc

```json
{
  "presets": [...],
  "plugins": [...]
}
```
::: tip
babel 会从当前转译的文件所在目录下查找配置文件，如果没有找到，就顺着文档目录树一层层往上查找，一直到 .babelrc 文件存在或者带 babel 字段的 package.json 文件存在为止。
:::



如果是**动态**创建配置文件、或编译 node_modules 文件夹中的代码，则使用 babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  const presets = [ ... ];
  const plugins = [ ... ];
  return {
    presets,
    plugins
  }
}
```

## polyfill

polyfill 是一个针对 ES2015+ 环境的shim，它把 ES2015+ 环境整体引入到你的代码环境中，**让你可以直接使用新标准所引入的新原生对象，新API等**，一般来说单独的应用和页面都可以这样使用。

实现上来说，polyfill 只是简单的把 [core-js](https://github.com/zloirock/core-js) 和 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 包装了下，这两个包才是真正的实现代码所在。

**安装**
```javascript
npm install --save @babel/polyfill
```
**使用方式: 普通**
```javascript
import "@babel/polyfill";
```
**使用方式: webpack**
```javascript
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
}
```

如果只是需要引入部分新原生对象或API，那么可以按需引入，而不必导入全部的环境，具体见下文的 core-js。

## runtime

### polyfill 和 runtime 的区别

直接使用 @babel/polyfill 对于应用或页面等环境全部在你控制之中的情况来说，并没有什么问题。但是对于在 library 中使用 @babel/polyfill，就变得不可行了！因为 library 是供外部使用的，但外部的环境并不在 library 的可控范围，而 @babel/polyfill 是会污染原来的全局环境的（因为新的原生对象、API这些都直接由 @babel/polyfill 引入到全局环境）。这样就很容易会发生冲突，所以这个时候，@babel/runtime 就可以派上用场了。

### transform-runtime 和 babel-runtime
@babel/plugin-transform-runtime 插件依赖 @babel/runtime，@babel/runtime 是真正提供 runtime 环境的包，也就是说 @babel/plugin-transform-runtime 插件是把 js 代码中使用到的新原生对象和静态方法转换成对 runtime 实现包的引用。举个例子如下：

```javascript
// 输入的ES6代码
var sym = Symbol();

// 通过transform-runtime转换后的ES5+runtime代码
var _symbol = require("@babel/runtime-corejs2/core-js/symbol");
var sym = (0, _symbol.default)();
```

从上面这个例子可见，原本代码中使用的 ES6 新原生对象 Symbol 被 @babel/plugin-transform-runtime 插件转换成了 @babel/runtime 的实现。既保持了Symbol的功能，同时又没有像polyfill那样污染全局环境（因为最终生成的代码中，并没有对Symbol的引用）

另外，这里我们也可以隐约发现，@babel/runtime 其实也不是真正的实现代码所在，真正的代码实现是在 core-js 中，后面我们再说。

### transform-runtime 插件的功能

- 把代码中的使用到的ES6引入的新原生对象和静态方法用babel-runtime/core-js导出的对象和方法替代
- 当使用generators或async函数时，用babel-runtime/regenerator导出的函数取代（类似polyfill分成regenerator和core-js两个部分）
- 把Babel生成的辅助函数改为用babel-runtime/helpers导出的函数来替代（babel默认会在每个文件顶部放置所需要的辅助函数，如果文件多的话，这些辅助函数就在每个文件中都重复了，通过引用babel-runtime/helpers就可以统一起来，减少代码体积）

上述三点就是transform-runtime插件所做的事情，由此也可见，babel-runtime就是一个提供了regenerator、core-js和helpers的运行时库。

建议不要直接使用babel-runtime，因为transform-runtime依赖babel-runtime，大部分情况下都可以用transform-runtime达成目的。

此外，transform-runtime在.babelrc里配置的时候，还可以设置helpers、polyfill、regenerator这三个开关，以自行决定runtime是否要引入对应的功能。

最后补充一点：**由于runtime不会污染全局空间，所以实例方法是无法工作的**（因为这必须在原型链上添加这个方法，这是和polyfill最大的不同） ，比如：

```javascript
var arr = ['a', 'b', 'c'];
arr.fill(7);  // 实例方法不行
Array.prototype.fill.apply(arr, 7);  // 用原型链来调用也是不行
```

### 通过core-js实现按需引入polyfill或runtime

core-js包才上述的polyfill、runtime的核心，因为polyfill和runtime其实都只是对core-js和regenerator的再封装，方便使用而已。
**但是polyfill和runtime都是整体引入的，不能做细粒度的调整**，如果我们的代码只是用到了小部分ES6而导致需要使用polyfill和runtime的话，会造成代码体积不必要的增大（runtime的影响较小）。所以，按需引入的需求就自然而然产生了，这个时候就得依靠core-js来实现了。

#### core-js的组织结构
首先，core-js有三种使用方式：

- 默认方式：require('core-js')
这种方式包括全部特性，标准的和非标准的
- 库的形式： var core = require('core-js/library')
这种方式也包括全部特性，只是它不会污染全局名字空间
- 只是shim： require('core-js/shim')或var shim = require('core-js/library/shim')
这种方式只包括标准特性（就是只有polyfill功能，没有扩展的特性）

core-js的结构是高度模块化的，它把每个特性都组织到一个小模块里，然后再把这些小模块组合成一个大特性，层层组织。比如：
core-js/es6（core-js/library/es6）就包含了全部的ES6特性，而core-js/es6/array（core-js/library/es6/array）则只包含ES6的Array特性，而core-js/fn/array/from（core-js/library/fn/array/from）则只有Array.from这个实现。
实现按需使用，就是自己选择使用到的特性，然后导入即可。具体的每个特性和对应的路径可以直接查看[core-js的github](https://github.com/zloirock/core-js#ecmascript-6)

### core-js的按需使用

1、类似polyfill，直接把特性添加到全局环境，这种方式体验最完整
```javascript
require('core-js/fn/set');
require('core-js/fn/array/from');
require('core-js/fn/array/find-index');

Array.from(new Set([1, 2, 3, 2, 1])); // => [1, 2, 3]
[1, 2, NaN, 3, 4].findIndex(isNaN);   // => 2
```

2、类似runtime一样，以库的形式来使用特性，这种方式不会污染全局名字空间，但是不能使用实例方法
```javascript
var Set       = require('core-js/library/fn/set');
var from      = require('core-js/library/fn/array/from');
var findIndex = require('core-js/library/fn/array/find-index');

from(new Set([1, 2, 3, 2, 1]));      // => [1, 2, 3]
findIndex([1, 2, NaN, 3, 4], isNaN); // => 2
```

3、因为第二种库的形式不能使用prototype方法，所以第三种方式使用了一个小技巧，通过::这个符号而不是.来调用实例方式，从而达到曲线救国的目的。这种方式的使用，路径中都会带有/virtual/

```javascript
import {fill, findIndex} from 'core-js/library/fn/array/virtual';

Array(10)::fill(0).map((a, b) => b * b)::findIndex(it => it && !(it % 8)); // => 4

// 对比下polyfill的实现
// Array(10).fill(0).map((a, b) => b * b).findIndex(it => it && !(it % 8));
```

## 调试
Babel 生成的代码是可调试的， 通过 source map，详细配置：[source-map-options](https://babeljs.io/docs/en/options#source-map-options)


## 作业
