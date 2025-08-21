class Calculator {
    // Add two numbers
    static add(x: number, y: number): number {
        return x + y;
    }

    // Subtract two numbers
    static subtract(x: number, y: number): number {
        return x - y;
    }

    // Divide two numbers
    static divide(x: number, y: number): number | string {
        if (y !== 0) {
            return x / y;
        } else {
            return "Error: Cannot divide by zero!";
        }
    }

    // Get a valid number from user input
    static async getNumber(prompt: string, readline: any): Promise<number> {
        return new Promise<number>((resolve) => {
            const ask = () => {
                readline.question(prompt, (input: string) => {
                    const num = parseFloat(input.trim());
                    if (!isNaN(num)) {
                        resolve(num);
                    } else {
                        console.log("Please enter a valid number!");
                        ask();
                    }
                });
            };
            ask();
        });
    }

    // Main calculator function
    static async run(): Promise<void> {
        console.log("=".repeat(45));
        console.log("           Simple Math Calculator");
        console.log("=".repeat(45));
        console.log("Operations: Addition (+), Subtraction (-), Division (/)");
        console.log("Type 'quit' at any time to exit");

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        while (true) {
            console.log("\n" + "-".repeat(45));
            console.log("Choose how to enter your calculation:");
            console.log("1. Menu-based (step by step)");
            console.log("2. Expression (e.g., 5 + 3)");
            console.log("3. Quit");

            const choice = await new Promise<string>((resolve) => {
                readline.question("\nEnter your choice (1/2/3): ", (input: string) => {
                    resolve(input.trim());
                });
            });

            if (choice === '3' || choice.toLowerCase() === 'quit') {
                console.log("\nThank you for using the calculator. Goodbye!");
                readline.close();
                break;
            } else if (choice === '1') {
                // Menu-based approach
                console.log("\nSelect operation:");
                console.log("1. Addition (+)");
                console.log("2. Subtraction (-)");
                console.log("3. Division (/)");

                const operation = await new Promise<string>((resolve) => {
                    readline.question("Choose operation (1/2/3): ", (input: string) => {
                        resolve(input.trim());
                    });
                });

                if (['1', '2', '3'].includes(operation)) {
                    const num1 = await Calculator.getNumber("Enter first number: ", readline);
                    const num2 = await Calculator.getNumber("Enter second number: ", readline);

                    let result: number | string;
                    switch (operation) {
                        case '1':
                            result = Calculator.add(num1, num2);
                            console.log(`\nResult: ${num1} + ${num2} = ${result}`);
                            break;
                        case '2':
                            result = Calculator.subtract(num1, num2);
                            console.log(`\nResult: ${num1} - ${num2} = ${result}`);
                            break;
                        case '3':
                            result = Calculator.divide(num1, num2);
                            console.log(`\nResult: ${num1} / ${num2} = ${result}`);
                            break;
                    }
                } else {
                    console.log("Invalid operation choice!");
                }
            } else if (choice === '2') {
                // Expression-based approach
                const expression = await new Promise<string>((resolve) => {
                    readline.question("\nEnter your expression (e.g., 5 + 3): ", (input: string) => {
                        resolve(input.trim());
                    });
                });

                if (expression.toLowerCase() === 'quit') {
                    console.log("Thank you for using the calculator. Goodbye!");
                    readline.close();
                    break;
                }

                const parts = expression.split(/\s+/);
                if (parts.length === 3) {
                    try {
                        const num1 = parseFloat(parts[0]);
                        const operator = parts[1];
                        const num2 = parseFloat(parts[2]);

                        if (isNaN(num1) || isNaN(num2)) {
                            console.log("Error: Please enter valid numbers!");
                            continue;
                        }

                        let result: number | string;
                        switch (operator) {
                            case '+':
                                result = Calculator.add(num1, num2);
                                console.log(`\nResult: ${num1} + ${num2} = ${result}`);
                                break;
                            case '-':
                                result = Calculator.subtract(num1, num2);
                                console.log(`\nResult: ${num1} - ${num2} = ${result}`);
                                break;
                            case '/':
                                result = Calculator.divide(num1, num2);
                                console.log(`\nResult: ${num1} / ${num2} = ${result}`);
                                break;
                            default:
                                console.log("Unsupported operator! Use +, -, or /");
                        }
                    } catch (error) {
                        console.log(`An error occurred: ${error}`);
                    }
                } else {
                    console.log("Please enter in format: number operator number");
                    console.log("Example: 5 + 3");
                }
            } else {
                console.log("Invalid choice! Please select 1, 2, or 3.");
            }
        }
    }
}

// Run the calculator
if (require.main === module) {
    Calculator.run();
}

export { Calculator };