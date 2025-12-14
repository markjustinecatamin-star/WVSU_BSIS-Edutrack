// WVSU-BSIS EduTrack JavaScript Functions

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Confirm action before submitting forms
function confirmAction(message, formId) {
    if (confirm(message)) {
        document.getElementById(formId).submit();
    }
}

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // Add active class to current page link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    
    return isValid;
}

// Password strength indicator
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Update password strength indicator
function updatePasswordStrength(inputId, strengthElementId) {
    const password = document.getElementById(inputId).value;
    const strength = checkPasswordStrength(password);
    const strengthElement = document.getElementById(strengthElementId);
    
    let strengthText = '';
    let strengthColor = '';
    
    switch(strength) {
        case 0:
        case 1:
            strengthText = 'Very Weak';
            strengthColor = '#ff0000';
            break;
        case 2:
            strengthText = 'Weak';
            strengthColor = '#ff6600';
            break;
        case 3:
            strengthText = 'Fair';
            strengthColor = '#ffff00';
            break;
        case 4:
            strengthText = 'Good';
            strengthColor = '#66ff00';
            break;
        case 5:
            strengthText = 'Strong';
            strengthColor = '#00cc00';
            break;
    }
    
    strengthElement.textContent = `Password Strength: ${strengthText}`;
    strengthElement.style.color = strengthColor;
}

// Print functionality for reports
function printReport() {
    window.print();
}

// Export to PDF functionality (would integrate with a PDF library in real implementation)
function exportToPDF(reportType) {
    alert(`Exporting ${reportType} report to PDF...`);
    // In a real implementation, this would trigger PDF generation
}

// Search functionality for tables
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                const txtValue = cells[j].textContent || cells[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        if (found) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Filter subjects by year level
function filterSubjectsByYear(yearLevel) {
    const allRows = document.querySelectorAll('#subjects-table tbody tr');
    
    allRows.forEach(row => {
        const yearCell = row.cells[0]; // Assuming first column contains year level info
        if (yearCell.textContent.includes(yearLevel) || yearLevel === 'all') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Toggle password visibility
function togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
    
    const button = field.nextElementSibling;
    button.textContent = type === 'password' ? 'Show' : 'Hide';
}