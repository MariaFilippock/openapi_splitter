import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import YAML from "yaml";
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import styles from './CodeViewer.module.scss';
import {Card, Empty, Typography} from 'antd';
import {FileTextOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;

const CodeViewer: React.FC = () => {
    const fileInfo = useSelector((state: RootState) => state.openApi.fileInfo);
    const chosenFilePath = useSelector((state: RootState) => state.openApi.chosenFilePath);

    return (
        <div className={styles.codeViewerWrapper}>
            <Card className={styles.cardContainer} bodyStyle={{padding: 0}}>
                {fileInfo ? (
                    <>
                        <div className={styles.headerContainer}>
                            <FileTextOutlined className={styles.icon}/>
                            <Title level={5} className={styles.title}>
                                {chosenFilePath}
                            </Title>
                        </div>

                        <div className={styles.contentWrapper}>
                            <SyntaxHighlighter
                                language="yaml"
                                style={materialLight}
                                customStyle={{margin: 0}}
                            >
                                {YAML.stringify(fileInfo, {indent: 2})}
                            </SyntaxHighlighter>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyContainer}>
                        <Empty
                            description={
                                <Text type="secondary">
                                    Выберите файл в дереве слева для просмотра содержимого
                                </Text>
                            }
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CodeViewer;