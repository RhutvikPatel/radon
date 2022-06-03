const express = require('express');
const underscore = require('underscore');
const { chunk } = require('underscore');
const _ = require('lodash');

const router = express.Router();

router.get('/hello', function (req, res) {
   let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
   let arrayChunks= chunk(array, 4)
   console.log(arrayChunks)

   let first10OddNumbers = [1,3,5,7,9,11,13,15,17,19]
    let last9Elements = _.tail(first10OddNumbers)
    console.log(last9Elements)

    let arr1=[1,2]; let arr2=[1,4,5]; let arr3=[12,2]; let arr4=[5, 6]; let arr5=[7, 6, 5, 2]; 
    let arrayresult=_.union(arr1,arr2,arr3,arr4,arr5)
    console.log(arrayresult)

    let pair=[["horror","The Shining"],["drama", "Titanic"],["thriller" , "Shutter Island"] ,["fantasy","Pans Labyrinth"]]
    let resultPair=_.fromPairs(pair)
    console.log(resultPair)

    res.send("Hello !!!!!!!")
});

 router.get('/movies', function(req, res){
    const moviesName=["X-Men", "Avengers", "Dr. Strange", "6 Underground", "Escape Room", "Top Gun"]

    res.send(moviesName)
})

router.get('/movies/:indexNumber', function(req, res){
    const moviesName=["X-Men", "Avengers", "Dr. Strange", "6 Underground", "Escape Room", "Top Gun"]
    res.send(moviesName[req.params.indexNumber])
})

// router.get('/candidates', function(req, res){
//     console.log('Query paramters for this request are '+JSON.stringify(req.query))
//     let gender = req.query.gender
//     let state = req.query.state
//     let district = req.query.district
//     console.log('State is '+state)
//     console.log('Gender is '+gender)
//     console.log('District is '+district)
//     let candidates = ['Akash','Suman']
//     res.send(candidates)
// })

// router.get('/candidates/:canidatesName', function(req, res){
//     console.log('The request objects is '+ JSON.stringify(req.params))
//     console.log('Candidates name is '+req.params.canidatesName)
//     res.send('Done')
// })

router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]   
    let sumOfTheArray=0
    for(let i in arr){
        sumOfTheArray += arr[i]
    }

    let lastElement= arr.pop()
    let consecutiveSumOfArray=lastElement*(lastElement+1)/2
    let missingNumber=consecutiveSumOfArray - sumOfTheArray
    res.send(  { data: missingNumber  }  );
});

app.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let lenght=arr.length
    let sumOfTheArray=0
    for(let i in arr){
        sumOfTheArray +=arr[i]
    }
    
    let firstElement= arr[0]
    let lastElement= arr.pop()
    let consecutiveSumOfArray = (lenght+ 1)*(firstElement + lastElement)/2
    let missingNumber =consecutiveSumOfArray - sumOfTheArray
    res.send(  { data: missingNumber  }  );
});


module.exports = router;
// adding this comment for no reason