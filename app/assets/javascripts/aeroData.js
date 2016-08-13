var aeroData = {
  
    // unique song id
    song_number: 6,
    
    song_name: "Aero Chord - Surface",
    
    bpm:170,
    
    filename: 'aero',
  
    // mappings of sound to key
    mappings:{
        chain1:["b0", "b1", "b2", "b3", "c0", "a0", "",   "c3", "d0", "d1", "d2", "d3",
                "",   "",   "",   "b7", "c4", "c5", "c6", "c7", "d4", "",   "",   "d7",
                "",   "b9", "b10","b11","c8", "c9", "c10","c11","",   "d9", "d10","",
                "b12","b13","b14","b15","c12","c13","c14","c15","d12","d13","d14",""],
                
        chain2:["a0", "b1", "b2", "b3", "b0","c6","d3", "d0", "e0", "e1", "e2", "e3",
                "a4", "a5", "b6", "b7", "c0","c7","d7", "d5", "e4", "e5", "e6", "e7",
                "a8", "a10","b10","b11","c4","d4","d11","d6", "e8", "e9", "e14","e15",
                "a12","a15","b14","b15","c8","d2","d10","e10","e11","e12","e13",""],
                
        chain3:["a5", "a7", "b4", "",   "b6", "b7", "c0", "c3", "d0","d1","d2","d3",
                "a10","a11","b8", "e0", "b11","e1", "c7", "c8", "d4","d5","d6","",
                "a13","a15","b9", "b0", "b3", "b10","c12","c13","",  "",  "",  "",
                "",   "",   "b12","b13","b14","b15","",   "",   "",  "",  "",  ""],
                
        chain4:["a0", "c0", "",   "a3", "b0", "b1", "b2","b3", "d0", "d1", "d2", "d15",
                "",   "",   "",   "a7", "b4", "b5", "b6","",   "d4", "d5", "d6", "d7",
                "a8", "a9", "a10","a11","b8", "b9", "",  "b11","d8", "d9", "d10","d11",
                "c12","a13","",   "a15","b12","b13","",  "b15","d12","d13","d14",""]
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
        chain1:[[5,4],[42,43,44]],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[]
    }
}