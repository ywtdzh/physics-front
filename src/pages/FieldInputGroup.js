import React, {Component} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class FieldInputGroup extends Component {
    render() {
        return (
            <FormGroup
                controlId={this.props.name}
                validationState={this.props.validationState || null}
            >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    name={this.props.name}
                    readOnly={this.props.readOnly || false}
                    value={this.props.value}
                    type={this.props.type || 'text'}
                    placeholder={this.props.placeholder || ''}
                    onChange={this.props.onChange}
                    componentClass={this.props.componentClass}
                >{this.props.children}</FormControl>
            </FormGroup>
        );
    }
}

export default FieldInputGroup