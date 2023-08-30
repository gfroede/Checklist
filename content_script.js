// Importar as bibliotecas necessárias
import { BrowserAction, Permissions } from 'chrome.webstore';

// Declarar a extensão
const extension = {
  name: 'Marcador de checkbox',
  description: 'Uma extensão que marca checkbox de acordo com um número',
  manifest: {
    version: '1.0.0',
    content_scripts: [
      {
        // Este content_script é executado em todas as páginas
        js: ['content_script.js'],
        matches: ['http://*/*', 'https://*/*'],
      },
    ],
    permissions: [Permissions.tabs],
  },
};

// Definir o evento de clique do botão
extension.onInstall = () => {
  new BrowserAction(extension.id, (event) => {
    // Obter o número de checkbox a marcar
    const number = event.detail.number;

    // Obter todos os checkbox da página
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Marcar os checkbox
    for (let i = 0; i < checkboxes.length; i++) {
      if (i < number) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false;
      }
    }
  });
};

// Exportar a extensão
export default extension;
