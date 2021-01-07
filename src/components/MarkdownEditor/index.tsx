import React, {useEffect, useState} from "react";
import Editor, { IToolbar } from "for-editor";
import "./index.scss";

const Code = (props: any) => {
    const s = props.val;
    const [val, setVal] = useState(s);
    const toolbar: IToolbar = {};
    useEffect(() => {
        setVal(s);
    }, [s]);
    const style = {
        height: 'auto',
        marginBottom: '10px',
    };
    return (
        <Editor value={val} preview style={style} toolbar={toolbar} />
    );
};

export default Code;
