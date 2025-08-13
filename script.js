 // Self-invoking function to encapsulate script
    (function () {
      // --- Scroll Animations for Sections ---
      const sections = document.querySelectorAll('section');
      const backToTopButton = document.querySelector('.back-to-top');
      const navLinks = document.querySelectorAll('.nav-links a');

      // --- Typed.js Subtitle Animation ---
      const typed = new Typed('#typed-subtitle', {
        strings: [
          "Web Developer",
          "Technology Enthusiast",
          "Content Creator",
        ],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        backDelay: 1500,
        startDelay: 500,
      });

      const observerOptions = {
        root: null,
        rootMargin: '50px', // Trigger 50px before section enters viewport
        threshold: 0.2 // Trigger when only 20% of section is visible
      };

      // Separate observer options for navigation highlighting
      const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Only highlight when section is prominently in view
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Separate observer for navigation highlighting
      const navObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // --- Active Nav Link Highlighting ---
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
              link.classList.remove('active');
              // Add active class to the link that corresponds to the visible section
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }, navObserverOptions);

      sections.forEach(section => {
        sectionObserver.observe(section);
        navObserver.observe(section); // Observe with both observers
      });

      // --- Back to Top Button Visibility ---
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });

      // --- Advanced Contact Form Logic ---
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
          // Handle floating labels based on input value
          input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
              input.classList.add('has-value');
            } else {
              input.classList.remove('has-value');
            }
          });
          // Check on load for autofilled values
          if (input.value.trim() !== '') {
            input.classList.add('has-value');
          }
        });

        contactForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const isValid = validateForm();
          const formStatus = document.getElementById('form-status');

          if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Message sent successfully! Thank you.';
            formStatus.className = 'success';
            contactForm.reset();
            inputs.forEach(input => input.classList.remove('has-value', 'invalid'));
            setTimeout(() => formStatus.textContent = '', 5000);
          } else {
            formStatus.textContent = 'Please correct the highlighted fields.';
            formStatus.className = 'error';
          }
        });
      }

      function validateForm() {
        let isValid = true;
        clearErrors();
        const fieldsToValidate = [
          { id: 'name', validation: (val) => val.trim() !== '', message: 'Full name is required.' },
          { id: 'email', validation: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'A valid email is required.' },
          { id: 'message', validation: (val) => val.trim() !== '', message: 'A message is required.' }
        ];

        fieldsToValidate.forEach(field => {
          const input = document.getElementById(field.id);
          if (!field.validation(input.value)) {
            isValid = false;
            showError(input, field.message);
          }
        });

        return isValid;
      }

      function showError(input, message) {
        input.classList.add('invalid');
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
          errorSpan.textContent = message;
        }
      }

      function clearErrors() {
        const invalidInputs = contactForm.querySelectorAll('.invalid');
        invalidInputs.forEach(input => input.classList.remove('invalid'));
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(span => span.textContent = '');
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
          formStatus.textContent = '';
          formStatus.className = '';
        }
      }
    })();