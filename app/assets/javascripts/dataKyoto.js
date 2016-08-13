var kyotoData = {
  
    // unique song id
    song_number: 5,
    
    song_name: "Skrillex - Kyoto",
    
    bpm:175,
    
    filename: 'kyoto',
  
    // mappings of sound to key
    mappings:{
        chain1:["a4","a8","a5", "a14","a2", "a15","","",  "b5", "b6", "b7", "b4",
                "a7","a9","a10","a11","c10","",   "","b8","b9", "b10","",   "",
                "c0","c1","c2", "c3", "c8", "",   "","",  "b13","",   "b15","",
                "c4","c5","c6", "c7", "c11","",   "","",  "",   "",   "",   ""],
          
        chain2:["a1","",   "","","","","","",  "b5", "",   "b7", "",
                "a2","a15","","","","","","b8","b9", "b10","",   "",
                "a4","c10","","","","","","",  "b13","",   "b15","",
                "a7","",   "","","","","","",  "",   "",   "",   ""],
        
        chain3:["a1", "a2","a4", "a7", "",   "b5", "b6", "b7", "d0","d1","d2", "d3",
                "a15","",  "",   "",   "",   "b9", "b10","",   "",  "d5","e2", "",
                "",   "",  "c10","",   "b12","e0","b13", "b15","",  "",  "d10","",
                "c12","",  "",   "c15","",   "e1","b14", "",   "",  "",  "",   ""],
        
        chain4:["a1", "a2","a4", "a7", "b0", "",   "b2", "b3", "",   "d0","e0","", 
                "a15","",  "",   "",   "b4", "b5", "b6", "b7", "d15","d2","e2","",   
                "",   "",  "c10","",   "b8", "b9", "b10","b11","d8", "d1","e1","",
                "c12","",  "",   "c15","b12","b13","b14","b15","",   "d3","e3",""]
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
        chain1:[],
        
        chain2:[],
        
        chain3:[],
        
        chain4:[]
    }
}