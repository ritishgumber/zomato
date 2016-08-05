# zomato

[![NPM](https://nodei.co/npm/zomato.png?mini=true)](https://nodei.co/npm/zomato/)

npm package for [Zomato API](https://developers.zomato.com/apis)

## Installation
Install using npm:
```sh
npm install zomato
```

## Usage
Require library
```javascript
var zomato = require('zomato');
```
Create client
```javascript
var client = zomato.createClient({
  userKey: 'API Token', //as obtained from [Zomato API](https://developers.zomato.com/apis)
});
```
## Get a list of categories. List of all restaurants categorized under a particular restaurant type can be obtained using /Search API with Category ID as inputs.
```javascript
client.getCategories(null, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Find the Zomato ID and other details for a city . You can obtain the Zomato City ID in one of the following ways -
 - City Name in the Search Query - Returns list of cities matching the query
 - Using coordinates - Identifies the city details based on the coordinates of any location inside a city
## If you already know the Zomato City ID, this API can be used to get other details of the city
```javascript
client.getCities({
q:"New Delhi", //query by city name
lat:"28.613939", //latitude
lon:"77.209021", //longitude
city_ids:"1,2,3", //comma separated city_ids value
count:"2" // number of maximum result to display
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Returns Zomato Restaurant Collections in a City. The location/City input can be provided in the following ways -
 - Using Zomato City ID
 - Using coordinates of any location within a city
## List of all restaurants listed in any particular Zomato Collection can be obtained using the '/search' API with Collection ID and Zomato City ID as the input.
```javascript
client.getCollections({
city_id:"1", //id of the city for which collections are needed
lat:"28.613939", //latitude
lon:"77.209021", //longitude
count:"2" // number of maximum result to display
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Get a list of all cuisines of restaurants listed in a city. The location/city input can be provided in the following ways -
 -Using Zomato City ID
 -Using coordinates of any location within a city
##List of all restaurants serving a particular cuisine can be obtained using '/search' API with cuisine ID and location details
```javascript
client.getCuisines({
city_id:"1", //id of the city for which collections are needed
lat:"28.613939", //latitude
lon:"77.209021" //longitude
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Get a list of restaurant types in a city. The location/City input can be provided in the following ways -
 -Using Zomato City ID
 -Using coordinates of any location within a city
##List of all restaurants categorized under a particular restaurant type can obtained using /Search API with Establishment ID and location details as inputs
```javascript
client.getEstablishments({
city_id:"1", //id of the city for which collections are needed
lat:"28.613939", //latitude
lon:"77.209021" //longitude
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Get Foodie and Nightlife Index, list of popular cuisines and nearby restaurants around the given coordinates
```javascript
client.getGeocode({
lat:"28.613939", //latitude
lon:"77.209021" //longitude
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
##Get Foodie Index, Nightlife Index, Top Cuisines and Best rated restaurants in a given location
```javascript
client.getLocationDetails({
entity_id:"36932", //location id obtained from locations api
entity_type:"group" //location type obtained from locations api
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
## Search for Zomato locations by keyword. Provide coordinates to get better search results
```javascript
client.getLocations({
query:"New Delhi", // suggestion for location name
lat:"28.613939", //latitude
lon:"77.209021", //longitude
count:"2" // number of maximum result to fetch
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
## Search for Zomato locations by keyword. Provide coordinates to get better search results
```javascript
client.getDailyMenu({
res_id:"9186" // id of restaurant whose details are requested
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
## Get detailed restaurant information using Zomato restaurant ID. Partner Access is required to access photos and reviews.
```javascript
client.getRestaurant({
res_id:"9186" // id of restaurant whose details are requested
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
## Get restaurant reviews using the Zomato restaurant ID
```javascript
client.getReviews({
res_id:"9186" , // id of restaurant whose details are requested
start : "0" , //fetch results after this offset (Integer)
count: "5" , max number of results to retrieve

}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```
## The location input can be specified using Zomato location ID or coordinates. Cuisine / Establishment / Collection IDs can be obtained from respective api calls. Partner Access is required to access photos and reviews.
##Examples - 
 - To search for 'Italian' restaurants in 'Manhattan, New York City', set cuisines = 55, entity_id = 94741 and entity_type = zone
 - To search for 'cafes' in 'Manhattan, New York City', set establishment_type = 1, entity_type = zone and entity_id = 94741
 - Get list of all restaurants in 'Trending this Week' collection in 'New York City' by using entity_id = 280, entity_type = city and collection_id = 1
```javascript
client.search({
entity_id:"36932",//location id
entity_type:"group", // location type (city,subzone,zone , landmark, metro,group)
q:"Cafe" ,//Search Keyword
lat:"28.613939", //latitude
lon:"77.209021", //longitude
count:"2", // number of maximum result to display
start:"1" , //fetch results after offset
radius:"10000" , //radius around (lat,lon); to define search area, defined in meters(M)
cuisines : "3,7" , //list of cuisine id's separated by comma
establishment_type : "" , //estblishment id obtained from establishments call
collection_id : "29" , //collection id obtained from collections call
category :  "9" ,//	category ids obtained from categories call
sort : " cost,rating,real_distance" ,//choose any one out of these available choices
order: "asc" //	used with 'sort' parameter to define ascending(asc )/ descending(desc)

}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
```