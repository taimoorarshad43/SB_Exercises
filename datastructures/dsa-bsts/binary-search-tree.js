class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    // Otherwise, find the correct spot for the new node.
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      } else {
        // Value already exists in the tree, do nothing
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    const insertNode = (current) => {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
        } else {
          insertNode(current.left);
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
        } else {
          insertNode(current.right);
        }
      }
    };

    insertNode(this.root);
    return this;

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;

    while (currentNode) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        return currentNode; // Node found
      }
    }

    return undefined; // Node not found

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findNode = (current) => {
      if (!current) return undefined; // Base case: not found

      if (val < current.val) {
        return findNode(current.left); // Search left subtree
      } else if (val > current.val) {
        return findNode(current.right); // Search right subtree
      } else {
        return current; // Node found
      }
    };

    return findNode(this.root);

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      result.push(node.val); // Visit the node
      traverse(node.left);   // Traverse left subtree
      traverse(node.right);  // Traverse right subtree
    };

    traverse(this.root);
    return result;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);  // Traverse left subtree
      result.push(node.val); // Visit the node
      traverse(node.right);  // Traverse right subtree
    };

    traverse(this.root);
    return result;

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);  // Traverse left subtree
      traverse(node.right); // Traverse right subtree
      result.push(node.val); // Visit the node
    };

    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];
    
    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Dequeue the front node
      result.push(currentNode.val); // Visit the node

      // Enqueue left and right children if they exist
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null; // Base case: not found

      if (val < node.val) {
        node.left = removeNode(node.left, val); // Search left subtree
      } else if (val > node.val) {
        node.right = removeNode(node.right, val); // Search right subtree
      } else {
        // Node found
        if (!node.left && !node.right) {
          return null; // No children
        } else if (!node.left) {
          return node.right; // Only right child
        } else if (!node.right) {
          return node.left; // Only left child
        }

        // Node with two children: find the in-order successor (smallest in right subtree)
        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
        node.val = minNode.val; // Replace value with in-order successor
        node.right = removeNode(node.right, minNode.val); // Remove the in-order successor
      }
      return node;
    };

    this.root = removeNode(this.root, val);
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
