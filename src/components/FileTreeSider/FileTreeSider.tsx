import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Input, Switch, Tree} from 'antd';
import {OpenAPIObject} from 'openapi3-ts/oas30';
import {buildOpenApiTree} from '../../Utils/TreeFileUtil';
import {getFileInfoByKey} from '../../Utils/OpenApiFileUtil';
import {filterTree, getAllKeys} from '../../Utils/SearchFileUtil';


interface IProps {
    parsedValue: OpenAPIObject;
    onFileLoad: (data: any) => void;
    setChosenFilePath: (path: any) => void;
}

const FileTreeSider: React.FC<IProps> = ({parsedValue, onFileLoad, setChosenFilePath}) => {
    const [showLine, setShowLine] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState("");
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    //древовидная структура openapi для отрисовки treeData
    const openApiTreeData = useMemo(() => buildOpenApiTree(parsedValue), [parsedValue]);

    //все ключи для раскрытия полученного дерева при загрузке
    const allKeys = useMemo(() => getAllKeys(openApiTreeData), [openApiTreeData]);

    //при загрузке раскрываем всё
    useEffect(() => setExpandedKeys(allKeys), [allKeys]);

    //отфильтрованное дерево по поисковому запросу
    const filteredTreeData = useMemo(() => filterTree(openApiTreeData, searchValue), [openApiTreeData, searchValue]);

    /**
     * Обработчик поиска элемента в древовидной структуре загруженного списка openapi.
     */
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            if (!value.trim()) {
                // раскрываем всё дерево, если поиск пустой
                setExpandedKeys(allKeys);
                setSearchValue("");
                return;
            }

            const keysToExpand = getAllKeys(filterTree(openApiTreeData, value));

            setExpandedKeys([...new Set(keysToExpand)]);
            setSearchValue(value);
            setAutoExpandParent(true);
        },
        [openApiTreeData, allKeys]
    );

    /**
     * Обработчик клика по файлу для получения данных файла, которые отображаются в CodeViewer
     */
    const onSelect = (selectedKeys: React.Key[]) => {
        const key = selectedKeys[0] as string;

        if (!selectedKeys.length || !key.includes('.yaml')) {
            return;
        }

        const value = getFileInfoByKey(parsedValue, key);

        setChosenFilePath(key);
        onFileLoad(value);
    };

    return (
        <div style={{padding: 15}}>
            <Input.Search
                placeholder="Поиск файла..."
                onChange={handleSearch}
                style={{marginBottom: 12}}
                value={searchValue}
            />

            <div style={{marginBottom: 16}}>
                showLine: <Switch checked={showLine} onChange={setShowLine}/>
            </div>
            <Tree
                showLine={showLine && {showLeafIcon: true}}
                onSelect={onSelect}
                treeData={filteredTreeData}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onExpand={(keys) => {
                    setExpandedKeys(keys);
                    setAutoExpandParent(false);
                }}
            />
        </div>
    );
};

export default FileTreeSider;