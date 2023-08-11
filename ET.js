const myForm = document.querySelector('#my-form');
const expense = document.querySelector('#expense');
const description = document.querySelector('#description');
const msg = document.querySelector('.msg');
const expenseList = document.querySelector('#expenseList');
const category = document.querySelector("#category");

myForm.addEventListener("submit",onsubmit);
expenseList.addEventListener('click',removeEntry);
    
    
function onsubmit(e)
{
    e.preventDefault();
    if(expense.value==='' || description.value==='' || category.value==='')
    {
        msg.innerHTML="Please enter all fields";
        setTimeout(() => msg.remove(),3000);
    }
    else
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('Delete Expense'));

        const editButton = document.createElement('button');
        editButton.className= 'btn btn-sm btn-success float-right edit';
        editButton.appendChild(document.createTextNode('Edit Expense'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${description.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${expense.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${category.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(editButton);

        expenseList.appendChild(li);
        let expenses = {
            ExpenseAmount : expense.value,
            ExpenseDescription : description.value,
            ExpenseCategory : category.value
        };
        localStorage.setItem(description.value,JSON.stringify(expenses));
        expense.value='';
        description.value='';
        category.value='';  
    }
}

function removeEntry(e)
{
    if(e.target.classList.contains('delete'))
    {
        if(confirm('Are you sure??'))
        {
            const li = e.target.parentElement;
            localStorage.removeItem(li.firstChild.textContent);
            expenseList.removeChild(li);
        }
    }
    if(e.target.classList.contains('edit'))
    {
        const li1 = e.target.parentElement;
        //console.log(li1[0].textContent);
        const expenses = JSON.parse(localStorage.getItem(li1.firstChild.textContent));
        expense.value = expenses.ExpenseAmount;
        description.value = expenses.ExpenseDescription;
        category.value = expenses.ExpenseCategory;
        localStorage.removeItem(li1.firstChild.textContent);
        expenseList.removeChild(li1);   
            
    }
}