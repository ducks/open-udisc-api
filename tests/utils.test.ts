import { describe, it, expect } from 'vitest';
import { extractJsonChunks, slugify } from '../src/utils';

describe('slugify', () => {
  it('converts names with spaces and punctuation', () => {
    expect(slugify('Milo McIver (Riverbend East)'))
      .toBe('milo-mc-iver-riverbend-east');

    expect(slugify('Keith L. Christner Family DG Course'))
      .toBe('keith-l-christner-family-dg-course');
  });

  it('handles accents and unicode characters', () => {
    expect(slugify('Discgolfové hřiště Moravský Krumlov'))
      .toBe('discgolfove-hriste-moravsky-krumlov');
  });

  it('replaces ampersands with "and"', () => {
    expect(slugify('Legacy Trails at L & J Ranch'))
      .toBe('legacy-trails-at-l-and-j-ranch');
  });

  it('removes leading/trailing and duplicate hyphens', () => {
    expect(slugify('  Test -- Course  '))
      .toBe('test-course');
  });

  it('collapses camelCase words like McIver', () => {
    expect(slugify('TestMcIverWord'))
      .toBe('test-mc-iver-word');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });

  it('preserves numbers and strips symbols', () => {
    expect(slugify('Layout 3 (Alt Tees) #Special!'))
      .toBe('layout-3-alt-tees-special');
  });
});

describe('extractJsonChunks', () => {
  it('extracts multiple JSON objects and arrays from a raw string', () => {
    const raw = `
      {"a":1}
      [1,2,3]
      {"b":[{"c":2}]}
    `;

    const chunks = extractJsonChunks(raw);

    expect(chunks.length).toBe(3);
    expect(chunks[0]).toEqual({ a: 1 });
    expect(chunks[1]).toEqual([1, 2, 3]);
    expect(chunks[2]).toEqual({ b: [{ c: 2 }] });
  });

  it('returns empty array when no valid JSON found', () => {
    const raw = 'random text without json';

    const chunks = extractJsonChunks(raw);

    expect(chunks).toEqual([]);
  });

  it('handles deeply nested valid JSON structures', () => {
    const raw = '{"a":{"b":{"c":[1,2,{"d":"e"}]}}}';

    const chunks = extractJsonChunks(raw);

    expect(chunks.length).toBe(1);
    expect(chunks[0]).toEqual({ a: { b: { c: [1, 2, { d: 'e' }] } } });
  });

  it('handles back-to-back JSON blocks without whitespace', () => {
    const raw = '{"x":1}{"y":2}[3,4]';

    const chunks = extractJsonChunks(raw);

    expect(chunks.length).toBe(3);
    expect(chunks[0]).toEqual({ x: 1 });
    expect(chunks[1]).toEqual({ y: 2 });
    expect(chunks[2]).toEqual([3, 4]);
  });
});
