# daily-check
Check who spoke on daily meeting and don't lose track who haven't spoke

Upload JSON with your team. Set checked false to the ones that are going to daily and true to the ones that don't (vacations, out of office, etc). As teammate is called, check them on the front-end.

Don't know who call, press Choose random button.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/daily-check](http://localhost:3000/daily-check) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Template JSON

```json
{
  "José": {
    "checked": false
  },
  "Aderbal": {
    "checked": true
  },
  "Aragão": {
    "checked": true
  },
  "Filho": {
    "checked": true
  }
}
```
