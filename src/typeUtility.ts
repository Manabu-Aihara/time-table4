export const groupTable = {
  '1': '本社',
  '2': '宇都宮',
  '3': '下野',
  '4': '鹿沼',
  '5': 'KODOMOTO',
  '6': '在宅支援',
  '7': 'KO相談',
  '8': 'つくば'
} as const;

export type ValueOf<T> = T[keyof T];
type Num2GroupValue<U extends number> = `${U}` extends [keyof typeof groupTable] ? ValueOf<typeof groupTable>[U] : never;
type UnionValue = typeof groupTable[keyof typeof groupTable]

export function getValuesOf<T extends string>(values: { [K in T]: ValueOf<T> }): T[] {
  return Object.values(values)
}
const ov = Object.values(groupTable)
