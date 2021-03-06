/*
   广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadBidList} from '../function/ajax';
import Provicen from '../provicen';
import Filter from '../filter';
import {Link} from 'react-router';
import Loading from '../loading';
class bidList extends Component{
    constructor(props){
        super(props);
        this.state= {
            loading: true,
            }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _fn(args){
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADDRUGDATA',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTER'
            });
            dispatch({
                type:'CHANGEDRUGFILTER',
                areaId:args.areaId,
                areaName:args.areaName,
                searchAreaType:args.searchType,
                yearMonth:args.yearMonth,
                hospitalLevel:args.hospitalLevel
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    _loadData(){
        loadBidList({
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:this.props.searchAreaType,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADBIFLISTDATA',
                    data: res.datas
                });
            }
        });
        this.props.dispatch((dispatch,getState)=>{
                    this.setState({
                        loading:false
                    });
        })
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.hospitalFilter.infinite){
            this._loadData();
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }
    componentWillUnMount(){
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }

    render(){
        return(
          <div className="root">
              <HeaderBar fn={this._loadData} {...this.props}/>
              <div ref="content" className="scroll-content has-header">
                  <Main data={this.props.bidList.data} loading={this.state.loading}/>
              </div>
          </div>
        )
    }
}
class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.loading) {
            return <Loading/>
        }else{
            return(
                <ul className="list">
                    {
                        this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
                    }
                </ul>
            )
        }
    }
}

class List extends Component{
    render(){
        return(
          <li className="item">
              <h2>{this.props.dataSources.productName}</h2>
              <div className="parameters">
                  <div className="parameters-left">
                      <p>剂型：{this.props.dataSources.prepName}</p>
                      <p>规格：{this.props.dataSources.spec}</p>
                      <p>生产企业：{this.props.dataSources.manufacturerName}</p>
                  </div>
                  <Link to={`/bidListContent/${this.props.dataSources.id}`} className="parameters-right btn"> 查看各省中标价</Link>
              </div>
              <div className="row market-price">
                  <div className="col-50"> 广东省最小制剂入市价</div>
                  <div className="col-50"> 0.5505（yyyy-mm-dd）</div>
              </div>
              <div className="parameters">
                  <div className="parameters-left">
                      <p>最低三省均值：{this.props.dataSources.minThreeMean}</p>
                      <p>最低五省均值：{this.props.dataSources.minFiveMean}</p>
                  </div>
                  <div className="parameters-right">
                      0.5408（浙江省2015-03-19）
                      {this.props.dataSources.zuidiwusheng.bidPrice}
                      {this.props.dataSources.zuidiwusheng.areaName}
                      {this.props.dataSources.zuidiwusheng.publishDate}
                  </div>
              </div>
          </li>
        )
    }
}

class HeaderBar extends Component{
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGEDRUGSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    _searchHandle(){
        this.props.dispatch({
            type:'LOADDRUGDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this.props.fn(),100);
    }
    componentUnMount(){
        this.props.dispatch({
            type:'CLEADRUGSEARCHNAME'
        })
    }
    render(){
        return(
          <div className="bar bar-header bar-positive item-input-inset">
              <label className="item-input-wrapper">
                  <i className="icon ion-ios-search placeholder-icon"></i>
                  <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
              </label>
              <button className="button button-clear" onClick={this._searchHandle.bind(this)}>
                  搜索
              </button>
          </div>
        )
    }
}

function select(state){
    return{
        showProvicen:state.index.showProvicen,
        areaId:state.provicen.areaId,
        areaName:state.provicen.areaName,
        provicenData:state.provicen.data,
        yearMonth:state.data.yearMonth,
        uri:state.router.uri,
        hospitalFilter:state.drug,
        searchAreaType:state.provicen.searchAreaType,
        bidList:state.bidList
    }
}

export default connect(select)(bidList);