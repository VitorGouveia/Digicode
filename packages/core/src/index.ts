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
  if (options) {
    let [left, right] = equation.split("=");

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

    const finalEquation = `${eval(finalLeft)}${options.key} = ${eval(finalRight)}`;
    const result = `${options.key} = ${eval(finalRight) / eval(finalLeft)}`;
    /**
     * 1 - passar o x pra esquerda e os numeros pro outro lado
     */

    console.log(equation);
    console.log(step2);
    console.log(finalEquation);

    return result;
  }

  return String(eval(equation));
}
// console.log(equation("2 * (2 + 1)"));
console.log(
  equation("2x +3x +10 -15 = 5", {
    key: "x",
  })
);
