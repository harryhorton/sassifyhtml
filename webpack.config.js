module.exports = {
    entry: './main.js',
    output:{
        filename: 'bundle.js'
    },
    devtool:'source-map',
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel',
                query:{
                    presets:['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
}