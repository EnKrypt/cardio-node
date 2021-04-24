<p align="center">
    <img width="500" src="https://github.com/EnKrypt/cardio-node/raw/master/assets/Cardio.png" />
</p>

<p align="center">
    <b>Keep your apps in shape with Cardio</b>
</p>

<br>

<p align="center">
    <a href="https://raw.githubusercontent.com/EnKrypt/cardio-node/master/LICENSE" title="License">
        <img src="https://img.shields.io/npm/l/cardio-node" />
    </a>
    <a href="https://packagephobia.com/result?p=cardio-node" title="Install Size">
        <img src="https://packagephobia.com/badge?p=cardio-node" />
    </a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/cardio-node" title="cardio-node at npm">
        <img src="https://github.com/EnKrypt/cardio-node/raw/master/assets/npm.svg" />
    </a>
    <a href="https://unpkg.com/cardio-node/" title="cardio-node at unpkg">
        <img src="https://github.com/EnKrypt/cardio-node/raw/master/assets/unpkg.svg" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/cardio-node/" title="cardio-node at jsdelivr">
        <img src="https://github.com/EnKrypt/cardio-node/raw/master/assets/jsdelivr.svg" />
    </a>
    <a href="https://libraries.io/npm/cardio-node" title="cardio-node at libraries.io">
        <img src="https://github.com/EnKrypt/cardio-node/raw/master/assets/libraries-io.svg" />
    </a>
    <a href="https://npm.anvaka.com/#/view/2d/cardio-node" title="cardio-node at npmgraph">
        <img src="https://github.com/EnKrypt/cardio-node/raw/master/assets/npmgraph.svg" />
    </a>
</p>
---

## What is Cardio?

Cardio is a node.js module that tells you how long an async function took to run.

Use it as a wrapper around an async function and you get the invocation time and arguments provided to your function within a callback. You can now use this information to plot graphs, create models based on different arguments provided, or simply make a note somewhere for analysis.

Cardio works best in production environments where you may expect variance in execution time based on arguments provided, environmental overheads, or other real world parameters.

## Usage

Import `cardio-node` by running `npm install cardio-node` or `yarn add cardio-node`

Use the module in code using `require`:

```js
const { cardioWrapper } = require('cardio-node');
```

Or using ES6 Imports:

```js
import { cardioWrapper } from 'cardio-node';
```

Wrap your async function using `cardioWrapper` in your application. You can substitute the call to your async function with the call to what is returned by `cardioWrapper`:

```js
const countSheep = async (arg1, arg2) => {
  // ...perform elaborate sheep counting here
  return arg1 + arg2;
};

const countSheepWithCardio = cardioWrapper(
  'count-sheep',
  countSheep,
  (cardioName, invocation, args) => {
    // You have args here if you want access to what was passed to countSheep
    const durationRounded = new Number(invocation.duration).toPrecision(2);
    console.log(
      `Function registered as ${cardioName} took ${durationRounded} milliseconds to run`
    );
  }
);

(async () => {
  const numberOfSheep = await countSheepWithCardio(4, 5);
  console.log(`Counted ${numberOfSheep} sheep in total`);
})();
```

Output:

```
Function registered as count-sheep took 0.073 milliseconds to run
Counted 9 sheep in total
```

Take a look at [the code for a sample application](https://github.com/EnKrypt/cardio-node/blob/master/test.js) for a full fledged example of how you can use `cardio-node`.

## API

The `cardioWrapper` method takes in the following arguments:

| Argument            | Type                          | Description                                                                                  |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| `cardioName`        | `string`                      | A name for that function so that cardio and you can track it                                 |
| `functionToMeasure` | async `function` or `Promise` | The function that you want to pass to cardio to measure and track                            |
| `cardioCallback`    | `function`                    | A callback with the measurements recorded by cardio after your function has finished running |

`cardioCallback` gives you three arguments:

| Argument     | Type     | Description                                                                                                           |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `cardioName` | `string` | The string you passed to `cardioWrapper()` for the function that has finished running                                 |
| `invocation` | `Object` | The object created by cardio containing the metrics or measurements recorded                                          |
| `args`       | `Array`  | The arguments passed to your function for the current invocation. Useful for comparing invocations for pure functions |

`invocation` object has the following fields:

| Field              | Type      | Description                                                                                                  |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------ |
| `duration`         | `number`  | Number of milliseconds taken for execution. This number is highly precise and might need rounding/truncation |
| `applicationError` | `boolean` | Indicates whether an error was encountered in the execution of the function                                  |

## Inspiration

I was on vacation with a few friends and we found the gym closed in our hotel due to covid. It was 37C outside so going for a run was out of the question. Discussions around not getting any cardio done somehow eventually mixed with discussions about code.

Shoutout to [@tallpants](https://github.com/tallpants) and [@deusv0lt](https://github.com/deusv0lt) for brainstorming.

---

#### Built using [TSDX](https://tsdx.io)
