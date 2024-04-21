export const items = {
    data:
    {
        care: [
            {
                "name": "Food",
                "price": 500 ,
                "image": './assets/img/sprites/food.png' ,
                "description": "Feed your pup!" ,
                "id": 1 ,
                "quantity": 0,
                "statistic": "hunger",
                "replenishValue": 50
            },
            {
                "name": "Basic Water",
                "price": 500 ,
                "image": './assets/img/sprites/water.png' ,
                "description": "Give your pup a drink!" ,
                "id": 2,
                "quantity": 0,
                "statistic": "thirst",
                "replenishValue" : 50
            },
        ],
        clothing: [
            {
                "name": "Default",
                "price": 0 ,
                "image": { option1: './assets/img/sprites/dog-black.png', option2: './assets/img/sprites/dog-yellow.png' },
                "description": "Nothing fancy!" ,
                "id": 1 ,
                "purchased": true ,
                "equipped": true 
            },
            {
                "name": "Rainbow Hat",
                "price": 1000 ,
                "image": { option1: './assets/img/sprites/dog-black--rainbow.png', option2: './assets/img/sprites/dog-yellow--rainbow.png' },
                "description": "A fun rainbow accessory!" ,
                "id": 2 ,
                "purchased": false ,
                "equipped": false 
            },
            {
                "name": "Halo",
                "price": 2000 ,
                "image":  { option1: './assets/img/sprites/dog-black--angel.png', option2: './assets/img/sprites/dog-yellow--angel.png' } ,
                "description": "For your little angel!" ,
                "id": 3 ,
                "purchased": false ,
                "equipped": false 
            },
            {
                "name": "Beachwear",
                "price": 3000 ,
                "image":  { option1: './assets/img/sprites/dog-black--sun.png', option2: './assets/img/sprites/dog-yellow--sun.png' } ,
                "description": "For those hot summer days!" ,
                "id": 4 ,
                "purchased": false ,
                "equipped": false 
            },
        ],
        decor: [
            {
                "name": "Grass",
                "price": 0 ,
                "image": './assets/img/backgrounds/grass.png' ,
                "description": "A nice field." ,
                "id": 1,
                "purchased": true ,
                "equipped": true 
            },
            {
                "name": "Clouds",
                "price": 2000 ,
                "image": './assets/img/backgrounds/sky.png' ,
                "description": "A heavenly backdrop!" ,
                "id": 2,
                "purchased": false ,
                "equipped": false 
            },
            {
                "name": "Beach",
                "price": 3000 ,
                "image": './assets/img/backgrounds/beach.png' ,
                "description": "Fun in the sun!" ,
                "id": 3,
                "purchased": false ,
                "equipped": false 
            },
        ]
    }
}