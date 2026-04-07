import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './Avatar';

describe('Avatar fallback behavior', () => {
  it('renders fallback when image is null', () => {
    render(<Avatar image={null} username="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders fallback when image is empty string', () => {
    render(<Avatar image="" username="Bob" />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders fallback when image is broken', () => {
    render(<Avatar image="broken-url.jpg" username="Charlie" />);
    const imgs = screen.getAllByRole('img');
    // Simulate image error on the inner <img>
    const img = imgs.find(el => el.tagName === 'IMG');
    if (img) {
      img.onerror();
    }
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('renders fallback as ? when username is missing', () => {
    render(<Avatar image={null} username={null} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders non-ASCII username initial', () => {
    render(<Avatar image={null} username="Émile" />);
    expect(screen.getByText('É')).toBeInTheDocument();
  });
});
