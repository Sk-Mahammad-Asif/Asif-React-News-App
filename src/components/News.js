import React, {  useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const  News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)


  const updateNews = async()=>{

    console.log("CDM");
    //for set top loadbar progress App.js
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=99172bba83054ef2a90280894fb3aeae&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    //this.setState({loading: true});
    setLoading(true);
    props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.articles);
    setLoading(parsedData.totalResults);
    setLoading(false);
  //for set top loadbar progress App.js
    props.setProgress(100);
  }

  useEffect(()=> {
    updateNews();
  }, [])

 /* const handlePrevClick = async()=>{
    setPage(page-1);
    updateNews();
  }

  const handleNextClick = async()=>{
    setPage(page+1);
    updateNews();
  }*/

 /* handlePrevClick = async()=>{
   console.log("Previous");

  //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${this.state.apikey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //  let data = await fetch(url);
  //  this.setState({loading: true});
  //  let parsedData = await data.json();
  //  console.log(parsedData);
  //  //this.setState({articles: parsedData.articles});

  //  this.setState({
  //   page : this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading:false
  //  })
  this.setState({
    page : this.state.page - 1
  })
  this.updateNews();


  }*/


 /* handleNextClick = async()=>{
   console.log("Next");

  //  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
  //  {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${this.state.apikey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   this.setState({loading: true});
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   //this.setState({articles: parsedData.articles});
 
  //   this.setState({
  //    page : this.state.page + 1,
  //    articles: parsedData.articles,
  //    loading: false
  //   })
  //  }

  this.setState({
    page : this.state.page + 1
  })
  this.updateNews();

  }*/


 const fetchMoreData = async() => {
     //this.setState({page: this.state.page + 1});

     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=99172bba83054ef2a90280894fb3aeae&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page+1);
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     setArticles(articles.concat (parsedData.articles));
     setTotalResults(parsedData.totalResults);
  };


    return (
      <>
        <h2 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey - Top Headline</h2>
        {loading && <Spinner/>}
       {/* {this.state.loading && <Spinner/>} 
        <div className="row my-3" >
        {!this.state.loading && this.state.articles.map((element)=> {
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0,40) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
         </div>
        })}
        </div>
      */} 

        {/*Infinite Scroll link1 for package install- https://www.npmjs.com/package/react-infinite-scroll-component  link2 for code- https://codesandbox.io/s/yk7637p62z*/}

        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
          <div className="container">
          <div className="row my-3" >
          {articles.map((element)=> {
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0,40) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
          </div>

          </div>
        </InfiniteScroll>

        {/*
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        */}

        
      </>
    )
  
}


 News.defaultProps ={
  country: 'in',
  pageSize: 5,
  category: 'general',
}

News.propTypes = {
country: PropTypes.string,
pageSize: PropTypes.number,
category: PropTypes.string,
}

export default News
