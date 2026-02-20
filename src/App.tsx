import React from 'react';
import './App.css';
import YamlUploader from './components/YamlUploader/YamlUploader';
import {Layout} from 'antd';
import FileTreeSider from './components/FileTreeSider/FileTreeSider';
import CodeViewer from './components/CodeViewer/CodeViewer';
import {RootState} from './Store/store';
import {useSelector} from 'react-redux';

const {Header, Sider, Content} = Layout;

const App = () => {
    const parsedValue = useSelector((state: RootState) => state.openApi.parsedValue);

    return (
        <div className="App">
            <Layout style={{height: "100vh"}}>
                <Header style={{backgroundColor: 'white', height: 'auto', border: '1px solid lightgrey', padding: 20}}>
                    <YamlUploader/>
                </Header>

                <Layout>
                    <Sider width={300} style={{backgroundColor: 'white'}}>
                        {parsedValue && <FileTreeSider/>}
                    </Sider>

                    <Content style={{backgroundColor: 'white'}}>
                        <CodeViewer/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
