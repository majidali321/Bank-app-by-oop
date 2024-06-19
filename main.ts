#! usr/bin/env/ node

import inquirer from "inquirer";

// bank account interface
interface BankAccount{
    accounNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}

class BankAccount implements BankAccount{ // implements keyword  meaning that now we are using the said values
    accounNumber: number;
    balance: number;
    constructor (accounNumber:number, balance:number){
        this.accounNumber = accounNumber
        this.balance = balance
    }
withdraw(amount: number): void {
    if (this.balance >= amount){
        this.balance -= amount;
        console.log(`successfully withdaw $${amount} and remaining balance ${this.balance}`);
    }else{
            console.log("insufficient balance");   
        }
}
deposit(amount: number): void {
    if (amount > 100){
        amount -=1;
    }this.balance += amount;
    console.log(`${amount} deposited and new balance is ${this.balance} `);
    
}
checkBalance(): void {
    console.log(`current balance is ${this.balance}`);
}
// customer class

}
class Customer {
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobile_number:number;
    account:BankAccount;


constructor(firstName:string,lastName:string,gender:string,age:number,mobile_number:number,account:BankAccount){
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;       
    this.age = age;
    this.mobile_number= mobile_number;
    this.account = account
}
}
const accounts:BankAccount[]=[
    new BankAccount (2002,500),
    new BankAccount (2003,500),
    new BankAccount (2004,2200)
]
const customers:Customer[]=[
   new Customer("majid","Ali","Male",33,3434200905,accounts[0]), 
   new Customer("wajid","sadiq","Male",32,3424200906,accounts[1]), 
   new Customer("sajid","hussain","Male",31,3424200907,accounts[2]) 
]
// function to interact with account
async function service(){
    do{
        const accountNumberINPUT = await inquirer.prompt({
            name:"accountNumb",
            type:"number",
            message:"enter your account number:"

        })
        const Customer = customers.find(customer => customer.account.accounNumber === accountNumberINPUT.accountNumb)
        if (Customer){
            console.log(`welcome ${Customer.firstName} ${Customer.lastName}\n` );
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"Select an operator",
                choices:["Deposit","Withdraw","check balance","exit"]
            }]);
            switch(ans.select){
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"enter the amount to deposit:"

                    })
                    Customer.account.deposit(depositamount.amount)
                    break;
                    
                case "Withdraw":
                    const Withdrawamount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"enter the amount to withdraw:"

                    })
                    Customer.account.withdraw(Withdrawamount.amount)
                    break;
                case "check balance":
                    Customer.account.checkBalance()
                    break;
                case "exit":
                    console.log("exiting bank programme ....");
                    console.log("thank you for using our services"); 
                    return;

            } 
        }else{
            console.log("invalid account number");
            
        }
    } while(true)
}

service()