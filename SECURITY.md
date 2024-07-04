# To-Do 
___

**Seti-Folder**: https://marketplace.visualstudio.com/items?itemName=sabaken.seti-minimal-folder

**Seti**:https://github.com/jesseweed/seti-ui/tree/master
**minimal**:https://github.com/jacobwgillespie/vscode-minimal-icons

**other**:https://github.com/hypernym-studio/vscode-icons

https://github.com/Microsoft/vscode/tree/main/extensions/theme-defaults
https://code.visualstudio.com/api/extension-guides/file-icon-theme
https://github.com/microsoft/vscode/issues/10804

- ### Currently working on
  - [ ] Switches: Vertical switch: make it "snap" to points
  - [ ] Switches: Vertical switch: add lines for segments

  - [ ] Ball --> add a randomize button to randomize hoop position

<br>


- **Pages + Functionality**

  - [ ] **Switches**
    - [ ] Vertical switch: make it "snap" to points
    - [ ] Vertical switch: add lines for segments

  - [ ] **More examples**
    - [ ] Scrolling lock thing
    - [ ] Sliders (?)
    - [ ] Idea: play with friction/resistance of slider based on position 
    - [ ] Add more inspiration gifs

  - [ ] **Ball**
    - [ ] Add a reference for pull direction/pull strenght
    - [ ] calculate trajectory mode, + button to turn it on/off
    - [ ] Ball --> add a randomize button to randomize hoop position

  - [ ] **Tether**
    - [ ] Make tethers interact with eachother

  - [ ] **Particles**
    - [ ] Add option to input own text/character

- **Styles + Design** 
- **General/QOL**

- **Low priority**
  - [ ] Fix lefthalf and righthalf transition spinner
  - [ ] Consistent fps 
  - [ ] fix DOM cant find darkmodeToggle when it starts on canvas page
  - [ ] Navbar Tab styles --> https://github.com/adamschwartz/chrome-tabs/tree/gh-pages
  - [ ] Page transitions --> https://vuejs.org/guide/built-ins/transition.html

___

# Done
  - [x] **Spinner**
    - [x] Figure out if possible
    - [x] Mousewheel
    - [x] Add velocity and friction
    - [x] Add lefthalf and righthalf** for scrolling
    - [x] Fix lefthalf and righthalf dragging/set reference to actual center(?)

  - [x] **Particles**
    - [x] Figure out why mouse isnt at center 
    - [x] Fix font not displaying
    - [x] Fix canvas size

  - [x] **Button**
    - [x] Smoother animations
    - [x] some toggle buttons
    - [x] button1 correct light mode colors
    - [x] Effects onpress

  - [x] **Tethers**
    - [x] Figure out inconsistency with damping and stiffness --> initscene called twice on window resize
    - [x] Add actual tether

  - [x] **Ball**
    - [x] Prototype 2d basketball thingy
    - [x] Reset button in the center of screen + bigger
    - [x] Ball start position from wherever the mouse is down?
    - [x] Add a hoop
    - [x] Ball --> calculate bounding box correctly

  - [x] **Switches**
    - [x] add a "manual" switch instead of click switch
    - [x] More designs
    - [x] Better style 3 segment

  - [x] **Logo**
    - [x] Fix/Design better logo
    - [x] Preview for ReadMe
    - [x] Center on page

  - **General/QOL**
    - [x] Fix content centered in the middle of screen
    - [x] Working darkmode toggle
    - [x] Factor out Navbar into react component instead of on the index.html
    - [x] properly align icons in the navbar
    - [x] Figure out why settings button is not working on homepage
    - [x] Reload the canvas pages when darkmodetoggle
    - [x] Remove settings and replace with darkmode toggle instead
    - [x] Add settings button next to "ui-box" title
    - [x] Scale up active element in navbar/remove padding

  - [x] **Github pages**
    - [x] Github actions to automatically push to gh-pages branch
    - [x] Fix position of ball and particles
    - [x] Fix particle sizes --> not depending on screen size

  - [x] **Joystick**
    - [x] Add some keyboard page with wasd 
    - [x] Joystick --> mouse and keyboard seperately
    - [x] Joystick: Reset mouse position on keyboard press

  - [x] **Navbar & Menus**
    - [x] Indicate what page is active
    - [x] Navbar better style
    - [x] Icons instead of text

  - [x] **Low priority**
    - [x] Fix keyboard not resetting onmousedown joystick