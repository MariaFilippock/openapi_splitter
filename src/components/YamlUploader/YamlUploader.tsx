import React from 'react';
import YAML from 'yaml';
import {InboxOutlined} from '@ant-design/icons';
import {Button, Input, message, Upload, UploadProps} from 'antd';
import {exportOpenApiAsZip} from '../../Utils/ZipExportUtil';
import {OpenAPIObject} from 'openapi3-ts/oas30';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Store/store';
import {setFileList, setParsedValue} from '../../Store/AppSlice';

const {Dragger} = Upload;
const {TextArea} = Input;


/**
 * Компонент с загрузкой Yaml файла и его парсингом
 * */
const YamlUploader: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const parsedValue = useSelector((state: RootState) => state.openApi.parsedValue);
    const fileList = useSelector((state: RootState) => state.openApi.fileList);


    const parseYaml = (text: string) => {
        if (!text) {
            message.error("Файл пуст");
            return;
        }

        try {
            const parsedValue = YAML.parse(text);
            dispatch(setParsedValue(parsedValue));
            message.success('YAML успешно распарсен');
        } catch (err: any) {
            message.error("Ошибка парсинга YAML: " + err.message);
        }
    }


    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: '.yaml,.yml',
        fileList,
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
            dispatch(setFileList([file]));
            return false;
        },

        onRemove() {
            dispatch(setFileList([]));
        },
    };

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
        <>
            <div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Для загрузки перетащите YAML файл в эту область.</p>
                </Dragger>
                <TextArea
                    rows={4}
                    placeholder="Или вставьте openapi.yaml сюда..."
                    onBlur={(e) => parseYaml(e.target.value)}
                    style={{marginTop: 10}}
                />
            </div>

            <div style={{marginTop: 10}}>
                <Button type="primary" onClick={handleDownloadZip}>
                    Скачать ZIP
                </Button>
            </div>
        </>
    );
};

export default YamlUploader;