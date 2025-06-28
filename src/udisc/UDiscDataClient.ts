import { UDiscSchemaMap } from './UDiscSchemaMap';
import { UDiscIndexHydrator } from './UDiscIndexHydrator';
import { UDiscKeyValueResolver } from './UDiscKeyValueResolver';

export class UDiscDataClient {
  constructor(
    private readonly fetcher: (url: string) => Promise<unknown[]>
  ) {}

  async fetchAndParse(url: string): Promise<{ topLevel: Record<string, unknown>; hydrator: UDiscIndexHydrator }> {
    const rawArray = await this.fetcher(url);
    const schemaMap = UDiscSchemaMap.extract(rawArray);
    const topLevel = UDiscKeyValueResolver.extract(rawArray);
    const hydrator = new UDiscIndexHydrator(rawArray, schemaMap);
    return { topLevel, hydrator };
  }
}
