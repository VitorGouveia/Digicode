import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atlas';

  before = ""
  after = ""
  result = ""
  getResult(before: string, after: string) {
    this.result = `${before} = ${after}`
  }

  splitVariables(values: string) {
    const wordsArray = values.split(" ")
    let final = ""
    wordsArray.forEach(word => {
      if (word.includes("x") === true) {
        const currentIdx = wordsArray.indexOf(word);
        const hasPrevious = wordsArray[currentIdx - 1];

        if (!!hasPrevious === false) {
          final = `${wordsArray[currentIdx]}`;
        } else {
          final = `${final} ${hasPrevious} ${wordsArray[currentIdx]}`;
        }
      }
    })

    return final
  }

  fetchBefore(newData: string) {
    const final = this.splitVariables(newData)
    newData.split(' ').forEach(word => {
      const isSign = word.includes("+") || word.includes("-")
      if(word.includes("x") !== true && isSign === false) {
        // if index is 0 and is sign
        const currentIdx = newData.split(' ').indexOf(word)
        const hasPrevious = newData.split(' ')[currentIdx - 1]
        if (!!hasPrevious === false && isSign === false) {
          this.before = `${newData.split(' ')[currentIdx]}`;
        } else {
          this.before = `${this.before} ${hasPrevious} ${newData.split(' ')[currentIdx]}`;
        }
      }
    })

    this.getResult(this.before, final)
  }

  fetchAfter(newData: string) {
    this.after = newData
    const final = this.splitVariables(this.before)
    this.getResult(this.before, final)
  }
}
