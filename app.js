const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Simple Calculator</h2>
        <form action="/calculate" method="post">
            <input name="num1" type="number" placeholder="Number 1" required/>
            <select name="operator">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input name="num2" type="number" placeholder="Number 2" required/>
            <button type="submit">Calculate</button>
        </form>
    `);
});

app.post('/calculate', (req, res) => {
    const { num1, num2, operator } = req.body;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result;

    switch (operator) {
        case '+': result = n1 + n2; break;
        case '-': result = n1 - n2; break;
        case '*': result = n1 * n2; break;
        case '/': result = n2 !== 0 ? n1 / n2 : 'Cannot divide by zero'; break;
        default: result = 'Invalid operation';
    }

    res.send(`<h3>Result: ${result}</h3><a href="/">Try again</a>`);
});

app.listen(port, () => {
    console.log(`Calculator app running at http://localhost:${port}`);
});
