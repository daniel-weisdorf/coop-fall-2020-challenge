// Simplest way to implement undo and redo functionality is a stack formation
// Performing actions adds them to the top of the undoStack (and clears the redoStack )
// Undoing actions adds them to the redoStack

// A highly optimized way to do this would be to only implement add, have subtract be implemented as a negative add,
// and then your stacks are just lists of numbers without having to keep track of whether its an add or subtract
// since it's inherent in the pos/negativity

class EventSourcer {
  constructor() {
    this.value = 0;
    this.undoStack = [];
    this.redoStack = [];
  }

  add(num) {
    this.value += num;
    this.undoStack.push(num * -1);
    this.redoStack.shift();
  }
  subtract(num) {
    this.add(num * -1);
  }

  // This code was duplicated since undo and redo are conceptually the same
  // Took them out into a helper just to avoid duplication
  undoRedoHelper(primaryStack, secondaryStack) {
    if (primaryStack.length > 0) {
      let num = primaryStack.pop();
      this.value += num;
      secondaryStack.push(num * -1);
    }
  }
  undo() {
    this.undoRedoHelper(this.undoStack, this.redoStack);
  }
  redo() {
    this.undoRedoHelper(this.redoStack, this.undoStack);
  }

  // Assuming that a bulk undo of 5 actions when there's only 2 actions in the undo stack
  // should still undo those 2 actions
  bulk_undo(num) {
    while (num > 0) {
      this.undo();
      num--;
    }
  }
  bulk_redo(num) {
    while (num > 0) {
      this.redo();
      num--;
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
