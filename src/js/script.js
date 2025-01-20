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
const hint = document.querySelector('.hint');
const hintText = hint.querySelector('.hint-text');
const hintIcon = hint.querySelector('.hint-icon');

const changeUploadImg = (e) => {
	const file = e.target.files[0];
	if (file.size > 200 * 1024) {
		hintIcon.src = '/dist/images/icon-info-error.svg';
		hintText.textContent = 'File too large. Please upload a photo under 500KB.';
		hintText.style.color = 'var(--clr-orange-700)';
		return;
	}
	hintIcon.src = '/dist/images/icon-info.svg';
	hintText.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
	hintText.style.color = 'var(--clr-neutral-500)';
	const reader = new FileReader();

	reader.onload = (e) => {
		uploadIcon.src = e.target.result;
		console.log(e.target.result);
		uploadIcon.style.width = '50px';
		uploadIcon.style.height = '50px';
		uploadIcon.style.padding = '0';
		uploadIcon.style.border = '1px solid var(--clr-neutral-500)';

		uploadText.style.display = 'none';
		inputFile.disabled = true;

		if (!document.querySelector('.upload-settings')) {
			const uploadSettings = document.createElement('div');
			uploadSettings.classList.add(
				'upload-settings',
				'd-flex',
				'align-items-center',
				'justify-content-center',
				'gap-2'
			);
			uploadSettings.innerHTML = `
				<div class="upload-option-box z-1">
					<label class="remove-img text-decoration-underline">Remove image</label>
				</div>
				<div class="upload-option-box z-1">
					<label class="change-img text-decoration-underline">Change image</label>
				</div>`;
			uploadLabel.appendChild(uploadSettings);

			const removeBtn = uploadSettings.querySelector('.remove-img');
			removeBtn.addEventListener('click', removeUploadImg);
			const changeImgBtn = uploadSettings.querySelector('.change-img');
			changeImgBtn.addEventListener('click', changeUploadImgAction);
		}
	};
	reader.readAsDataURL(file);
};

const changeUploadImgAction = (e) => {
	e.preventDefault();
	inputFile.disabled = false;
	inputFile.click();
};
const removeUploadImg = (e) => {
	e.preventDefault();
	uploadIcon.src = '/dist/images/icon-upload.svg';
	uploadIcon.style.width = 'auto';
	uploadIcon.style.height = 'auto';
	uploadIcon.style.padding = '';
	uploadIcon.style.border = '';
	uploadText.style.display = 'block';
	const uploadSettings = document.querySelector('.upload-settings');
	if (uploadSettings) {
		uploadSettings.remove();
	}
	inputFile.value = '';
	inputFile.disabled = false;
};

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
const validateInputs = () => {
	const isNameValid = nameInput.value.length > 3;
	const isEmailValid = emailRegex.test(emailInput.value);
	const isGithubValid = githubInput.value.length > 3;

	return isNameValid && isEmailValid && isGithubValid;
};

const generateTicket = () => {
	checkInputs();
	if (validateInputs()) {
		console.log('jest ok');
	} else {
		console.log('nie jest ok');
	}
};

inputFile.addEventListener('change', changeUploadImg);
generateBtn.addEventListener('click', generateTicket);
nameInput.addEventListener('keydown', (e) => {
	if (e.key >= '0' && e.key <= '9') {
		e.preventDefault();
	}
});
