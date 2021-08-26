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
    /* invert all the signs */
    this.result = `${before} = ${after}`
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

        if(!!signBefore === true && signBefore.includes("+")) {
          compWords.push(signBefore)
          // wordsArray.splice(wordsArray.indexOf(signBefore) - 1, 1)
        }

        compWords.push(word)
        xValue += Number(word.split("x").join(""))
      } else {
        /* if this and next are signs remove both */
        if(numbers[0] === "" || numbers[0] === "+") {
          numbers.shift()
        }

        numbers.push(word)
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

    // wordsArray.forEach(word => {
    //   if (word.includes("x")) {
    //     /* the current number index in the array */
    //     const currentIndex = wordsArray.indexOf(word)
    //     /* the sign before the number */
    //     const previousIndex = wordsArray[currentIndex - 1]
    //     /* invert the number */

    //     /* add signs */
    //     if(!!previousIndex === true) {
    //       final = `${final} ${previousIndex} ${word}`
    //     } else {
    //       final = `${final} ${word}`
    //     }
    //   } else {
    //     /* add signs */
    //     /* thats not sign follwed by x */
    //     const currentIndex = wordsArray.indexOf(word)
    //     const nextIndex = wordsArray[currentIndex + 1]
    //     if(word.includes("+") || word.includes("-") && nextIndex.includes("x")) {
    //       // console.log(nextIndex)
    //       number = `${number}`
    //     } else {
    //       number = `${number} ${word}`
    //     }
    //   }
    //   /* get every sign before words */
    // })

    return [final, finalNumbers]
  }

  fetchBefore(newData: string) {
    const [final, number] = this.splitVariables(newData)

    this.getResult(number, final)
  }

  fetchAfter(newData: string) {
    this.after = newData
    const final = this.splitVariables(this.before)
    this.getResult(this.before, final)
  }
}
