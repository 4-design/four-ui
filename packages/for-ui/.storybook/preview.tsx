import React from 'react';
import '../styles/forty.css';
import '../styles/global.css';

export const parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: '#FFF',
      },
    ],
  },
  controls: { expanded: true },
  options: {
    storySort: {
      order: ['General', 'Form', 'Data Display', 'Feedback', 'Navigation'],
    },
  },
};

const rootElement = document.getElementById('root');

export const decorators = [
  (Story) => (
    <div className="p-2">
      <Story />
    </div>
  ),
];
