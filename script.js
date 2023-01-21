console.log('loaded boy')
$(function() {
    onReady();
});

let employees = []

function onReady() {
    $('#employee-form').on('submit', onSubmit);
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
        id: id,
        title: title,
        salary: salary
    }

    employees.push(employee);
    render();
}

function render() {
    
}