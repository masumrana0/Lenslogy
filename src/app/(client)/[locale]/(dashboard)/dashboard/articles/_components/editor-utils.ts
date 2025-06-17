// /**
//  * Utility functions for working with contentEditable elements
//  */

// /**
//  * Saves the current selection range
//  * @returns The current selection range or null if no selection
//  */
// export function saveSelection(): Range | null {
//   const selection = window.getSelection();
//   if (selection && selection.rangeCount > 0) {
//     return selection.getRangeAt(0).cloneRange();
//   }
//   return null;
// }

// /**
//  * Restores a previously saved selection range
//  * @param range The range to restore
//  */
// export function restoreSelection(range: Range | null): void {
//   if (range) {
//     const selection = window.getSelection();
//     if (selection) {
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   }
// }

// /**
//  * Places the cursor at the end of a contentEditable element
//  * @param element The contentEditable element
//  */
// export function placeCursorAtEnd(element: HTMLElement): void {
//   if (element) {
//     element.focus();
//     const range = document.createRange();
//     range.selectNodeContents(element);
//     range.collapse(false); // false means collapse to end
//     const selection = window.getSelection();
//     if (selection) {
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   }
// }

// /**
//  * Inserts HTML at the current cursor position in a contentEditable element
//  * @param html The HTML to insert
//  */
// export function insertHtmlAtCursor(html: string): void {
//   const selection = window.getSelection();
//   if (selection && selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     range.deleteContents();

//     const fragment = document.createRange().createContextualFragment(html);
//     range.insertNode(fragment);

//     // Move cursor to the end of the inserted content
//     range.collapse(false);
//     selection.removeAllRanges();
//     selection.addRange(range);
//   }
// }
