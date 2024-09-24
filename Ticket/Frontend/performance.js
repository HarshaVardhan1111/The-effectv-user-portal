let isEditing = false;

// Function to show/hide input fields and edit mode
function toggleEditMode() {
    const skillInput = document.getElementById('skillInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    
    isEditing = !isEditing;

    if (isEditing) {
        skillInput.style.display = 'inline'; // Show input
        addSkillBtn.style.display = 'inline'; // Show button
        document.querySelectorAll('.removeBtn').forEach(btn => btn.style.display = 'inline'); // Show remove buttons
        document.getElementById('editSkillBtn').textContent = 'Done Editing'; // Change button text
    } else {
        skillInput.style.display = 'none'; // Hide input
        addSkillBtn.style.display = 'none'; // Hide button
        document.querySelectorAll('.removeBtn').forEach(btn => btn.style.display = 'none'); // Hide remove buttons
        document.getElementById('editSkillBtn').textContent = 'Edit Skills'; // Reset button text
    }
}

// Function to add a skill
document.getElementById('addSkillBtn').addEventListener('click', function() {
    const skillInput = document.getElementById('skillInput');
    const skillList = document.getElementById('skillList');

    if (skillInput.value) {
        const li = document.createElement('li');
        li.textContent = skillInput.value;

        // Create a remove button for each skill
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('removeBtn');
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.display = isEditing ? 'inline' : 'none'; // Show only in edit mode

        // Add event listener to the remove button
        removeBtn.addEventListener('click', function() {
            skillList.removeChild(li);
        });

        li.appendChild(removeBtn);
        skillList.appendChild(li);
        skillInput.value = ''; // Clear input
    }
});

// Edit button functionality
document.getElementById('editSkillBtn').addEventListener('click', toggleEditMode);

// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show the selected section
}

// Event listeners for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const target = this.getAttribute('data-target'); // Get the target section ID
        showSection(target); // Show the target section
    });
});

// Show the default section (skills) on page load
showSection('skills');
