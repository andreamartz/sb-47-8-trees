/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      // if a leaf node, count it
      if (!node.left && !node.right) return 1;
      // if only a right child, count it and recurse on right child node
      if (!node.left) return minDepthHelper(node.right) + 1;
      // if only a left child, count it and recurse on left child node
      if (!node.right) return minDepthHelper(node.left) + 1;
      // if both nodes exist, count the level and recurse on both
      return (
        Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
      );
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      // if a leaf node, count it
      if (!node.left && !node.right) return 1;
      // if only a right child, count it and recurse on right child node
      if (!node.left) return maxDepthHelper(node.right) + 1;
      // if only a left child, count it and recurse on left child node
      if (!node.right) return maxDepthHelper(node.left) + 1;
      // if both nodes exist, count the level and recurse on both
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  /** maxSum is recursive, so it starts with the bottom nodes and returns values upwards through the tree until it gets to the node it was called on */

  // See also LeetCode 124
  // Resource: https://www.youtube.com/watch?v=6cA_NDtpyz8

  /** Strategy:
   * Use recursion so that you are essentially starting at the lowest leaf in each subtree.
   * Initialize maximumSum to be negative infinity.
   * Use a helper function (maxSumHelper) to 
   *  - Find the max sum in the left subtree and right subtree.
   *  - Determine if there is a new max sum.
   *  - Determine the bigger of the left subtree max sum and right subtree max sum.
   * Call maxSumHelper on the root node of the tree or subtree being evaluated.
   * Return the maximum path sum.
   */
  maxSum() {
    // Initialize maximumSum to be negative infinity
    let maximumSum = Number.NEGATIVE_INFINITY;
  /** 
   * Purpose of maxSumHelper: to compute a new sum and determine when to replace the maximumSum with that value. 
  */
    function maxSumHelper(node) {
      if (node === null) return 0;
      // leftMaxSum and rightMaxSum are the left subtree max sum and right subtree max sum under `node`
      const leftMaxSum = Math.max(maxSumHelper(node.left), 0);
      const rightMaxSum = Math.max(maxSumHelper(node.right), 0);
      // compare the current max sum with the max sum from the subtree with `node` as its root and replace max sum if necessary
      maximumSum = Math.max(maximumSum, node.val + leftMaxSum + rightMaxSum);
      // value to return reflects whether we'll return `node's` left child max sum or its right child max sum (we can't choose both if they're different)
      // value to return to `node` must be at least zero
      return Math.max(leftMaxSum + node.val, rightMaxSum + node.val);
    }

    maxSumHelper(this.root);
    return maximumSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  /** Strategy:
   * Initialize aboveLowerBound to be null.
   * Create a helper function nextLargerHelper, which will use a BFS approach to traverse all nodes and update the value of aboveLowerBound when appropriate. For each node visited:
   *   - check whether aboveLowerBound value should be updated
   *   - push non-null children of current onto the queue of nodes yet to be visited
   */
  
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let aboveLowerBound = null;

    const toVisitQueue = [this.root];
    while(toVisitQueue.length > 0) {
      const current = toVisitQueue.shift();

      if (aboveLowerBound === null && current.val > lowerBound) {
        aboveLowerBound = current.val;
      } else if (aboveLowerBound !== null && current.val > lowerBound && current.val < aboveLowerBound) {
        aboveLowerBound = current.val;
      }

      if (current.left) toVisitQueue.push(current.left);
      if (current.right) toVisitQueue.push(current.right);     
    }
    return aboveLowerBound;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
