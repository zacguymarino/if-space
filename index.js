const { app, BrowserWindow, dialog, ipcMain, Menu, ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1920,
    height: 1080,
    icon: "images/ifs.ico"
  });
  win.loadFile("if_create.html");
};

function handleFileOpen() {
  const filePaths = dialog.showOpenDialogSync();
  if (filePaths) {
    let gameData = fs.readFileSync(filePaths[0], "utf-8");
    return gameData;
  }
}

function createNode() {
  var options = {
    type: 'question',
    buttons: ["Yes","Cancel"],
    cancelId: 1,
    message: 'Create a node at this location?'
  }
  return dialog.showMessageBoxSync(null,options);
}

function deleteNode() {
  var options = {
    type: 'question',
    buttons: ["Yes","Cancel"],
    cancelId: 1,
    message: 'Are you sure you want to delete the current node?'
  }
  return dialog.showMessageBoxSync(null,options);
}

async function deleteDenied() {
  var options = {
    type: 'error',
    buttons: ["Okay"],
    cancelId: 0,
    message: 'You cannot delete the origin node.'
  }
  return await dialog.showMessageBoxSync(null,options);
}

async function saveGame(event, gameContent) {
  const { filePath, canceled } = await dialog.showSaveDialog({
    buttonLabel: "Save",
    filters: [
      {
        name: "JSON File",
        extensions: ["json"],
      },
    ],
  });

  if (filePath && !canceled) {
    fs.writeFile(filePath, gameContent, (err) => {
      if (err) throw err;
    });
  }
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("loadGame", handleFileOpen);

ipcMain.handle("createNode", createNode);

ipcMain.handle("deleteNode", deleteNode);

ipcMain.on("deleteDenied", deleteDenied);

ipcMain.on("saveGame", saveGame);
