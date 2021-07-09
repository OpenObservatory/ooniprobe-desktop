export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
  removeAllListeners: jest.fn(),
  sendSync: jest.fn()
}