
// Function that handles the popup window
function popupWindow() {
	const fieldsContainer = document.getElementById('fieldsContainer');
    const form = document.getElementById('wpform');
    const updateWp = document.getElementById('update');
    const popup = document.getElementById('popup');
    const retrieveId = document.getElementById('retrieveId');
    const closePopup = document.getElementById('cancel');
    const okButton = document.getElementById('ok');


    // Open the popup window
    updateWp.addEventListener('click', (e) => {
        e.preventDefault();
        popup.style.display = 'block';
    });

    // Close the popup window
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close the popup window if user clicks outside of it
    window.addEventListener('click', (e) => {
        if (e.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Retrieve data based on ID
    okButton.addEventListener('click', () => {
        const id = retrieveId.value;
        const saved = localStorage.getItem(id);
        if (saved) {
            const formData = JSON.parse(saved);

            // Reset the form and fields container
            form.reset();
            fieldsContainer.innerHTML = '';

            // Insert saved data into the form
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = formData[key];
                    }
                }
            }

            // Recreate dynamically generated fields, if any, based on the stored data
            const packageCount = parseInt(formData['workpackages']);
            if (!isNaN(packageCount)) {
                const packagesInput = document.getElementById('workpackages');
                packagesInput.value = packageCount;
                packagesInput.dispatchEvent(new Event('input'));

                // Populate the dynamically generated fields with the saved data
                for (let i = 0; i < packageCount; i++) {
                    
                    const textField = form.querySelector(`[name="workPackage${i + 1}"]`);
                    const numberField = form.querySelector(`[name="tasksOfwp${i + 1}"]`);

                    if (textField) textField.value = formData[`workPackage${i + 1}`];
                    if (numberField) {
                        numberField.value = formData[`tasksOfwp${i + 1}`];
                        numberField.dispatchEvent(new Event('input'));

                        const numberOfTasks = parseInt(numberField.value);
                        for (let j = 0; j < numberOfTasks; j++) {
                            const taskTitle = form.querySelector(`[name="titleOfTask${i + 1}_${j + 1}"]`);
                            const taskStart = form.querySelector(`[name="startMonthOfTask${i + 1}_${j + 1}"]`);
                            const taskEnd = form.querySelector(`[name="endMonthOfTask${i + 1}_${j + 1}"]`);

                            if (taskTitle) taskTitle.value = formData[`titleOfTask${i + 1}_${j + 1}`];
                            if (taskStart) taskStart.value = formData[`startMonthOfTask${i + 1}_${j + 1}`];
                            if (taskEnd) taskEnd.value = formData[`endMonthOfTask${i + 1}_${j + 1}`];
                        }
                    }

                }
            }

            workPackagePeriod();

            popup.style.display = 'none';
            alert("Data are loaded into the form! You can update them and re-submit the form to save the updated data!");

        } else {
            alert("No data found for the given ID!");
        }
    });

}
