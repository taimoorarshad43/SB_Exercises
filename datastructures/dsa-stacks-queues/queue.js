/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let node = new Node(val);

    // If queue is empty then this is first and last node
    if(this.first === null){
      this.first = node;
      this.last = node;
    // If not, then make a reference to last and then make this node the last
    }else{
      this.last.next = node;
      this.last = node;
    }

    //increase the size of queue
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {

    if(this.first === null){
      throw new Error("List is empty, cannot dequeue");
    }

    //Our intended output
    let output = this.first;

    //If single node queue then clear the .last ref.
    if(this.first === this.last){
      this.last = null;
    }

    //If not, then move the first ref to the next ref.
    this.first = this.first.next;
    this.size--;

    return output.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
      return this.size=== 0;
  }
}

module.exports = Queue;
