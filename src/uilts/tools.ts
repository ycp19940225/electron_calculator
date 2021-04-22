import {Stack} from "./Stack";

const Tools = {
  isNumber(str: any) {
    return !isNaN(Number(str));
  },
  //operator大于或者等于operator2 false
  compareOperator(operator: any, operator2: any) {
    return (operator === '+' || operator === '-') && ((operator2 === '*' || operator2 === 'x' || operator2 === '×') || operator2 === '/' || operator2 === '÷');
  },
  countStr(str: string, k: any) {
    // 新建一个对象，存储字符个数，字符key ｜ 数量 value
    let objCount = {};

    for (let i = 0; i < str.length; i++) {
      let key = str[i];
      // 判断对象是否存在该字符的对象属性
      if (objCount[key]) {
        objCount[key]++; // 有自身加1
      } else {
        objCount[key] = 1; // 没有创建属性，初始值为1
      }
    }
    return objCount[k];
  },
  conversionExpression(str: string) {

    //初始化两个栈：运算符栈S1和储存中间结果的栈S2；
    const stack_1 = new Stack();  //存放运算符
    const stack_2 = new Stack();  //储存中间结果
    if (this.countStr(str, '(') != this.countStr(str, ')')) {
      console.log(-1);
      return -1;
    }
    // 处理多位数
    let temp = [];
    let tempStr = [];
    for (let i = 0; i < str.length; i++) {
      let value = str[i];
      if (!Tools.isNumber(value)) {  //符号直接入栈
        temp.push(value)
      } else {
        if (value != '-') { //数字一直往后扫描
          tempStr.push(value);
          while (i < str.length) {
            i++;
            value = str[i];
            if (Tools.isNumber(value) || value == '.') {  //数字存放到临时表
              tempStr.push(value)
            } else {
              //取出来
              temp.push(tempStr.join(''));
              i--; //还原
              tempStr = [];
              break;
            }
          }
        } else {
          // console.log('表达式错误');
        }
      }
    }

    console.log(temp);
    // 从左至右扫描中缀表达式；
    for (let i = 0; i < temp.length; i++) {
      let item = temp[i];
      // 遇到操作数时，将其压入S2；
      if (Tools.isNumber(item)) {
        stack_2.push(item)
      } else {
        /*
        * (5) 遇到括号时：
          (5-1) 如果是左括号“(”，则直接压入S1；
          (5-2) 如果是右括号“)”，则依次弹出S1栈顶的运算符，并压入S2，直到遇到左括号为止，此时将这一对括号丢弃；
                                                                   可以想象成“（”比任何运算符都高，“）”比任何运算符都低 。
        * */
        if (item == '(' || item == ')') {
          if (item == '(') {
            stack_1.push(item)
          } else {
            while (stack_1.getStackTop() != '(') {
              stack_2.push(stack_1.pop());
            }
            //丢弃
            stack_1.pop();
          }
        } else {
          /*(4) 遇到运算符时，比较其与S1栈顶运算符的优先级：
            (4-1) 如果S1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈；
            (4-2) 比栈顶高，也将运算符压入S1         （注意转换为前缀表达式时是优先级较高或相同，而这里则不包括相同的情况）；
            (4-3) 比栈顶低或相同，将S1栈顶的运算符弹出并压入到S2中，再次转到(4-1)与S1中新的栈顶运算符相比较；
          */
          let topStr = stack_1.getStackTop();
          if (stack_1.data.length == 0 || topStr == '(') {
            stack_1.push(item)
          } else {
            if (Tools.compareOperator(topStr, item)) {
              stack_1.push(item);
            } else {
              while (!Tools.compareOperator(topStr, item)) {
                stack_2.push(stack_1.pop());
                topStr = stack_1.getStackTop();
                if (Tools.compareOperator(topStr, item) || stack_1.data.length == 0) {
                  stack_1.push(item);
                  break;
                }
              }
            }
          }
        }
      }
    }
    // 将S1中剩余的运算符依次弹出并压入S2;
    while (stack_1.data.length != 0) {
      stack_2.push(stack_1.pop());
    }
    console.log(stack_2);
    return stack_2
  },
  calcExpression(str: any) {
    let temp = str.data;
    let temp1;
    let temp2;
    let res;
    const stack_3 = new Stack();
    temp.map(function (val) {
      if (Tools.isNumber(val)) {
        stack_3.push(val)
      } else {
        temp1 = stack_3.pop();
        temp2 = stack_3.pop();
        switch (val) {
          case "+":
            console.log('+')
            res = temp1 * 1 + temp2 * 1;
            break;
          case "-":
            console.log('-')
            res = temp2 * 1 - temp1 * 1;
            break;
          default:
            if (val == '*' || val == '×' || val == 'x') {
              res = temp1 * 1 * temp2 * 1;
            } else if (val == '/' || val == '÷' || val == '') {
              res = temp2 * 1 / temp1 * 1;
            }
            break;
        }
        stack_3.push(res)
      }
      console.log(stack_3.data)
    });
    return stack_3.pop()
  },
  //判断是否为数字
  BASEisNotNum(theFloat: any) {
    //判断是否为浮点数
    let len = theFloat.length;
    let dotNum=0;
    if (len == 0)
      return true;
    for(var i=0;i<len;i++){
      let oneNum=theFloat.substring(i,i+1);
      if (oneNum==".")
        dotNum++;
      if ( ((oneNum<"0" || oneNum>"9") && oneNum!=".") || dotNum>1)
        return true;
    }
    if (len>1 && theFloat.substring(0,1)=="0"){
      if (theFloat.substring(1,2)!=".")
        return true;
    }
    return false;
  }
};
export {Tools};
