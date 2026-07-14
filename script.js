// Team Profile Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team Profile Page loaded');
    initProjects();
    initContactForm();
});

/* ===========================================
   Projects Functions (Person C)
   =========================================== */
function initProjects() {
    const projectButtons = document.querySelectorAll('.project-btn');

    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card');
            const projectId = card.dataset.project;
            alert('Opening details for Project ' + projectId + '...\n\nThis would navigate to the project page in a real application.');
        });
    });
}

/* ===========================================
   Contact Form Functions (Person D)
   =========================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const messageCount = document.getElementById('message-count');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;
    
    if (!form || !status) return;

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const validators = {
        name(value) {
            if (value.length < 2) return 'Name must be at least 2 characters.';
            if (value.length > 60) return 'Name must be less than 60 characters.';
            if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name can only include letters, spaces, apostrophes, and hyphens.';
            return '';
        },
        email(value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
            return '';
        },
        subject(value) {
            if (!value) return 'Please select a subject.';
            return '';
        },
        message(value) {
            if (value.length < 15) return 'Message must be at least 15 characters.';
            if (value.length > 1000) return 'Message must be less than 1000 characters.';
            return '';
        }
    };

    function setFieldState(field, errorMessage) {
        const errorEl = document.getElementById(field.id + '-error');
        if (errorEl) errorEl.textContent = errorMessage;

        field.classList.remove('is-valid', 'is-invalid');
        if (!field.value.trim()) return false;

        field.classList.add(errorMessage ? 'is-invalid' : 'is-valid');
        return !errorMessage;
    }

    function validateField(field) {
        if (!field) return true;

        const value = field.value.trim();
        if (field.tagName !== 'SELECT') field.value = value;

        const validate = validators[field.name];
        const errorMessage = validate ? validate(value) : '';
        return setFieldState(field, errorMessage);
    }

    function updateMessageCount() {
        if (!messageCount || !fields.message) return;
        messageCount.textContent = fields.message.value.length;
    }

    Object.values(fields).forEach(field => {
        if (!field) return;
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', () => {
            validateField(field);
            if (field.id === 'message') updateMessageCount();
        });
    });

    updateMessageCount();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const allValid = Object.values(fields).every(validateField);
        if (!allValid) {
            status.textContent = 'Please fix the highlighted fields before submitting.';
            status.className = 'form-status error';
            return;
        }

        const data = {
            name: fields.name.value,
            email: fields.email.value,
            subject: fields.subject.value,
            message: fields.message.value
        };

        if (submitBtn) submitBtn.disabled = true;
        status.textContent = 'Sending message...';
        status.className = 'form-status sending';

        setTimeout(() => {
            console.log('Form submitted:', data);
            status.textContent = 'Message sent successfully! We will get back to you soon.';
            status.className = 'form-status success';
            form.reset();
            Object.values(fields).forEach(field => {
                if (!field) return;
                const errorEl = document.getElementById(field.id + '-error');
                if (errorEl) errorEl.textContent = '';
                field.classList.remove('is-valid', 'is-invalid');
            });
            updateMessageCount();
            if (submitBtn) submitBtn.disabled = false;
        }, 1200);
    });
}