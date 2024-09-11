# Dev branch with hot reloading:

### Todo:
- Ball
    - [x] "timer" for ball being in the net
    - [x] new random net position after timer runs out

- Tether
    - [ ] 

___
- Musializer:

    - [ ] Equalizer functionality
        - [ ] Fix bass value being way too jumpy

    - [x] Equalizer buttons:
        - [x] Implement switch case for different visualizers
        - [x] Fix cleanup of audiomotion-analyzer (again)
        - [x] Fix canvas not appearing again
        - [ ] Check issues with music playing while switching --> probably not that important (?)

    - [ ] Less important graphical stuff
        - [x] Gradient on audioMotion-analyzer
            --> kinda working when adding it in the module? (but not on website)
        - [ ] Fix outline/border of circle sometimes not working
        - [x] Add indicator of which visualizer is active (css :active)

    - [x] Clean up GUI
    - [x] Replace "Volume" & "Intensity" with material symbols
    - [x] Progress bar
    - [x] Nice oval shape for song display
    - [x] Make bassIntensity slider actually do something 
    - [x] fix audioanalyzer waveform broken after second switch
    - [x] fix canvas broken after switch back
    - [x] Add back the music title
    - [x] Way to click around the song
    - [x] old equalizer
        - [x] Get it back to work on the testing page

    - [ ] Potential problem for the future --> main/renderer/preload not getting transpiled on "start"

