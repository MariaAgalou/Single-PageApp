
// Function that creates the form and all the necessary fields of it
function createForm() {
	const packages = document.getElementById('workpackages');
    const fieldsContainer = document.getElementById('fieldsContainer');


    // Creation of the form dynamically
    packages.addEventListener('input', () => {
        // Clear any existing fields
        fieldsContainer.innerHTML = '';

        // Get the number of fields to create
        const numberOfFields = parseInt(packages.value);

        // Create the fields
        for (let i = 0; i < numberOfFields; i++) {

            // Create a description label for each work package
            const description = document.createElement('h4');
            description.textContent = `Work package No. ${i + 1}:`;

            const textField = document.createElement('input');
            textField.type = 'text';
            textField.name = `workPackage${i+1}`;
            textField.placeholder = `Title of work package ${i+1}`;
            textField.required = true;

            const numberField = document.createElement('input');
            numberField.type = 'number';
            numberField.name = `tasksOfwp${i+1}`;
            numberField.placeholder = `Number of tasks of work package ${i+1}`;
            numberField.required = true;
            numberField.min = 1;

            // Create a container for nested fields
            const nestedFieldsContainer = document.createElement('div');
            nestedFieldsContainer.className = 'nested-fields-container';

            // Add an event listener to the number field for the creation of the nested fields
            numberField.addEventListener('input', () => {
                // Clear any existing nested fields
                nestedFieldsContainer.innerHTML = '';

                // Get the number of nested fields to create
                const numberOfNestedFields = parseInt(numberField.value);

                // Create the triplets (text + number + number)
                for (let j = 0; j < numberOfNestedFields; j++) {

                    // Create a description label for each task
                    const description2 = document.createElement('h5');
                    description2.textContent = `Task No. ${i+1}.${j+1}:`;

                    const nestedTextField = document.createElement('input');
                    nestedTextField.type = 'text';
                    nestedTextField.name = `titleOfTask${i+1}_${j+1}`;
                    nestedTextField.placeholder = `Title of task ${i+1}.${j+1}`;
                    nestedTextField.required = true;

                    const nestedNumberField1 = document.createElement('input');
                    nestedNumberField1.type = 'number';
                    nestedNumberField1.name = `startMonthOfTask${i+1}_${j+1}`;
                    nestedNumberField1.placeholder = `Start of task ${i+1}.${j+1}`;
                    nestedNumberField1.required = true;
                    nestedNumberField1.min = 1;

                    const nestedNumberField2 = document.createElement('input');
                    nestedNumberField2.type = 'number';
                    nestedNumberField2.name = `endMonthOfTask${i+1}_${j+1}`;
                    nestedNumberField2.placeholder = `End of task ${i+1}.${j+1}`;
                    nestedNumberField2.required = true;
                    nestedNumberField2.min = 1;

                    // Append the nested fields to the nestedFieldsContainer
                    nestedFieldsContainer.appendChild(description2);
                    nestedFieldsContainer.appendChild(nestedTextField);
                    nestedFieldsContainer.appendChild(nestedNumberField1);
                    nestedFieldsContainer.appendChild(nestedNumberField2);

                }
            });

            // Append fields to the fieldsContainer
            fieldsContainer.appendChild(description);
            fieldsContainer.appendChild(textField);
            fieldsContainer.appendChild(numberField);
            fieldsContainer.appendChild(nestedFieldsContainer);

        }
    });

}
