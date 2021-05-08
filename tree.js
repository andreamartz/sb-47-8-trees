"use strict";
/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
  sum(total = 0) {
    // can model this using either a stack (DFS) or queue (BFS) ADT
    const toVisitStack = [this];   // when we first call sum, `this` will refer to the root node
    while (toVisitStack.length){
      const current = toVisitStack.pop();
      total += current.val;
      for(let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return total;
  }
  evens(count = 0) {
    // can model this using either a stack (DFS) or queue (BFS) ADT
    const toVisitStack = [this];   // when we first call evens, `this` will refer to the root node
    while (toVisitStack.length){
      const current = toVisitStack.pop();
      console.log("VISITING: ", current.val);
      count = (current.val % 2) ? count : count + 1;
      for(let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return count;
  }
  greater(num, count = 0) {
    // can model this using either a stack (DFS) or queue (BFS) ADT
    const toVisitStack = [this];   // when we first call greater, `this` will refer to the root node
    while (toVisitStack.length){
      const current = toVisitStack.pop();
      console.log("VISITING: ", current.val);
      count = (current.val > num) ? count + 1 : count;
      for(let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return count;    
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  // IMPLEMENTATION 1 WORKS!
  // sumValues() {
  //   return this.root.sum();
  // }

  // IMPLEMENTATION 2 WORKS!
  // sumValues() {
  //   if (!this.root) return 0;
  //   let total = 0;
  //   const toVisitStack = [this.root];
  //   // console.log(toVisitStack, toVisitStack.length);
  //   while (toVisitStack.length) {
  //     const current = toVisitStack.pop();
  //     total += current.val;
  //     for (let child of current.children) {
  //       toVisitStack.push(child);
  //     }
  //   }
  //   return total;
  // }

  // IMPLEMENTATION 3 WORKS!
  sumValues(){
    if (!this.root) return 0;
    
    let sum = this.root.val;

    function sumHelper(node) {
    // add each node's value to the sum
      for (let child of node.children) {
        sum += child.val;

        if (child.children.length) {
          sumHelper(child);
        }
      }
    }

    sumHelper(this.root);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  // IMPLEMENTATION 1 WORKS!
  // countEvens() {
  //   return this.root.evens();
  // }

  // IMPLEMENTATION 2

  // IMPLEMENTATION 3 WORKS!
  countEvens() {
    if (!this.root) return 0;

    let evensCount = this.root.val % 2 === 0 ? 1 : 0;

    function countHelper(node) {
      // if (node.val % 2 === 0) evensCount += 1;
      for (let child of node.children) {
        // count the child if its value is even
        if (child.val % 2 === 0) evensCount++;
        // if the current child has any children
        if (child.children.length) {
          // recurse with the child as the root node
          countHelper(child);
        }
      }
    }
    countHelper(this.root);
    return evensCount;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  // IMPLEMENTATION 1
  // numGreater(lowerBound) {
  //   return this.root.greater(lowerBound);
  // }

  // IMPLEMENTATION 2

  // IMPLEMENTATION 3
  numGreater(lowerBound) {
    if (!this.root) return 0;

    // count the root node if its value is greater than lowerBound
    let count = this.root.val > lowerBound ? 1 : 0;

    function countHelper(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) count++;
        if (child.children.length) {
          countHelper(child);
        }
      }
    }
    countHelper(this.root);
    return count;
  }
}

const node = new TreeNode(1,
  [new TreeNode(2, 
    [new TreeNode(3)]),
  new TreeNode(4,
    [new TreeNode(5, 
      [new TreeNode(6), 
      new TreeNode(7)]
    )]
  )]
);

const tree = new Tree(node);
// const tree = new Tree(null);

console.log(tree.sumValues());  // 28
console.log(tree.countEvens());  // 3
console.log(tree.numGreater(2)); // 5

module.exports = { Tree, TreeNode };
