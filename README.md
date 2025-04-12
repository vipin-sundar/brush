# BrusJS Documentation

BrusJS is a lightweight canvas drawing library that makes it easy to create interactive graphics and animations in JavaScript. It provides an intuitive API for drawing shapes, handling user input, and managing animation loops.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
  - [Canvas Setup](#canvas-setup)
  - [Drawing Shapes](#drawing-shapes)
  - [Styling](#styling)
  - [Text](#text)
  - [Events](#events)
  - [Animation](#animation)
- [Examples](#examples)
- [Contributing](#contributing)

## Installation

Install via npm:

```bash
npm install brusjs
```

Or include via CDN:

```html
<script src="https://unpkg.com/brusjs"></script>
```

## Quick Start

```javascript
import Brush from 'brusjs';

const brush = new Brush();

// Create canvas
brush.createCanvas(800, 600, { container: '#app' });

// Setup runs once
brush.setup = () => {
  brush.background('#f0f0f0');
};

// Draw runs in a loop
brush.draw = () => {
  brush.fill('blue');
  brush.circle(400, 300, 50);
};

// Start animation loop at 60fps
brush.start(60);
```

## Core Concepts

BrusJS works with three main concepts:

1. **Setup**: Initial configuration that runs once
2. **Draw**: Animation loop that runs continuously
3. **Events**: User interaction handlers

## API Reference

### Canvas Setup

#### createCanvas(width, height, options?)

Creates and initializes a new canvas element.

```javascript
brush.createCanvas(800, 600, {
  container: '#app',    // Container selector or element
  id: 'myCanvas',      // Optional canvas ID
  className: 'game'    // Optional CSS class
});
```

#### background(color)

Sets the canvas background color.

```javascript
brush.background('#ffffff');    // White background
brush.background('rgb(0,0,0)'); // Black background
```

### Drawing Shapes

#### rect(x, y, width, height, stroke?)

Draws a rectangle.

```javascript
brush.fill('red');
brush.rect(100, 100, 200, 150);     // Filled rectangle
brush.rect(100, 100, 200, 150, true); // Stroked rectangle
```

#### circle(x, y, radius)

Draws a circle.

```javascript
brush.fill('blue');
brush.circle(400, 300, 50); // Circle at (400,300) with radius 50
```

#### line(x1, y1, x2, y2)

Draws a line.

```javascript
brush.strokeColor('black');
brush.strokeWeight(2);
brush.line(0, 0, 100, 100);
```

### Styling

#### fill(color)

Sets the fill color for shapes.

```javascript
brush.fill('#ff0000');     // Red
brush.fill('rgb(0,255,0)'); // Green
brush.fill('blue');        // Blue
```

#### strokeColor(color)

Sets the stroke color.

```javascript
brush.strokeColor('#000000');
```

#### strokeWeight(width)

Sets the stroke width.

```javascript
brush.strokeWeight(5); // 5px stroke width
```

### Text

#### text(text, x, y, fontFamily?, align?, size?)

Draws text on the canvas.

```javascript
brush.fill('black');
brush.text('Hello World', 100, 100);
brush.text('Center', 400, 300, 'Arial', 'center', 24);
```

### Events

#### onMouseClick(callback)

Handles mouse click events.

```javascript
brush.onMouseClick((x, y) => {
  console.log(`Clicked at ${x}, ${y}`);
});
```

#### onKeyPress(callback)

Handles keyboard events.

```javascript
brush.onKeyPress((key) => {
  if (key === 'ArrowRight') {
    // Handle right arrow
  }
});
```

### Animation

#### start(frameRate?, updatesPerFrame?)

Starts the animation loop.

```javascript
brush.start(60);  // 60 FPS
brush.start(30, 2); // 30 FPS with 2 updates per frame
```

## Examples

### Bouncing Ball

```javascript
const brush = new Brush();
brush.createCanvas(800, 600);

let x = 400;
let y = 300;
let dx = 5;
let dy = 5;

brush.setup = () => {
  brush.background('#f0f0f0');
};

brush.draw = () => {
  brush.background('#f0f0f0');
  
  // Update position
  x += dx;
  y += dy;
  
  // Bounce off walls
  if (x > 780 || x < 20) dx = -dx;
  if (y > 580 || y < 20) dy = -dy;
  
  // Draw ball
  brush.fill('red');
  brush.circle(x, y, 20);
};

brush.start(60);
```

### Interactive Drawing

```javascript
const brush = new Brush();
brush.createCanvas(800, 600);

brush.setup = () => {
  brush.background('white');
  brush.strokeColor('black');
  brush.strokeWeight(2);
};

brush.onMouseClickAndMove((x, y) => {
  brush.circle(x, y, 5);
});

brush.start();
```

