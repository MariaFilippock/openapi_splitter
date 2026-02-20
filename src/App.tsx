import React, {useState} from 'react';
import './App.css';
import YamlUploader from './components/YamlUploader/YamlUploader';
import {Button, Layout, message} from 'antd';
import FileTreeSider from './components/FileTreeSider/FileTreeSider';
import CodeViewer from './components/CodeViewer/CodeViewer';
import {OpenAPIObject} from "openapi3-ts/oas30";
import {exportOpenApiAsZip} from "./Utils/ZipExportUtil";

const {Header, Sider, Content} = Layout;

const App = () => {
    const [parsedValue, setParsedValue] = useState<any>(null);
    const [fileInfo, setFileInfo] = useState<any>(null);
    const [chosenFilePath, setChosenFilePath] = useState<string>('');

    const handleDownloadZip = async () => {
        if (!parsedValue) {
            message.warning("Сначала загрузите openapi.yaml или скопируйте содержимое в текстовое поле");
            return;
        }

        try {
            await exportOpenApiAsZip(parsedValue as OpenAPIObject);
            message.success("ZIP успешно сформирован");
        } catch (e: any) {
            message.error(`Ошибка при формировании ZIP: ${e.message}`);
        }
    };

    return (
        <div className="App">
            <Layout style={{height: "100vh"}}>
                <Header style={{backgroundColor: 'white', height: 'auto', border: '1px solid lightgrey', padding: 20}}>
                    <YamlUploader onParsed={setParsedValue}/>
                    <div style={{marginTop: 10}}>
                        <Button type="primary" onClick={handleDownloadZip}>
                            Скачать ZIP
                        </Button>
                    </div>
                </Header>

                <Layout>
                    <Sider width={300} style={{backgroundColor: 'white'}}>
                        {parsedValue &&
                        <FileTreeSider
                            parsedValue={parsedValue}
                            onFileLoad={setFileInfo}
                            setChosenFilePath={setChosenFilePath}/>
                        }
                    </Sider>

                    <Content style={{backgroundColor: 'white'}}>
                        <CodeViewer
                            fileInfo={fileInfo}
                            chosenFilePath={chosenFilePath}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
