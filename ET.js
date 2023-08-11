const myForm = document.querySelector('#my-form');
const amount = document.querySelector('#amount');
const description = document.querySelector('#description');
const msg = document.querySelector('.msg');
const expenseList = document.querySelector('#expenseList');
const category = document.querySelector("#category");
const ExpenseData = [];

myForm.addEventListener("submit",onsubmit);
expenseList.addEventListener('click',removeEntry);


window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/main-page')
            .then(res => {
                //console.log(res.data[0].id);
                for(let i=0;i<res.data.length;i++)
                {
                    showNewExpenseOnScreen(res.data[i]);
                    ExpenseData.push(res.data[i]);
                    //console.log(res.data[i])
                }
            })
            .catch(err => console.log(err))
})

function showNewExpenseOnScreen(data){
    const deleteBtn = document.createElement('button');
    deleteBtn.className='btn btn-sm btn-danger delete float-right';
    deleteBtn.appendChild(document.createTextNode('X'));

    const editButton = document.createElement('button');
    editButton.className= 'btn btn-sm btn-success float-right edit';
    editButton.appendChild(document.createTextNode('Edit'));

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${data.description}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.amount}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.category}`));
    li.appendChild(deleteBtn);
    li.appendChild(editButton);

    expenseList.appendChild(li);
}
    
function onsubmit(e)
{
    e.preventDefault();
    if(amount.value==='' || description.value==='' || category.value==='')
    {
        msg.innerHTML="Please enter all fields";
        setTimeout(() => msg.remove(),3000);
    }
    else
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('X'));

        const editButton = document.createElement('button');
        editButton.className= 'btn btn-sm btn-success float-right edit';
        editButton.appendChild(document.createTextNode('Edit'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${description.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${amount.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${category.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(editButton);

        expenseList.appendChild(li);
        let expenses = {
            description : description.value,
            amount : amount.value,
            category : category.value
        };
        axios.post('http://localhost:3000/', expenses)
                .then(console.log('Expense added'))
                .catch(err => console.log(err))
                amount.value='';
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
            const delExpense = li.firstChild.textContent;
            for(let i=0;i<ExpenseData.length;i++)
                {
                    if(ExpenseData[i].description === delExpense)
                    {
                        axios
                            .delete(`http://localhost:3000/delete-expense/${ExpenseData[i].id}`)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                        break;
                    }
                            
                }
            expenseList.removeChild(li);
        }
    }
    if(e.target.classList.contains('edit'))
    {
        const li1 = e.target.parentElement;
        const updatedExpense = li1.firstChild.textContent;
        for(let i=0;i<ExpenseData.length;i++)
        {
            if(ExpenseData[i].description === updatedExpense)
            {
                description.value=ExpenseData[i].description;
                amount.value=ExpenseData[i].amount;
                category.value = ExpenseData[i].category;
                axios
                    .delete(`http://localhost:3000/delete-expense/${ExpenseData[i].id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                    break;
            }
                            
        }
        expenseList.removeChild(li1);         
    }
}