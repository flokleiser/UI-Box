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

export default Window