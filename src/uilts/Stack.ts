// 栈操作
class Stack {
  public data = [];

  // 入栈
  push(val: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.data.push(val);
  }
  // 出栈
  pop() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
   return  this.data.pop();
  }

  //栈顶元素
  getStackTop(){
    return this.data[this.data.length - 1];
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  Stack,
};
