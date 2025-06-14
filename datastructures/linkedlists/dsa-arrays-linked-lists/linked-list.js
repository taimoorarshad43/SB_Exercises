/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  crawler(index){
    let curr = this.head;
    let count = 0;

    //crawls through linkedlist and stops when it finds the index of the targeted value. Curr increments with each cycle.
    while(curr !== null & count != index){
        count++;
        curr = curr.next;
    }

    //return target node.
    return curr;

  }
  
  /** push(val): add new value to end of list. */

  push(val) {
      let inputNode = new Node(val);

      //if we have no nodes in our LinkedList
      if(this.head === null){
        this.head = inputNode;
        this.tail = inputNode;
      }else{
      // Otherwise we'll append this to the tail of the Linked List
        this.tail.next = inputNode;
        this.tail = inputNode;
      }

      this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    
    let inputNode = new Node(val);

    //if we have no nodes in our LinkedList
    if(this.head === null){
      this.head = inputNode;
    }else{
    // We have a populated Linked List - set the inputNode to the head and set inputNode.next to the previous head
      inputNode.next = this.head;
      this.head = inputNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length++;

  }

  /** pop(): return & remove last item. */

  pop() {

    //Just do our removeAt but at the last index.
    return this.removeAt(this.length-1);

  }

  /** shift(): return & remove first item. */

  shift() {
    //Just do our removeAt but at the first index.
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    if(idx > this.length || idx < 0){
      throw new Error("Invalid index!")
    }

    //Use our crawler to get the value at the inputted index.
    return this.crawler(idx).val;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    if(idx > this.length || idx < 0){
      throw new Error("Invalid index!")
    }

    let target = this.crawler(idx);
    target.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index!");
    }

    //If idx is endpoint values, then we can just use our append in front and back methods
    if (idx === 0){
      return this.unshift(val);
    }
    if (idx === this.length){
      return this.push(val);
    } 

    // take the previous node before our current index.
    let prev = this.crawler(idx - 1);

    // Splice the newNode with the previous's .next and put the .next of the other previous node to our inputNode.
    let inputNode = new Node(val);
    inputNode.next = prev.next;
    prev.next = inputNode;

    this.length += 1;

  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index!");
    }

    // Edge Cases
    // Removing the first item
    if (idx === 0) {
      //Snipping references and having garbage collector do the rest
      let output = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head; //for a one node list
      return output;
    }

    // Removing the last item

    let prev = this.crawler(idx - 1);

    if (idx === this.length - 1) {
      let output = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return output;
    }

    //Non edge cases

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;

  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0){
      return 0; //No nodes, means no average
    }

    let total = 0;
    let curr = this.head;

    while (curr) {
      //Crawl through list and accumulate total values summation.
      total += curr.val;
      curr = curr.next;
    }

    // Return average
    return total / this.length;
    
  }
}

module.exports = LinkedList;
