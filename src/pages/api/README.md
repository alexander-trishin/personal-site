# Best practices for REST API design

## Rest API Versioning

- <https://example.com/api/items>
- <https://example.com/api/v2/items>

## Rest API Success Responses

1 - GET - Get single item - HTTP Response Code: **200**

```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "id": 1,
        "name": "shirt",
        "color": "red"
    }
```

2 - GET - Get multiple items - HTTP Response Code: **200**

```javascript
    HTTP/1.1 200
    Pagination-Count: 100
    Pagination-Page: 5
    Pagination-Limit: 20
    Content-Type: application/json
    
    [
        {
            "id": 1,
            "name": "shirt",
            "color": "red"
        },
        {
            "id": 2,
            "name": "coat",
            "color": "black"
        }
    ]
```

3 - POST - Create a new item - HTTP Response Code: **201**

```javascript
    HTTP/1.1  201
    Location: /items/2
    Content-Type: application/json
 
    {
        "id": 2,
        "name": "coat",
        "color": "black"
    }
```

4 - PUT - Update an item - HTTP Response Code: **200/204**

> If updated entity is to be sent after the update

```javascript
    HTTP/1.1  200
    Content-Type: application/json
 
    {
        "id": 1,
        "name": "shirt",
        "color": "red"
    }
```

> If updated entity is not to be sent after the update

```javascript
    HTTP/1.1  204
```

5 - DELETE - Delete an item - HTTP Response Code: **204**

```javascript
    HTTP/1.1  204
```

## Rest API Error Responses

1 - GET - HTTP Response Code: **404**

```javascript
    HTTP/1.1  404
    Content-Type: application/json
 
    {
        "message": "The item does not exist"
    }
```

2 - DELETE - HTTP Response Code: **404**

```javascript
    HTTP/1.1  404
    Content-Type: application/json
 
    {
        "message": "The item does not exist"
    }
```

3 - POST -  HTTP Response Code: **400**

```javascript
    HTTP/1.1  400
    Content-Type: application/json
    
    {
        "message": "One or more validation errors occurred",
        "errors": [
            {
                "code": "invalid_type",
                "path": ["names", 1],
                "message": "Invalid input: expected string, received number",
            },
            {
                "code": "too_small",
                "path": ["address", "zipCode"],
                "message": "Value should be greater than or equal to 10000",
            }
        ]
    }
```

4 - PUT -  HTTP Response Code: **400/404**

```javascript
    HTTP/1.1  400
    Content-Type: application/json
    
    {
        "message": "One or more validation errors occurred",
        "errors": [
            {
                "code": "too_small",
                "path": ["address", "zipCode"],
                "message": "Value should be greater than or equal to 10000",
            }
        ]
    }
    
    
    HTTP/1.1  404
    Content-Type: application/json
 
    {
        "message": "The item does not exist"
    }
```

5 - VERB Unauthorized - HTTP Response Code: **401**

```javascript
    HTTP/1.1  401
    Content-Type: application/json
 
    {
        "message": "Authentication credentials were missing or incorrect"
    }
```

6 - VERB Forbidden - HTTP Response Code: **403**

```javascript
    HTTP/1.1  403
    Content-Type: application/json
 
    {
        "message": "The request is understood, but it has been refused or access is not allowed"
    }
```

7 - VERB Conflict - HTTP Response Code: **409**

```javascript
    HTTP/1.1  409
    Content-Type: application/json
 
    {
        "message": "Any message which should help the user to resolve the conflict"
    }
```

8 - VERB Too Many Requests - HTTP Response Code: **429**

```javascript
    HTTP/1.1  429
    Content-Type: application/json
 
    {
        "message": "The request cannot be served due to the rate limit having been exhausted for the resource"
    }
```

9 - VERB Internal Server Error - HTTP Response Code: **500**

```javascript
    HTTP/1.1  500
    Content-Type: application/json
 
    {
        "message": "Something went wrong..."
    }
```

## Validation Error Formats

```javascript
    HTTP/1.1  400
    Content-Type: application/json
    
    {
        "message": "One or more validation errors occurred",
        "errors": [
            {
                "code": "unrecognized_keys",
                "path": ["address"],
                "message": "Unrecognized key(s) in object: 'extra'",
            }
        ]
    }
```

## References

Avoid using 'X-' in custom headers: <https://tools.ietf.org/html/rfc6648>
