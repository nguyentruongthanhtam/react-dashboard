import React from 'react';
import keys from '../Appkey'
const apiURL = 'https://newsapi.org/v2/'
export default class News extends React.Component{
  state = {
    news : null,
    error: 'Select Source of NEWS'
  }
  componentDidMount(){
    // var url = apiURL + 'top-headlines?' +
    //       'sources=bbc-news&' +
    //       'apiKey=' + keys.news;
    // var req = new Request(url);
    // fetch(req)
    //     .then(res => res.json())
    //     .then(data=>{
    //       console.log(data.articles)
    //       this.setState({news: data.articles})
    //     })
    // .catch(
    //   (error) => {
    //     console.log('error',error)
    //   })
  }
  setSource = (source) => {
    let url = apiURL + source + 'apiKey=' + keys.news
    var req = new Request(url);
    console.log(url)
    fetch(req)
        .then(res => res.json())
        .then(data=>{
          let result;
          if(data.status === "ok")
          {
            result = data.article
            this.setState({news: result})
          }
          else if(data.status === "error")
          {
            result = data.message
            console.log('error: ' + result)
            this.setState({error: result})
          }
        })
    .catch(
      (error) => {
        console.log('News fetch error',error)
      })
  }
  newsSources(){
    return (
      <ul className="News_Sources">
        <li onClick={e => this.setSource('top-headlines?sources=bbc-news&')}>BBC</li>
        <li onClick={e => this.setSource('top-headlines?category=technology&')}>Tech</li>
        <li onClick={e => this.setSource('top-headlines?country=us&')}>Finland</li>
      </ul>
    )
  }
  article(article){
    return(
     <div key={article.publisedhAt} className="article">
        <div>
          <a href={article.url}><img src={article.urlToImage} alt={article.content} style={{height: '100%',width: '100%'}}></img></a>
        </div>
        <div>
          <h4>{article.title}</h4>
          {/* <p>{article.content}</p> */}
          <p>{article.description}</p>
          <span>{article.source.name}</span>
          <span></span>
        </div>
     </div> 
    )
  }
  render(){
    return (
      <div className="News">
        {this.newsSources()}
        {this.state.news?this.state.news.map(a=>this.article(a)) : <span>{this.state.error}</span>}
      </div>
    )
  }
}