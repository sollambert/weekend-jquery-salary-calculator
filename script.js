console.log('loaded boy')

/**
 * jQuery init
 */
$(function () {
    onReady();
});

let employees = [];
let maxMonthly = 20000;

/**
 * onReady function called by jQuery when document has fully loaded
 */
function onReady() {
    $('#employee-form').on('submit', onSubmit);
    $('#employee-table-body').on('click', '.delete-employee-btn', onDelete);
}

/**
 * Event handler to get values from input fields within the employee addition form and place them within the employees array as an object
 * @param {*} evt event passed to method to void default form behavior
 */
function onSubmit(evt) {
    evt.preventDefault();
    console.log('testing');

    let first = $('#input-first-name').val();
    let last = $('#input-last-name').val();
    let id = $('#input-id').val();
    let title = $('#input-title').val();
    let salary = $('#input-salary').val();
    let employee = {
        first: first,
        last: last,
        id: Number(id),
        title: title,
        salary: Number(salary)
    }

    employees.push(employee);
    render();
}

/**
 * Event handler for buttons to delete employees from table
 */
function onDelete() {
    let row = $(this).parent().parent();
    let rowIndex = row.index();
    console.log(`deleted: `, employees[rowIndex]);
    employees.splice(rowIndex, 1);
    render();
}

/**
 * Render method for jQuery to update page based on state
 */
function render() {
    let table = $('#employee-table-body');
    let totalMonthly = 0;
    table.empty();
    for (let employee of employees) {
        table.append(`
        <tr>
            <td>${employee.first}</td>
            <td>${employee.last}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>${formatCurrency(employee.salary)}</td>
            <td>
                <button class="delete-employee-btn delete" style="width: 100%;">
                    ❌
                </button>
            </td>
        </tr>`);
        totalMonthly += employee.salary / 12;
    }
    table.children().odd().css(`background-color`, `lightgray`)
    let totalCostRoundAndFormat = formatCurrency(((Math.round(totalMonthly*100))/100).toFixed(2));
    let monthly = $('#monthly');
    if (totalMonthly > maxMonthly) {
        monthly.addClass('make-it-red');
    } else {
        monthly.removeClass('make-it-red');
    }
    monthly.text(`Monthly Cost: ${totalCostRoundAndFormat}`);
}

/**
 * Converts a number to a string fitting a standard US dollar format
 * @param {*} dollars the number to convert
 * @returns a string reflecting an amount of USD
 */
function formatCurrency(dollars) {
    return (`$` + (new Intl.NumberFormat('en-US').format(Number(dollars))));
}