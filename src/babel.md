# Babel

## 定义

Babel 是**一个 JavaScript 编译器**，用于将源代码转译成目标代码。源代码是 ES6+ 系列的各种高级 JS 语法，甚至也可以是一些自定义语法；目标代码是浏览器兼容性良好的 JS 语法。Babel 使我们马上可以用最前沿的 JS 语法编写我们的应用，而不必等宿主环境的升级。

::: tip
编译器的一般处理过程，请参考：[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler), 这篇文章也介绍了 Babel 本身是如何工作的.
:::

## 插件

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

## 配置

如果是**静态**配置，则在根目录下配置 .babelrc

```json
{
  "presets": [...],
  "plugins": [...]
}
```

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

## 调试
Babel 生成的代码是可调试的， 通过 source map，详细配置：[source-map-options](https://babeljs.io/docs/en/options#source-map-options)
