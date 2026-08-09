var Node = function (val) {
  this.val = val;
  this.next = null;
};

var MyLinkedList = function () {
  this.head = null;
  this.size = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) {
    return -1;
  }

  let current = this.head;
  for (let i = 0; i < index; i++) {
    current = current.next;
  }

  return current.val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  let newNode = new Node(val);
  newNode.next = this.head;
  this.head = newNode;
  this.size++;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let newNode = new Node(val);
  // if linked list has no elements yet
  if (this.head == null) {
    this.head = newNode;
  }
  else {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  this.size++;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.size) {
    return;
  }
  if (index === 0) {
    this.addAtHead(val);
    return;
  }

  else if (index === this.size) {
    this.addAtTail(val);
    return;
  }


  else {
    let newNode = new Node(val);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }

  this.size++;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) {
    return;
  }

  if (index === 0) {
    this.head = this.head.next;
  } else {
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    current.next = current.next.next;
  }

  this.size--;
};

/** 
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */