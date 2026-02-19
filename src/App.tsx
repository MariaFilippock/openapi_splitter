import React, {useState} from 'react';
import './App.css';
import YamlUploader from './components/YamlUploader/YamlUploader';
import {Layout} from 'antd';
import FileTreeSider from './components/FileTreeSider/FileTreeSider';
import CodeViewer from './components/CodeViewer/CodeViewer';

const {Header, Sider, Content} = Layout;

const App = () => {
    const [parsedValue, setParsedValue] = useState<any>(null);
    const [fileInfo, setFileInfo] = useState<any>(null);
    const [chosenFilePath, setChosenFilePath] = useState<string>('');

    return (
        <div className="App">
            <Layout style={{height: "100vh"}}>
                <Header style={{backgroundColor: 'lightyellow', height: 'auto'}}>
                    <YamlUploader onParsed={setParsedValue}/>
                </Header>

                <Layout>
                    <Sider width={300} style={{backgroundColor: 'white'}}>
                        <FileTreeSider
                            parsedValue={parsedValue}
                            onFileLoad={setFileInfo}
                            setChosenFilePath={setChosenFilePath}/>
                    </Sider>

                    <Content style={{backgroundColor: 'lightblue'}}>
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
