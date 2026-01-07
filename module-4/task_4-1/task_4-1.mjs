"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class accountTypes{
  constructor(normal, saving, credit, pension){
    this.normal=normal;
    this.saving=saving;
    this.credit=credit;
    this.pension=pension;
  }
  oneLine(){
    return(`${answer1.normal}, ${answer1.saving}, ${answer1.credit}, ${answer1.pension}`)
  }
}
const answer1=new accountTypes("brukskonto","sparekonto","kreditkonto","pensionskonto")
printOut(answer1.oneLine());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccount{
  #type
  constructor(type="brukskonto"){
    this.#type=type;
  }
  
  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch (toType) {
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
}
const myAccount=new TAccount();
myAccount.toString();
myAccount.setType("saving");
myAccount.setType("sparekonto");
myAccount.setType("konto");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountP3{
  #type
  #balance
  constructor(type="brukskonto",balance=0){
    this.#type=type;
    this.#balance=balance
  }
  
  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch(toType){
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
  getBalance(){
    printOut(`Balance is ${this.#balance}`);
  }
  deposit(amount){
    if(amount>0){
      printOut(`${this.#balance} -> ${this.#balance+=amount}`);
    }
  }
  withdraw(amount){
    if(amount>0){
      printOut(`${this.#balance} -> ${this.#balance-=amount}`);
    }
  }
}
const myAccountP3=new TAccountP3();
myAccountP3.deposit(100);
myAccountP3.withdraw(25);
myAccountP3.getBalance();
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountP4{
  #type
  #balance
  #withdrawCount
  constructor(type="brukskonto",balance=0){
    this.#type=type;
    this.#balance=balance;
    this.#withdrawCount=0;
  }
  
  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch(toType){
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
  getBalance(){
    printOut(`Balance is ${this.#balance}`);
  }
  deposit(amount){
    if(amount>0){
      this.#withdrawCount=0;
      printOut(`${this.#balance} -> ${this.#balance+=amount}`);
    }
  }
  withdraw(amount){
    if(amount>0){
      switch(this.#type){
        case answer1.normal:
        case answer1.credit:
          printOut(`${this.#balance} -> ${this.#balance-=amount}`);
        break;
        case answer1.saving:
          if(this.#withdrawCount<3){
            printOut(`${this.#balance} -> ${this.#balance-=amount}`);
            this.#withdrawCount++;
          }else{
            printOut("cant withdraw anymore")
          }
        break;
        case answer1.pension:
          printOut("cant withdraw from pension")
        break;
        default:
          printOut("not valid")
        break;
      }
    }
  }
}
const myAccountP4=new TAccountP4("sparekonto",100);
myAccountP4.getBalance();
myAccountP4.withdraw(25);
myAccountP4.withdraw(25);
myAccountP4.withdraw(25);
myAccountP4.withdraw(25);
myAccountP4.setType("pensions");
myAccountP4.withdraw(25);
myAccountP4.setType("saving");
myAccountP4.withdraw(25);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const CurrencyTypes = {
  NOK: { value: 1.0000, name: "Norske kroner", denomination: "kr" },
  EUR: { value: 0.0985, name: "Europeiske euro", denomination: "€" },
  USD: { value: 0.1091, name: "United States dollar", denomination: "$" },
  GBP: { value: 0.0847, name: "Pound sterling", denomination: "£" },
  INR: { value: 7.8309, name: "Indiske rupee", denomination: "₹" },
  AUD: { value: 0.1581, name: "Australske dollar", denomination: "A$" },
  PHP: { value: 6.5189, name: "Filippinske peso", denomination: "₱" },
  SEK: { value: 1.0580, name: "Svenske kroner", denomination: "kr" },
  CAD: { value: 0.1435, name: "Canadiske dollar", denomination: "C$" },
  THB: { value: 3.3289, name: "Thai baht", denomination: "฿" }
};
class TAccountP5{
  #type;
  #balance;
  #withdrawCount;
  #currencyType;
  constructor(type="brukskonto",balance=0){
    this.#type=type;
    this.#balance=balance;
    this.#withdrawCount=0;
    this.#currencyType=CurrencyTypes.NOK;
  }
  
  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch(toType){
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
  setCurrencyType(toCurrency){
    switch(toCurrency.toUpperCase()){
      case "NOK":
        this.#currencyType=CurrencyTypes.NOK;
        break;
      case "EUR":
        this.#currencyType=CurrencyTypes.EUR;
        break;
      case "USD":
        this.#currencyType=CurrencyTypes.USD;
        break;
      case "GBP":
        this.#currencyType=CurrencyTypes.GBP;
        break;
      case "INR":
        this.#currencyType=CurrencyTypes.INR;
        break;
      case "AUD":
        this.#currencyType=CurrencyTypes.AUD;
        break;
      case "PHP":
        this.#currencyType=CurrencyTypes.PHP;
        break;
      case "SEK":
        this.#currencyType=CurrencyTypes.SEK;
        break;
      case "CAD":
        this.#currencyType=CurrencyTypes.CAD;
        break;
      case "THB":
        this.#currencyType=CurrencyTypes.THB;
        break;
    }
  }
  getBalance(){
    printOut(`Balance is ${this.#balance+this.#currencyType.denomination}`);
  }
  deposit(amount){
    if(amount>0){
      this.#withdrawCount=0;
      printOut(`${this.#balance+this.#currencyType.denomination} -> ${(this.#balance+=amount)+this.#currencyType.denomination}`);
    }
  }
  withdraw(amount){
    if(amount>0){
      switch(this.#type){
        case answer1.normal:
        case answer1.credit:
          printOut(`${this.#balance+this.#currencyType.denomination} -> ${(this.#balance-=amount)+this.#currencyType.denomination}`);
        break;
        case answer1.saving:
          if(this.#withdrawCount<3){
            printOut(`${this.#balance+this.#currencyType.denomination} -> ${(this.#balance-=amount)+this.#currencyType.denomination}`);
            this.#withdrawCount++;
          }else{
            printOut("cant withdraw anymore")
          }
        break;
        case answer1.pension:
          printOut("cant withdraw from pension")
        break;
        default:
          printOut("not valid")
        break;
      }
    }
  }
}
const myAccountP5=new TAccountP5();
myAccountP5.deposit(100);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountP6{
  #type;
  #balance;
  #withdrawCount;
  #currencyType;
  constructor(type="brukskonto",balance=0){
    this.#type=type;
    this.#balance=balance;
    this.#withdrawCount=0;
    this.#currencyType=CurrencyTypes.NOK;
  }
  
  #convert(){
    return Math.round((this.#balance*(this.#currencyType.value)*(10**2)))/(10**2);
  }

  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch(toType){
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
  setCurrencyType(toCurrency){
    switch(toCurrency.toUpperCase()){
      case "NOK":
        this.#currencyType=CurrencyTypes.NOK;
        break;
      case "EUR":
        this.#currencyType=CurrencyTypes.EUR;
        break;
      case "USD":
        this.#currencyType=CurrencyTypes.USD;
        break;
      case "GBP":
        this.#currencyType=CurrencyTypes.GBP;
        break;
      case "INR":
        this.#currencyType=CurrencyTypes.INR;
        break;
      case "AUD":
        this.#currencyType=CurrencyTypes.AUD;
        break;
      case "PHP":
        this.#currencyType=CurrencyTypes.PHP;
        break;
      case "SEK":
        this.#currencyType=CurrencyTypes.SEK;
        break;
      case "CAD":
        this.#currencyType=CurrencyTypes.CAD;
        break;
      case "THB":
        this.#currencyType=CurrencyTypes.THB;
        break;
    }
  }
  getBalance(){
    printOut(`Balance is ${this.#convert()+this.#currencyType.denomination}`);
  }
  deposit(amount){
    if(amount>0){
      this.#withdrawCount=0;
      printOut(`${this.#convert()+this.#currencyType.denomination} -> ${(this.#balance+=amount)+this.#currencyType.denomination}`);
    }
  }
  withdraw(amount){
    if(amount>0){
      switch(this.#type){
        case answer1.normal:
        case answer1.credit:
          printOut(`${this.#convert()+this.#currencyType.denomination} -> ${(this.#balance-=amount)+this.#currencyType.denomination}`);
        break;
        case answer1.saving:
          if(this.#withdrawCount<3){
            printOut(`${this.#convert()+this.#currencyType.denomination} -> ${(this.#balance-=amount)+this.#currencyType.denomination}`);
            this.#withdrawCount++;
          }else{
            printOut("cant withdraw anymore")
          }
        break;
        case answer1.pension:
          printOut("cant withdraw from pension")
        break;
        default:
          printOut("not valid")
        break;
      }
    }
  }
}
const myAccountP6=new TAccountP6()
myAccountP6.deposit(153.87);
myAccountP6.setCurrencyType("eur");
myAccountP6.getBalance();
myAccountP6.setCurrencyType("nok");
myAccountP6.getBalance();
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TAccountP7{
  #type;
  #balance;
  #withdrawCount;
  #currencyType;
  constructor(type="brukskonto",balance=0){
    this.#type=type;
    this.#balance=balance;
    this.#withdrawCount=0;
    this.#currencyType=CurrencyTypes.NOK;
  }
  
  #convertFromNOK(amount,type=this.#currencyType.value){
    return amount*type;
  }
  #convertToNOK(amount,type){
    return amount/(CurrencyTypes[type.toUpperCase()].value);
  }
  #display(){
    //return Math.round((this.#balance/this.#currencyType.value*(10**2)))/(10**2);
    console.log(this.#balance);
    return Math.round((this.#convertFromNOK(this.#balance)*(10**2)))/(10**2);
  }

  toString(){
    printOut(this.#type);
  }
  setType(toType){
    if(toType===this.#type){
      printOut("already on that")
      return;
    }
    switch(toType){
      case "normal":
        this.#type=answer1.normal
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "saving":
        this.#type=answer1.saving
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "credit":
        this.#type=answer1.credit
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      case "pensions":
        this.#type=answer1.pension
        printOut("switched to "+this.#type)
        this.#withdrawCount=0;
        break;
      default:
        printOut(toType+" is not valid")
        break;
    }
  }
  setCurrencyType(toCurrency){
    switch(toCurrency.toUpperCase()){
      case "NOK":
        this.#currencyType=CurrencyTypes.NOK;
        break;
      case "EUR":
        this.#currencyType=CurrencyTypes.EUR;
        break;
      case "USD":
        this.#currencyType=CurrencyTypes.USD;
        break;
      case "GBP":
        this.#currencyType=CurrencyTypes.GBP;
        break;
      case "INR":
        this.#currencyType=CurrencyTypes.INR;
        break;
      case "AUD":
        this.#currencyType=CurrencyTypes.AUD;
        break;
      case "PHP":
        this.#currencyType=CurrencyTypes.PHP;
        break;
      case "SEK":
        this.#currencyType=CurrencyTypes.SEK;
        break;
      case "CAD":
        this.#currencyType=CurrencyTypes.CAD;
        break;
      case "THB":
        this.#currencyType=CurrencyTypes.THB;
        break;
    }
  }
  getBalance(){
    printOut(`Balance is ${this.#display()+this.#currencyType.denomination}`);
  }
  deposit(amount,type="NOK"){
    if(amount>0){
      this.#withdrawCount=0;
      const before = this.#display();
      this.#balance += this.#convertToNOK(amount, type);
      const after = this.#display();
      printOut(`${before}${this.#currencyType.denomination} -> ${after}${this.#currencyType.denomination}`);
    }
  }
  withdraw(amount, type = "NOK") {
    if (amount > 0) {
      const before = this.#display();
      const converted = this.#convertToNOK(amount, type);
      switch (this.#type) {
        case answer1.normal:
        case answer1.credit:
          this.#balance -= converted;
        break;

        case answer1.saving:
          if (this.#withdrawCount >= 3) {
            printOut("cant withdraw anymore");
            return;
          }
          this.#balance -= converted;
          this.#withdrawCount++;
          break;

        case answer1.pension:
          printOut("cant withdraw from pension");
          return;

        default:
          printOut("not valid");
          return;
      }
      const after = this.#display();
      printOut(`${before}${this.#currencyType.denomination} -> ${after}${this.#currencyType.denomination}`);
    }
  }
}
const myAccountP7=new TAccountP7(undefined, 149.94);
myAccountP7.deposit(12,"USD");
myAccountP7.withdraw(10,"GBP");
myAccountP7.setCurrencyType("CAD");
myAccountP7.getBalance();
myAccountP7.setCurrencyType("INR");
myAccountP7.getBalance();
myAccountP7.withdraw(150.09531,"SEK");
printOut(newLine);
