const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
// const isDev = require('electron-is-dev');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let menu, Menu = electron.Menu;
let view;
let menuTemplate = [
    {label: 'Exit',click: ()=>{
        // if(mainWindow.webContents.canGoBack())
        // {mainWindow.webContents.goBack()}
        mainWindow.destroy()
    }}
]
let menuViewTemplate = [
    {label: 'Close',click: ()=>{
        if(view)
            view.destroy();
        // mainWindow.loadURL(`file://${path.join(__dirname, '../app/index.html')}`);
    }}
]
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1920, height: 1080, frame: false, fullscreen: false, show: false, kiosk: true, 'web-preferences': {'plugins': true,nodeIntegration: false} });
    menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu);
    // and load the index.html of the app.
    mainWindow.loadURL(`file://${path.join(__dirname, '../app/index.html')}`);
    // mainWindow.loadURL(`http://localhost:3000`);
    
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-navigate',(e,ob)=>{
        mainWindow.webContents.on('context-menu',(e,ob)=>{
            e.preventDefault()
            menu.popup({});
        })   

    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
    mainWindow.on('ready-to-show',()=>{
        mainWindow.show();
    })
    mainWindow.on('crashed',(err)=>{
        console.log('Crashed', err)
    })
    
    ipcMain.on('open-url',(e,url)=>{
        view = new BrowserWindow({width: 1900,height: 1000,show: false});
        let viewMenu = Menu.buildFromTemplate(menuViewTemplate)
        view.setMenu(viewMenu)
        view.once('ready-to-show',()=> view.show())
        view.loadURL(url)
    })    
}
// show touch keyboard

app.commandLine.appendSwitch('--enable-features=InputPaneOnScreenKeyboard')
app.commandLine.appendSwitch('--disable-usb-keyboard-detect')

// function showTouchKeyboard() {
//     exec('start /d "C:\\Program Files\\Common Files\\microsoft shared\\ink" TabTip.exe', (error, stdout, stderr) => {
//         if (error) {
//             console.error(error);
//             return;
//         }
//     });
// }

app.setLoginItemSettings({
    openAtLogin: true
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
