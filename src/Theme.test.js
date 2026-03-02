import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock scrollTo as it's not implemented in JSDOM
window.scrollTo = jest.fn();

describe('Theme Logic', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('generateRandomTheme sets custom colors in localStorage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Find the random theme wheel (sparkles button)
    const wheelButton = screen.getByTitle(/Spin for a Random Theme!/i);
    expect(wheelButton).toBeInTheDocument();

    // Click it to trigger randomization
    fireEvent.click(wheelButton);

    // Verify localStorage has the custom theme colors
    const storedColors = JSON.parse(localStorage.getItem('custom-theme-colors'));
    expect(storedColors).toBeDefined();
    expect(storedColors).toHaveProperty('--bg-main');
    expect(storedColors).toHaveProperty('--bg-panel');
    expect(storedColors).toHaveProperty('--text-link');
    
    // Check if it's HSL format (as defined in App.js)
    expect(storedColors['--bg-main']).toMatch(/hsl\(\d+, 30%, 5%\)/);
  });
});
