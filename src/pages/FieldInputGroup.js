import React, {Component} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class FieldInputGroup extends Component {
    render() {
        return (
            <FormGroup
                controlId={this.props.name}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    name={this.props.name}
                    readOnly={this.props.readOnly}
                    value={this.props.value}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    componentClass={this.props.componentClass}
                >{this.props.children}</FormControl>
            </FormGroup>
        );
    }
}

export default FieldInputGroup