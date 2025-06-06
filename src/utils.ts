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
export function resolveKeyAndValueNames(schema: Record<string, number>, data: any[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const rawKey in schema) {
    const keyIndex = parseInt(rawKey.replace(/^_/, ''), 10);
    const valIndex = schema[rawKey];

    const fieldName = data[keyIndex];
    if (typeof fieldName !== 'string') {
      throw new Error(`Expected string field name at index ${keyIndex}, got: ${typeof fieldName}`);
    }

    result[fieldName] = data[valIndex];
  }
  return result;
}

/**
 * Searches for the schema map schema given a route key
 * Then resolves the schema object it points to.
 */
export function resolveSchemaMapSchema(data: any[], routeKey = 'routes/courses/$slug/index') {
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

export function deepHydrate(value: any, data: any[]): any {
  if (Array.isArray(value)) {
    return value.map((item) => deepHydrate(item, data));
  }

  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    const isSchemaMap = keys.every((k) => k.startsWith('_'));

    if (isSchemaMap) {
      const resolved = resolveKeyAndValueNames(
        value as Record<string, number>,
        data
      );
      return deepHydrate(resolved, data);
    }

    const result: Record<string, any> = {};
    for (const key of keys) {
      result[key] = deepHydrate(value[key], data);
    }
    return result;
  }

  return value;
}

export function resolveByIds<T>(
  ids: number[],
  records: Record<number, any>
): T[] {
  return ids
    .map((id) => records[id])
    .filter((obj): obj is T => obj !== undefined);
}
