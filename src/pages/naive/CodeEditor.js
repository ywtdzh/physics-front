import CodeMirror from 'react-codemirror';
import React, {Component} from 'react';

class CodeEditor extends Component{
    render(){
        let options = {
            lineNumbers: true,
        };
        return <CodeMirror value={"在此处输入代码"} onChange={()=>""} options={options} />
    }
}
