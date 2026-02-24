

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

answer: getElementById helps us to get an specific element using id. By using getElementsByClassName we can get multiple elemtns by class. querySelector helps us to get a element by css selector and by using querySelectorAll we can get multiple elements by css selector. 

### 2. How do you create and insert a new element into the DOM?

ansewr: We use document.createElement to create a specific HTML element. Then we can set its content using innerHTML or innerText. Finally, we insert it into the parent element using appendChild.

### 3. What is Event Bubbling? And how does it work?

answer: Event bubbling is when an event starts at the specific element we clicked and moves up to its parent elements. It works by passing the event upward through the DOM tree, so a click on a button is also detected by its parent container.

### 4. What is Event Delegation in JavaScript? Why is it useful?

answer: Event delegation is adding a single event listener to a parent element to handle events for all its children. It is useful because it saves memory by avoiding many listeners. it also allows us to handle events for dynamically added elements automatically.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

answer: preventDefault() stops the browser's default behavior, like preventing a form from reloading the page or a link from navigating. stopPropagation() stops the event from bubbling up, meaning the event will not reach or trigger listeners on parent elements.