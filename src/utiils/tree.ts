// 根据parentId字段将数组转换为树形结构
type TreeNode<T> = T & { children?: TreeNode<T>[] };

export function buildTree<
  T extends { id: string | number; parentId: string | number | null },
>(
  items: T[],
  idField: keyof T = 'id',
  parentIdField: keyof T = 'parentId',
): TreeNode<T>[] {
  const itemMap: { [key: string]: TreeNode<T> } = {};
  const tree: TreeNode<T>[] = [];

  // 初始化每个对象并创建一个映射
  items.forEach((item) => {
    itemMap[item[idField] as any] = { ...item, children: [] };
  });

  // 构建树结构
  items.forEach((item) => {
    const currentItem = itemMap[item[idField] as any];
    if (item[parentIdField] === null) {
      tree.push(currentItem);
    } else {
      const parentItem = itemMap[item[parentIdField] as any];
      if (parentItem) {
        parentItem.children!.push(currentItem);
      }
    }
  });

  return tree;
}
