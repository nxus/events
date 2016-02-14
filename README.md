# Nxus Metrics

A module for capturing and querying arbitrary events, called metrics.

A metric has a `name`, like 'pageViews', and arbitrary `data`, which can be any object.  For example, your 'pageViews' metric might have an entry like:

```javascript
{
  name: 'pageViews',
  data: {
    browser: 'Safari',
    location: [...]
    ...
  }
}
```

## Installation

```bash
> npm install @nxus/metrics --save
```

## Usage

### Saving a metric value

Metrics provides a method for recording new metrics.

```javascript
app.get('metrics').metric('someName', {some: 'data'});
```

### Capturing metrics for models

You can also have Metrics capture all events from a model and save new values accordingly.

```javascript
app.get('metrics').capture('myModel')
```

Now, whenenver an instance of the model is created, updated or destroyed, there will be a corresponding metric captured.  For example, 'myModelCreated', where the data is the latest instance of the model.


## API