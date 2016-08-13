var ghetData = {

    // unique song id
    song_number: 4,
    
    song_name: "GHET1 - Knife Party vs Skrillex",
    
    bpm:176, 
    
    filename: 'ghet',

    // mappings of sound to key
    mappings:{
        chain1:["",   "c10","","",   "d14","d13","d12","b0", "b1", "b2", "e3", "b3",
                "",   "",   "","d11","d10","d9", "d8", "b4", "b5", "b6", "b7", "e2",
                "a12","",   "","d7", "d6", "d5", "d4", "b8", "b9", "b10","b11","",
                "",   "",   "","d3", "d2", "d1", "d0", "b12","b13","b14","b15",""],
                
        chain2:["c2", "c10","a4","d15","d14","d13","d12","b0", "b1", "b2", "b3", "e3",
                "a9", "a14","a5","d11","d10","d9", "d8", "c13","c1", "c3", "b7", "e2",
                "a12","a0", "a6","d7", "d6", "d5", "d4", "b8", "b9", "b10","b11","a13",
                "a10","a11","a1","d3", "d2", "d1", "d0", "b12","b13","b14","b15",""],
                
        chain3:["c4", "c10","a14","d0", "",   "d2", "d3", "",   "b1","b2", "b3","",
                "a13","a0", "",   "d4", "d5", "d6", "d7", "b4", "d9","b6", "b7","",
                "a12","d11","",   "d8", "d9", "d10","d11","d0", "b9","b10","b11","",
                "",   "",   "",   "d12","d13","d14","d15","b12","d8","b14","b15",""],
                
        chain4:["eb15","eb13","ed4_1","",   "c10","",  "",   "",   "b1", "b2", "",   "",
                "eb11","eb6", "ed4_2","",   "d2", "d3","d13","",   "b5", "b6", "b7", "",
                "ea12","ea13","ed8_1","a12","a13","d2","d14","b8", "b9", "b10","b11","d1",
                "ec10","eb7", "ed8_2","",   "",   "d1","d15","b12","b13","b14","b15",""]
    },
    
    // which keys need to be help to play through
    holdToPlay:{
        chain1:[],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[]
    },
    
    // sets of keys that are linked (only one can be playing at a time)
    linkedAreas:{
        chain1:[],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[]
    }
}