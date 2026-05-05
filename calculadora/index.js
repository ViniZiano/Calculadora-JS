import { Display } from './Display.js';

const previous = document.getElementById('valor-anterior');
const current = document.getElementById('valor-actual');

const numberButtons = document.querySelectorAll('.numero');
const operationButtons = document.querySelectorAll('.operador');

const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

const display = new Display(previous, current);

// números
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.appendNumber(button.innerText);
    });
});

// operações
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.value;

        if (action === 'equal') {
            display.compute();
        } else {
            display.chooseOperation(action);
        }
    });
});

// botões extras
clearButton.addEventListener('click', () => display.clearAll());
deleteButton.addEventListener('click', () => display.delete());

// suporte ao teclado (diferencial)
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) display.appendNumber(e.key);
    if (e.key === '.') display.appendNumber('.');

    if (e.key === '+') display.chooseOperation('add');
    if (e.key === '-') display.chooseOperation('subtract');
    if (e.key === '*') display.chooseOperation('multiply');
    if (e.key === '/') display.chooseOperation('divide');

    if (e.key === 'Enter') display.compute();
    if (e.key === 'Backspace') display.delete();
    if (e.key === 'Escape') display.clearAll();
});