module.exports = {
	title: "前端工具篇",
	description: '',
	base: '/web-scaffold-understanding/',
	dest: './docs',
	themeConfig: {
    nav: [
	    { text: '首页', link: '/index.md' }
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
