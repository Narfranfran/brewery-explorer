Open Brewery DB Documentation
Documentation for the Open Brewery DB API.
Base URL
https://api.openbrewerydb.org/v1/
1. Single Brewery
Get a single brewery.
Endpoint:
GET https://api.openbrewerydb.org/v1/breweries/{obdb-id}
Query Parameters
|
| Parameter | Type | Required | Description |
| obdb-id | string | yes | Unique identifier for the brewery |
Response Fields
| Field | Type | Description |
| id | string | Unique identifier for the brewery |
| name | string | Brewery name |
| brewery_type | string | Type of brewery (see by_type for possible values) |
| address_1 | string or null | Primary street address |
| address_2 | string or null | Secondary address line |
| address_3 | string or null | Third address line |
| city | string | City name |
| state_province | string | State or province |
| postal_code | string | Postal or ZIP code |
| country | string | Country name |
| longitude | number or null | Longitude coordinate |
| latitude | number or null | Latitude coordinate |
| phone | string or null | Contact phone number |
| website_url | string or null | Brewery website URL |
| state | string | State abbreviation or name (deprecated) |
| street | string or null | Street address (deprecated) |
2. List Breweries
Returns a list of breweries.
Endpoint: GET https://api.openbrewerydb.org/v1/breweries
Query Parameters
| Parameter | Type | Required | Description |
| by_city | string | no | Filter breweries by city. |
| by_country | string | no | Filter breweries by country. |
| by_dist | string | no | Sort results by distance from an origin point (latitude, longitude). |
| by_ids | string | no | Comma-separated list of brewery IDs. |
| by_name | string | no | Filter breweries by name. |
| by_state | string | no | Filter breweries by full state name (no abbreviations). |
| by_postal | string | no | Filter breweries by postal or ZIP code. Supports 5-digit and postal+4 formats. |
| by_type | string | no | Filter by brewery type (see by_type section for valid values). |
| page | integer | no | Page number for pagination. Default: 1. |
| per_page | integer | no | Number of breweries per page. Default: 50. Maximum: 200. |
| sort | string | no | Sort results by one or more fields using asc or desc. |
Filters Detail
by_city
Filter breweries by city. Note: For the parameters, you can use underscores or url encoding for spaces.
by_country
Filter breweries by country. Note: For the parameters, you can use underscores or url encoding for spaces.
by_dist
Sort the results by distance from an origin point, denoted by latitude, longitude.
by_ids
Comma-separated list of brewery IDs.
by_name
Filter breweries by name. Note: For the parameters, you can use underscores or url encoding for spaces.
by_state
Filter breweries by state. Note: Full state name is required; no abbreviations. For the parameters, you can use underscores or url encoding for spaces.
by_postal
Filter breweries by postal code. May be filtered by basic (5 digit) postal code or more precisely filtered by postal+4 (9 digit) code. Note: If filtering by postal+4 the search must include either a hyphen or an underscore.
by_type
Filter by type of brewery. Must be one of:
●	micro - Most craft breweries. For example, Samual Adams is still considered a micro brewery.
●	nano - An extremely small brewery which typically only distributes locally.
●	regional - A regional location of an expanded brewery. Ex. Sierra Nevada's Asheville, NC location.
●	brewpub - A beer-focused restaurant or restaurant/bar with a brewery on-premise.
●	large - A very large brewery. Likely not for visitors. Ex. Miller-Coors. (deprecated)
●	planning - A brewery in planning or not yet opened to the public.
●	bar - A bar. No brewery equipment on premise. (deprecated)
●	contract - A brewery that uses another brewery's equipment.
●	proprietor - Similar to contract brewing but refers more to a brewery incubator.
●	closed - A location which has been closed.
page
The offset or page of breweries to return.
per_page
Number of breweries to return each call. Note: Default per page 50. Max per page is 200.
sort
Sort the results by one or more fields.
●	asc for ascending order
●	desc for descending order Note: by_dist does not work with the sort filter since it is a filter of its own.
Response Fields
(Same as Single Brewery)
3. Random Brewery
Get a random brewery.
Endpoint: GET https://api.openbrewerydb.org/v1/breweries/random
Query Parameters
| Parameter | Type | Required | Description |
| size | integer | no | Number of breweries to return. Default: 1. Maximum: 50. |
Response Fields
(Same as Single Brewery)
Note: Returns a single brewery object by default, or an array of brewery objects when size is greater than 1.
4. Search Breweries
Search for breweries based on a search term. The search performs partial, case-insensitive matching against brewery names.
Endpoint: GET https://api.openbrewerydb.org/v1/breweries/search
Query Parameters
| Parameter | Type | Required | Description |
| query | string | yes | Search term to match against brewery names. Supports partial matches. |
| per_page | integer | no | Number of results per page. Default: 50. Maximum: 200. |
| page | integer | no | Page number for pagination. Default: 1. |
Response Fields
(Same as Single Brewery)
Note: Returns an empty array [] when no breweries match the search query.
5. Metadata
Metadata takes the same filters as List Breweries.
Endpoint: https://api.openbrewerydb.org/v1/breweries/meta
Query Parameters
| Parameter | Type | Required | Description |
| by_city | string | no | Filter breweries by city. |
| by_country | string | no | Filter breweries by country. |
| by_dist | string | no | Sort results by distance from an origin point (latitude, longitude). |
| by_ids | string | no | Comma-separated list of brewery IDs. |
| by_name | string | no | Filter breweries by name. |
| by_state | string | no | Filter breweries by full state name (no abbreviations). |
| by_postal | string | no | Filter breweries by postal or ZIP code. Supports 5-digit and postal+4 formats. |
| by_type | string | no | Filter by brewery type (see by_type section for valid values). |
| page | integer | no | Page number for pagination. Default: 1. |
| per_page | integer | no | Number of breweries per page. Default: 50. Maximum: 200. |
