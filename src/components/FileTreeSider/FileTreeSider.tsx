import React, {useEffect, useMemo, useState} from 'react';
import {Input, Switch, Tree} from 'antd';
import {buildOpenApiTree} from '../../Utils/TreeFileUtil';
import {getFileInfoByKey} from '../../Utils/OpenApiFileUtil';
import {filterTree, getAllKeys} from '../../Utils/SearchFileUtil';
import {AppDispatch, RootState} from '../../Store/store';
import {useDispatch, useSelector} from 'react-redux';
import {setAutoExpandParent, setExpandedKeys, setTreeSearchValue, setFileInfo, setChosenFilePath} from '../../Store/AppSlice';
import styles from './FileTreeSider.module.scss';


const FileTreeSider: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const parsedValue = useSelector((state: RootState) => state.openApi.parsedValue);
    const expandedKeys = useSelector((state: RootState) => state.openApi.expandedKeys);
    const autoExpandParent = useSelector((state: RootState) => state.openApi.autoExpandParent);
    const searchValue = useSelector((state: RootState) => state.openApi.treeSearchValue);

    const [showLine, setShowLine] = useState<boolean>(true);

    //древовидная структура openapi для отрисовки treeData
    const openApiTreeData = useMemo(() => parsedValue ? buildOpenApiTree(parsedValue) : [], [parsedValue]);

    //все ключи для раскрытия полученного дерева при загрузке
    const allKeys = useMemo(() => getAllKeys(openApiTreeData), [openApiTreeData]);

    //при загрузке раскрываем всё
    useEffect(() => {
        if (parsedValue) {
            dispatch(setExpandedKeys(allKeys));
        }
    }, [parsedValue, allKeys, dispatch]);

    //отфильтрованное дерево по поисковому запросу
    const filteredTreeData = useMemo(() => filterTree(openApiTreeData, searchValue), [openApiTreeData, searchValue]);

    /**
     * Обработчик поиска элемента в древовидной структуре загруженного списка openapi.
     */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setTreeSearchValue(value));

        if (!value.trim()) {
            // раскрываем всё дерево, если поиск пустой
            dispatch(setExpandedKeys(allKeys));
            dispatch(setTreeSearchValue(""));
            return;
        }

        const keysToExpand = getAllKeys(filterTree(openApiTreeData, value));

        dispatch(setExpandedKeys([...new Set(keysToExpand)]));
        dispatch(setAutoExpandParent(true));
    };

    /**
     * Обработчик клика по файлу для получения данных файла, которые отображаются в CodeViewer
     */
    const onSelect = (selectedKeys: React.Key[]) => {
        const key = selectedKeys[0] as string;

        if (!selectedKeys.length || !key.includes('.yaml')) {
            return;
        }

        const value = getFileInfoByKey(parsedValue!, key);

        dispatch(setChosenFilePath(key));
        dispatch(setFileInfo(value));
    };

    return (
        <div className={styles.siderContainer}>
            <Input.Search
                placeholder="Поиск файла..."
                onChange={handleSearch}
                value={searchValue}
                className={styles.inputSearch}
            />

            <div className={styles.showLineContainer}>
                showLine: <Switch checked={showLine} onChange={setShowLine}/>
            </div>
            <Tree
                showLine={showLine && {showLeafIcon: true}}
                onSelect={onSelect}
                treeData={filteredTreeData}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onExpand={(keys) => {
                    dispatch(setExpandedKeys(keys));
                    dispatch(setAutoExpandParent(false));
                }}
            />
        </div>
    );
};

export default FileTreeSider;