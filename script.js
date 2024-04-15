document.getElementById('submitBtn').addEventListener('click', function() {
    let valid = true;
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroup = document.getElementById('age').value;

    // Validate inputs
    ['grossIncome', 'extraIncome', 'deductions'].forEach(id => {
        const input = document.getElementById(id);
        if (isNaN(parseFloat(input.value))) {
            input.classList.add('invalid');
            input.nextElementSibling.hidden = false;
            valid = false;
        } else {
            input.classList.remove('invalid');
            input.nextElementSibling.hidden = true;
        }
    });

    if (ageGroup === "") {
        document.getElementById('age').classList.add('invalid');
        document.getElementById('age').nextElementSibling.hidden = false;
        valid = false;
    } else {
        document.getElementById('age').classList.remove('invalid');
        document.getElementById('age').nextElementSibling.hidden = true;
    }

    if (!valid) return;

    // Calculate tax
    const totalIncome = grossIncome + extraIncome - deductions;
    let tax = 0;
    if (totalIncome > 800000) {
        switch (ageGroup) {
            case 'under40':
                tax = (totalIncome - 800000) * 0.30;
                break;
            case 'between40and60':
                tax = (totalIncome - 800000) * 0.40;
                break;
            case '60plus':
                tax = (totalIncome - 800000) * 0.10;
                break;
        }
    }

    // Show result in modal
    document.getElementById('resultText').innerText = `The calculated tax is ₹${tax.toLocaleString()}`;
    $('#resultModal').modal('show');
});
