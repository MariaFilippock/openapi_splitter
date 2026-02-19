import React, {useState} from 'react';
import YAML from 'yaml';
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload, UploadProps} from 'antd';

const {Dragger} = Upload;

type ParsedData = any;

/**
 * Компонент с загрузкой Yaml файла и его парсингом
 * */
const YamlUploader: React.FC = () => {
    const [parsedValue, setParsedValue] = useState<ParsedData | null>(null);
    console.log(parsedValue);

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: '.yaml,.yml',
        beforeUpload(file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const parsedValue = YAML.parse(event.target?.result as string);
                    setParsedValue(parsedValue);
                    // dispatch(parseOpenApi(parsed));
                    message.success(`${file.name} успешно распарсен`);
                } catch (err: any) {
                    message.error("Ошибка парсинга YAML: " + err.message);
                }
            };

            reader.readAsText(file);
            return false;
        },

        onDrop(e) {
            console.log("Загруженный файл", e.dataTransfer.files);
        },
    };

    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Для загрузки перетащите YAML файл в эту область.</p>
            </Dragger>
        </div>

    );
};

export default YamlUploader;