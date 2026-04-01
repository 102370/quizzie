document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default for placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            // Remove active class from all, add to this one
            navItems.forEach(ni => ni.classList.remove('active'));
            this.classList.add('active');
        });
    });
});