export function createSessionVaultServiceMock() {
  return jasmine.createSpyObj('SessionVaultService', {
    login: Promise.resolve(),
    restoreSession: Promise.resolve(),
    logout: Promise.resolve(),
  });
}
