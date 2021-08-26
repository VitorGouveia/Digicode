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
  result5 = ""
  result6 = ""

  fetchBefore(newData: string) {
    // Total Xs on each side of equation
    // Example problem: 5x + 2 = 10 - 2x
    var leftSideXTotal = 0; // 5
    var rightSideXTotal = 0; // -2

    // Total integers on each side of equation
    // Example problem: 5x + 2 = 10 - 2x
    var leftSideIntTotal = 0; // 2
    var rightSideIntTotal = 0; // 10


    // Enter a math problem to solve
    var problem = newData;


    // Remove all spaces in problem
    // Example problem: 5x + 2 = 10 - 2x
    problem = problem.replace(/\s/g,''); // 5x+2=10-2x

    // Add + signs in front of all - signs
    // Example problem: 5x + 2 = 10 - 2x
    problem = problem.replace(/-/gi, "+-"); // 5x+2=10+-2x

    // Split problem into left and right sides
    // Example problem: 5x + 2 = 10 - 2x
    var problemArray = problem.split("=");
    var problemLeftSide = problemArray[0]; // 5x+2
    var problemRightSide = problemArray[1]; // 10+-2x

    leftSideXTotal = getTotalX(problemLeftSide);
    leftSideIntTotal = getTotalScalars(problemLeftSide);

    rightSideXTotal = getTotalX(problemRightSide);
    rightSideIntTotal = getTotalScalars(problemRightSide);

    // Compute
    var totalXs = (leftSideXTotal - rightSideXTotal)
    var totalIntegers = (rightSideIntTotal - leftSideIntTotal)
    var solution = (totalIntegers / totalXs)

    // Display solution
    this.result6  = `${solution}`

    // Find the total number of X in the string
    function getTotalX(data) {
      data = data.replace(/\s/g,'');
      let xCount = 0;

      if(data.indexOf('x') != -1) {
        if (data.indexOf('+') != -1) {
          data = data.split('+');

          for(var i = 0; i < data.length; i++) {
            xCount += getTotalX(data[i]);
          }
        } else if (data.indexOf('-') != -1) {
          data = data.split('-');

          // Single negative
          if(data[0] == "") {
            xCount -= getTotalX(data[1]);
          } else {
            xCount += getTotalX(data[0]);

            for(var i = 1; i < data.length; i++) {
              xCount -= getTotalX(data[i]);
            }
          }
        } else {
          xCount = parseInt(data.split('x')[0]);
        }
      }

      return xCount;
    }

    // Find the total of scalars
    function getTotalScalars(data) {
      data = data.replace(/\s/g,'');
      let intCount = 0;

      if (data.indexOf('+') != -1) {
        data = data.split('+');

        for(var i = 0; i < data.length; i++) {
          intCount += getTotalScalars(data[i]);
        }
      } else if (data.indexOf('-') != -1) {
        data = data.split('-');

        // Single negative
        if(data[0] == "") {
          intCount -= getTotalScalars(data[1]);
        } else {
          intCount += getTotalScalars(data[0]);

          for(var i = 1; i < data.length; i++) {
            intCount -= getTotalScalars(data[i]);
          }
        }
      } else {
        if(data.indexOf('x') == -1) {
          intCount = parseInt(data.split('x')[0]);
        } else {
          intCount = 0;
        }
      }

      return intCount;
    }
    console.table({
      leftSideXTotal,
      leftSideIntTotal,
      rightSideXTotal,
      rightSideIntTotal,
      totalXs,
      totalIntegers
    })

    let right = () => {
      if(rightSideXTotal === 0) {
        return `${rightSideIntTotal}`
      } else if(rightSideIntTotal === 0) {
        return `${rightSideXTotal}x`
      } else if(rightSideXTotal !== 0 && rightSideIntTotal !== 0) {
        return `${rightSideXTotal}x ${rightSideIntTotal}`
      }
    }

    if(leftSideIntTotal > 0) {
      this.result2 = `${leftSideXTotal}x + ${leftSideIntTotal} = ${right()}`
    } else {
      this.result2 = `${leftSideXTotal}x ${leftSideIntTotal} = ${right()}`
    }

    this.result3 = `${leftSideIntTotal} - ${right()} = ${leftSideXTotal}x`
    this.result4 = `${totalXs}x = ${totalIntegers}`
    this.result5 = `x = ${totalIntegers} / ${totalXs}`
  }
}
