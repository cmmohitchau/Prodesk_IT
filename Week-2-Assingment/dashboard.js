let expenses = []
let Total = 0;

let salaryItem = null;
function TotalSalary() {
    const salary = document.getElementById('salary').value;
    Total = parseFloat(salary);
    localStorage.setItem("total" , Total);


    if(!salary || isNaN(salary) || salary <= 0) {
        alert("Please enter a valid salary amount.")
        return;
    }
    if(!salaryItem) {
        salaryItem = document.createElement('div');
        salaryItem.id = "totalAmount";
        salaryItem.innerHTML = `
        <h1>Total Salary: ${salary} </h1>
        `

        document.getElementById("expense-list").prepend(salaryItem);
    } else {
        const item = document.getElementById("totalAmount").textContent = `
        <h1>Total Salary: ${salary} </h1>
        `;
        
    }

    document.getElementById("salary").value = "";

    updateTotal();
}

function addExpense() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if(!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid name and amount.");
        return;
    }
    const id = Date.now();
    expenses.push({id , name , amount});
    localStorage.setItem("expense" , JSON.stringify(expenses));

    const item = document.createElement('li');
    item.className = "expense-items"
    item.id = 'expense-' + id;
    item.innerHTML = `
    <span>${name}</span>
    <span>${amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="removeExpense(${id})">Delete</button>
    `
    document.getElementById('expense-list1').appendChild(item);

    document.getElementById('expense-name').value = "";
    document.getElementById('amount').value = "";

    updateTotal();
    updatePieChart();
}

function removeExpense(id) {
  expenses = expenses.filter(e => e.id !== id);

  document.getElementById('expense-' + id).remove();
    localStorage.setItem('expense' , JSON.stringify(expenses));
  updateTotal();
  updatePieChart();
}

function updateTotal() {
    
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = Total - totalExpense;

    document.getElementById('balance').textContent = 
        'Remaining Balance: ' + balance;
}

function updatePieChart() {
    if (!myChart) return;

    const totalExpense = expenses.reduce( (sum , e) => sum + e.amount , 0);
    const remaining = Total - totalExpense;

    myChart.data.datasets[0].data = [
        totalExpense > 0 ? totalExpense : 0,
        remaining > 0 ? remaining : 0
    ]

    myChart.update();
}

function renderExpenses() {
    const list = document.getElementById('expense-list1');
    list.innerHTML = "";

    expenses.forEach(e => {
        const item = document.createElement('li');
        item.className = "expense-items";
        item.id = 'expense-' + e.id;

        item.innerHTML = `
            <span>${e.name}</span>
            <span>${e.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="removeExpense(${e.id})">Delete</button>
        `;

        list.appendChild(item);
    });
}

function renderSalary() {
    if (!Total) return;

    const item = document.createElement('div');
    item.className = "TotalSalary";
    item.id = "totalAmount";

    item.innerHTML = `<h1>Total Salary: ${Total}</h1>`;

    document.getElementById("expense-list").prepend(item);
}

Total = parseFloat(localStorage.getItem("total"));

let myChart;

document.addEventListener("DOMContentLoaded" , () => {

    const savedExpenses = localStorage.getItem("expense");

    if(savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }

    const savedTotal = localStorage.getItem("total");
    if(savedTotal) {
        Total = parseFloat(savedTotal);
    }
    renderSalary();
    renderExpenses();
    updateTotal();

    
    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type : 'pie',
        data : {
            labels : ['Total Expenses' , 'Remaining Balance'],
            datasets: [{
                data : [0 , 0],
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb' 
                ],
                hoverOffset : 4
            }]
        }
    });

    updatePieChart();
})