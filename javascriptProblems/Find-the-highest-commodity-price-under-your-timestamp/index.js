const Store = function(){
  this.store = new Map();
  
  this.add = (timeStamp, price, checkpoint) => {
    if(this.store.has(timeStamp)){
       const prices = this.store.get(timeStamp);
       this.store.set(timeStamp, [price, ...prices]);
    }
    else{
      this.store.set(timeStamp, [price]);
    }

    if(checkpoint) {
        const prices = this.store.get(timeStamp);
        this.store.set(timeStamp, [...prices, checkpoint]);
    }
  };

  this.highestPrice = (timeStamp, checkpoint) => {
    let prices = this.store.get(timeStamp) ?? [];

    if(checkpoint) {
        let checkpointIndex = prices.findIndex(e => e === checkpoint);
        prices = prices.slice(0, checkpointIndex);
    }

    return this.getMax(prices);
  };

  this.getMax = (pricesList) => {
    const prices = pricesList.filter(e => Number(e));
    return Math.max(...prices) ?? 0;
  };
};


const commodityStore = new Store();

commodityStore.add(1, 100);
commodityStore.add(2, 80);
commodityStore.add(3, 120);
commodityStore.add(4, 90, 'cp1');
commodityStore.add(4, 110);
commodityStore.add(5, 95);

console.log(commodityStore.highestPrice(4, 'cp1')); // should return 120
console.log(commodityStore.highestPrice(3)); // should return 120
console.log(commodityStore.highestPrice(5)); // should return 110
console.log(commodityStore.highestPrice(2)); // should return 80
console.log(commodityStore.highestPrice(1)); // should return 100