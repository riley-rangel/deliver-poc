# deliver-poc
Deliver Web Tool Proof of Concept (POC)

## Mission Statement
The idea is simple... the implementation will be very hard (for me), but as everything with code, I'm sure it is possible.

Basically, what I want to accomplish with this POC is simple. Prove that the basic methods in building a webpage can be abstracted away from the underlying web APIs that exist, and opened up to a whole group of non-technical users. AKA the DOM APIs and the CSS code that styles web elements.

In web development, a developer needs to accomplish these things:

1. CREATE elements on the webpage.
2. POSITION elements within a page.
3. STYLE elements to match a design.
4. INTERACT with elements on a page.

All of these things are simple interactions that can be expressed a number of ways in code, but at the end of the day, accomplish the same thing. By abstracting out the implementations of how these simple ideas are put into effect, creating web pages can be done predictably and efficiently.

## Proof of Concept

This project is not meant to be the final tool to end all web development. This project is meant to provide a space to determine if these simple concepts can be abstracted away from their underlying implementations. 

### Thesis

Our thesis being tested, is that a non-technical person can build a webpage with nothing but a mouse and keyboard from scratch - no templates.

### Objectives for Success

With our provided toolkit, user must be able to:

- [ ] ADD elements to the page.
- [ ] REMOVE elements previously added to the page.
- [ ] POSITION these elements within other elements on the page, with limited confusion.
- [ ] STYLE these elements with no prior knowledge of CSS.
- [ ] IMPLEMENT INTERACTIONS based on elements on the page.

If all of these objectives are accomplished, the experiment will be considered a success.

### Restrictions

1. This tool will only be tested against the latest browsers with the latest JS and CSS APIs available. Ergo, up to ES6 and CSS Grid.
2. Not all modern website technology will be included. We are not including modals, async functionality (AJAX calls, timeouts, etc.), animations, and so on.


