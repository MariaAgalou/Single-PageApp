
// Function that handles the submission of the form and the data provided by the user
function formSubmission() {
    const fieldsContainer = document.getElementById('fieldsContainer');
    const form = document.getElementById('wpform');

    // Submission of the form
    document.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Collect all form data
        const formData = new FormData(form);

        // Store submitted data on local storage
        const submittedData = {};
        formData.forEach((value, key) => {
            submittedData[key] = value;
        });

        const uniqueId = submittedData['id'];
        localStorage.setItem(uniqueId, JSON.stringify(submittedData));

        // Iterate through the formData entries and log them to the console
        console.log("Submitted Workplan:");
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        workPackagePeriod();

        // Popup Window
        alert("Workplan submitted with ID: " + uniqueId);
        
        // Reset the form and the fields container
        form.reset();
        fieldsContainer.innerHTML = '';

    });

}


// Calculate start and end time of each work package
function workPackagePeriod() {

    // Get all nested task containers
    const nfc = fieldsContainer.querySelectorAll('.nested-fields-container');

    // Iterate through each work package
    nfc.forEach((wp, index) => {
        // Get task start and end time for all tasks within this work package
        const startFields = wp.querySelectorAll('input[name^="startMonthOfTask"]');
        const endFields = wp.querySelectorAll('input[name^="endMonthOfTask"]');

        let earliestStart = null;
        let latestEnd = null;

        // Iterate through all start and end fields of the tasks
        startFields.forEach((startField, i) => {
            const startValue = parseInt(startField.value);
            const endValue = parseInt(endFields[i]?.value);

            if (!isNaN(startValue) && (earliestStart === null || startValue < earliestStart)) {
                earliestStart = startValue; // Update earliest start
            }

            if (!isNaN(endValue) && (latestEnd === null || endValue > latestEnd)) {
                latestEnd = endValue; // Update latest end
            }
        });

        // Check if valid start and end values were found
        if (earliestStart !== null && latestEnd !== null) {
            console.log(`Work Package ${index + 1} Period: ${earliestStart} - ${latestEnd}`);
        } else {
            console.log(`Work Package ${index + 1} has no valid tasks.`);
        }
    });
}
