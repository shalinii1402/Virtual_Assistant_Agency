document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar) {
        sidebarToggle.style.display = 'block';

        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                // Desktop: Collapse/Expand
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            } else {
                // Mobile: Show/Hide
                sidebar.classList.toggle('active');
            }
        });

        // Close when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    });

    // Tab Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Task Modal Functionality
    const taskModal = document.getElementById('taskModal');
    const clickableRows = document.querySelectorAll('.clickable-row');
    const closeButtons = document.querySelectorAll('.close-modal, .close-modal-btn');
    const viewButtons = document.querySelectorAll('.action-btn[title="View"]');

    function openModal() {
        if (taskModal) taskModal.classList.add('active');
    }

    function closeModal() {
        if (taskModal) taskModal.classList.remove('active');
    }

    clickableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Prevent modal opening if action buttons are clicked
            if (!e.target.closest('.action-btns')) {
                openModal();
            }
        });
    });

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent duplicate triggers from row click
            openModal();
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            closeModal();
        }
    });
});

