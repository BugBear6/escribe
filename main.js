const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

// init win
var win;

function createWindow() {
    // Create browser window
    win = new BrowserWindow({
        width: 606,
        height: 190,
        icon: __dirname + '/img/icon-reflective.png',
        resizable: false,
        titleBarStyle: 'hiddenInset',
        fullscreenable: false
    });

    // Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // Open devtools
    // win.webContents.openDevTools();

    win.on('closed', function() {
        win = null;
    })
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})