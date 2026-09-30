/* Preference only. Tutorial answers, scoring and progress remain app-owned. */
(()=>{
  'use strict';
  const key='forge-theme-v1',root=document.documentElement;
  let theme='dark';
  try {if(localStorage.getItem(key)==='light')theme='light';}catch{}
  function apply(value){
    theme=value;root.dataset.forgeTheme=theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='light'?'#f2f5f7':'#0c1116');
    document.querySelectorAll('[data-forge-theme-toggle]').forEach(button=>{
      button.textContent=theme==='dark'?'Light mode':'Dark mode';
      button.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' mode');
    });
  }
  apply(theme);
  document.addEventListener('DOMContentLoaded',()=>{
    apply(theme);
    document.querySelectorAll('[data-forge-theme-toggle]').forEach(button=>{
      button.addEventListener('click',()=>{apply(theme==='dark'?'light':'dark');try{localStorage.setItem(key,theme);}catch{}});
      // Flashcard shortcuts must not intercept activation of this header control.
      button.addEventListener('keydown',event=>event.stopPropagation());
    });
  });
  window.addEventListener('storage',event=>{if(event.key===key)apply(event.newValue==='light'?'light':'dark');});
})();
