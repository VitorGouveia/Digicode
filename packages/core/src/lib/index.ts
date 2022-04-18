type equationProps = {
  key: string;
};

const inverseOperatorsMap = {
  "+": "-",
  "-": "+",
  "*": "/",
  "/": "*",
};
type Operator = keyof typeof inverseOperatorsMap;

const operators: Operator[] = ["+", "-", "*", "/"];

export function equation(equation: string, options?: equationProps) {
  let charOperator = "";

  const equationWithoutSpaces = equation.split(" ").flatMap((char) => {
    if (operators.includes(char as Operator)) {
      charOperator = char;
      return [];
    }

    if (!!charOperator) {
      let str = `${charOperator}${char}`;
      charOperator = "";
      return str;
    }

    return char;
  });

  let finalEquation = equationWithoutSpaces;
  // treats of spaces
  for (let operator of operators) {
    let restOp = "";

    finalEquation = finalEquation.flatMap((char) => {
      if (char.includes(operator)) {
        const [left, right] = char.split(operator);

        if (right === "") {
          restOp = operator;

          return [left];
        }

        return [left, `${operator}${right}`];
      }

      if (char === "" || char === " ") {
        return [];
      }

      if (!!restOp) {
        const tmp = `${restOp}${char}`;
        restOp = "";
        return tmp;
      }

      return char;
    });
  }

  if (options) {
    let [left, right] = finalEquation.join(" ").split("=");

    left = left.trim();
    right = right.trim();

    let newLeft = left.split(" ");
    let newRight = right.split(" ");

    newLeft = newLeft.flatMap((element) => {
      const isNumber = !element.includes(options.key);
      if (isNumber) {
        // discover which operator there is
        let currentOperator: Operator = "+";

        for (let operator of operators) {
          if (element.includes(operator)) {
            currentOperator = operator;
          }
        }

        // remove current operator from the element and apply the inverse one
        const [_, noOperatorElement] = element.split(currentOperator);
        const inverseOperatorElement = [
          inverseOperatorsMap[currentOperator],
          noOperatorElement,
        ].join("");

        // push it to the left with inverse operator

        newRight.push(inverseOperatorElement);

        // remove this element from the right
        return [];
      }

      return element;
    });

    newRight = newRight.flatMap((element) => {
      if (element.includes(options.key)) {
        // discover which operator there is
        let currentOperator: Operator = "+";

        for (let operator of operators) {
          if (element.includes(operator)) {
            currentOperator = operator;
          }
        }

        // remove current operator from the element and apply the inverse one
        const [_, noOperatorElement] = element.split(currentOperator);
        const inverseOperatorElement = [
          inverseOperatorsMap[currentOperator],
          noOperatorElement,
        ].join("");

        // push it to the left with inverse operator

        newLeft.push(inverseOperatorElement);

        // remove this element from the right
        return [];
      }

      return element;
    });

    const finalRight = newRight.join(" ");
    const finalLeft = newLeft.map((element) => element.split(options.key)[0]).join(" ");

    const step2 = `${newLeft.join(" ")} = ${newRight.join(" ")}`;

    const step3 = `${eval(finalLeft)}${options.key} = ${eval(finalRight)}`;
    const step4 = `${options.key} = ${eval(finalRight)} / ${eval(finalLeft)}`;
    const result = `${options.key} = ${eval(finalRight) / eval(finalLeft)}`;
    /**
     * 1 - passar o x pra esquerda e os numeros pro outro lado
     */

    // console.log(equation);
    // console.log(step2);
    // console.log(finalEquation);

    return {
      equation,
      finalEquation: finalEquation.join(" "),
      step2,
      step3,
      step4,
      result,
    };
  }

  return String(eval(equation));
}
