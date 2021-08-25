import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atlas';

  result = ""
  before = ""
  after = ""
  getResult(number: string) {
    this.result = eval(number)
  }

  fetchBefore(newData: string) {
    this.before = newData
    console.log(newData)
    this.getResult(this.before)
  }

  fetchAfter(newData: string) {
    this.after = newData
    this.getResult(this.after)
  }
}
