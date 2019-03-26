module.exports = {
	title: "前端工具篇",
	description: '',
	base: '/web-scaffold-understanding/',
	dest: './docs',
	themeConfig: {
    nav: [
	    { text: '首页', link: '/index.md' },
			{
				text: '官网',
				items: [{
					text: 'Babel',
					link: 'https://babeljs.io/'
				}, {
					text: 'Webpack',
					link: 'https://webpack.js.org/'
				}, {
					text: '---------',
					link: ''
				}, {
					text: 'Vuepress',
					link: 'https://vuepress.vuejs.org'
				}, {
					text: 'Mermaid',
					link: 'https://mermaidjs.github.io/'
				}]
			},
			{
				text: '工具',
				items: [{
					text: 'Babel 在线转译',
					link: 'https://babeljs.io/repl'
				}]
			}
    ],
		search: true,
    sidebar: [
			{
        title: 'JS 预处理',
        collapsable: false,
				path: 'js-preprocessor.md',
        children: [
          '/babel.md',
					'/babel-deepen.md'
        ]
      },
			'/css-preprocessor.md',
			{
        title: 'Html 预处理',
        collapsable: false,
        children: [
					'/templating.md',
					'/v-dom.md'
        ]
      },
			{
        title: '打包器(moduler)',
        collapsable: false,
        children: [
					'module.md',
					'webpack.md',
					'webpack-deepen.md',
        ]
      },
			{
        title: '构建工具(task runner)',
        collapsable: false,
        children: [
          'shell.md',
					'grunt.md',
					'gulp.md',
					'fis3.md'
        ]
      }
    ]
	},
	plugins: [
		'@vuepress/back-to-top'
	]
}
