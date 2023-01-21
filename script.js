console.log('loaded boy')
$(function () {
    onReady();
});

let employees = []

function onReady() {
    $('#employee-form').on('submit', onSubmit);
    $('#employee-table-body').on('click', '.delete-employee-btn', onDelete);
}

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

function onDelete() {
    let row = $(this).parent().parent();
    let rowIndex = row.index();
    console.log(`deleted: `, employees[rowIndex]);
    employees.splice(rowIndex, 1);
    render();
}

function render() {
    let table = $('#employee-table-body');
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
                <button class="delete-employee-btn" style="width: 100%;">
                    ❌
                </button>
            </td>
        </tr>`);
    }
}

function formatCurrency(dollars) {
    return (`$` + (new Intl.NumberFormat('en-US').format(Number(dollars))));
}