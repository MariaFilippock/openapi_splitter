import React from 'react';
import './App.css';
import YamlUploader from './components/YamlUploader/YamlUploader';
import {Layout} from 'antd';

const {Header, Sider, Content} = Layout;

const App = () => {
    return (
        <div className="App">
            <Layout  style={{ height: "100vh" }}>
                <Header style={{backgroundColor: 'lightyellow', height: 'auto'}}>
                    <YamlUploader/>
                </Header>

                <Layout>
                    <Sider width={300} style={{backgroundColor: 'lightgray'}}>Sider</Sider>
                    <Content style={{backgroundColor: 'lightblue'}}>Content</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
