# URL-Shortener-Backend-Project
basic URL Shortener project

creating a short url from long url
required tech stacks: Mongodb,node.js,express.js
## Scalable URL Shortner Project Requirement

## Phase I

## Overview
URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases “short links.” Users are redirected to the original URL when they hit these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.

For example, if we shorten the following URL through TinyURL:

```
https://babeljs.io/blog/2020/10/15/7.12.0#class-static-blocks-12079httpsgithubcombabelbabelpull12079-12143httpsgithubcombabelbabelpull12143
```

We would get:

```
https://tinyurl.com/y4ned4ep
```

The shortened URL is nearly one-fifth the size of the actual URL.

Some of the use cases for URL shortening is to optimise links shared across users, easy tracking of individual links and sometimes hiding the affiliated original URLs.

If you haven’t used tinyurl.com before, please try creating a new shortened URL and spend some time going through the various options their service offers. This will help you have a little context to the problem we solve through this project.

### Key points
- Create a group database `groupXDatabase`. You can clean the db you previously used and reuse that.
- This time each group should have a *single git branch*. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention `project/urlShortnerGroupX`
- Follow the naming conventions exactly as instructed. The backend code will be integrated with the front-end application which means any mismatch in the expected request body will lead to failure in successful integration.

### Models
- Url Model
```
{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }
```

### POST /url/shorten
- Create a short URL for an original url recieved in the request body.
- The baseUrl must be the application's baseUrl. Example if the originalUrl is http://abc.com/user/images/name/2 then the shortened url should be http://localhost:3000/xyz
- Return the shortened unique url. Refer [this](#url-shorten-response) for the response
- Ensure the same response is returned for an original url everytime
- Return HTTP status 400 for an invalid request

### GET /:urlCode
- Redirect to the original URL corresponding
- Use a valid HTTP status code meant for a redirection scenario.
- Return a suitable error for a url not found
- Return HTTP status 400 for an invalid request

## Testing 
- To test these apis create a new collection in Postman named Project 3 Url Shortner
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg  Url shorten, Get Url etc
- Each member of each team should have their tests in running state

## Response

### Successful Response structure
```yaml
{
  status: true,
  data: {
  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```
## Response samples

## 1.Post url response
![response for post url](https://user-images.githubusercontent.com/93571776/150661518-092f2d6d-be9e-4ece-b328-d44adc90a5e0.png)

## 2.before response
![befor redirecting ](https://user-images.githubusercontent.com/93571776/150661523-a377380a-4fae-40e1-95ac-2cd42b9aca2c.png)
## 3.after redirecting Url
![after redirect the url](https://user-images.githubusercontent.com/93571776/150661540-34d69bd2-ecfd-40c1-9759-95503c002433.png)


### Url shorten response
```yaml
{
    "status": true,
    "data": {
        "_id": "61ecb1d8bad6d53894f2822d",
        "longUrl": "https://www.amazon.in/MOTOROLA-Edge-Fusion-Cyber-Teal/dp/B09HV4FZGV/ref=sr_1_1?crid=2X0CF2OYG75YQ&keywords=motorola%2Bmobiles&nav_sdd=aps&qid=1642901924&refinements=p_36%3A1318507031%2Cp_n_feature_eight_browse-bin%3A8561112031&rnid=8561111031&s=electronics&sprefix=moto&sr=1-1&th=1",
        "shortUrl": "http://localhost:3000/rcat",
        "urlCode": "rcat"
    }
}
```
