import { Calculator } from './Calculator.js';

export class Display {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;

        this.calculator = new Calculator();

        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;

        this.symbols = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
        };
    }

    clearAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return;

        if (this.previousValue !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.updateDisplay();
    }

    compute() {
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return;

        let result;

        try {
            result = this.calculator[this.operation](prev, current);
        } catch {
            result = 'Error';
        }

        this.currentValue = result.toString();
        this.operation = undefined;
        this.previousValue = '';
        this.updateDisplay();
    }

    formatNumber(number) {
        if (number === 'Error') return number;

        const num = parseFloat(number);
        if (isNaN(num)) return '';

        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 8,
        }).format(num);
    }

    updateDisplay() {
        this.currentElement.textContent = this.formatNumber(this.currentValue);

        this.previousElement.textContent =
            this.previousValue && this.operation
                ? `${this.formatNumber(this.previousValue)} ${this.symbols[this.operation]}`
                : '';
    }
}