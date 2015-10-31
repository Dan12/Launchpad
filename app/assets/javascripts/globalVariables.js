// editor variables
editor_canvas = null;
edc = null;
edcWidth = 0;
edcHeight = 0;
xOffset = 0;
yOffset = 0;

cellWidth = 20;
cellHeight = 20;

keyCodes = [49,50,51,52,53,54,55,56,57,48,189,187,81,87,69,82,84,89,85,73,79,80,219,221,65,83,68,70,71,72,74,75,76,186,222,13,90,88,67,86,66,78,77,188,190,191,16,37,38,39,40];

numButtons = 51;

toolbarHeight = 30;

cursor_at = 0;
current_time = 0;

scrubbing_bar_height = 20;

maxWidth = 20000;

tickScale = 250;
tickScaleEx = [10, 1000];
tickWidth = 50;

//playback speed and zoom
//2-scrub, 3-select, 4-paint, 5-move, 6-scale, 7-record, 8-play, 9-pause, 10-stop, 12-loop, 13-save, 14-load
current_tool = 2;

editor_tools = [];
tool_names = ["scrub", "select", "paint", "move", "scale", "record", "play", "pause", "stop", "loop", "save", "load"]

playback_speed = 1;
playback_speedEx = [.1, 1.5];

sliderWidth = 6;

elementOver = null;

current_song = [];

recordResolution = 20;
recordStartTime = null;

// main script variables
keyPairs = [49,50,51,52,53,54,55,56,57,48,189,187,
            81,87,69,82,84,89,85,73,79,80,219,221,
            65,83,68,70,71,72,74,75,76,186,222,13,
            90,88,67,86,66,78,77,188,190,191,16,-1];
            
sound1Srcs = ["c1","a0", "a1", "a2", "a3", "b0", "b1", "b2", "b3", "b3","d8","d12",
              "c3","c5", "a5", "a6", "a7", "b4", "b5", "b6", "b7", "d5","d6","d4",
              "c2","c7", "a9", "a10","a11","b8", "b9", "b10","b11","d1","d0","d5",
              "c6","a12","a13","a14","a15","b12","b13","b14","b15","d3","d2","d1"];
              
pressure1 = [4,5,6,7,8,9,17,18,29,30,31,32,33,34,35,41,42];

sound4Srcs = ["c0", "c3", "a15","","",   "",   "",   "b15","","","","",
              "c4", "c7", "",   "","",   "",   "d6", "d3", "","","","",
              "c8", "c11","",   "","d12","d13","d14","d7", "","","","",
              "c12","c15","",   "","d8", "d9", "d10","d11","","","",""];
              
pressure4 = [19];

sound2Srcs = ["a13","a14","a15","c2", "c3", "b0", "b1", "b2", "b3", "b3","d8","d12",
              "c1", "",   "",   "c6", "c7", "b4", "b5", "b6", "b7", "d5","d6","d4",
              "c5", "c8", "c9", "c10","c11","b8", "b9", "b10","b11","d1","d0","d5",
              "",   "c12","c13","c14","c15","b12","b13","b14","b15","d3","d2","d1"];

pressure2 = [5,6,7,8,9,17,18,29,30,31,32,33,34,35,41,42];

pressures = [pressure1, pressure4, pressure2];
              
sounds1 = [];

sounds4 = [];

sounds2 = [];
    
combSounds = [];

curSound = 0;

intro_loop = 0;

song_playing = false;

numLoaded = 0;

numSoundPacks = 3;

songTimeout = null;

frame = 0;

time = 0;

resolution = 1;

startTime = 0;

songIntro = [{kc: 3, dn: 200, p: 0},
             {kc: 15, dn: 200, p: 150},
             {kc: 37, dn: 200, p: 150},
             {kc: 16, dn: 200, p: 550},
             {kc: 2, dn: 200, p: 800},
             {kc: 1, dn: 200, p: 950},
             {kc: 15, dn: 200, p: 950},
             {kc: 16, dn: 200, p: 1350},
             {kc: -1, dn: -1, p: 1550}
            ];