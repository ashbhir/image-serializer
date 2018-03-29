var path = require('path');

module.exports = {
    entry : __dirname + '/demo/src/app.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : __dirname + '/demo/src',
                exclude : /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'demo/dist')
    }
}