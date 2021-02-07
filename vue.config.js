module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:8181/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    }
}