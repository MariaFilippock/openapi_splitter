import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OpenAPIObject} from 'openapi3-ts/oas30';

interface AppState {
    parsedValue: OpenAPIObject | null;
    fileInfo: any | null;
    chosenFilePath: string;
    fileList: any[];
    treeSearchValue: string;
    expandedKeys: React.Key[];
    autoExpandParent: boolean;
}

const initialState: AppState = {
    parsedValue: null,
    fileInfo: null,
    chosenFilePath: '',
    fileList: [],
    treeSearchValue: '',
    expandedKeys: [],
    autoExpandParent: true,
};


const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setParsedValue(state, action: PayloadAction<OpenAPIObject | null>) {
            state.parsedValue = action.payload;
        },
        setFileInfo(state, action: PayloadAction<any | null>) {
            state.fileInfo = action.payload;
        },
        setChosenFilePath(state, action: PayloadAction<string>) {
            state.chosenFilePath = action.payload;
        },
        setFileList(state, action: PayloadAction<any[]>) {
            state.fileList = action.payload;
        },
        setTreeSearchValue(state, action: PayloadAction<string>) {
            state.treeSearchValue = action.payload;
        },
        setExpandedKeys(state, action: PayloadAction<React.Key[]>) {
            state.expandedKeys = action.payload;
        },
        setAutoExpandParent(state, action: PayloadAction<boolean>) {
            state.autoExpandParent = action.payload;
        },
        resetState(state) {
            state.parsedValue = null;
            state.fileInfo = null;
            state.chosenFilePath = '';
            state.fileList = [];
            state.treeSearchValue = '';
            state.expandedKeys = [];
            state.autoExpandParent = true;
        },
    }
});

export const {
    setParsedValue,
    setFileInfo,
    setChosenFilePath,
    resetState,
    setFileList,
    setTreeSearchValue,
    setExpandedKeys,
    setAutoExpandParent
} = AppSlice.actions;

export default AppSlice.reducer;
