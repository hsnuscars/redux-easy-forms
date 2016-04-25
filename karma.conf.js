// configure Karma
module.exports = function ( config ) {

    config.set({
        // webpack config
        webpack: {
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader:  'babel-loader',
                        test:    /\.js?$/
                    }
                ],
            },
            devtool: 'inline-source-map'
        },

        browsers: [ 'Chrome' ],

        // karma only needs to know about the test bundle
        files: [
            'tests.js'
        ],

        // select test libs
        frameworks: [ 'mocha', 'chai' ],

        // TODO: ARE THESE NEEDED HERE OR NOT? SEEMS TO MAKE NO DIFFERENCE..
        // plugins: [
        //   'karma-chrome-launcher',
        //   'karma-chai',
        //   'karma-mocha',
        //   'karma-sourcemap-loader',
        //   'karma-webpack',
        // ],

        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
          'tests.js': [ 'webpack', 'sourcemap' ]
        },

        // TODO: LEARN MORE ABOUT THESE..
        reporters: [ 'spec' ],

        singleRun: true,

        // suppress webpack server/middleware logging
        webpackMiddleware: {
          noInfo: true
        }
    });
};
