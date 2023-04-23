
//Initializing all the variables
const addLabelsButton = document.querySelector('#addLabelsButton');
const labelsInput = document.querySelector('#labelsInput');
const displayLabels = document.querySelector('#displayLabels')
const createIssueForm = document.querySelector('#createIssueForm')

const currentLabelsToCreateIssue = [];
// creates a hidden input field to store the user labels as the input value
// this value is send to the server when form submits
const hiddenLabelInput = document.createElement('input');
hiddenLabelInput.setAttribute('type', 'text');
hiddenLabelInput.setAttribute('name', 'labels');
hiddenLabelInput.style.display = "none"
createIssueForm.append(hiddenLabelInput);

// takes the label input and append it to the div
// and clears the input
const handleLabelsButtonClick = (e) => {

    e.preventDefault();
    let LabelsUserInput = labelsInput.value;
console.log(LabelsUserInput);
    //validating input
    if(!LabelsUserInput.trim()) {
        //message;
        return
    }

    // if not empty  push to []
    currentLabelsToCreateIssue.push(LabelsUserInput);
    // clearing the labels display div empty
    displayLabels.innerHTML = '';
    // appending all the labels to the div
    for(i of currentLabelsToCreateIssue) {
        displayLabels.insertAdjacentHTML('beforeend', `
            <span class="bg-blue-400 text-white text-semibold text-[0.5rem]
                         px-2 py-0 lowercase"
            >
                ${i}
            </span>
        `)
    }
    // making input value empty
    labelsInput.value="";
    // adding labels to the hidden input to send the data to server
    hiddenLabelInput.value = currentLabelsToCreateIssue.toString();
}

// adding click event to the "+" label button
addLabelsButton.addEventListener('click', handleLabelsButtonClick);