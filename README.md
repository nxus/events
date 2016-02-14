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

### Metrics

[src/index.js:14-71](https://github.com/nxus/metrics/blob/21c01383bdd5401eec9241be6e9038c7bdf5bcc3/src/index.js#L14-L71 "Source code on GitHub")

The Metrics module captures arbitrary data about events (a metric) for storage and querying later.

#### capture

[src/index.js:31-38](https://github.com/nxus/metrics/blob/21c01383bdd5401eec9241be6e9038c7bdf5bcc3/src/index.js#L31-L38 "Source code on GitHub")

Captures metric data about a specified @nxus/storage Model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the model to capture. Must be a Storage/BaseModel class.
-   `events` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)=(default \['create', 'update', 'destroy'])** Optional. An array of model events to capture. Defaults to 'create', 'update', 'destroy'.

#### getMetrics

[src/index.js:59-64](https://github.com/nxus/metrics/blob/21c01383bdd5401eec9241be6e9038c7bdf5bcc3/src/index.js#L59-L64 "Source code on GitHub")

Returns metrics for the specified name, optionally using the query to filter returned values.

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the name of the metrics to return
-   `query` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Optional.  The Waterline compatible query object to filter results by.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** A promise for the result set.

#### metric

[src/index.js:46-51](https://github.com/nxus/metrics/blob/21c01383bdd5401eec9241be6e9038c7bdf5bcc3/src/index.js#L46-L51 "Source code on GitHub")

Record a new metric value

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The metric name to use.
-   `data` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An arbitrary object to record as as the data payload for the metric.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** A promise that is fulfilled when the metric has been saved successfully.
