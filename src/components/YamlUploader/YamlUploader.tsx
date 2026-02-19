import React from 'react';
import YAML from 'yaml';
import {InboxOutlined} from '@ant-design/icons';
import {Input, message, Upload, UploadProps} from 'antd';

const {Dragger} = Upload;
const {TextArea} = Input;

interface IProps {
    onParsed: (data: any) => void;
}

/**
 * Компонент с загрузкой Yaml файла и его парсингом
 * */
const YamlUploader: React.FC<IProps> = ({onParsed}) => {
    const parseYaml = (text: string) => {
        if (!text) {
            message.error("Файл пуст");
            return;
        }

        try {
            const parsedValue = YAML.parse(text);
            onParsed(parsedValue);
            message.success('YAML успешно распарсен');
        } catch (err: any) {
            message.error("Ошибка парсинга YAML: " + err.message);
        }
    }


    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: '.yaml,.yml',
        beforeUpload(file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target?.result as string;

                if (!result.trim()) {
                    message.error("Файл пуст");
                    return;
                }

                parseYaml(result);
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
            <TextArea
                rows={4}
                placeholder="Вставьте openapi.yaml сюда..."
                onBlur={(e) => parseYaml(e.target.value)}
                style={{marginTop: 10}}
            />
        </div>
    );
};

export default YamlUploader;