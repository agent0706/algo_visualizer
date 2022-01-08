const starting_number  = 5;
const max_number = 1000;

export const getRandomArray = (size) => {
    const arr = new Set();
    while(arr.size < size) {
        const num = Math.floor((Math.random() * (max_number - starting_number)) + starting_number);
        arr.add(num);
    }
    return Array.from(arr);
}

export const swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

export class Stack {
    constructor(value) {
        this.data = [];
        this.top = -1;

        if (value) {
            this.data.push(value);
            this.top = 0;
        }
    }

    push(value) {
        this.data.push(value);
        this.top += 1;
    }

    pop() {
        if (this.top === -1) {
            return null;
        }
        const temp = this.data[this.top];
        this.top -= 1;
        return temp;
    }

    peek() {
        return this.data[this.top];
    }
}