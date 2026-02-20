import {DataNode} from 'antd/es/tree';
import React from 'react';

/**
 * Формирует список ключей по переданным данным.
 */
export const getAllKeys = (data: DataNode[]): React.Key[] => {
    const keys: React.Key[] = [];

    const loop = (nodes: DataNode[]) => {
        nodes.forEach((node) => {
            keys.push(node.key);
            if (node.children) loop(node.children);
        });
    };

    loop(data);
    return keys;
};

/**
 * Фильтрация дерева по имени файла.
 * Оставляет файлы, у которых имя содержит поисковую строку
 * Удаляет папки, которые стали пустыми после фильтрации
 */
export const filterTree = (nodes: DataNode[], searchValue: string): DataNode[] => {
    if (!searchValue.trim()) {
        return nodes;
    }

    const lowerSearch = searchValue.toLowerCase();

    const filterNode = (node: DataNode): DataNode | null => {
        // проверяем имя
        if (node.isLeaf || !node.children) {
            const title = (node.title as string).toLowerCase();
            return title.includes(lowerSearch) ? node : null;
        }

        // Если это папкаБ то рекурсивно фильтруем детей
        const filteredChildren = node.children
            .map(filterNode)
            .filter((n): n is DataNode => n !== null);

        // Если папка пуста после фильтрации, то удаляем её
        if (filteredChildren.length === 0) {
            return null;
        }

        return {
            ...node,
            children: filteredChildren,
        };
    };

    return nodes
        .map(filterNode)
        .filter((n): n is DataNode => n !== null);
};