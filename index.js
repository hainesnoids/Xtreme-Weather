//initialization
const electron = require('electron')
const path = require('path')
const minimist = require('minimist')

electron.app.setName('Xtreme Weather')

const argv = minimist(process.argv)

let win;
let splashWin;

async function main() {
    electron.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') electron.app.quit()
    })

    await electron.app.whenReady();

    //autoUpdater.checkForUpdatesAndNotify();

    //etc helpers
    electron.ipcMain.handle('is-focused', () => {
        if (win) {
            return win.isFocused();
        } else {
            return false;
        }
    })

    electron.ipcMain.handle('reload', () => {
        if (win) {
            win.webContents.reload()
        }
    })

    electron.ipcMain.handle('set-fullscreen', (e, value) => {
        if (win) {
            win.setFullScreen(value)
        }
    })

    electron.ipcMain.handle('set-on-top', (e, value) => {
        if (win) {
            win.setAlwaysOnTop(value)
        }
    })

    electron.ipcMain.handle('set-zoom', (e, amount) => {
        if (win) {
            win.webContents.setZoomLevel(amount)
        }
    })

    electron.ipcMain.handle('get-deeplink', () => {
        let deeplink = argv._[argv._.length - 1]
        if (deeplink) {
            return deeplink;
        } else {
            return null;
        }
    })

    await createWindow()

    electron.app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}

async function createWindow() {
    // create splash screen
    await createSplashWindow();

    win = new electron.BrowserWindow({
        width: 1200,
        height: 675,
        backgroundColor: '#282828',
        fullscreenable: true,
        titleBarStyle: 'default',
        frame: true,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            sandbox: false,
            nodeIntegrationInSubFrames: true,
            preload: path.join(__dirname, 'preload', 'index.js')
        },
        title: 'Xtreme Weather'
    })
    win.setMenuBarVisibility(false)
    win.setAutoHideMenuBar(false)

    let pageIsReady = false;
    win.once('ready-to-show', () => {
        //console.log('ready show')
        itsShowtime();
    })

    win.webContents.on('did-finish-load', () => {
        //console.log('loaded')
        pageIsReady = true;
        itsShowtime();
    });

    function itsShowtime() {
        if (pageIsReady && !win.isVisible()) {
            //console.log('showtime')
            win.show();
            electron.BrowserWindow.getAllWindows()[1].close();
            //setTimeout(() => {closeThatStupidFuckingSplashScreen()},2000)
        }
    }

    if (argv['debug-gpu']) {
        console.log('loading chrome://gpu')
        win.loadURL('chrome://gpu').then()
        return;
    }

    if (argv['enable-devtools']) {
        console.log('launching with devtools enabled')
        win.webContents.toggleDevTools()
    }

    //console.log('loading')
    win.loadURL('https://radar.xtremewx.com').then()

    //keep window title as Xtreme Weather
    win.webContents.on('page-title-updated', () => {
        win.setTitle('Xtreme Weather')
    })
}
async function createSplashWindow() {
    splashWin = new electron.BrowserWindow({
        width: 576,
        height: 324,
        backgroundColor: '#282828',
        fullscreenable: false,
        titleBarStyle: 'hidden',
        frame: false,
        title: 'splash'
    })
    splashWin.setMenuBarVisibility(false)
    splashWin.setAutoHideMenuBar(false)
    splashWin.once('ready-to-show', () => {
        splashWin.show();
    })
    await splashWin.loadFile('splash/index.html');
}

main().then()