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
    },
  
  soundUrls:{
    chain1:{
        a2:"https://www.dropbox.com/s/rmc6uai9105lhe4/a2.mp3?dl=0",
        a4:"https://www.dropbox.com/s/9pzipbhw3qf8nb3/a4.mp3?dl=0",
        a5:"https://www.dropbox.com/s/pl4atb2dix3rrdq/a5.mp3?dl=0",
        a7:"https://www.dropbox.com/s/l3c6uwryesx1wwy/a7.mp3?dl=0",
        a8:"https://www.dropbox.com/s/ud454d3etqpcube/a8.mp3?dl=0",
        a9:"https://www.dropbox.com/s/jb14br07rdjpdrm/a9.mp3?dl=0",
        a10:"https://www.dropbox.com/s/cot4vp8il69dy01/a10.mp3?dl=0",
        a11:"https://www.dropbox.com/s/lq68nktlnahrtkg/a11.mp3?dl=0",
        a14:"https://www.dropbox.com/s/oh9hv3eynl31kvh/a14.mp3?dl=0",
        a15:"https://www.dropbox.com/s/lj2s5ilkwdmu3rr/a15.mp3?dl=0",
        b4:"https://www.dropbox.com/s/vz3reym5331xiwc/b4.mp3?dl=0",
        b5:"https://www.dropbox.com/s/hjlzpzpjyptlu1p/b5.mp3?dl=0",
        b6:"https://www.dropbox.com/s/y1ypnscjjyeg8b5/b6.mp3?dl=0",
        b7:"https://www.dropbox.com/s/zyj6s2th4ugnazp/b7.mp3?dl=0",
        b8:"https://www.dropbox.com/s/1kpg49xkg9osedd/b8.mp3?dl=0",
        b9:"https://www.dropbox.com/s/2q34hnelq3gvr2o/b9.mp3?dl=0",
        b10:"https://www.dropbox.com/s/uebk6bwipdlfw1e/b10.mp3?dl=0",
        b13:"https://www.dropbox.com/s/ziqz3uk7l6hyseb/b13.mp3?dl=0",
        b15:"https://www.dropbox.com/s/jztkrpuc0vd10fp/b15.mp3?dl=0",
        c0:"https://www.dropbox.com/s/3pz8xpvsljoo0hr/c0.mp3?dl=0",
        c1:"https://www.dropbox.com/s/j7p41m3lwykxqgu/c1.mp3?dl=0",
        c2:"https://www.dropbox.com/s/d55xx1n375p2yid/c2.mp3?dl=0",
        c3:"https://www.dropbox.com/s/u6dz2dmhdr3d7mj/c3.mp3?dl=0",
        c4:"https://www.dropbox.com/s/pb1j5iwzxnoifm3/c4.mp3?dl=0",
        c5:"https://www.dropbox.com/s/kmk4b3c51l23rc6/c5.mp3?dl=0",
        c6:"https://www.dropbox.com/s/r70pvkepuf10e1u/c6.mp3?dl=0",
        c7:"https://www.dropbox.com/s/zesv9luky8a2yto/c7.mp3?dl=0",
        c8:"https://www.dropbox.com/s/3tetdb3708zqrl7/c8.mp3?dl=0",
        c10:"https://www.dropbox.com/s/nfjaw83pq8vmzsv/c10.mp3?dl=0",
        c11:"https://www.dropbox.com/s/3lr4oacx2zxpv01/c11.mp3?dl=0"
    },
    chain2:{
        a1:"https://www.dropbox.com/s/6u3i5nmwk97emz8/a1.mp3?dl=0",
        a2:"https://www.dropbox.com/s/fxs6o32c8ridwbz/a2.mp3?dl=0",
        a4:"https://www.dropbox.com/s/pzkak2awrmtwng3/a4.mp3?dl=0",
        a7:"https://www.dropbox.com/s/7tktrimxbcz8o77/a7.mp3?dl=0",
        a15:"https://www.dropbox.com/s/xqlgk9db6qyw6h3/a15.mp3?dl=0",
        b5:"https://www.dropbox.com/s/pcc8xxpez0dlg5r/b5.mp3?dl=0",
        b7:"https://www.dropbox.com/s/g4e4805h11rx17m/b7.mp3?dl=0",
        b8:"https://www.dropbox.com/s/s22urb5oczyvp4j/b8.mp3?dl=0",
        b9:"https://www.dropbox.com/s/ljnveg7vg038s6j/b9.mp3?dl=0",
        b10:"https://www.dropbox.com/s/tt8107v208u6ls7/b10.mp3?dl=0",
        b13:"https://www.dropbox.com/s/hiwo6oyph6s32y9/b13.mp3?dl=0",
        b15:"https://www.dropbox.com/s/i4xwxzqfc74pnsk/b15.mp3?dl=0",
        c10:"https://www.dropbox.com/s/l7hynr9hgnz6uhf/c10.mp3?dl=0"
    },
    chain3:{
        a1:"https://www.dropbox.com/s/1v8oat6cmhuanji/a1.mp3?dl=0",
        a2:"https://www.dropbox.com/s/707p1zmmdq2qexj/a2.mp3?dl=0",
        a4:"https://www.dropbox.com/s/dj4l6t3usho4p6o/a4.mp3?dl=0",
        a7:"https://www.dropbox.com/s/tibxb5skm8posh4/a7.mp3?dl=0",
        a15:"https://www.dropbox.com/s/ns7twi9w9oy0vxh/a15.mp3?dl=0",
        b5:"https://www.dropbox.com/s/agmgawyawyhtgbn/b5.mp3?dl=0",
        b6:"https://www.dropbox.com/s/jl011vl0ymavqlw/b6.mp3?dl=0",
        b7:"https://www.dropbox.com/s/qpujivx8a4oh0r6/b7.mp3?dl=0",
        b9:"https://www.dropbox.com/s/6xvhj5hs5587ve6/b9.mp3?dl=0",
        b10:"https://www.dropbox.com/s/gb37pk9iqjrnrgg/b10.mp3?dl=0",
        b12:"https://www.dropbox.com/s/p3emjm2vzn3m283/b12.mp3?dl=0",
        b13:"https://www.dropbox.com/s/d3lckam4veg4gxj/b13.mp3?dl=0",
        b14:"https://www.dropbox.com/s/lpopvsfz6keqwzp/b14.mp3?dl=0",
        b15:"https://www.dropbox.com/s/r2n5wgzo2nkj3f2/b15.mp3?dl=0",
        c10:"https://www.dropbox.com/s/wyma38w4918x0xw/c10.mp3?dl=0",
        c12:"https://www.dropbox.com/s/brpf9jkh3oyp1bv/c12.mp3?dl=0",
        c15:"https://www.dropbox.com/s/1oifecih3hasejl/c15.mp3?dl=0",
        d0:"https://www.dropbox.com/s/jgx47k24qtj3yc8/d0.mp3?dl=0",
        d1:"https://www.dropbox.com/s/pz3hlz2qyg2t7jq/d1.mp3?dl=0",
        d2:"https://www.dropbox.com/s/nwrkcbits3j357j/d2.mp3?dl=0",
        d3:"https://www.dropbox.com/s/vgp51upmjmdm8az/d3.mp3?dl=0",
        d5:"https://www.dropbox.com/s/xtp2m8rgj6cgrut/d5.mp3?dl=0",
        d10:"https://www.dropbox.com/s/sscd95ip66kmcou/d10.mp3?dl=0",
        e0:"https://www.dropbox.com/s/wkqterhqbd81eh7/e0.mp3?dl=0",
        e1:"https://www.dropbox.com/s/jxfk7mrxxapuyjg/e1.mp3?dl=0",
        e2:"https://www.dropbox.com/s/2bfl6szindwguya/e2.mp3?dl=0"
    },
    chain4:{
      a1:"https://www.dropbox.com/s/zfcflr8vb7wvjv0/a1.mp3?dl=0",
      a2:"https://www.dropbox.com/s/q4jldzveiyye6b0/a2.mp3?dl=0",
      a4:"https://www.dropbox.com/s/humu8bkz2brl4gx/a4.mp3?dl=0",
      a7:"https://www.dropbox.com/s/zetqzxb2kznuvyk/a7.mp3?dl=0",
      a15:"https://www.dropbox.com/s/b9wct0eeope9wb3/a15.mp3?dl=0",
      b0:"https://www.dropbox.com/s/inzv6gynsqbhujy/b0.mp3?dl=0",
      b2:"https://www.dropbox.com/s/y2uv4phhy7bakg8/b2.mp3?dl=0",
      b3:"https://www.dropbox.com/s/493n4dgsnj7sctd/b3.mp3?dl=0",
      b4:"https://www.dropbox.com/s/ci83rrxo22q1uiw/b4.mp3?dl=0",
      b5:"https://www.dropbox.com/s/cxcne38dpeeqsah/b5.mp3?dl=0",
      b6:"https://www.dropbox.com/s/lp8v3j41q9e7o3x/b6.mp3?dl=0",
      b7:"https://www.dropbox.com/s/ok9crybyn671e9o/b7.mp3?dl=0",
      b8:"https://www.dropbox.com/s/om32ayg15rm17ar/b8.mp3?dl=0",
      b9:"https://www.dropbox.com/s/jxvlf0syecrd6iq/b9.mp3?dl=0",
      b10:"https://www.dropbox.com/s/58fajzcqed7cp7q/b10.mp3?dl=0",
      b11:"https://www.dropbox.com/s/dzzkv43phdhxj2t/b11.mp3?dl=0",
      b12:"https://www.dropbox.com/s/d3kzufq4rq8gqhs/b12.mp3?dl=0",
      b13:"https://www.dropbox.com/s/565f5aghnrznu5o/b13.mp3?dl=0",
      b14:"https://www.dropbox.com/s/ce23p2i6quj4o9i/b14.mp3?dl=0",
      b15:"https://www.dropbox.com/s/dxpdqghsh38cdte/b15.mp3?dl=0",
      c10:"https://www.dropbox.com/s/7kw84p1w0tcvrwt/c10.mp3?dl=0",
      c12:"https://www.dropbox.com/s/ozs5gbtwtw2nuxr/c12.mp3?dl=0",
      c13:"https://www.dropbox.com/s/63azqelw4xbduqe/c13.mp3?dl=0",
      c15:"https://www.dropbox.com/s/yvt9eirzzxbhgvr/c15.mp3?dl=0",
      d0:"https://www.dropbox.com/s/z9ru2pj9prg8nbp/d0.mp3?dl=0",
      d1:"https://www.dropbox.com/s/1feag1wjj3w1p4m/d1.mp3?dl=0",
      d2:"https://www.dropbox.com/s/z5ohys1tl08ay4b/d2.mp3?dl=0",
      d3:"https://www.dropbox.com/s/svddzzrmwcd60h4/d3.mp3?dl=0",
      d8:"https://www.dropbox.com/s/t6x6k81p6zu5dj3/d8.mp3?dl=0",
      d15:"https://www.dropbox.com/s/cg97b59ao4mpnft/d15.mp3?dl=0",
      e0:"https://www.dropbox.com/s/6fl5zkbiqu33r2y/e0.mp3?dl=0",
      e1:"https://www.dropbox.com/s/jth6tqcqnogrfhc/e1.mp3?dl=0",
      e2:"https://www.dropbox.com/s/9y3dfj1ojoutk5m/e2.mp3?dl=0",
      e3:"https://www.dropbox.com/s/ju7bd0c7fcmd2zc/e3.mp3?dl=0"
    }
  }
}