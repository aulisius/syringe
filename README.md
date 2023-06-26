# @faizaanceg/syringe

A tiny dependency injection solution written in JS

## Installation

```sh
npm install @faizaanceg/syringe
```

```sh
yarn add @faizaanceg/syringe
```

## Usage

```js
import { Syringe } from "@faizaanceg/syringe";
const injections = [
  { name: "host", uses: [], injectFn: () => "https://example.com" },
  {
    name: "endpoints",
    uses: [{ name: "host" }],
    injectFn: ({ host }) => ({ url: host + "/" }),
  },
];
Syringe.fill(injections);

console.log(Syringe.inject("endpoints")); // { url: "https://example.com/" }
console.log(Syringe.inject("host")); // "https://example.com"
```

## API

### `fill`

`fill` method is used to setup the injections that'll be later requested by your app.

#### Signature

```ts
interface InjectionRef {
  name: string;
}

interface Injection<T> {
  name: string;
  uses: InjectionRef[];
  injectFn(): T;
}

fill(injections: Injections[]): void
```

### `inject`

`inject` method is used to inject the dependency wherever requested.

#### Signature

```ts
inject<T>(name: string): T
```
