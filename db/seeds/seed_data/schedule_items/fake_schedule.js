const fs = require('fs');

const schedule_items = [];

for (let user_id=1; user_id<=1000; user_id++) {
  const numItems = Math.floor(Math.random()*2) + 3;
  const days = [0, 1, 2, 3, 4, 5, 6];
  for (let i=0; i<numItems; i++) {
    const item = { user_id };
    item.day = days.splice(Math.floor(Math.random()*days.length), 1)[0];
    item.start = Math.floor(Math.random()*12);
    item.end = item.start + Math.floor(Math.random()*3) + 3;
    schedule_items.push(item);
  }
}

fs.writeFile('new_schedule_items.json', JSON.stringify(schedule_items));
