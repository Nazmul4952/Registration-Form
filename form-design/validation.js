const form = document.getElementById('form');
const errorMessage = document.getElementById('error-message');
const inputs = Array.from(form.querySelectorAll('input'));
// Function to toggle the dropdown visibility
function toggleDropdown() {
  const dropdown = document.querySelector('.custom-dropdown');
  dropdown.classList.toggle('open');
}

// Event listener for dropdown options
const options = document.querySelectorAll('.dropdown-option');
const selectedDepartment = document.getElementById('selected-department');
const departmentInput = document.getElementById('department-input');
const selectedLogo = document.getElementById('selected-logo');

options.forEach(option => {
  option.addEventListener('click', () => {
    const departmentValue = option.getAttribute('data-value');
    const departmentLogo = option.getAttribute('data-logo');
    const departmentText = option.textContent.trim();

    // Update the selected option
    selectedDepartment.querySelector('span').textContent = departmentText;
    selectedLogo.src = departmentLogo; // Set the logo of the selected department

    // Update the hidden input value
    departmentInput.value = departmentValue;

    // Close the dropdown
    const dropdown = document.querySelector('.custom-dropdown');
    dropdown.classList.remove('open');
  });
});

// Close the dropdown if user clicks outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-dropdown')) {
    const dropdown = document.querySelector('.custom-dropdown');
    dropdown.classList.remove('open');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.innerText = '';
  
  const firstError = validateForm();
  if (firstError) {
    errorMessage.innerText = firstError;
    return;
  }
  form.submit();
});

function validateForm() {
  for (const input of inputs) {
    const { id, value } = input;

    input.classList.remove('incorrect');

    if (!value) {
      input.classList.add('incorrect');
      return `${capitalize(id)} বাধ্যতামূলক দিতে হবে⚠️`;
    }
    if (id === 'password-input' && value.length < 8) {
      input.classList.add('incorrect');
      return '⚠️ পাসওয়ার্ড সর্বনিম্ন ৮ ডিজিটের হতে হবে';
    }
    if (id === 'repeat-password-input' && value !== form['password-input'].value) {
      input.classList.add('incorrect');
      return '⚠️ পাসওয়ার্ড মিল নেই';
    }
  }
  
  return null;
}

inputs.forEach(input => input.addEventListener('input', () => {
  input.classList.remove('incorrect');
  errorMessage.innerText = '';
}));

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).replace('-input', '');
}
