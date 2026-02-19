import React, {useState} from 'react';
import {Select, Switch, Tree} from 'antd';
import {OpenAPIObject} from 'openapi3-ts/oas30';
import {buildOpenApiTree} from '../../Utils/TreeFileUtil';


interface IProps {
    parsedValue: OpenAPIObject;
}

const isOpenApiDocument = (doc: unknown): doc is OpenAPIObject => {
    return !!doc && typeof doc === "object" && "openapi" in doc && "info" in doc && "paths" in doc;
}

const FileTreeSider: React.FC<IProps> = ({parsedValue}) => {
    const [showLine, setShowLine] = useState<boolean>(true);

    if (!isOpenApiDocument(parsedValue)) {
        return <div style={{color: "red"}}>Файл не является корректной OpenAPI спецификацией</div>;
    }

    const openApiTreeData = buildOpenApiTree(parsedValue);

    // const onSelect = (selectedKeys: React.Key[], info: any) => {
    //     console.log('selected', selectedKeys, info);
    // };

    return (
        <div style={{padding: 15}}>
            <div style={{marginBottom: 16}}>
                showLine: <Switch checked={showLine} onChange={setShowLine}/>
            </div>
            <Tree
                defaultExpandAll
                showLine={showLine && {showLeafIcon: true}}
                // onSelect={onSelect}
                treeData={openApiTreeData}
            />
        </div>
    );
};

export default FileTreeSider;