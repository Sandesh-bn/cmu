import React, { Component } from 'react';
import Header from '../components/header';
import Card from '../components/card';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import jsonData from '../assets/data/sample.json';

import { get, findIndex } from 'lodash';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: []
		};
	}
	componentDidMount() {
		this.setState({treeData: this.getTreeData()});
	}
	getTreeData() {

		let treeData = [];
		treeData = JSON.parse(JSON.stringify(jsonData.data));

		jsonData.data.map((o, idx) => {
			if (get(o, 'edge.parent', '') !== '') {
				let index = -1;
				index = findIndex(treeData, ['id', get(o, 'edge.parent', '')]);

				if (index >= 0) {
					
					if (get(treeData, `[${index}].childs`, []).length === 0) {
						treeData[index]['childs'] = [];
					}
					
					treeData[index] = {
						...treeData[index], 
						childs: [
							...treeData[index]['childs'],
							{
								...o,
								childs: [],
								showStep: 2,
								showChilds: false
							}
						],
						showStep: 1,
						showChilds: false	
					};
					treeData.splice(findIndex(treeData, ['id', o.id]), 1);
				}
			}
		});
		console.log('fff treeData: ', treeData);

		return treeData;
	}

	onCardClicked = (id, idx1 = -1, idx2 = -1) => {
		console.log('clicked id: ', idx1, idx2);

		let updatedTreeData = JSON.parse(JSON.stringify(this.state.treeData));

		for (let i = 0; i < updatedTreeData.length; i++) {
			updatedTreeData[i].showStep = 1;
			for (let j = 0; j < updatedTreeData[i].childs.length; j++) {
				updatedTreeData[i].childs[j].showStep = 2;
			}
		}

		if (idx2 !== -1) {
			updatedTreeData[idx1].childs[idx2].showStep = 3;
		} else {
			updatedTreeData[idx1].showStep = 3;
		}

		this.setState({treeData: updatedTreeData});
	}

	onToggleClicked = (idx) => {
		console.log('toggle clicked:', idx);

		let updatedTreeData = JSON.parse(JSON.stringify(this.state.treeData));
		updatedTreeData[idx].showChilds = !updatedTreeData[idx].showChilds;

		this.setState({treeData: updatedTreeData});
	}

	render() {
		const { treeData } = this.state;
		console.log('treeData: ', treeData);

		return (
			<React.Fragment>
				<Header/>
				<div className="container-fluid homeback">
					<div className="clearfix">
						<div className="col-md-12 col-xs-12 col-sm-12">
							{
								treeData.length > 0
								?
									treeData.map((card, index1) => {
										return (
											<div key={index1}>
												card.showStep {card.showStep}
												<Card 
													hasChild={card.childs.length > 0 ? true : false} 
													isChild={false} 
													showStep={card.showStep} 
													cardData={card}
													onCardClicked={() => this.onCardClicked(card.id, index1)}
													onToggleClicked={() => this.onToggleClicked(index1)}/>
												<div>
													{
														card.showChilds && card.childs.length > 0
														?
															card.childs.map((subcard, index2) => 
																<Card 
																	key={index1+index2}
																	hasChild={false} 
																	isChild={true} 
																	showStep={subcard.showStep} 
																	cardData={subcard}
																	onCardClicked={() => this.onCardClicked(subcard.id, index1, index2)}/>)
														: 
														null
													}
												</div>
											</div>
										)
									})
								:
									null
          		}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
// Home.propTypes = {};
// const mapStateToProps = createStructuredSelector({});
// function mapDispatchToProps(dispatch) {
// 	return {};
// }
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default compose(withConnect)(Home);