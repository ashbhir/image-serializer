var path = require('path');

module.exports = {
    entry : __dirname + '/src/app.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : path.resolve(__dirname, 'src'),
                exclude : /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    externals : {
        'react' : 'commonjs react',
    },
    output : {
        filename : 'index.js',
        path : path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    }
}