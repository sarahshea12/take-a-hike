import React, { Component } from "react";
import API from "../utils/API";
import SearchCity from "../components/SearchCity";
import Card from "../components/Card";
import WeatherCard from "../components/WeatherCard";


class Search extends Component {
    state = {
        lat: "",
        lon: "",
        results: [],
        weather: [],
        place: "",
        trailName: ""
    }

   handleInputChange = event => {
       this.setState({
        [event.target.name]:event.target.value
       });
   };



   handleFormSubmit = event => {
    event.preventDefault();
    API.getGeo(this.state.place)
     .then(res => {
         this.setState({lat: res.data.results[0].location.lat})
         this.setState({lon: res.data.results[0].location.lng})
         this.setState({place: res.data.results[0].address})
         console.log(res.data.results[0].address)
         console.log(this.state.lat)
         console.log(this.state.lon)
     }).then(() => {
         let data={}
     API.getLocation(this.state.lat, this.state.lon)
        .then(res => {
            console.log("trail return");
            console.log(res);
            this.setState({results: res.data.trails})
        });
     API.getWeather(this.state.lat, this.state.lon)
        .then(res => {
            console.log("weather return");
            this.setState({weather: res.data.daily})
            console.log(this.state.weather)
        })
    
     }
     
     )

}

    handleClick = event => {
        console.log(event.target.dataset.id);
        console.log(this.state.results[event.target.dataset.id]);
        let data={
            trailID:this.state.results[event.target.dataset.id].id,
            Name:this.state.results[event.target.dataset.id].name,
            //password:password
        }
        API.addTrail(data).then(response=>{
            if(response){
            console.log("entered in database")
            }
        })
    }

   render() {
       return (
            <div>
                <form className="flex items-center justify-center max-w-md mx-auto flex mt-10 border rounded-lg flex-wrap bg-green-900 p-8 shadow-xl">

                <SearchCity
                handleFormSubmit={this.handleFormSubmit}
                place={this.state.place}
                handleInputChange={this.handleInputChange}
               />
                </form>

               <h1 className="open-sans text-black align-center py-2">Showing results for: <br/> {this.state.place}</h1> 
               
               <div className="flex">
           <div className="w-2/3">    
               <div className="flex flex-wrap object-none object-center mb-4">
               {this.state.results.map((trail, index)=>{
                   return (
                   <Card key={trail.id} index={index} trailName={trail.name} summary={trail.summary} image={trail.imgSmall} dif={trail.difficulty} loc={trail.location} type={trail.type} stars={trail.stars} handleClick={this.handleClick}/>
                    
                   )
                })}
                 </div>
               
            </div>
               
            <div className="w-1/3">
               {this.state.weather.map(forecast=>{
                   return <WeatherCard key={forecast.dt} dt={forecast.dt} pressure={forecast.pressure} humidity={forecast.humidity} main={forecast.weather[0].description} dayTemp={forecast.temp.day} eveTemp={forecast.temp.eve} ascent={forecast.ascent} condition={forecast.conditionStatus} length={forecast.length}/>
               })}
            </div>
        </div>
        </div>
             
       )
   }
}

export default Search;