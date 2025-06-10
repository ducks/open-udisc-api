export function extractJsonChunks(raw: string): any[] {
  const chunks: any[] = [];
  let i = 0;

  while (i < raw.length) {
    const open = raw[i];

    if (open === '{' || open === '[') {
      const start = i;
      const stack: string[] = [open];
      i++;

      while (i < raw.length && stack.length > 0) {
        const curr = raw[i];
        const top = stack[stack.length - 1];

        if (curr === '{' || curr === '[') {
          stack.push(curr);
        } else if (
          (curr === '}' && top === '{') ||
          (curr === ']' && top === '[')
        ) {
          stack.pop();
        }
        i++;
      }

      if (stack.length === 0) {
        const chunk = raw.slice(start, i);
        try {
          chunks.push(JSON.parse(chunk));
        } catch {
          // Ignore invalid chunks
        }
      }
    } else {
      i++;
    }
  }

  return chunks;
}

export function slugify(name: string): string {
  return name
    .normalize('NFD')                        // decompose accents
    .replace(/[\u0300-\u036f]/g, '')        // remove accents
    .replace(/([a-z])([A-Z])/g, '$1-$2')    // split camelCase (McIver → Mc-Iver)
    .replace(/&/g, 'and')                   // replace ampersand
    .replace(/[^a-zA-Z0-9]+/g, '-')         // non-alphanum to hyphen
    .replace(/-+/g, '-')                    // collapse multiple hyphens
    .replace(/^-|-$/g, '')                  // trim leading/trailing hyphens
    .toLowerCase();
}

/**
 * Resolves a schema map where both keys and values are index references into the data array.
 */
export function resolveKeyAndValueNames<T>(
  schema: Record<string, number>,
  data: unknown[]
): T {
  const result: Partial<T> = {};

  for (const rawKey in schema) {
    const keyIndex = parseInt(rawKey.replace(/^_/, ''), 10);
    const valIndex = schema[rawKey];

    const fieldName = data[keyIndex];
    if (typeof fieldName !== 'string') {
      throw new Error(`Expected string field name at index ${keyIndex}, got: ${typeof fieldName}`);
    }

    (result as Record<string, unknown>)[fieldName] = data[valIndex];
  }
  return result as T;
}

/**
 * Searches for the schema map schema given a route key
 * Then resolves the schema object it points to.
 */
export function resolveSchemaMapSchema(data: any[], routeKey: string) {
  for (let i = 0; i < data.length - 2; i++) {
    const label = data[i];
    const pointerMap = data[i + 1];
    const schemaMap = data[i + 2];

    if (
      label === routeKey &&
      typeof pointerMap === 'object' &&
      typeof schemaMap === 'object' &&
      Object.keys(pointerMap).length === 1
    ) {
      const pointerIndex = Object.values(pointerMap)[0];
      const referencedMap = data[pointerIndex];

      if (typeof referencedMap === 'object') {
        return resolveKeyAndValueNames(referencedMap, data);
      }
    }
  }

  throw new Error(`Could not resolve schema map schema for route ${routeKey}`);
}

function isSchemaMap(obj: unknown): obj is Record<string, number> {
  return typeof obj === 'object' &&
         obj !== null &&
         Object.keys(obj).every(k => /^_\d+$/.test(k));
}

export function deepHydrate<T>(input: T, data: unknown[]): T {
  if (Array.isArray(input)) {
    return input.map(item => deepHydrate(item, data)) as T;
  }

  if (typeof input !== 'object' || input === null) return input;

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (isSchemaMap(value)) {
      result[key] = resolveKeyAndValueNames(value, data);
    } else if (Array.isArray(value)) {
      result[key] = value.map(v =>
        isSchemaMap(v) ? resolveKeyAndValueNames(v, data) : deepHydrate(v, data)
      );
    } else {
      result[key] = deepHydrate(value, data);
    }
  }

  return result as T;
}

export function resolveByIds<T>(
  ids: number[],
  records: Record<number, any>
): T[] {
  return ids
    .map((id) => records[id])
    .filter((obj): obj is T => obj !== undefined);
}

export function fullyHydrate<T>(
  input: T,
  data: unknown[],
  seen = new WeakSet()
): T {
  // Primitives pass through
  if (typeof input !== 'object' || input === null) return input;

  // Avoid cycles
  if (seen.has(input)) return input;
  seen.add(input);

  // Hydrate arrays
  if (Array.isArray(input)) {
    return input.map(item => fullyHydrate(item, data, seen)) as T;
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (isSchemaMap(value)) {
      // Resolve, then fully hydrate the result
      const resolved = resolveKeyAndValueNames(value, data);
      result[key] = fullyHydrate(resolved, data, seen);
    } else if (Array.isArray(value)) {
      // Handle arrays of schema maps or objects
      result[key] = value.map(item =>
        isSchemaMap(item)
          ? fullyHydrate(resolveKeyAndValueNames(item, data), data, seen)
          : fullyHydrate(item, data, seen)
      );
    } else if (typeof value === 'object' && value !== null) {
      result[key] = fullyHydrate(value, data, seen);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
