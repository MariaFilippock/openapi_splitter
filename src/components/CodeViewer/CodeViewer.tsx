import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import YAML from "yaml";
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';


const CodeViewer: React.FC = () => {
    const fileInfo = useSelector((state: RootState) => state.openApi.fileInfo);
    const chosenFilePath = useSelector((state: RootState) => state.openApi.chosenFilePath);

    return (
        <div>
            <h3>{chosenFilePath}</h3>
            {fileInfo && (
                <SyntaxHighlighter language="yaml" style={materialLight}>
                    {YAML.stringify(fileInfo, {indent: 2})}
                </SyntaxHighlighter>
            )}
        </div>
    );
};

export default CodeViewer;