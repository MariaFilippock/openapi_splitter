import {DataNode} from "antd/es/tree";
import {OpenAPIObject} from "openapi3-ts/oas30";
import JSZip from "jszip";
import {saveAs} from "file-saver";
import YAML from "yaml";
import {buildOpenApiTree} from "./TreeFileUtil";
import {getFileInfoByKey} from './OpenApiFileUtil';

const addNodesToZip = (nodes: DataNode[], doc: OpenAPIObject, zip: JSZip) => {
    for (const node of nodes) {
        const key = String(node.key);

        if (key.endsWith(".yaml")) {
            const fileInfo = getFileInfoByKey(doc, key);
            const content = YAML.stringify(fileInfo, {indent: 2});
            zip.file(key, content);
        }

        if (node.children && node.children.length > 0) {
            addNodesToZip(node.children as DataNode[], doc, zip);
        }
    }
};

/**
 * Собирает zip с такой же структурой, как в дереве слева, и скачивает его.
 */
export const exportOpenApiAsZip = async (doc: OpenAPIObject, zipName = "openapi-structure.zip") => {
    const tree = buildOpenApiTree(doc);
    const zip = new JSZip();

    addNodesToZip(tree, doc, zip);

    const blob = await zip.generateAsync({type: "blob"});
    saveAs(blob, zipName);
};
