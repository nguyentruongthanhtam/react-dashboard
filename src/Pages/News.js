import React from 'react';
import keys from '../Appkey';
import posed from 'react-pose';
// import electron instance to communicate with main thread
// const electron = window.require('electron');
// const {ipcRenderer} = electron.ipcRenderer;
const dummyRequest = 'https://jsonplaceholder.typicode.com/posts'
const Article = posed.div({
  hidden: {
    opacity: 0,
    x: '-10%'
  },
  visible: {
    opacity: 1,
    x: '0%',
    transition: ({ i }) => ({delay: i*80})

  },
  props: {i: 0}
});
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
    activeTab: '0',
    selectedNew: null,
    isLoaded: false
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
    this.setState({isLoaded: false,activeTab: index})
    // fetch(req)
    //     .then(res => res.json())
    //     .then(data=>{
    //       if(data.status === "ok")
    //       {
    //         this.setState({news: data.articles,isLoaded: true})
    //       }
    //       else if(data.status === "error")
    //       {
    //         this.setState({error: data.message})
    //       }
    //     })
    // .catch(
    //   (error) => {
    //     console.log('News fetch error',error)
    //   })
    // Dummy GET request for prototyping
    fetch(dummyRequest)
      .then(response => response.json())
      .then(json => {
        this.setState({news: json,isLoaded: true})
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
  // Send url to Electron to open new window
  // Only works in electron -> turn off in react browser for testing
  goToLink = (e,url) => {
    e.preventDefault();
    // ipcRenderer.send('open-url',url);
  }
  article(article,index){
    return(
     <Article key={index}
              i={index} 
              className="article"
              pose={this.state.isLoaded?'visible':'hidden'}
              initialPose= 'hidden'
              >
        <div>
          <a href='#' onClick={e=>this.goToLink(e,article.url)} style={{backgroundImage: "url(\'"+article.urlToImage+"\')"}}></a>
        </div>
        <div>
          <div style={{padding: '20px'}}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span style={{fontStyle: 'italic'}}>{article.source.name}</span>
            <span></span>
          </div>
        </div>
     </Article> 
    )
  }
  dummyArticle(article,index){
    const dummyImg = 'https://via.placeholder.com/350x150'
    return(
     <Article key={index}
              i={index} 
              className="article"
              pose={this.state.isLoaded?'visible':'hidden'}
              initialPose= 'hidden'
              >
        <div>
          <a href='#' onClick={e=>this.goToLink(e,article.url)} style={{backgroundImage: "url(\'"+dummyImg+"\')"}}></a>
        </div>
        <div>
          <div style={{padding: '20px'}}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <span></span>
          </div>
        </div>
     </Article> 
    )
  }
  
  render(){
    return (
      <div className="News Content-Wrapper">
        {this.newsSources()}
        <div className="Articles-Wrapper">
          {/* {this.state.news ? this.state.news.map((a,index)=>this.article(a,index)) : <span>{this.state.error}</span>} */}
          {this.state.news ? this.state.news.map((a,index)=>this.dummyArticle(a,index)) : <span>{this.state.error}</span>}
        </div>
      </div>
    )
  }
}