# Html 模板引擎

使用模板引擎的好处:
1. 它弥补了 html 表现力的不足，将条件判断、循环、表达式绑定、事件绑定等动态特性引入进来。
2. 它避免了繁琐的 dom 操作。通过 **html = templateEngine(template, data)** 的方式得到需要渲染的 html，而后整体更新页面。当然整体更新不高效，所以出现了 v-dom 技术。
3. 模板引擎很好地分离了表现层与逻辑层。

以下列出几种常用的模板技术，从是否使用 v-dom 技术的角度来看，可分成两类：Vue Template / JSX 是一类，Handlebars / Jade 是另外一类。

## Vue Template

Vue 组件中指定的 template 部分，由框架中的 compiler 模块编译成 vnode，而后由虚拟节点生成 html.

```html
<div class="cmp-wrapper">
	<el-form label-width="75px" :model="record" size="small" class="props-list">
		<el-form-item
			v-for="field in fields['items']"
			:key="field['key']"
			:label="field['label']"
		>
			<template>
				<!--输入框-->
				<template v-if="field['type'] == 'input'">
					<el-input v-model="record[field['key']]" style="width:100%;"></el-input>
				</template>
				<!--开关-->
				<template v-if="field['type'] == 'switch'">
					<el-switch v-model="record[field['key']]" />
				</template>
				<!--下拉框-->
				<template v-if="field['type'] == 'select'">
					<el-select
						v-model="record[field['key']]"
						:multiple="field['multiple'] === true"
						placeholder="请选择..."
						style="width:100%;">
						<el-option v-for="opt in field['options']" :key="opt.label" :label="opt.label" :value="opt.value" />
					</el-select>
				</template>
			</template>
		</el-form-item>
	</el-form>
</div>
```

## JSX

JSX 的语法是与 js 混合度较高的一种，最后也生成 vnode。

```javascript
class App extends Component {
  render() {
    return (
      <box label="react-blessed demo"
           border={{type: 'line'}}
           style={{border: {fg: 'cyan'}}}>
        <InnerBox position="left" />
        <InnerBox position="right" />
        <ProgressBar />
        Random text here...
      </box>
    );
  }
}
```

## Jade

非常简洁，性能颇高，可用在 nodejs 端。

参考：[http://jade-lang.com/](http://jade-lang.com/)

```html
!!! 5
html(lang="en")
  head
    title= pageTitle
    :javascript
      | if (foo) {
      |    bar()
      | }
  body
    h1 Jade - node template engine
    #container
      - if (youAreUsingJade)
         You are amazing
      - else
         Get on it!
         Get on it!
         Get on it!
         Get on it!
```

## handlebars

扩展性极强
参考：[http://handlebarsjs.com/](http://handlebarsjs.com/)

```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```
