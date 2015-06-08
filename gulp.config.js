//configuration for gulp

module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var server = './src/server/';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({
        devDependencies: true
    })['js'];

    var config = {
        /*
         * All file paths
         */
        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],

        build: './build/',

        client: client,

        css: temp + 'styles.css',

        fonts: ['./bower_components/font-awesome/fonts/**/*.*'],

        html: '**/*.html',

        htmltemplates: clientApp + '**/*.html',

        images: client + 'images/**/*.*',

        index: client + 'index.html',

        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: [client + '/styles/styles.less'],

        report: report,

        root: root,

        server: server,

        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /*
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },

        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * Browser Sync
         */
        browserReloadDelay: 1000,

        /**
         * karma and testing settings
         */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntergrationSpecs: [client + 'tests/server-intergration/**/*.spec.js'],

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ////////////////
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache,
                config.serverIntergrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {
                        type: 'html',
                        subdir: 'report-html'
                    },
                    {
                        type: 'lcov',
                        subdir: 'report-html'
                    },
                    {
                        type: 'text-summary'
                    }

                ]
            },
            preprocessors: {}
        };

        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
};
