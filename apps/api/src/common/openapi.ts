import type { ApiResponseSchemaHost } from '@nestjs/swagger';
import { z } from 'zod';

/** Converts a Zod schema into an OpenAPI 3.0 schema object for `@Api*Response({ schema })`. */
export function openApiSchema(schema: z.ZodType): ApiResponseSchemaHost['schema'] {
  const { $schema: _ignored, ...json } = z.toJSONSchema(schema, {
    target: 'openapi-3.0',
  }) as Record<string, unknown>;
  return json as ApiResponseSchemaHost['schema'];
}
