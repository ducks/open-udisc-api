import { SchemaMap } from '../models';

export class UDiscSchemaMapExtractor {
  static extract<T = SchemaMap>(
    data: unknown[],
    routeKey: string
  ): T {
    for (let i = 0; i < data.length - 2; i++) {
      const label = data[i];
      const pointerMap = data[i + 1];
      const schemaMap = data[i + 2];

      if (
        label === routeKey &&
        typeof pointerMap === 'object' &&
        typeof schemaMap === 'object' &&
        pointerMap &&
        Object.keys(pointerMap).length === 1
      ) {
        const pointerIndex = Object.values(pointerMap)[0];
        const referencedMap = data[pointerIndex];

        if (referencedMap && typeof referencedMap === 'object') {
          return this.resolveKeyAndValueNames(referencedMap, data);
        }
      }
    }

    throw new Error(`Could not resolve schema map schema for route ${routeKey}`);
  }

  /**
   * Resolves a schema map where both keys and values are index references into the data array.
   */
  static resolveKeyAndValueNames<T>(
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
}
