# Nxus Metrics

A module for capturing and querying arbitrary events, called metrics.

A metric has a `name`, like 'pageViews', and arbitrary `data`, which can be any object.  For example, your 'pageViews' metric might have an entry like:

```json
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

Metrics provides a single method for recording new metrics.

```javascript
app.get('metrics').metric('someName', {some: 'data'});
```

## API