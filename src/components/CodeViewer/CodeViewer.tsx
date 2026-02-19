import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import YAML from "yaml";

interface IProps {
    fileInfo: any;
    chosenFilePath: string;
}

const CodeViewer: React.FC<IProps> = ({fileInfo, chosenFilePath}) => {

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