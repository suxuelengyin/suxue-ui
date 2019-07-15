module.exports = {
	title: "zjs-vue",
	head: [
		['link', { rel: 'icon', href: `/favicon.ico` }],
		['meta', { name: "referrer", content: "no-referrer" }]
	],
	themeConfig: {
		editLinks: true,
		nav: [
			{ text: '首页', link: '/' },
			{ text: '组件', link: '/components/' },
            { text: 'Blog', link: 'https://www.suxuewb.cn' },
			{ text: 'GitHub', link: 'https://github.com/suxuelengyin/suxue-ui.git' },
		],
		sidebar: [
            genWhySidebarConfig('介绍', '/introduce/', []),
			genWhySidebarConfig('组件', '/components/', ['Picker']),
		]
	},

}
function genWhySidebarConfig(title, path, children = []) {
	return {
		title,
		collapsable: false,
		children: [path, ...children.map(item => path + item)]
	}

}