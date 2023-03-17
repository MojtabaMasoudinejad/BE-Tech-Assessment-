## About the Data

There is a file `data.json` that contains an array of `Acronym`s and their `Definition`. Each `Acronym` looks like this:

```js
{
    acronym: "LOL",
    definition: "Laughing out loud"
  },
```

## API Endpoints

| Endpoint                | Method | Description                             | Body                                                                           |
| ----------------------- | ------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| `"/acronym"`            | GET    | Returns an array of all of the Acronym. | `N/A`                                                                          |
| `"/add-acronym"`        | POST   | Returns the created Acronym             | `{acronym: "the new Acronym", definition:"the Acronym definition" }`           |
| `"/acronym/:acronymID"` | PATCH  | Will update a specified Acronym.        | `{updatedAcronym: "the new Acronym" ,updatedDefinition:"the new definition" }` |
| `"/acronym/:acronymID"` | DELETE | Deletes an Acronym based on its ID.     | `N/A`                                                                          |

---

In order to update an acronym, it is possible to update acronym or definition or both.

---

## Responses

Each of these endpoint will return information. What is returned depends on if it succeeded or failed. Here are the formats of the responses you can expect from the server.

### Requesting Data Response

Will respond with the status and the requested data.

```js
{
    "status": 200,
    "data": {...},
    "message": "..."
}
```

### Sending Data Response

Will respond with the status, a message, and the data that was sent.

```js
{
    "status": 200,
    "data": {...},
    "message": "..."

}
```

### Deleting Data Response

Will respond with the status and a message.

```js
{
    "status": 200,
    "message": "...",
}
```

### Error Response

Will respond with the status and a message.

```js
{
    "status": 400,
    "message": "...",
}
```

---
