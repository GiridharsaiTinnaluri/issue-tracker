//Initialize all variables
const labelsFromFilter = document.querySelectorAll('#selectLabelsInput > span');
const form = document.querySelector('#filterFormFromProjectDetails');
const displayLabelsFromProjectDetails = document.querySelector('#displayLabelsFromProjectDetails')
const selectLabelsInput = document.querySelector('#selectLabelsInput');

const currentLabelsToFilter = [];
// creates a hidden input field to store the user labels as the input value
// this value is send to the server when form submits
const hiddenLabelInput = document.createElement('input');
hiddenLabelInput.setAttribute('type', 'text');
hiddenLabelInput.setAttribute('name', 'labels');
hiddenLabelInput.style.display = "none"
form.append(hiddenLabelInput);


// displays labels in the filter div
labelsFromFilter.forEach((label) => {
    // adding event to the each label
    label.addEventListener('click', function(e){
        e.preventDefault();
        // initilizing variable with the label value
        const value = e.target.innerText.trim();
        // add this label value to [] 
        currentLabelsToFilter.push(value);
        // clearing the display labels div in filter div
        displayLabelsFromProjectDetails.innerHTML = '';
        // dispays the labels above the display div
        // to let know that we are selected
        currentLabelsToFilter.forEach((i) => {
            displayLabelsFromProjectDetails.insertAdjacentHTML('beforeend', `
                <span 
                    id='${i}'
                    onclick='handleUndoLabels(this)'
                    class="bg-blue-500 text-white text-[0.5rem] text-semibold px-1 m-[1px] cursor-pointer">
                    ${i}
                </span>
            `)
        })
        // adding the [labels] to the hidden input to send to the server 
        hiddenLabelInput.value = currentLabelsToFilter.toString();
        //removing element from the display div
        e.target.remove();
    })
});