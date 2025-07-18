/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    let newNode = new Node(val);

    //If list is empty
    if(this.first === null) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let formerFirst = this.first;
      this.first = newNode;
      newNode.next = formerFirst;
    }

    this.size++;

  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {

    if (this.first===null){
      throw new Error("Can't pop from an empty stack.");
    } 

    //Our intended output
    let output = this.first;

    // In case we have a single node stack
    if (this.first === this.last) {
      this.last = null;
    }

    //Move our .first ref
    this.first = this.first.next;
    this.size--;
    return output.val;

  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
