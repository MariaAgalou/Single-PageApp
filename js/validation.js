
// Function that validates the data provided by the user and makes sure that they satisfy the rules
function validateData() {
    const fieldsContainer = document.getElementById('fieldsContainer');
    const form = document.getElementById('wpform');
    const duration = document.getElementById('duration');


    // Ensure start and end month of all tasks are <= duration of the project
    duration.addEventListener('input', () => {
        const dur = parseInt(duration.value);
        const fields = fieldsContainer.querySelectorAll('[name*="MonthOfTask"]');

        if (!isNaN(dur)) {
            fields.forEach((nestedField) => {
                nestedField.max = dur;

                if (parseInt(nestedField.value) > dur) {
                    alert(`The value of one or more <task start/end month> fields exceeds the duration of the project, which is (${dur}). Please insert a valid number!`);
                    nestedField.classList.add('invalid');
                } else {
                    nestedField.classList.remove('invalid');
                }

            });
        }
    });


    fieldsContainer.addEventListener('input', (e) => {
        if (e.target.matches('[name*="MonthOfTask"]')) {
            const dur = parseInt(duration.value);
            
            if (!isNaN(dur)) {
                e.target.max = dur;
            }
        }
    });

}
