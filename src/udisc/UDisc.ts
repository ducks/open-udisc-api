import { UDiscDataFetcher } from './UDiscDataFetcher';
import { UDiscSchemaMapExtractor } from './UDiscSchemaMapExtractor';

export class UDisc {
  constructor(private readonly fetcher = new UDiscDataFetcher()) {}

  async getCourses(): Promise<unknown[]> {
    const raw = await this.fetcher.fetch('courses');
    const schema = UDiscSchemaMapExtractor.extract(raw, 'routes/courses/$slug');
    const resolver = new UDiscDataResolver(raw, schema);
    const course = resolver.get('course', { recursive: true });
    return [course];
  }
}
