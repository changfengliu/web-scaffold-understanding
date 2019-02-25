# babel 能做什么？

Babel 是一个 JavaScript 编译器，用于将源代码转译成目标代码。跟其它的编译器一样，它主要分成三部分，。

> Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

::: tip
For an awesome tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler), which also explains how Babel itself works on a high level.
:::



## Babel 用途？

- Transform syntax
- Polyfill features that are missing in your target environment (through @babel/polyfill)
- Source code transformations (codemods)


Babel 是一个JavaScript  编译器，使我们能够在开发代码中使用 JavaScript  新式语法。我们知道从 2015 年ES6对JS的语法做了较大的升级后，至今天每年都会对JS做一些升级。Babel负责将我们在开发代码中使用的新式语法，编译成浏览器兼容性良好的js代码。从而使开发效率有了较大的提升。


**javascript的版本：**
- http://developer.51cto.com/art/201710/553560.htm
- http://2ality.com/2017/02/ecmascript-2018.html


Babel is a JavaScript Compiler
使我们能够用下一代的JS新式语法编写前端代码。


Babel 通过语法转换，支持最新版本的 js，再也不需要等待浏览器支持这些语法了。

Babel 可以通过 React preset 转换 JSX 代码。

Babel 可以通过 TypeScript preset 与 Flow preset 除去类型注释代码。也就是说您可以在业务代码中，使用这些类型检查功能，然后在编译时，通过 babel 将它们转换成可执行代码。

Babel is pluggable, 您可以使用 babel 官方提供的大量插件，或自定义自己的插件。一个 babel 插件就是一个函数，如：
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
**preset 是预定义的插件集合**。babel 将代码转换功能，以非常细的粒度，封装成大量插件。使用 preset 的概念，将插件分组，使我们更方便地使用这些 plugins.

Babel 生成的代码是是可调试的， 通过 source map。
？： source map 生成的功能，是 babel 的？ 还是 webpack 的？

### 配置

如果是静态配置，则使用 .babelrc
```json
{
  "presets": [...],
  "plugins": [...]
}
```
?: .babelrc 配置文件的查找规则？？， 如果父文件夹与子文件夹都存在这个配置文件，如何应用？


如果想动态创建配置文件、或编译 node_modules 文件夹中的代码，则使用 babel.config.js
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

### Plugins

Transform Plugins / Syntax Plugins

plugins 开发手册
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md
