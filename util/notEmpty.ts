export default <TValue extends unknown>(
  value: TValue | null | undefined,
): value is TValue => value !== null && value !== undefined;
