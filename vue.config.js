module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        port: 8082,
        host: 'localhost',
        open: true,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8081/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'

                }
            }
        }

    }
}