const express = require('express');
const cors = require('cors');
const app = express();



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
  category: ['expensive', 'inverter', 'balcony', 'wifi'],
};

app.post('/RecommendationSystem', async (req, res) => {
  const { category } = RequestFile;
  category.forEach((reqFeature) => {
    obj.forEach((roomObj) => {
      const { category, point } = roomObj;
      (category || []).forEach((fet) => {
        if (fet === reqFeature) {
          roomObj.point++;
        }
      });
    });
  });

  obj.sort((a, b) => b.point - a.point);

  res.status(201).send(obj);
});

app.listen(5009, () => console.log('Recommendation system server is on 5009'));
