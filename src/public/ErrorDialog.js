import React from 'react';
import {Button, Modal} from "react-bootstrap";

function ErrorDialog(props) {
    const {show, onHide, message, title} = props;
    return (<Modal show={show} onHide={onHide}>
        <Modal.Header>
            <Modal.Title>{title || '网络错误'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message || '网络请求发生错误。若此对话框反复出现，请联系开发者。'}
        </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="warning" onClick={onHide}>关闭</Button>
        </Modal.Footer>
    </Modal>);
}

export default ErrorDialog;