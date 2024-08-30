export type Page = 'Home' | 'Settings' | 'Buttons' | 'Spinner' | 'Particles' | 'Switches' | 'Tether' | 'Ball' | 'Joystick' | 'Test' | 'Cube' | 'Musializer';

export const startPage = "Musializer"

declare global {
  interface Window {
      loadPage: (page: Page) => void;
      setActivePage: (page: Page) => void;
      darkMode: {
            toggle: () => Promise<void>;
            system: () => Promise<void>;
            getThemeSource: () => Promise<string>;
        }
  }
}

const setActivePage = (page: Page) => {
  console.log('setActivePage', page);
  const event = new CustomEvent('pageChange', {detail: {page}})
  window.dispatchEvent(event)
}

window.setActivePage = setActivePage


export default Window