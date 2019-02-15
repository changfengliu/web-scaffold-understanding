module.exports = {
	title: "前端构建工具",
	description: '',
	base: '/docs/',
	dest: './docs',
	themeConfig: {
    nav: [
	    { text: '首页', link: '/index.md' }
    ],
		search: true,
    sidebar: [
			'history.md',
			{
        title: 'JS 预处理',
        collapsable: false,
        children: [
					'js-preprocessor.md',
          '/babel.md',
					'/babel-deepen.md'
        ]
      },
			{
        title: 'CSS 预处理',
        collapsable: false,
        children: [
					'/css-preprocessor.md'
        ]
      },
			{
        title: 'Templating',
        collapsable: false,
        children: [
					'/templating.md'
        ]
      },
			{
        title: '专门工具',
        collapsable: false,
        children: [
					'module.md'
        ]
      },
			{
        title: '构建工具',
        collapsable: false,
        children: [
          'shell.md',
					'webpack.md',
					'webpack-deepen.md',
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
