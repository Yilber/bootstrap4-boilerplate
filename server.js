const serverConfig = {
    isStaticServer: true,
    hostname: '127.0.0.1',
    port: 80,
    base: 'dist',
    rootPath: './dist/',
    livereload: true,
    bin: 'C:/wamp/bin/php/php5.5.12/php.exe',
    ini: 'C:/wamp/bin/php/php5.5.12/php.ini',
};

if (serverConfig.isStaticServer) {
    // Static HTML server
    const StaticServer = require('static-server');
    const server = new StaticServer(serverConfig);

    server.start(() => {
        console.log('Starting static server on port', serverConfig.port);
    });
} else {
    // Dinamic PHP server
    const PHPServer = require('gulp-connect-php');
    const server = new PHPServer();

    server.server(serverConfig);
}
