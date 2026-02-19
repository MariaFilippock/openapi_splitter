import React, {useState} from 'react';
import './App.css';
import YamlUploader from './components/YamlUploader/YamlUploader';
import {Layout} from 'antd';
import FileTreeSider from './components/FileTreeSider/FileTreeSider';

const {Header, Sider, Content} = Layout;

const App = () => {
    const [parsedValue, setParsedValue] = useState<any>(null);
    console.log(parsedValue);

    /**
     * Валидация полученных данных из загруженного yaml-файла
     */

    return (
        <div className="App">
            <Layout style={{height: "100vh"}}>
                <Header style={{backgroundColor: 'lightyellow', height: 'auto'}}>
                    <YamlUploader onParsed={setParsedValue}/>
                </Header>

                <Layout>
                    <Sider width={300} style={{backgroundColor: 'white'}}>
                        <FileTreeSider parsedValue={parsedValue} />
                    </Sider>
                    <Content style={{backgroundColor: 'lightblue'}}>Content</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
