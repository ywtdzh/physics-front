import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Checkbox} from "react-bootstrap";
import Request from '../../public/Request';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';

class CodeEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoCompleteKey: {},
        };
    }

    handleCheckboxChanged = (e) => {
        const autoCompleteKeys = this.state.autoCompleteKey;
        autoCompleteKeys[e.target.name] = e.target.checked;
        this.setState({
            autoCompleteKey: autoCompleteKeys,
        });
    };

    submit = (e) => {
        e.preventDefault();
        Request.submitCode(this.props.value);
    };

    render() {
        let options = {
            autoFocus: true,
            autoCloseBrackets: true,
            extraKeys: {},
            lineNumbers: true,
            lineWrapping: true,
            lineWiseCopyCut: true,
            matchBrackets: true,
        };
        for (let key in this.state.autoCompleteKey) {
            if (this.state.autoCompleteKey.hasOwnProperty(key)) {
                options.extraKeys[key] = (this.state.autoCompleteKey[key] && "autocomplete") || null;
            }
        }
        return (<div><h2>请在此处输入代码</h2>
                <Checkbox onChange={this.handleCheckboxChanged} name="Tab" inline
                          style={{marginLeft: "10px"}}>使用Tab进行代码提示</Checkbox>
                <Checkbox onChange={this.handleCheckboxChanged} name="Ctrl" inline>使用Ctrl进行代码提示</Checkbox>
                <Checkbox onChange={this.handleCheckboxChanged} name="Alt" inline>使用Alt进行代码提示</Checkbox>
                <hr/>
                <CodeMirror
                    value={this.props.value}
                    autoFocus={true}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={this.props.onChange}
                />
                <Button className="btn-success pull-right" onClick={this.submit}>提交代码</Button>
            </div>
        );
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let user = state.userInfo;
    return {
        isLoggedIn: user && user.id,
        id: user ? user.id : null,
        userType: user ? user.type : null,
    };
}

export default connect(storeStateToComponentProp)(CodeEditor);
