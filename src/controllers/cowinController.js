let axios = require("axios");


let getStates = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistricts = async function (req, res) {
  try {
    let id = req.params.stateId;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;
    console.log(`query params are: ${pin} ${date}`);
    var options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getOtp = async function (req, res) {
  try {
    let blahhh = req.body;

    console.log(`body is : ${blahhh} `);
    var options = {
      method: "post",
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: blahhh,
    };

    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistrictsId = async function (req, res) {
  try {
    let district = req.query.districtId;
    let date = req.query.date;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getWeather = async function (req, res) {
  try {
    let city = req.query.city;
    let options = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ad6429f581aa56c3d367646c21153bf`,
    };
    let result = await axios(options);
    let tempOfCity = result.data.main.temp;
    console.log(tempOfCity);
    res.status(200).send({ cityName: city, temp: tempOfCity });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
};

const sortedCities = async function (req, res) {
  try {
    let cities = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let result = [];

    for (let i in cities) {
      let object = { city: cities[i] };
      let resp = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=3ad6429f581aa56c3d367646c21153bf`
      );

      object.temp = resp.data.main.temp;
      // console.log(object)
      result.push(object);
    }

    let sortedResult = result.sort( function(a,b) { return a.temp - b.temp })
    res.status(200).send({ msg:sortedResult })
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getMemes = async function(req, res){
    try{
        let template_id = req.query.template_id
        let text1 = req.query.text0
        let text2 = req.query.text1
        
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text1}&text1=${text2}&username=rhutvik_patel&password=Rjp@2000`
        }
        let result = await axios(options)

        res.status(200).send({ msg : result.data })
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}

module.exports = {
  getStates,
  getDistricts,
  getByPin,
  getOtp,
  getDistrictsId,
  getWeather,
  sortedCities, getMemes
};
