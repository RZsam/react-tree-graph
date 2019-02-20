import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	keyProp: PropTypes.string.isRequired,
	labelProp: PropTypes.string.isRequired,
	offset: PropTypes.number.isRequired,
	radius: PropTypes.number.isRequired,
	circleProps: PropTypes.object.isRequired,
	gProps: PropTypes.object.isRequired,
	textProps: PropTypes.object.isRequired
};

export default class Node extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
	}

	handleClick(event) {
		this.props.gProps.onClick && this.props.gProps.onClick(this.props[this.props.keyProp], event);
	}

	handleRightClick(event) {
		this.props.gProps.onContextMenu && this.props.gProps.onContextMenu(this.props[this.props.keyProp], event);
	}

	getTransform() {
		return 'translate(' + this.props.y + ', ' + this.props.x + ')';
	}

	render() {
		return (
			<g {...this.props.gProps} transform={this.getTransform()} onContextMenu={this.handleRightClick} onClick={this.handleClick}>
				<circle {...this.props.circleProps} r={this.props.radius} style={{fill: this.props.color ? this.props.color : '#35B995'}}/>
				<text {...this.props.textProps} dx={this.props.radius - 13.5} dy={this.props.offset - 13}>
					{this.props[this.props.labelProp]}
					{

						this.props.status &&
						(this.props.status == 'TO_DO' ? String.fromCharCode(0x2610) :
							(this.props.status == 'DOING' ? String.fromCharCode(0x2692)  : String.fromCharCode(0x2714)))
					}
				</text>
			</g>);
	}
}

Node.propTypes = propTypes;
