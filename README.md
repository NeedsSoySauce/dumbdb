# About

Dumbdb isn't a database but it is pretty dumb.

## Usage

Install with npm:

```
npm install @needssoysauce/dumbdb
```

Example usage:

```typescript
import { DumbDatabaseBuilder, Model } from '@needssoysauce/dumbdb';

interface Todo extends Model {
    content: string;
}

const main = async () => {
    const db = await new DumbDatabaseBuilder({
        auth: 'GitHub personal access token',
        repo: 'Name of the GitHub repository you want to use'
    }).build();

    const todos = await db.addModel<Todo>('todos', {
        content: {
            kind: 'string'
        }
    });

    await todos.insert({ content: 'Do stuff' })

    await todos.saveChanges();

    console.log(await todos.select(() => true));
};

main().catch((e) => console.error(e));
```

# Development

These instructions are for people who want to work on dumbdb itself.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [npm](https://www.npmjs.com/)

### Installation

To install dependencies run:

```
npm install
```

### Execution

To run the project:

```
npm run dev
```
