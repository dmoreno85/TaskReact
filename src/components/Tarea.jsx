import React from 'react';
import './Tarea.css';
import { GithubPicker } from 'react-color'

class Tarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: 'green',
        };
    }
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    handleClose = () => {     
        this.setState({ displayColorPicker: false })
    };
    handleChange = (color) => {
        this.props.onColorChange(color.hex,this.props.data.id)
      };
   
    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <div className={`Tarea ${this.props.data.completed ? 'completed' : ''}`}
                style={{ borderColor:this.props.data.color }}>
                <span className='text'> {this.props.data.text}</span>
                <div className='actions'>
                    <button onClick={() => this.props.onDeleted(this.props.data.id)} >Delete</button>
                    <button onClick={() => this.props.onCompleted(this.props.data)}>Complete</button>
                    <button onClick={this.handleClick}>Label</button>
                    {this.state.displayColorPicker ? <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <GithubPicker onChange={this.handleChange} />
                    </div> : null}

                </div>
            </div>
        );
    }
}

export default Tarea;