## Understanding the UDisc `.data` Structure

The public `.data` endpoints exposed by UDisc aren’t standard JSON APIs. Instead of structured objects, you get a **very large array of mixed values**, with schema maps scattered throughout that tell you how to resolve each field.

Here’s a simplified example:

```ts
{
  type: 'divisional-leaderboard',
  selectedDivision: { _289: 290, _291: 292, _293: 294 },
  divisions: [ 288 ],
  rounds: [ 299 ],
  round: {
    _7: 235,
    _304: 127,
    _305: 306
  },
  roundEntryResults: [
    895, 1009, 1064, 1117, 1172,
    1225, 1279, 1330, 1384, 1438,
    1489, 1540, 1591, 1642, 1696,
    1750, 1801, 1855, 1906, 1960,
    2011, 2065, 2116, 2167
  ],
  layout: {
    _7: 313,
    _319: 320
  }
}
```

These keys (`_289`, `_7`, etc.) point to positions in the array. So
`array[290]` will hold the actual value for `_289`. And if you follow that
value, you’ll likely find another schema map, because many of these fields
represent complex nested structures.

> It's essentially a flattened graph, and the schema maps are the glue that
> lets you reconstruct the tree.

## Schema Roots

Schema maps are usually found in entries like:

```
"routes/events/$slug",
{
  "_3": 124
},
{
  "_125": 126,
  "_232": 233,
  "_237": 238,
  ...
},
"eventListing",
{
  "_7": 127,
  "_128": 129,
  "_130": 131,
  ...
}
```

You'll often find them under `routes/${resource}/$slug`, `routes/courses/$slug`,
etc. These act as entry points for hydration -- you extract these schema roots,
and then resolve every key using the array.

## Tools for the Job

Fairway provides utilities like `extractSchemaMap`, `hydrateDeep`, and
`resolveKeyValuePairs` to handle this automatically. You can feed in raw `.data`
output and get back deeply nested, human-friendly objects.

That rough flow is:

```
const data = fetch($url.data);

# Manually inspect the first 500-1000 lines of the data with jq

const schema = FairwaySchemaMapExtractor.extract(data, 'routes/events/$slug');

const events = FairwayUtils.hydrateDeep(schema, data);
```

A few endpoints have been decoded already and included, but the system is
flexible -- you can explore and decode new ones yourself by inspecting where the
schema roots live.

## Design Philosophy

This library is structured like a simple ETL (Extract, Transform, Load) pipeline.

Because UDisc's `.data` responses are large arrays with schema maps instead of
traditional JSON objects, the process of working with them is unique and often
complex. Rather than trying to wrap that complexity into a single function,
this library separates concerns cleanly:

- **Extract**: Fetch raw `.data` responses from UDisc's public endpoints, or
  load mock data from disk.
- **Transform**: Use schema maps found within the data to recursively resolve
  references and rebuild nested objects.
- **Load**: Return a clean, structured object that can be used in your app,
  tests, or UI.

The formatter functions are intentionally decoupled from the fetchers. Each
`.data` payload has its own quirks, and the shape of the result often depends
on the resource type -- for example, events, courses, layouts, and leaderboards
are all structured differently.

Keeping each step modular makes it easier to:

- test hydration logic independently,
- plug in new endpoint handlers,
- and debug specific layers of the pipeline.

You can think of Fairway as a toolkit for building and decoding UDisc data,
rather than a fixed client with opinions about how you should use it.
