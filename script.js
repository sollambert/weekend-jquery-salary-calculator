console.log('loaded boy')

/**
 * jQuery init
 */
$(function () {
    onReady();
});

let employees = [
    {
        first: 'Jen',
        last: 'Barber',
        id: 4521,
        title: 'Team Lead',
        salary: 80000
    },
    {
        first: 'Maurice',
        last: 'Moss',
        id: 8724,
        title: 'Support Team',
        salary: 58000
    },
    {
        first: 'Roy',
        last: 'Smith',
        id: 9623,
        title: 'Quality Assurance',
        salary: 48000
    }
];
let maxMonthly = 20000;
let editId = 0;

/**
 * onReady function called by jQuery when document has fully loaded
 */
function onReady() {
    $('#employee-form').on('submit', onSubmit);
    $('#employee-table-body').on('click', '.delete-employee-btn', onDelete);
    $('#employee-table-body').on('click', '.edit-btn', onEdit);
    $('#employee-table-body').on('click', '.accept-edit-btn', onAcceptEdit);
    $('#employee-table-body').on('click', '.cancel-edit-btn', onCancel);
    render();
}

/**
 * Event handler to get values from input fields within the employee addition form and place them within the employees array as an object
 * @param {*} evt event passed to method to void default form behavior
 */
function onSubmit(evt) {
    evt.preventDefault();
    console.log('testing');

    let firstIn = $('#input-first-name');
    let lastIn = $('#input-last-name');
    let idIn = $('#input-id');
    let titleIn = $('#input-title');
    let salaryIn = $('#input-salary');

    let first = firstIn.val();
    let last = lastIn.val();
    let id = idIn.val();
    let title = titleIn.val();
    let salary = salaryIn.val();

    if (first && last && id && title && salary) {
        let employee = {
            first: first,
            last: last,
            id: Number(id),
            title: title,
            salary: Number(salary)
        }
        employees.push(employee);
    }
    firstIn.val('');
    lastIn.val('');
    idIn.val('');
    titleIn.val('');
    salaryIn.val('');

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

function onEdit() {
    let row = $(this).parent().parent();
    let rowIndex = row.index();
    editId = employees[rowIndex].id;
    render();
}

function onAcceptEdit() {
    let row = $(this).parent().parent();
    let rowIndex = row.index();
    let firstEdit = $('#edit-first');
    let lastEdit = $('#edit-last');
    let idEdit = $('#edit-id');
    let titleEdit = $('#edit-title');
    let salaryEdit = $('#edit-salary');

    let emp = employees[rowIndex];

    let first = firstEdit.val();
    let last = lastEdit.val();
    let id = idEdit.val();
    let title = titleEdit.val();
    let salary = salaryEdit.val();

    emp.first = first;
    emp.last = last;
    emp.id = Number(id);
    emp.title = title;
    emp.salary = Number(salary);

    editId = 0;
    console.log(first, last, id, title, salary, editId);
    render();
}

function onCancel() {
    editId = 0;
    render();
}

/**
 * Render method for jQuery to update page based on state
 */
function render() {
    let totalMonthly = 0;
    let table = $('#employee-table-body');
    table.empty();
    console.log(editId);
    for (let employee of employees) {
        if (editId == 0 || editId != employee.id) {
            table.append(`
            <tr>
                <td><div class="td-internal-div">${employee.first}</div></td>
                <td><div class="td-internal-div">${employee.last}</div></td>
                <td><div class="td-internal-div">${employee.id}</div></td>
                <td><div class="td-internal-div">${employee.title}</div></td>
                <td><div class="td-internal-div">${formatCurrency(employee.salary)}</div></td>
                <td>
                    <button class="edit-btn" style="width: 45%;">
                        📝
                    </button>
                    <button class="delete-employee-btn delete" style="width: 45%;">
                        ❌
                    </button>
                </td>
            </tr>`);
        } else {
            console.log(employee)
            table.append(`
            <tr>
                <td><div><input id="edit-first" value="${employee.first}" type="text"></div></td>
                <td><div><input id="edit-last" value="${employee.last}" type="text"></div></td>
                <td><div><input id="edit-id" value="${employee.id}" type="number"></div></td>
                <td><div><input id="edit-title" value="${employee.title}" type="text"></div></td>
                <td><div><input id="edit-salary" value="${employee.salary}" type="number"></div></td>
                <td>
                    <button class="accept-edit-btn" style="width: 45%;">
                        ✅
                    </button>
                    <button class="cancel-edit-btn" style="width: 45%;">
                        ❌
                    </button>
                </td>
            </tr>`);
        }
        totalMonthly += employee.salary / 12;
    }
    table.children().odd().css(`background-color`, `lightgray`)
    let totalCostRoundAndFormat = formatCurrency(((Math.round(totalMonthly * 100)) / 100).toFixed(2));
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