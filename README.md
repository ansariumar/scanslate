
# Project Title

Installations steps for the contributor




## Run Locally

Clone the project

```bash
  git clone the project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run devStart
```
if devStart doesn't work, just do
```
npm install -D nodemon
```
then go to package.json and there will be some bullshit written on the Scripts, just add this there

## Usage/Examples

```javascript
"scripts": {
    "devStart": "nodemon server.js"
  }
```

