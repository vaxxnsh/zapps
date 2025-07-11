import z from "zod";


export function getErrorStrings<T>(
  parsedObj: z.ZodSafeParseResult<T>
): string[] {
  if (parsedObj.success) return [];

  const flattenedErrors = z.flattenError(parsedObj.error)
  const fieldErrorStrings: string[] = [];

  const keys = Object.keys(flattenedErrors.fieldErrors) as Array<
    keyof typeof flattenedErrors.fieldErrors
  >;

  for (const key of keys) {
    const errors = flattenedErrors.fieldErrors[key];
    if (errors && errors.length > 0) {
      fieldErrorStrings.push(...errors);
    }
  }

  const allErrors = [...flattenedErrors.formErrors, ...fieldErrorStrings];

  return allErrors;
}