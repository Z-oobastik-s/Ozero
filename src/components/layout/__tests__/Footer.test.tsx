import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© Озеро Михайлына/)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Рыбалка')).toBeInTheDocument();
    expect(screen.getByText('Отдых')).toBeInTheDocument();
    expect(screen.getByText('Кафе')).toBeInTheDocument();
    expect(screen.getByText('Новости')).toBeInTheDocument();
    expect(screen.getByText('Галерея')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('+380 99 123 45 67')).toBeInTheDocument();
    expect(screen.getByText('info@ozero-mikhailyna.com')).toBeInTheDocument();
  });
}); 