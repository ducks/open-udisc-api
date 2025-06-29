export class FairwayDataResolver {
  constructor(
    private readonly raw: unknown[],
    private readonly schema: Record<string, unknown>
  ) {}

  // Public: main entrypoint
  public get<T = unknown>(field: string, options?: { recursive?: boolean }): T {
    const entry = this.schema[field];
    let resolved: unknown;

    if (Array.isArray(entry)) {
      resolved = this.resolveByIds<T>(entry);
    } else if (typeof entry === 'object' && entry !== null) {
      resolved = this.resolveKeyValueMap<T>(entry);
    } else {
      throw new Error(`Field '${field}' is neither an array nor a schema map`);
    }

    return options?.recursive ? this.recurse(resolved) : resolved;
  }

  // Instance version
  public resolveKeyValueMap<T = unknown>(schemaMap: unknown): T {
    return FairwayDataResolver.resolveKeyValueMap<T>(this.raw, schemaMap);
  }

  public resolveByIds<T = unknown>(idList: unknown): T[] {
    return FairwayDataResolver.resolveByIds<T>(this.raw, idList);
  }

  public recurse<T = unknown>(value: unknown): T {
    return FairwayDataResolver.recurse(this.raw, value);
  }

  // --- Static versions below ---

  static resolveKeyValueMap<T = unknown>(
    raw: unknown[],
    schemaMap: unknown
  ): T {
    if (!schemaMap || typeof schemaMap !== 'object' || Array.isArray(schemaMap)) {
      throw new Error('Invalid schema map');
    }

    const map = schemaMap as Record<string, number>;
    const result: Partial<T> = {};

    for (const rawKey in map) {
      const keyIndex = parseInt(rawKey.replace(/^_/, ''), 10);
      const valIndex = map[rawKey];

      const key = raw[keyIndex];
      const value = raw[valIndex];

      if (typeof key !== 'string') {
        throw new Error(`Expected string key at index ${keyIndex}, got ${typeof key}`);
      }

      (result as Record<string, unknown>)[key] = value;
    }

    return result as T;
  }

  static resolveByIds<T = unknown>(raw: unknown[], list: unknown): T[] {
    if (!Array.isArray(list)) {
      throw new Error('Expected array of numeric IDs');
    }

    return list
      .map((id) => typeof id === 'number' ? raw[id] : undefined)
      .filter((x): x is T => x !== undefined);
  }

  static recurse<T = unknown>(raw: unknown[], value: unknown): T {
    if (Array.isArray(value)) {
      return value.map((v) =>
        typeof v === 'object' && v !== null
          ? FairwayDataResolver.recurse(raw, v)
          : v
      ) as T;
    }

    if (typeof value !== 'object' || value === null) {
      return value;
    }

    const result: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(value)) {
      if (
        val &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        Object.keys(val).every((k) => k.startsWith('_') && typeof (val as unknown)[k] === 'number')
      ) {
        const nested = new FairwayDataResolver(raw, { nested: val });
        result[key] = nested.get('nested', { recursive: true });
      } else {
        result[key] = val;
      }
    }

    return result as T;
  }
}
