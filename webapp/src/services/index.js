const baseFetch = (url, options) => {
    return fetch(url, options)
      .then(response => response.json())
      .then(res => {
        console.log('5 ok =>', res);
        return res;
      })
      .catch(err => {
        return err;
      });
  };

export const postFetch = (url, fetchBody, notToString) => {
    const body = notToString ? fetchBody : JSON.stringify(fetchBody);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    };
  
    return baseFetch(url, requestOptions).then( response => {
      console.log('25 ok =>' + JSON.stringify(response))
      return response
    });
    };

export const predictReview =  (review) => {
    return postFetch(
    `http://localhost:6789/api/predict`,
    { 
        review
    }
    ).then(response => {
      console.log('25 ok =>' + JSON.stringify(response))
      return response
    });
}