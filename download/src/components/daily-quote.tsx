'use client';

import { useState, useEffect } from 'react';

const quotes = [
  'The secret of getting ahead is getting started.',
  'The best way to predict the future is to create it.',
  'Don\'t watch the clock; do what it does. Keep going.',
  'The future depends on what you do today.',
  'Well done is better than well said.',
];

export function DailyQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Get a new quote every day
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) /
        86400000
    );
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  if (!quote) return null;

  return (
    <p className="text-sm text-muted-foreground mt-2 italic">"{quote}"</p>
  );
}
