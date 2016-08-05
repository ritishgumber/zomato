var request = require("request");

var createClient = function (credentials) {
  return {
	getCategories: query(credentials,'getCategories'),
	getCities: query(credentials,'getCities'),
	getCollections: query(credentials,'getCollections'),
	getCuisines: query(credentials,'getCuisines'),
	getEstablishments: query(credentials,'getEstablishments'),
	getGeocode: query(credentials,'getGeocode'),
	getLocationDetails:query(credentials,'getLocationDetails'),
	getLocations:query(credentials,'getLocations'),
	getDailyMenu:query(credentials,'getDailyMenu'),
	getRestaurant:query(credentials,'getRestaurant'),
	getReviews:query(credentials,'getReviews'),
	search:query(credentials,'getReviews')
	
  };
};
//Flipkart APi Query Link Generator
var query = function (credentials, method) {
  return function (query, cb) {
    var urll = genUrl(query, credentials, method);
    if (typeof cb === 'function') {
      request.get({
        url : urll,
		method:'GET',
        headers : {
				  'Access-Control-Allow-Origin':'*',
				  'user-key':credentials.userKey
        }
      }, function(err, response, body){
        if (err) {
		console.log("err");
          cb(err);
        }
        else if (!response) {
          cb("No response recieved (check internet connection)");
        }
        else if (response.statusCode == 400) {
          cb("Error: Bad request. Invalid input parameters");
        }
        else if (response.statusCode == 401) {
          cb("Error: Unauthorized. API Token ");
        }
        else if (response.statusCode == 403) {
          cb("Invalid Key or Parameters");
        }
        else if (response.statusCode == 404) {
          cb("Error: Not found");
        }
        else if (response.statusCode == 410) {
          cb("Error: URL expired");
        }
        else if (response.statusCode == 500) {
          cb("Error: Internal server error");
        }
        else if (response.statusCode == 503) {
          cb("Error: Service unavailable");
        }
        else if (response.statusCode == 599) {
          cb("Error: Connection timed out");
        }
        else if (response.statusCode == 200){
          cb(null, body);
        }else{
          cb(response);
        }
      });
    }
  }
}

function genUrl(query,credentials,method)
{
if(method=='getCategories')
{
  preUrl = 'https://developers.zomato.com/api/v2.1/categories';
    url = preUrl + genQueryParams(query);
  
}
  else if (method === 'getCities') {
    preUrl = 'https://developers.zomato.com/api/v2.1/cities?';
    url = preUrl + genQueryParams(query);
  }
  else if (method === 'getCollections') {
    preUrl = 'https://developers.zomato.com/api/v2.1/collections?';
    url = preUrl+genQueryParams(query);
  }
  else if (method === 'getCuisines') {
    preUrl = 'https://developers.zomato.com/api/v2.1/cuisines?';
    url = preUrl+genQueryParams(query);
  }
  else if (method === 'getEstablishments') {
    preUrl = 'https://developers.zomato.com/api/v2.1/establishments?';
    url = preUrl + genQueryParams(query);
  }
  else if (method === 'getGeocode') {
    preUrl = 'https://developers.zomato.com/api/v2.1/geocode?';
    url = preUrl + genQueryParams(query);
  }
  else if (method === 'getLocationDetails') {
    preUrl = 'https://developers.zomato.com/api/v2.1/location_details?';
    url = preUrl + genQueryParams(query);
  }else if (method === 'getLocations') {
    preUrl = 'https://developers.zomato.com/api/v2.1/locations?';
    url = preUrl + genQueryParams(query);
  }else if (method === 'getDailyMenu') {
    preUrl = 'https://developers.zomato.com/api/v2.1/dailymenu?';
    url = preUrl + genQueryParams(query);
  }
  else if (method === 'getRestaurant') {
    preUrl = 'https://developers.zomato.com/api/v2.1/restaurant?';
    url = preUrl + genQueryParams(query);
  }
  else if (method === 'getReviews') {
    preUrl = 'https://developers.zomato.com/api/v2.1/reviews?';
    url = preUrl + genQueryParams(query);
  }else if (method === 'search') {
    preUrl = 'https://developers.zomato.com/api/v2.1/search?';
    url = preUrl + genQueryParams(query);
  }
 
return url;
}
//Fetch Query Parameters
var genQueryParams = function (query) {
  var params = '';
  
    for(var pr in query){
        params = params + pr + '=' + query[pr] + '&';
    }
  
  params = params.substring(0, params.length - 1);
  return params;
}


exports.createClient = createClient;

