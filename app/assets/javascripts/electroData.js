var electroData = {
  
    // unique song id
    song_number: 3,
    
    song_name: "SUBFER - Electro Mashup",
    
    bpm:128,
    
    filename: 'electro',
  
    // mappings of sound to key
    mappings:{
        chain1:["c12","c13","b0", "b1", "b2", "b3", "b13","a7", "a0", "a1", "a2", "a3",
                "c14","d15","b8", "b9", "b10","b11","b7", "a8", "a9", "b10","a11","",
                "d10","d14","b15","d7", "b12","d4", "",   "a15","c7", "a12","c4", "c15",
                "d9", "d12","d3", "d11","d0", "d8", "",   "c3", "c11","c0", "c8", ""],
                
        chain2:["c14","c14","a0","",   "d0","",   "b0", "b1", "b2", "b3", "d3", "a1",
                "",   "c14","a2","b6", "d5","d6", "d7", "b4", "b5", "b6", "b7", "a4",
                "c8", "c14","a3","d8", "d9","d10","d11","b8", "b9", "b10","b11","a6",
                "c8", "c3", "a7","d12","c2","d14","d15","b12","b13","b14","b15",""],
        
        chain3:["a4","c14","c1", "c5", "a10","a11","b2", "b3", "d12","d13","d14","d15",
                "a6","c14","c2", "c6", "b4", "b5", "b6", "a1", "d8", "d9", "d10","d11",
                "c8","",   "c3", "c7", "b8", "b9", "b10","b11","d4", "d5", "d6", "d7",
                "c8","a12",   "c11","c15","b12","a12","b14","b15","d0", "d2", "d3", ""],
                
        chain4:["a0", "",   "",   "","c12","c13","c14","c15","",   "b3", "e0","",
                "a4", "a5", "",   "","",   "",   "",   "",   "b6", "b7", "e1","e2",
                "a8", "a9", "",   "","",   "",   "",   "",   "b10","b11","e3","",
                "a12","a13","a14","","",   "",   "",   "b13","b14","b15","e4",""]
    },
    
    // which keys need to be held to play through
    holdToPlay:{
        chain1:[],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[]
    },
    
    // sets of keys that are linked (only one can be playing at a time)
    linkedAreas:{
        chain1:[[0,1,12,13,24,25]],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[[20,10,22],[20,23,34]]
    }
}