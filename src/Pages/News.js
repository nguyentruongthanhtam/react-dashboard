import React from 'react';
import keys from '../Appkey'
const apiURL = 'https://newsapi.org/v2/'
const sourcesURL = [
  { name: 'Technology',url: 'top-headlines?category=technology&country=us&'},
  { name: 'BBC', url: 'top-headlines?sources=bbc-news&'},
  { name: 'US',url: 'top-headlines?country=us&'},
  { name: 'SPORT',url: 'top-headlines?category=sport&country=gb&'},
]

export default class News extends React.Component{
  state = {
    news : null,
    error: 'Select Source of NEWS',
    activeTab: '0'
  }
  componentDidMount(){
    this.initial()
  }
  initial = () => {
    this.setSource(sourcesURL[0].url,this.state.activeTab)
  }
  setSource = (source,index) => {
    let url = apiURL + source + 'apiKey=' + keys.news
    var req = new Request(url);
    console.log(url)
    fetch(req)
        .then(res => res.json())
        .then(data=>{
          let result;
          if(data.status === "ok")
          {
            result = data.articles
            this.setState({news: result,activeTab: index})
          }
          else if(data.status === "error")
          {
            result = data.message
            console.log('error: ' + result)
            this.setState({error: result,activeTab: index})
          }
        })
    .catch(
      (error) => {
        console.log('News fetch error',error)
      })
  }
  newsSources(){
    return (
      <ul className="News-Sources">
      {
        sourcesURL.map((s,index) => <li key={index} className={(index==this.state.activeTab)?'isActive':''} onClick={e => this.setSource(s.url,index)}>{s.name}</li>)
      }
      </ul>
    )
  }
  article(article,index){
    return(
     <div key={index} className="article">
        <div>
          <a href={article.url}><img src={article.urlToImage?article.urlToImage : 'https://via.placeholder.com/350x150'} alt={article.content} height='250' ></img></a>
        </div>
        <div >
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span style={{fontStyle: 'italic'}}>{article.source.name}</span>
          <span></span>
        </div>
     </div> 
    )
  }
  render(){
    return (
      <div className="News Content-Wrapper">
        {this.newsSources()}
        <div className="Articles-Wrapper">
          {this.state.news?this.state.news.map((a,index)=>this.article(a,index)) : <span>{this.state.error}</span>}
        </div>
      </div>
    )
  }
}