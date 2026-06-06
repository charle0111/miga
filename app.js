document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const dayTabsContainer = document.getElementById('dayTabs');

  // 1. Tab Switching Logic
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetDay = tab.getAttribute('data-day');

      // Deactivate all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate clicked tab and panel
      tab.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetDay}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Smooth scroll the tab bar on mobile so the active tab is visible and centered
      if (dayTabsContainer) {
        const containerWidth = dayTabsContainer.offsetWidth;
        const tabWidth = tab.offsetWidth;
        const tabLeft = tab.offsetLeft;
        const scrollTarget = tabLeft - (containerWidth / 2) + (tabWidth / 2);
        
        dayTabsContainer.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. Checklist LocalStorage Persistence
  const checklistInputs = document.querySelectorAll('.interactive-todo input[type="checkbox"]');
  
  // Load saved states
  checklistInputs.forEach((checkbox, index) => {
    const savedState = localStorage.getItem(`hokkaido_todo_${index}`);
    if (savedState !== null) {
      checkbox.checked = savedState === 'true';
    }
    
    // Save on change
    checkbox.addEventListener('change', () => {
      localStorage.setItem(`hokkaido_todo_${index}`, checkbox.checked);
    });
  });
});
