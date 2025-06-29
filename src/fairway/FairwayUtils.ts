import { Course } from '../course/models';
import { FairwayDataResolver } from './FairwayDataResolver';

export class FairwayUtils {
  static extractJsonChunks(raw: string): unknown[] {
  const chunks: unknown[] = [];
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

  static findCourseResultIndices(data: unknown[]): number[] {
    for (let i = 0; i < data.length; i++) {
      if (
        Array.isArray(data[i]) &&
        data[i].every((v: unknown) => typeof v === 'number') &&
      data[i - 1] === 'courseResults'
      ) {
        return data[i];
      }
    }
    throw new Error('Could not find courseResults array');
  }

  static extractCourses(data: unknown[]): Course[] {
    const schemaIndices = this.findCourseResultIndices(data);
    const courses: Course[] = [];

    for (const schemaIndex of schemaIndices) {
      const schema = data[schemaIndex] as Record<string, number>;
      if (typeof schema !== 'object' || Array.isArray(schema)) continue;

      const course: Course = {};

      for (const [rawFieldKey, valueIndex] of Object.entries(schema)) {
        const fieldKeyIndex = parseInt(rawFieldKey.replace(/^_/, ''), 10);
        const fieldName = data[fieldKeyIndex];
        const value = data[valueIndex];

        if (typeof fieldName === 'string') {
          course[fieldName] = value;
        }
      }

      course.slug = `${this.slugify(course.name)}-${course.shortId}`;

      courses.push(course);
    }

    return courses;
  }

static findEventResultIndices(data: unknown[]): number[] {
    for (let i = 0; i < data.length; i++) {
      if (
        Array.isArray(data[i]) &&
        data[i].every((v: unknown) => typeof v === 'number') &&
      data[i - 1] === 'events'
      ) {
        return data[i];
      }
    }
    throw new Error('Could not find events array');
  }

  static extractEvents(data: unknown[]): Event[] {
    const schemaIndices = this.findEventResultIndices(data);
    const events: Event[] = [];

    for (const schemaIndex of schemaIndices) {
      const schema = data[schemaIndex] as Record<string, number>;
      if (typeof schema !== 'object' || Array.isArray(schema)) continue;

      const event: Event = {};

      for (const [rawFieldKey, valueIndex] of Object.entries(schema)) {
        const fieldKeyIndex = parseInt(rawFieldKey.replace(/^_/, ''), 10);
        const fieldName = data[fieldKeyIndex];
        const value = data[valueIndex];

        if (typeof fieldName === 'string') {
          event[fieldName] = value;
        }
      }


      events.push(event);
    }

    return events;
  }

  static  slugify(name: string): string {
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

  static fullyHydrate<T>(
    input: unknown,
    data: unknown[],
    seen = new WeakSet()
  ): T {
    // Primitives pass through
    if (typeof input !== 'object' || input === null) return input as T;

    // Avoid cycles
    if (seen.has(input)) return input as T;
    seen.add(input);

    // Hydrate arrays
    if (Array.isArray(input)) {
      return input.map(item => this.fullyHydrate(item, data, seen)) as T;
    }

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      if (this.isSchemaMap(value)) {
        // Resolve, then fully hydrate the result
        const resolved = FairwayDataResolver.resolveKeyValueMap(value, data);
        result[key] = this.fullyHydrate(resolved, data, seen);
      } else if (Array.isArray(value)) {
        // Handle arrays of schema maps or objects
        result[key] = value.map(item =>
                                this.isSchemaMap(item)
                                  ? this.fullyHydrate(FairwayDataResolver.resolveKeyValueMap(item, data), data, seen)
                                  : this.fullyHydrate(item, data, seen)
                               );
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.fullyHydrate(value, data, seen);
      } else {
        result[key] = value;
      }
    }

    return result as T;
  }

  /**
   * Check if a value is a schema map like: { _69: 70, _81: 82 }
   */
  static isSchemaMap(value: unknown): value is Record<string, number> {
    return (
      typeof value === 'object' &&
        value !== null &&
        Object.entries(value).every(
          ([k, v]) => k.startsWith('_') && typeof v === 'number'
      )
    );
  }

  /**
   * Hydrates a UDisc .data value recursively using the provided full array.
   */
  static hydrateDeep<T = unknown>(value: unknown, array: unknown[]): T {
    if (Array.isArray(value)) {
      return value.map(item => {
        if (typeof item === 'number' && item in array) {
          return this.hydrateDeep(array[item], array);
        }
        return this.hydrateDeep(item, array);
      }) as T;
    }

    if (this.isSchemaMap(value)) {
      const result: Record<string, unknown> = {};
      for (const [rawKey, index] of Object.entries(value as Record<string, number>)) {
        const keyIndex = Number(rawKey.slice(1));
        const resolvedKey =
          typeof array[keyIndex] === 'string' ? (array[keyIndex] as string) : rawKey;

        result[resolvedKey] =
          typeof index === 'number' && index in array
            ? this.hydrateDeep(array[index], array)
            : index;
      }
      return result as T;
    }

    if (typeof value === 'object' && value !== null) {
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        result[k] = this.hydrateDeep(v, array);
      }
      return result as T;
    }

    return value as T;
  }
}
