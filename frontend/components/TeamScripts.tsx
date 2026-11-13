'use client';

import { useEffect } from 'react';

// Port of the inline filter script in templates/team.html.
export default function TeamScripts() {
  useEffect(() => {
    const filterButtons = document.querySelectorAll<HTMLElement>('.faculty-filter-btn');
    const facultyCards = document.querySelectorAll<HTMLElement>('.faculty-card');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((other) => other.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        facultyCards.forEach((card) => {
          if (filterValue === 'all' || card.getAttribute('data-branch') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }, []);

  return null;
}
