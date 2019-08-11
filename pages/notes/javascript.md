# JavaScript

## Resources

- [JavaScript: Understanding the Weird Parts - The First 3.5 Hours](https://www.youtube.com/watch?v=Bv_5Zv5c-Ts)
- http://javascript.info

## Scope Chain

Source: https://youtu.be/Bv_5Zv5c-Ts?t=1h15m51s

If a value being called cannot be found in a current Execution Context, the engine will ‘go down the Scope Chain’ — it will look into the outer Lexical Environment.

```JavaScript
function b() {
  console.log(foo);
}
function a() {
  var foo = 222;
  b();
}
var foo = 111;
a();
```

In the above example, function `b` will print `111` to the console, because the variable `foo` is declared and assigned a value in the closest Lexical Environment. If the function `b` was nested inside of function `a`, it would return `222`.

**TL;DR:** If something is called and does not exist in the current scope, the engine will step out of the scope searching for it. The number of the ‘step-outs’ depends on how deeply nested the scope is.

## let

Source: https://youtu.be/Bv_5Zv5c-Ts?t=1h33m17s

Variable declaration that is only available inside a certain scope due to Block Scoping.

A variable declared with `let` will not be available outside of the scope it has been declared in.

## Asynchronous Code and Events

Source: https://youtu.be/Bv_5Zv5c-Ts?t=1h37m36s

JavaScript is a synchronous language. It handles the asynchronous parts with an Event Queue. The Event Queue is run one-by-one when the global Execution Stack is empty.

1. The global Execution Stack is emptied (executed).
2. The first item from the Event Queue is being run, filling the Execution Stack.
3. When this another Stack is finished running all the code one line at the time, the next asynchronous event is being considered.
4. …so on, so forth.

## ‘Operand’, ‘operator’ and ’unary’

Source:http://javascript.info/operators

Operand (also referred to as ‘an argument’) is what operators are applied to.

`5 * 2` := `5` and `2` are operands, `*` is an operator.

An operator is unary if it has a single operand.

`x++` := `++` is a unary operator, because it has one operand (argument).

## Numeric conversion, unary ‘+’, coercion

Sources:

- http://javascript.info/operators#numeric-conversion-unary
- https://youtu.be/Bv_5Zv5c-Ts?t=2h17m00s

`Number(<value>)` := returns a number
`+value` := equal to using the `Number()` constructor

`'1' + 2` := returns `'12'` (a string), because the binary (has two operands) `+` concatenates strings — it converts a non-string to a string beforehand. The process is called coercion.

`1 + '2'` := same as above
`1 + 2 + '3'` := returns `'33'`, because the binary `+` first does the calculation of two numbers and then converts the outcome when dealing with a string.

## Breaking nested loops

Source: https://javascript.info/while-for#labels-for-break-continue

```JavaScript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i % 2 === 0 && j % 2 === 0) break outer;
  }
}
```

## Default function argument value

```JavaScript
function hello(arg1 = 'no input given', arg2 = 'no input given') {
  alert(arg1 + arg2);
}

hello(‘888 ‘); // ‘888 no input given’
```

### Key-value shorthand

Source: https://javascript.info/object#property-value-shorthand

```JavaScript
function makeUser(name, age) {
  return {
    name: name,
    age: age
  };
}
```

The above is the same as:

```JavaScript
function makeUser(name, age) {
  return {
    name,
    age
  };
}
```

## Object existence check

Source: https://javascript.info/object#the-for-in-loop

```JavaScript
<key> in object // returns true or false
```

## Object const

Source: https://javascript.info/object#const-object

```JavaScript
const user = {
  name: "John",
};

user.age = 25; // Can edit the object.
```

An object declared as const can be changed. It is the reference to the object (‘variable name’) that’s constant, not the object itself.

The following line will return an error, because the object reference `user` is constant.

```JavaScript
user = {
  isAdmin: false,
  age: 18,
};
```

## Object cloning

Source: https://javascript.info/object#cloning-and-merging-object-assign

Single object:

```JavaScript
let user = {
  name: "John",
  age: 30
};

let clone = {};

for (let key in user) {
  clone[key] = user[key];
}
```

or:

```JavaScript
let clone = Object.assign({}, user);
```

Multiple objects:
`Object.assign(newObject, oldObject1, oldObject2…)` := The first argument is a clone, all subsequent ones are the source.

```JavaScript
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

Object.assign(user, permissions1, permissions2);
```

## Extends

Babel compiles `extends`, but be aware of the order of the files. The extended file must be before the child extending it.

## Async/await

```JavaScript
const bob = async () => {
  try {
    const pages = await parseArguments();
    if (pages.length === 0) throw Error('No data found.');

    const names = handleScrape(pages);
    await writeFile(FILE_DEST, JSON.stringify(names));

    console.log('All done!');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
```

Multiple awaits in a single `try/catch` block are fine, unless the errors have to be handled differently. Then, each `await` should be in its own `try/catch` block.
