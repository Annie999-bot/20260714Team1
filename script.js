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
    // TODO: Implement form handling
}
