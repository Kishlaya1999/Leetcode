/*
 * Design Linked List - Custom Implementation
 *
 * Intuition:
 * - Arrays give us O(1) index access but O(n) insertion/deletion (shifting)
 * - A linked list trades index access for efficient insertion/deletion
 * - Each node stores a value and a pointer to the next node
 * - We maintain a 'head' pointer (entry point) and 'size' (for validation)
 * - All operations boil down to one core skill: traverse to the right
 *   position, then adjust pointers
 *
 * Core Insight for pointer manipulation:
 * - To INSERT at position i: reach node at i-1, rewire its next pointer
 * - To DELETE at position i: reach node at i-1, skip over node i
 * - Always update 'size' after structural changes
 *
 * Data Structure:
 *   head → [val|next] → [val|next] → [val|next] → null
 *   size = 3
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OPERATION 1: get(index)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * - Validate index (0 to size-1), return -1 if invalid
 * - Traverse index steps from head and return current.val
 * Time: O(n)
 *
 * Example: list = [1 → 3 → 5], get(1)
 * - i=0: current = node(3)
 * - Return 3 ✓
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OPERATION 2: addAtHead(val)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * - Create newNode, point its next to current head, update head
 * Time: O(1)
 *
 * Example: list = [1 → 3], addAtHead(0)
 * Before: head → [1] → [3] → null
 *   newNode(0).next = head (node 1)
 *   head = newNode(0)
 * After:  head → [0] → [1] → [3] → null ✓
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OPERATION 3: addAtTail(val)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * - If list empty: newNode becomes head
 * - Else: traverse to last node (current.next == null), attach newNode
 * Time: O(n)
 *
 * Example: list = [1 → 3], addAtTail(5)
 * Before: head → [1] → [3] → null
 *   traverse: current stops at node(3) (current.next == null)
 *   current.next = newNode(5)
 * After:  head → [1] → [3] → [5] → null ✓
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OPERATION 4: addAtIndex(index, val)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Three cases:
 *   a) index == 0        → delegate to addAtHead (O(1))
 *   b) index == size     → delegate to addAtTail (O(n))
 *   c) 0 < index < size  → traverse to index-1, rewire pointers
 * Invalid if index < 0 or index > size
 * Time: O(n)
 *
 * Example: list = [1 → 3 → 5], addAtIndex(1, 2)
 * Before: head → [1] → [3] → [5] → null
 *   traverse to index-1 = 0: current = node(1)
 *   newNode(2).next = current.next (node 3)
 *   current.next = newNode(2)
 * After:  head → [1] → [2] → [3] → [5] → null ✓
 *
 * Pointer rewiring (MUST do in this order!):
 *   Step 1: newNode.next = current.next  →  [1] → [2] → [3] → [5]
 *   Step 2: current.next = newNode       →  [1] → [2] → [3] → [5]
 *   (if reversed: current.next = newNode first, we LOSE reference to [3]!)
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OPERATION 5: deleteAtIndex(index)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Two cases:
 *   a) index == 0      → head = head.next (remove head directly)
 *   b) index > 0       → traverse to index-1, skip over index node
 * Invalid if index < 0 or index >= size
 * Time: O(n)
 *
 * Example: list = [1 → 2 → 3 → 5], deleteAtIndex(2)
 * Before: head → [1] → [2] → [3] → [5] → null
 *   traverse to index-1 = 1: current = node(2)
 *   current.next = current.next.next (skip node 3)
 * After:  head → [1] → [2] → [5] → null ✓
 *
 * Example: list = [1 → 2 → 3], deleteAtIndex(0)
 * Before: head → [1] → [2] → [3] → null
 *   head = head.next (skip node 1)
 * After:  head → [2] → [3] → null ✓
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Time and Space Complexity Summary:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   Operation    | Time | Space | Notes
 *   -------------|------|-------|----------------------
 *   get          | O(n) | O(1)  | Must traverse to index
 *   addAtHead    | O(1) | O(1)  | No traversal needed
 *   addAtTail    | O(n) | O(1)  | Must traverse to end
 *   addAtIndex   | O(n) | O(1)  | Must traverse to index-1
 *   deleteAtIndex| O(n) | O(1)  | Must traverse to index-1
 */

var Node = function (val) {
  this.val = val;
  this.next = null;
};

var MyLinkedList = function () {
  this.head = null;  // Entry point to the list
  this.size = 0;     // Tracks length for O(1) validation
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  // Validate index bounds
  if (index < 0 || index >= this.size) {
    return -1;
  }

  // Traverse index steps from head
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
  newNode.next = this.head;  // New node points to old head
  this.head = newNode;       // New node becomes new head
  this.size++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let newNode = new Node(val);

  // Edge case: empty list, newNode becomes head
  if (this.head == null) {
    this.head = newNode;
  }
  else {
    // Traverse to last node (where current.next is null)
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;  // Attach newNode after last node
  }

  this.size++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  // Invalid index: too small or too large
  if (index < 0 || index > this.size) {
    return;
  }

  // Delegate to specialized methods for head and tail
  if (index === 0) {
    this.addAtHead(val);  // size++ handled inside
    return;
  }
  else if (index === this.size) {
    this.addAtTail(val);  // size++ handled inside
    return;
  }
  else {
    let newNode = new Node(val);
    let current = this.head;

    // Traverse to node just BEFORE the insertion point
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    // Rewire pointers (ORDER MATTERS: save next before overwriting!)
    newNode.next = current.next;  // Step 1: newNode points to index node
    current.next = newNode;       // Step 2: previous node points to newNode
  }

  this.size++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  // Invalid index
  if (index < 0 || index >= this.size) {
    return;
  }

  if (index === 0) {
    // Remove head: just move head pointer forward
    this.head = this.head.next;
  } else {
    // Traverse to node just BEFORE the deletion point
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    // Skip over the node at 'index' (garbage collected automatically)
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