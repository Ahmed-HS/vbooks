export interface NewBook {
  title: string;
  description: string;
  author: string;
  publicationDate: Date;
  publishedBy: string;
  rating: number;
  pageCount: number;
  category: string;
  imgUrl: string;
}

export interface Book extends NewBook {
  id: number;
}

export function mapFromDTO(obj: Object): Object {
  if (
    !obj ||
    typeof obj !== 'object' ||
    obj instanceof Date ||
    Array.isArray(obj)
  ) {
    return obj;
  }

  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelKey] = value;
  });

  return result;
}

export function mapToDTO(obj: Object): Object {
  if (
    !obj ||
    typeof obj !== 'object' ||
    obj instanceof Date ||
    Array.isArray(obj)
  ) {
    return obj;
  }

  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Convert camelCase to snake_case
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[snakeKey] = value;
  });

  return result;
}
