/* eslint-disable no-unused-vars */
export const showError = (message) => {
  const n = new Notification('Ошибка', { body: message });
};

export const showWarning = (message) => {
  const n = new Notification('Внимание!', { body: message });
};

export const showSuccess = (message) => {
  const n = new Notification('Успех!', { body: message });
};
