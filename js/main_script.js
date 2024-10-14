
// Initialization of the application
document.addEventListener('DOMContentLoaded', (event) => {
	
	// Create form with the necessary fields
	createForm();

	// Handle form submission and data
	formSubmission();

	// Handle popup window
	popupWindow();

	// Make sure data provided by user are valid
	validateData();

});