# Final Simple Math Calculator

def add(x, y):
    """Add two numbers"""
    return x + y

def subtract(x, y):
    """Subtract two numbers"""
    return x - y

def divide(x, y):
    """Divide two numbers"""
    if y != 0:
        return x / y
    else:
        return "Error: Cannot divide by zero!"

def get_number(prompt):
    """Get a valid number from user input"""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number!")

def main():
    print("="*45)
    print("           Simple Math Calculator")
    print("="*45)
    print("Operations: Addition (+), Subtraction (-), Division (/)")
    print("Type 'quit' at any time to exit")
    
    while True:
        print("\n" + "-"*45)
        print("Choose how to enter your calculation:")
        print("1. Menu-based (step by step)")
        print("2. Expression (e.g., 5 + 3)")
        print("3. Quit")
        
        choice = input("\nEnter your choice (1/2/3): ").strip()
        
        if choice == '3' or choice.lower() == 'quit':
            print("\nThank you for using the calculator. Goodbye!")
            break
        elif choice == '1':
            # Menu-based approach
            print("\nSelect operation:")
            print("1. Addition (+)")
            print("2. Subtraction (-)")
            print("3. Division (/)")
            
            operation = input("Choose operation (1/2/3): ").strip()
            
            if operation in ['1', '2', '3']:
                num1 = get_number("Enter first number: ")
                num2 = get_number("Enter second number: ")
                
                if operation == '1':
                    result = add(num1, num2)
                    print(f"\nResult: {num1} + {num2} = {result}")
                elif operation == '2':
                    result = subtract(num1, num2)
                    print(f"\nResult: {num1} - {num2} = {result}")
                elif operation == '3':
                    result = divide(num1, num2)
                    print(f"\nResult: {num1} / {num2} = {result}")
            else:
                print("Invalid operation choice!")
                
        elif choice == '2':
            # Expression-based approach
            try:
                expression = input("\nEnter your expression (e.g., 5 + 3): ").strip()
                if expression.lower() == 'quit':
                    print("Thank you for using the calculator. Goodbye!")
                    break
                    
                parts = expression.split()
                if len(parts) == 3:
                    num1 = float(parts[0])
                    operator = parts[1]
                    num2 = float(parts[2])
                    
                    if operator == '+':
                        result = add(num1, num2)
                        print(f"\nResult: {num1} + {num2} = {result}")
                    elif operator == '-':
                        result = subtract(num1, num2)
                        print(f"\nResult: {num1} - {num2} = {result}")
                    elif operator == '/':
                        result = divide(num1, num2)
                        print(f"\nResult: {num1} / {num2} = {result}")
                    else:
                        print("Unsupported operator! Use +, -, or /")
                else:
                    print("Please enter in format: number operator number")
                    print("Example: 5 + 3")
            except ValueError:
                print("Error: Please enter valid numbers!")
            except Exception as e:
                print(f"An error occurred: {e}")
        else:
            print("Invalid choice! Please select 1, 2, or 3.")

# Run the calculator
if __name__ == "__main__":
    main()