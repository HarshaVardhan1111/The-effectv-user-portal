document.addEventListener('DOMContentLoaded', function() {
    // Function to show submenu
    function showSubmenu(event) {
        const submenu = event.currentTarget.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'block';
        }
    }

    // Function to hide submenu
    function hideSubmenu(event) {
        const submenu = event.currentTarget.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'none';
        }
    }

    // Get all navigation items with submenus
    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
        // Show submenu on hover
        item.addEventListener('mouseenter', showSubmenu);
        item.addEventListener('mouseleave', hideSubmenu);
    });
});
