//配置vue-loader的options选项
module.exports = (isDev) => {
    return{
        preserveWhiteSpace: true, //去除在vue文件中多余的空格
        extractCSS: !isDev, //把在vue中的css单独打包,在开发环境中不需要。
        //对vue文件中的css部分进行配置
        cssModules: {
            localIdentName: '[path]-[name]-[hash:5]',
            camelCase: true, //把css的类名变为驼峰型
        },
        //hotReload: false //根据环境变量生成
        loaders: {
            //可以自定义模块
            //'docs': docsLoader
        },
        preLoader: {
            //在用Vue官方提供的loader之前，先用preLoader
        },
        postLoader: {
            //在用Vue官方提供的loader之后，postLoader
        }
    }
}