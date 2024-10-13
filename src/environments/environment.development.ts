export const environment = {
    production: false,
    api:{
        categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        nationalities: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        listByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByCountry: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    },
    firebaseConfig : {
        apiKey: "AIzaSyCZNnB_-XBz6GqPhw0bK-IJh-lzC296UUY",
        authDomain: "angular18tutorial.firebaseapp.com",
        projectId: "angular18tutorial",
        storageBucket: "angular18tutorial.appspot.com",
        messagingSenderId: "474909274717",
        appId: "1:474909274717:web:e67689d8cd636ffdba13b4",
        measurementId: "G-SNS0BBXTGN"
      }
};

