/*
    分类涨幅榜品种信息
*/

import React,{Component} from 'react';


import {Link} from 'react-router';
export default class ConceptSingle extends Component{
	render(){
        
        if(this.props.data){
            const cid = this.props.data.conceptId;
            return(
                
                <Link to={`/optional/concept/${cid}`} className="col text-center">
                    <h3><span className="tag">{this.props.data.icoType}</span>{this.props.data.conceptName}</h3>
                    <h5 className="text zb">{this.props.data.sales}万</h5>
                    <div className="row footer-row">
                        <span className="col balanced">{this.props.data.changeCost}</span>
                        <span className="col assertive">{this.props.data.change}%</span>
                    </div>
                </Link>
            )
        }else{
            return(
                <div>null</div>
            )
        }
		
	}
}