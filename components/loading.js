/*
    加载组件
*/
import React,{Component} from 'react';
export default class Loading extends Component {
    render(){
        return(
            <div style={{width:'100%',backgroundColor:'#fff',height:'100%',zIndex:99,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src="/images/yst.gif"/>
            </div>
        )
    }
}