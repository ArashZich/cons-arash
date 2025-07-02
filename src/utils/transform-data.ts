interface Item {
  ID: number;
  title: string;
  children: {
    ID: number;
    title: string;
  }[];
}

interface OriginalResponse {
  data: {
    items: Item[];
    // other properties if present in the response
  };
  // other properties if present in the response
}

interface ModifiedItem {
  value: number;
  label: string;
  children: {
    value: number;
    label: string;
  }[];
}

interface ModifiedItemNotChildren {
  value: number;
  label: string;
}

export function transformData(originalResponse: OriginalResponse): ModifiedItem[] {
  const modifiedItems: ModifiedItem[] = originalResponse.data.items.map((item) => ({
    value: item.ID,
    label: item.title,
    children: item.children.map((child) => ({
      value: child.ID,
      label: child.title,
    })),
  }));

  return modifiedItems;
}

export function transformDataParent(originalResponse: OriginalResponse): ModifiedItemNotChildren[] {
  const modifiedItems: ModifiedItemNotChildren[] = originalResponse.data.items.map((item) => ({
    value: item.ID,
    label: item.title,
  }));

  return modifiedItems;
}
