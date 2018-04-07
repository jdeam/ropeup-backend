const fs = require('fs');

const schedule_items = [];

for (let user_id=1; user_id<=500; user_id++) {
  const numItems = Math.ceil(Math.random()*4);
  const days = [0, 1, 2, 3, 4, 5, 6];
  const interval = [3, 4, 5];
  for (let i=0; i<numItems; i++) {
    const item = { user_id };
    item.day = days.splice(Math.floor(Math.random()*days.length), 1);
    item.start = Math.floor(Math.random()*13);
    item.end = item.start + interval[Math.floor(Math.random()*3)];
    schedule_items.push(item);
  }
}

fs.writeFile('schedule_items.json', JSON.stringify(schedule_items));
