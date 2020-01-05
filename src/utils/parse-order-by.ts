interface OrderBy {
  field: string;
  direction: 'asc' | 'desc';
}

export default function parseOrderBy(field: string): OrderBy {
  return {
    field: field.replace(/_[A-Z]*$/, ''),
    direction: field.endsWith('_DESC') ? 'desc' : 'asc',
  };
}
