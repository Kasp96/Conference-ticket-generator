const uploadInput = document.querySelector('.file-input');
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const githubInput = document.querySelector('.github-input');
const generateBtn = document.querySelector('.generate-btn');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputFile = document.querySelector('.file-input');
const uploadLabel = document.querySelector('.upload-label');
const uploadIcon = document.querySelector('.upload-img-icon');
const uploadText = document.querySelector('.upload-text');

const checkNameInput = () => {
	const error = nameInput.parentElement.nextElementSibling;
	const errorText = error.querySelector('.error-text');
	if (nameInput.value === '' || nameInput.value.length <= 3) {
		nameInput.style.border = '1px solid var(--clr-orange-500)';
		error.style.display = 'flex';
		errorText.textContent = 'Please enter a valid name';
	} else {
		nameInput.style.border = '1px solid var(--clr-neutral-500)';
		error.style.display = 'none';
	}
};

const checkEmailInput = () => {
	const error = emailInput.parentElement.nextElementSibling;
	const errorText = error.querySelector('.error-text');
	if (emailRegex.test(emailInput.value)) {
		error.style.display = 'none';
		emailInput.style.border = '1px solid var(--clr-neutral-500)';
	} else {
		console.log(errorText);
		emailInput.style.border = '1px solid var(--clr-orange-500)';
		error.style.display = 'flex';
		errorText.textContent = 'Please enter a valid email address.';
	}
};

const checkGithubInput = () => {
	const error = githubInput.parentElement.nextElementSibling;
	const errorText = error.querySelector('.error-text');
	if (githubInput.value === '' || githubInput.value.length <= 3) {
		githubInput.style.border = '1px solid var(--clr-orange-500)';
		error.style.display = 'flex';
		errorText.textContent = 'Please enter a valid GitHub username';
	} else {
		githubInput.style.border = '1px solid var(--clr-neutral-500)';
		error.style.display = 'none';
	}
};

const checkInputs = () => {
	checkNameInput();
	checkEmailInput();
	checkGithubInput();
};

const generateTicket = () => {
	checkInputs();
};

generateBtn.addEventListener('click', generateTicket);
nameInput.addEventListener('keydown', (e) => {
	if (e.key >= '0' && e.key <= '9') {
		e.preventDefault();
	}
});
inputFile.addEventListener('change', (e) => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
		uploadIcon.src = e.target.result;
		uploadIcon.style.width = '50px';
		uploadIcon.style.height = '50px';
		uploadIcon.style.padding = '0';
		uploadIcon.style.border = '1px solid var(--clr-neutral-500)';
		uploadText.style.display = 'none';
		const uploadSettings = document.createElement('div');
		uploadSettings.classList.add(
			'upload-settings',
			'd-flex',
			'align-items-center',
			'justify-content-center',
			'gap-2'
		);
		uploadSettings.innerHTML = `<div class="upload-option-box z-1">
                        <label class="remove-img text-decoration-underline" for="filInput">Remove image</label>
                        <input class="upload-option d-none" type="file">
                    </div>
                    <div class="upload-option-box z-1">
                        <label class="change-img" for="filInput">Change image</label>
                        <input class="upload-option d-none" type="file">
                    </div>`;
		uploadLabel.appendChild(uploadSettings);
	};
	reader.readAsDataURL(file);
});
