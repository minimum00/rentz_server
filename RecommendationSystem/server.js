const express = require('express');
const cors = require('cors');
const app = express()
const {db}   = require('./firebaseConfig')
const {collection, getDocs } = require('firebase/firestore');

app.use(express.json());
app.use(cors());

const obj = [
  {
    roomId: 102,
    category: ['under5k', 'balcony'],
    point: 0,
  },
  {
    roomId: 109,
    category: ['under 10k', 'wifi', 'balcony'],
    point: 0,
  },
  {
    roomId: 108,
    category: ['expensive', 'inverter', 'balcony'],
    point: 0,
  },
  {
    roomId: 210,
    category: ['under 8k', 'inverter', 'balcony'],
    point: 0,
  },
  {
    roomId: 110, 
    category: ['under 10k', 'inverter', 'balcony'],
    point: 0,
  },
  {
    roomId: 123,
    category: ['expensive', 'inverter', 'balcony', 'wifi'],
    point: 0,
  },
];

const RequestFile = {
  roomId: 10,
  features: ['expensive', 'inverter', 'balcony', 'wifi'],
};

app.post('/RecommendationSystem', async (req, res) => {
    const collectionRef = collection(db, 'Rooms');
    const docSnapShot = await getDocs(collectionRef);
    
    const roomInfo =  [];
    docSnapShot.forEach(doc => {
        roomInfo.push(doc.data());
    })
    console.log('the room details are', roomInfo);

    const RequestFile = req.body;
    console.log('room File', RequestFile);

    let { features } = RequestFile;
    
    // Convert the features string to an array
    features = JSON.parse(features.replace(/'/g, '"'));

    console.log(features, 'feature from the res');

    features.forEach((reqFeature) => {
        roomInfo.forEach((roomObj) => {
            const { features, point } = roomObj;
            (features || []).forEach((fet) => {
                if (fet === reqFeature) {
                    roomObj.point++;
                }
            });
        });
    });

    roomInfo.sort((a, b) => b.point - a.point);

    res.status(201).send(roomInfo);
});

app.post('/fetchingFirebase', async (req, res) => {
    res.status(201).send(roomInfo);
})

app.listen(5009, () => console.log('Recommendation system server is on 5009'));
