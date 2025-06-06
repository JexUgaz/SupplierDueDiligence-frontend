let logoutCallback: (() => void) | null = null;

export const AuthDispatcher = {
  setLogoutCallback(fn: () => void) {
    logoutCallback = fn;
  },

  logout() {
    if (logoutCallback) logoutCallback();
  },
};
