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
  result2 = ""
  result3 = ""
  result4 = ""

  getResult(before: string, after: string) {
    /* invert all the signs */
    return `${before} = ${after}`
  }

  splitVariables(values: string) {
    const wordsArray = values.split(" ")
    let final = ""
    let finalNumbers = ""
    let numbers: string[] = []
    let xValue = 0
    let compWords = []

    /* get all the numbers at the left of x, store it on a variable */
    /* divide the left by the number in this variable */

    wordsArray.map(word => {
      if(word.includes("x") === true) {
        const currentIndex = wordsArray.indexOf(word)
        const signBefore = wordsArray[currentIndex - 1]

        if(!!signBefore === true) {
          compWords.push(signBefore)
          // wordsArray.splice(wordsArray.indexOf(signBefore) - 1, 1)
        }

        compWords.push(word)
        xValue += Number(word.split("x").join(""))
      } else {
        /* if this and next are signs remove both */
        if(numbers[0] === "" || numbers[0] === "+") {
          numbers.shift()
        } else {
          numbers.push(word)
        }
      }
    })

    numbers.map(number => {
      const curr = numbers.indexOf(number)
      const next = numbers[curr + 1]
      if(!!next === true && next === "+" && numbers[curr] === "+") {
        numbers.splice(curr, 1)
      }
    })

    if(numbers[numbers.length - 1] === "x") {
      numbers.length = numbers.length - 1
    }

    if(compWords[0] === "" || compWords[0] === "+") {
      compWords.shift()
    }

    final = compWords.join(" ")
    finalNumbers = numbers.join(" ")

    return [final, finalNumbers]
  }

  sumValues(values: string) {
    return eval(values)
  }

  sumX(values: string) {
    const xArray = eval(values.split("x").join(" "))
    return `${xArray}x`
  }

  divide(number: string, final: string) {
    return `${number} / ${final.split("x").join("")} = ${1}x`
  }

  divide2(number: string, final: string) {
    let divide = Math.floor(Number(number) / Number(final.split("x").join("")))
    return `x = ${divide}`
  }

  fetchBefore(newData: string) {
    const [final, number] = this.splitVariables(newData)

    this.result = this.getResult(number, final)
    this.result2 = this.getResult(this.sumValues(number), this.sumX(final))
    this.result3 = `${this.divide(this.sumValues(number), this.sumX(final))}`
    this.result4 = `${this.divide2(this.sumValues(number), this.sumX(final))}`
  }

  fetchAfter(newData: string) {
    /* just invert to negative */
    const [final, number] = this.splitVariables(newData)

    this.result = this.getResult(number, final)
    this.result2 = this.getResult(this.sumValues(number), this.sumX(final))
    this.result3 = `${this.divide(this.sumValues(number), this.sumX(final))}`
    this.result4 = `${this.divide2(this.sumValues(number), this.sumX(final))}`
  }
}
