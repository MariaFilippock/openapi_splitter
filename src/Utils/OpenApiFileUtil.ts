import {OpenAPIObject} from "openapi3-ts/oas30";

/**
 * Возвращает объект, который должен быть содержимым yaml-файла по ключу дерева для отображение в CodeViewer.
 */
export const getFileInfoByKey = (doc: OpenAPIObject, key: string) => {
    const cleanKey = key.replace(".yaml", "");
    const params = cleanKey.split("/");
    const rootKey = params[0] as keyof OpenAPIObject;
    const rootObject = doc[rootKey];

    if (!rootObject) return undefined;

    if (rootKey === "openapi") {
        const {paths, components, ...rest} = doc;
        return rest;
    }

    if (rootKey === "paths") {
        const pathUrl = "/" + params.slice(1).join("/");
        return doc.paths?.[pathUrl];
    }

    if (rootKey === "components") {
        return params
            .slice(1)
            .reduce((acc, segment) => (acc as any)?.[segment], doc.components as any);
    }

    return rootObject;
};
