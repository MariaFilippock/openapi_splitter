import React from 'react';
import './App.scss';
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
        <div>
            <Layout  className="LayoutWrapper">
                <Header className="HeaderWrapper">
                    <YamlUploader/>
                </Header>

                <Layout>
                    <Sider width={400} className="SiderWrapper">
                        {parsedValue && <FileTreeSider/>}
                    </Sider>

                    <Content className="ContentWrapper">
                        <CodeViewer/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
