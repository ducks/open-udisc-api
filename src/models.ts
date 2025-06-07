/// A schema map where each key is a UDisc-style field reference (e.g., "_151"),
/// and each value is an index into the main decoded data array.
export type SchemaMap = Record<string, number>;
