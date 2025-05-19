document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.botoes a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 

      const targetID = this.getAttribute('href');
      const targetElement = document.querySelector(targetID);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
