import { Component } from '@angular/core';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss'],
})
export class AtmComponent {
  logs: any[]=[]
  denominations: { [key: number]: number } = {
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
  };
  depositedDenominations: any[] = [];

  availableDenominations: number[] = Object.keys(this.denominations)
    .map(Number)
    .sort((a, b) => b - a);
  showDenominations = false;
  showWithdrawForm = false;
  withdrawAmount = 0;
  withdrawnDenominations: number[] = [];
  withdrawnDenominationCount: { [key: number]: number } = {};

  showBalance() {
    this.showDenominations = true;
  }

  deposit() {
    if (this.depositedDenominations.length === 0) {
      alert('Please enter the denominations to be deposited');
      return;
    }
    this.denominations[2000] += isNaN(this.depositedDenominations[0])
      ? this.denominations[2000]
      : this.depositedDenominations[0];
    this.denominations[500] += isNaN(this.depositedDenominations[1])
      ? this.denominations[500]
      : this.depositedDenominations[1];
    this.denominations[200] += isNaN(this.depositedDenominations[2])
      ? this.denominations[200]
      : this.depositedDenominations[2];
    this.denominations[100] += isNaN(this.depositedDenominations[3])
      ? this.denominations[100]
      : this.depositedDenominations[3];

   this.logs.push({status: 'success', message: `Deposited 2000: ${this.denominations[2000]} 500: ${this.denominations[500]} 200: ${this.denominations[200]} 100: ${this.denominations[100]} <br> ${new Date()}`});
  }

  withdraw() {
    if (this.withdrawAmount <= 0 || this.withdrawAmount % 100 !== 0) {
      alert('Invalid withdrawal amount');
      return;
    }

    const remainingAmount = this.withdrawAmount;
    let remainingBalance = remainingAmount;

    this.withdrawnDenominations = [];
    this.withdrawnDenominationCount = {};

    for (const denomination of this.availableDenominations) {
      const notesNeeded = Math.floor(remainingBalance / denomination);

      if (notesNeeded > 0 && this.denominations[denomination] >= notesNeeded) {
        this.withdrawnDenominations.push(denomination);
        this.withdrawnDenominationCount[denomination] = notesNeeded;

        this.denominations[denomination] -= notesNeeded;
        remainingBalance -= denomination * notesNeeded;
      }
    }

    if (remainingBalance === 0) {
      this.withdrawAmount = 0;
      this.showWithdrawForm = false;
      alert('Withdrawal successful!');
    } else {
      // Rollback denominations as withdrawal failed
      for (const denomination of this.withdrawnDenominations) {
        this.denominations[denomination] += this.withdrawnDenominationCount[denomination];
      }
      this.withdrawnDenominations = [];
      this.withdrawnDenominationCount = {};
      alert('Insufficient denominations in the ATM');
    }
  }
}
