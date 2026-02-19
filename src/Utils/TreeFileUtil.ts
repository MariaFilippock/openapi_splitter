import {DataNode} from "antd/es/tree";
import {OpenAPIObject} from 'openapi3-ts/oas30';


/**
 * Преобразование каждого path в древовидную структуру
 */
const addPathNode = (root: DataNode[], params: string[], parentPath = "paths") => {
    if (params.length === 0) return;

    const [current, ...rest] = params;
    const currentPath = `${parentPath}/${current}`;

    const isLeaf = rest.length === 0;

    // Ищем существующий узел по key
    let node = root.find((n) => n.key === currentPath || n.key === `${currentPath}.yaml`);

    if (!node) {
        node = {
            key: isLeaf ? `${currentPath}.yaml` : currentPath,
            title: isLeaf ? `${current}.yaml` : current,
            isLeaf: isLeaf,
            selectable: isLeaf,
            className: isLeaf ? "" : "tree-folder",
            children: isLeaf ? undefined : [],
        };

        root.push(node);
    }

    if (!isLeaf) {
        if (!node.children) node.children = [];
        addPathNode(node.children, rest, currentPath);
    }
}

/**
 * Проходимся по всем ключам в paths и разбиваем на массивы для построения структуры дерева из параметров
 */
const buildPathNodes = (paths: Record<string, any>): DataNode[] => {
    const rootNodes: DataNode[] = [];

    for (const path of Object.keys(paths)) {
        //каждый урл преобразуем в массив, где элементы - это параметры урла
        const params = path.replace(/^\/|\/$/g, "").split("/");

        addPathNode(rootNodes, params);
    }

    return rootNodes;
}

/**
 * Утилита для преобразования структуры загруженных данных OpenAPI-спецификации в древовидную структуру
 */
export const buildOpenApiTree = (doc: OpenAPIObject): DataNode[] => {
    const tree: DataNode[] = [];

    //1 уровень
    tree.push({
        key: "openapi.yaml",
        title: "openapi.yaml",
        selectable: true,
        isLeaf: true,
    });

    //уровень path
    if (doc.paths && Object.keys(doc).length > 0) {
        tree.push({
            key: 'paths',
            title: 'paths',
            selectable: false,
            className: "tree-folder",
            children: buildPathNodes(doc.paths),
        })
    }

    //уровень components
    if (doc.components) {
        const componentsChildren: DataNode[] = [];

        for (const [compKey, compValue] of Object.entries(doc.components)) {
            componentsChildren.push({
                key: `components/${compKey}`,
                title: compKey,
                selectable: false,
                className: "tree-folder",
                children: Object.keys(compValue || {}).map((name) => ({
                    key: `components/${compKey}/${name}.yaml`,
                    title: `${name}.yaml`,
                    selectable: true,
                    isLeaf: true,
                })),
            });
        }

        if (componentsChildren.length > 0) {
            tree.push({
                key: "components",
                title: "components",
                selectable: false,
                className: "tree-folder",
                children: componentsChildren,
            });
        }
    }

    return tree;
}
